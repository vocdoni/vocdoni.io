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

    // Only detect/redirect from default locale pages
    // If user is on /es/ or /ca/, assume it's intentional
    if (currentLocale !== localeDefault) return

    // Check if user has already set a preference (manual selection or previous auto-detection)
    const savedPreference = getLocalePreference()
    if (savedPreference) {
      // Redirect to stored preference when landing on default locale again
      if (savedPreference !== localeDefault) {
        const targetPath = `/${savedPreference}${urlLogical}`
        window.location.replace(targetPath)
      }
      return
    }

    // Detect browser's preferred locale
    const detectedLocale = detectBrowserLocale()

    // If detected locale is different from default, redirect to that locale
    if (detectedLocale !== localeDefault) {
      // Build the full path with locale prefix
      const targetPath = `/${detectedLocale}${urlLogical}`

      // Save preference to prevent future auto-detection
      setLocalePreference(detectedLocale)

      // Redirect to the detected locale
      window.location.replace(targetPath)
    } else {
      // Browser prefers English (default locale), save preference to prevent future checks
      setLocalePreference(detectedLocale)
    }
  }, [isClient, currentLocale, urlLogical])
}
