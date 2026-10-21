import { describe, expect, it } from 'vitest'
import { ADDONS, DEFAULT_VOTERS, MAX_VOTERS, VAT_RATE } from '@/lib/pricing/constants'
import {
  addonsBreakdown,
  bandBreakdown,
  clampVoters,
  computeEstimate,
  graduatedTotalCents,
  normaliseDigits,
  parseVoters,
  perPersonHundredthsOfCent,
  pricingZone,
  vatCents,
} from '@/lib/pricing/compute'

describe('graduatedTotalCents', () => {
  it('reproduces the published reference table', () => {
    expect(graduatedTotalCents(100)).toBe(6600)
    expect(graduatedTotalCents(500)).toBe(23800)
    expect(graduatedTotalCents(1000)).toBe(35800)
    expect(graduatedTotalCents(5000)).toBe(85800)
    expect(graduatedTotalCents(15000)).toBe(185800)
    expect(graduatedTotalCents(50000)).toBe(500800)
  })

  it('prices the worked example of 1,200 people at 383.00 euros', () => {
    expect(graduatedTotalCents(1200)).toBe(38300)
  })

  // The half-cent case: 1,001 people adds one person at 0.125 euro, so the total is
  // 358.125 and must round once, at the end, to 358.13, not 358.12 (per-band rounding).
  it('rounds the whole total once, not band by band', () => {
    expect(graduatedTotalCents(1001)).toBe(35813)
  })

  // Only the boundaries that have a published rate on both sides: above QUOTE_REQUIRED_ABOVE
  // there is no public price at all, which the next test pins down.
  it('is monotonic across every band boundary', () => {
    for (const edge of [100, 500, 1000, 5000, 15000]) {
      expect(graduatedTotalCents(edge + 1)).toBeGreaterThan(graduatedTotalCents(edge))
    }
  })

  it('prices 50 at 3300 and 51 at 3366 (both in band 1)', () => {
    expect(graduatedTotalCents(50)).toBe(3300)
    expect(graduatedTotalCents(51)).toBe(3366)
  })

  it('returns zero above the quote threshold, where no public rate exists', () => {
    expect(graduatedTotalCents(50001)).toBe(0)
    expect(graduatedTotalCents(120000)).toBe(0)
  })
})

describe('bandBreakdown', () => {
  it('splits 1,200 people into the four bands they span', () => {
    expect(bandBreakdown(1200)).toEqual([
      { from: 1, to: 100, people: 100, rateHundredthsOfCent: 6600, subtotalHundredths: 660000 },
      { from: 101, to: 500, people: 400, rateHundredthsOfCent: 4300, subtotalHundredths: 1720000 },
      { from: 501, to: 1000, people: 500, rateHundredthsOfCent: 2400, subtotalHundredths: 1200000 },
      { from: 1001, to: 1200, people: 200, rateHundredthsOfCent: 1250, subtotalHundredths: 250000 },
    ])
  })

  it('returns band lines for free-zone voter counts', () => {
    expect(bandBreakdown(50)).toEqual([
      { from: 1, to: 50, people: 50, rateHundredthsOfCent: 6600, subtotalHundredths: 330000 },
    ])
  })

  it('is empty only above the quote threshold', () => {
    expect(bandBreakdown(50001)).toEqual([])
    expect(bandBreakdown(120000)).toEqual([])
  })
})

describe('pricingZone', () => {
  it('maps every threshold to its zone', () => {
    expect(pricingZone(1)).toBe('free')
    expect(pricingZone(10)).toBe('free')
    expect(pricingZone(50)).toBe('free')
    expect(pricingZone(51)).toBe('standard')
    expect(pricingZone(15000)).toBe('standard')
    expect(pricingZone(15001)).toBe('dedicated')
    expect(pricingZone(50000)).toBe('dedicated')
    expect(pricingZone(50001)).toBe('quote')
  })

  it('returns free for 50 and standard for 51', () => {
    expect(pricingZone(50)).toBe('free')
    expect(pricingZone(51)).toBe('standard')
  })
})

describe('normaliseDigits', () => {
  it('converts Devanagari digits to ASCII', () => {
    expect(normaliseDigits('१२००')).toBe('1200')
  })

  it('converts Arabic-Indic digits to ASCII', () => {
    expect(normaliseDigits('٣٤')).toBe('34')
  })

  it('converts Extended Arabic-Indic digits to ASCII', () => {
    expect(normaliseDigits('۱۲۳')).toBe('123')
  })

  it('leaves ASCII digits unchanged', () => {
    expect(normaliseDigits('1200')).toBe('1200')
  })
})

describe('parseVoters', () => {
  it('strips grouping separators from "about 1,200 members"', () => {
    expect(parseVoters('about 1,200 members')).toBe(1200)
  })

  it('returns null for an empty string', () => {
    expect(parseVoters('')).toBeNull()
  })

  it('returns null when there are no digits', () => {
    expect(parseVoters('abc')).toBeNull()
  })
})

describe('clampVoters', () => {
  it('accepts grouped input and keeps the value in range', () => {
    expect(clampVoters(1200)).toBe(1200)
    expect(clampVoters('1.200')).toBe(1200)
    expect(clampVoters('1,200')).toBe(1200)
    expect(clampVoters('1 200')).toBe(1200)
    expect(clampVoters('')).toBe(1)
    expect(clampVoters('abc')).toBe(1)
    expect(clampVoters(0)).toBe(1)
    expect(clampVoters(-5)).toBe(1)
    expect(clampVoters(1200.9)).toBe(1200)
    expect(clampVoters(99999999)).toBe(1000000)
  })

  it('normalises Devanagari digits', () => {
    expect(clampVoters('१२००')).toBe(1200)
  })

  it('handles space-separated groups', () => {
    expect(clampVoters('1 200')).toBe(1200)
  })

  it('handles apostrophe-separated groups', () => {
    expect(clampVoters("1'200")).toBe(1200)
  })

  it('clamps 0 to 1', () => {
    expect(clampVoters('0')).toBe(1)
  })

  it('clamps above MAX_VOTERS', () => {
    expect(clampVoters(2_000_000)).toBe(MAX_VOTERS)
  })
})

