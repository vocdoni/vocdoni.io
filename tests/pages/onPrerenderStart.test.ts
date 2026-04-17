import { describe, expect, it } from 'vitest'

import { localeDefault, locales } from '@/locales'
import { onPrerenderStart } from '@/pages/+onPrerenderStart'

describe('onPrerenderStart', () => {
  it('keeps unprefixed compatibility routes and adds all prefixed locales', async () => {
    const result = await onPrerenderStart({
      pageContexts: [{ urlOriginal: '/contact' }],
    } as any)

    const pageContexts = result.prerenderContext.pageContexts
    expect(
      pageContexts.some(
        (item: { isCompatibilityRedirect?: boolean; urlOriginal: string }) =>
          item.urlOriginal === '/contact' && item.isCompatibilityRedirect === true
      )
    ).toBe(true)
    locales.forEach((locale) => {
      const pageContext = pageContexts.find(
        (item: { isCompatibilityRedirect?: boolean; locale: string }) =>
          item.locale === locale && item.isCompatibilityRedirect === false
      )
      expect(pageContext?.urlOriginal).toBe(`/${locale}/contact`)
    })
  })

  it('keeps the root compatibility route and adds locale roots without extra segments', async () => {
    const result = await onPrerenderStart({
      pageContexts: [{ urlOriginal: '/' }],
    } as any)

    const pageContexts = result.prerenderContext.pageContexts
    expect(
      pageContexts.some(
        (item: { isCompatibilityRedirect?: boolean; urlOriginal: string }) =>
          item.urlOriginal === '/' && item.isCompatibilityRedirect === true
      )
    ).toBe(true)
    locales.forEach((locale) => {
      const pageContext = pageContexts.find(
        (item: { isCompatibilityRedirect?: boolean; locale: string }) =>
          item.locale === locale && item.isCompatibilityRedirect === false
      )
      expect(pageContext?.urlOriginal).toBe(`/${locale}`)
    })
  })
})
