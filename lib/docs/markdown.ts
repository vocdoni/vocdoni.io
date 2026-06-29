import matter from 'gray-matter'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

import { resolveTokens } from '@/lib/docs/tokens'
import { getLocalizedPath } from '@/lib/localized-path'
import { localeDefault, type Locale } from '@/locales'

export { resolveTokens, tokenMap } from '@/lib/docs/tokens'

// ---------------------------------------------------------------------------
// Build-time markdown -> HTML pipeline for the developer docs.
//
// Everything here runs at build/prerender time (server only). The output is a
// static HTML string embedded in the prerendered page; no markdown renderer is
// shipped to the client. The only client-side behaviour is the code copy button
// (a tiny vanilla script in the docs layout) which keys off `[data-copy]`.
//
// Authoring conventions (see the docs migration plan):
//  - GitHub admonitions `> [!NOTE|INFO|TIP|WARNING|CAUTION|DANGER|ERROR]`
//  - block container `:::steps` (headings become numbered steps)
//  - `{{TOKEN}}` placeholders resolved from lib/developers.ts
// ---------------------------------------------------------------------------

export const DOCS_BASE = '/developers/docs'
export const OVERVIEW_SLUG = 'overview'
const CONTENT_PREFIX = '/content/developers/docs/'

// `tokenMap` / `resolveTokens` are re-exported from ./tokens above.

// --- Icons (inlined lucide SVGs, matching the React components) -------------

const ICON_PATHS = {
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  lightbulb:
    '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  triangleAlert:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  shieldAlert:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
} as const

const svgIcon = (inner: string, className: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true">${inner}</svg>`

// --- Callout (admonition) styling, mirrored from components/developers/Callout.tsx

type CalloutVariant = 'note' | 'tip' | 'warning' | 'danger'

const ADMONITION_VARIANTS: Record<string, CalloutVariant> = {
  NOTE: 'note',
  INFO: 'note',
  TIP: 'tip',
  IMPORTANT: 'tip',
  WARNING: 'warning',
  CAUTION: 'danger',
  DANGER: 'danger',
  ERROR: 'danger',
}

const CALLOUT_BASE = 'my-6 flex gap-3 rounded-xl border p-4 text-sm leading-6'
const CALLOUT_VARIANT_CLASS: Record<CalloutVariant, string> = {
  note: 'border-border/70 bg-muted/40 text-foreground',
  tip: 'border-primary/25 bg-primary/5 text-foreground',
  warning: 'border-warning/30 bg-warning/10 text-foreground',
  danger: 'border-destructive/30 bg-destructive/10 text-foreground',
}
const CALLOUT_ICON: Record<CalloutVariant, string> = {
  note: ICON_PATHS.info,
  tip: ICON_PATHS.lightbulb,
  warning: ICON_PATHS.triangleAlert,
  danger: ICON_PATHS.shieldAlert,
}
const CALLOUT_ICON_COLOR: Record<CalloutVariant, string> = {
  note: 'text-muted-foreground',
  tip: 'text-primary',
  warning: 'text-warning',
  danger: 'text-destructive',
}
const CALLOUT_BODY_CLASS =
  'text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_code]:rounded [&_code]:bg-background/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]'

// --- Step styling, mirrored from Steps.tsx ----------------------------------

// Steps render as divs (not ol/li) so Prose's list rules don't fight them.
const STEP_OL = 'my-6 space-y-6'
const STEP_LI = 'relative flex gap-4'
const STEP_BADGE_WRAP = 'flex flex-col items-center'
const STEP_BADGE =
  'z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary'
const STEP_CONNECTOR = 'mt-1 w-px flex-1 bg-border'
const STEP_CONTENT = 'min-w-0 flex-1 pb-2'
// Compact step title, overriding Prose's h2/h3 styling (important wins over the
// descendant selectors). Mirrors the old <Step> title.
const STEP_HEADING = 'mt-0! mb-2! text-base! font-semibold! tracking-normal!'

const CODE_WRAPPER = 'relative my-6 overflow-hidden rounded-xl border border-border/60 bg-zinc-950 shadow-sm'
const CODE_PRE = 'overflow-x-auto p-4 font-mono text-[13px] leading-6 text-zinc-100'
const CODE_COPY_BTN =
  'press-scale absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'

// --- Endpoint pill, mirrored from the old Endpoint.tsx (per-method colours) --

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const
type HttpMethod = (typeof HTTP_METHODS)[number]

const ENDPOINT_ROW =
  'my-3 flex items-center gap-3 overflow-x-auto rounded-lg border border-border/60 bg-muted/30 px-3 py-2'
const ENDPOINT_PILL_BASE =
  'inline-flex shrink-0 items-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold uppercase ring-1 ring-inset'
const ENDPOINT_PATH = 'whitespace-nowrap font-mono text-[13px] text-foreground'
const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-sky-500/20',
  POST: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 ring-zinc-500/20',
  PUT: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/20',
  DELETE: 'bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20',
  PATCH: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-violet-500/20',
}

