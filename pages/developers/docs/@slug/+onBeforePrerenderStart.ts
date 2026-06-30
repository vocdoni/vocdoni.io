import { allDocSlugs, DOCS_BASE } from '@/lib/docs/markdown'

// Enumerate the concrete doc slugs to prerender (locale-less). The global
// pages/+onPrerenderStart.ts then fans each out per locale and adds the
// unprefixed compatibility redirect.
export const onBeforePrerenderStart = () => allDocSlugs().map((slug) => `${DOCS_BASE}/${slug}`)
