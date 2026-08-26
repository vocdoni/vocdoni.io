import { capturePostHogPageview } from '@/lib/posthog'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('PostHog website pageviews', () => {
  beforeEach(() => {
    ;(globalThis as any).POSTHOG_PUBLIC_KEY = 'test-public-key'
    ;(globalThis as any).POSTHOG_HOST = 'https://eu.i.posthog.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    delete (globalThis as any).POSTHOG_PUBLIC_KEY
    delete (globalThis as any).POSTHOG_HOST
  })

  it('captures a production pageview without query parameters or person profiles', async () => {
    const sendBeacon = vi.fn((_url: string, _data?: BodyInit | null) => true)
    vi.stubGlobal('localStorage', { getItem: vi.fn(() => 'accepted') })
    vi.stubGlobal('navigator', { sendBeacon })
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'pageview-test-session') })
    vi.stubGlobal('document', { title: 'Secure online voting' })
    vi.stubGlobal('window', {
      location: {
        origin: 'https://vocdoni.io',
        host: 'vocdoni.io',
        hostname: 'vocdoni.io',
        pathname: '/en/learn',
        search: '?email=private@example.com',
      },
    })

    expect(capturePostHogPageview()).toBe(true)

    const [, blob] = sendBeacon.mock.calls[0]
    const payload = JSON.parse(await (blob as Blob).text())
    expect(payload.event).toBe('$pageview')
    expect(payload.properties.$current_url).toBe('https://vocdoni.io/en/learn')
    expect(payload.properties.$process_person_profile).toBe(false)
    expect(JSON.stringify(payload)).not.toContain('private')
  })

  it('does not capture before analytics consent', () => {
    const sendBeacon = vi.fn((_url: string, _data?: BodyInit | null) => true)
    vi.stubGlobal('localStorage', { getItem: vi.fn(() => null) })
    vi.stubGlobal('navigator', { sendBeacon })
    vi.stubGlobal('document', { title: 'Secure online voting' })
    vi.stubGlobal('window', {
      location: {
        origin: 'https://vocdoni.io',
        host: 'vocdoni.io',
        hostname: 'vocdoni.io',
        pathname: '/en',
      },
    })

    expect(capturePostHogPageview()).toBe(false)
    expect(sendBeacon).not.toHaveBeenCalled()
  })
})
