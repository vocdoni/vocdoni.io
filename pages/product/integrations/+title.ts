import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.product_integrations.title', 'Integrations - SSO, API, SDK and census import - Vocdoni')
  return getMetaByKey(pageContext, 'meta.product_integrations.title')
}
