import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.case_studies.omnium_cultural.title')
}
