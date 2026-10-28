import { describe, expect, it } from 'vitest'
import {
  bandEdgeIndexes,
  LADDER,
  ladderIndexFor,
  nextBandEdgeIndex,
  QUOTE_STOP,
  votersAtLadderIndex,
} from '@/lib/pricing/ladder'

describe('LADDER', () => {
  it('starts at 1', () => {
    expect(LADDER[0]).toBe(1)
  })

  it('LADDER[24] is 25 (last stop of the 1-step segment)', () => {
    expect(LADDER[24]).toBe(25)
  })

  it('LADDER[25] is 30 (first stop of the 5-step segment)', () => {
    expect(LADDER[25]).toBe(30)
  })

  it('second-to-last stop is 50000', () => {
    expect(LADDER.at(-2)).toBe(50000)
  })

  it('last stop is QUOTE_STOP', () => {
    expect(LADDER.at(-1)).toBe(QUOTE_STOP)
  })

  it('is strictly increasing', () => {
    for (let i = 1; i < LADDER.length; i++) {
      expect(LADDER[i]).toBeGreaterThan(LADDER[i - 1])
    }
  })

  it('stops on every price-list edge', () => {
    for (const edge of [25, 100, 500, 1000, 5000, 15000, 50000]) {
      expect(LADDER).toContain(edge)
    }
  })
})

describe('ladderIndexFor', () => {
  it('returns the index of 200 for voters=200', () => {
    const idx = ladderIndexFor(200)
    expect(LADDER[idx]).toBe(200)
  })

  it('votersAtLadderIndex(ladderIndexFor(200) + 1) === 210', () => {
    const idx = ladderIndexFor(200)
    expect(votersAtLadderIndex(idx + 1)).toBe(210)
  })

  it('rounds 247 up to the index of 250', () => {
    const idx = ladderIndexFor(247)
    expect(LADDER[idx]).toBe(250)
  })

  it('returns the last index for voters > 50000', () => {
    expect(ladderIndexFor(60000)).toBe(LADDER.length - 1)
  })
})

describe('votersAtLadderIndex', () => {
  it('clamps to [0, LADDER.length - 1]', () => {
    expect(votersAtLadderIndex(-1)).toBe(LADDER[0])
    expect(votersAtLadderIndex(LADDER.length)).toBe(LADDER[LADDER.length - 1])
  })
})

describe('bandEdgeIndexes', () => {
  it('contains an index for each of the 7 band-edge values', () => {
    expect(bandEdgeIndexes).toHaveLength(7)
  })
})

describe('nextBandEdgeIndex', () => {
  it('PageDown from index of 200 lands on the index of 100', () => {
    const idx200 = ladderIndexFor(200)
    const idx100 = LADDER.indexOf(100)
    expect(nextBandEdgeIndex(idx200, -1)).toBe(idx100)
  })

  it('PageUp from index of 200 lands on the index of 500', () => {
    const idx200 = ladderIndexFor(200)
    const idx500 = LADDER.indexOf(500)
    expect(nextBandEdgeIndex(idx200, 1)).toBe(idx500)
  })

  it('from the index of 50000, +1 goes to the last index', () => {
    const idx50000 = LADDER.indexOf(50000)
    expect(nextBandEdgeIndex(idx50000, 1)).toBe(LADDER.length - 1)
  })

  it('from index 0, -1 stays at 0', () => {
    expect(nextBandEdgeIndex(0, -1)).toBe(0)
  })
})
