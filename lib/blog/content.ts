import { categoryDisplayName } from '@/lib/blog/category-names'
import { compile } from '@/lib/docs/markdown'
import { localeDefault, type Locale, locales } from '@/locales'
import matter from 'gray-matter'

// ---------------------------------------------------------------------------
// Build-time blog content loader.
//
// Posts are markdown-with-frontmatter files authored through Keystatic and stored
// at content/blog/<locale>/<slug>.mdoc. This module discovers them with Vite's
// import.meta.glob, parses frontmatter with gray-matter, and compiles the body to
// HTML with the shared docs pipeline (lib/docs/markdown.ts) so blog prose matches
// the rest of the site. Server/build only - never imported by client components
// (they receive the already-loaded data through useData()).
//
// Locale resolution: a requested locale falls back to English, then to any locale
// that has the post, so switching language never hides content (per product spec).
// ---------------------------------------------------------------------------

export const BLOG_BASE = '/blog'
export const BLOG_CATEGORY_BASE = '/blog/category'

// Drafts are visible while developing, excluded from the built/prerendered site.
// Must be the static `import.meta.env.DEV` form so Vike replaces it at build time;
// an optional-chained read (`?.DEV`) is swapped for `null` and would disable drafts in dev.
const INCLUDE_DRAFTS = Boolean(import.meta.env.DEV)

export interface BlogSeo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  canonicalUrl?: string
}

export interface BlogFrontmatter {
  title: string
  publishedDate: string
  updatedDate?: string
  excerpt?: string
  coverImage?: string
  coverAlt?: string
  authors: string[]
  categories: string[]
  featured: boolean
  draft: boolean
  seo?: BlogSeo
}

export interface BlogAuthor {
  slug: string
  name: string
  role?: string
  avatar?: string
  website?: string
  bioHtml?: string
}

export interface BlogCategory {
  slug: string
  name: string
  descriptionHtml?: string
}

export interface BlogPostMeta {
  slug: string
  href: string
  locale: Locale
  usedLocale: Locale
  availableLocales: Locale[]
  frontmatter: BlogFrontmatter
  readingMinutes: number
  authors: BlogAuthor[]
  categories: BlogCategory[]
}

export interface LoadedBlogPost extends BlogPostMeta {
  html: string
}

// --- raw file maps ----------------------------------------------------------

type FileMap = Record<string, string>

