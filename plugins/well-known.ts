import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
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
 * Files emitted (all under `dist/client`, served on both Netlify and DigitalOcean):
 *   /.well-known/api-catalog   RFC 9727 linkset+json
 *   /llms.txt                  llmstxt.org index
 *   /_headers                  Netlify Link: headers (ignored by DO)
 *
 * Agent skills are NOT hosted here: they live in vocdoni/integrator-sdk and are
 * published via the vocdoni/skills marketplace, which the discovery links point to
 * (see lib/seo-head.tsx and the docs skill link) rather than vendoring a copy.
 *
 * The site is fully prerendered with no runtime server, so real HTTP Link headers only
 * apply on Netlify (`_headers`); production relies on the `<link rel>` tags in
 * `lib/seo-head.tsx` plus these static files. Mirrors `plugins/docs-markdown.ts` and
 * `plugins/legacy-redirects.ts`: generated at build, never committed.
 */

interface Options {
  hostname: string
  defaultLocale: string
}

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
    '> Vocdoni offers self-service online voting software and managed election services for organizations. ' +
      'The platform supports member lists, configurable ballots, scheduled voting, weighted voting power, ' +
      'and verifiable results. Its public developer API and TypeScript SDK are in alpha.',
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

// Netlify-only Link headers, mirroring the <link rel> tags in lib/seo-head.tsx. DO ignores
// this file; it makes the RFC 8288 header check pass on preview deploys.
export function buildNetlifyHeaders(): string {
  const links = [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</developers/docs>; rel="service-doc"',
    `<${DEVELOPERS_SWAGGER_URL}>; rel="service-desc"`,
    `<${DEVELOPERS_SKILLS_URL}>; rel="related"`,
    '</llms.txt>; rel="alternate"; type="text/plain"',
  ]
  return ['/*', ...links.map((l) => `  Link: ${l}`), ''].join('\n')
}

// Keep this file short and buyer-first. Raw developer docs and blog posts remain
// discoverable through their own text/markdown alternate links.
function buildLlms(host: string, locale: string): string {
  return buildLlmsTxt(host, [
    {
      heading: 'Product',
      entries: [
        { title: 'Online voting app', url: `/${locale}/app`, note: 'Self-service plans start free.' },
        {
          title: 'Online voting for associations',
          url: `/${locale}/solutions/associations`,
          note: 'Member voting and assembly workflows.',
        },
        {
          title: 'Online voting for professional colleges',
          url: `/${locale}/solutions/professional-colleges`,
          note: 'Elections for regulated professional bodies.',
        },
        { title: 'Case studies', url: `/${locale}/case-studies`, note: 'Published customer election examples.' },
      ],
    },
    {
      heading: 'Trust and verification',
      entries: [
        { title: 'How secure online voting works', url: `/${locale}/learn/how-secure-online-voting-works` },
        { title: 'Verifiable voting explained', url: `/${locale}/learn/verifiable-voting-explained` },
        {
          title: 'GDPR requirements for digital voting',
          url: `/${locale}/learn/gdpr-requirements-for-digital-voting`,
        },
      ],
    },
    {
      heading: 'Developer resources',
      entries: [
        { title: 'Developer portal', url: `/${locale}/developers`, note: 'The developer platform is in alpha.' },
        { title: 'Developer docs in Markdown', url: `/${locale}/developers/docs.md` },
        { title: 'API reference (OpenAPI)', url: DEVELOPERS_SWAGGER_URL },
        { title: 'GitHub', url: DEVELOPERS_GITHUB_URL },
      ],
    },
  ])
}

// --- plugin -----------------------------------------------------------------

const CONTENT_TYPES: Record<string, string> = {
  '/.well-known/api-catalog': 'application/linkset+json',
  '/llms.txt': 'text/plain; charset=utf-8',
}

export function wellKnownPlugin(options: Options): Plugin {
  let clientOutDir: string
  let isSSRBuild = false
  let ran = false
  const host = stripSlash(options.hostname)

  return {
    name: 'well-known-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      const resolvedOutDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = resolvedOutDir.endsWith(`${path.sep}client`) ? resolvedOutDir : path.join(resolvedOutDir, 'client')
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()
        const url = req.url.split('?')[0]

        if (url === '/.well-known/api-catalog') {
          res.setHeader('Content-Type', CONTENT_TYPES[url])
          return void res.end(buildApiCatalog(host))
        }
        if (url === '/llms.txt') {
          res.setHeader('Content-Type', CONTENT_TYPES[url])
          return void res.end(buildLlms(host, options.defaultLocale))
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
        write('llms.txt', buildLlms(host, options.defaultLocale)),
        write('_headers', buildNetlifyHeaders()),
      ])
    },
  }
}
