import { locales } from '@/locales'

const allJson = import.meta.glob('/locales/*/*.json', { eager: true, import: 'default' }) as Record<string, any>

const buildStore = (locale: string) => {
  const ns: Record<string, any> = {}
  for (const [p, data] of Object.entries(allJson)) {
    if (p.includes(`/locales/${locale}/`)) {
      ns[p.split('/').pop()!.replace('.json', '')] = data
    }
  }
  return { [locale]: ns }
}

const buildAllStores = () => Object.fromEntries(locales.map((locale) => [locale, buildStore(locale)[locale]]))

export default function onBeforeRender(pageContext: any) {
  const locale = pageContext.locale

  // Compat redirect pages only serve an instant client-side redirect –
  // no i18n store, no full page context needed.
  if (pageContext.isCompatibilityRedirect && !pageContext.is404) {
    return {
      pageContext: {
        isCompatibilityRedirect: true,
        locale,
        initialLocale: locale,
        initialI18nStore: {},
        urlLogical: pageContext.urlLogical || '/',
      },
    }
  }

  return {
    pageContext: {
      isCompatibilityRedirect: Boolean(pageContext.isCompatibilityRedirect),
      locale,
      initialLocale: locale,
      initialI18nStore: pageContext.is404 ? buildAllStores() : buildStore(locale),
      urlLogical: pageContext.urlLogical || '/',
    },
  }
}
