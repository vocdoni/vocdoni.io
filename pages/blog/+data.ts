import { listCategories, listPosts, type BlogPostMeta, type CategoryWithCount } from '@/lib/blog/content'
import type { Locale } from '@/locales'

export interface BlogIndexData {
  featured: BlogPostMeta | null
  posts: BlogPostMeta[]
  categories: CategoryWithCount[]
}

// Blog index: newest featured post pulled out, the rest in the grid, plus the
// category list for the filter. Posts resolve to the active locale with English
// fallback (see lib/blog/content.ts).
export default function data(pageContext: Vike.PageContextServer): BlogIndexData {
  const locale = ((pageContext as { locale?: string }).locale || 'en') as Locale
  const all = listPosts(locale)
  // Lead story: the pinned post if any, otherwise the newest, so there is always a hero.
  const featured = all.find((post) => post.frontmatter.featured) ?? all[0] ?? null
  const posts = featured ? all.filter((post) => post.slug !== featured.slug) : all
  return { featured, posts, categories: listCategories(locale) }
}
