import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.index.description', 'Run private board and member elections with verifiable results and self-service setup.
  // Free plan available.')
  return getMetaByKey(pageContext, 'meta.index.description')
}
