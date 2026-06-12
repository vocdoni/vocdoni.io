import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // prettier-ignore
  // t('meta.customers.description', 'Professional colleges, associations, city councils, and cultural organizations trust Vocdoni for verifiable voting, from COIB and ICOES to Òmnium Cultural and beyond.')
  return getMetaByKey(pageContext, 'meta.customers.description')
}
