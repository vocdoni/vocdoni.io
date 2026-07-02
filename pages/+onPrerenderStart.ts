import { stripLocaleFromPath } from '@/lib/localized-path'
import { localeDefault, locales } from '@/locales'
import { PrerenderContext } from 'vike/types'

export const onPrerenderStart = async (prerenderContext: PrerenderContext) => {
  const pageContexts: Array<{
    isCompatibilityRedirect: boolean
    locale: string
    urlLogical: string
    urlOriginal: string
  }> = []

  // For each discovered page, keep the unprefixed compatibility route
  // and add one canonical route per locale.
  prerenderContext.pageContexts.forEach((pageContext) => {
    const basePath = stripLocaleFromPath(pageContext.urlOriginal)

    // The Keystatic admin lives outside the localized site: emit a single
    // unprefixed shell, no per-locale variants and no compatibility redirect.
    if (basePath === '/keystatic' || basePath.startsWith('/keystatic/')) {
      pageContexts.push({
        ...pageContext,
        isCompatibilityRedirect: false,
        locale: localeDefault,
        urlLogical: basePath,
        urlOriginal: basePath,
      })
      return
    }

    pageContexts.push({
      ...pageContext,
      isCompatibilityRedirect: true,
      locale: localeDefault,
      urlLogical: basePath,
      urlOriginal: basePath,
    })

    locales.forEach((locale) => {
      const urlOriginal = basePath === '/' ? `/${locale}` : `/${locale}${basePath}`

      pageContexts.push({
        ...pageContext,
        isCompatibilityRedirect: false,
        urlLogical: basePath,
        urlOriginal,
        locale,
      })
    })
  })

  return {
    prerenderContext: {
      pageContexts,
    },
  }
}
