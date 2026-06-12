import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.compare_sequent.description', 'Compare Vocdoni and Sequent, two open source verifiable voting tools: anonymity, EU hosting, support, and a self-serve free tier. Start free today.')
  return getMetaByKey(pageContext, 'meta.compare_sequent.description')
}
