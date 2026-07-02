import { loadPost, relatedPosts, type BlogPostMeta, type LoadedBlogPost } from '@/lib/blog/content'
import type { Locale } from '@/locales'
import { render } from 'vike/abort'

export interface BlogPostData {
  post: LoadedBlogPost
  related: BlogPostMeta[]
}

// Loads one post for the requested slug + locale (English fallback, then any
// available locale), compiles the body at build time, and gathers related posts.
export default function data(pageContext: Vike.PageContextServer): BlogPostData {
  const slug = (pageContext as { routeParams?: { slug?: string } }).routeParams?.slug
  const locale = ((pageContext as { locale?: string }).locale || 'en') as Locale
  if (!slug) throw render(404)

  const post = loadPost(slug, locale)
  if (!post) throw render(404)

  return { post, related: relatedPosts(post, locale) }
}
