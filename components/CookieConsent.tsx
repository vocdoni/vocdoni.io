import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { getCookieConsent, hasCookieConsent, initializeGTM, setCookieConsent } from '@/lib/cookieConsent'
import { cn } from '@/lib/utils'

export function CookieConsent() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user has already made a choice
    const hasConsent = hasCookieConsent()

    if (hasConsent) {
      // User has already made a choice, initialize GTM accordingly
      const consent = getCookieConsent()
      const accepted = consent === 'accepted'
      initializeGTM(accepted)
    } else {
      // Show the cookie consent banner
      setOpen(true)
    }
  }, [])

  // Listen for localStorage changes (both same-page and cross-tab)
  useEffect(() => {
    const handleConsentChange = () => {
      // Check if consent is now valid
      if (hasCookieConsent()) {
        const consent = getCookieConsent()
        const accepted = consent === 'accepted'

        // Close banner and initialize GTM
        setOpen(false)
        initializeGTM(accepted)
      }
    }

    // Listen for cross-tab storage changes
    const handleStorageChange = (e: StorageEvent) => {
      // Only respond to changes to the cookie consent key
      if (e.key === 'vocdoni-cookie-consent') {
        handleConsentChange()
      }
    }

    // Register both event listeners
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cookie-consent-changed', handleConsentChange)

    // Clean up on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cookie-consent-changed', handleConsentChange)
    }
  }, [])

  const handleAccept = () => {
    setCookieConsent(true)
    initializeGTM(true)
    setOpen(false)
  }

  const handleReject = () => {
    setCookieConsent(false)
    initializeGTM(false)
    setOpen(false)
  }

  // Don't render anything on server-side or if banner is closed
  if (!mounted || !open) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 z-[60]',
        'w-full max-w-4xl px-4 pt-4 animate-in slide-in-from-top-5'
      )}
      role='dialog'
      aria-label={t('cookies.aria_label', 'Cookies consent banner')}
    >
      <Alert className='bg-background shadow-xl border-2'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
          <div className='flex-1 space-y-2'>
            <AlertTitle className='text-base font-semibold'>{t('cookies.title')}</AlertTitle>
            <AlertDescription className='text-sm text-muted-foreground'>
              {t('cookies.description')}{' '}
              <Link href='/privacy' className='underline hover:text-foreground font-medium'>
                {t('cookies.learnMore')}
              </Link>
            </AlertDescription>
          </div>
          <div className='flex gap-2 lg:flex-shrink-0'>
            <Button variant='outline' onClick={handleReject} className='min-w-[100px]'>
              {t('cookies.reject')}
            </Button>
            <Button onClick={handleAccept} className='min-w-[100px]'>
              {t('cookies.accept')}
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  )
}
