import TagManager from 'react-gtm-module'

import { PRIVACY_POLICY_REVISION_DATE } from '@/lib/privacyPolicy'

const CONSENT_KEY = 'vocdoni-cookie-consent'
const CONSENT_ACCEPTED = 'accepted'
const CONSENT_REJECTED = 'rejected'
/** Section 9 of the privacy policy tells visitors the record is kept 12 months. */
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
 * Dispatched on the window when the "Cookie settings" control asks for the
 * banner back, so a visitor who already answered can change or withdraw that
 * answer. Section 9 promises the footer link reopens the banner.
 */
export const CONSENT_REOPEN_EVENT = 'cookie-consent-reopen'

/**
 * Cookies the analytics consent covers, matched by name because the PostHog and
 * GA container ids are part of theirs. Withdrawing consent has to take effect
 * on both properties, and the shared PostHog identifier is the thing to remove:
 * left in place it would survive the withdrawal and be picked up again by a
 * later acceptance, tying the two visits together.
 */
const ANALYTICS_COOKIE_PATTERNS = [/^ph_.+_posthog$/, /^_ga(_.+)?$/, /^_gid$/, /^_gat.*$/]

export type ConsentChoice = typeof CONSENT_ACCEPTED | typeof CONSENT_REJECTED

/**
 * What section 9 says this cookie holds: the choice, the date it was made, and
 * the revision date of the policy in force at that moment.
 */
export type ConsentRecord = {
  choice: ConsentChoice
  /**
   * ISO timestamp of the answer, or `null` for a choice promoted from the bare
   * `accepted` / `rejected` string every version before this one stored, which
   * kept no date.
   */
  date: string | null
  /**
   * Revision date of the privacy policy in force when the answer was given, as
   * `YYYY-MM-DD`. `null` for a promoted bare string, which predates versioning.
   */
  policy: string | null
  /**
   * ISO timestamp at which an invalidated earlier record stopped being relied
   * on. Recorded at the DPO's request, so the record shows when the renewal ran
   * as well as when the visitor answered it.
   */
  renewedAt?: string
}

function isConsentChoice(value: unknown): value is ConsentChoice {
  return value === CONSENT_ACCEPTED || value === CONSENT_REJECTED
}

/**
 * Read a stored value in either shape: the JSON record written since the policy
 * revision, or the bare `accepted` / `rejected` string written before it. A
 * bare string carries neither a date nor a policy version, which is what makes
 * it invalid under section 10 - it is a consent from before the revision.
 */
export function parseConsentValue(raw: string | null): ConsentRecord | null {
  if (!raw) return null
  if (isConsentChoice(raw)) return { choice: raw, date: null, policy: null }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (typeof parsed !== 'object' || parsed === null) return null

  const { choice, date, policy, renewedAt } = parsed as Record<string, unknown>
  if (!isConsentChoice(choice)) return null

  return {
    choice,
    date: typeof date === 'string' ? date : null,
    policy: typeof policy === 'string' ? policy : null,
    ...(typeof renewedAt === 'string' ? { renewedAt } : {}),
  }
}

export function serializeConsentRecord(record: ConsentRecord): string {
  return JSON.stringify(record)
}

/**
 * Whether a stored record still covers the processing the current policy
 * describes. Section 10 invalidates every consent given before the revision
 * date, because that revision introduced a new purpose; ISO calendar dates
 * compare correctly as plain strings.
 */
export function isConsentCurrent(
  record: ConsentRecord | null,
  revisionDate: string = PRIVACY_POLICY_REVISION_DATE
): boolean {
  if (!record || record.policy === null) return false
  return record.policy >= revisionDate
}

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

/**
 * The writes that expire one analytics cookie. A cookie is only removed by a
 * write matching the domain it was set on, and from here we cannot tell whether
 * PostHog or the GA container wrote a shared-domain or a host-only one, so on
 * `vocdoni.io` both variants are returned.
 */
