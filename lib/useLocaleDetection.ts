import { localeDefault } from '@/locales'
import { useEffect } from 'react'
import { detectBrowserLocale, getLocalePreference, setLocalePreference } from './localeDetection'
import { useIsClient } from './useIsClient'

/**
 * Hook to detect browser language and redirect to appropriate locale.
 * Only runs on default locale (en) pages to avoid interfering with manual language selection,
 * and will also redirect back to a stored preference on return visits.
 *
 * @param currentLocale - The current page locale from pageContext
 * @param urlLogical - The current URL path without locale prefix (e.g., '/product')
 */
export function useLocaleDetection(currentLocale: string, urlLogical: string) {
  const isClient = useIsClient()

  useEffect(() => {
    // Only run on client side
    if (!isClient) return

    const currentPath = window.location.pathname
    const isDefaultLocalePath = currentPath === `/${localeDefault}` || currentPath.startsWith(`/${localeDefault}/`)

    // Only detect/redirect from default locale pages
    // If user is on /es/ or /ca/, assume it's intentional
    if (currentLocale !== localeDefault || isDefaultLocalePath) return

    // Check if user has already set a preference (manual selection or previous auto-detection)
    const savedPreference = getLocalePreference()
    if (savedPreference) {
      // Redirect to stored preference when landing on default locale again
      const targetPath = `/${savedPreference}${urlLogical === '/' ? '/' : urlLogical}`
      window.location.replace(targetPath)
      return
    }

    // Detect browser's preferred locale
    const detectedLocale = detectBrowserLocale()

    // Build the full path with locale prefix
    const targetPath = `/${detectedLocale}${urlLogical === '/' ? '/' : urlLogical}`

    // Save preference to prevent future auto-detection
    setLocalePreference(detectedLocale)

    // Redirect to the detected locale (including default locale to enforce /:lang)
    window.location.replace(targetPath)
  }, [isClient, currentLocale, urlLogical])
}
