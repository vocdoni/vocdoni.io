import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.compare_kuorum.description', 'Compare Vocdoni and Kuorum feature by feature: verifiability, anonymity, open source, and pricing. See which voting platform fits. Start free today.')
  return getMetaByKey(pageContext, 'meta.compare_kuorum.description')
}
