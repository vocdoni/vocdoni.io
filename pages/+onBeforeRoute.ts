import { modifyUrl } from 'vike/modifyUrl'
import type { PageContext } from 'vike/types'

const locales = ['es', 'en', 'ca']
const localeDefault = 'en'

const extractLocale = (urlPathname: string) => {
  const path = urlPathname.split('/')

  let locale
  let urlPathnameWithoutLocale

  const first = path[1]
  if (locales.filter((locale) => locale !== localeDefault).includes(first)) {
    locale = first
    urlPathnameWithoutLocale = '/' + path.slice(2).join('/')
  } else {
    locale = localeDefault
    urlPathnameWithoutLocale = urlPathname
  }

  return { locale, urlPathnameWithoutLocale }
}

const onBeforeRoute = (pageContext: PageContext) => {
  const url = pageContext.urlParsed
  const { urlPathnameWithoutLocale, locale } = extractLocale(url.pathname)
  const urlLogical = modifyUrl(url.href, { pathname: urlPathnameWithoutLocale })
  return {
    pageContext: { locale, urlLogical },
  }
}

export default onBeforeRoute
