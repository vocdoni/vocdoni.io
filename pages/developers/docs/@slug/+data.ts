import { loadDoc } from '@/lib/docs/markdown'
import { buildDocsNav, type DocsPageData } from '@/lib/docs/nav'
import type { Locale } from '@/locales'
import { render } from 'vike/abort'

// Loads the markdown doc for the requested slug + locale (en fallback), compiles
// it to HTML at build/prerender time, and bundles the generated nav. Exposed to
// the page via useData().
export default function data(pageContext: Vike.PageContextServer): DocsPageData {
  const slug = (pageContext as { routeParams?: { slug?: string } }).routeParams?.slug
  const locale = ((pageContext as { locale?: string }).locale || 'en') as Locale
  if (!slug) throw render(404)

  const doc = loadDoc(slug, locale)
  if (!doc) throw render(404)
  return { doc, nav: buildDocsNav(locale) }
}
