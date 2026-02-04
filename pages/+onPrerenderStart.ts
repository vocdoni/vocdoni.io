import { locales } from '@/locales'
import { stripLocaleFromPath } from '@/lib/localized-path'
import { PrerenderContext } from 'vike/types'

export const onPrerenderStart = async (prerenderContext: PrerenderContext) => {
  const pageContexts: Array<{ urlOriginal: string; locale: string }> = []

  // For each discovered page, create a version for each locale
  prerenderContext.pageContexts.forEach((pageContext) => {
    locales.forEach((locale) => {
      const basePath = stripLocaleFromPath(pageContext.urlOriginal)
      const urlOriginal = basePath === '/' ? `/${locale}` : `/${locale}${basePath}`

      pageContexts.push({
        ...pageContext,
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
