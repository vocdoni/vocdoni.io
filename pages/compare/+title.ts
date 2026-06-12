import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.compare.title', 'Compare online voting platforms - Vocdoni')
  return getMetaByKey(pageContext, 'meta.compare.title')
}
