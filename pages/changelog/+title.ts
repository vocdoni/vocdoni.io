import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.changelog.title', 'Changelog - what is new in Vocdoni - Vocdoni')
  return getMetaByKey(pageContext, 'meta.changelog.title')
}
