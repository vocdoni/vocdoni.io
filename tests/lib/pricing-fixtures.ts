import { vi } from 'vitest'

import type { PricingLineKind, PricingQuote } from '@/lib/pricing/api'

/**
 * GET /pricing answers copied from the backend for the counts the tests use. These are recorded answers,
 * not a price model: the calculator must never compute a price itself.
 */
export const makeQuote = (
  amounts: Partial<Record<PricingLineKind, number>>,
  flags: { quoteRecommended?: boolean; quoteRequired?: boolean } = {}
): PricingQuote => {
  const lines = (Object.entries(amounts) as [PricingLineKind, number][]).map(([kind, amountCents]) => ({
    kind,
    description: kind,
    amountCents,
  }))
  return {
    lines,
    totalCents: lines.reduce((sum, line) => sum + line.amountCents, 0),
    currency: 'eur',
    quoteRecommended: flags.quoteRecommended ?? false,
    quoteRequired: flags.quoteRequired ?? false,
  }
}

export const QUOTE_ONLY = makeQuote({}, { quoteRecommended: true, quoteRequired: true })

/** Keyed by `voters` plus the add-on query parameters that are true, in the order the client sends them. */
export const PRICING_FIXTURES: Record<string, PricingQuote> = {
  '10': makeQuote({ base: 0 }),
  '10 smsTwoFA': makeQuote({ base: 0, smsTwoFA: 50, minimumCharge: 50 }),
  '20': makeQuote({ base: 0 }),
  '100': makeQuote({ base: 6600 }),
  '100 smsTwoFA signedCertificate branding customUrl': makeQuote({
    base: 6600,
    smsTwoFA: 500,
    signedCertificate: 3900,
    branding: 14900,
    customUrl: 9900,
  }),
  '200': makeQuote({ base: 10900 }),
  '200 smsTwoFA': makeQuote({ base: 10900, smsTwoFA: 1000 }),
  '200 branding': makeQuote({ base: 10900, branding: 14900 }),
  '210': makeQuote({ base: 11330 }),
  '1200': makeQuote({ base: 38300 }),
  '1200 smsTwoFA signedCertificate branding': makeQuote({
    base: 38300,
    smsTwoFA: 6000,
    signedCertificate: 3900,
    branding: 14900,
  }),
  '10000': makeQuote({ base: 135800 }, { quoteRecommended: true }),
  '50001': QUOTE_ONLY,
}

export const fixtureKey = (url: string): string => {
  const params = new URL(url).searchParams
  const on = [...params].filter(([key, value]) => key !== 'voters' && value === 'true').map(([key]) => key)
  return [params.get('voters'), ...on].join(' ')
}

/** A fetch stand-in serving PRICING_FIXTURES; any other request gets a 500, as an unknown price should. */
export const mockPricingFetch = (fixtures: Record<string, PricingQuote> = PRICING_FIXTURES) =>
  vi.fn(async (url: string) => {
    const quote = fixtures[fixtureKey(url)]
    return quote
      ? new Response(JSON.stringify(quote), { status: 200, headers: { 'Content-Type': 'application/json' } })
      : new Response('{"error":"no fixture"}', { status: 500 })
  })
