import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  type ConsentRecord,
  analyticsCookieNames,
  buildConsentCookie,
  buildExpiredCookies,
  consentCookieDomain,
  getConsentRecord,
  getCookieConsent,
  isConsentCurrent,
  parseConsentValue,
  readConsentCookie,
  serializeConsentRecord,
  setCookieConsent,
} from '@/lib/cookieConsent'
import { PRIVACY_POLICY_REVISION_DATE } from '@/lib/privacyPolicy'

describe('consentCookieDomain', () => {
  it('scopes the choice to the parent domain so app.vocdoni.io reads the same decision', () => {
    expect(consentCookieDomain('vocdoni.io')).toBe('.vocdoni.io')
    expect(consentCookieDomain('www.vocdoni.io')).toBe('.vocdoni.io')
    expect(consentCookieDomain('app.vocdoni.io')).toBe('.vocdoni.io')
  })

  it('keeps preview and local hosts host-only, so they never join production identities', () => {
    expect(consentCookieDomain('localhost')).toBeNull()
    expect(consentCookieDomain('deploy-preview-42--vocdoni.netlify.app')).toBeNull()
  })

  it('does not match a lookalike domain that merely ends in the same characters', () => {
    expect(consentCookieDomain('notvocdoni.io')).toBeNull()
    expect(consentCookieDomain('vocdoni.io.evil.com')).toBeNull()
  })
})

describe('buildConsentCookie', () => {
  it('sets the shared domain and marks the cookie secure over https', () => {
    const cookie = buildConsentCookie('accepted', 'vocdoni.io', 'https:')

    expect(cookie).toContain('vocdoni-cookie-consent=accepted')
    expect(cookie).toContain('domain=.vocdoni.io')
    expect(cookie).toContain('samesite=lax')
    expect(cookie).toContain('path=/')
    expect(cookie).toContain('secure')
  })

  it('omits the domain and the secure flag on plain-http localhost', () => {
    const cookie = buildConsentCookie('rejected', 'localhost', 'http:')

    expect(cookie).not.toContain('domain=')
    expect(cookie).not.toContain('secure')
  })
})

describe('readConsentCookie', () => {
  it('reads the value out of a cookie string holding other entries', () => {
    expect(readConsentCookie('foo=1; vocdoni-cookie-consent=accepted; ph_test=2')).toBe('accepted')
  })

  it('does not match a cookie whose name merely ends with the key', () => {
    expect(readConsentCookie('other-vocdoni-cookie-consent=accepted')).toBeNull()
  })

  it('returns null when no choice has been recorded', () => {
    expect(readConsentCookie('')).toBeNull()
    expect(readConsentCookie('foo=1; bar=2')).toBeNull()
  })
})

describe('buildExpiredCookies', () => {
  it('expires an analytics cookie on both the shared domain and the host', () => {
    const writes = buildExpiredCookies('ph_abc_posthog', 'vocdoni.io', 'https:')

    expect(writes).toHaveLength(2)
    expect(writes.every((write) => write.includes('max-age=0'))).toBe(true)
    expect(writes.some((write) => write.includes('domain=.vocdoni.io'))).toBe(true)
    expect(writes.some((write) => !write.includes('domain='))).toBe(true)
    expect(writes.every((write) => write.includes('secure'))).toBe(true)
  })

  it('has only a host-only write to make on a preview or local host', () => {
    expect(buildExpiredCookies('_ga', 'localhost', 'http:')).toEqual(['_ga=; path=/; max-age=0; samesite=lax'])
  })
})

describe('analyticsCookieNames', () => {
  it('picks out the cookies the analytics consent covers', () => {
    const names = analyticsCookieNames('ph_phc123_posthog=x; _ga=y; _ga_ABC123=z; _gid=w; _gat_UA-1=v')

    expect(names).toEqual(['ph_phc123_posthog', '_ga', '_ga_ABC123', '_gid', '_gat_UA-1'])
  })

  it('leaves the consent record and unrelated cookies alone', () => {
    expect(analyticsCookieNames('vocdoni-cookie-consent=x; i18next=en; session=abc; malformed')).toEqual([])
  })
})

