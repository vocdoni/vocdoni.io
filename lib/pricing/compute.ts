import { ADDON_API_KINDS, type PricingLineKind, type PricingQuote } from '@/lib/pricing/api'
import { MAX_VOTERS, ONE_TIME_ADDONS, PER_VOTE_ADDONS, type AddonKey, type PricingZone } from '@/lib/pricing/constants'

export type Addons = Partial<Record<AddonKey, boolean>>

export type AddonLine = {
  key: AddonKey
  oneTime: boolean
  subtotalCents: number
}

/** What the calculator shows, mapped from one GET /pricing answer. Every amount comes from the backend. */
export type Estimate = {
  voters: number
  zone: PricingZone
  /** False when the backend publishes no price: every figure below is 0 and the UI says "On request". */
  priceAvailable: boolean
  /** The vote itself (the `base` line), without add-ons. */
  voterPriceCents: number
  addons: AddonLine[]
  /** The `minimumCharge` line that lifts a small paid vote to the minimum; 0 when it does not apply. */
  minimumChargeCents: number
  /** Everything billed with this vote. What "Total for this vote" shows. */
  totalThisVoteCents: number
  /** Setup add-ons, billed once per organisation. Never folded into the line above. */
  oneTimeCents: number
  /** The backend's total: this vote plus the one-time setup. */
  totalCents: number
  /** The vote and its per-vote add-ons per person, in hundredths of a cent; the minimum top-up is not a rate. */
  perPersonHundredthsOfCent: number
}

/**
 * Normalises Devanagari (U+0966-096F), Arabic-Indic (U+0660-0669) and Extended Arabic-Indic
 * (U+06F0-06F9) digits to ASCII 0-9 in a single pass.
 */
export const normaliseDigits = (value: string): string =>
  value.replace(/[0-9०-९٠-٩۰-۹]/g, (ch) => {
    const cp = ch.codePointAt(0)!
    if (cp >= 0x0966 && cp <= 0x096f) return String(cp - 0x0966)
    if (cp >= 0x0660 && cp <= 0x0669) return String(cp - 0x0660)
    if (cp >= 0x06f0 && cp <= 0x06f9) return String(cp - 0x06f0)
    return ch
  })

/**
 * Strips all non-digit characters (after normalising script digits) and returns the resulting
 * integer, or null when there are no digits at all.
 */
export const parseVoters = (value: string): number | null => {
  const digits = normaliseDigits(value).replace(/[^0-9]/g, '')
  if (digits === '') return null
  return Number(digits)
}

/**
 * Parses whatever the number input produced into a whole number of people.
 * Accepts the grouping separators a European visitor types ("1.200", "1 200", "1,200"): they are
 * stripped rather than interpreted, because the value is always an integer count of people.
 */
export const clampVoters = (value: number | string): number => {
  const raw = typeof value === 'string' ? parseVoters(value) : value
  if (raw === null || !Number.isFinite(raw)) return 1
  const whole = Math.floor(raw)
  if (whole < 1) return 1
  return Math.min(whole, MAX_VOTERS)
}

export const perPersonHundredthsOfCent = (totalCents: number, voters: number): number =>
  voters > 0 ? Math.round((totalCents * 100) / voters) : 0

const amountOf = (quote: PricingQuote, kinds: readonly PricingLineKind[]): number =>
  quote.lines.filter((line) => kinds.includes(line.kind)).reduce((sum, line) => sum + line.amountCents, 0)

/**
 * Maps a GET /pricing answer onto the calculator. The zone follows the answer: no price at all is the
 * quote zone, a recommended conversation the dedicated one, a free base line the free one.
 */
export const estimateFromQuote = (voters: number, quote: PricingQuote): Estimate => {
  const voterPriceCents = amountOf(quote, ['base'])
  const zone: PricingZone = quote.quoteRequired
    ? 'quote'
    : quote.quoteRecommended
      ? 'dedicated'
      : voterPriceCents === 0
        ? 'free'
        : 'standard'

  const addons = [...PER_VOTE_ADDONS, ...ONE_TIME_ADDONS].flatMap((key): AddonLine[] => {
    const kind = ADDON_API_KINDS[key]
    if (!quote.lines.some((line) => line.kind === kind)) return []
    return [{ key, oneTime: ONE_TIME_ADDONS.includes(key), subtotalCents: amountOf(quote, [kind]) }]
  })

  const oneTimeCents = amountOf(
    quote,
    ONE_TIME_ADDONS.map((key) => ADDON_API_KINDS[key])
  )
  const totalThisVoteCents = quote.totalCents - oneTimeCents
  const minimumChargeCents = amountOf(quote, ['minimumCharge'])

  return {
    voters,
    zone,
    priceAvailable: !quote.quoteRequired,
    voterPriceCents,
    addons,
    minimumChargeCents,
    totalThisVoteCents,
    oneTimeCents,
    totalCents: quote.totalCents,
    perPersonHundredthsOfCent: perPersonHundredthsOfCent(totalThisVoteCents - minimumChargeCents, voters),
  }
}

/** People in the price-list request: at 100, the SMS line in cents reads as its rate in hundredths of a cent. */
export const PRICE_LIST_VOTERS = 100
export const ALL_ADDONS: Addons = { sms: true, certificate: true, branding: true, domain: true }

/** Unit prices for the add-on rows: the SMS rate per person in hundredths of a cent, the rest in cents. */
export type AddonPrices = Partial<Record<AddonKey, number>>

export const addonPricesFromQuote = (quote: PricingQuote): AddonPrices =>
  Object.fromEntries(
    estimateFromQuote(PRICE_LIST_VOTERS, quote).addons.map((line) => [
      line.key,
      line.key === 'sms' ? perPersonHundredthsOfCent(line.subtotalCents, PRICE_LIST_VOTERS) : line.subtotalCents,
    ])
  )
