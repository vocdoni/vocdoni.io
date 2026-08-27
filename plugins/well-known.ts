import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import matter from 'gray-matter'
import {
  DEVELOPERS_API_BASE_URL,
  DEVELOPERS_GITHUB_URL,
  DEVELOPERS_SKILLS_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
} from '../lib/developers'

/**
 * Emits the agent-discovery artifacts into the client build output (and serves the
 * same content in dev via middleware). All content is derived at build time from the
 * repo's single sources of truth (`lib/developers.ts`, `content/developers/docs/`,
 * `content/blog/`) so nothing can drift.
 *
 * Files emitted (all under `dist/client`):
 *   /.well-known/api-catalog   RFC 9727 linkset+json
 *   /llms.txt                  llmstxt.org index
 *   /_headers                  Netlify Link: headers (plus X-Robots-Tag on non-production deploys)
 *
 * Agent skills are NOT hosted here: they live in vocdoni/integrator-sdk and are
 * published via the vocdoni/skills marketplace, which the discovery links point to
 * (see lib/seo-head.tsx and the docs skill link) rather than vendoring a copy.
 *
 * The site is fully prerendered with no runtime server, so real HTTP Link headers come from
 * Netlify reading `_headers`, alongside the `<link rel>` tags in `lib/seo-head.tsx` and these
 * static files. Mirrors `plugins/docs-markdown.ts` and
 * `plugins/legacy-redirects.ts`: generated at build, never committed.
 */

interface Options {
  hostname: string
  defaultLocale: string
  /** Non-production deploy: ship `X-Robots-Tag: noindex, nofollow` so it never gets indexed. */
  noindex?: boolean
}

const OVERVIEW_SLUG = 'overview'
const stripSlash = (s: string) => s.replace(/\/+$/, '')

// --- pure builders (unit-tested) --------------------------------------------

// RFC 9727 API catalog as an RFC 9264 linkset. Anchored at the API base URL with the
// machine spec (service-desc), human docs (service-doc) and status endpoint.
export function buildApiCatalog(hostname: string): string {
  const host = stripSlash(hostname)
  const doc = {
    linkset: [
      {
        anchor: DEVELOPERS_API_BASE_URL,
        'service-desc': [{ href: DEVELOPERS_SWAGGER_URL, type: 'application/yaml' }],
        'service-doc': [{ href: `${host}/developers/docs`, type: 'text/html' }],
        status: [{ href: DEVELOPERS_STATUS_URL, type: 'text/html' }],
      },
    ],
  }
  return JSON.stringify(doc, null, 2) + '\n'
}

export interface LlmsEntry {
  title: string
  url: string
  note?: string
}

// llmstxt.org index: H1 + summary blockquote + link sections.
export function buildLlmsTxt(hostname: string, sections: { heading: string; entries: LlmsEntry[] }[]): string {
  const host = stripSlash(hostname)
  const lines: string[] = [
    '# Vocdoni',
    '',
    '> Vocdoni is an open-source, self-managed digital voting platform for secure, ' +
      'verifiable and anonymous online elections. This file indexes the machine-readable ' +
      'markdown versions of the documentation and blog for AI agents.',
    '',
  ]
  for (const section of sections) {
    if (!section.entries.length) continue
    lines.push(`## ${section.heading}`, '')
    for (const { title, url, note } of section.entries) {
      const absolute = url.startsWith('http') ? url : `${host}${url}`
      lines.push(`- [${title}](${absolute})${note ? `: ${note}` : ''}`)
    }
    lines.push('')
  }
  return lines.join('\n')
}

// Content types the static host cannot infer from the file name. Consumed both by the dev
// middleware and by buildNetlifyHeaders, so the two can never disagree.
// `/llms.txt` is deliberately the only entry Netlify already gets right on its own (`.txt` ->
// `text/plain; charset=UTF-8`), so it is not repeated in `_headers`.
const CONTENT_TYPES: Record<string, string> = {
  '/.well-known/api-catalog': 'application/linkset+json',
  '/llms.txt': 'text/plain; charset=utf-8',
}

// Raw-markdown mirrors emitted by `plugins/docs-markdown.ts` and `plugins/blog-markdown.ts`:
//   /<locale>/developers/docs.md, /<locale>/developers/docs/<slug>.md, /<locale>/blog/<slug>.md
// Wildcards rather than the ~385 enumerated paths. Netlify documents `*` as matching any character
// within a path segment but does not say whether it also crosses `/`; these three shapes are
// correct under either reading, because nothing else below those prefixes ends in `.md`.
const RAW_MARKDOWN_PATHS = ['/*/developers/docs.md', '/*/developers/docs/*.md', '/*/blog/*.md']

// Netlify `_headers`: a path pattern on its own line, then two-space-indented header lines. Every
// matching rule is applied, so the `/*` block below keeps adding its Link headers to the raw
// markdown URLs that the later blocks also match.
const block = (path: string, headers: string[]) => [path, ...headers].join('\n')

