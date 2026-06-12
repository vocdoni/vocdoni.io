import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.compare_kuorum.title', 'Vocdoni vs Kuorum - online voting comparison - Vocdoni')
  return getMetaByKey(pageContext, 'meta.compare_kuorum.title')
}
