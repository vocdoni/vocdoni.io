import type { DocsNav } from '@/components/developers/docs-nav'
import { listDocsMeta, type LoadedDoc } from '@/lib/docs/markdown'
import { buildDocsNav as buildDocsNavFrom, type DocMeta } from '@/lib/docs/pipeline'
import type { Locale } from '@/locales'

// Build/server only - reads frontmatter via the markdown glob. The compact
// result is passed to the client via useData(); client nav components never
// import the glob themselves. The nav shaping itself is pure and lives in
// lib/docs/pipeline.ts.

export interface DocsPageData {
  doc: LoadedDoc
  nav: DocsNav
}

// Builds the grouped navigation for a locale from the doc frontmatter:
// groups follow DOCS_GROUP_ORDER, items are sorted by `order`, labels come from
// the per-locale frontmatter title (en fallback).
export function buildDocsNav(locale: Locale, metas: DocMeta[] = listDocsMeta()): DocsNav {
  return buildDocsNavFrom(locale, metas)
}
