import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.compare_assembly_voting.title', 'Vocdoni vs Assembly Voting - online voting comparison - Vocdoni')
  return getMetaByKey(pageContext, 'meta.compare_assembly_voting.title')
}
