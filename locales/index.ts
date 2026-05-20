type Locale = 'ca' | 'de' | 'el' | 'en' | 'es' | 'eu' | 'fr' | 'it' | 'pt' | 'pt-br'
const locales: Locale[] = ['ca', 'de', 'el', 'en', 'es', 'eu', 'fr', 'it', 'pt', 'pt-br']
const localeDefault: Locale = 'en'
const availableLocales: { value: Locale; label: string }[] = [
  { value: 'ca', label: 'Català' },
  { value: 'de', label: 'Deutsch' },
  { value: 'el', label: 'Ελληνικά' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'eu', label: 'Euskara' },
  { value: 'fr', label: 'Français' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt-pt', label: 'Português (Portugal)' },
  { value: 'pt-br', label: 'Português (Brasil)' },
]

// Legacy/base-language aliases mapped to a supported Locale. Used to preserve
// backward-compat for previously shipped URLs (e.g. `/pt/...`) and to resolve
// generic browser languages (e.g. `pt`) to a supported region-specific variant.
const localeAliases: Record<string, Locale> = {
  pt: 'pt-br',
}

export { availableLocales, Locale, localeAliases, localeDefault, locales }
