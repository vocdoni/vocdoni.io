import { Locale, localeDefault, locales } from '@/locales'
import { modifyUrl } from 'vike/modifyUrl'
import type { PageContext } from 'vike/types'

const extractLocale = (urlPathname: string) => {
  const path = urlPathname.split('/')

  let locale: string
  let urlPathnameWithoutLocale: string

  const first = path[1] || ''
  if (locales.includes(first as Locale)) {
    locale = first
    urlPathnameWithoutLocale = '/' + (path.slice(2).join('/') || '')
  } else {
    locale = localeDefault
    urlPathnameWithoutLocale = urlPathname || '/'
  }

  return { locale, urlPathnameWithoutLocale }
}

const onBeforeRoute = (pageContext: PageContext) => {
  const url = pageContext.urlParsed
  const { urlPathnameWithoutLocale, locale } = extractLocale(url.pathname)
  const pathname = urlPathnameWithoutLocale || '/'
  const urlLogical = modifyUrl(url.href, { pathname })
  return {
    pageContext: { locale, urlLogical },
  }
}

export default onBeforeRoute
