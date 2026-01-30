import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.privacy.title', 'Privacy Policy - Vocdoni')
  return getMetaByKey(pageContext, 'meta.privacy.title')
}
