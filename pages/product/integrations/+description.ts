import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // prettier-ignore
  // t('meta.product_integrations.description', 'Connect Vocdoni to your stack: SAML and OIDC single sign-on, CRM and member-database connectors, a developer API and SDK, and CSV census import.')
  return getMetaByKey(pageContext, 'meta.product_integrations.description')
}