// --- Property table, mirrored from the old PropertyTable.tsx -----------------

const TABLE_WRAP = 'my-6 overflow-hidden rounded-xl border border-border/60'
const TABLE = 'w-full border-collapse text-left text-sm'
const TABLE_HEAD_ROW = 'bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground'
const TABLE_TH = 'px-4 py-2.5 font-medium'
const TABLE_BODY_ROW = 'border-t border-border/60 align-top'
const TABLE_TD = 'px-4 py-3 text-muted-foreground'
const TABLE_TD_NAME = 'whitespace-nowrap px-4 py-3'
const TABLE_TD_TYPE = 'whitespace-nowrap px-4 py-3 font-mono text-[13px] text-muted-foreground'
const TABLE_CODE_NAME = 'font-mono text-[13px] text-foreground'
const REQUIRED_PILL =
  'ml-2 rounded bg-destructive/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive'

// A field cell may carry the literal marker `(required)`; it renders as the red
// REQUIRED pill (label localized; the marker itself stays an English keyword so
// the raw markdown is explicit for both humans and LLMs).
const REQUIRED_MARKER = /\s*\(required\)\s*/i
const REQUIRED_LABEL: Record<string, string> = {
  en: 'Required',
  es: 'Obligatorio',
  ca: 'Obligatori',
  de: 'Erforderlich',
  el: 'Απαιτείται',
  eu: 'Beharrezkoa',
  fr: 'Requis',
  it: 'Obbligatorio',
  pt: 'Obrigatório',
}

// --- Tiny hast helpers ------------------------------------------------------

type HastNode = any

const h = (tagName: string, properties: Record<string, unknown>, children: HastNode[] = []): HastNode => ({
  type: 'element',
  tagName,
  properties,
  children,
})
const t = (value: string): HastNode => ({ type: 'text', value })
const raw = (value: string): HastNode => ({ type: 'raw', value })

const hasClass = (node: HastNode, name: string): boolean => {
  const c = node?.properties?.className
  if (Array.isArray(c)) return c.includes(name)
  if (typeof c === 'string') return c.split(/\s+/).includes(name)
  return false
}

const isWhitespace = (node: HastNode): boolean => node.type === 'text' && /^\s*$/.test(node.value)

const hastText = (node: HastNode): string => {
  if (node.type === 'text') return node.value
  if (node.type === 'raw') return ''
  if (Array.isArray(node.children)) return node.children.map(hastText).join('')
  return ''
}

const findDescendant = (node: HastNode, tagName: string): HastNode | undefined => {
  if (!node.children) return undefined
  for (const child of node.children) {
    if (child.type === 'element' && child.tagName === tagName) return child
    const nested = findDescendant(child, tagName)
    if (nested) return nested
  }
  return undefined
}

// --- remark: map the :::steps directive to a placeholder div ----------------

function remarkDocDirectives() {
  return (tree: HastNode) => {
    visit(tree, (node: HastNode) => {
      if (node.type !== 'containerDirective' && node.type !== 'leafDirective') return
      if (node.name !== 'steps') return
      const data = node.data || (node.data = {})
      data.hName = 'div'
      data.hProperties = { className: ['steps-root'] }
    })
  }
}

// --- rehype: GitHub admonitions -> Callout markup ---------------------------

