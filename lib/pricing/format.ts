// Memoised formatter cache keyed by locale+options string.
const formatterCache = new Map<string, Intl.NumberFormat>()

function getFormatter(key: string, locale: string, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  let fmt = formatterCache.get(key)
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, options)
    formatterCache.set(key, fmt)
  }
  return fmt
}

/**
 * Ensures Hindi (and any Hindi-region) locale uses Latin (ASCII) digits rather than Devanagari.
 * Other locales are returned unchanged.
 */
export const formatLocale = (locale: string): string => {
  if (locale === 'hi' || locale.startsWith('hi-')) return 'hi-u-nu-latn'
  return locale
}

/**
 * Formats an integer amount in cents as a EUR currency string.
 * Whole euros (cents % 100 === 0) render without decimals ("EUR 109"); otherwise two decimals.
 */
export const formatCurrency = (cents: number, locale: string): string => {
  const decimals = cents % 100 === 0 ? 0 : 2
  const key = `currency:${formatLocale(locale)}:${decimals}`
  const fmt = getFormatter(key, formatLocale(locale), {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: 2,
  })
  return fmt.format(cents / 100)
}

/**
 * Formats a per-person rate given in hundredths of a cent as a EUR currency string.
 * Renders with 2 to 3 decimal places.
 */
export const formatRate = (hundredthsOfCent: number, locale: string): string => {
  const key = `rate:${formatLocale(locale)}`
  const fmt = getFormatter(key, formatLocale(locale), {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  })
  return fmt.format(hundredthsOfCent / 10000)
}

/** Formats an integer count of people with locale-appropriate digit grouping. */
export const formatPeople = (people: number, locale: string): string => {
  const key = `people:${formatLocale(locale)}`
  const fmt = getFormatter(key, formatLocale(locale), { style: 'decimal' })
  return fmt.format(people)
}
