import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.customers.title', 'Customers - organizations that vote with Vocdoni - Vocdoni')
  return getMetaByKey(pageContext, 'meta.customers.title')
}
