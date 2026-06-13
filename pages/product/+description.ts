import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // prettier-ignore
  // t('meta.product.description', 'Discover the Vocdoni platform: private, end-to-end verifiable online voting with instant results, flexible voting methods, and a branded portal for your members.')
  return getMetaByKey(pageContext, 'meta.product.description')
}
