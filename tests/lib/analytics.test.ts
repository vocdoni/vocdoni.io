import { describe, expect, it } from 'vitest'

import {
  classifyPath,
  pageViewEvent,
  posthogBeforeSend,
  resolveCtaTarget,
  sanitizeAnalyticsUrl,
  toPosthogConsent,
} from '@/lib/analytics'

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

describe('classifyPath', () => {
  it('reads the vertical off a solution page, which is what ranks the landing pages', () => {
    expect(classifyPath('/solutions/associations')).toEqual({ pageType: 'solution', vertical: 'associations' })
    expect(classifyPath('/solutions')).toEqual({ pageType: 'solutions_index' })
  })

  it('separates a blog post from a category listing', () => {
    expect(classifyPath('/blog/my-post')).toEqual({ pageType: 'blog_post', slug: 'my-post' })
    expect(classifyPath('/blog/category/governance')).toEqual({ pageType: 'blog_category', slug: 'governance' })
    expect(classifyPath('/blog')).toEqual({ pageType: 'blog_index' })
  })

  it('distinguishes docs pages from the rest of the developers section', () => {
    expect(classifyPath('/developers/docs/getting-started')).toEqual({
      pageType: 'docs_page',
      slug: 'getting-started',
    })
    expect(classifyPath('/developers/docs')).toEqual({ pageType: 'docs_index' })
    expect(classifyPath('/developers')).toEqual({ pageType: 'developers' })
  })

  it('classifies the remaining known routes', () => {
    expect(classifyPath('/')).toEqual({ pageType: 'home' })
    expect(classifyPath('/case-studies/coib')).toEqual({ pageType: 'case_study', slug: 'coib' })
    expect(classifyPath('/learn/anonymous-voting-explained')).toEqual({
      pageType: 'learn_article',
      slug: 'anonymous-voting-explained',
    })
    expect(classifyPath('/contact')).toEqual({ pageType: 'contact' })
    expect(classifyPath('/privacy')).toEqual({ pageType: 'legal' })
    expect(classifyPath('/something-new')).toEqual({ pageType: 'other' })
  })

  it('ignores trailing slashes, query strings and fragments', () => {
    expect(classifyPath('/solutions/ngos/')).toEqual({ pageType: 'solution', vertical: 'ngos' })
    expect(classifyPath('/blog/a-post?utm_source=x#section')).toEqual({ pageType: 'blog_post', slug: 'a-post' })
  })
})

describe('pageViewEvent', () => {
  it('emits a funnel-starting event for the page kinds that begin a journey', () => {
    expect(pageViewEvent(classifyPath('/solutions/cooperatives'))).toEqual({
      name: 'solution_page_viewed',
      props: { vertical: 'cooperatives' },
    })
    expect(pageViewEvent(classifyPath('/learn/verifiable-voting-explained'))).toEqual({
      name: 'learn_article_viewed',
      props: { slug: 'verifiable-voting-explained' },
    })
  })

  it('stays silent on ordinary pages, which $pageview already covers', () => {
    expect(pageViewEvent(classifyPath('/'))).toBeNull()
    expect(pageViewEvent(classifyPath('/solutions'))).toBeNull()
    expect(pageViewEvent(classifyPath('/contact'))).toBeNull()
  })
})
