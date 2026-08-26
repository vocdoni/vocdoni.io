import { describe, expect, it } from 'vitest'

import { posthogBeforeSend, resolveCtaTarget, sanitizeAnalyticsUrl, toPosthogConsent } from '@/lib/analytics'

const urls = { appUrl: 'https://app.vocdoni.io', platformUrl: 'https://platform.vocdoni.io' }

describe('resolveCtaTarget', () => {
  it('separates the two products, which is what the cross-site funnels select on', () => {
    expect(resolveCtaTarget('https://app.vocdoni.io', urls)).toBe('app')
    expect(resolveCtaTarget('https://app.vocdoni.io/plans', urls)).toBe('app')
  })

  it('recognises the integrator dashboard', () => {
    expect(resolveCtaTarget('https://platform.vocdoni.io', urls)).toBe('platform')
  })

  it('classifies internal destinations, singling out the contact page', () => {
    expect(resolveCtaTarget('/contact', urls)).toBe('contact')
    expect(resolveCtaTarget('/solutions/associations', urls)).toBe('internal')
  })

  it('treats other absolute urls and non-http schemes as external', () => {
    expect(resolveCtaTarget('https://davinci.vote', urls)).toBe('external')
    expect(resolveCtaTarget('mailto:info@vocdoni.org', urls)).toBe('external')
  })

  it('follows the configured product urls rather than hardcoded hosts', () => {
    const staging = { appUrl: 'https://app.stg.vocdoni.io', platformUrl: 'https://platform.stg.vocdoni.io' }
    expect(resolveCtaTarget('https://app.stg.vocdoni.io/plans', staging)).toBe('app')
  })
})

describe('sanitizeAnalyticsUrl', () => {
  it('strips params that may carry personal data', () => {
    expect(sanitizeAnalyticsUrl('https://vocdoni.io/?email=a@b.com&utm_source=x')).toBe(
      'https://vocdoni.io/?utm_source=x'
    )
    expect(sanitizeAnalyticsUrl('https://vocdoni.io/?token=abc&code=def')).toBe('https://vocdoni.io/')
  })

  it('leaves campaign parameters intact, since attribution depends on them', () => {
    const url = 'https://vocdoni.io/solutions?utm_source=newsletter&utm_campaign=agm'
    expect(sanitizeAnalyticsUrl(url)).toBe(url)
  })

  it('returns unparseable input unchanged instead of throwing', () => {
    expect(sanitizeAnalyticsUrl('not-a-url')).toBe('not-a-url')
  })
})

describe('posthogBeforeSend', () => {
  it('scrubs both the current url and the referrer', () => {
    const event = {
      event: '$pageview',
      properties: {
        $current_url: 'https://vocdoni.io/?email=a@b.com',
        $referrer: 'https://vocdoni.io/contact?token=xyz',
      },
    } as never

    const result = posthogBeforeSend(event)

    expect(result?.properties.$current_url).toBe('https://vocdoni.io/')
    expect(result?.properties.$referrer).toBe('https://vocdoni.io/contact')
  })

  it('passes a null event through', () => {
    expect(posthogBeforeSend(null)).toBeNull()
  })
})

describe('toPosthogConsent', () => {
  it('accepts only the two explicit choices', () => {
    expect(toPosthogConsent('accepted')).toBe('accepted')
    expect(toPosthogConsent('rejected')).toBe('rejected')
  })

  it('treats anything else as no decision yet, rather than trusting it', () => {
    // The value comes from a user-editable cookie, so it may hold anything.
    expect(toPosthogConsent('yes')).toBeNull()
    expect(toPosthogConsent(null)).toBeNull()
    expect(toPosthogConsent(undefined)).toBeNull()
  })
})
