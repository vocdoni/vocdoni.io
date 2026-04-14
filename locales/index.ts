type Locale = 'ca' | 'de' | 'el' | 'en' | 'es' | 'it' | 'pt'
const locales: Locale[] = ['ca', 'en', 'es' /* 'de', 'el', 'it', 'pt' */]
const localeDefault: Locale = 'en'
const availableLocales: { value: Locale; label: string }[] = [
  { value: 'ca', label: 'Català' },
  // { value: 'de', label: 'Deutsch' },
  // { value: 'el', label: 'Ελληνικά' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  // { value: 'it', label: 'Italiano' },
  // { value: 'pt', label: 'Português' },
]

export { availableLocales, Locale, localeDefault, locales }
