import { localeAliases, localeDefault, locales, type Locale } from '@/locales'

export const LOCALE_PREFERENCE_KEY = 'vocdoni-locale-preference'

export function normalizeLogicalPath(value: string) {
  if (!value || value === '/' || value === '/#' || value === '/?') return '/'
  const withSlash = value.startsWith('/') ? value : `/${value}`
  const withoutTrailing = withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash
  return withoutTrailing || '/'
}

export function resolvePreferredLocale(
  savedLocale: string | null | undefined,
  browserLanguages: readonly string[],
  supportedLocales: readonly string[] = locales,
  defaultLocaleValue: string = localeDefault,
  aliases: Readonly<Record<string, string>> = localeAliases
) {
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale
  }
  if (savedLocale && aliases[savedLocale] && supportedLocales.includes(aliases[savedLocale])) {
    return aliases[savedLocale]
  }

  for (const language of browserLanguages) {
    if (!language) continue
    const parts = language.split(/[-_]/).map((part) => part.toLowerCase())
    // Prefer an exact region-specific match (e.g. 'pt-br') before the base language.
    const full = parts.join('-')
    if (supportedLocales.includes(full)) return full
    if (supportedLocales.includes(parts[0])) return parts[0]
    if (aliases[parts[0]] && supportedLocales.includes(aliases[parts[0]])) return aliases[parts[0]]
    if (parts[1] && supportedLocales.includes(parts[1])) return parts[1]
  }

  return defaultLocaleValue
}

export function buildLocaleRedirectTarget(logicalPath: string, locale: string, search = '', hash = '') {
  const normalizedPath = normalizeLogicalPath(logicalPath)
  const pathname = normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`
  return `${pathname}${search}${hash}`
}

export function getCompatibilityRedirectTarget(logicalPath: string, locale: Locale = localeDefault) {
  return buildLocaleRedirectTarget(logicalPath, locale)
}
