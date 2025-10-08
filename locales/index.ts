type Locale = 'es' | 'en' | 'ca'
const locales: Locale[] = ['es', 'en', 'ca']
const localeDefault: Locale = 'en'
const availableLocales: { value: Locale; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'ca', label: 'Català' },
]

export { availableLocales, Locale, localeDefault, locales }
