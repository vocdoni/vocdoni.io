import type { BlogCategory, LoadedBlogPost } from '@/lib/blog/content'
import { getMetaByKey } from '@/lib/page-meta'

// Title / description resolvers for the blog routes, read at head render time.
// Post/category values come from the data loader (pageContext.data); the index
// uses the curated SEO meta keys with i18n + hardcoded fallback (see page-meta.ts).

const postOf = (pageContext: Vike.PageContextServer) => (pageContext as { data?: { post?: LoadedBlogPost } }).data?.post

const categoryOf = (pageContext: Vike.PageContextServer) =>
  (pageContext as { data?: { category?: BlogCategory } }).data?.category

export const blogIndexTitle = (pageContext: Vike.PageContextServer): string =>
  getMetaByKey(pageContext, 'meta.blog_index.title')

export const blogIndexDescription = (pageContext: Vike.PageContextServer): string =>
  getMetaByKey(pageContext, 'meta.blog_index.description')

export const blogPostTitle = (pageContext: Vike.PageContextServer): string => {
  const post = postOf(pageContext)
  if (!post) return 'Vocdoni blog'
  return post.frontmatter.seo?.metaTitle || `${post.frontmatter.title} | Vocdoni`
}

export const blogPostDescription = (pageContext: Vike.PageContextServer): string => {
  const post = postOf(pageContext)
  if (!post) return blogIndexDescription(pageContext)
  return post.frontmatter.seo?.metaDescription || post.frontmatter.excerpt || ''
}

// Plain-text, meta-length summary of the category's authored description (HTML).
const asMetaDescription = (html: string): string => {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, '')}…`
}

export const blogCategoryTitle = (pageContext: Vike.PageContextServer): string => {
  const category = categoryOf(pageContext)
  if (!category) return blogIndexTitle(pageContext)
  return `${category.name} | ${getMetaByKey(pageContext, 'blog.eyebrow')}`
}

export const blogCategoryDescription = (pageContext: Vike.PageContextServer): string => {
  const category = categoryOf(pageContext)
  if (!category) return blogIndexDescription(pageContext)
  // Prefer the category's own description; fall back to the generic blog blurb.
  return category.descriptionHtml ? asMetaDescription(category.descriptionHtml) : blogIndexDescription(pageContext)
}