function rehypeAdmonitions() {
  return (tree: HastNode) => {
    visit(tree, 'element', (node: HastNode, index: number | undefined, parent: HastNode | undefined) => {
      if (node.tagName !== 'blockquote' || !parent || index === undefined) return
      const firstP = node.children.find((c: HastNode) => c.type === 'element' && c.tagName === 'p')
      if (!firstP) return
      const firstText = firstP.children.find((c: HastNode) => c.type === 'text')
      if (!firstText) return

      const match = /^\s*\[!(\w+)\]([^\n]*)\n?([\s\S]*)$/.exec(firstText.value)
      if (!match) return
      const variant = ADMONITION_VARIANTS[match[1].toUpperCase()]
      if (!variant) return

      const title = match[2].trim()
      const remainder = match[3]
      firstText.value = remainder
      // Drop the first paragraph if the marker line was all it held.
      if (firstP.children.every((c: HastNode) => (c.type === 'text' ? c.value === '' : false))) {
        node.children = node.children.filter((c: HastNode) => c !== firstP)
      }

      const innerChildren: HastNode[] = []
      if (title) innerChildren.push(h('p', { className: 'font-semibold text-foreground' }, [t(title)]))
      innerChildren.push(h('div', { className: CALLOUT_BODY_CLASS }, node.children))

      parent.children[index] = h(
        'div',
        { className: `${CALLOUT_BASE} ${CALLOUT_VARIANT_CLASS[variant]} [&_p]:my-0!`, role: 'note' },
        [
          raw(svgIcon(CALLOUT_ICON[variant], `mt-0.5 size-5 shrink-0 ${CALLOUT_ICON_COLOR[variant]}`)),
          h('div', { className: 'min-w-0 space-y-1' }, innerChildren),
        ]
      )
    })
  }
}

// --- rehype: ¶ permalink on main sections (h2 only) -------------------------

// rehype-slug gives every heading an id (so deep links to any subsection work);
// this only prepends the visible ¶ permalink to top-level sections, not h3+.
const SECTION_ANCHOR = [
  'heading-anchor',
  'mr-2',
  'text-[0.8em]',
  'font-normal',
  'text-muted-foreground/50',
  'no-underline',
  'hover:text-primary',
]

// Pilcrow kept in a const so the i18next extractor does not mistake this local
// `t()` text-node helper for a react-i18next translation call.
const PILCROW = '¶'

function rehypeMainSectionAnchors() {
  return (tree: HastNode) => {
    visit(tree, 'element', (node: HastNode) => {
      if (node.tagName !== 'h2') return
      const id = node.properties?.id
      if (!id) return
      node.children.unshift(
        h('a', { href: `#${id}`, className: SECTION_ANCHOR, ariaLabel: 'Permalink to this section' }, [t(PILCROW)])
      )
    })
  }
}

// --- rehype: :::steps -> numbered steps -------------------------------------

function rehypeSteps() {
  return (tree: HastNode) => {
    visit(tree, 'element', (node: HastNode, index: number | undefined, parent: HastNode | undefined) => {
      if (!hasClass(node, 'steps-root') || !parent || index === undefined) return
      const children: HastNode[] = node.children.filter((c: HastNode) => !isWhitespace(c))

      const preamble: HastNode[] = []
      const groups: { heading: HastNode; body: HastNode[] }[] = []
      for (const child of children) {
        if (child.type === 'element' && /^h[1-6]$/.test(child.tagName)) {
          groups.push({ heading: child, body: [] })
        } else if (groups.length) {
          groups[groups.length - 1].body.push(child)
        } else {
          preamble.push(child)
        }
      }

      if (!groups.length) {
        // Nothing to number - unwrap the content as-is.
        parent.children.splice(index, 1, ...children)
        return [SKIP, index]
      }

      const items = groups.map((group, i) => {
        // Override Prose's heading styling so the step title stays compact.
        group.heading.properties = group.heading.properties || {}
        group.heading.properties.className = STEP_HEADING
        return h('div', { className: STEP_LI, role: 'listitem' }, [
          h(
            'div',
            { className: STEP_BADGE_WRAP },
            [
              h('span', { className: STEP_BADGE }, [t(String(i + 1))]),
              i < groups.length - 1 ? h('span', { className: STEP_CONNECTOR, 'aria-hidden': 'true' }, []) : null,
            ].filter(Boolean) as HastNode[]
          ),
          h('div', { className: STEP_CONTENT }, [group.heading, ...group.body]),
        ])
      })

      const replacement = [...preamble, h('div', { className: STEP_OL, role: 'list' }, items)]
      parent.children.splice(index, 1, ...replacement)
      return [SKIP, index + replacement.length]
    })
  }
}

