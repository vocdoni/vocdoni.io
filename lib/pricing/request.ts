import { PRICING_CONTACT_EMAIL, QUOTE_REQUIRED_ABOVE } from '@/lib/pricing/constants'
import { type Estimate } from '@/lib/pricing/compute'
import { QUOTE_STOP } from '@/lib/pricing/ladder'
import { buildReference } from '@/lib/pricing/reference'

export type PricingRequestValues = {
  name: string
  email: string
  organization: string
  message: string
  website: string
}

export type PricingRequestContext = {
  reference: string
  locale: string
  pageUrl: string
}

/** Formats cents as "EUR 383.00" for use in the sales email (English, currency code style). */
function fmtEur(cents: number): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(cents / 100)
    .replace(/[\u00a0\u202f]/g, ' ') // Intl emits a non-breaking space after the code; plain text wants ASCII
}

/** Formats an integer count with commas for use in the English sales email. */
function fmtPeople(count: number): string {
  return new Intl.NumberFormat('en').format(count)
}

/**
 * Builds a plain-text English description of the estimate for the sales team email.
 * No HTML, no CRLF injection risk (all values are numbers or controlled strings).
 */
export const describeEstimate = (estimate: Estimate, context: PricingRequestContext): string => {
  const lines: string[] = []
  if (estimate.zone === 'quote') {
    // Keep the typed count: it is the number sales needs to quote. The slider's terminal stop is a
    // sentinel, not a count, so it reads as "more than 50,000".
    const limit = fmtPeople(QUOTE_REQUIRED_ABOVE)
    const people =
      estimate.voters === QUOTE_STOP
        ? `more than ${limit}`
        : `${fmtPeople(estimate.voters)} (more than ${limit}: on request)`
    lines.push(`People who can vote: ${people}`)
    lines.push('Zone: quote')
    lines.push('Add-ons: n/a')
    lines.push('Total for this vote: on request')
  } else {
    lines.push(`People who can vote: ${fmtPeople(estimate.voters)}`)
    lines.push(`Zone: ${estimate.zone}`)
    const addonKeys = estimate.addons.map((a) => a.key).join(', ') || 'none'
    lines.push(`Add-ons: ${addonKeys}`)
    lines.push(`Total for this vote: ${fmtEur(estimate.totalThisVoteCents)} + VAT`)
    lines.push(`VAT 21%: ${fmtEur(estimate.vatCents)}`)
    lines.push(`One-time setup: ${fmtEur(estimate.oneTimeCents)}`)
  }
  lines.push(`Locale: ${context.locale}`)
  lines.push(`Page: ${context.pageUrl}`)
  return lines.join('\n')
}

/**
 * Builds the email subject line.
 * Format: "Pricing request VOC-2610-K7P3: 1,200 people, EUR 383.00 + VAT"
 * For the quote zone: "Pricing request VOC-...: more than 50,000 people, on request"
 */
export const buildPricingSubject = (estimate: Estimate, reference: string): string => {
  if (estimate.zone === 'quote') {
    return `Pricing request ${reference}: more than ${fmtPeople(QUOTE_REQUIRED_ABOVE)} people, on request`
  }
  return `Pricing request ${reference}: ${fmtPeople(estimate.voters)} people, ${fmtEur(estimate.totalThisVoteCents)} + VAT`
}

/** Collapses \r and \n to a single space, for use in single-line email fields. */
function collapseCrlf(value: string): string {
  return value.replace(/[\r\n]+/g, ' ')
}

/**
 * Builds the EmailJS template params. The shape matches lib/contactForm.ts#buildEmailJsParams
 * exactly (same seven keys). The message is: user message (CRLF-normalised) + blank line +
 * the estimate block.
 */
export const buildPricingEmailParams = (
  values: PricingRequestValues,
  estimate: Estimate,
  context: PricingRequestContext,
  token: string,
  now: Date = new Date()
): {
  name: string
  email: string
  organization: string
  subject: string
  message: string
  time: string
  'g-recaptcha-response': string
} => {
  const reference = context.reference || buildReference(now)
  const subject = buildPricingSubject(estimate, reference)
  const estimateBlock = describeEstimate(estimate, context)
  const userMessage = values.message.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const message = userMessage ? `${userMessage}\n\n${estimateBlock}` : estimateBlock

  return {
    name: collapseCrlf(values.name),
    email: collapseCrlf(values.email),
    organization: collapseCrlf(values.organization),
    subject,
    message,
    time: now.toISOString(),
    'g-recaptcha-response': token,
  }
}

/**
 * Builds a prefilled mailto: fallback URL for when EmailJS fails.
 * Both subject and body are encodeURIComponent-encoded.
 */
export const buildPricingMailto = (
  values: PricingRequestValues,
  estimate: Estimate,
  context: PricingRequestContext
): string => {
  const subject = buildPricingSubject(estimate, context.reference)
  const estimateBlock = describeEstimate(estimate, context)
  const userMessage = values.message.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const body = userMessage ? `${userMessage}\n\n${estimateBlock}` : estimateBlock

  return `mailto:${PRICING_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
