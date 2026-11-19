import { afterEach, describe, expect, it, vi } from 'vitest'

import { setLocalePreference } from '@/lib/localeDetection'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('setLocalePreference', () => {
  it('writes the locale to localStorage', () => {
    const store: Record<string, string> = {}
    vi.stubGlobal('window', {
      localStorage: {
        setItem: (k: string, v: string) => {
          store[k] = v
        },
        getItem: (k: string) => store[k] ?? null,
      },
    })
    Object.defineProperty(window, 'document', { value: { cookie: '' }, writable: true, configurable: true })

    setLocalePreference('es')
    expect(store['vocdoni-locale-preference']).toBe('es')
  })

  it('writes the nf_lang cookie so Netlify overrides the Language condition at /', () => {
    const writtenCookies: string[] = []
    // Simulate a browser document with a cookie setter we can observe.
    vi.stubGlobal('window', {
      localStorage: { setItem: () => {}, getItem: () => null },
    })
    Object.defineProperty(globalThis, 'document', {
      value: {
        get cookie() {
          return ''
        },
        set cookie(value: string) {
          writtenCookies.push(value)
        },
      },
      writable: true,
      configurable: true,
    })

    setLocalePreference('pt-br')

    const nfLangCookie = writtenCookies.find((c) => c.startsWith('nf_lang='))
    expect(nfLangCookie).toBeDefined()
    expect(nfLangCookie).toContain('nf_lang=pt-br')
    expect(nfLangCookie).toContain('path=/')
    expect(nfLangCookie).toContain('SameSite=Lax')
  })

  it('is a no-op in SSR (window undefined)', () => {
    const store: Record<string, string> = {}
    vi.stubGlobal('window', undefined)
    // Should not throw.
    expect(() => setLocalePreference('en')).not.toThrow()
    expect(Object.keys(store)).toHaveLength(0)
  })
})
