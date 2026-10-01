import type { Locale } from '@/locales'

/**
 * Links into the voting app (`APP_URL`).
 *
 * The app root sends a visitor with no session to sign-in, a form for people
 * who already have an account, so every "Start"-type CTA links straight to
 * sign-up instead, and only an explicit sign-in link points at sign-in.
 */

// Languages the app serves under a `/{lang}/` prefix (vocdoni-app
// `src/i18n/languages.ts`). A site locale outside this list gets no prefix, and
// the app picks the language from the browser.
const APP_LANGUAGES: readonly string[] = ['ca', 'de', 'el', 'en', 'es', 'eu', 'fr', 'it', 'pt', 'pt-br']

/** Query param naming the CTA that brought the visitor, for the app to attribute the signup. */
export const APP_CTA_REF_PARAM = 'ref'

type AppAuthPage = 'signup' | 'signin'

interface AppAuthUrlOptions {
  /** Vertical slug the app reads from `?type=` to tailor the auth screens. */
  type?: string
}

export function getAppAuthUrl(page: AppAuthPage, locale: Locale | string | undefined, options: AppAuthUrlOptions = {}) {
  const prefix = locale && APP_LANGUAGES.includes(locale) ? `/${locale}` : ''
  const url = `${APP_URL}${prefix}/account/${page}`
  return options.type ? `${url}?type=${encodeURIComponent(options.type)}` : url
}

/**
 * Tags an app link with the CTA it came from. Leaves every other link, and an
 * app link that already names its `ref`, untouched.
 */
export function withAppCtaRef(href: string, ctaId: string | undefined, appUrl: string = APP_URL) {
  if (!ctaId || !appUrl) return href
  if (href !== appUrl && !href.startsWith(`${appUrl}/`) && !href.startsWith(`${appUrl}?`)) return href

  try {
    const url = new URL(href)
    if (url.searchParams.has(APP_CTA_REF_PARAM)) return href
    url.searchParams.set(APP_CTA_REF_PARAM, ctaId)
    return url.toString()
  } catch {
    return href
  }
}
