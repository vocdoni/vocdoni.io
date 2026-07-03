import type { PageContext } from 'vike/types'

// Match exactly /keystatic and its sub-paths (not unrelated paths like
// /keystatic-setup) so the Keystatic SPA owns only its own subtree.
export default (pageContext: PageContext) => {
  const path = pageContext.urlPathname
  return path === '/keystatic' || path.startsWith('/keystatic/')
}
