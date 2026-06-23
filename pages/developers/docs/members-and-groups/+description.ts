import { getMetaByKey } from '@/lib/page-meta'

export default (pageContext: Vike.PageContextServer) =>
  getMetaByKey(pageContext, 'meta.developers.members_and_groups.description')
