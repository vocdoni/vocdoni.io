import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.compare_eligo.description', 'Compare Vocdoni and Eligo feature by feature: verifiability, open source, anonymity, and transparent pricing for online voting. Start free today.')
  return getMetaByKey(pageContext, 'meta.compare_eligo.description')
}
