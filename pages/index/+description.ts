import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.index.description', 'Cutting-edge blockchain technology powering the
  // future of democratic participation with transparent, secure, and accessible voting infrastructure.')
  return getMetaByKey(pageContext, 'meta.index.description')
}
