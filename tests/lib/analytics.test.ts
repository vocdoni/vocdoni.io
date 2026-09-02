import { trackAppCtaClick } from '@/lib/analytics'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('trackAppCtaClick', () => {
  beforeEach(() => {
    ;(globalThis as any).POSTHOG_PUBLIC_KEY = 'test-public-key'
    ;(globalThis as any).POSTHOG_HOST = 'https://eu.i.posthog.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    delete (globalThis as any).POSTHOG_PUBLIC_KEY
    delete (globalThis as any).POSTHOG_HOST
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

  it('sends the same privacy-safe event to PostHog on the production website', async () => {
    const gtag = vi.fn()
    const sendBeacon = vi.fn((_url: string, _data?: BodyInit | null) => true)
    vi.stubGlobal('localStorage', { getItem: vi.fn(() => 'accepted') })
    vi.stubGlobal('navigator', { sendBeacon })
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'marked-test-session') })
    vi.stubGlobal('window', {
      location: {
        href: 'https://vocdoni.io/en?email=private@example.com',
        hostname: 'vocdoni.io',
        pathname: '/en',
      },
      gtag,
    })

    trackAppCtaClick({
      ctaId: 'tin_measurement_test',
      destinationUrl: 'https://app.vocdoni.io/account/signin?code=private',
    })

    expect(sendBeacon).toHaveBeenCalledOnce()
    const [endpoint, blob] = sendBeacon.mock.calls[0]
    expect(endpoint).toBe('https://eu.i.posthog.com/i/v0/e/')
    const payload = JSON.parse(await (blob as Blob).text())
    expect(payload.event).toBe('app_cta_click')
    expect(payload.properties).toEqual({
      distinct_id: 'marked-test-session',
      $process_person_profile: false,
      measurement_source: 'vocdoni.io',
      cta_id: 'tin_measurement_test',
      source_path: '/en',
      destination_host: 'app.vocdoni.io',
      destination_path: '/account/signin',
    })
    expect(JSON.stringify(payload)).not.toContain('private')
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

  it('sends the event to the GA4 destination loaded by GTM', () => {
    const dataLayer: Array<Record<string, unknown> | IArguments> = []
    vi.stubGlobal('window', {
      location: {
        href: 'https://vocdoni.io/en',
        pathname: '/en',
      },
      dataLayer,
      google_tag_manager: {
        'G-TQMYBZ8DLJ': {},
        'GTM-T4KG28TW': {},
      },
    })

    trackAppCtaClick({ ctaId: 'home_hero_start', destinationUrl: 'https://app.vocdoni.io' })

    expect(Array.from(dataLayer[0] as IArguments)).toEqual(['config', 'G-TQMYBZ8DLJ', { send_page_view: false }])
    expect(Array.from(dataLayer[1] as IArguments)).toEqual([
      'event',
      'app_cta_click',
      {
        cta_id: 'home_hero_start',
        source_path: '/en',
        destination_host: 'app.vocdoni.io',
        destination_path: '/',
        send_to: 'G-TQMYBZ8DLJ',
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

  it('carries the vertical signup type, which is what joins this click to the app signup', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', {
      location: {
        href: 'https://vocdoni.io/en/solutions/professional-associations',
        pathname: '/en/solutions/professional-associations',
      },
      gtag,
    })

    trackAppCtaClick({
      ctaId: 'pro_associations_hero',
      destinationUrl: 'https://app-dev.vocdoni.io/account/signin?type=professional-associations',
    })

    expect(gtag).toHaveBeenCalledWith('event', 'app_cta_click', {
      cta_id: 'pro_associations_hero',
      source_path: '/en/solutions/professional-associations',
      destination_host: 'app-dev.vocdoni.io',
      destination_path: '/account/signin',
      signup_type: 'professional-associations',
    })
  })

  it('drops a signup type that is not one of ours, so a destination cannot smuggle content into the event', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', {
      location: { href: 'https://vocdoni.io/en', pathname: '/en' },
      gtag,
    })

    trackAppCtaClick({
      ctaId: 'app_hero_start',
      destinationUrl: 'https://app.vocdoni.io/account/signin?type=someone%40example.com',
    })

    expect(gtag).toHaveBeenCalledWith(
      'event',
      'app_cta_click',
      expect.not.objectContaining({ signup_type: expect.anything() })
    )
  })
})
