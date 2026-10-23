import { describe, expect, it } from 'vitest'
import { MAX_VOTERS } from '@/lib/pricing/constants'
import {
  addonPricesFromQuote,
  clampVoters,
  estimateFromQuote,
  normaliseDigits,
  parseVoters,
  perPersonHundredthsOfCent,
} from '@/lib/pricing/compute'

import { PRICING_FIXTURES, QUOTE_ONLY, makeQuote } from './pricing-fixtures'

describe('estimateFromQuote', () => {
  it('maps a priced answer onto the vote total and per-person rate', () => {
    const estimate = estimateFromQuote(200, PRICING_FIXTURES['200'])
    expect(estimate).toMatchObject({
      voters: 200,
      zone: 'standard',
      priceAvailable: true,
      voterPriceCents: 10900,
      addons: [],
      minimumChargeCents: 0,
      totalThisVoteCents: 10900,
      oneTimeCents: 0,
      perPersonHundredthsOfCent: 5450,
    })
  })

  it('keeps one-time setup apart from the total for this vote', () => {
    const estimate = estimateFromQuote(1200, PRICING_FIXTURES['1200 smsTwoFA signedCertificate branding'])
    expect(estimate.voterPriceCents).toBe(38300)
    expect(estimate.addons).toEqual([
      { key: 'sms', oneTime: false, subtotalCents: 6000 },
      { key: 'certificate', oneTime: false, subtotalCents: 3900 },
      { key: 'branding', oneTime: true, subtotalCents: 14900 },
    ])
    expect(estimate.totalThisVoteCents).toBe(48200)
    expect(estimate.oneTimeCents).toBe(14900)
    expect(estimate.totalCents).toBe(63100)
    expect(estimate.perPersonHundredthsOfCent).toBe(4017)
  })

  it('maps the custom URL line to the one-time domain add-on', () => {
    const estimate = estimateFromQuote(200, makeQuote({ base: 10900, customUrl: 9900 }))
    expect(estimate.addons).toEqual([{ key: 'domain', oneTime: true, subtotalCents: 9900 }])
    expect(estimate.totalThisVoteCents).toBe(10900)
    expect(estimate.oneTimeCents).toBe(9900)
  })

  it('is free when the base line is zero', () => {
    const estimate = estimateFromQuote(20, PRICING_FIXTURES['20'])
    expect(estimate.zone).toBe('free')
    expect(estimate.totalThisVoteCents).toBe(0)
    expect(estimate.perPersonHundredthsOfCent).toBe(0)
  })

  it('shows the minimum charge as its own line on a free vote with paid add-ons', () => {
    const estimate = estimateFromQuote(10, PRICING_FIXTURES['10 smsTwoFA'])
    expect(estimate.zone).toBe('free')
    expect(estimate.voterPriceCents).toBe(0)
    expect(estimate.addons).toEqual([{ key: 'sms', oneTime: false, subtotalCents: 50 }])
    expect(estimate.minimumChargeCents).toBe(50)
    expect(estimate.totalThisVoteCents).toBe(100)
  })

  it('is the dedicated zone, with the price, when a conversation is recommended', () => {
    const estimate = estimateFromQuote(10000, PRICING_FIXTURES['10000'])
    expect(estimate.zone).toBe('dedicated')
    expect(estimate.priceAvailable).toBe(true)
    expect(estimate.totalThisVoteCents).toBe(135800)
  })

  it('reads a quote-only answer as "on request", never as free', () => {
    const estimate = estimateFromQuote(60000, QUOTE_ONLY)
    expect(estimate.zone).toBe('quote')
    expect(estimate.priceAvailable).toBe(false)
    expect(estimate.addons).toEqual([])
    expect(estimate.totalThisVoteCents).toBe(0)
  })
})

describe('addonPricesFromQuote', () => {
  it('reads the unit prices from the price-list answer', () => {
    expect(addonPricesFromQuote(PRICING_FIXTURES['100 smsTwoFA signedCertificate branding customUrl'])).toEqual({
      sms: 500, // 0.05 EUR per person, in hundredths of a cent
      certificate: 3900,
      branding: 14900,
      domain: 9900,
    })
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

describe('perPersonHundredthsOfCent', () => {
  it('is zero when nobody can vote yet', () => {
    expect(perPersonHundredthsOfCent(0, 0)).toBe(0)
  })
})
