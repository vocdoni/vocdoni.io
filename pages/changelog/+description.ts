import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // prettier-ignore
  // t('meta.changelog.description', 'See how Vocdoni keeps improving: recent work on verifiability, performance, new languages, and accessibility across the voting platform.')
  return getMetaByKey(pageContext, 'meta.changelog.description')
}