const POST_FILES = import.meta.glob('/content/blog/*/*.mdoc', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as FileMap
const AUTHOR_FILES = import.meta.glob('/content/blog/authors/*.mdoc', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as FileMap
const CATEGORY_FILES = import.meta.glob('/content/blog/categories/*.mdoc', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as FileMap

const POST_PREFIX = '/content/blog/'

// key `/content/blog/en/my-post.mdoc` -> { locale:'en', slug:'my-post' }.
// Author/category files share the prefix but their first segment is not a locale,
// so they are skipped here.
const parsePostKey = (key: string): { locale: Locale; slug: string } | null => {
  if (!key.startsWith(POST_PREFIX)) return null
  const rest = key.slice(POST_PREFIX.length).replace(/\.mdoc$/, '')
  const [locale, ...slugParts] = rest.split('/')
  if (!locale || !slugParts.length) return null
  if (!(locales as readonly string[]).includes(locale)) return null
  return { locale: locale as Locale, slug: slugParts.join('/') }
}

const slugFromKey = (key: string): string => key.slice(key.lastIndexOf('/') + 1).replace(/\.mdoc$/, '')

// locale -> slug -> raw source
let postIndexCache: Map<Locale, Map<string, string>> | null = null
const postIndex = (): Map<Locale, Map<string, string>> => {
  if (postIndexCache) return postIndexCache
  const byLocale = new Map<Locale, Map<string, string>>()
  for (const [key, source] of Object.entries(POST_FILES)) {
    const parsed = parsePostKey(key)
    if (!parsed) continue
    if (!byLocale.has(parsed.locale)) byLocale.set(parsed.locale, new Map())
    byLocale.get(parsed.locale)!.set(parsed.slug, source)
  }
  postIndexCache = byLocale
  return byLocale
}

// --- frontmatter parsing ----------------------------------------------------

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []

const parseFrontmatter = (data: Record<string, unknown>, slug: string): BlogFrontmatter => {
  const seoRaw = (data.seo && typeof data.seo === 'object' ? data.seo : {}) as Record<string, unknown>
  const seo: BlogSeo = {
    metaTitle: typeof seoRaw.metaTitle === 'string' ? seoRaw.metaTitle : undefined,
    metaDescription: typeof seoRaw.metaDescription === 'string' ? seoRaw.metaDescription : undefined,
    ogImage: typeof seoRaw.ogImage === 'string' ? seoRaw.ogImage : undefined,
    canonicalUrl: typeof seoRaw.canonicalUrl === 'string' ? seoRaw.canonicalUrl : undefined,
  }
  const publishedDate = typeof data.publishedDate === 'string' ? data.publishedDate : String(data.publishedDate ?? '')
  return {
    title: typeof data.title === 'string' ? data.title : slug,
    publishedDate,
    updatedDate: typeof data.updatedDate === 'string' ? data.updatedDate : undefined,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : undefined,
    coverImage: typeof data.coverImage === 'string' ? data.coverImage : undefined,
    coverAlt: typeof data.coverAlt === 'string' ? data.coverAlt : undefined,
    authors: asStringArray(data.authors),
    categories: asStringArray(data.categories),
    featured: data.featured === true,
    draft: data.draft === true,
    seo: Object.values(seo).some(Boolean) ? seo : undefined,
  }
}

const wordCount = (markdown: string): number => {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_~\-|]/g, ' ')
    .replace(/<[^>]+>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean)
  return words.length
}

const readingMinutes = (markdown: string): number => Math.max(1, Math.round(wordCount(markdown) / 200))

// --- authors & categories ---------------------------------------------------

let authorCache: Map<string, BlogAuthor> | null = null
const authorIndex = (): Map<string, BlogAuthor> => {
  if (authorCache) return authorCache
  const map = new Map<string, BlogAuthor>()
  for (const [key, source] of Object.entries(AUTHOR_FILES)) {
    const slug = slugFromKey(key)
    const { data, content } = matter(source)
    map.set(slug, {
      slug,
      name: typeof data.name === 'string' ? data.name : slug,
      role: typeof data.role === 'string' && data.role.trim() ? data.role : undefined,
      avatar: typeof data.avatar === 'string' ? data.avatar : undefined,
      website: typeof data.website === 'string' ? data.website : undefined,
      bioHtml: content.trim() ? compile(content, { locale: localeDefault }) : undefined,
    })
  }
  authorCache = map
  return map
}

let categoryCache: Map<string, BlogCategory> | null = null
const categoryIndex = (): Map<string, BlogCategory> => {
  if (categoryCache) return categoryCache
  const map = new Map<string, BlogCategory>()
  for (const [key, source] of Object.entries(CATEGORY_FILES)) {
    const slug = slugFromKey(key)
    const { data, content } = matter(source)
    map.set(slug, {
      slug,
      name: typeof data.name === 'string' ? data.name : slug,
      descriptionHtml: content.trim() ? compile(content, { locale: localeDefault }) : undefined,
    })
  }
  categoryCache = map
  return map
}

export const getAuthor = (slug: string): BlogAuthor => authorIndex().get(slug) ?? { slug, name: slug }

// Category names are authored English-only; the display name is localized here so
// every consumer (components + SEO) gets the translated string via category.name.
// The authored English name is the ultimate fallback (see category-names.ts).
export const getCategory = (slug: string, locale: Locale = localeDefault): BlogCategory => {
  const base = categoryIndex().get(slug) ?? { slug, name: slug }
  return { ...base, name: categoryDisplayName(slug, locale, base.name) }
}

// --- resolution -------------------------------------------------------------

interface Resolved {
  source: string
  usedLocale: Locale
  availableLocales: Locale[]
}

const resolveSource = (slug: string, locale: Locale): Resolved | null => {
  const index = postIndex()
  const availableLocales = (locales as readonly Locale[]).filter((l) => index.get(l)?.has(slug))
  if (!availableLocales.length) return null

  const usedLocale: Locale = availableLocales.includes(locale)
    ? locale
    : availableLocales.includes(localeDefault)
      ? localeDefault
      : availableLocales[0]

  return { source: index.get(usedLocale)!.get(slug)!, usedLocale, availableLocales }
}

const buildMeta = (slug: string, locale: Locale, resolved: Resolved): BlogPostMeta => {
  const { data, content } = matter(resolved.source)
  const frontmatter = parseFrontmatter(data, slug)
  return {
    slug,
    href: `${BLOG_BASE}/${slug}`,
    locale,
    usedLocale: resolved.usedLocale,
    availableLocales: resolved.availableLocales,
    frontmatter,
    readingMinutes: readingMinutes(content),
    authors: frontmatter.authors.map(getAuthor),
    categories: frontmatter.categories.map((s) => getCategory(s, locale)),
  }
}

// --- public API -------------------------------------------------------------

// Every distinct post slug (union across locales), optionally including drafts.
export const allBlogSlugs = (includeDrafts = INCLUDE_DRAFTS): string[] => {
  const index = postIndex()
  const slugs = new Set<string>()
  for (const slugMap of index.values()) {
    for (const [slug, source] of slugMap) {
      if (!includeDrafts && matter(source).data.draft === true) continue
      slugs.add(slug)
    }
  }
  return [...slugs].sort()
}

export interface ListOptions {
  category?: string
  includeDrafts?: boolean
  limit?: number
}

export const listPosts = (locale: Locale, options: ListOptions = {}): BlogPostMeta[] => {
  const includeDrafts = options.includeDrafts ?? INCLUDE_DRAFTS
  const metas: BlogPostMeta[] = []

  for (const slug of allBlogSlugs(includeDrafts)) {
    const resolved = resolveSource(slug, locale)
    if (!resolved) continue
    const meta = buildMeta(slug, locale, resolved)
    if (!includeDrafts && meta.frontmatter.draft) continue
    if (options.category && !meta.frontmatter.categories.includes(options.category)) continue
    metas.push(meta)
  }

  metas.sort((a, b) => {
    const byDate = b.frontmatter.publishedDate.localeCompare(a.frontmatter.publishedDate)
    return byDate !== 0 ? byDate : a.frontmatter.title.localeCompare(b.frontmatter.title)
  })

  return typeof options.limit === 'number' ? metas.slice(0, options.limit) : metas
}

export const loadPost = (slug: string, locale: Locale): LoadedBlogPost | null => {
  const resolved = resolveSource(slug, locale)
  if (!resolved) return null
  const meta = buildMeta(slug, locale, resolved)
  if (!INCLUDE_DRAFTS && meta.frontmatter.draft) return null
  const { content } = matter(resolved.source)
  // Compile with the requested locale (not usedLocale) so internal /blog links are
  // localized to the language the reader selected, even on English-fallback posts.
  return { ...meta, html: compile(content, { locale }) }
}

export interface CategoryWithCount extends BlogCategory {
  count: number
}

// Categories that have at least one visible post in this locale, with counts.
export const listCategories = (locale: Locale): CategoryWithCount[] => {
  const counts = new Map<string, number>()
  for (const post of listPosts(locale)) {
    for (const slug of post.frontmatter.categories) counts.set(slug, (counts.get(slug) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ ...getCategory(slug, locale), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

// Category slugs to prerender (locale-agnostic, drafts excluded).
export const listCategorySlugs = (): string[] => {
  const slugs = new Set<string>()
  for (const post of listPosts(localeDefault, { includeDrafts: false })) {
    for (const slug of post.frontmatter.categories) slugs.add(slug)
  }
  return [...slugs].sort()
}

export const relatedPosts = (post: BlogPostMeta, locale: Locale, limit = 3): BlogPostMeta[] => {
  const set = new Set(post.frontmatter.categories)
  return listPosts(locale)
    .filter((p) => p.slug !== post.slug && p.frontmatter.categories.some((c) => set.has(c)))
    .slice(0, limit)
}
