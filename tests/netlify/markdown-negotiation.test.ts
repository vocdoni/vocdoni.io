import { afterEach, describe, expect, it, vi } from 'vitest'

import negotiate, { config } from '@/netlify/edge-functions/markdown-negotiation.ts'

// The edge function runs on Deno, but everything it touches (Request/Response/Headers/fetch/URL) is
// a web standard Node also implements, so the shell can be exercised here with a stubbed fetch.
// This is what guards the `_headers` behaviour: the twin's response headers must be forwarded.

const twinResponse = (body: string, headers: Record<string, string> = {}) =>
  new Response(body, { status: 200, headers: { 'content-type': 'text/markdown; charset=UTF-8', ...headers } })

const stubFetch = (impl: (url: string) => Response) => {
  const spy = vi.fn(async (input: URL | RequestInfo, _init?: RequestInit) => impl(String(input)))
  vi.stubGlobal('fetch', spy)
  return spy
}

const request = (url: string, accept: string) => new Request(url, { headers: { accept } })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('markdown-negotiation edge function', () => {
  it('serves the markdown twin when the client asks for markdown', async () => {
    const fetchSpy = stubFetch(() => twinResponse('# Hello\n'))

    const response = await negotiate(request('https://vocdoni.io/en/blog/hello-world', 'text/markdown'))

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(String(fetchSpy.mock.calls[0][0])).toBe('https://vocdoni.io/en/blog/hello-world.md')
    expect(response?.status).toBe(200)
    expect(response?.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(response?.headers.get('vary')).toBe('Accept')
    await expect(response?.text()).resolves.toBe('# Hello\n')
  })

  it('forwards the headers _headers added to the static twin', async () => {
    stubFetch(() =>
      twinResponse('# Hello\n', {
        link: '</llms.txt>; rel="alternate"; type="text/plain"',
        'x-robots-tag': 'noindex, nofollow',
      })
    )

    const response = await negotiate(request('https://vocdoni.io/en/developers/docs', 'text/markdown'))

    expect(response?.headers.get('link')).toBe('</llms.txt>; rel="alternate"; type="text/plain"')
    expect(response?.headers.get('x-robots-tag')).toBe('noindex, nofollow')
  })

  it('falls through to the HTML for a browser', async () => {
    const fetchSpy = stubFetch(() => twinResponse('# Hello\n'))
    const accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

    expect(await negotiate(request('https://vocdoni.io/en/blog/hello-world', accept))).toBeUndefined()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('falls through for a page with no markdown twin, without fetching', async () => {
    const fetchSpy = stubFetch(() => twinResponse('# Hello\n'))

    expect(await negotiate(request('https://vocdoni.io/en/about-us', 'text/markdown'))).toBeUndefined()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('falls through when the twin does not exist rather than propagating the 404', async () => {
    stubFetch(() => new Response('not found', { status: 404 }))

    expect(await negotiate(request('https://vocdoni.io/en/blog/draft-post', 'text/markdown'))).toBeUndefined()
  })
})

describe('markdown-negotiation declaration', () => {
  it('only matches the three page shapes that have a twin', () => {
    expect(config.path).toEqual(['/:locale/blog/:slug', '/:locale/developers/docs', '/:locale/developers/docs/:slug'])
  })

  it('never runs for a request that did not mention markdown, so _headers is not shadowed', () => {
    expect(config.header).toEqual({ accept: 'text/markdown' })
  })

  it('excludes the twins themselves', () => {
    expect(config.excludedPath).toBe('/*.md')
  })
})

describe('markdown negotiation: response shaping', () => {
  it('preserves the Vary the twin already carried', async () => {
    // Netlify serves the twin with its own Vary; replacing it would stop caches varying on encoding.
    stubFetch(() => twinResponse('# Docs', { vary: 'Accept-Encoding' }))

    const response = await negotiate(request('https://vocdoni.io/en/developers/docs', 'text/markdown'))

    expect(response?.headers.get('vary')).toBe('Accept-Encoding, Accept')
  })

  it('mirrors the request method when fetching the twin', () => {
    // HEAD cannot be declared (Netlify's manifest schema rejects it), so in practice only GET
    // reaches the function - but the fetch still mirrors the method rather than forcing GET.
    expect(config.method).toEqual(['GET'])
  })
})
