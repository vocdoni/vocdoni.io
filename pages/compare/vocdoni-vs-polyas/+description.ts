import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.compare_polyas.description', 'Compare Vocdoni and Polyas: open source, end-to-end verifiability, transparent pricing, and a free tier versus a certified vendor. Start free today.')
  return getMetaByKey(pageContext, 'meta.compare_polyas.description')
}