describe('parseConsentValue', () => {
  it('reads the record written since the policy revision', () => {
    const raw = JSON.stringify({ choice: 'accepted', date: '2026-09-01T08:00:00.000Z', policy: '2026-08-28' })

    expect(parseConsentValue(raw)).toEqual({
      choice: 'accepted',
      date: '2026-09-01T08:00:00.000Z',
      policy: '2026-08-28',
    })
  })

  it('keeps the promote-once path working by reading a bare choice as an unversioned record', () => {
    expect(parseConsentValue('accepted')).toEqual({ choice: 'accepted', date: null, policy: null })
    expect(parseConsentValue('rejected')).toEqual({ choice: 'rejected', date: null, policy: null })
  })

  it('carries the renewal date when one was stamped', () => {
    const raw = JSON.stringify({
      choice: 'rejected',
      date: '2026-09-01T08:00:00.000Z',
      policy: '2026-08-28',
      renewedAt: '2026-08-30T07:00:00.000Z',
    })

    expect(parseConsentValue(raw)?.renewedAt).toBe('2026-08-30T07:00:00.000Z')
  })

  it('treats anything it cannot recognise as no choice at all', () => {
    expect(parseConsentValue(null)).toBeNull()
    expect(parseConsentValue('')).toBeNull()
    expect(parseConsentValue('{not json')).toBeNull()
    expect(parseConsentValue('"accepted"')).toBeNull()
    expect(parseConsentValue(JSON.stringify({ choice: 'maybe', policy: '2026-08-28' }))).toBeNull()
  })
})

describe('isConsentCurrent', () => {
  const record = (policy: string | null): ConsentRecord => ({ choice: 'accepted', date: null, policy })

  it('honours a consent recorded under the revision in force', () => {
    expect(isConsentCurrent(record('2026-08-28'), '2026-08-28')).toBe(true)
    expect(isConsentCurrent(record('2026-11-30'), '2026-08-28')).toBe(true)
  })

  it('invalidates a consent recorded before the revision date, as section 10 says', () => {
    expect(isConsentCurrent(record('2026-04-15'), '2026-08-28')).toBe(false)
  })

  it('invalidates an unversioned record, which by definition predates the revision', () => {
    expect(isConsentCurrent(record(null), '2026-08-28')).toBe(false)
    expect(isConsentCurrent(null, '2026-08-28')).toBe(false)
  })

  it('measures against the published revision date by default', () => {
    expect(isConsentCurrent(record(PRIVACY_POLICY_REVISION_DATE))).toBe(true)
    expect(isConsentCurrent(record('2026-04-15'))).toBe(false)
  })
})

/**
 * A cookie jar close enough to `document.cookie` for the writes this module
 * makes: one name/value pair per write, and `max-age=0` deletes.
 */
function stubBrowser({ cookies = {}, legacy = null }: { cookies?: Record<string, string>; legacy?: string | null }) {
  const jar = new Map(Object.entries(cookies))
  const stored = { value: legacy }

  vi.stubGlobal('document', {
    get cookie() {
      return [...jar].map(([name, value]) => `${name}=${value}`).join('; ')
    },
    set cookie(write: string) {
      const [pair, ...attributes] = write.split(';').map((part) => part.trim())
      const separator = pair.indexOf('=')
      const name = pair.slice(0, separator)

      if (attributes.some((attribute) => attribute.toLowerCase() === 'max-age=0')) jar.delete(name)
      else jar.set(name, pair.slice(separator + 1))
    },
  })

  vi.stubGlobal('localStorage', {
    getItem: () => stored.value,
    setItem: (_key: string, value: string) => {
      stored.value = value
    },
  })

  vi.stubGlobal('window', {
    location: { hostname: 'vocdoni.io', protocol: 'https:' },
    dispatchEvent: vi.fn(),
  })

  return {
    jar,
    stored,
    record: () => parseConsentValue(readConsentCookie([...jar].map(([n, v]) => `${n}=${v}`).join('; '))),
  }
}

function storedValue(record: ConsentRecord): string {
  return encodeURIComponent(serializeConsentRecord(record))
}

