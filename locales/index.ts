type Locale = 'es' | 'en' | 'ca' | 'de' | 'it' | 'pt'
const locales: Locale[] = ['es', 'en', 'ca', 'de', 'it', 'pt']
const localeDefault: Locale = 'en'
const availableLocales: { value: Locale; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'ca', label: 'Català' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
]

export { availableLocales, Locale, localeDefault, locales }
