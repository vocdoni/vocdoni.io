import {
  getQueryDocsVersionId,
  getStoredDocsVersionId,
  resolveDocsVersionId,
  setStoredDocsVersionId,
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
