import { QUOTE_REQUIRED_ABOVE } from '@/lib/pricing/constants'

/** The last stop on the slider; one above the quote threshold, representing "more than 50,000". */
export const QUOTE_STOP = QUOTE_REQUIRED_ABOVE + 1 // 50001

/**
 * The slider ladder: finer steps where a few people change the price most. Each segment ends on an edge
 * of the published price list (free up to 25, then 100, 500, 1,000, 5,000, 15,000 and 50,000), which
 * the slider marks with a tick. The edges are layout only; every price comes from the backend.
 * Steps:
 *   1..25 by 1, 30..100 by 5, 110..500 by 10, 525..1000 by 25,
 *   1050..5000 by 50, 5100..15000 by 100, 15250..50000 by 250, then QUOTE_STOP.
 */
const LADDER_SEGMENTS = [
  { upTo: 25, step: 1 },
  { upTo: 100, step: 5 },
  { upTo: 500, step: 10 },
  { upTo: 1000, step: 25 },
  { upTo: 5000, step: 50 },
  { upTo: 15000, step: 100 },
  { upTo: 50000, step: 250 },
] as const

function buildLadder(): readonly number[] {
  const stops: number[] = []
  let prevUpTo = 0
  for (const { upTo, step } of LADDER_SEGMENTS) {
    // Each segment starts at prevUpTo + thisStep so the first stop aligns with the step grid.
    // e.g. after the 1-step segment that ends at 25, the 5-step segment starts at 30.
    const from = prevUpTo + step
    for (let v = from; v <= upTo; v += step) {
      stops.push(v)
    }
    prevUpTo = upTo
  }
  stops.push(QUOTE_STOP)
  return stops as readonly number[]
}

export const LADDER: readonly number[] = buildLadder()

/**
 * Indexes into LADDER of the band-edge stops (25, 100, 500, 1000, 5000, 15000, 50000).
 * Used to render tick marks and drive PageUp/PageDown navigation.
 */
export const bandEdgeIndexes: readonly number[] = LADDER_SEGMENTS.map(({ upTo }) => LADDER.indexOf(upTo))

/**
 * Returns the ladder index for the stop nearest to `voters`.
 * Ties round up. Values above 50,000 return the last index.
 */
export const ladderIndexFor = (voters: number): number => {
  if (voters > QUOTE_REQUIRED_ABOVE) return LADDER.length - 1
  // Binary search for the nearest stop.
  let lo = 0
  let hi = LADDER.length - 2 // exclude the QUOTE_STOP terminal
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (LADDER[mid] < voters) {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  // lo is the first index >= voters; check if lo-1 is closer (tie goes up).
  if (lo > 0 && LADDER[lo] - voters > voters - LADDER[lo - 1]) {
    return lo - 1
  }
  return lo
}

/** Returns the voters count at a ladder index, clamped to [0, LADDER.length - 1]. */
export const votersAtLadderIndex = (index: number): number => {
  const i = Math.max(0, Math.min(index, LADDER.length - 1))
  return LADDER[i]
}

/**
 * Returns the nearest band-edge index in the given direction (1 = towards more people, PageUp in
 * the UI; -1 = towards fewer people, PageDown). Stays at the ends rather than wrapping.
 */
export const nextBandEdgeIndex = (index: number, direction: 1 | -1): number => {
  if (direction === 1) {
    // Find the first band-edge index strictly greater than current.
    for (const ei of bandEdgeIndexes) {
      if (ei > index) return ei
    }
    return LADDER.length - 1
  } else {
    // Find the last band-edge index strictly less than current.
    let result = 0
    for (const ei of bandEdgeIndexes) {
      if (ei < index) result = ei
    }
    return result
  }
}
