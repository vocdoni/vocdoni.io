import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { PricingQuote } from '@/lib/pricing/api'

const freeQuote: PricingQuote = {
  lines: [{ kind: 'base', description: 'Base price', amountCents: 0 }],
  totalCents: 0,
  currency: 'eur',
  quoteRecommended: false,
  quoteRequired: false,
}

const pricedQuote = (amountCents: number): PricingQuote => ({
  lines: [{ kind: 'base', description: 'Base price', amountCents }],
  totalCents: amountCents,
  currency: 'eur',
  quoteRecommended: false,
  quoteRequired: false,
})

const quoteRequiredResponse: PricingQuote = {
  lines: [],
  totalCents: 0,
  currency: 'eur',
  quoteRecommended: true,
  quoteRequired: true,
}

const jsonOk = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })

// Reset module cache before each test so the module-level `fetchOnce` is cleared.
beforeEach(() => {
  vi.resetModules()
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('+data: pricing page data hook', () => {
  it('returns priceList rows for all ladder edges on a successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        const voters = Number(new URL(url).searchParams.get('voters'))
        const quote = voters <= 25 ? freeQuote : pricedQuote(voters * 10)
        return jsonOk(quote)
      })
    )

    const { default: data } = await import('@/pages/pricing/+data')
    const result = await data()

    expect(result).not.toBeNull()
    // 7 edges: 25, 100, 500, 1000, 5000, 15000, 50000
    expect(result!.priceList).toHaveLength(7)

    const row25 = result!.priceList.find((r) => r.voters === 25)
    expect(row25?.isFree).toBe(true)
    expect(row25?.voterPriceCents).toBe(0)
    expect(row25?.priceAvailable).toBe(true)

    const row100 = result!.priceList.find((r) => r.voters === 100)
    expect(row100?.isFree).toBe(false)
    expect(row100?.voterPriceCents).toBe(1000)
    expect(row100?.priceAvailable).toBe(true)
    expect(row100?.perPersonHundredthsOfCent).toBeGreaterThan(0)
  })

  it('marks a row as unavailable when the backend returns quoteRequired for that edge', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => jsonOk(quoteRequiredResponse))
    )

    const { default: data } = await import('@/pages/pricing/+data')
    const result = await data()

    // quoteRequired is a valid backend response; the hook still returns rows
    expect(result).not.toBeNull()
    expect(result!.priceList).toHaveLength(7)
    result!.priceList.forEach((row) => {
      expect(row.priceAvailable).toBe(false)
      expect(row.isFree).toBe(false)
      expect(row.voterPriceCents).toBe(0)
    })
  })

  it('returns null and logs a warning when the backend is unreachable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('Failed to fetch')
      })
    )
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { default: data } = await import('@/pages/pricing/+data')
    const result = await data()

    expect(result).toBeNull()
    expect(warnSpy).toHaveBeenCalledOnce()
    // The warning names the backend URL
    expect(warnSpy.mock.calls[0][0]).toContain('saas-api-dev.vocdoni.net')
    // And includes the error
    expect(warnSpy.mock.calls[0][0]).toContain('Failed to fetch')
  })

  it('shares one set of requests across multiple calls (memoisation)', async () => {
    const fetchMock = vi.fn(async (url: string) => {
      const voters = Number(new URL(url).searchParams.get('voters'))
      return jsonOk(voters <= 25 ? freeQuote : pricedQuote(voters * 10))
    })
    vi.stubGlobal('fetch', fetchMock)

    const { default: data } = await import('@/pages/pricing/+data')
    // Call data() three times, simulating three locale prerenders
    const [r1, r2, r3] = await Promise.all([data(), data(), data()])

    expect(r1).not.toBeNull()
    expect(r2).toStrictEqual(r1)
    expect(r3).toStrictEqual(r1)
    // Only 7 requests (one per edge), not 21
    expect(fetchMock).toHaveBeenCalledTimes(7)
  })
})
