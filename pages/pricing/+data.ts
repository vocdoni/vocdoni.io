import { estimateFromQuote } from '@/lib/pricing/compute'
import { fetchPricing } from '@/lib/pricing/api'
import { PRICE_LIST_EDGES } from '@/lib/pricing/ladder'

export type PriceListRow = {
  voters: number
  voterPriceCents: number
  perPersonHundredthsOfCent: number
  isFree: boolean
  priceAvailable: boolean
}

export type PricingPageData = { priceList: PriceListRow[] } | null

// Module-level promise: shared by all 11 locale prerenders in a single build run,
// so only one set of HTTP requests goes out per build.
let fetchOnce: Promise<PriceListRow[] | null> | undefined

function fetchAllEdgePrices(): Promise<PriceListRow[] | null> {
  if (!fetchOnce) {
    fetchOnce = Promise.all(
      PRICE_LIST_EDGES.map(async (voters) => {
        const quote = await fetchPricing(voters, {})
        const estimate = estimateFromQuote(voters, quote)
        return {
          voters,
          voterPriceCents: estimate.voterPriceCents,
          perPersonHundredthsOfCent: estimate.perPersonHundredthsOfCent,
          isFree: estimate.zone === 'free',
          priceAvailable: estimate.priceAvailable,
        } satisfies PriceListRow
      })
    ).catch((error: unknown) => {
      console.warn(
        `pricing: ${SAAS_URL} unreachable, skipping price list: ${error instanceof Error ? error.message : String(error)}`
      )
      return null
    })
  }
  return fetchOnce
}

export default async function data(): Promise<PricingPageData> {
  const priceList = await fetchAllEdgePrices()
  return priceList ? { priceList } : null
}
