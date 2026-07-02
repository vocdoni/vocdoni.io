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
  { value: 'pt', label: 'Português (Portugal)' },
  { value: 'pt-br', label: 'Português (Brasil)' },
]

export { availableLocales, Locale, localeDefault, locales }
