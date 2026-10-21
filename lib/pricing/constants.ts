/**
 * The pay-per-vote price list.
 *
 * Money rules, applied everywhere in lib/pricing/compute.ts:
 * - totals are integer **cents**;
 * - per-person rates are integers in **hundredths of a cent**, so 0.125 EUR is 1250 and the
 *   arithmetic stays exact. A float rate would make 1,001 people land on 358.1249999.
 */

export type PricingZone = 'free' | 'standard' | 'dedicated' | 'quote'

export type VoterBand = {
  /** Inclusive upper bound of the band, in people who can vote. */
  upTo: number
  /** Price for each person inside this band, in hundredths of a cent. */
  rateHundredthsOfCent: number
}

/**
 * Graduated bands: each rate applies only to the people inside its band. A vote with 1,200 people
 * pays 100 x 0.66 + 400 x 0.43 + 500 x 0.24 + 200 x 0.125 = 383.00 EUR.
 * Above QUOTE_REQUIRED_ABOVE there is no public rate at all.
 */
export const VOTER_BANDS: readonly VoterBand[] = [
  { upTo: 100, rateHundredthsOfCent: 6600 },
  { upTo: 500, rateHundredthsOfCent: 4300 },
  { upTo: 1000, rateHundredthsOfCent: 2400 },
  { upTo: 5000, rateHundredthsOfCent: 1250 },
  { upTo: 15000, rateHundredthsOfCent: 1000 },
  { upTo: 50000, rateHundredthsOfCent: 900 },
] as const

export type AddonKey = 'sms' | 'certificate' | 'branding' | 'domain'

export type AddonDefinition = {
  /** Billed for every person who can vote, instead of once. */
  perVoter: boolean
  /** Billed once per organisation (setup), not per vote. */
  oneTime: boolean
  unitCents: number
}

export const ADDONS: Record<AddonKey, AddonDefinition> = {
  sms: { perVoter: true, oneTime: false, unitCents: 5 },
  certificate: { perVoter: false, oneTime: false, unitCents: 3900 },
  branding: { perVoter: false, oneTime: true, unitCents: 14900 },
  domain: { perVoter: false, oneTime: true, unitCents: 9900 },
}

/** The order the add-on cards render in, per group. */
export const PER_VOTE_ADDONS: readonly AddonKey[] = ['sms', 'certificate'] as const
export const ONE_TIME_ADDONS: readonly AddonKey[] = ['branding', 'domain'] as const

/** Votes with up to this many people are always free. Add-ons are charged as usual. */
export const FREE_TIER = { maxVoters: 50 } as const

/** Above this a conversation is recommended; the price is still shown. */
export const QUOTE_RECOMMENDED_ABOVE = 15000
/** Above this there is no public price at all: "On request". */
export const QUOTE_REQUIRED_ABOVE = 50000

/** Spanish VAT. Shown as a secondary figure only; invoices may apply the reverse charge. */
export const VAT_RATE = 0.21

/** The number the input starts on, as an example rather than a claim. */
export const DEFAULT_VOTERS = 200

/** Upper bound for the input, so a pasted phone number cannot produce a nonsense estimate. */
export const MAX_VOTERS = 1_000_000

export const PRICING_CONTACT_EMAIL = 'contact@vocdoni.org'

/** Shown in the trust footnote. Empty values are hidden; the owner fills the VAT id and the DPA URL. */
export const PRICING_LEGAL: { entityName: string; vatId: string; dpaUrl: string } = {
  entityName: 'Vocdoni',
  vatId: '',
  dpaUrl: '',
}
