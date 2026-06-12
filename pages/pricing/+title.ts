import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.pricing.title', 'Pricing - online voting plans and project quotes - Vocdoni')
  return getMetaByKey(pageContext, 'meta.pricing.title')
}
