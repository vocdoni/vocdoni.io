import { localeDefault, locales } from '@/locales'
import { PrerenderContext } from 'vike/types'

export const onPrerenderStart = async (prerenderContext: PrerenderContext) => {
  const pageContexts: Array<{ urlOriginal: string; locale: string }> = []

  // For each discovered page, create a version for each locale
  prerenderContext.pageContexts.forEach((pageContext) => {
    locales.forEach((locale) => {
      let { urlOriginal } = pageContext

      // For non-default locales, prepend the locale to the URL
      if (locale !== localeDefault) {
        urlOriginal = `/${locale}${urlOriginal}`
      }

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
