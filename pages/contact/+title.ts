import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.contact.title', 'Contact - Vocdoni')
  return getMetaByKey(pageContext, 'meta.contact.title')
}
