import { getMetaByKey } from '@/lib/page-meta'

// Title / description for markdown doc pages. Prefers the curated SEO meta keys
// (`meta.developers.<slug>.title|description`) when they exist so existing pages
// keep their hand-written SEO copy; falls back to frontmatter for new docs.

const metaKey = (slug: string, field: 'title' | 'description') => `meta.developers.${slug.replace(/-/g, '_')}.${field}`

const frontmatter = (pageContext: Vike.PageContextServer) =>
  (pageContext as { data?: { frontmatter?: { title?: string; lead?: string; description?: string } } }).data
    ?.frontmatter

const slugOf = (pageContext: Vike.PageContextServer) =>
  (pageContext as { routeParams?: { slug?: string } }).routeParams?.slug

export function docTitle(pageContext: Vike.PageContextServer): string {
  const slug = slugOf(pageContext)
  if (slug) {
    const key = metaKey(slug, 'title')
    const meta = getMetaByKey(pageContext, key)
    if (meta && meta !== key) return meta
  }
  const fm = frontmatter(pageContext)
  return fm?.title ? `${fm.title} | Vocdoni` : 'Vocdoni'
}

export function docDescription(pageContext: Vike.PageContextServer): string {
  const slug = slugOf(pageContext)
  if (slug) {
    const key = metaKey(slug, 'description')
    const meta = getMetaByKey(pageContext, key)
    if (meta && meta !== key) return meta
  }
  const fm = frontmatter(pageContext)
  return fm?.description || fm?.lead || ''
}
