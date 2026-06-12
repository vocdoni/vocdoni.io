import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.product.title', 'Product - secure online voting platform - Vocdoni')
  return getMetaByKey(pageContext, 'meta.product.title')
}
