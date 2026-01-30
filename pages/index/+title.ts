import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  // t('meta.index.title', 'Vocdoni - Blockchain Voting Technology')
  return getMetaByKey(pageContext, 'meta.index.title')
}
