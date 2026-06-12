import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // prettier-ignore
  // t('meta.product_features.description', 'Explore Vocdoni voting features: single and multiple choice, ranked and weighted voting, 2FA, a white-label multi-language portal, WCAG accessibility, hybrid voting, and instant results.')
  return getMetaByKey(pageContext, 'meta.product_features.description')
}
