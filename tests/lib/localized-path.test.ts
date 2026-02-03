import { describe, expect, it } from 'vitest'
import { getLocalizedPath, stripLocaleFromPath } from '@/lib/localized-path'

describe('getLocalizedPath', () => {
  it('returns raw path when default locale is used', () => {
    expect(getLocalizedPath('/contact', 'en')).toBe('/en/contact')
    expect(getLocalizedPath('/', 'en')).toBe('/en')
  })

  it('prefixes non-default locales', () => {
    expect(getLocalizedPath('/contact', 'es')).toBe('/es/contact')
    expect(getLocalizedPath('/', 'es')).toBe('/es')
  })

  it('does not double-prefix when path already contains locale', () => {
    expect(getLocalizedPath('/es/contact', 'es')).toBe('/es/contact')
  })

  it('keeps hash-only links unchanged', () => {
    expect(getLocalizedPath('#contact', 'es')).toBe('#contact')
  })
})

describe('stripLocaleFromPath', () => {
  it('preserves paths without locale', () => {
    expect(stripLocaleFromPath('/contact')).toBe('/contact')
  })

  it('removes locale prefix when present', () => {
    expect(stripLocaleFromPath('/es/contact')).toBe('/contact')
    expect(stripLocaleFromPath('/es')).toBe('/')
  })
})
