import { describe, expect, it } from 'vitest'

import { localeDefault, locales } from '@/locales'
import { onPrerenderStart } from '@/pages/+onPrerenderStart'

describe('onPrerenderStart', () => {
  it('prefixes all locales including the default locale', async () => {
    const result = await onPrerenderStart({
      pageContexts: [{ urlOriginal: '/contact' }],
    } as any)

    const pageContexts = result.prerenderContext.pageContexts
    locales.forEach((locale) => {
      const pageContext = pageContexts.find((item: { locale: string }) => item.locale === locale)
      expect(pageContext?.urlOriginal).toBe(`/${locale}/contact`)
    })
  })

  it('prefixes locale roots without adding extra segments', async () => {
    const result = await onPrerenderStart({
      pageContexts: [{ urlOriginal: '/' }],
    } as any)

    const pageContexts = result.prerenderContext.pageContexts
    locales.forEach((locale) => {
      const pageContext = pageContexts.find((item: { locale: string }) => item.locale === locale)
      expect(pageContext?.urlOriginal).toBe(`/${locale}`)
    })
  })
})
