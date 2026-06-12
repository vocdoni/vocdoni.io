import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.learn.how_to_prevent_election_fraud_online.description')
}
