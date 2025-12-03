import { locales } from '@/locales'

const allJson = import.meta.glob('/locales/*/*.json', { eager: true, import: 'default' }) as Record<string, any>

declare global {
  namespace Vike {
    interface PageContext {
      locale: string
    }
  }
}

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
  return {
    pageContext: {
      locale,
      initialLocale: locale,
      initialI18nStore: pageContext.is404 ? buildAllStores() : buildStore(locale),
    },
  }
}