// Link headers mirroring the <link rel> tags in lib/seo-head.tsx, so the RFC 8288 header check
// passes on every Netlify deploy.
export function buildNetlifyHeaders(noindex = false): string {
  const links = [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</developers/docs>; rel="service-doc"',
    `<${DEVELOPERS_SWAGGER_URL}>; rel="service-desc"`,
    `<${DEVELOPERS_SKILLS_URL}>; rel="related"`,
    '</llms.txt>; rel="alternate"; type="text/plain"',
  ]
  const headers = links.map((l) => `  Link: ${l}`)
  // Dev and preview deploys are production deploys of their own Netlify site, so Netlify does not
  // add this for us. Only the production branch is indexable.
  if (noindex) headers.unshift('  X-Robots-Tag: noindex, nofollow')

  const blocks = [
    block('/*', headers),
    // The catalog file is extensionless, so Netlify sniffs it as `text/plain`. RFC 9727 wants
    // `application/linkset+json`, which the dev middleware already serves.
    block('/.well-known/api-catalog', [`  Content-Type: ${CONTENT_TYPES['/.well-known/api-catalog']}`]),
    // The `.md` mirrors must stay fetchable - agents consume them, and seo-head advertises them via
    // <link rel="alternate" type="text/markdown"> - but must not be indexed: search crawlers follow
    // those tags, parse the markdown as HTML and then report it as a page with no <title>.
    // `noindex` only; `nofollow` would be counterproductive on a file whose whole job is links.
    ...RAW_MARKDOWN_PATHS.map((p) => block(p, ['  X-Robots-Tag: noindex'])),
  ]
  return blocks.join('\n\n') + '\n'
}

// --- source enumeration (build/Node side) -----------------------------------

const rawDocHref = (locale: string, slug: string) =>
  slug === OVERVIEW_SLUG ? `/${locale}/developers/docs.md` : `/${locale}/developers/docs/${slug}.md`

async function loadDocEntries(root: string, locale: string): Promise<LlmsEntry[]> {
  const dir = path.join(root, 'content', 'developers', 'docs', locale)
  const files = await fs.readdir(dir).catch(() => [])
  const docs: { slug: string; title: string; order: number }[] = []
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const slug = file.replace(/\.md$/, '')
    const { data } = matter(await fs.readFile(path.join(dir, file), 'utf8'))
    docs.push({
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      order: typeof data.order === 'number' ? data.order : 999,
    })
  }
  docs.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
  return docs.map((d) => ({ title: d.title, url: rawDocHref(locale, d.slug) }))
}

async function loadBlogEntries(root: string, locale: string): Promise<LlmsEntry[]> {
  const dir = path.join(root, 'content', 'blog', locale)
  const files = await fs.readdir(dir).catch(() => [])
  const posts: { slug: string; title: string; date: string }[] = []
  for (const file of files) {
    if (!file.endsWith('.mdoc')) continue
    const { data } = matter(await fs.readFile(path.join(dir, file), 'utf8'))
    if (data.draft === true) continue
    const slug = file.replace(/\.mdoc$/, '')
    posts.push({
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      date: typeof data.publishedDate === 'string' ? data.publishedDate : String(data.publishedDate ?? ''),
    })
  }
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
  return posts.map((p) => ({ title: p.title, url: `/${locale}/blog/${p.slug}.md` }))
}

async function buildLlms(root: string, host: string, locale: string): Promise<string> {
  const [docs, posts] = await Promise.all([loadDocEntries(root, locale), loadBlogEntries(root, locale)])
  return buildLlmsTxt(host, [
    { heading: 'Developer docs', entries: docs },
    { heading: 'Blog', entries: posts },
    {
      heading: 'Key pages',
      entries: [
        { title: 'Developer portal', url: '/developers' },
        { title: 'API reference (OpenAPI)', url: DEVELOPERS_SWAGGER_URL },
        { title: 'Status', url: DEVELOPERS_STATUS_URL },
        { title: 'GitHub', url: DEVELOPERS_GITHUB_URL },
      ],
    },
  ])
}

// --- plugin -----------------------------------------------------------------

export function wellKnownPlugin(options: Options): Plugin {
  let clientOutDir: string
  let resolvedRoot: string
  let isSSRBuild = false
  let ran = false
  const host = stripSlash(options.hostname)

  return {
    name: 'well-known-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      const resolvedOutDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = resolvedOutDir.endsWith(`${path.sep}client`) ? resolvedOutDir : path.join(resolvedOutDir, 'client')
      resolvedRoot = config.root ? path.resolve(config.root) : process.cwd()
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next()
        const url = req.url.split('?')[0]

        if (url === '/.well-known/api-catalog') {
          res.setHeader('Content-Type', CONTENT_TYPES[url])
          return void res.end(buildApiCatalog(host))
        }
        if (url === '/llms.txt') {
          res.setHeader('Content-Type', CONTENT_TYPES[url])
          return void res.end(await buildLlms(resolvedRoot, host, options.defaultLocale))
        }
        next()
      })
    },
    async closeBundle() {
      if (isSSRBuild) return
      if (ran) return
      ran = true

      const write = async (rel: string, content: string) => {
        const out = path.join(clientOutDir, rel)
        await fs.mkdir(path.dirname(out), { recursive: true })
        await fs.writeFile(out, content, 'utf8')
      }

      await Promise.all([
        write('.well-known/api-catalog', buildApiCatalog(host)),
        write('llms.txt', await buildLlms(resolvedRoot, host, options.defaultLocale)),
        write('_headers', buildNetlifyHeaders(options.noindex)),
      ])
    },
  }
}
