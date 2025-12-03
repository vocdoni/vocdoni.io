import { Link } from '@/components/Link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { getLocalePreference } from '@/lib/localeDetection'
import { Locale, localeDefault, locales } from '@/locales'

export default function Page() {
  const { is404 } = usePageContext()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // Client-only: adjust language when the static 404 page is served for any locale
    if (typeof window === 'undefined') return

    const pathLocaleCandidate = window.location.pathname.split('/')[1]
    const pathLocale =
      pathLocaleCandidate && locales.includes(pathLocaleCandidate as Locale) ? (pathLocaleCandidate as Locale) : null
    const savedPreference = getLocalePreference()

    const targetLocale: Locale = pathLocale ?? savedPreference ?? localeDefault

    if (targetLocale !== i18n.language) {
      i18n.changeLanguage(targetLocale)
    }
  }, [i18n])

  const title = is404
    ? t('error.404.title', { defaultValue: 'Page not found' })
    : t('error.500.title', { defaultValue: 'Something went wrong' })
  const description = is404
    ? t('error.404.description', { defaultValue: "We couldn't find the page you were looking for." })
    : t('error.500.description', { defaultValue: 'An unexpected error occurred. Please try again later.' })

  return (
    <>
      <Navigation />
      <main className='flex flex-col bg-gradient-to-b from-white to-stone-100'>
        <section className='min-h-screen flex-1 flex items-center justify-center px-4 pt-24 pb-16'>
          <div className='text-center space-y-4 max-w-xl'>
            <p className='text-9xl font-semibold tracking-wide text-muted-foreground'>{is404 ? '404' : '500'}</p>
            <h1 className='text-4xl sm:text-5xl font-semibold'>{title}</h1>
            <p className='text-lg text-muted-foreground'>{description}</p>
            <div className='flex justify-center'>
              <Button asChild>
                <Link href='/'>{t('error.back_home', { defaultValue: 'Back to homepage' })}</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}
