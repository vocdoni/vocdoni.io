import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.solutions.associations.description', 'Secure, verifiable online voting for associations and
  // federations. Run board elections, statutory votes and member consultations with secret ballots and instant
  // results.')
  return getMetaByKey(pageContext, 'meta.solutions.associations.description')
}