describe('addonsBreakdown', () => {
  it('charges SMS per person and the report per vote', () => {
    expect(addonsBreakdown(1200, { sms: true, certificate: true, branding: false, domain: false })).toEqual([
      { key: 'sms', quantity: 1200, unitCents: 5, oneTime: false, subtotalCents: 6000 },
      { key: 'certificate', quantity: 1, unitCents: 3900, oneTime: false, subtotalCents: 3900 },
    ])
  })

  it('marks branding and the custom domain as one-time', () => {
    const lines = addonsBreakdown(1200, { sms: false, certificate: false, branding: true, domain: true })
    expect(lines.map((line) => [line.key, line.subtotalCents, line.oneTime])).toEqual([
      ['branding', 14900, true],
      ['domain', 9900, true],
    ])
  })
})

describe('vatCents', () => {
  it('applies the Spanish 21% rate to integer cents', () => {
    expect(VAT_RATE).toBe(0.21)
    expect(vatCents(38300)).toBe(8043)
    expect(vatCents(10900)).toBe(2289)
    expect(vatCents(48200)).toBe(10122)
    expect(vatCents(0)).toBe(0)
  })
})

describe('computeEstimate', () => {
  it('prices the default 200 people at 109.00 plus 21% VAT', () => {
    const estimate = computeEstimate(DEFAULT_VOTERS, {})
    expect(estimate.totalThisVoteCents).toBe(10900)
    expect(estimate.oneTimeCents).toBe(0)
    expect(estimate.totalThisVoteWithVatCents).toBe(13189)
  })

  it('adds per-vote add-ons to the vote total and keeps setup separate', () => {
    const estimate = computeEstimate(1200, { sms: true, certificate: true, branding: true, domain: false })
    expect(estimate.voterPriceCents).toBe(38300)
    expect(estimate.totalThisVoteCents).toBe(48200)
    expect(estimate.oneTimeCents).toBe(14900)
    expect(estimate.vatCents).toBe(10122)
    expect(estimate.totalThisVoteWithVatCents).toBe(58322)
    expect(estimate.grandTotalCents).toBe(63100)
    expect(estimate.grandTotalWithVatCents).toBe(76351)
  })

  it('reports the per-person price from the total for this vote', () => {
    expect(computeEstimate(1200, { sms: true, certificate: true }).perPersonHundredthsOfCent).toBe(4017)
    expect(computeEstimate(1200, {}).perPersonHundredthsOfCent).toBe(3192)
    expect(computeEstimate(200, {}).perPersonHundredthsOfCent).toBe(5450)
  })

  it('free zone: voter price is always zero but add-ons are still charged', () => {
    const noAddons = computeEstimate(10, {})
    expect(noAddons.zone).toBe('free')
    expect(noAddons.voterPriceCents).toBe(0)
    expect(noAddons.totalThisVoteCents).toBe(0)
    expect(noAddons.bands).toEqual([])

    const withSms = computeEstimate(50, { sms: true })
    expect(withSms.zone).toBe('free')
    expect(withSms.voterPriceCents).toBe(0)
    expect(withSms.totalThisVoteCents).toBe(250) // 50 x 5 cents

    const withReport = computeEstimate(10, { certificate: true })
    expect(withReport.zone).toBe('free')
    expect(withReport.totalThisVoteCents).toBe(3900)
  })

  it('free zone: voter price is zero and zone is free at 1 and 50 people', () => {
    expect(computeEstimate(1, {}).zone).toBe('free')
    expect(computeEstimate(1, {}).voterPriceCents).toBe(0)
    expect(computeEstimate(50, {}).zone).toBe('free')
    expect(computeEstimate(50, {}).voterPriceCents).toBe(0)
    expect(computeEstimate(51, {}).zone).toBe('standard')
    expect(computeEstimate(51, {}).voterPriceCents).toBe(3366)
  })

  it('publishes no figure above the quote threshold', () => {
    const estimate = computeEstimate(60000, { sms: true, branding: true })
    expect(estimate.zone).toBe('quote')
    expect(estimate.priceAvailable).toBe(false)
    expect(estimate.bands).toEqual([])
    expect(estimate.addons).toEqual([])
    expect(estimate.totalThisVoteCents).toBe(0)
    expect(estimate.oneTimeCents).toBe(0)
    expect(estimate.perPersonHundredthsOfCent).toBe(0)
  })

  it('free zone with SMS: voterPriceCents 0, totalThisVoteCents 200, bands [], addons[0].quantity 40', () => {
    const estimate = computeEstimate(40, { sms: true })
    expect(estimate.voterPriceCents).toBe(0)
    expect(estimate.totalThisVoteCents).toBe(200)
    expect(estimate.bands).toEqual([])
    expect(estimate.addons[0].quantity).toBe(40)
  })
})

describe('constants', () => {
  it('exposes the add-on prices the page advertises', () => {
    expect(ADDONS.sms.unitCents).toBe(5)
    expect(ADDONS.certificate.unitCents).toBe(3900)
    expect(ADDONS.branding.unitCents).toBe(14900)
    expect(ADDONS.domain.unitCents).toBe(9900)
  })
})

describe('perPersonHundredthsOfCent', () => {
  it('is zero when nobody can vote yet', () => {
    expect(perPersonHundredthsOfCent(0, 0)).toBe(0)
  })
})
