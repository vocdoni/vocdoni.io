import { DOCS_VERSION_DEFAULT, DocsVersion, getDocsVersion } from '@/lib/docs/versions'
import * as React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

// Persists the selected docs version id across visits, mirroring the
// try/catch style used for `docs-code-lang` in pages/developers/docs/+Layout.tsx -
// localStorage can throw (private browsing, disabled storage, etc.), so
// failures are swallowed and treated as "no stored value".
const STORAGE_KEY = 'docs-version'
const QUERY_PARAM = 'version'

/**
 * Reads the persisted docs version id from localStorage.
 * Returns null when unavailable, unset, or unreadable.
 */
export function getStoredDocsVersionId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * Persists a docs version id to localStorage. Failures are ignored.
 */
export function setStoredDocsVersionId(id: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // localStorage can be unavailable (private mode); ignore.
  }
}

/**
 * Reads the `?version=` query param from a location search string.
 * Returns null when absent.
 */
export function getQueryDocsVersionId(search: string): string | null {
  try {
    return new URLSearchParams(search).get(QUERY_PARAM)
  } catch {
    return null
  }
}

/**
 * Returns `search` with the `?version=` param set to `id`, or removed when `id`
 * is the default version - a shared URL without the param already means the
 * default. The input is returned untouched when it already says the right
 * thing, so unrelated params keep their original encoding.
 */
export function withDocsVersionParam(search: string, id: string): string {
  const params = new URLSearchParams(search)
  const wanted = id === DOCS_VERSION_DEFAULT.id ? null : id
  if (params.get(QUERY_PARAM) === wanted) return search
  if (wanted) params.set(QUERY_PARAM, wanted)
  else params.delete(QUERY_PARAM)
  const next = params.toString()
  return next ? `?${next}` : ''
}

/**
 * Resolves a candidate id (from a query param or localStorage) to a known
 * docs version id, falling back to the default when the candidate is
 * missing or unknown.
 */
export function resolveDocsVersionId(candidate: string | null | undefined): string {
  if (candidate && getDocsVersion(candidate)) return candidate
  return DOCS_VERSION_DEFAULT.id
}

interface DocsVersionContextValue {
  version: DocsVersion
  setVersionId: (id: string) => void
}

const DocsVersionContext = React.createContext<DocsVersionContextValue | undefined>(undefined)

/**
 * Provides the active docs version and a setter. Renders the default version
 * during SSR and initial hydration (to avoid a mismatch), then reconciles
 * with the `?version=` query param (which wins and is persisted) or the
 * stored preference in an effect.
 *
 * Once reconciled it keeps the address bar in sync the other way too: a
 * non-default version is written back as `?version=<id>` (and the param is
 * dropped for the default) so the URL can be copied and shared as-is. This
 * re-runs on every client-side navigation because Vike's pushState carries
 * only the link's own href, which would otherwise silently lose the param.
 */
export function DocsVersionProvider({ children }: { children: React.ReactNode }) {
  const [versionId, setVersionIdState] = React.useState<string>(DOCS_VERSION_DEFAULT.id)
  // The URL is only written once the initial read above has settled - before
  // that the state still says "default" and the sync would strip the very
  // param it is about to honour.
  const [resolved, setResolved] = React.useState(false)
  const { urlPathname } = usePageContext()

  React.useEffect(() => {
    const queryId = getQueryDocsVersionId(window.location.search)
    if (queryId && getDocsVersion(queryId)) {
      setStoredDocsVersionId(queryId)
      setVersionIdState(queryId)
    } else {
      const storedId = getStoredDocsVersionId()
      if (storedId && getDocsVersion(storedId)) {
        setVersionIdState(storedId)
      }
    }
    setResolved(true)
  }, [])

  React.useEffect(() => {
    if (!resolved) return
    const { pathname, search, hash } = window.location
    const next = withDocsVersionParam(search, versionId)
    if (next === search) return
    // replaceState, not pushState: this is a correction of the current entry,
    // not a navigation, so Back must not land on the param-less URL. Passing
    // the existing state through keeps Vike's scroll bookkeeping on it.
    window.history.replaceState(window.history.state, '', `${pathname}${next}${hash}`)
  }, [resolved, versionId, urlPathname])

  const setVersionId = React.useCallback((id: string) => {
    if (!getDocsVersion(id)) return
    setVersionIdState(id)
    setStoredDocsVersionId(id)
  }, [])

  const version = getDocsVersion(versionId) ?? DOCS_VERSION_DEFAULT

  const value = React.useMemo<DocsVersionContextValue>(() => ({ version, setVersionId }), [version, setVersionId])

  return React.createElement(DocsVersionContext.Provider, { value }, children)
}

export function useDocsVersion(): DocsVersionContextValue {
  const context = React.useContext(DocsVersionContext)
  if (!context) {
    throw new Error('useDocsVersion must be used within a DocsVersionProvider')
  }
  return context
}
