import { useEffect, useState } from 'react'

import { fetchPricing } from '@/lib/pricing/api'
import { DEFAULT_VOTERS, QUOTE_REQUIRED_ABOVE, type AddonKey } from '@/lib/pricing/constants'
import {
  ALL_ADDONS,
  PRICE_LIST_VOTERS,
  type AddonPrices,
  type Addons,
  type Estimate,
  addonPricesFromQuote,
  clampVoters,
  estimateFromQuote,
  parseVoters,
} from '@/lib/pricing/compute'
import { LADDER, ladderIndexFor, votersAtLadderIndex } from '@/lib/pricing/ladder'
import type { RequestedPrice } from '@/lib/pricing/request'

export type CalculatorSource = 'input' | 'stepper' | 'slider' | 'addon'

/** loading: a request is pending (the last estimate, if any, stays on screen); error: no price to show. */
export type PricingStatus = 'loading' | 'ready' | 'error'

/** How long the calculator waits for the slider or the typing to settle before asking for a price. */
export const PRICING_DEBOUNCE_MS = 250

/** Waits before each retry of the add-on price list; once they are used up, the rows stay without prices. */
const ADDON_PRICE_RETRY_DELAYS_MS = [1_000, 2_000, 4_000]

export type PricingEstimateState = {
  voters: number
  /** The last price the backend sent, for `estimate.voters`; null before the first one and after a failure. */
  estimate: Estimate | null
  /** What the shown estimate was computed for: its voters and add-ons, or the current choice when there is none. */
  requested: RequestedPrice
  status: PricingStatus
  /** Unit prices for the add-on rows, from the backend; null until they arrive. */
  addonPrices: AddonPrices | null
  addons: Addons
  ladderIndex: number
  /** The control behind the last change; null until the visitor changes anything. */
  source: CalculatorSource | null
  /** Strings with no digit are ignored. */
  setVoters: (value: number | string, source: CalculatorSource) => void
  /** Sets voters to the stop at the given ladder index; the terminal stop sets QUOTE_STOP. */
  setLadderIndex: (index: number) => void
  /** Moves one ladder stop towards more people. */
  stepUp: () => void
  /** Moves one ladder stop towards fewer people. */
  stepDown: () => void
  toggleAddon: (key: AddonKey, checked: boolean) => void
}

export function usePricingEstimate(initialVoters: number = DEFAULT_VOTERS): PricingEstimateState {
  const [voters, setVotersState] = useState<number>(() => clampVoters(initialVoters))
  const [addons, setAddons] = useState<Addons>({})
  const [source, setSource] = useState<CalculatorSource | null>(null)

  // estimateAddons are the add-ons the estimate was fetched with; while a new one is pending they stay with it.
  const [result, setResult] = useState<{ estimate: Estimate | null; estimateAddons: Addons; status: PricingStatus }>({
    estimate: null,
    estimateAddons: {},
    status: 'loading',
  })
  const [addonPrices, setAddonPrices] = useState<AddonPrices | null>(null)

  // Effects never run while prerendering, so the static HTML always ships the loading state.
  useEffect(() => {
    const controller = new AbortController()
    setResult((previous) => ({ ...previous, status: 'loading' }))
    const timer = setTimeout(() => {
      fetchPricing(voters, addons, controller.signal).then(
        (quote) => {
          if (!controller.signal.aborted) {
            setResult({ estimate: estimateFromQuote(voters, quote), estimateAddons: addons, status: 'ready' })
          }
        },
        () => {
          if (!controller.signal.aborted) setResult({ estimate: null, estimateAddons: addons, status: 'error' })
        }
      )
    }, PRICING_DEBOUNCE_MS)
    // A newer change cancels both the pending timer and the request in flight, so a stale answer never lands.
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [voters, addons])

  useEffect(() => {
    const controller = new AbortController()
    let retryTimer: ReturnType<typeof setTimeout> | undefined
    const loadAddonPrices = (attempt: number) => {
      fetchPricing(PRICE_LIST_VOTERS, ALL_ADDONS, controller.signal).then(
        (quote) => {
          if (!controller.signal.aborted) setAddonPrices(addonPricesFromQuote(quote))
        },
        () => {
          // The rows show no price meanwhile; the panel already reports the failure.
          const delay = ADDON_PRICE_RETRY_DELAYS_MS[attempt]
          if (controller.signal.aborted || delay === undefined) return
          retryTimer = setTimeout(() => loadAddonPrices(attempt + 1), delay)
        }
      )
    }
    loadAddonPrices(0)
    return () => {
      clearTimeout(retryTimer)
      controller.abort()
    }
  }, [])

  const ladderIndex = ladderIndexFor(voters)

  const setVoters = (value: number | string, src: CalculatorSource) => {
    if (typeof value === 'string') {
      const parsed = parseVoters(value)
      if (parsed === null) return
      setVotersState(clampVoters(parsed))
    } else {
      setVotersState(clampVoters(value))
    }
    setSource(src)
  }

  const setLadderIndex = (index: number) => {
    setVotersState(votersAtLadderIndex(index))
    setSource('slider')
  }

  const stepUp = () => {
    // Above the last stop there is nothing to step to; keep the typed count.
    if (voters >= LADDER[LADDER.length - 1]) return
    const idx = ladderIndexFor(voters)
    // If the nearest stop is at or below current voters, move one step further up.
    const targetIdx = LADDER[idx] <= voters ? Math.min(idx + 1, LADDER.length - 1) : idx
    setVotersState(votersAtLadderIndex(targetIdx))
    setSource('stepper')
  }

  const stepDown = () => {
    // Above the last real stop the nearest one is the QUOTE_STOP sentinel, which is not a count: step down from 50,000.
    if (voters > QUOTE_REQUIRED_ABOVE) {
      setVotersState(QUOTE_REQUIRED_ABOVE)
      setSource('stepper')
      return
    }
    const idx = ladderIndexFor(voters)
    // If the nearest stop is at or above current voters, move one step further down.
    const targetIdx = LADDER[idx] >= voters ? Math.max(idx - 1, 0) : idx
    setVotersState(votersAtLadderIndex(targetIdx))
    setSource('stepper')
  }

  const toggleAddon = (key: AddonKey, checked: boolean) => {
    setAddons((prev) => ({ ...prev, [key]: checked }))
    setSource('addon')
  }

  return {
    voters,
    estimate: result.estimate,
    requested: {
      voters: result.estimate?.voters ?? voters,
      addons: result.estimate ? result.estimateAddons : addons,
      estimate: result.estimate,
    },
    status: result.status,
    addonPrices,
    addons,
    ladderIndex,
    source,
    setVoters,
    setLadderIndex,
    stepUp,
    stepDown,
    toggleAddon,
  }
}
