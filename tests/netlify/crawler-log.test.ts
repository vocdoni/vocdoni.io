import { afterEach, describe, expect, it, vi } from 'vitest'

import { CRAWLER_AGENT_CATEGORY_PATTERN } from '@/lib/http-log'
import crawlerLog, { config } from '@/netlify/edge-functions/crawler-log.ts'

// The edge function runs on Deno, but everything it touches (Request/Headers/fetch/URL/crypto) is a web
// standard Node also implements, so the shell is exercised here with a stubbed fetch and `Netlify.env`.

const stubEnv = (env: Record<string, string>) => {
  vi.stubGlobal('Netlify', { env: { get: (name: string) => env[name] } })
}

const stubFetch = (impl: () => Promise<Response> = async () => new Response(null, { status: 200 })) => {
  const spy = vi.fn(async (_input: URL | RequestInfo, _init?: RequestInit) => impl())
  vi.stubGlobal('fetch', spy)
  return spy
}

const request = (url = 'https://vocdoni.io/en/blog/hello', init: RequestInit = {}) =>
  new Request(url, {
    headers: {
      'user-agent': 'GPTBot/1.2',
      'netlify-agent-category': 'crawler;ai',
      'x-nf-request-id': '01HREQ',
    },
    ...init,
  })

const context = () => ({ ip: '203.0.113.7', waitUntil: vi.fn() })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('crawler-log edge function', () => {
  it('does nothing without a PostHog key', async () => {
    stubEnv({})
    const fetchSpy = stubFetch()
    const ctx = context()

    expect(await crawlerLog(request(), ctx)).toBeUndefined()
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(ctx.waitUntil).not.toHaveBeenCalled()
  })

  it('does nothing when the Netlify global is missing', async () => {
    const fetchSpy = stubFetch()

    expect(await crawlerLog(request(), context())).toBeUndefined()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('skips non-GET requests', async () => {
    stubEnv({ POSTHOG_KEY: 'phc_test' })
    const fetchSpy = stubFetch()

    expect(await crawlerLog(request('https://vocdoni.io/en', { method: 'POST' }), context())).toBeUndefined()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('skips assets', async () => {
    stubEnv({ POSTHOG_KEY: 'phc_test' })
    const fetchSpy = stubFetch()

    expect(await crawlerLog(request('https://vocdoni.io/assets/x.js'), context())).toBeUndefined()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('reports a crawler GET to PostHog and hands the send to waitUntil', async () => {
    stubEnv({ POSTHOG_KEY: 'phc_test' })
    const fetchSpy = stubFetch()
    const ctx = context()

    expect(await crawlerLog(request(), ctx)).toBeUndefined()

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [endpoint, init] = fetchSpy.mock.calls[0]
    expect(String(endpoint)).toBe('https://eu.i.posthog.com/i/v0/e/')
    expect(init?.method).toBe('POST')
    const body = JSON.parse(String(init?.body))
    expect(body.api_key).toBe('phc_test')
    expect(body.event).toBe('$http_log')
    expect(body.distinct_id).toMatch(/^http_log_/)
    expect(body.properties.$raw_user_agent).toBe('GPTBot/1.2')
    expect(body.properties.$process_person_profile).toBe(false)
    expect(body.properties.site).toBe('web')
    expect(body.properties.netlify_agent_category).toBe('crawler;ai')
    expect(body.properties.$ip).toBe('203.0.113.7')
    expect(ctx.waitUntil).toHaveBeenCalledTimes(1)
  })

  it('honours a custom POSTHOG_HOST', async () => {
    stubEnv({ POSTHOG_KEY: 'phc_test', POSTHOG_HOST: 'https://ph.example.com/' })
    const fetchSpy = stubFetch()

    await crawlerLog(request(), context())

    expect(String(fetchSpy.mock.calls[0][0])).toBe('https://ph.example.com/i/v0/e/')
  })

  it('awaits the send itself when there is no waitUntil', async () => {
    stubEnv({ POSTHOG_KEY: 'phc_test' })
    let finished = false
    const fetchSpy = stubFetch(async () => {
      await Promise.resolve()
      finished = true
      return new Response(null, { status: 200 })
    })

    expect(await crawlerLog(request(), { ip: '203.0.113.7' })).toBeUndefined()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(finished).toBe(true)
  })

  it('still returns undefined when the fetch rejects', async () => {
    stubEnv({ POSTHOG_KEY: 'phc_test' })
    stubFetch(async () => {
      throw new Error('network down')
    })
    const ctx = context()

    expect(await crawlerLog(request(), ctx)).toBeUndefined()
    expect(ctx.waitUntil).toHaveBeenCalledTimes(1)
    // The promise handed to waitUntil must never reject.
    await expect(ctx.waitUntil.mock.calls[0][0]).resolves.toBeUndefined()
  })

  it('keeps the declaration a literal that matches the exported pattern', () => {
    expect(config.path).toBe('/*')
    expect(config.method).toEqual(['GET'])
    expect(config.excludedPath).toEqual(['/assets/*', '/images/*', '/fonts/*', '/blog/images/*'])
    expect(config.header['netlify-agent-category']).toBe(CRAWLER_AGENT_CATEGORY_PATTERN)
  })
})
