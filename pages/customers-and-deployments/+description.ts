import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.customers_and_deployments.description')
}
