import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.api_sdk.title', 'Voting API and SDK for developers - Vocdoni')
  return getMetaByKey(pageContext, 'meta.api_sdk.title')
}
