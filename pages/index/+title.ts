import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.index.title', 'Vocdoni - Secure, verifiable online voting')
  return getMetaByKey(pageContext, 'meta.index.title')
}
