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

function withLocales(baseRoutes: Set<string>, locales: string[]) {
  const routes = new Set<string>()

  for (const route of baseRoutes) {
    for (const locale of locales) {
      const localized = route === '/' ? `/${locale}` : `/${locale}${route}`
      routes.add(localized)
    }
  }

  return Array.from(routes)
    .filter((r) => !r.endsWith('/404'))
    .sort()
}

function stripLocalePrefix(route: string, locales: string[]) {
  const [firstSegment, ...rest] = route.replace(/^\/+/, '').split('/')
  if (!locales.includes(firstSegment)) return route
  return rest.length ? `/${rest.join('/')}` : '/'
}

function withLocalePrefix(locale: string, route: string) {
  return route === '/' ? `/${locale}` : `/${locale}${route}`
}

export function buildSitemapXml(hostname: string, routes: string[], locales: string[], defaultLocale: string) {
  const host = hostname.replace(/\/+$/, '')
  const lastmod = new Date().toISOString()
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...routes.map((route) => {
      const baseRoute = stripLocalePrefix(route, locales)
      const alternates = [
        ...locales.map(
          (locale) =>
            `    <xhtml:link rel="alternate" hreflang="${locale}" href="${host}${withLocalePrefix(locale, baseRoute)}" />`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${host}${withLocalePrefix(defaultLocale, baseRoute)}" />`,
      ]
      return [
        '  <url>',
        `    <loc>${host}${route}</loc>`,
        ...alternates,
        `    <lastmod>${lastmod}</lastmod>`,
        '  </url>',
      ].join('\n')
    }),
    '</urlset>',
    '',
  ]
  return lines.join('\n')
}

function buildRobotsTxt(hostname: string) {
  const host = hostname.replace(/\/+$/, '')
  return `User-agent: *\nAllow: /\nDisallow: /keystatic\nDisallow: /api/keystatic\n\nSitemap: ${host}/sitemap.xml\n`
}

// Enumerate concrete blog post + category archive routes from the content files
// (the dynamic @slug pages are skipped by the filesystem walk above). Drafts are
// excluded; slugs are de-duplicated across locales.
async function discoverBlogRoutes(resolvedRoot: string): Promise<string[]> {
  const blogDir = path.join(resolvedRoot, 'content', 'blog')
  const routes = new Set<string>()
  const categories = new Set<string>()

  const localeDirs = await fs.readdir(blogDir, { withFileTypes: true }).catch(() => [])
  for (const dir of localeDirs) {
    if (!dir.isDirectory() || dir.name === 'authors' || dir.name === 'categories') continue
    const files = await fs.readdir(path.join(blogDir, dir.name)).catch(() => [])
    for (const file of files) {
      if (!file.endsWith('.mdoc')) continue
      const { data } = matter(await fs.readFile(path.join(blogDir, dir.name, file), 'utf8'))
      if (data.draft === true) continue
      routes.add(`/blog/${file.replace(/\.mdoc$/, '')}`)
      if (Array.isArray(data.categories)) for (const category of data.categories) categories.add(String(category))
    }
  }
  for (const category of categories) routes.add(`/blog/category/${category}`)
  return [...routes]
}

async function resolveRoutes(resolvedRoot: string, locales: string[]) {
  const pagesDir = path.join(resolvedRoot, 'pages')
  const baseRoutes = await discoverBaseRoutes(pagesDir)
  for (const route of await discoverBlogRoutes(resolvedRoot)) baseRoutes.add(route)
  return withLocales(baseRoutes, locales)
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
          res.end(buildSitemapXml(options.hostname, routes, options.locales, options.defaultLocale))
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

      const sitemap = buildSitemapXml(options.hostname, routes, options.locales, options.defaultLocale)
      const robots = options.includeRobots === false ? null : buildRobotsTxt(options.hostname)

      await Promise.all([
        fs.writeFile(path.join(clientOutDir, 'sitemap.xml'), sitemap, 'utf8'),
        robots ? fs.writeFile(path.join(clientOutDir, 'robots.txt'), robots, 'utf8') : Promise.resolve(),
      ])
    },
  }
}
