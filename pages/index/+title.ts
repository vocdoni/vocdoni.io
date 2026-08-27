import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.index.title', 'Vocdoni: online voting software for organizations')
  return getMetaByKey(pageContext, 'meta.index.title')
}
