import { trackAppCtaClick } from '@/lib/analytics'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('trackAppCtaClick', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends a named GA4 event with stable, non-private properties', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', {
      location: {
        href: 'https://vocdoni.io/en/app?campaign=private',
        pathname: '/en/app',
      },
      gtag,
    })

    trackAppCtaClick({
      ctaId: 'app_hero_start',
      destinationUrl: 'https://app.vocdoni.io/account/signin?returnTo=private',
    })

    expect(gtag).toHaveBeenCalledWith('event', 'app_cta_click', {
      cta_id: 'app_hero_start',
      source_path: '/en/app',
      destination_host: 'app.vocdoni.io',
      destination_path: '/account/signin',
    })
  })

  it('queues the event for GTM when gtag is not ready', () => {
    const dataLayer: Array<Record<string, unknown>> = []
    vi.stubGlobal('window', {
      location: {
        href: 'https://vocdoni.io/en',
        pathname: '/en',
      },
      dataLayer,
    })

    trackAppCtaClick({ ctaId: 'home_hero_start', destinationUrl: 'https://app.vocdoni.io' })

    expect(dataLayer).toEqual([
      {
        event: 'app_cta_click',
        cta_id: 'home_hero_start',
        source_path: '/en',
        destination_host: 'app.vocdoni.io',
        destination_path: '/',
      },
    ])
  })

  it('ignores non-http destinations that would leak user-entered content', () => {
    const gtag = vi.fn()
    const dataLayer: Array<Record<string, unknown>> = []
    vi.stubGlobal('window', {
      location: { href: 'https://vocdoni.io/en', pathname: '/en' },
      gtag,
      dataLayer,
    })

    trackAppCtaClick({ ctaId: 'contact_email', destinationUrl: 'mailto:someone@example.com' })

    expect(gtag).not.toHaveBeenCalled()
    expect(dataLayer).toEqual([])
  })

  it('ignores malformed destinations instead of throwing', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', {
      location: { href: 'https://vocdoni.io/en', pathname: '/en' },
      gtag,
    })

    expect(() => trackAppCtaClick({ ctaId: 'broken', destinationUrl: 'http://' })).not.toThrow()
    expect(gtag).not.toHaveBeenCalled()
  })
})
