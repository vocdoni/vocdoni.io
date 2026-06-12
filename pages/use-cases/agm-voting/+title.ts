import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.use_cases_agm_voting.title')
}
