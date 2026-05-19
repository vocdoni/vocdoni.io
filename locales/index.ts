type Locale = 'ca' | 'de' | 'el' | 'en' | 'es' | 'eu' | 'fr' | 'it' | 'pt'
const locales: Locale[] = ['ca', 'de', 'el', 'en', 'es', 'fr', 'it', 'pt' /* 'eu' */]
const localeDefault: Locale = 'en'
const availableLocales: { value: Locale; label: string }[] = [
  { value: 'ca', label: 'Català' },
  // { value: 'de', label: 'Deutsch' },
  { value: 'el', label: 'Ελληνικά' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  // { value: 'eu', label: 'Euskara' },
  // { value: 'fr', label: 'Français' },
  // { value: 'it', label: 'Italiano' },
  // { value: 'pt', label: 'Português' },
]

export { availableLocales, Locale, localeDefault, locales };

