import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.index.title', 'Vocdoni - Secure digital voting you can trust')
  return getMetaByKey(pageContext, 'meta.index.title')
}
