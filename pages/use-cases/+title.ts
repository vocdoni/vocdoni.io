import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.use_cases.title', 'Online voting use cases for organizations - Vocdoni')
  return getMetaByKey(pageContext, 'meta.use_cases.title')
}
