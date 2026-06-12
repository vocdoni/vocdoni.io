import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.alternatives.description', 'The best online voting platform alternatives compared. Honest reviews of Kuorum, Polyas, Sequent, Assembly Voting, and Eligo. Start free today.')
  return getMetaByKey(pageContext, 'meta.alternatives.description')
}
