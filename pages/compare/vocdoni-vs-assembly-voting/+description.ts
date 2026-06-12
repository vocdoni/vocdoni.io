import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.compare_assembly_voting.description', 'Compare Vocdoni and Assembly Voting: end-to-end verifiability plus open source, zero-knowledge anonymity, and transparent pricing. Start free today.')
  return getMetaByKey(pageContext, 'meta.compare_assembly_voting.description')
}
