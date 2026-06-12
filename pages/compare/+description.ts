import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.compare.description', 'Compare Vocdoni with Kuorum, Polyas, Sequent, Assembly Voting, and Eligo. Honest, feature-by-feature reviews to help you choose. Start free today.')
  return getMetaByKey(pageContext, 'meta.compare.description')
}
