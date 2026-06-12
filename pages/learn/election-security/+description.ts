import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.learn_election_security.description')
}
