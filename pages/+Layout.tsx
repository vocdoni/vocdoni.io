import { CookieConsent } from '@/components/CookieConsent'
import { useLocaleDetection } from '@/lib/useLocaleDetection'
import i18next from 'i18next'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'
import Footer from '../components/Footer'
import { Navbar } from '../components/Navbar'

import '@/layouts/style.css'
import '@/layouts/tailwind.css'

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext() as any
  const { initialLocale, initialI18nStore, locale, urlLogical } = pageContext

  const i18n = React.useMemo(() => createI18nSync(initialLocale, initialI18nStore), [initialLocale, initialI18nStore])

  // Detect browser language and redirect on first visit (client-side only)
  useLocaleDetection(locale, urlLogical)

  return (
    <I18nextProvider i18n={i18n}>
      <div className='min-h-screen bg-background font-sans antialiased flex flex-col'>
        <CookieConsent />
        <Navbar />
        <main className='flex-1 pt-20'>{children}</main>
        <Footer />
      </div>
    </I18nextProvider>
  )
}
