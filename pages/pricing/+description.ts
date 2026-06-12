import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.pricing.description', 'Transparent pricing for secure online voting: a free plan, fixed
  // annual tiers, and tailored quotes for large elections. Start free, no credit card needed.')
  return getMetaByKey(pageContext, 'meta.pricing.description')
}
