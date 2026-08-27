import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.solutions.associations.description', 'Online voting software for association board elections, statutory
  // votes, and member consultations. Private ballots and verifiable results.')
  return getMetaByKey(pageContext, 'meta.solutions.associations.description')
}