// --- rehype: endpoint lists -> method-pill rows -----------------------------

// A list item is an endpoint when it is `**METHOD** \`/path\`` -> a <strong>
// holding an HTTP method plus a <code> holding the path.
function endpointFromItem(li: HastNode): { method: HttpMethod; path: string } | null {
  const strong = findDescendant(li, 'strong')
  const code = findDescendant(li, 'code')
  if (!strong || !code) return null
  const method = hastText(strong).trim().toUpperCase()
  if (!HTTP_METHODS.includes(method as HttpMethod)) return null
  return { method: method as HttpMethod, path: hastText(code).trim() }
}

function rehypeEndpoints() {
  return (tree: HastNode) => {
    visit(tree, 'element', (node: HastNode, index: number | undefined, parent: HastNode | undefined) => {
      if (node.tagName !== 'ul' || !parent || index === undefined) return
      const items: HastNode[] = node.children.filter((c: HastNode) => c.type === 'element' && c.tagName === 'li')
      if (!items.length) return
      const endpoints = items.map(endpointFromItem)
      if (endpoints.some((e) => e === null)) return // only convert pure endpoint lists

      const rows = endpoints.map((e) =>
        h('div', { className: ENDPOINT_ROW }, [
          h('span', { className: `${ENDPOINT_PILL_BASE} ${METHOD_STYLES[e!.method]}` }, [t(e!.method)]),
          h('span', { className: ENDPOINT_PATH }, [t(e!.path)]),
        ])
      )
      parent.children.splice(index, 1, ...rows)
      return [SKIP, index + rows.length]
    })
  }
}

// --- rehype: style GFM tables like the old PropertyTable --------------------

function rehypeTables(requiredLabel: string) {
  return (tree: HastNode) => {
    visit(tree, 'element', (node: HastNode, index: number | undefined, parent: HastNode | undefined) => {
      if (node.tagName !== 'table' || !parent || index === undefined) return
      if (hasClass(parent, 'table-wrap')) return

      node.properties = { ...(node.properties || {}), className: TABLE }

      visit(node, 'element', (el: HastNode) => {
        if (el.tagName === 'thead') {
          visit(el, 'element', (h2: HastNode) => {
            if (h2.tagName === 'tr') h2.properties = { ...(h2.properties || {}), className: TABLE_HEAD_ROW }
            if (h2.tagName === 'th') h2.properties = { ...(h2.properties || {}), className: TABLE_TH }
          })
        }
        if (el.tagName === 'tbody') {
          for (const row of el.children) {
            if (row.type !== 'element' || row.tagName !== 'tr') continue
            row.properties = { ...(row.properties || {}), className: TABLE_BODY_ROW }
            const cells = row.children.filter((c: HastNode) => c.type === 'element' && c.tagName === 'td')
            cells.forEach((td: HastNode, col: number) => {
              if (col === 0) {
                td.properties = { ...(td.properties || {}), className: TABLE_TD_NAME }
                const code = findDescendant(td, 'code')
                if (code) code.properties = { ...(code.properties || {}), className: TABLE_CODE_NAME }
                // `(required)` marker -> red REQUIRED pill next to the field name.
                if (REQUIRED_MARKER.test(hastText(td))) {
                  visit(td, 'text', (textNode: HastNode) => {
                    textNode.value = textNode.value.replace(REQUIRED_MARKER, '')
                  })
                  td.children.push(h('span', { className: REQUIRED_PILL }, [t(requiredLabel)]))
                }
              } else if (col === 1) {
                td.properties = { ...(td.properties || {}), className: TABLE_TD_TYPE }
              } else {
                td.properties = { ...(td.properties || {}), className: TABLE_TD }
              }
            })
          }
        }
      })

      parent.children[index] = h('div', { className: `table-wrap ${TABLE_WRAP}` }, [node])
      return [SKIP, index]
    })
  }
}

