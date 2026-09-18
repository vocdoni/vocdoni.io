import {
  buildConsentCookie,
  consentCookieDomain,
  getCookieConsent,
  readConsentCookie,
  setCookieConsent,
} from '@/lib/cookieConsent'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * A stateful `document.cookie` stand-in. The browser getter returns only
 * `name=value` pairs while the setter accepts a full attribute string, and the
 * migration logic depends on that asymmetry, so the fake reproduces it rather
 * than echoing what it was given.
 */
function stubCookieJar(initial: Record<string, string> = {}) {
  const jar = new Map<string, string>(Object.entries(initial))
  const writes: string[] = []
  const document = {
    get cookie() {
      return [...jar.entries()].map(([name, value]) => `${name}=${value}`).join('; ')
    },
    set cookie(raw: string) {
      writes.push(raw)
      const [pair] = raw.split(';')
      const separator = pair.indexOf('=')
      jar.set(pair.slice(0, separator).trim(), pair.slice(separator + 1).trim())
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
  vi.stubGlobal('document', document)
  return { jar, writes }
}

function stubLocalStorage(initial: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initial))
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
  })
  return store
}

function stubWindow(hostname = 'vocdoni.io', protocol = 'https:') {
  vi.stubGlobal('window', {
    location: { hostname, protocol },
    dispatchEvent: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
}

beforeEach(() => {
  stubWindow()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('consent cookie scope', () => {
  it('shares the cookie across vocdoni.io subdomains', () => {
    expect(consentCookieDomain('vocdoni.io')).toBe('.vocdoni.io')
    expect(consentCookieDomain('app.vocdoni.io')).toBe('.vocdoni.io')
    expect(consentCookieDomain('www.vocdoni.io')).toBe('.vocdoni.io')
  })

  it('keeps previews, staging and localhost host-only', () => {
    // Must agree with posthog-js, which force-disables cross-subdomain cookies
    // on netlify.app: neither may join production identities.
    expect(consentCookieDomain('localhost')).toBeNull()
    expect(consentCookieDomain('deploy-preview-12--vocdoni.netlify.app')).toBeNull()
    // A lookalike registrable domain must not match the suffix check.
    expect(consentCookieDomain('notvocdoni.io')).toBeNull()
    expect(consentCookieDomain('vocdoni.io.evil.test')).toBeNull()
  })

  it('builds the same cookie attributes the app writes', () => {
    const cookie = buildConsentCookie('accepted', 'vocdoni.io', 'https:')
    expect(cookie).toContain('vocdoni-cookie-consent=accepted')
    expect(cookie).toContain('Path=/')
    expect(cookie).toContain('Max-Age=31536000')
    expect(cookie).toContain('SameSite=Lax')
    expect(cookie).toContain('Domain=.vocdoni.io')
    expect(cookie).toContain('Secure')
  })

  it('omits Secure over plain http so local development still works', () => {
    expect(buildConsentCookie('accepted', 'localhost', 'http:')).not.toContain('Secure')
  })
})

describe('reading the shared cookie', () => {
  it('accepts only the two values the two sites write', () => {
    expect(readConsentCookie('vocdoni-cookie-consent=accepted')).toBe('accepted')
    expect(readConsentCookie('vocdoni-cookie-consent=rejected')).toBe('rejected')
    expect(readConsentCookie('vocdoni-cookie-consent=maybe')).toBeNull()
    expect(readConsentCookie(undefined)).toBeNull()
  })

  it('skips a junk host-only duplicate and returns the real decision', () => {
    // A `Domain=` write can never replace a host-only cookie, so both are sent
    // and the order is not ours to control.
    expect(readConsentCookie('vocdoni-cookie-consent=junk; vocdoni-cookie-consent=accepted')).toBe('accepted')
  })
})

describe('migration from the localStorage era', () => {
  it('promotes a pre-existing localStorage choice once, without re-asking', () => {
    stubCookieJar()
    const store = stubLocalStorage({ 'vocdoni-cookie-consent': 'accepted' })

    expect(getCookieConsent()).toBe('accepted')
    // Promoted to the shared domain so the app sees it too.
    expect(document.cookie).toContain('vocdoni-cookie-consent=accepted')
    expect(store.get('vocdoni-cookie-consent-migrated')).toBe('1')
  })

  it('treats a cleared cookie next to a migrated mirror as a withdrawal', () => {
    stubCookieJar()
    stubLocalStorage({
      'vocdoni-cookie-consent': 'accepted',
      'vocdoni-cookie-consent-migrated': '1',
    })

    // Clearing cookies is a legitimate withdrawal; the stale mirror must not
    // silently re-mint a domain-wide cookie.
    expect(getCookieConsent()).toBeNull()
  })

  it('refreshes a stale mirror when the app changed the choice', () => {
    stubCookieJar({ 'vocdoni-cookie-consent': 'rejected' })
    const store = stubLocalStorage({ 'vocdoni-cookie-consent': 'accepted' })

    expect(getCookieConsent()).toBe('rejected')
    // Otherwise a rollback of this site would reinstate a revoked decision.
    expect(store.get('vocdoni-cookie-consent')).toBe('rejected')
  })

  it('ignores an unrecognised localStorage value instead of propagating it', () => {
    stubCookieJar()
    stubLocalStorage({ 'vocdoni-cookie-consent': 'sure-why-not' })

    expect(getCookieConsent()).toBeNull()
    expect(document.cookie).not.toContain('sure-why-not')
  })
})

describe('writing a decision', () => {
  it('writes the shared cookie and mirrors it', () => {
    const { writes } = stubCookieJar()
    const store = stubLocalStorage()

    setCookieConsent(true)

    expect(writes[0]).toContain('Domain=.vocdoni.io')
    expect(store.get('vocdoni-cookie-consent')).toBe('accepted')
    expect(getCookieConsent()).toBe('accepted')
  })

  it('records a rejection as a decision, not as an absent choice', () => {
    stubCookieJar()
    stubLocalStorage()

    setCookieConsent(false)

    expect(getCookieConsent()).toBe('rejected')
  })

  it('survives storage access throwing, as in Safari private mode', () => {
    stubCookieJar()
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('storage blocked')
      },
      setItem: () => {
        throw new Error('storage blocked')
      },
    })

    expect(() => setCookieConsent(true)).not.toThrow()
    // The cookie is the source of truth; losing the mirror is harmless.
    expect(getCookieConsent()).toBe('accepted')
  })
})
