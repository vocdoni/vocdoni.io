const allJson = import.meta.glob('/locales/*/*.json', { eager: true, import: 'default' }) as Record<string, any>

function buildStore(locale: string) {
  const ns: Record<string, any> = {}
  for (const [p, data] of Object.entries(allJson)) {
    if (p.includes(`/locales/${locale}/`)) {
      ns[p.split('/').pop()!.replace('.json', '')] = data
    }
  }
  return { [locale]: ns } // shape esperada por i18next
}

export default function onBeforeRender(pc: any) {
  const locale = pc.locale || 'es'
  return {
    pageContext: {
      locale,
      initialLocale: locale,
      initialI18nStore: buildStore(locale),
    },
  }
}
