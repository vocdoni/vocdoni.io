import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.privacy.description', 'Learn how Vocdoni collects, uses, and protects your personal
  // data and privacy.')
  return getMetaByKey(pageContext, 'meta.privacy.description')
}
