import { describe, expect, it } from 'vitest'

import { buildConsentCookie, consentCookieDomain, readConsentCookie } from '@/lib/cookieConsent'

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
