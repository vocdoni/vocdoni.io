// Client-safe blog helpers (no content glob), usable from components.

export const formatDate = (date: string, locale: string): string => {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  // Blog dates are date-only (YYYY-MM-DD = UTC midnight); pin to UTC so the day
  // never shifts in negative-offset timezones.
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d)
}

export const authorInitials = (name: string): string =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
