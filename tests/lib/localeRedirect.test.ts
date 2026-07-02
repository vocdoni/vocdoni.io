import { describe, expect, it } from 'vitest'

import {
  buildLocaleRedirectTarget,
  getCompatibilityRedirectTarget,
  normalizeLogicalPath,
  resolvePreferredLocale,
} from '@/lib/localeRedirect'

describe('normalizeLogicalPath', () => {
  it('normalizes empty values and trailing slashes', () => {
    expect(normalizeLogicalPath('')).toBe('/')
    expect(normalizeLogicalPath('/privacy/')).toBe('/privacy')
  })
})

describe('resolvePreferredLocale', () => {
  it('prefers a stored locale when it is supported', () => {
    expect(resolvePreferredLocale('es', ['ca-ES', 'en-US'], ['ca', 'en', 'es'], 'en')).toBe('es')
  })

  it('falls back to browser language before the default locale', () => {
    expect(resolvePreferredLocale(null, ['ca-ES', 'fr-FR'], ['ca', 'en', 'es'], 'en')).toBe('ca')
  })

  it('falls back to the default locale when no match exists', () => {
    expect(resolvePreferredLocale(null, ['fr-FR'], ['ca', 'en', 'es'], 'en')).toBe('en')
  })

  it('prefers an exact region-specific locale over the base language', () => {
    expect(resolvePreferredLocale(null, ['pt-BR'], ['en', 'pt', 'pt-br'], 'en')).toBe('pt-br')
  })

  it('falls back to the base language for a region variant without an exact locale', () => {
    expect(resolvePreferredLocale(null, ['pt-PT'], ['en', 'pt', 'pt-br'], 'en')).toBe('pt')
  })

  it('still matches the base language when no region-specific locale exists', () => {
    expect(resolvePreferredLocale(null, ['es-ES'], ['ca', 'en', 'es'], 'en')).toBe('es')
  })

  it('resolves a generic browser language to the base locale', () => {
    expect(resolvePreferredLocale(null, ['pt'], ['en', 'pt', 'pt-br'], 'en')).toBe('pt')
  })
})

describe('buildLocaleRedirectTarget', () => {
  it('builds locale-prefixed redirect URLs and preserves query strings and hashes', () => {
    expect(buildLocaleRedirectTarget('/privacy', 'es', '?preview=1', '#faq')).toBe('/es/privacy?preview=1#faq')
    expect(buildLocaleRedirectTarget('/', 'en', '?preview=1', '#hero')).toBe('/en?preview=1#hero')
  })
})

describe('getCompatibilityRedirectTarget', () => {
  it('uses the default locale for noscript fallback redirects', () => {
    expect(getCompatibilityRedirectTarget('/privacy')).toBe('/en/privacy')
    expect(getCompatibilityRedirectTarget('/')).toBe('/en')
  })
})
