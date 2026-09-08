import { DOCS_VERSION_DEFAULT, DocsVersion, getDocsVersion } from '@/lib/docs/versions'
import * as React from 'react'

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
 */
export function DocsVersionProvider({ children }: { children: React.ReactNode }) {
  const [versionId, setVersionIdState] = React.useState<string>(DOCS_VERSION_DEFAULT.id)

  React.useEffect(() => {
    const queryId = getQueryDocsVersionId(window.location.search)
    if (queryId && getDocsVersion(queryId)) {
      setStoredDocsVersionId(queryId)
      setVersionIdState(queryId)
      return
    }

    const storedId = getStoredDocsVersionId()
    if (storedId && getDocsVersion(storedId)) {
      setVersionIdState(storedId)
    }
  }, [])

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
