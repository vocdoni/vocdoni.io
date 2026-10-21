import { describe, expect, it } from 'vitest'
import { computeEstimate } from '@/lib/pricing/compute'
import { REFERENCE_PATTERN, buildReference } from '@/lib/pricing/reference'
import {
  buildPricingEmailParams,
  buildPricingMailto,
  buildPricingSubject,
  describeEstimate,
} from '@/lib/pricing/request'

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
    const estimate = computeEstimate(1200)
    expect(buildPricingSubject(estimate, 'VOC-2610-K7P3')).toBe(
      'Pricing request VOC-2610-K7P3: 1,200 people, EUR 383.00 + VAT'
    )
  })

  it('formats the quote zone subject ending with "more than 50,000 people, on request"', () => {
    const estimate = computeEstimate(60000)
    const subject = buildPricingSubject(estimate, 'VOC-2610-K7P3')
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
    const estimate = computeEstimate(1200, { sms: true, certificate: true })
    const output = describeEstimate(estimate, context)
    expect(output).toContain('People who can vote: 1,200')
    expect(output).toContain('Zone: standard')
    expect(output).toContain('Add-ons: sms, certificate')
    // 38300 (voter) + 6000 (SMS) + 3900 (certificate) = 48200 cents = EUR 482.00
    // Brief says 443.00 (VAT 93.03) which matches only SMS; certificate was omitted in the brief
    expect(output).toContain('Total for this vote: EUR 482.00 + VAT')
    expect(output).toContain('VAT 21%: EUR 101.22')
    expect(output).toContain('One-time setup: EUR 0.00')
    expect(output).toContain('Locale: ca')
    expect(output).toContain('Page: https://vocdoni.io/ca/app#pricing')
  })

  it('contains no HTML', () => {
    const estimate = computeEstimate(1200, { sms: true, certificate: true })
    const output = describeEstimate(estimate, context)
    expect(output).not.toContain('<')
  })

  it('shows "none" when there are no add-ons', () => {
    const estimate = computeEstimate(1200)
    const output = describeEstimate(estimate, context)
    expect(output).toContain('Add-ons: none')
  })
})

describe('buildPricingEmailParams', () => {
  const estimate = computeEstimate(1200, { sms: true, certificate: true })
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
    const params = buildPricingEmailParams(values, estimate, context, 'token123')
    const keys = Object.keys(params).sort()
    expect(keys).toEqual(['email', 'g-recaptcha-response', 'message', 'name', 'organization', 'subject', 'time'].sort())
  })

  it('message contains user message, blank line, and estimate block', () => {
    const params = buildPricingEmailParams(values, estimate, context, 'token123')
    expect(params.message.startsWith('Hello\n\n')).toBe(true)
    expect(params.message).toContain('People who can vote: 1,200')
  })

  it('collapses CRLF in single-line fields', () => {
    const v = { ...values, name: 'Jane\r\nSmith' }
    const params = buildPricingEmailParams(v, estimate, context, 'token123')
    expect(params.name).toBe('Jane Smith')
    expect(params.name).not.toContain('\n')
  })
})

describe('buildPricingMailto', () => {
  it('starts with mailto:contact@vocdoni.org?subject=', () => {
    const estimate = computeEstimate(1200)
    const context = {
      reference: 'VOC-2610-K7P3',
      locale: 'en',
      pageUrl: 'https://vocdoni.io/en/app#pricing',
    }
    const values = { name: 'Jane', email: 'jane@example.com', organization: 'Org', message: '', website: '' }
    const mailto = buildPricingMailto(values, estimate, context)
    expect(mailto.startsWith('mailto:contact@vocdoni.org?subject=')).toBe(true)
  })

  it('has no raw spaces or newlines in subject or body', () => {
    const estimate = computeEstimate(1200)
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
    const mailto = buildPricingMailto(values, estimate, context)
    const afterSchema = mailto.slice('mailto:contact@vocdoni.org'.length)
    expect(afterSchema).not.toMatch(/ /)
    expect(afterSchema).not.toMatch(/\n/)
  })
})
