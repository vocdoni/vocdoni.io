import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.solutions.associations.title', 'Association voting platform for board elections | Vocdoni')
  return getMetaByKey(pageContext, 'meta.solutions.associations.title')
}
