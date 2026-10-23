import type { Addons } from '@/lib/pricing/compute'
import type { AddonKey } from '@/lib/pricing/constants'

/** The kinds of line GET /pricing returns. `emailTwoFA` never shows up here: email codes are free. */
export type PricingLineKind =
  | 'base'
  | 'emailTwoFA'
  | 'smsTwoFA'
  | 'signedCertificate'
  | 'customUrl'
  | 'branding'
  | 'minimumCharge'

export type PricingLine = { kind: PricingLineKind; description: string; amountCents: number }

/** The body of GET /pricing. Amounts are integer EUR cents, VAT excluded. */
export type PricingQuote = {
  lines: PricingLine[]
  totalCents: number
  currency: string
  /** A large vote: the price still holds, but a conversation is recommended. */
  quoteRecommended: boolean
  /** No public price at all: `lines` is empty and `totalCents` is 0, which means "on request", never "free". */
  quoteRequired: boolean
}

/** The query parameter, and the line kind, that names each add-on in the API. */
export const ADDON_API_KINDS: Record<AddonKey, PricingLineKind> = {
  sms: 'smsTwoFA',
  certificate: 'signedCertificate',
  branding: 'branding',
  domain: 'customUrl',
}

export const pricingUrl = (voters: number, addons: Addons, baseUrl: string = PRICING_API_URL): string => {
  const params = new URLSearchParams({ voters: String(voters) })
  for (const key of Object.keys(ADDON_API_KINDS) as AddonKey[]) {
    params.set(ADDON_API_KINDS[key], String(addons[key] === true))
  }
  return `${baseUrl.replace(/\/+$/, '')}/pricing?${params}`
}

const isPricingQuote = (body: unknown): body is PricingQuote => {
  if (typeof body !== 'object' || body === null) return false
  const quote = body as Record<string, unknown>
  if (!Array.isArray(quote.lines) || !Number.isInteger(quote.totalCents) || quote.currency !== 'eur') return false
  if (typeof quote.quoteRecommended !== 'boolean' || typeof quote.quoteRequired !== 'boolean') return false
  const linesOk = quote.lines.every(
    (line) => typeof line?.kind === 'string' && Number.isInteger(line?.amountCents) && line.amountCents >= 0
  )
  // A priced answer always carries the base line; without it "free" could not be told from "broken".
  return linesOk && (quote.quoteRequired || quote.lines.some((line) => line.kind === 'base'))
}

/** Asks the SaaS backend for the price of a vote. Rejects on HTTP errors and on a body it cannot read. */
export async function fetchPricing(voters: number, addons: Addons, signal?: AbortSignal): Promise<PricingQuote> {
  const response = await fetch(pricingUrl(voters, addons), { signal })
  if (!response.ok) throw new Error(`pricing API answered ${response.status}`)
  const body: unknown = await response.json()
  if (!isPricingQuote(body)) throw new Error('pricing API sent an unexpected response')
  return body
}
