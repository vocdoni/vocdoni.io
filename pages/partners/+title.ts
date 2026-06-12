import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.partners.title', 'Partners - resellers, integrators and channels - Vocdoni')
  return getMetaByKey(pageContext, 'meta.partners.title')
}
