import {
  ADDONS,
  FREE_TIER,
  MAX_VOTERS,
  QUOTE_RECOMMENDED_ABOVE,
  QUOTE_REQUIRED_ABOVE,
  VAT_RATE,
  VOTER_BANDS,
  type AddonKey,
  type PricingZone,
} from '@/lib/pricing/constants'

export type Addons = Partial<Record<AddonKey, boolean>>

export type BandLine = {
  from: number
  to: number
  people: number
  rateHundredthsOfCent: number
  /** people x rate, still in hundredths of a cent: summed before the single rounding. */
  subtotalHundredths: number
}

export type AddonLine = {
  key: AddonKey
  quantity: number
  unitCents: number
  oneTime: boolean
  subtotalCents: number
}

export type Estimate = {
  voters: number
  zone: PricingZone
  /** False above QUOTE_REQUIRED_ABOVE, where every figure below is 0 and the UI says "On request". */
  priceAvailable: boolean
  bands: BandLine[]
  /** The vote itself, without add-ons. */
  voterPriceCents: number
  addons: AddonLine[]
  /** Vote + per-vote add-ons. What "Total for this vote" shows. */
  totalThisVoteCents: number
  /** Setup add-ons, billed once per organisation. Never folded into the line above. */
  oneTimeCents: number
  /** totalThisVoteCents / voters, in hundredths of a cent, for the "x per person" line. */
  perPersonHundredthsOfCent: number
  vatRate: number
  /** VAT on totalThisVoteCents. The secondary line under the vote total. */
  vatCents: number
  totalThisVoteWithVatCents: number
  /** Vote + setup. Used by the printed estimate, not by the summary card. */
  grandTotalCents: number
  grandVatCents: number
  grandTotalWithVatCents: number
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

export const pricingZone = (voters: number | string): PricingZone => {
  const people = clampVoters(voters)
  if (people <= FREE_TIER.maxVoters) return 'free'
  if (people <= QUOTE_RECOMMENDED_ABOVE) return 'standard'
  if (people <= QUOTE_REQUIRED_ABOVE) return 'dedicated'
  return 'quote'
}

/** One line per band the list spans, for the summary breakdown and the printed estimate. */
export const bandBreakdown = (voters: number | string): BandLine[] => {
  const people = clampVoters(voters)
  if (people > QUOTE_REQUIRED_ABOVE) return []

  const lines: BandLine[] = []
  let from = 1
  for (const band of VOTER_BANDS) {
    if (people < from) break
    const to = Math.min(people, band.upTo)
    const inBand = to - from + 1
    if (inBand > 0) {
      lines.push({
        from,
        to,
        people: inBand,
        rateHundredthsOfCent: band.rateHundredthsOfCent,
        subtotalHundredths: inBand * band.rateHundredthsOfCent,
      })
    }
    from = band.upTo + 1
  }
  return lines
}

/**
 * The price of the vote itself. Every band subtotal stays in hundredths of a cent and the sum is
 * rounded to cents exactly once. Rounding per band would turn 1,001 people into 358.12 instead of
 * the correct 358.13.
 */
export const graduatedTotalCents = (voters: number | string): number =>
  Math.round(bandBreakdown(voters).reduce((total, line) => total + line.subtotalHundredths, 0) / 100)

export const addonsBreakdown = (voters: number | string, addons: Addons = {}): AddonLine[] => {
  const people = clampVoters(voters)
  return (Object.keys(ADDONS) as AddonKey[])
    .filter((key) => addons[key])
    .map((key) => {
      const definition = ADDONS[key]
      const quantity = definition.perVoter ? people : 1
      return {
        key,
        quantity,
        unitCents: definition.unitCents,
        oneTime: definition.oneTime,
        subtotalCents: quantity * definition.unitCents,
      }
    })
}

export const vatCents = (amountCents: number): number => Math.round(amountCents * VAT_RATE)

export const perPersonHundredthsOfCent = (totalCents: number, voters: number): number =>
  voters > 0 ? Math.round((totalCents * 100) / voters) : 0

export const computeEstimate = (voters: number | string, addons: Addons = {}): Estimate => {
  const people = clampVoters(voters)
  const zone = pricingZone(people)
  // Above the quote threshold no figure is published at all.
  const priceAvailable = zone !== 'quote'

  // Free zone: the vote itself is always free, but add-ons are still charged.
  const bands = zone === 'free' || !priceAvailable ? [] : bandBreakdown(people)
  const voterPriceCents = zone === 'free' || !priceAvailable ? 0 : graduatedTotalCents(people)
  const addonLines = priceAvailable ? addonsBreakdown(people, addons) : []

  const totalThisVoteCents =
    voterPriceCents + addonLines.filter((line) => !line.oneTime).reduce((sum, line) => sum + line.subtotalCents, 0)
  const oneTimeCents = addonLines.filter((line) => line.oneTime).reduce((sum, line) => sum + line.subtotalCents, 0)
  const grandTotalCents = totalThisVoteCents + oneTimeCents

  return {
    voters: people,
    zone,
    priceAvailable,
    bands,
    voterPriceCents,
    addons: addonLines,
    totalThisVoteCents,
    oneTimeCents,
    perPersonHundredthsOfCent: perPersonHundredthsOfCent(totalThisVoteCents, people),
    vatRate: VAT_RATE,
    vatCents: vatCents(totalThisVoteCents),
    totalThisVoteWithVatCents: totalThisVoteCents + vatCents(totalThisVoteCents),
    grandTotalCents,
    grandVatCents: vatCents(grandTotalCents),
    grandTotalWithVatCents: grandTotalCents + vatCents(grandTotalCents),
  }
}
