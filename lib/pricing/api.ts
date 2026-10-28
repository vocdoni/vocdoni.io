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

export const pricingUrl = (voters: number, addons: Addons, baseUrl: string = SAAS_URL): string => {
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

/** How long a price request may take, from the connection to the last byte, before it counts as failed. */
export const PRICING_TIMEOUT_MS = 10_000

/** Aborts as soon as any of the signals does. AbortSignal.any is missing in older browsers, so those get a relay. */
const anySignal = (...signals: AbortSignal[]): AbortSignal => {
  if (typeof AbortSignal.any === 'function') return AbortSignal.any(signals)
  const controller = new AbortController()
  for (const signal of signals) {
    if (signal.aborted) controller.abort()
    signal.addEventListener('abort', () => controller.abort(), { once: true })
  }
  return controller.signal
}

/**
 * Asks the SaaS backend for the price of a vote. Rejects on HTTP errors, on a body it cannot read and on a
 * timeout. A caller's abort rejects with its own AbortError, so the caller can tell it apart.
 */
export async function fetchPricing(voters: number, addons: Addons, signal?: AbortSignal): Promise<PricingQuote> {
  const timeout = new AbortController()
  const timer = setTimeout(() => timeout.abort(), PRICING_TIMEOUT_MS)
  try {
    const response = await fetch(pricingUrl(voters, addons), {
      signal: signal ? anySignal(signal, timeout.signal) : timeout.signal,
    })
    if (!response.ok) throw new Error(`pricing API answered ${response.status}`)
    const body: unknown = await response.json()
    if (!isPricingQuote(body)) throw new Error('pricing API sent an unexpected response')
    return body
  } catch (error) {
    if (timeout.signal.aborted && !signal?.aborted) throw new Error('pricing API did not answer in time')
    throw error
  } finally {
    clearTimeout(timer)
  }
}
