import { locales, localeDefault, type Locale } from '@/locales'

const normalizePath = (value: string) => {
  if (!value) return '/'
  const withSlash = value.startsWith('/') ? value : `/${value}`
  if (withSlash === '/' || withSlash === '/#' || withSlash === '/?') return '/'
  const withoutTrailing = withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash
  return withoutTrailing || '/'
}

const hasLocalePrefix = (path: string) => {
  const trimmed = path.startsWith('/') ? path.slice(1) : path
  const [firstSegment] = trimmed.split('/')
  if (!firstSegment) return false
  return locales.includes(firstSegment as Locale)
}

export function getLocalizedPath(path: string, locale: Locale) {
  if (!path) return '/'
  if (path.startsWith('#') || path.startsWith('?')) {
    return path
  }

  const normalized = normalizePath(path)

  if (hasLocalePrefix(normalized)) {
    return normalized
  }

  if (normalized === '/') {
    return `/${locale}`
  }

  const trimmed = normalized.startsWith('/') ? normalized.slice(1) : normalized
  return `/${locale}/${trimmed}`
}

export function stripLocaleFromPath(path: string) {
  const normalized = normalizePath(path)
  if (!hasLocalePrefix(normalized)) {
    return normalized
  }

  const trimmed = normalized.startsWith('/') ? normalized.slice(1) : normalized
  const [, ...rest] = trimmed.split('/')
  const stripped = rest.join('/')
  return stripped ? `/${stripped}` : '/'
}

export function ensureLeadingSlash(value: string) {
  if (!value) return '/'
  return value.startsWith('/') ? value : `/${value}`
}
