import { describe, expect, it } from 'vitest'
import { estimateFromQuote, type Addons } from '@/lib/pricing/compute'
import { defaultCountry } from '@/lib/pricing/countries'
import { REFERENCE_PATTERN, buildReference } from '@/lib/pricing/reference'
import {
  buildPricingCopyText,
  buildPricingEmailParams,
  buildPricingGmailUrl,
  buildPricingMailto,
  buildPricingOutlookUrl,
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
    pageUrl: 'https://vocdoni.io/ca/pricing',
  }

  it('contains the expected lines for a standard estimate with add-ons', () => {
    const request = priced(1200, { sms: true, certificate: true })
    const output = describeEstimate(request, context)
    expect(output).toContain('People who can vote: 1,200')
    expect(output).toContain('Zone: standard')
    expect(output).toContain('Add-ons: Verification codes by text message, Signed results report (PDF)')
    // 38300 (vote) + 6000 (SMS) + 3900 (report) = 48200 cents, no setup
    expect(output).toContain('Total: EUR 482.00 + VAT\n  This vote: EUR 482.00\n')
    expect(output).not.toContain('One-time setup')
    expect(output).not.toContain('VAT 21%')
    expect(output).toContain('Locale: ca')
    expect(output).toContain('Page: https://vocdoni.io/ca/pricing')
  })

  it('splits the total into this vote and the one-time setup, and puts the full total in the subject', () => {
    const request: RequestedPrice = {
      voters: 200,
      addons: { sms: true, branding: true },
      estimate: estimateFromQuote(200, makeQuote({ base: 10900, smsTwoFA: 1000, branding: 14900 })),
    }
    const output = describeEstimate(request, context)
    expect(output).toContain('Add-ons: Verification codes by text message, Your logo and colours')
    expect(output).toContain('Total: EUR 268.00 + VAT\n  This vote: EUR 119.00\n  One-time setup: EUR 149.00')
    expect(buildPricingSubject(request, 'VOC-2610-K7P3')).toBe(
      'Pricing request VOC-2610-K7P3: 200 people, EUR 268.00 + VAT'
    )
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
  const context = { reference: 'VOC-2610-K7P3', locale: 'en', pageUrl: 'https://vocdoni.io/en/pricing' }
  const request: RequestedPrice = { voters: 1200, addons: { sms: true, branding: false }, estimate: null }

  it('still names the count and the add-ons, and asks for a quote instead of a figure', () => {
    const output = describeEstimate(request, context)
    expect(output).toContain('People who can vote: 1,200')
    expect(output).toContain('Zone: unknown')
    expect(output).toContain('Add-ons: Verification codes by text message\n')
    expect(output).toContain('Total: the calculator could not get a price, please quote')
    expect(output).not.toContain('EUR')
  })

  it('says so in the subject', () => {
    expect(buildPricingSubject(request, 'VOC-2610-K7P3')).toBe(
      'Pricing request VOC-2610-K7P3: 1,200 people, price unavailable'
    )
  })
})

describe('describeEstimate in the quote zone', () => {
  const context = { reference: 'VOC-2610-K7P3', locale: 'en', pageUrl: 'https://vocdoni.io/en/pricing' }

  it('keeps the typed count and hides the slider sentinel', () => {
    expect(describeEstimate(priced(80000), context)).toContain(
      'People who can vote: 80,000 (more than 50,000: on request)'
    )
    expect(describeEstimate(priced(50001), context)).toContain('People who can vote: more than 50,000')
  })

  it('lists the add-ons the visitor chose, as the other zones do', () => {
    const output = describeEstimate(priced(60000, { sms: true, certificate: true }), context)
    expect(output).toContain('Add-ons: Verification codes by text message, Signed results report (PDF)')
    expect(output).not.toContain('n/a')
  })
})

describe('buildPricingEmailParams', () => {
  const request = priced(1200, { sms: true, certificate: true })
  const context = {
    reference: 'VOC-2610-K7P3',
    locale: 'ca',
    pageUrl: 'https://vocdoni.io/ca/pricing',
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

  it('puts the country, in English, above the estimate block', () => {
    const params = buildPricingEmailParams({ ...values, country: 'DE' }, request, context, 'token123')
    expect(params.message).toContain('Hello\n\nCountry: Germany (DE)\nPeople who can vote: 1,200')
  })

  it('collapses CRLF in single-line fields', () => {
    const v = { ...values, name: 'Jane\r\nSmith' }
    const params = buildPricingEmailParams(v, request, context, 'token123')
    expect(params.name).toBe('Jane Smith')
    expect(params.name).not.toContain('\n')
  })
})

describe('webmail and copy fallbacks', () => {
  const request = priced(1200)
  const context = { reference: 'VOC-2610-K7P3', locale: 'en', pageUrl: 'https://vocdoni.io/en/pricing' }
  const values = { name: 'Jane', email: 'jane@example.com', organization: 'Org', message: 'Hi', website: '' }

  it('prefills a Gmail compose window with the same subject and body', () => {
    const url = new URL(buildPricingGmailUrl(values, request, context))
    expect(url.origin + url.pathname).toBe('https://mail.google.com/mail/')
    expect(url.searchParams.get('view')).toBe('cm')
    expect(url.searchParams.get('to')).toBe('contact@vocdoni.org')
    expect(url.searchParams.get('su')).toBe(buildPricingSubject(request, 'VOC-2610-K7P3'))
    expect(url.searchParams.get('body')).toContain('Hi\n\nPeople who can vote: 1,200')
  })

  it('prefills an Outlook compose window with the same subject and body', () => {
    const url = new URL(buildPricingOutlookUrl(values, request, context))
    expect(url.origin + url.pathname).toBe('https://outlook.office.com/mail/deeplink/compose')
    expect(url.searchParams.get('to')).toBe('contact@vocdoni.org')
    expect(url.searchParams.get('subject')).toBe(buildPricingSubject(request, 'VOC-2610-K7P3'))
    expect(url.searchParams.get('body')).toContain('People who can vote: 1,200')
  })

  it('encodes spaces as %20 in the Outlook link, never as "+", which Outlook shows literally', () => {
    const link = buildPricingOutlookUrl(values, request, context)
    expect(link.split('?')[1]).not.toContain('+')
    expect(link).toContain('subject=Pricing%20request%20VOC-2610-K7P3%3A%201%2C200%20people')
    expect(decodeURIComponent(link.split('subject=')[1].split('&')[0])).toBe(
      buildPricingSubject(request, 'VOC-2610-K7P3')
    )
  })

  it('copies the subject line, a blank line, then the body', () => {
    const text = buildPricingCopyText(values, request, context)
    expect(text.startsWith(`${buildPricingSubject(request, 'VOC-2610-K7P3')}\n\nHi\n\n`)).toBe(true)
  })
})

describe('buildPricingMailto', () => {
  it('starts with mailto:contact@vocdoni.org?subject=', () => {
    const request = priced(1200)
    const context = {
      reference: 'VOC-2610-K7P3',
      locale: 'en',
      pageUrl: 'https://vocdoni.io/en/pricing',
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
      pageUrl: 'https://vocdoni.io/en/pricing',
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

describe('defaultCountry', () => {
  it('is Spain for the Iberian languages and English, and the obvious country for the rest', () => {
    expect(['es', 'ca', 'eu', 'en'].map(defaultCountry)).toEqual(['ES', 'ES', 'ES', 'ES'])
    expect(defaultCountry('pt-br')).toBe('BR')
    expect(defaultCountry('pt')).toBe('PT')
    expect(defaultCountry('fr')).toBe('FR')
  })
})
