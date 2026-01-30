import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.use_cases.description', "Discover real-world voting and governance use cases powered by
  // Vocdoni's secure and transparent technology.")
  return getMetaByKey(pageContext, 'meta.use_cases.description')
}
