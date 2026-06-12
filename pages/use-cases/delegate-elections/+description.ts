import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.use_cases_delegate_elections.description')
}
