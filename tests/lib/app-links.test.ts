import { describe, expect, it } from 'vitest'
import { getAppAuthUrl, withAppCtaRef } from '@/lib/app-links'

describe('getAppAuthUrl', () => {
  it('links to sign-up in the page language', () => {
    expect(getAppAuthUrl('signup', 'es')).toBe(`${APP_URL}/es/account/signup`)
    expect(getAppAuthUrl('signup', 'pt-br')).toBe(`${APP_URL}/pt-br/account/signup`)
  })

  it('links to sign-in when asked', () => {
    expect(getAppAuthUrl('signin', 'ca')).toBe(`${APP_URL}/ca/account/signin`)
  })

  it('drops the prefix for a language the app does not serve', () => {
    expect(getAppAuthUrl('signup', 'hi')).toBe(`${APP_URL}/account/signup`)
    expect(getAppAuthUrl('signup', undefined)).toBe(`${APP_URL}/account/signup`)
  })

  it('carries the vertical', () => {
    expect(getAppAuthUrl('signup', 'en', { type: 'associations' })).toBe(
      `${APP_URL}/en/account/signup?type=associations`
    )
  })
})

describe('withAppCtaRef', () => {
  const appUrl = 'https://app.vocdoni.io'

  it('tags app links with the CTA', () => {
    expect(withAppCtaRef(`${appUrl}/en/account/signup`, 'home_hero_start', appUrl)).toBe(
      `${appUrl}/en/account/signup?ref=home_hero_start`
    )
    expect(withAppCtaRef(`${appUrl}/en/account/signup?type=associations`, 'associations_hero', appUrl)).toBe(
      `${appUrl}/en/account/signup?type=associations&ref=associations_hero`
    )
  })

  it('leaves links without a CTA, or outside the app, untouched', () => {
    expect(withAppCtaRef(`${appUrl}/plans`, undefined, appUrl)).toBe(`${appUrl}/plans`)
    expect(withAppCtaRef('https://app.vocdoni.io.evil.com/x', 'cta', appUrl)).toBe('https://app.vocdoni.io.evil.com/x')
    expect(withAppCtaRef('https://davinci.vote', 'cta', appUrl)).toBe('https://davinci.vote')
  })

  it('keeps a ref that is already there', () => {
    expect(withAppCtaRef(`${appUrl}/plans?ref=pricing`, 'cta', appUrl)).toBe(`${appUrl}/plans?ref=pricing`)
  })
})