export function buildExpiredCookies(name: string, hostname: string, protocol: string): string[] {
  const domain = consentCookieDomain(hostname)
  const attributes = [`${name}=`, 'path=/', 'max-age=0', 'samesite=lax', ...(protocol === 'https:' ? ['secure'] : [])]

  return domain ? [attributes.join('; '), [...attributes, `domain=${domain}`].join('; ')] : [attributes.join('; ')]
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

/** The names in a cookie string that the analytics consent covers. */
export function analyticsCookieNames(cookieString: string): string[] {
  return cookieString
    .split(';')
    .filter((entry) => entry.includes('='))
    .map((entry) => entry.slice(0, entry.indexOf('=')).trim())
    .filter((name) => ANALYTICS_COOKIE_PATTERNS.some((pattern) => pattern.test(name)))
}

function readCookieString(): string {
  // Guarded rather than read directly: this runs from `lib/posthog.ts` on every
  // captured event, including from contexts that have a window but no document.
  if (typeof document === 'undefined') return ''
  return document.cookie ?? ''
}

function readLegacyConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    // Safari private mode and storage-blocking extensions throw on access.
    return null
  }
}

function writeConsent(record: ConsentRecord): void {
  const value = serializeConsentRecord(record)

  if (typeof document !== 'undefined') {
    document.cookie = buildConsentCookie(value, window.location.hostname, window.location.protocol)
  }

  try {
    // Mirrored, not read first: it carries the record across a cookie clear on
    // one origin, and it is the only one of the two that raises an event in
    // other tabs.
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // The cookie above is the source of truth; losing the mirror is harmless.
  }
}

/**
 * Note when an invalidated record stopped being relied on. The renewal runs
 * here, on the first visit after the revision, rather than when the visitor
 * answers the reopened banner - those are different moments, and the first one
 * is when we stopped acting on the old consent.
 */
function stampRenewal(record: ConsentRecord, now: Date): ConsentRecord {
  if (isConsentCurrent(record) || record.renewedAt) return record
  return { ...record, renewedAt: now.toISOString() }
}

/**
 * Read the stored consent record, whatever shape it was left in.
 * @returns the record, or null if no choice has ever been made
 */
export function getConsentRecord(): ConsentRecord | null {
  if (typeof window === 'undefined') return null

  const fromCookie = parseConsentValue(readConsentCookie(readCookieString()))
  if (fromCookie) {
    const stamped = stampRenewal(fromCookie, new Date())
    if (stamped !== fromCookie) writeConsent(stamped)
    return stamped
  }

  // Choices made before the shared cookie existed live in localStorage. Honour
  // one once and promote it, so it is upgraded to a record rather than read
  // again on every page.
  const legacy = parseConsentValue(readLegacyConsent())
  if (!legacy) return null

  const stamped = stampRenewal(legacy, new Date())
  writeConsent(stamped)
  return stamped
}

/**
 * Get the current cookie consent status
 * @returns 'accepted', 'rejected', or null if no choice has been made or the
 * one on record was given before the current revision of the privacy policy
 */
export function getCookieConsent(): string | null {
  const record = getConsentRecord()
  if (!record || !isConsentCurrent(record)) return null
  return record.choice
}

/**
 * Expire the analytics cookies on the shared domain, so a withdrawal takes
 * effect on `app.vocdoni.io` as well as here rather than only stopping new
 * collection.
 */
function clearAnalyticsCookies(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const { hostname, protocol } = window.location
  for (const name of analyticsCookieNames(document.cookie)) {
    for (const write of buildExpiredCookies(name, hostname, protocol)) {
      document.cookie = write
    }
  }
}

/**
 * Set the cookie consent status and dispatch a custom event
 * @param accepted - true if user accepted cookies, false if rejected
 */
export function setCookieConsent(accepted: boolean): void {
  if (typeof window === 'undefined') return

  const superseded = getConsentRecord()

  writeConsent({
    choice: accepted ? CONSENT_ACCEPTED : CONSENT_REJECTED,
    date: new Date().toISOString(),
    policy: PRIVACY_POLICY_REVISION_DATE,
    // Carried over so the answer and the renewal that prompted it stay together
    // in one record.
    ...(superseded?.renewedAt ? { renewedAt: superseded.renewedAt } : {}),
  })

  // A withdrawal has to leave nothing behind on either property, not merely
  // stop the next collection.
  if (!accepted) clearAnalyticsCookies()

  // Dispatch custom event for same-page listeners (e.g., CookieConsent component)
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT))
}

/**
 * Ask the banner to reopen so an existing choice can be changed or withdrawn.
 * Nothing is revoked here: the withdrawal is the visitor pressing reject on the
 * banner, which is what section 9 describes and what keeps the control from
 * dropping a valid consent just because someone opened it to look.
 */
export function reopenCookieConsent(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT))
}

/**
 * Check if the user has made a cookie consent choice
 * @returns true if user has accepted or rejected under the current revision of
 * the privacy policy, false if no choice made or the choice was invalidated
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
