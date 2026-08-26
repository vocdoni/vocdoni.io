import TagManager from 'react-gtm-module'

const CONSENT_KEY = 'vocdoni-cookie-consent'
const CONSENT_ACCEPTED = 'accepted'
const CONSENT_REJECTED = 'rejected'
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

/**
 * The registrable domain both properties live under. The consent choice is
 * stored as a cookie scoped to it - not in localStorage, which is per-origin -
 * so that `app.vocdoni.io` reads the same decision this site records.
 *
 * That sharing is what makes cross-site analytics work at all: PostHog only
 * keeps one `distinct_id` across subdomains while both sites run with cookie
 * persistence, and both sites only switch to cookie persistence once consent is
 * known. A per-origin choice leaves the app in "no decision yet", where it
 * ignores the shared cookie and mints a fresh anonymous id.
 */
const ROOT_DOMAIN = 'vocdoni.io'

/** Dispatched on the window whenever the consent choice changes in this tab. */
export const CONSENT_CHANGE_EVENT = 'cookie-consent-changed'

/**
 * Hosts outside `vocdoni.io` - localhost and Netlify preview deploys - get a
 * host-only cookie, so preview builds never join production identities.
 */
export function consentCookieDomain(hostname: string): string | null {
  if (hostname === ROOT_DOMAIN || hostname.endsWith(`.${ROOT_DOMAIN}`)) return `.${ROOT_DOMAIN}`
  return null
}

export function buildConsentCookie(value: string, hostname: string, protocol: string): string {
  const domain = consentCookieDomain(hostname)
  return [
    `${CONSENT_KEY}=${encodeURIComponent(value)}`,
    'path=/',
    `max-age=${CONSENT_MAX_AGE_SECONDS}`,
    'samesite=lax',
    ...(domain ? [`domain=${domain}`] : []),
    ...(protocol === 'https:' ? ['secure'] : []),
  ].join('; ')
}

export function readConsentCookie(cookieString: string): string | null {
  for (const entry of cookieString.split(';')) {
    const separator = entry.indexOf('=')
    if (separator === -1) continue
    if (entry.slice(0, separator).trim() !== CONSENT_KEY) continue
    return decodeURIComponent(entry.slice(separator + 1).trim()) || null
  }
  return null
}

function readLegacyConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    // Safari private mode and storage-blocking extensions throw on access.
    return null
  }
}

function writeConsent(value: string): void {
  document.cookie = buildConsentCookie(value, window.location.hostname, window.location.protocol)
  try {
    // Mirrored, not read first: keeps a rollback of either site working, since
    // the previous implementation only ever looked at localStorage.
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // The cookie above is the source of truth; losing the mirror is harmless.
  }
}

/**
 * Get the current cookie consent status
 * @returns 'accepted', 'rejected', or null if no choice has been made
 */
export function getCookieConsent(): string | null {
  if (typeof window === 'undefined') return null

  const fromCookie = readConsentCookie(document.cookie)
  if (fromCookie) return fromCookie

  // Choices made before the shared cookie existed live in localStorage. Honour
  // one once and promote it, so nobody who already decided is asked again.
  const legacy = readLegacyConsent()
  if (legacy) writeConsent(legacy)
  return legacy
}

/**
 * Set the cookie consent status and dispatch a custom event
 * @param accepted - true if user accepted cookies, false if rejected
 */
export function setCookieConsent(accepted: boolean): void {
  if (typeof window === 'undefined') return
  writeConsent(accepted ? CONSENT_ACCEPTED : CONSENT_REJECTED)

  // Dispatch custom event for same-page listeners (e.g., CookieConsent component)
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT))
}

/**
 * Check if the user has made a cookie consent choice
 * @returns true if user has accepted or rejected, false if no choice made
 */
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false
  const consent = getCookieConsent()
  return consent === CONSENT_ACCEPTED || consent === CONSENT_REJECTED
}

/**
 * Check if the user has accepted cookies
 * @returns true if user accepted, false otherwise
 */
export function hasAcceptedCookies(): boolean {
  return getCookieConsent() === CONSENT_ACCEPTED
}

/**
 * Initialize Google Tag Manager with or without cookie storage
 * @param withCookies - if true, GTM will use cookies; if false, storage will be disabled
 */
export function initializeGTM(withCookies: boolean): void {
  if (typeof window === 'undefined') return

  if (!GTM_ID) return

  // Initialize GTM
  TagManager.initialize({ gtmId: GTM_ID })

  // If cookies are rejected, configure gtag to disable all storage
  if (!withCookies) {
    // Push configuration to dataLayer to disable all storage
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: 'consent_update',
      consent: {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted', // Security storage is typically always granted
      },
    })

    // Also use gtag command if available
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
      })
    }
  } else {
    // Push consent granted to dataLayer
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: 'consent_update',
      consent: {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
      },
    })

    // Also use gtag command if available
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
      })
    }
  }
}
