import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.terms.title', 'Terms & conditions - Vocdoni')
  return getMetaByKey(pageContext, 'meta.terms.title')
}
