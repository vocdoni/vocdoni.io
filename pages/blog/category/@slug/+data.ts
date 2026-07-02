import {
  getCategory,
  listCategories,
  listPosts,
  type BlogCategory,
  type BlogPostMeta,
  type CategoryWithCount,
} from '@/lib/blog/content'
import type { Locale } from '@/locales'
import { render } from 'vike/abort'

export interface BlogCategoryData {
  category: BlogCategory
  posts: BlogPostMeta[]
  categories: CategoryWithCount[]
}

// Posts filtered to one category, in the active locale (English fallback).
export default function data(pageContext: Vike.PageContextServer): BlogCategoryData {
  const slug = (pageContext as { routeParams?: { slug?: string } }).routeParams?.slug
  const locale = ((pageContext as { locale?: string }).locale || 'en') as Locale
  if (!slug) throw render(404)

  const posts = listPosts(locale, { category: slug })
  if (!posts.length) throw render(404)

  return { category: getCategory(slug), posts, categories: listCategories(locale) }
}
