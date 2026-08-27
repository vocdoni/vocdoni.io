/**
 * "Markdown for Agents" content negotiation - the pure half.
 *
 * An agent that sends `Accept: text/markdown` for an HTML page URL should get the markdown twin of
 * that page instead of the HTML. The twins already exist: `plugins/docs-markdown.ts` and
 * `plugins/blog-markdown.ts` emit one `.md` file per doc/post into `dist/client` at build time, so
 * negotiation is only a mapping (page URL -> twin URL) plus an `Accept` decision.
 *
 * The site is fully prerendered with no runtime server, and Netlify's `_redirects` can only branch
 * on country/language/role/cookie/query - never on an arbitrary request header. So the decision has
 * to run in a Netlify edge function (`netlify/edge-functions/markdown-negotiation.ts`), which is a
 * Deno runtime. Everything that can be decided without the network lives here instead: dependency
 * free, unit tested (`tests/lib/markdown-negotiation.test.ts`) and importable from both sides.
 *
 * Reference: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

/** Media type the twins are negotiated for. */
export const MARKDOWN_MEDIA_TYPE = 'text/markdown'

/** `Content-Type` for a negotiated markdown response. */
export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8'

export interface AcceptEntry {
  /** Lowercased media range, e.g. `text/markdown`, `text/*` or the fully wildcard range. */
  type: string
  /** Quality value in [0, 1]; 1 when absent or unparsable. */
  quality: number
  /** RFC 9110 media-range specificity: 2 for a concrete type, 1 for `type/*`, 0 for fully wildcard. */
  specificity: number
  /** Position in the header, used as the last tiebreaker. */
  index: number
}

const specificityOf = (type: string): number => {
  if (type === '*/*') return 0
  if (type.endsWith('/*')) return 1
  return 2
}

/**
 * Parses an `Accept` header into media ranges with their q-values, in header order.
 * Unparsable or empty entries are dropped; a missing/invalid `q` parameter means `q=1`.
 */
export function parseAcceptHeader(header: string | null | undefined): AcceptEntry[] {
  if (!header) return []
  const entries: AcceptEntry[] = []
  for (const part of header.split(',')) {
    const [rawType, ...params] = part.split(';')
    const type = rawType.trim().toLowerCase()
    if (!type || !type.includes('/')) continue
    let quality = 1
    for (const param of params) {
      const [key, value] = param.split('=')
      if (key.trim().toLowerCase() !== 'q') continue
      const parsed = Number.parseFloat(value ?? '')
      if (Number.isFinite(parsed)) quality = Math.min(Math.max(parsed, 0), 1)
    }
    entries.push({ type, quality, specificity: specificityOf(type), index: entries.length })
  }
  return entries
}

// Best candidate by q, then media-range specificity, then header order.
const best = (entries: AcceptEntry[]): AcceptEntry | null =>
  entries.reduce<AcceptEntry | null>((acc, entry) => {
    if (!acc) return entry
    if (entry.quality !== acc.quality) return entry.quality > acc.quality ? entry : acc
    if (entry.specificity !== acc.specificity) return entry.specificity > acc.specificity ? entry : acc
    return acc
  }, null)

/**
 * Whether the client genuinely prefers markdown over HTML.
 *
 * Only an explicit `text/markdown` counts for markdown - a wildcard never does, so curl's default
 * fully wildcard Accept and a browser's `text/html,...` (wildcard at q=0.8) both keep getting HTML.
 * HTML is matched by `text/html` *and* by the wildcards that cover it, so `Accept:
 * text/markdown;q=0.5, text/html` correctly resolves to HTML. Ties are broken by RFC 9110
 * specificity (an explicitly named `text/markdown` beats a wildcard of equal q) and then by header
 * order.
 */
export function prefersMarkdown(header: string | null | undefined): boolean {
  const entries = parseAcceptHeader(header)
  const markdown = best(entries.filter((e) => e.type === MARKDOWN_MEDIA_TYPE))
  if (!markdown || markdown.quality === 0) return false

  const html = best(entries.filter((e) => e.type === 'text/html' || e.type === 'text/*' || e.type === '*/*'))
  if (!html || html.quality === 0) return true

  if (markdown.quality !== html.quality) return markdown.quality > html.quality
  if (markdown.specificity !== html.specificity) return markdown.specificity > html.specificity
  return markdown.index < html.index
}

/**
 * Maps a page pathname to the pathname of its markdown twin, or `null` when the page has no twin.
 *
 * The three shapes with a twin (see the plugins named at the top of this file):
 *   /<locale>/developers/docs        -> /<locale>/developers/docs.md
 *   /<locale>/developers/docs/<slug> -> /<locale>/developers/docs/<slug>.md
 *   /<locale>/blog/<slug>            -> /<locale>/blog/<slug>.md
 *
 * Everything else returns `null` so the request falls through to the HTML - including the
 * unprefixed compatibility routes (`/blog/<slug>`), which are locale-redirect shells with no twin
 * of their own. A path that is already a `.md` twin returns `null` too, so fetching the twin can
 * never re-enter negotiation.
 */
export function markdownTwinFor(pathname: string, locales: readonly string[]): string | null {
  const clean = pathname.split('?')[0].split('#')[0]
  if (!clean.startsWith('/') || clean.includes('..') || clean.endsWith('.md')) return null

  const segments = clean.replace(/^\/+/, '').replace(/\/+$/, '').split('/')
  const [locale, ...rest] = segments
  if (!locales.includes(locale)) return null
  if (rest.some((segment) => segment === '')) return null

  if (rest.length === 2 && rest[0] === 'blog') return `/${locale}/blog/${rest[1]}.md`
  if (rest[0] !== 'developers' || rest[1] !== 'docs') return null
  if (rest.length === 2) return `/${locale}/developers/docs.md`
  if (rest.length === 3) return `/${locale}/developers/docs/${rest[2]}.md`
  return null
}

/**
 * Add a field name to a `Vary` header without discarding what is already there. The twin is served
 * by Netlify, which sets its own `Vary` (commonly `Accept-Encoding`); replacing that outright would
 * tell shared caches to stop varying on the thing it does vary on. Case-insensitive, order
 * preserving, and a `*` value stays `*` because it already covers everything.
 */
export function mergeVary(existing: string | null | undefined, field: string): string {
  const current = (existing ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  if (current.some((part) => part === '*')) return '*'
  if (current.some((part) => part.toLowerCase() === field.toLowerCase())) return current.join(', ')
  return [...current, field].join(', ')
}
