import { allBlogSlugs, BLOG_BASE } from '@/lib/blog/content'

// Enumerate concrete post slugs to prerender (locale-less). The global
// pages/+onPrerenderStart.ts fans each out per locale and adds the unprefixed
// compatibility redirect. Drafts are excluded in production builds.
export const onBeforePrerenderStart = () => allBlogSlugs().map((slug) => `${BLOG_BASE}/${slug}`)
