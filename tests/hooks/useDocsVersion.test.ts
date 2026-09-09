import {
  getQueryDocsVersionId,
  getStoredDocsVersionId,
  resolveDocsVersionId,
  setStoredDocsVersionId,
  withDocsVersionParam,
} from '@/hooks/useDocsVersion'
import { DOCS_VERSION_DEFAULT } from '@/lib/docs/versions'
import { afterEach, describe, expect, it, vi } from 'vitest'

function stubLocalStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial))
  const localStorage = {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
  }
  vi.stubGlobal('window', { localStorage })
  return store
}

describe('resolveDocsVersionId', () => {
  it('falls back to the default version when the candidate is missing', () => {
    expect(resolveDocsVersionId(null)).toBe(DOCS_VERSION_DEFAULT.id)
    expect(resolveDocsVersionId(undefined)).toBe(DOCS_VERSION_DEFAULT.id)
  })

  it('falls back to the default version when the candidate is unknown', () => {
    expect(resolveDocsVersionId('not-a-real-version')).toBe(DOCS_VERSION_DEFAULT.id)
  })

  it('returns the candidate when it is a known version id', () => {
    expect(resolveDocsVersionId('stage')).toBe('stage')
  })
})

describe('getQueryDocsVersionId', () => {
  it('reads the version query param', () => {
    expect(getQueryDocsVersionId('?version=stage')).toBe('stage')
  })

  it('returns null when the param is absent', () => {
    expect(getQueryDocsVersionId('?foo=bar')).toBeNull()
  })
})

describe('withDocsVersionParam', () => {
  it('adds the param for a non-default version', () => {
    expect(withDocsVersionParam('', 'stage')).toBe('?version=stage')
    expect(withDocsVersionParam('?foo=bar', 'stage')).toBe('?foo=bar&version=stage')
  })

  it('replaces a stale value instead of appending a second one', () => {
    expect(withDocsVersionParam('?version=other', 'stage')).toBe('?version=stage')
  })

  it('drops the param for the default version so the shared URL stays clean', () => {
    expect(withDocsVersionParam('?version=stage', DOCS_VERSION_DEFAULT.id)).toBe('')
    expect(withDocsVersionParam('?foo=bar&version=stage', DOCS_VERSION_DEFAULT.id)).toBe('?foo=bar')
    expect(withDocsVersionParam(`?version=${DOCS_VERSION_DEFAULT.id}`, DOCS_VERSION_DEFAULT.id)).toBe('')
  })

  it('returns the input untouched when it already matches, preserving other params verbatim', () => {
    expect(withDocsVersionParam('?q=a%20b&version=stage', 'stage')).toBe('?q=a%20b&version=stage')
    expect(withDocsVersionParam('?q=a%20b', DOCS_VERSION_DEFAULT.id)).toBe('?q=a%20b')
    expect(withDocsVersionParam('', DOCS_VERSION_DEFAULT.id)).toBe('')
  })
})

describe('docs version storage', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns null when nothing is stored', () => {
    stubLocalStorage()
    expect(getStoredDocsVersionId()).toBeNull()
  })

  it('returns null (not throwing) when window is unavailable', () => {
    vi.stubGlobal('window', undefined)
    expect(getStoredDocsVersionId()).toBeNull()
  })

  it('returns an invalid stored id verbatim - callers must resolve it', () => {
    stubLocalStorage({ 'docs-version': 'not-a-real-version' })
    expect(getStoredDocsVersionId()).toBe('not-a-real-version')
    expect(resolveDocsVersionId(getStoredDocsVersionId())).toBe(DOCS_VERSION_DEFAULT.id)
  })

  it('persists a version id on change and reads it back', () => {
    stubLocalStorage()
    setStoredDocsVersionId('stage')
    expect(getStoredDocsVersionId()).toBe('stage')
  })

  it('swallows write failures instead of throwing', () => {
    vi.stubGlobal('window', {
      localStorage: {
        setItem: () => {
          throw new Error('quota exceeded')
        },
      },
    })
    expect(() => setStoredDocsVersionId('stage')).not.toThrow()
  })

  it('swallows read failures and reports no stored value', () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: () => {
          throw new Error('unavailable')
        },
      },
    })
    expect(getStoredDocsVersionId()).toBeNull()
  })
})
