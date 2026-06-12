import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.product_features.title', 'Features - voting methods, 2FA and accessibility - Vocdoni')
  return getMetaByKey(pageContext, 'meta.product_features.title')
}
