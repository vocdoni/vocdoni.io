import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.solutions_chambers_of_commerce.title')
}