describe('the stored consent record', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('records the choice, when it was made and the policy in force at that moment', () => {
    const browser = stubBrowser({})

    setCookieConsent(true)

    const record = browser.record()
    expect(record?.choice).toBe('accepted')
    expect(record?.policy).toBe(PRIVACY_POLICY_REVISION_DATE)
    expect(Date.parse(record?.date ?? '')).toBeGreaterThan(0)
  })

  it('mirrors the same record to localStorage', () => {
    const browser = stubBrowser({})

    setCookieConsent(false)

    expect(parseConsentValue(browser.stored.value)?.choice).toBe('rejected')
  })

  it('shows the banner again for a consent given before the revision date', () => {
    stubBrowser({
      cookies: {
        'vocdoni-cookie-consent': storedValue({
          choice: 'accepted',
          date: '2026-04-20T10:00:00.000Z',
          policy: '2026-04-15',
        }),
      },
    })

    expect(getCookieConsent()).toBeNull()
  })

  it('keeps honouring a consent given under the revision in force', () => {
    stubBrowser({
      cookies: {
        'vocdoni-cookie-consent': storedValue({
          choice: 'accepted',
          date: '2026-09-01T10:00:00.000Z',
          policy: PRIVACY_POLICY_REVISION_DATE,
        }),
      },
    })

    expect(getCookieConsent()).toBe('accepted')
  })

  it('records the date the renewal ran, and keeps the first one on later visits', () => {
    const browser = stubBrowser({
      cookies: {
        'vocdoni-cookie-consent': storedValue({
          choice: 'accepted',
          date: '2026-04-20T10:00:00.000Z',
          policy: '2026-04-15',
        }),
      },
    })

    const renewedAt = getConsentRecord()?.renewedAt
    expect(Date.parse(renewedAt ?? '')).toBeGreaterThan(0)
    expect(browser.record()?.renewedAt).toBe(renewedAt)

    expect(getConsentRecord()?.renewedAt).toBe(renewedAt)
  })

  it('carries the renewal date into the answer the reopened banner collects', () => {
    const browser = stubBrowser({
      cookies: {
        'vocdoni-cookie-consent': storedValue({
          choice: 'accepted',
          date: '2026-04-20T10:00:00.000Z',
          policy: '2026-04-15',
        }),
      },
    })

    const renewedAt = getConsentRecord()?.renewedAt
    setCookieConsent(false)

    const record = browser.record()
    expect(record?.choice).toBe('rejected')
    expect(record?.policy).toBe(PRIVACY_POLICY_REVISION_DATE)
    expect(record?.renewedAt).toBe(renewedAt)
  })

  it('promotes a bare choice left in localStorage, and asks again because it predates the revision', () => {
    const browser = stubBrowser({ legacy: 'accepted' })

    expect(getConsentRecord()).toMatchObject({ choice: 'accepted', date: null, policy: null })
    expect(browser.record()?.choice).toBe('accepted')
    expect(getCookieConsent()).toBeNull()
  })

  it('expires the shared analytics cookies when the choice is withdrawn', () => {
    const browser = stubBrowser({
      cookies: {
        'vocdoni-cookie-consent': storedValue({
          choice: 'accepted',
          date: '2026-09-01T10:00:00.000Z',
          policy: PRIVACY_POLICY_REVISION_DATE,
        }),
        ph_phc123_posthog: 'shared-identifier',
        _ga: 'GA1.1.2',
        i18next: 'en',
      },
    })

    setCookieConsent(false)

    expect(browser.jar.has('ph_phc123_posthog')).toBe(false)
    expect(browser.jar.has('_ga')).toBe(false)
    expect(browser.jar.get('i18next')).toBe('en')
    expect(browser.record()?.choice).toBe('rejected')
  })

  it('leaves the analytics cookies in place when the choice is accepted', () => {
    const browser = stubBrowser({ cookies: { ph_phc123_posthog: 'shared-identifier' } })

    setCookieConsent(true)

    expect(browser.jar.get('ph_phc123_posthog')).toBe('shared-identifier')
  })
})
