import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.terms.description', "Read the terms and conditions that govern the use of
  // Vocdoni's services and platform.")
  return getMetaByKey(pageContext, 'meta.terms.description')
}
