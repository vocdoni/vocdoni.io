import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // prettier-ignore
  // t('meta.api_sdk.description', 'Build verifiable voting into your product with the Vocdoni SDK and API. Real code to create a census, launch an election, cast votes and read results, plus a ready-made voter frontend.')
  return getMetaByKey(pageContext, 'meta.api_sdk.description')
}
