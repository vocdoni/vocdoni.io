import {
  AnalyticsEvents,
  classifyPath,
  pageViewEvent,
  posthogBeforeSend,
  resolveCtaTarget,
  sanitizeAnalyticsUrl,
  trackAppCtaClick,
} from '@/lib/analytics'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
})

/**
 * These names and properties are the contract with the "Vocdoni - Web -> app"
 * dashboard in vocdoni-app (`scripts/posthog-insights.mjs`), which is already
 * deployed. Renaming one here silently empties a funnel there, so they are
 * asserted as literals rather than through the enum.
 */
describe('cross-site event contract', () => {
  it('keeps the event names the deployed dashboard queries', () => {
    expect(AnalyticsEvents.CtaClicked).toBe('cta_clicked')
    expect(AnalyticsEvents.SolutionPageViewed).toBe('solution_page_viewed')
    expect(AnalyticsEvents.BlogPostViewed).toBe('blog_post_viewed')
    expect(AnalyticsEvents.LearnArticleViewed).toBe('learn_article_viewed')
    expect(AnalyticsEvents.DocsPageViewed).toBe('docs_page_viewed')
    expect(AnalyticsEvents.DemoRequested).toBe('demo_requested')
    expect(AnalyticsEvents.DemoBooked).toBe('demo_booked')
  })

  it('carries the breakdown properties each funnel groups by', () => {
    // 'which vertical converts' breaks down on `vertical`.
    expect(pageViewEvent(classifyPath('/solutions/associations'))).toEqual({
      name: 'solution_page_viewed',
      props: { vertical: 'associations' },
    })
    // The blog and learn funnels break down on `slug`.
    expect(pageViewEvent(classifyPath('/blog/why-online-voting'))).toEqual({
      name: 'blog_post_viewed',
      props: { slug: 'why-online-voting' },
    })
    expect(pageViewEvent(classifyPath('/learn/quorum'))).toEqual({
      name: 'learn_article_viewed',
      props: { slug: 'quorum' },
    })
    // 'docs to integrator signup' breaks down on `slug`.
    expect(pageViewEvent(classifyPath('/developers/docs/quickstart'))).toEqual({
      name: 'docs_page_viewed',
      props: { slug: 'quickstart' },
    })
  })
})

describe('classifyPath', () => {
  it('classifies from the route, so new pages need no registration', () => {
    expect(classifyPath('/')).toEqual({ pageType: 'home' })
    expect(classifyPath('/solutions')).toEqual({ pageType: 'solutions_index' })
    expect(classifyPath('/use-cases')).toEqual({ pageType: 'use_cases' })
    expect(classifyPath('/contact')).toEqual({ pageType: 'contact' })
    expect(classifyPath('/privacy')).toEqual({ pageType: 'legal' })
    expect(classifyPath('/developers')).toEqual({ pageType: 'developers' })
    expect(classifyPath('/something-new')).toEqual({ pageType: 'other' })
  })

  it('does not mistake a blog category for a post', () => {
    expect(classifyPath('/blog/category/governance')).toEqual({ pageType: 'blog_category', slug: 'governance' })
    expect(classifyPath('/blog')).toEqual({ pageType: 'blog_index' })
  })

  it('ignores query strings and fragments', () => {
    expect(classifyPath('/solutions/unions?utm_source=x#top')).toEqual({ pageType: 'solution', vertical: 'unions' })
  })

  it('reports no content event for pages that do not open a funnel', () => {
    expect(pageViewEvent(classifyPath('/'))).toBeNull()
    expect(pageViewEvent(classifyPath('/privacy'))).toBeNull()
  })
})

describe('resolveCtaTarget', () => {
  const urls = { appUrl: 'https://app.vocdoni.io', platformUrl: 'https://platform.vocdoni.io' }

  it('separates the two products the funnels select on', () => {
    // 'website visit to first election' selects target=app; 'docs to
    // integrator signup' selects target=platform.
    expect(resolveCtaTarget('https://app.vocdoni.io/plans', urls)).toBe('app')
    expect(resolveCtaTarget('https://platform.vocdoni.io', urls)).toBe('platform')
  })

  it('classifies the remaining destinations', () => {
    expect(resolveCtaTarget('/contact', urls)).toBe('contact')
    expect(resolveCtaTarget('https://github.com/vocdoni', urls)).toBe('external')
    expect(resolveCtaTarget('mailto:info@vocdoni.io', urls)).toBe('external')
    expect(resolveCtaTarget('/learn', urls)).toBe('internal')
    expect(resolveCtaTarget('', urls)).toBe('internal')
  })
})

describe('URL scrubbing', () => {
  it('strips the params that may carry PII', () => {
    expect(sanitizeAnalyticsUrl('https://vocdoni.io/en?email=a@b.com&utm_source=x')).toBe(
      'https://vocdoni.io/en?utm_source=x'
    )
    expect(sanitizeAnalyticsUrl('https://vocdoni.io/en?token=secret')).toBe('https://vocdoni.io/en')
    expect(sanitizeAnalyticsUrl('https://vocdoni.io/en?code=123')).toBe('https://vocdoni.io/en')
  })

  it('leaves clean urls and unparseable values untouched', () => {
    expect(sanitizeAnalyticsUrl('https://vocdoni.io/en')).toBe('https://vocdoni.io/en')
    expect(sanitizeAnalyticsUrl('not a url')).toBe('not a url')
  })

  it('scrubs both url properties on the way out', () => {
    const event = posthogBeforeSend({
      properties: {
        $current_url: 'https://vocdoni.io/en?email=private@example.com',
        $referrer: 'https://vocdoni.io/?token=secret',
      },
    } as never)

    expect(JSON.stringify(event)).not.toContain('private@example.com')
    expect(JSON.stringify(event)).not.toContain('secret')
  })

  it('passes a dropped event through as dropped', () => {
    expect(posthogBeforeSend(null)).toBeNull()
  })
})

describe('trackAppCtaClick (GA4)', () => {
  it('sends the CTA to gtag when the container is loaded', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', {
      location: { href: 'https://vocdoni.io/en', pathname: '/en' },
      gtag,
    })

    trackAppCtaClick({ ctaId: 'home_hero_start', destinationUrl: 'https://app.vocdoni.io/account/signin' })

    expect(gtag).toHaveBeenCalledWith('event', 'app_cta_click', {
      cta_id: 'home_hero_start',
      source_path: '/en',
      destination_host: 'app.vocdoni.io',
      destination_path: '/account/signin',
    })
  })

  it('falls back to the dataLayer when gtag is not available', () => {
    const dataLayer: unknown[] = []
    vi.stubGlobal('window', {
      location: { href: 'https://vocdoni.io/en', pathname: '/en' },
      dataLayer,
    })

    trackAppCtaClick({ ctaId: 'navbar_desktop_start', destinationUrl: 'https://app.vocdoni.io' })

    expect(dataLayer[0]).toMatchObject({ event: 'app_cta_click', cta_id: 'navbar_desktop_start' })
  })

  it('drops destinations that would leak user-entered content', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', { location: { href: 'https://vocdoni.io/en', pathname: '/en' }, gtag })

    // mailto:/tel: carry the address in the pathname.
    trackAppCtaClick({ ctaId: 'contact_email', destinationUrl: 'mailto:someone@example.com' })

    expect(gtag).not.toHaveBeenCalled()
  })
})
