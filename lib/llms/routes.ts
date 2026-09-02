import matter from 'gray-matter'
import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * Shared filesystem enumeration for the build-time artifact generators
 * (`plugins/vike-sitemap.ts`, `plugins/well-known.ts`).
 *
 * IMPORTANT: this module is pulled into the Vite *config* bundle (esbuild) through
 * the plugin import graph, where the `@` alias and `import.meta.glob` are NOT
 * available - same constraint as `lib/docs/tokens.ts`. Use relative imports only and
 * keep it dependency-light. That is also why the glob-backed `allDocSlugs()` /
 * `allBlogSlugs()` in `lib/docs/markdown.ts` and `lib/blog/content.ts` cannot be
 * reused here: reading the content tree with `fs` is the only option on this side of
 * the bundle boundary.
 *
 * Every enumerator takes `root` as its first argument so tests can point it at a
 * fixture tree instead of the repo.
 */

export interface DocEntry {
  slug: string
  title: string
  /** One-line summary from frontmatter; used verbatim as the doc's note in llms.txt. */
  lead: string
  group: string
  order: number
}

export interface PostEntry {
  slug: string
  title: string
  date: string
  updatedDate: string
  /** Locales the post was actually authored in. */
  locales: string[]
  categories: string[]
}

/** Doc nav groups, in display order. Mirrors `DOCS_GROUP_ORDER` in components/developers/docs-nav.ts. */
export const DOC_GROUP_ORDER = ['get_started', 'core_concepts', 'integrator_platform'] as const

export const OVERVIEW_SLUG = 'overview'

const isPageComponent = (name: string) => name.startsWith('+Page.')

// Skip Vike internals (`_`, `+`), dynamic-param dirs (`@slug`, enumerated separately),
// and the client-only Keystatic admin.
export const isSkippedDir = (name: string) =>
  name.startsWith('_') || name.startsWith('+') || name.startsWith('@') || name === 'keystatic'

/**
 * Every static route the Vike filesystem router will prerender, locale-stripped and
 * sorted. Excludes the error route, which is not a real page.
 */
export async function discoverPageRoutes(root: string): Promise<string[]> {
  const pagesDir = path.join(root, 'pages')
  const routes = new Set<string>()

  const walk = async (dir: string) => {
    const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => [])
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (isSkippedDir(entry.name)) continue
        await walk(path.join(dir, entry.name))
        continue
      }
      if (!entry.isFile() || !isPageComponent(entry.name)) continue
      const relDir = path.relative(pagesDir, dir).split(path.sep).join('/')
      routes.add(relDir === '' || relDir === 'index' ? '/' : `/${relDir}`)
    }
  }

  await walk(pagesDir)
  routes.delete('/404')
  return [...routes].sort()
}

/**
 * Direct child route slugs of a static page family (`solutions`, `learn`,
 * `case-studies`), sorted. This is the source of truth the curated llms.txt catalog
 * is validated against, so a page can never exist without an entry.
 */
export async function discoverRouteChildren(root: string, family: string): Promise<string[]> {
  const dir = path.join(root, 'pages', family)
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => [])
  const slugs: string[] = []
  for (const entry of entries) {
    if (!entry.isDirectory() || isSkippedDir(entry.name)) continue
    const children = await fs.readdir(path.join(dir, entry.name)).catch(() => [])
    if (children.some(isPageComponent)) slugs.push(entry.name)
  }
  return slugs.sort()
}

/**
 * Developer docs for a locale, sorted by nav group then `order` then title. Docs are
 * authored in English only today; `plugins/docs-markdown.ts` mirrors every English
 * slug into every locale, so callers may safely build locale-prefixed URLs from the
 * English set.
 */
export async function discoverDocs(root: string, locale: string): Promise<DocEntry[]> {
  const dir = path.join(root, 'content', 'developers', 'docs', locale)
  const files = await fs.readdir(dir).catch(() => [])
  const docs: DocEntry[] = []
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const { data } = matter(await fs.readFile(path.join(dir, file), 'utf8'))
    docs.push({
      slug: file.replace(/\.md$/, ''),
      title: typeof data.title === 'string' ? data.title : file.replace(/\.md$/, ''),
      lead: typeof data.lead === 'string' ? data.lead : '',
      group: typeof data.group === 'string' ? data.group : '',
      order: typeof data.order === 'number' ? data.order : 999,
    })
  }
  const groupRank = (g: string) => {
    const i = (DOC_GROUP_ORDER as readonly string[]).indexOf(g)
    return i === -1 ? DOC_GROUP_ORDER.length : i
  }
  return docs.sort(
    (a, b) => groupRank(a.group) - groupRank(b.group) || a.order - b.order || a.title.localeCompare(b.title)
  )
}

/** Non-draft blog posts across every locale, newest first. */
export async function discoverPosts(root: string, allLocales: readonly string[]): Promise<PostEntry[]> {
  const blogDir = path.join(root, 'content', 'blog')
  const bySlug = new Map<string, PostEntry>()

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
      const existing = bySlug.get(slug)
      const entry: PostEntry = existing ?? { slug, title: slug, date: '', updatedDate: '', locales: [], categories: [] }
      entry.locales.push(dir.name)
      if (Array.isArray(data.categories)) {
        for (const category of data.categories)
          if (!entry.categories.includes(String(category))) entry.categories.push(String(category))
      }
      // Prefer the English title/date as the canonical one; otherwise take the first seen.
      if (dir.name === 'en' || !existing) {
        if (typeof data.title === 'string') entry.title = data.title
        entry.date = typeof data.publishedDate === 'string' ? data.publishedDate : String(data.publishedDate ?? '')
        entry.updatedDate = typeof data.updatedDate === 'string' ? data.updatedDate : String(data.updatedDate ?? '')
      }
      bySlug.set(slug, entry)
    }
  }

  const posts = [...bySlug.values()]
  for (const post of posts) post.locales = allLocales.filter((l) => post.locales.includes(l))
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

/** Blog category archive slugs referenced by at least one non-draft post, sorted. */
export async function discoverBlogCategories(root: string, allLocales: readonly string[]): Promise<string[]> {
  const posts = await discoverPosts(root, allLocales)
  const categories = new Set<string>()
  for (const post of posts) for (const category of post.categories) categories.add(category)
  return [...categories].sort()
}

// --- path builders (the only place a URL path is assembled) -----------------

export const stripSlash = (s: string) => s.replace(/\/+$/, '')

export const localePath = (locale: string, route: string) => (route === '/' ? `/${locale}` : `/${locale}${route}`)

export const docPath = (locale: string, slug: string) =>
  slug === OVERVIEW_SLUG ? `/${locale}/developers/docs` : `/${locale}/developers/docs/${slug}`

export const rawDocPath = (locale: string, slug: string) =>
  slug === OVERVIEW_SLUG ? `/${locale}/developers/docs.md` : `/${locale}/developers/docs/${slug}.md`

export const postPath = (locale: string, slug: string) => `/${locale}/blog/${slug}`

export const rawPostPath = (locale: string, slug: string) => `/${locale}/blog/${slug}.md`

export const blogCategoryPath = (locale: string, slug: string) => `/${locale}/blog/category/${slug}`

/** `llms.txt` for the default locale, `llms-<locale>.txt` for any other. */
export const llmsFileName = (locale: string, defaultLocale: string) =>
  locale === defaultLocale ? 'llms.txt' : `llms-${locale}.txt`
