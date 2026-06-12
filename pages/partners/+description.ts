import { getMetaByKey } from '@/lib/page-meta'

export default function description(pageContext: Vike.PageContextServer) {
  // prettier-ignore
  // t('meta.partners.description', 'Partner with Vocdoni: the SuperNodes channel programme and integrator partnerships help resellers, integrators, and public-administration channels deliver verifiable voting.')
  return getMetaByKey(pageContext, 'meta.partners.description')
}
