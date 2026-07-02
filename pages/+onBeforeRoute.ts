import { Locale, localeDefault, locales } from '@/locales'
import type { PageContext } from 'vike/types'

const extractLocale = (urlPathname: string) => {
  const path = urlPathname.split('/')

  let locale: string
  let urlPathnameWithoutLocale: string
  let hasLocalePrefix = false

  const first = path[1] || ''
  if (locales.includes(first as Locale)) {
    hasLocalePrefix = true
    locale = first
    urlPathnameWithoutLocale = '/' + (path.slice(2).join('/') || '')
  } else {
    locale = localeDefault
    urlPathnameWithoutLocale = urlPathname || '/'
  }

  return { locale, urlPathnameWithoutLocale, hasLocalePrefix }
}

const onBeforeRoute = (pageContext: PageContext) => {
  const { urlOriginal } = pageContext

  // The Keystatic admin (/keystatic) lives outside the localized site: no locale
  // prefix, no compatibility redirect. Route it verbatim.
  const pathname = urlOriginal.split('?')[0]
  if (pathname === '/keystatic' || pathname.startsWith('/keystatic/')) {
    return {
      pageContext: {
        isCompatibilityRedirect: false,
        locale: localeDefault,
        urlLogical: pathname,
      },
    }
  }

  const { urlPathnameWithoutLocale, locale, hasLocalePrefix } = extractLocale(urlOriginal)

  // Create urlLogical without the locale prefix for routing
  const urlLogical = urlPathnameWithoutLocale

  return {
    pageContext: {
      isCompatibilityRedirect: !hasLocalePrefix,
      locale,
      urlLogical,
    },
  }
}

export default onBeforeRoute
