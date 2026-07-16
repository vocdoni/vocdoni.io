import matter from 'gray-matter'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

type Options = {
  hostname: string
  locales: string[]
  defaultLocale: string
  includeRobots?: boolean
}

// A route plus the locales it actually exists in. Most pages exist in every
// locale, but blog posts only exist in the languages they were authored in
// (other locales are served via English fallback and must not be advertised as
// canonical alternates).
export interface SitemapRoute {
  baseRoute: string
  locales: string[]
}

const isPageComponent = (name: string) => name.startsWith('+Page.')
// Skip Vike internals (`_`, `+`), dynamic-param dirs (`@slug`, enumerated
// separately), and the client-only Keystatic admin.
const isSkippedDir = (name: string) =>
  name.startsWith('_') || name.startsWith('+') || name.startsWith('@') || name === 'keystatic'

async function discoverBaseRoutes(pagesDir: string) {
  const routes = new Set<string>()

  const walk = async (dir: string) => {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (isSkippedDir(entry.name)) continue
        await walk(path.join(dir, entry.name))
        continue
      }
      if (!entry.isFile() || !isPageComponent(entry.name)) continue

      const relDir = path.relative(pagesDir, dir).split(path.sep).join('/')
      const route = relDir === '' || relDir === 'index' ? '/' : `/${relDir}`
      routes.add(route)
    }
  }

  await walk(pagesDir)
  return routes
}

function withLocalePrefix(locale: string, route: string) {
  return route === '/' ? `/${locale}` : `/${locale}${route}`
}

export function buildSitemapXml(hostname: string, routes: SitemapRoute[], defaultLocale: string) {
  const host = hostname.replace(/\/+$/, '')
  const lastmod = new Date().toISOString()

  // One <url> per (route, locale) it exists in, each carrying reciprocal hreflang
  // alternates limited to that route's own locales so we never advertise a
  // fallback URL as a canonical alternate.
  const blocks: { loc: string; xml: string }[] = []
  for (const { baseRoute, locales } of routes) {
    if (!locales.length) continue
    const canonicalLocale = locales.includes(defaultLocale) ? defaultLocale : locales[0]
    const alternates = [
      ...locales.map(
        (locale) =>
          `    <xhtml:link rel="alternate" hreflang="${locale}" href="${host}${withLocalePrefix(locale, baseRoute)}" />`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${host}${withLocalePrefix(canonicalLocale, baseRoute)}" />`,
    ]
    for (const locale of locales) {
      const loc = `${host}${withLocalePrefix(locale, baseRoute)}`
      blocks.push({
        loc,
        xml: ['  <url>', `    <loc>${loc}</loc>`, ...alternates, `    <lastmod>${lastmod}</lastmod>`, '  </url>'].join(
          '\n'
        ),
      })
    }
  }

  blocks.sort((a, b) => a.loc.localeCompare(b.loc))
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...blocks.map((b) => b.xml),
    '</urlset>',
    '',
  ].join('\n')
}

// Content-Signal (contentsignals.org / AIPREF) declares how the public content may
// be used: discoverable via search and usable as live AI input, but not for model
// training. Kept alongside the standard crawl rules so agents see both at once.
export function buildRobotsTxt(hostname: string) {
  const host = hostname.replace(/\/+$/, '')
  return `User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=no\nAllow: /\nDisallow: /keystatic\nDisallow: /api/keystatic\n\nSitemap: ${host}/sitemap.xml\n`
}

// Enumerate concrete blog post + category archive routes from the content files
// (the dynamic @slug pages are skipped by the filesystem walk above). Drafts are
// excluded. Each post route carries only the locales it was authored in; category
// archives exist in every locale because their post lists fall back to English.
async function discoverBlogRoutes(resolvedRoot: string, allLocales: string[]): Promise<SitemapRoute[]> {
  const blogDir = path.join(resolvedRoot, 'content', 'blog')
  const localesBySlug = new Map<string, Set<string>>()
  const categories = new Set<string>()

  const localeDirs = await fs.readdir(blogDir, { withFileTypes: true }).catch(() => [])
  for (const dir of localeDirs) {
    if (!dir.isDirectory() || dir.name === 'authors' || dir.name === 'categories') continue
    if (!allLocales.includes(dir.name)) continue
    const files = await fs.readdir(path.join(blogDir, dir.name)).catch(() => [])
    for (const file of files) {
      if (!file.endsWith('.mdoc')) continue
      const { data } = matter(await fs.readFile(path.join(blogDir, dir.name, file), 'utf8'))
      if (data.draft === true) continue
      const slug = file.replace(/\.mdoc$/, '')
      if (!localesBySlug.has(slug)) localesBySlug.set(slug, new Set())
      localesBySlug.get(slug)!.add(dir.name)
      if (Array.isArray(data.categories)) for (const category of data.categories) categories.add(String(category))
    }
  }

  const routes: SitemapRoute[] = []
  for (const [slug, slugLocales] of localesBySlug) {
    routes.push({ baseRoute: `/blog/${slug}`, locales: allLocales.filter((l) => slugLocales.has(l)) })
  }
  for (const category of categories) {
    routes.push({ baseRoute: `/blog/category/${category}`, locales: allLocales })
  }
  return routes
}

async function resolveRoutes(resolvedRoot: string, locales: string[]): Promise<SitemapRoute[]> {
  const pagesDir = path.join(resolvedRoot, 'pages')
  const baseRoutes = await discoverBaseRoutes(pagesDir)
  const routes: SitemapRoute[] = []
  for (const route of baseRoutes) {
    if (route === '/404') continue
    routes.push({ baseRoute: route, locales })
  }
  routes.push(...(await discoverBlogRoutes(resolvedRoot, locales)))
  return routes
}

export function vikeSitemapPlugin(options: Options): Plugin {
  let resolvedOutDir: string
  let clientOutDir: string
  let resolvedRoot: string
  let isSSRBuild = false
  let ran = false

  return {
    name: 'vike-sitemap-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      resolvedOutDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = resolvedOutDir.endsWith(`${path.sep}client`) ? resolvedOutDir : path.join(resolvedOutDir, 'client')
      resolvedRoot = config.root ? path.resolve(config.root) : process.cwd()
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next()
        const url = req.url.split('?')[0]
        if (url !== '/sitemap.xml' && url !== '/robots.txt') return next()

        const routes = await resolveRoutes(resolvedRoot, options.locales)
        if (url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml')
          res.end(buildSitemapXml(options.hostname, routes, options.defaultLocale))
          return
        }
        res.setHeader('Content-Type', 'text/plain')
        res.end(buildRobotsTxt(options.hostname))
      })
    },
    async closeBundle() {
      if (isSSRBuild) return
      if (ran) return
      ran = true

      const routes = await resolveRoutes(resolvedRoot, options.locales)

      await fs.mkdir(clientOutDir, { recursive: true })

      const sitemap = buildSitemapXml(options.hostname, routes, options.defaultLocale)
      const robots = options.includeRobots === false ? null : buildRobotsTxt(options.hostname)

      await Promise.all([
        fs.writeFile(path.join(clientOutDir, 'sitemap.xml'), sitemap, 'utf8'),
        robots ? fs.writeFile(path.join(clientOutDir, 'robots.txt'), robots, 'utf8') : Promise.resolve(),
      ])
    },
  }
}
