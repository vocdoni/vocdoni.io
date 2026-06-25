import { loadDoc, OVERVIEW_SLUG } from '@/lib/docs/markdown'
import { buildDocsNav, type DocsPageData } from '@/lib/docs/nav'
import type { Locale } from '@/locales'
import { render } from 'vike/abort'

// The docs index renders the `overview` markdown doc.
export default function data(pageContext: Vike.PageContextServer): DocsPageData {
  const locale = ((pageContext as { locale?: string }).locale || 'en') as Locale
  const doc = loadDoc(OVERVIEW_SLUG, locale)
  if (!doc) throw render(404)
  return { doc, nav: buildDocsNav(locale) }
}
