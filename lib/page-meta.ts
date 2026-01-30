import { localeDefault } from '@/locales'
import i18next from 'i18next'

const createI18nSync = (lng: string, resources: Record<string, any>) => {
  const i = i18next.createInstance()
  i.init({
    lng,
    fallbackLng: localeDefault,
    defaultNS: 'common',
    ns: Object.keys(resources[lng] || { common: {} }),
    resources,
    interpolation: { escapeValue: false },
    initImmediate: false,
  })
  return i
}

export const getMetaByKey = (pageContext: Vike.PageContextServer, key: string) => {
  const locale = pageContext.initialLocale || pageContext.locale || localeDefault
  const resources = pageContext.initialI18nStore
  if (!resources || !resources[locale]) {
    return key
  }

  const i18n = createI18nSync(locale, resources)
  const value = i18n.t(key)
  return typeof value === 'string' && value.trim() ? value : key
}
