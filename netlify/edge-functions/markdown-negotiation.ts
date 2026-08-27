import { MARKDOWN_CONTENT_TYPE, markdownTwinFor, mergeVary, prefersMarkdown } from '../../lib/markdown-negotiation.ts'
import { locales } from '../../locales/index.ts'

/**
 * "Markdown for Agents": serve the markdown twin of a page to clients that ask for
 * `Accept: text/markdown`, while browsers keep getting the HTML.
 * https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 *
 * The twins are already built and served as static files by `plugins/docs-markdown.ts` and
 * `plugins/blog-markdown.ts`; this only picks between the two representations. All the logic that
 * can be decided without the network lives in `lib/markdown-negotiation.ts`, which is unit tested -
 * this file is the thin Deno shell, mirroring the pure-builder + thin-plugin split used across
 * `plugins/`.
 *
 * Why an edge function at all: the site is fully prerendered with no runtime server, and Netlify's
 * `_redirects` conditions are limited to country/language/role/cookie/query - a request header is
 * not matchable there.
 *
 * Keeping `_headers` intact is the point of the `header` condition in the declaration below. Netlify
 * does not apply custom headers to a URL handled by an edge function, and `plugins/well-known.ts`
 * emits site-wide `Link:` headers plus `X-Robots-Tag` on non-production deploys. The declaration
 * therefore only matches requests that already mention `text/markdown`, so no browser request is
 * ever routed through here. For the requests that do reach it, the twin is fetched through the
 * normal request chain, which means the static response already carries everything `_headers` adds;
 * we forward those headers verbatim and only override content type and `Vary`.
 *
 * `x-markdown-tokens` (optional in the Cloudflare reference) is deliberately not set: there is no
 * tokenizer at the edge, and a guessed count would be worse than no header.
 *
 * Note there is no `import type { Config }` from `@netlify/edge-functions`: the declaration is a
 * plain object so the bundle has no npm dependency to resolve. The imports below spell out the
 * `.ts` extension because Deno resolves modules by URL; `allowImportingTsExtensions` in
 * `tsconfig.json` is what keeps this file inside the repo's type check anyway.
 */
export default async (request: Request): Promise<Response | undefined> => {
  if (!prefersMarkdown(request.headers.get('accept'))) return

  const url = new URL(request.url)
  const twin = markdownTwinFor(url.pathname, locales)
  if (!twin) return

  // A page whose twin does not exist (a draft post, a locale that never got one) 404s here; falling
  // through serves the HTML rather than propagating the 404.
  // Mirror the incoming method: a HEAD must not pull the twin's body down just to discard it.
  const response = await fetch(new URL(twin, url), { method: request.method })
  if (!response.ok) return

  const headers = new Headers(response.headers)
  // The body is handed on as it came out of fetch, which decodes any transfer compression, so these
  // two would describe the encoded bytes we no longer have. Netlify sets both itself.
  headers.delete('content-encoding')
  headers.delete('content-length')
  headers.set('content-type', MARKDOWN_CONTENT_TYPE)
  // Without this a shared cache could hand the markdown to a browser asking for the same URL.
  // Merged rather than set: Netlify serves the twin with its own `Vary` (typically
  // `Accept-Encoding`), and clobbering that would stop caches varying on it.
  headers.set('vary', mergeVary(headers.get('vary'), 'Accept'))

  return new Response(response.body, { status: response.status, headers })
}

export const config = {
  path: ['/:locale/blog/:slug', '/:locale/developers/docs', '/:locale/developers/docs/:slug'],
  // The twins themselves are plain static files and must never be negotiated again.
  excludedPath: '/*.md',
  // GET only: Netlify's edge-function manifest schema allows GET/POST/PUT/PATCH/DELETE/OPTIONS,
  // and declaring HEAD fails manifest validation at deploy time ("ENUM must be equal to one of the
  // allowed values"). Netlify serves HEAD off the static path, which is the right answer anyway.
  method: ['GET'],
  // Cheap prefilter so browsers never reach this function; `prefersMarkdown` does the real parsing.
  header: { accept: 'text/markdown' },
}
