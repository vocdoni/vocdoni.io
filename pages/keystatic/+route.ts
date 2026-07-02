import type { PageContext } from 'vike/types'

// Match /keystatic and every sub-path so the Keystatic SPA owns its whole subtree.
export default (pageContext: PageContext) => pageContext.urlPathname.startsWith('/keystatic')
