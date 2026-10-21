import { useMemo, useState } from 'react'

import { DEFAULT_VOTERS, type AddonKey } from '@/lib/pricing/constants'
import { type Addons, type Estimate, clampVoters, computeEstimate, parseVoters } from '@/lib/pricing/compute'
import { LADDER, ladderIndexFor, votersAtLadderIndex } from '@/lib/pricing/ladder'

export type CalculatorSource = 'input' | 'stepper' | 'slider' | 'addon'

export type PricingEstimateState = {
  voters: number
  estimate: Estimate
  addons: Addons
  ladderIndex: number
  source: CalculatorSource
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
  const [source, setSource] = useState<CalculatorSource>('input')

  const estimate = useMemo<Estimate>(() => computeEstimate(voters, addons), [voters, addons])

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
    estimate,
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
