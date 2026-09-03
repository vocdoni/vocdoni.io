import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { ARD_OUTPUT_PATHS } from './ard'
import {
  DEVELOPERS_API_BASE_URL,
  DEVELOPERS_SKILLS_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
} from '../lib/developers'
import { buildLlmsFull, buildLlmsIndex, type LlmsContent, type LlmsContext, loadLlmsContent } from '../lib/llms/build'
import { llmsFileName, stripSlash } from '../lib/llms/routes'

/**
 * Emits the agent-discovery artifacts into the client build output (and serves the
 * same content in dev via middleware). All content is derived at build time from the
 * repo's single sources of truth (`lib/developers.ts`, `content/developers/docs/`,
 * `content/blog/`) so nothing can drift.
 *
 * Files emitted (all under `dist/client`):
 *   /.well-known/api-catalog   RFC 9727 linkset+json
 *   /llms.txt                  curated llmstxt.org index (English; see Options.llmsLocales)
 *   /llms-full.txt             complete enumeration of routes and markdown mirrors
 *   /_headers                  Netlify Link: + security headers (X-Robots-Tag on non-production deploys)
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
  /** Every locale the site publishes. Used to enumerate content, not to pick output files. */
  locales: readonly string[]
  /**
   * Locales to emit a curated index for. Defaults to just `defaultLocale`, which is what
   * ships today: one English `/llms.txt`. Setting it emits `llms-<locale>.txt` alongside.
   */
  llmsLocales?: readonly string[]
  /** Non-production deploy: ship `X-Robots-Tag: noindex, nofollow` so it never gets indexed. */
  noindex?: boolean
  /** PostHog ingestion origin, allowlisted in the CSP connect-src. Defaults to the EU cluster. */
  posthogHost?: string
}

// --- pure builders (unit-tested) --------------------------------------------

// RFC 9727 API catalog as an RFC 9264 linkset. Anchored at the API base URL with the
// machine spec (service-desc), human docs (service-doc) and status endpoint.
export function buildApiCatalog(hostname: string, defaultLocale = 'en'): string {
  const host = stripSlash(hostname)
  const doc = {
    linkset: [
      {
        anchor: DEVELOPERS_API_BASE_URL,
        'service-desc': [{ href: DEVELOPERS_SWAGGER_URL, type: 'application/yaml' }],
        'service-doc': [{ href: `${host}/${defaultLocale}/developers/docs`, type: 'text/html' }],
        status: [{ href: DEVELOPERS_STATUS_URL, type: 'text/html' }],
      },
    ],
  }
  return JSON.stringify(doc, null, 2) + '\n'
}

// Content types the static host cannot infer from the file name. Shared by the artifact table
// below (which drives the dev middleware and the build output) and by buildNetlifyHeaders, so the
// emitter and `_headers` can never disagree. `.txt` and `.json` are left to Netlify, which already
// gets them right.
const TEXT = 'text/plain; charset=utf-8'
const API_CATALOG_TYPE = 'application/linkset+json'

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

// --- security headers (ISO 27001 A.8.23 / A.8.26) ---------------------------
// Netlify itself only sends `Strict-Transport-Security: max-age=31536000`; every other security
// header is absent unless emitted here. Three deliberate omissions:
//  - HSTS stays Netlify's default: `includeSubDomains`/`preload` would bind every *.vocdoni.io
//    subdomain (app, APIs, ...) to HTTPS ~forever, an infra-wide decision that is not this repo's
//    to take alone.
//  - Cross-Origin-Embedder-Policy: `require-corp` would break the YouTube and Cal.com iframes.
//  - Cross-Origin-Resource-Policy is `cross-origin` on purpose: og:images, the raw-markdown
//    mirrors, llms.txt and the ARD manifests exist precisely to be fetched from other origins.

export const DEFAULT_POSTHOG_HOST = 'https://eu.i.posthog.com'

