import { localeDefault, locales } from '@/locales'

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
  const initialI18nStore = buildStore(locale)

  // This claim-sensitive evidence page remains English-only until its translations receive editorial review.
  // Load the English resource beside the current locale so its explicit i18n lookup works on every locale route.
  if (pageContext.urlLogical === '/security-accessibility' && locale !== localeDefault) {
    Object.assign(initialI18nStore, buildStore(localeDefault))
  }

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
      initialI18nStore: pageContext.is404 ? buildAllStores() : initialI18nStore,
      urlLogical: pageContext.urlLogical || '/',
    },
  }
}
