/**
 * The pay-per-vote calculator. Every price comes from the SaaS backend (GET /pricing, see
 * lib/pricing/api.ts); nothing here is a price. Totals are integer cents; per-person rates are
 * integers in hundredths of a cent, so 0.125 EUR is 1250.
 */

export type PricingZone = 'free' | 'standard' | 'dedicated' | 'quote'

export type AddonKey = 'sms' | 'certificate' | 'branding' | 'domain'

/** The order the add-on cards render in, per group. */
export const PER_VOTE_ADDONS: readonly AddonKey[] = ['sms', 'certificate'] as const
/** Billed once per organisation (setup), not with every vote. */
export const ONE_TIME_ADDONS: readonly AddonKey[] = ['branding', 'domain'] as const

/**
 * Above this the backend publishes no price ("On request"). Only labels the slider's last stop and the
 * quote copy: whether a given count is priced is always the backend's call.
 */
export const QUOTE_REQUIRED_ABOVE = 50000

/** The number the input starts on, as an example rather than a claim. */
export const DEFAULT_VOTERS = 200

/** Upper bound for the input, so a pasted phone number cannot produce a nonsense estimate. */
export const MAX_VOTERS = 1_000_000

export const PRICING_CONTACT_EMAIL = 'contact@vocdoni.org'
