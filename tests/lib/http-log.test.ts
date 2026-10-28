import { describe, expect, it } from 'vitest'

import {
  buildHttpLogEvent,
  captureEndpoint,
  httpLogDistinctId,
  isDocumentPath,
  type HttpLogRequest,
} from '@/lib/http-log'

const request = (overrides: Partial<HttpLogRequest> = {}): HttpLogRequest => ({
  url: 'https://vocdoni.io/en/blog/hello?utm_source=x',
  userAgent: 'GPTBot/1.2',
  ip: '203.0.113.7',
  referrer: null,
  agentCategory: 'crawler;ai',
  requestId: '01HREQ',
  method: 'GET',
  ...overrides,
})

describe('captureEndpoint', () => {
  it('appends the capture path and tolerates a trailing slash', () => {
    expect(captureEndpoint('https://eu.i.posthog.com')).toBe('https://eu.i.posthog.com/i/v0/e/')
    expect(captureEndpoint('https://eu.i.posthog.com/')).toBe('https://eu.i.posthog.com/i/v0/e/')
    expect(captureEndpoint('https://ph.example.com//')).toBe('https://ph.example.com/i/v0/e/')
  })
})

describe('isDocumentPath', () => {
  it.each([
    '/',
    '/en',
    '/en/blog/hello',
    '/en/blog/hello/',
    '/llms.txt',
    '/en/blog/hello.md',
    '/a/b.html',
    '/sitemap.xml',
    '/x.json',
    '/LLMS.TXT',
  ])('treats %s as a document', (path) => {
    expect(isDocumentPath(path)).toBe(true)
  })

  it.each([
    '/assets/app.js',
    '/styles.css',
    '/logo.svg',
    '/a/b.png',
    '/font.woff2',
    '/robots.ico',
    '/x.webp',
    '/v1.2/app.js',
    '/en/blog/hello/index.pageContext.json',
    '/en/index.pageContext.json',
  ])('treats %s as an asset', (path) => {
    expect(isDocumentPath(path)).toBe(false)
  })
})

describe('httpLogDistinctId', () => {
  it('is http_log_ plus 32 hex chars, stable per input and different across inputs', async () => {
    const id = await httpLogDistinctId('203.0.113.7', 'vocdoni.io', 'GPTBot/1.2')
    expect(id).toMatch(/^http_log_[0-9a-f]{32}$/)
    expect(await httpLogDistinctId('203.0.113.7', 'vocdoni.io', 'GPTBot/1.2')).toBe(id)
    expect(await httpLogDistinctId('203.0.113.8', 'vocdoni.io', 'GPTBot/1.2')).not.toBe(id)
    expect(await httpLogDistinctId('203.0.113.7', 'vocdoni.io', 'ClaudeBot/1.0')).not.toBe(id)
  })

  it('treats null ip and user agent as empty strings', async () => {
    const nulls = await httpLogDistinctId(null, 'vocdoni.io', null)
    expect(nulls).toBe(await httpLogDistinctId('', 'vocdoni.io', ''))
    expect(nulls).toMatch(/^http_log_[0-9a-f]{32}$/)
  })
})

describe('buildHttpLogEvent', () => {
  const now = new Date('2026-10-26T12:00:00.000Z')

  it('builds an anonymous $http_log event with the documented properties', async () => {
    const event = await buildHttpLogEvent(request({ referrer: 'https://example.com/a?token=s&x=1' }), 'phc_test', now)

    expect(event.api_key).toBe('phc_test')
    expect(event.event).toBe('$http_log')
    expect(event.distinct_id).toBe(await httpLogDistinctId('203.0.113.7', 'vocdoni.io', 'GPTBot/1.2'))
    expect(event.timestamp).toBe('2026-10-26T12:00:00.000Z')
    expect(event.properties).toEqual({
      $process_person_profile: false,
      $current_url: 'https://vocdoni.io/en/blog/hello?utm_source=x',
      $host: 'vocdoni.io',
      $pathname: '/en/blog/hello',
      $raw_user_agent: 'GPTBot/1.2',
      $ip: '203.0.113.7',
      $referrer: 'https://example.com/a?x=1',
      method: 'GET',
      site: 'web',
      $lib: 'netlify-edge',
      netlify_agent_category: 'crawler;ai',
      netlify_request_id: '01HREQ',
    })
  })

  it('scrubs the sensitive query params from the reported URL', async () => {
    const event = await buildHttpLogEvent(
      request({ url: 'https://vocdoni.io/en?email=a@b.com&code=1&x=2' }),
      'phc_test'
    )
    expect(event.properties.$current_url).toBe('https://vocdoni.io/en?x=2')
    expect(JSON.stringify(event)).not.toContain('a@b.com')
  })

  it('omits optional properties when the inputs are missing or empty', async () => {
    const event = await buildHttpLogEvent(
      request({ ip: null, userAgent: null, referrer: '', agentCategory: null, requestId: null }),
      'phc_test',
      now
    )
    expect(event.properties.$raw_user_agent).toBe('')
    expect(event.properties).not.toHaveProperty('$ip')
    expect(event.properties).not.toHaveProperty('$referrer')
    expect(event.properties).not.toHaveProperty('netlify_agent_category')
    expect(event.properties).not.toHaveProperty('netlify_request_id')
    expect(event.properties.$process_person_profile).toBe(false)
  })

  it('defaults the timestamp to now', async () => {
    const before = Date.now()
    const event = await buildHttpLogEvent(request(), 'phc_test')
    const stamp = Date.parse(event.timestamp)
    expect(stamp).toBeGreaterThanOrEqual(before)
    expect(stamp).toBeLessThanOrEqual(Date.now())
  })
})
