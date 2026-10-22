import { describe, expect, it } from 'vitest'
import { estimateFromQuote, type Addons } from '@/lib/pricing/compute'
import { REFERENCE_PATTERN, buildReference } from '@/lib/pricing/reference'
import {
  buildPricingEmailParams,
  buildPricingMailto,
  buildPricingSubject,
  describeEstimate,
  type RequestedPrice,
} from '@/lib/pricing/request'

import { PRICING_FIXTURES, QUOTE_ONLY, makeQuote } from './pricing-fixtures'

/** A request carrying the backend's answer for `voters`, the way the section builds it. */
const priced = (voters: number, addons: Addons = {}): RequestedPrice => {
  const quote =
    voters > 50000
      ? QUOTE_ONLY
      : addons.sms && addons.certificate
        ? makeQuote({ base: 38300, smsTwoFA: 6000, signedCertificate: 3900 })
        : PRICING_FIXTURES[String(voters)]
  return { voters, addons, estimate: estimateFromQuote(voters, quote) }
}

describe('buildReference', () => {
  it('matches REFERENCE_PATTERN', () => {
    const ref = buildReference(new Date('2026-10-21T10:00:00Z'), () => new Uint8Array([0, 1, 2, 3]))
    expect(ref).toMatch(REFERENCE_PATTERN)
  })

  it('starts with VOC-2610-', () => {
    const ref = buildReference(new Date('2026-10-21T10:00:00Z'), () => new Uint8Array([0, 1, 2, 3]))
    expect(ref.startsWith('VOC-2610-')).toBe(true)
  })

  it('suffix uses only the 32-char alphabet', () => {
    const ref = buildReference(new Date('2026-10-21T10:00:00Z'), () => new Uint8Array([0, 1, 2, 3]))
    const suffix = ref.slice('VOC-2610-'.length)
    expect(suffix).toMatch(/^[23456789A-HJ-NP-Z]{4}$/)
  })
})

describe('buildPricingSubject', () => {
  it('formats the standard zone subject', () => {
    const request = priced(1200)
    expect(buildPricingSubject(request, 'VOC-2610-K7P3')).toBe(
      'Pricing request VOC-2610-K7P3: 1,200 people, EUR 383.00 + VAT'
    )
  })

  it('formats the quote zone subject ending with "more than 50,000 people, on request"', () => {
    const request = priced(60000)
    const subject = buildPricingSubject(request, 'VOC-2610-K7P3')
    expect(subject.endsWith('more than 50,000 people, on request')).toBe(true)
  })
})

describe('describeEstimate', () => {
  const context = {
    reference: 'VOC-2610-K7P3',
    locale: 'ca',
    pageUrl: 'https://vocdoni.io/ca/app#pricing',
  }

  it('contains the expected lines for a standard estimate with add-ons', () => {
    const request = priced(1200, { sms: true, certificate: true })
    const output = describeEstimate(request, context)
    expect(output).toContain('People who can vote: 1,200')
    expect(output).toContain('Zone: standard')
    expect(output).toContain('Add-ons: sms, certificate')
    // 38300 (vote) + 6000 (SMS) + 3900 (report) = 48200 cents
    expect(output).toContain('Total for this vote: EUR 482.00 + VAT')
    expect(output).toContain('VAT 21%: EUR 101.22')
    expect(output).toContain('One-time setup: EUR 0.00')
    expect(output).toContain('Locale: ca')
    expect(output).toContain('Page: https://vocdoni.io/ca/app#pricing')
  })

  it('contains no HTML', () => {
    const request = priced(1200, { sms: true, certificate: true })
    const output = describeEstimate(request, context)
    expect(output).not.toContain('<')
  })

  it('shows "none" when there are no add-ons', () => {
    const request = priced(1200)
    const output = describeEstimate(request, context)
    expect(output).toContain('Add-ons: none')
  })
})

describe('a request without a price', () => {
  const context = { reference: 'VOC-2610-K7P3', locale: 'en', pageUrl: 'https://vocdoni.io/en/app#pricing' }
  const request: RequestedPrice = { voters: 1200, addons: { sms: true, branding: false }, estimate: null }

  it('still names the count and the add-ons, and asks for a quote instead of a figure', () => {
    const output = describeEstimate(request, context)
    expect(output).toContain('People who can vote: 1,200')
    expect(output).toContain('Zone: unknown')
    expect(output).toContain('Add-ons: sms\n')
    expect(output).toContain('Total for this vote: the calculator could not get a price, please quote')
    expect(output).not.toContain('EUR')
  })

  it('says so in the subject', () => {
    expect(buildPricingSubject(request, 'VOC-2610-K7P3')).toBe(
      'Pricing request VOC-2610-K7P3: 1,200 people, price unavailable'
    )
  })
})

describe('describeEstimate in the quote zone', () => {
  const context = { reference: 'VOC-2610-K7P3', locale: 'en', pageUrl: 'https://vocdoni.io/en/app#pricing' }

  it('keeps the typed count and hides the slider sentinel', () => {
    expect(describeEstimate(priced(80000), context)).toContain(
      'People who can vote: 80,000 (more than 50,000: on request)'
    )
    expect(describeEstimate(priced(50001), context)).toContain('People who can vote: more than 50,000')
  })
})

describe('buildPricingEmailParams', () => {
  const request = priced(1200, { sms: true, certificate: true })
  const context = {
    reference: 'VOC-2610-K7P3',
    locale: 'ca',
    pageUrl: 'https://vocdoni.io/ca/app#pricing',
  }
  const values = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    organization: 'Test Org',
    message: 'Hello',
    website: '',
  }

  it('returns exactly the seven keys matching lib/contactForm.ts#buildEmailJsParams', () => {
    const params = buildPricingEmailParams(values, request, context, 'token123')
    const keys = Object.keys(params).sort()
    expect(keys).toEqual(['email', 'g-recaptcha-response', 'message', 'name', 'organization', 'subject', 'time'].sort())
  })

  it('message contains user message, blank line, and estimate block', () => {
    const params = buildPricingEmailParams(values, request, context, 'token123')
    expect(params.message.startsWith('Hello\n\n')).toBe(true)
    expect(params.message).toContain('People who can vote: 1,200')
  })

  it('collapses CRLF in single-line fields', () => {
    const v = { ...values, name: 'Jane\r\nSmith' }
    const params = buildPricingEmailParams(v, request, context, 'token123')
    expect(params.name).toBe('Jane Smith')
    expect(params.name).not.toContain('\n')
  })
})

describe('buildPricingMailto', () => {
  it('starts with mailto:contact@vocdoni.org?subject=', () => {
    const request = priced(1200)
    const context = {
      reference: 'VOC-2610-K7P3',
      locale: 'en',
      pageUrl: 'https://vocdoni.io/en/app#pricing',
    }
    const values = { name: 'Jane', email: 'jane@example.com', organization: 'Org', message: '', website: '' }
    const mailto = buildPricingMailto(values, request, context)
    expect(mailto.startsWith('mailto:contact@vocdoni.org?subject=')).toBe(true)
  })

  it('has no raw spaces or newlines in subject or body', () => {
    const request = priced(1200)
    const context = {
      reference: 'VOC-2610-K7P3',
      locale: 'en',
      pageUrl: 'https://vocdoni.io/en/app#pricing',
    }
    const values = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      organization: 'Org',
      message: 'Hi there',
      website: '',
    }
    const mailto = buildPricingMailto(values, request, context)
    const afterSchema = mailto.slice('mailto:contact@vocdoni.org'.length)
    expect(afterSchema).not.toMatch(/ /)
    expect(afterSchema).not.toMatch(/\n/)
  })
})
