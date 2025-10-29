import { Locale, locales } from '@/locales'

const LOCALE_PREFERENCE_KEY = 'vocdoni-locale-preference'

/**
 * Detects the browser's preferred locale from navigator.languages.
 * Uses two-level fallback:
 * 1. Try matching first part of locale code (e.g., 'ca' from 'ca-ES')
 * 2. If no match, try second part (e.g., 'es' from 'ca-ES')
 * 3. Continue through all browser languages
 * 4. Fallback to 'en' if no matches found
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'en'
  }

  const browserLanguages = window.navigator.languages || [window.navigator.language].filter(Boolean)

  for (const lang of browserLanguages) {
    if (!lang) continue

    // Split on '-' or '_' (e.g., 'ca-ES', 'ca_ES' → ['ca', 'ES'])
    const parts = lang.split(/[-_]/).map((part) => part.toLowerCase())

    // Try matching first part
    if (locales.includes(parts[0] as Locale)) {
      return parts[0] as Locale
    }

    // Try matching second part if it exists
    if (parts[1] && locales.includes(parts[1] as Locale)) {
      return parts[1] as Locale
    }
  }

  // Fallback to English
  return 'en'
}

/**
 * Gets the saved locale preference from localStorage.
 * Returns null if no preference is saved.
 */
export function getLocalePreference(): Locale | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const saved = window.localStorage.getItem(LOCALE_PREFERENCE_KEY)
    if (saved && locales.includes(saved as Locale)) {
      return saved as Locale
    }
  } catch (error) {
    // localStorage might not be available (private browsing, etc.)
    console.warn('Failed to read locale preference from localStorage:', error)
  }

  return null
}

/**
 * Saves the locale preference to localStorage.
 * This prevents auto-detection from running on subsequent visits.
 */
export function setLocalePreference(locale: Locale): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(LOCALE_PREFERENCE_KEY, locale)
  } catch (error) {
    // localStorage might not be available (private browsing, etc.)
    console.warn('Failed to save locale preference to localStorage:', error)
  }
}