// Enforced, not report-only: the site is fully prerendered with a finite set of integrations, and
// every origin below is traced to the code that loads it. `'unsafe-inline'` in script-src is
// unavoidable - Vike injects the hydration payload as an inline <script>, and hashes cannot work
// because this file is emitted at closeBundle, before prerender writes the HTML. Corollary:
// anything GTM is later configured to inject must be allowlisted here first, or it will not load.
function buildContentSecurityPolicy(posthogHost: string): string {
  const googleAnalytics = 'https://www.googletagmanager.com https://*.google-analytics.com'
  return [
    "default-src 'self'",
    // GTM (lib/cookieConsent.ts), Plausible (lib/seo-head.tsx), reCAPTCHA on the contact form
    // (api.js chain-loads its payload from www.gstatic.com) and the Cal.com embed snippet.
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://plausible.io https://www.google.com https://www.gstatic.com https://app.cal.com",
    // Tailwind ships real stylesheets, but Radix/embla set style attributes at runtime.
    "style-src 'self' 'unsafe-inline'",
    // YouTube posters (components/ui/youtube-facade.tsx), images hotlinked in blog posts,
    // GA4/GTM pixels.
    `img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com https://storage.googleapis.com ${googleAnalytics}`,
    // Self-hosted under public/fonts (scripts/copy-fonts.mjs).
    "font-src 'self'",
    // PostHog beacons (lib/posthog.ts), Plausible events, GA4 hits, the contact form
    // (@emailjs/browser) and the Cal.com embed's data fetches.
    `connect-src 'self' ${posthogHost} https://plausible.io https://api.emailjs.com ${googleAnalytics} https://*.analytics.google.com https://app.cal.com`,
    // YouTube embeds (the facade uses -nocookie), the Cal.com booking dialog, the reCAPTCHA
    // widget and GTM's noscript pixel.
    'frame-src https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://www.googletagmanager.com https://app.cal.com https://cal.com',
    "object-src 'none'",
    "base-uri 'self'",
    // The contact form submits via fetch; there is no <form action> anywhere.
    "form-action 'self'",
    // Mirrored by X-Frame-Options for older parsers.
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

const securityHeaders = (posthogHost: string) => [
  `  Content-Security-Policy: ${buildContentSecurityPolicy(posthogHost)}`,
  '  X-Frame-Options: DENY',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()',
  '  Cross-Origin-Opener-Policy: same-origin',
  '  Cross-Origin-Resource-Policy: cross-origin',
]

// Link headers mirroring the <link rel> tags in lib/seo-head.tsx, so the RFC 8288 header check
// passes on every Netlify deploy.
export function buildNetlifyHeaders(noindex = false, posthogHost = DEFAULT_POSTHOG_HOST, defaultLocale = 'en'): string {
  const links = [
    '</.well-known/api-catalog>; rel="api-catalog"',
    `</${defaultLocale}/developers/docs>; rel="service-doc"`,
    `<${DEVELOPERS_SWAGGER_URL}>; rel="service-desc"`,
    `<${DEVELOPERS_SKILLS_URL}>; rel="related"`,
    '</llms.txt>; rel="alternate"; type="text/plain"',
    // ARD section 5.1: a conformant consumer MUST honour a rel="ard" link, so the manifest is
    // discoverable by header as well as by well-known path. rel="ai-catalog" covers readers that
    // only know the predecessor name.
    '</.well-known/ard.json>; rel="ard"',
    '</.well-known/ai-catalog.json>; rel="ai-catalog"',
  ]
  const headers = [...links.map((l) => `  Link: ${l}`), ...securityHeaders(posthogHost)]
  // Dev and preview deploys are production deploys of their own Netlify site, so Netlify does not
  // add this for us. Only the production branch is indexable.
  if (noindex) headers.unshift('  X-Robots-Tag: noindex, nofollow')

  const blocks = [
    block('/*', headers),
    // The catalog file is extensionless, so Netlify sniffs it as `text/plain`. RFC 9727 wants
    // `application/linkset+json`, which the dev middleware already serves.
    block('/.well-known/api-catalog', [`  Content-Type: ${API_CATALOG_TYPE}`]),
    // The `.md` mirrors must stay fetchable - agents consume them, and seo-head advertises them via
    // <link rel="alternate" type="text/markdown"> - but must not be indexed: search crawlers follow
    // those tags, parse the markdown as HTML and then report it as a page with no <title>.
    // `noindex` only; `nofollow` would be counterproductive on a file whose whole job is links.
    ...RAW_MARKDOWN_PATHS.map((p) => block(p, ['  X-Robots-Tag: noindex'])),
    // ARD manifests (plugins/ard.ts). Netlify already types `.json` correctly, so `Content-Type`
    // is belt and braces; `Access-Control-Allow-Origin` is the load-bearing one, because registries
    // fetch these cross-origin and a missing header makes the manifest unreadable to them.
    ...ARD_OUTPUT_PATHS.map((p) =>
      block(`/${p}`, ['  Content-Type: application/json', '  Access-Control-Allow-Origin: *'])
    ),
  ]
  return blocks.join('\n\n') + '\n'
}

// --- plugin -----------------------------------------------------------------

/**
 * One table drives both the dev middleware and the build output, so the two can never
 * drift. `devServable: false` is for files with no meaningful dev representation.
 */
interface Artifact {
  /** Path relative to the client output dir; the served URL is `/` + this. */
  file: string
  contentType: string
  devServable: boolean
  /** `content` is the shared content walk; omitted in dev so each request re-reads disk. */
  build: (root: string, content?: LlmsContent) => string | Promise<string>
}

export function artifactsFor(options: Options): Artifact[] {
  const host = stripSlash(options.hostname)
  const localesToEmit = options.llmsLocales?.length ? options.llmsLocales : [options.defaultLocale]
  const context = (root: string, locale: string, content?: LlmsContent): LlmsContext => ({
    root,
    hostname: host,
    locale,
    defaultLocale: options.defaultLocale,
    locales: options.locales,
    content,
  })

  return [
    {
      file: '.well-known/api-catalog',
      contentType: API_CATALOG_TYPE,
      devServable: true,
      build: () => buildApiCatalog(host, options.defaultLocale),
    },
    ...localesToEmit.map((locale) => ({
      file: llmsFileName(locale, options.defaultLocale),
      contentType: TEXT,
      devServable: true,
      build: (root: string, content?: LlmsContent) => buildLlmsIndex(context(root, locale, content)),
    })),
    {
      file: 'llms-full.txt',
      contentType: TEXT,
      devServable: true,
      build: (root: string, content?: LlmsContent) => buildLlmsFull(context(root, options.defaultLocale, content)),
    },
    {
      file: '_headers',
      contentType: TEXT,
      devServable: false,
      build: () => buildNetlifyHeaders(options.noindex, options.posthogHost, options.defaultLocale),
    },
  ]
}

export function wellKnownPlugin(options: Options): Plugin {
  let clientOutDir: string
  let resolvedRoot: string
  let isSSRBuild = false
  let ran = false
  const artifacts = artifactsFor(options)

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
        const artifact = artifacts.find((a) => a.devServable && `/${a.file}` === url)
        if (!artifact) return next()

        res.setHeader('Content-Type', artifact.contentType)
        res.end(await artifact.build(resolvedRoot))
      })
    },
    async closeBundle() {
      if (isSSRBuild) return
      if (ran) return
      ran = true

      // One content walk shared by every emitted index.
      const content = await loadLlmsContent(resolvedRoot, options.locales)

      await Promise.all(
        artifacts.map(async (artifact) => {
          const out = path.join(clientOutDir, artifact.file)
          await fs.mkdir(path.dirname(out), { recursive: true })
          await fs.writeFile(out, await artifact.build(resolvedRoot, content), 'utf8')
        })
      )
    },
  }
}
