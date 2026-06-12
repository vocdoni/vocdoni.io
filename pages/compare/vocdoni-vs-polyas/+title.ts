import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.compare_polyas.title', 'Vocdoni vs Polyas - online voting comparison - Vocdoni')
  return getMetaByKey(pageContext, 'meta.compare_polyas.title')
}
