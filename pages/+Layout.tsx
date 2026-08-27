import { CookieConsent } from '@/components/CookieConsent'
import { WebsiteAnalytics } from '@/components/WebsiteAnalytics'
import { getCompatibilityRedirectTarget, LOCALE_PREFERENCE_KEY, normalizeLogicalPath } from '@/lib/localeRedirect'
import { useLocaleDetection } from '@/lib/useLocaleDetection'
import { localeDefault, locales } from '@/locales'
import i18next from 'i18next'
import React from 'react'
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'
import { ErrorBoundary } from '../components/ErrorBoundary'
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
    // Keep region-specific codes lowercase (e.g. `pt-br`) so they match the
    // locale keys used in URLs and resource bundles. Without this i18next
    // normalizes `pt-br` to `pt-BR` and fails to resolve the bundle.
    lowerCaseLng: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initImmediate: false,
  })
  return i
}

function CompatibilityRedirectLayout({ urlLogical }: { urlLogical: string }) {
  const normalizedPath = normalizeLogicalPath(urlLogical)
  const fallbackTarget = getCompatibilityRedirectTarget(normalizedPath)
  const redirectConfig = JSON.stringify({
    defaultLocale: localeDefault,
    locales,
    logicalPath: normalizedPath,
    localStorageKey: LOCALE_PREFERENCE_KEY,
  })
  const redirectScript = `
    (() => {
      const config = ${redirectConfig};
      const resolvePreferredLocale = (savedLocale, browserLanguages, supportedLocales, defaultLocaleValue) => {
        if (savedLocale && supportedLocales.includes(savedLocale)) return savedLocale;
        for (const language of browserLanguages) {
          if (!language) continue;
          const parts = language.split(/[-_]/).map((part) => part.toLowerCase());
          const full = parts.join('-');
          if (supportedLocales.includes(full)) return full;
          if (supportedLocales.includes(parts[0])) return parts[0];
          if (parts[1] && supportedLocales.includes(parts[1])) return parts[1];
        }
        return defaultLocaleValue;
      };
      let savedLocale = null;
      try {
        savedLocale = window.localStorage.getItem(config.localStorageKey);
      } catch {}
      const browserLanguages = window.navigator.languages || [window.navigator.language].filter(Boolean);
      const targetLocale = resolvePreferredLocale(savedLocale, browserLanguages, config.locales, config.defaultLocale);
      const buildRedirectTarget = (logicalPath, locale, search = '', hash = '') => {
        const pathname = logicalPath === '/' ? '/' + locale : '/' + locale + logicalPath;
        return pathname + search + hash;
      };
      const targetUrl = buildRedirectTarget(config.logicalPath, targetLocale, window.location.search, window.location.hash);
      window.location.replace(targetUrl);
    })();
  `

  return (
    <div data-compatibility-redirect='true'>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <a href={fallbackTarget}>Continue</a>
      </noscript>
    </div>
  )
}

function SkipToMainContent() {
  const { t } = useTranslation()
  return (
    <a
      href='#main-content'
      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:ring-2 focus:ring-primary'
    >
      {t('layout.skip_to_main_content', 'Skip to main content')}
    </a>
  )
}

function LocalizedLayout({
  children,
  initialLocale,
  initialI18nStore,
  locale,
  urlLogical,
}: {
  children: React.ReactNode
  initialLocale: string
  initialI18nStore: any
  locale: string
  urlLogical: string
}) {
  const i18n = React.useMemo(() => createI18nSync(initialLocale, initialI18nStore), [initialLocale, initialI18nStore])

  // Detect browser language and redirect on first visit (client-side only)
  useLocaleDetection(locale, urlLogical)

  return (
    <I18nextProvider i18n={i18n}>
      <div className='min-h-screen bg-background font-sans antialiased flex flex-col overflow-x-clip'>
        <SkipToMainContent />
        <CookieConsent />
        <WebsiteAnalytics urlLogical={urlLogical} />
        <Navbar />
        {/* The navbar is sticky and in normal flow, so no top padding is needed. */}
        <main id='main-content' tabIndex={-1} className='flex-1'>
          <ErrorBoundary key={urlLogical}>{children}</ErrorBoundary>
        </main>
        <Footer />
      </div>
    </I18nextProvider>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext() as any
  const { initialLocale, initialI18nStore, locale, urlLogical, isCompatibilityRedirect, is404 } = pageContext

  // The Keystatic admin renders full-screen, without the site chrome or i18n.
  const urlPathname: string = pageContext.urlPathname || urlLogical || ''
  if (urlPathname === '/keystatic' || urlPathname.startsWith('/keystatic/')) {
    return <div className='min-h-screen bg-background'>{children}</div>
  }

  if (isCompatibilityRedirect && !is404) {
    return <CompatibilityRedirectLayout urlLogical={urlLogical} />
  }

  return (
    <LocalizedLayout
      initialLocale={initialLocale}
      initialI18nStore={initialI18nStore}
      locale={locale}
      urlLogical={urlLogical}
    >
      {children}
    </LocalizedLayout>
  )
}
