import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.learn.gdpr_requirements_for_digital_voting.description')
}
