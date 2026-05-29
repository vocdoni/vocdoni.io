import { getMetaByKey } from '@/lib/page-meta'

export default function title(pageContext: Vike.PageContextServer) {
  return getMetaByKey(pageContext, 'meta.learn.how_to_run_a_legally_valid_agm_online.title')
}