// --- rehype: dark code surface + copy button --------------------------------

function rehypeCodeSurface() {
  return (tree: HastNode) => {
    visit(tree, 'element', (node: HastNode, index: number | undefined, parent: HastNode | undefined) => {
      if (node.tagName !== 'pre' || !parent || index === undefined) return
      if (hasClass(parent, 'code-surface-inner')) return
      node.properties = node.properties || {}
      node.properties.className = CODE_PRE
      const button = h('button', { type: 'button', className: CODE_COPY_BTN, 'data-copy': '', 'aria-label': 'Copy' }, [
        raw(svgIcon(ICON_PATHS.copy, 'size-4')),
      ])
      parent.children[index] = h('div', { className: `code-surface-inner ${CODE_WRAPPER}` }, [button, node])
      return [SKIP, index]
    })
  }
}

// --- rehype: localize internal links ----------------------------------------

function rehypeLocalizeLinks(locale: Locale) {
  return (tree: HastNode) => {
    visit(tree, 'element', (node: HastNode) => {
      if (node.tagName !== 'a') return
      const href = node.properties?.href
      if (typeof href !== 'string' || !href.startsWith('/')) return
      node.properties.href = getLocalizedPath(href, locale)
    })
  }
}

// --- compile ----------------------------------------------------------------

export interface CompileOptions {
  locale?: Locale
  tokens?: Record<string, string>
}

// Compiles a markdown body (frontmatter already stripped) to an HTML string.
export function compile(markdown: string, options: CompileOptions = {}): string {
  const locale = options.locale ?? localeDefault
  const requiredLabel = REQUIRED_LABEL[locale] ?? REQUIRED_LABEL[localeDefault]
  const resolved = resolveTokens(markdown, options.tokens)
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkDocDirectives)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeMainSectionAnchors)
    .use(rehypeAdmonitions)
    .use(rehypeSteps)
    .use(rehypeEndpoints)
    .use(rehypeTables, requiredLabel)
    .use(rehypeCodeSurface)
    .use(rehypeLocalizeLinks, locale)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(resolved)
  return String(file)
}

// --- Content files (glob) ---------------------------------------------------

// A "reference" / "where to go next" navigation card. Defined in frontmatter
// (not the body) so it stays out of the LLM-facing markdown and can carry an
// icon. Rendered by components/developers/DocReference.tsx.
export interface DocReferenceItem {
  title: string
  description?: string
  href: string
  icon?: string
  external: boolean
}
export interface DocReference {
  title: string
  columns: 2 | 3
  items: DocReferenceItem[]
}

export interface DocFrontmatter {
  title: string
  lead?: string
  description?: string
  group?: string
  order?: number
  reference?: DocReference
}

function parseReference(value: unknown): DocReference | undefined {
  if (!value || typeof value !== 'object') return undefined
  const r = value as Record<string, unknown>
  if (typeof r.title !== 'string' || !Array.isArray(r.items)) return undefined

  const items: DocReferenceItem[] = []
  for (const entry of r.items) {
    if (!entry || typeof entry !== 'object') continue
    const it = entry as Record<string, unknown>
    if (typeof it.title !== 'string' || typeof it.href !== 'string') continue
    const href = resolveTokens(it.href)
    items.push({
      title: it.title,
      description: typeof it.description === 'string' ? it.description : undefined,
      href,
      icon: typeof it.icon === 'string' ? it.icon : undefined,
      external: it.external === true || /^https?:/.test(href),
    })
  }
  if (!items.length) return undefined
  return { title: r.title, columns: r.columns === 3 ? 3 : 2, items }
}

export interface LoadedDoc {
  slug: string
  locale: Locale
  usedLocale: Locale
  frontmatter: DocFrontmatter
  html: string
  rawHref: string
}

export type DocFileMap = Record<string, string>

