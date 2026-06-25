import { DOCS_GROUP_ORDER, type DocsNav } from '@/components/developers/docs-nav'
import { DOCS_BASE, type DocMeta, listDocsMeta, type LoadedDoc, OVERVIEW_SLUG } from '@/lib/docs/markdown'
import { localeDefault, type Locale } from '@/locales'

// Build/server only - reads frontmatter via the markdown glob. The compact
// result is passed to the client via useData(); client nav components never
// import the glob themselves.

export interface DocsPageData {
  doc: LoadedDoc
  nav: DocsNav
}

const hrefFor = (slug: string) => (slug === OVERVIEW_SLUG ? DOCS_BASE : `${DOCS_BASE}/${slug}`)

const labelFor = (meta: DocMeta, locale: Locale) => meta.titles[locale] || meta.titles[localeDefault] || meta.slug

// Builds the grouped navigation for a locale from the doc frontmatter:
// groups follow DOCS_GROUP_ORDER, items are sorted by `order`, labels come from
// the per-locale frontmatter title (en fallback).
export function buildDocsNav(locale: Locale, metas: DocMeta[] = listDocsMeta()): DocsNav {
  const nav: DocsNav = []
  for (const groupId of DOCS_GROUP_ORDER) {
    const items = metas
      .filter((meta) => meta.group === groupId)
      .sort((a, b) => a.order - b.order)
      .map((meta) => ({ slug: meta.slug, href: hrefFor(meta.slug), label: labelFor(meta, locale) }))
    if (items.length) nav.push({ id: groupId, items })
  }
  return nav
}
