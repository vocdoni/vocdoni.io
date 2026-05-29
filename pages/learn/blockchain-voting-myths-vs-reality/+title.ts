import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.learn.blockchain_voting_myths_vs_reality.title')
}