// Eagerly loaded raw markdown sources. Keys look like
// `/content/developers/docs/en/quickstart.md`. Server/build only.
const DOC_FILES = import.meta.glob('/content/developers/docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as DocFileMap

const parseKey = (key: string): { locale: string; slug: string } | null => {
  if (!key.startsWith(CONTENT_PREFIX)) return null
  const rest = key.slice(CONTENT_PREFIX.length).replace(/\.md$/, '')
  const [locale, ...slugParts] = rest.split('/')
  if (!locale || !slugParts.length) return null
  return { locale, slug: slugParts.join('/') }
}

// locale -> slug -> raw source
function indexFiles(files: DocFileMap): Map<string, Map<string, string>> {
  const byLocale = new Map<string, Map<string, string>>()
  for (const [key, source] of Object.entries(files)) {
    const parsed = parseKey(key)
    if (!parsed) continue
    if (!byLocale.has(parsed.locale)) byLocale.set(parsed.locale, new Map())
    byLocale.get(parsed.locale)!.set(parsed.slug, source)
  }
  return byLocale
}

// Slugs available for routing/nav, taken from the canonical English folder and
// excluding the overview (which is served by the docs index route).
export function allDocSlugs(files: DocFileMap = DOC_FILES): string[] {
  const byLocale = indexFiles(files)
  const en = byLocale.get(localeDefault)
  if (!en) return []
  return Array.from(en.keys())
    .filter((slug) => slug !== OVERVIEW_SLUG)
    .sort()
}

// Loads one doc for a locale, falling back to English when the localized file
// is missing. Returns null when neither exists.
export function loadDoc(slug: string, locale: Locale, files: DocFileMap = DOC_FILES): LoadedDoc | null {
  const byLocale = indexFiles(files)
  const localized = byLocale.get(locale)?.get(slug)
  const usedLocale: Locale = localized !== undefined ? locale : localeDefault
  const source = localized ?? byLocale.get(localeDefault)?.get(slug)
  if (source === undefined) return null

  const { data, content } = matter(source)
  const frontmatter: DocFrontmatter = {
    title: typeof data.title === 'string' ? data.title : slug,
    lead: typeof data.lead === 'string' ? data.lead : undefined,
    description: typeof data.description === 'string' ? data.description : undefined,
    group: typeof data.group === 'string' ? data.group : undefined,
    order: typeof data.order === 'number' ? data.order : undefined,
    reference: parseReference(data.reference),
  }

  return {
    slug,
    locale,
    usedLocale,
    frontmatter,
    html: compile(content, { locale }),
    // Mirror the page route: /<locale>/developers/docs/<slug>.md (overview at
    // /<locale>/developers/docs.md). Emitted per-locale by the build plugin, so
    // we use the requested locale even on en-fallback pages.
    rawHref: rawHrefFor(locale, slug),
  }
}

// Raw-markdown URL that mirrors the rendered page route + `.md`.
export function rawHrefFor(locale: string, slug: string): string {
  return slug === OVERVIEW_SLUG ? `/${locale}/developers/docs.md` : `/${locale}/developers/docs/${slug}.md`
}

export interface DocMeta {
  slug: string
  group: string
  order: number
  titles: Record<string, string>
}

// Frontmatter-only metadata for every slug across locales, used to build the
// navigation. Group/order come from the canonical English file.
export function listDocsMeta(files: DocFileMap = DOC_FILES): DocMeta[] {
  const byLocale = indexFiles(files)
  const en = byLocale.get(localeDefault)
  if (!en) return []

  const metas: DocMeta[] = []
  for (const slug of en.keys()) {
    const titles: Record<string, string> = {}
    let group = ''
    let order = 0
    for (const [locale, slugMap] of byLocale.entries()) {
      const source = slugMap.get(slug)
      if (source === undefined) continue
      const { data } = matter(source)
      if (typeof data.title === 'string') titles[locale] = data.title
      if (locale === localeDefault) {
        group = typeof data.group === 'string' ? data.group : ''
        order = typeof data.order === 'number' ? data.order : 0
      }
    }
    metas.push({ slug, group, order, titles })
  }
  return metas
}

export { DOC_FILES }
