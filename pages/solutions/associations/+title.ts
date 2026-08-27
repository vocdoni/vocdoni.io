import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.solutions.associations.title', 'Vocdoni: online voting software for associations')
  return getMetaByKey(pageContext, 'meta.solutions.associations.title')
}
