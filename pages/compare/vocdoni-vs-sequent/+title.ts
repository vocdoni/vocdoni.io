import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.compare_sequent.title', 'Vocdoni vs Sequent - online voting comparison - Vocdoni')
  return getMetaByKey(pageContext, 'meta.compare_sequent.title')
}
