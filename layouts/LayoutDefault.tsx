import i18next from 'i18next'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { CookieConsent } from '@/components/CookieConsent'
import { useLocaleDetection } from '@/lib/useLocaleDetection'

import './style.css'
import './tailwind.css'

function createI18nSync(lng: string, resources: any) {
  const i = i18next.createInstance()
  i.use(initReactI18next).init({
    lng,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: Object.keys(resources[lng] || { common: {} }),
    resources,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initImmediate: false,
  })
  return i
}

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext() as any
  const { initialLocale, initialI18nStore, locale, urlLogical } = pageContext

  const i18n = React.useMemo(() => createI18nSync(initialLocale, initialI18nStore), [initialLocale, initialI18nStore])

  // Detect browser language and redirect on first visit (client-side only)
  useLocaleDetection(locale, urlLogical)

  return (
    <I18nextProvider i18n={i18n}>
      <CookieConsent />
      <div className='min-h-screen bg-background text-foreground'>{children}</div>
    </I18nextProvider>
  )
}
