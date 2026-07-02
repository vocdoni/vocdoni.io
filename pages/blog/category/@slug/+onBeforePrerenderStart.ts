import { BLOG_CATEGORY_BASE, listCategorySlugs } from '@/lib/blog/content'

// Enumerate category archive slugs to prerender (locale-less); the global
// pages/+onPrerenderStart.ts fans each out per locale.
export const onBeforePrerenderStart = () => listCategorySlugs().map((slug) => `${BLOG_CATEGORY_BASE}/${slug}`)
