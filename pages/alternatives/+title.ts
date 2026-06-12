import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.alternatives.title', 'Online voting platform alternatives - Vocdoni')
  return getMetaByKey(pageContext, 'meta.alternatives.title')
}
