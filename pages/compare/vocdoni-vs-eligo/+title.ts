import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.compare_eligo.title', 'Vocdoni vs Eligo - online voting comparison - Vocdoni')
  return getMetaByKey(pageContext, 'meta.compare_eligo.title')
}
