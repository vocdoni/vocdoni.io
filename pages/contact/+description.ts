import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // t('meta.contact.description', 'Get in touch with the Vocdoni team to discuss secure, transparent
  // digital voting for your organization.')
  return getMetaByKey(pageContext, 'meta.contact.description')
}
