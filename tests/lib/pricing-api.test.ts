import { afterEach, describe, expect, it, vi } from 'vitest'

import { PRICING_TIMEOUT_MS, fetchPricing, pricingUrl, type PricingQuote } from '@/lib/pricing/api'

const quote600: PricingQuote = {
  lines: [{ kind: 'base', description: 'Base price for 600 voters', amountCents: 26200 }],
  totalCents: 26200,
  currency: 'eur',
  quoteRecommended: false,
  quoteRequired: false,
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('pricingUrl', () => {
  it('targets the development backend by default and sends every add-on flag', () => {
    const url = new URL(pricingUrl(1200, { sms: true, domain: true }))
    expect(url.origin + url.pathname).toBe('https://saas-api-dev.vocdoni.net/pricing')
    expect(Object.fromEntries(url.searchParams)).toEqual({
      voters: '1200',
      smsTwoFA: 'true',
      signedCertificate: 'false',
      branding: 'false',
      customUrl: 'true',
    })
  })

  it('keeps a path prefix and drops a trailing slash on an overridden base URL', () => {
    expect(pricingUrl(10, {}, 'https://api.example.com/v1/')).toMatch(/^https:\/\/api\.example\.com\/v1\/pricing\?/)
  })
})

describe('fetchPricing', () => {
  it('returns the parsed quote and aborts the request when the caller does', async () => {
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => jsonResponse(quote600))
    vi.stubGlobal('fetch', fetchMock)
    const controller = new AbortController()

    await expect(fetchPricing(600, {}, controller.signal)).resolves.toEqual(quote600)
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/pricing?voters=600&'), expect.any(Object))
    const signal = fetchMock.mock.calls[0][1]?.signal
    expect(signal?.aborted).toBe(false)
    controller.abort()
    expect(signal?.aborted).toBe(true)
  })

  it('still aborts with the caller when AbortSignal.any is unavailable', async () => {
    const native = AbortSignal.any
    Object.defineProperty(AbortSignal, 'any', { value: undefined, configurable: true })
    try {
      const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => jsonResponse(quote600))
      vi.stubGlobal('fetch', fetchMock)
      const controller = new AbortController()
      await fetchPricing(600, {}, controller.signal)
      const signal = fetchMock.mock.calls[0][1]?.signal
      expect(signal?.aborted).toBe(false)
      controller.abort()
      expect(signal?.aborted).toBe(true)
    } finally {
      Object.defineProperty(AbortSignal, 'any', { value: native, configurable: true })
    }
  })

  it('rejects with a timeout error when the backend never answers, and not with an abort', async () => {
    vi.useFakeTimers()
    try {
      vi.stubGlobal(
        'fetch',
        (_url: string, init: RequestInit) =>
          new Promise((_resolve, reject) => {
            init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
          })
      )
      const pending = fetchPricing(600, {})
      const outcome = expect(pending).rejects.toThrow('did not answer in time')
      await vi.advanceTimersByTimeAsync(PRICING_TIMEOUT_MS)
      await outcome
    } finally {
      vi.useRealTimers()
    }
  })

  it('accepts the quote-only answer, which has no lines and a zero total', async () => {
    const quoteOnly = { lines: [], totalCents: 0, currency: 'eur', quoteRecommended: true, quoteRequired: true }
    vi.stubGlobal('fetch', async () => jsonResponse(quoteOnly))
    await expect(fetchPricing(60000, {})).resolves.toEqual(quoteOnly)
  })

  it('rejects a 400', async () => {
    vi.stubGlobal('fetch', async () => jsonResponse({ error: 'voters must be at least 1' }, 400))
    await expect(fetchPricing(0, {})).rejects.toThrow('400')
  })

  it('rejects a network error', async () => {
    vi.stubGlobal('fetch', async () => {
      throw new TypeError('Failed to fetch')
    })
    await expect(fetchPricing(600, {})).rejects.toThrow('Failed to fetch')
  })

  it('rejects when the request is aborted', async () => {
    vi.stubGlobal(
      'fetch',
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
        })
    )
    const controller = new AbortController()
    const pending = fetchPricing(600, {}, controller.signal)
    controller.abort()
    await expect(pending).rejects.toThrow('Aborted')
  })

  it('rejects a body it cannot read as a price, so the UI never shows a made-up figure', async () => {
    for (const body of [
      { ...quote600, currency: 'usd' },
      { ...quote600, totalCents: '26200' },
      { ...quote600, lines: [{ kind: 'smsTwoFA', description: '', amountCents: 500 }] },
      { ...quote600, lines: [{ kind: 'base', description: '', amountCents: 1.5 }] },
      null,
    ]) {
      vi.stubGlobal('fetch', async () => jsonResponse(body))
      await expect(fetchPricing(600, {})).rejects.toThrow('unexpected response')
    }
  })
})
