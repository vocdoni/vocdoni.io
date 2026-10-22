import { PRICING_CONTACT_EMAIL, QUOTE_REQUIRED_ABOVE } from '@/lib/pricing/constants'
import { type Addons, type Estimate } from '@/lib/pricing/compute'
import { QUOTE_STOP } from '@/lib/pricing/ladder'
import { buildReference } from '@/lib/pricing/reference'

export type PricingRequestValues = {
  name: string
  email: string
  organization: string
  message: string
  website: string
}

/**
 * What the visitor asks about: the count and add-ons they chose and, when the backend answered, its price.
 * `estimate` is null when the price could not be fetched; the request still goes out, without a figure.
 */
export type RequestedPrice = {
  voters: number
  addons: Addons
  estimate: Estimate | null
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
export const describeEstimate = (
  { voters, addons, estimate }: RequestedPrice,
  context: PricingRequestContext
): string => {
  const lines: string[] = []
  if (estimate?.zone === 'quote') {
    // Keep the typed count: it is the number sales needs to quote. The slider's terminal stop is a
    // sentinel, not a count, so it reads as "more than 50,000".
    const limit = fmtPeople(QUOTE_REQUIRED_ABOVE)
    const people =
      voters === QUOTE_STOP ? `more than ${limit}` : `${fmtPeople(voters)} (more than ${limit}: on request)`
    lines.push(`People who can vote: ${people}`)
    lines.push('Zone: quote')
    lines.push('Add-ons: n/a')
    lines.push('Total for this vote: on request')
  } else {
    lines.push(`People who can vote: ${fmtPeople(voters)}`)
    lines.push(`Zone: ${estimate ? estimate.zone : 'unknown'}`)
    const addonKeys = (Object.keys(addons) as (keyof Addons)[]).filter((key) => addons[key]).join(', ') || 'none'
    lines.push(`Add-ons: ${addonKeys}`)
    if (estimate) {
      lines.push(`Total for this vote: ${fmtEur(estimate.totalThisVoteCents)} + VAT`)
      lines.push(`VAT 21%: ${fmtEur(estimate.vatCents)}`)
      lines.push(`One-time setup: ${fmtEur(estimate.oneTimeCents)}`)
    } else {
      lines.push('Total for this vote: the calculator could not get a price, please quote')
    }
  }
  lines.push(`Locale: ${context.locale}`)
  lines.push(`Page: ${context.pageUrl}`)
  return lines.join('\n')
}

/**
 * Builds the email subject line.
 * Format: "Pricing request VOC-2610-K7P3: 1,200 people, EUR 383.00 + VAT"
 * For the quote zone: "Pricing request VOC-...: more than 50,000 people, on request"
 * Without a price: "Pricing request VOC-...: 1,200 people, price unavailable"
 */
export const buildPricingSubject = ({ voters, estimate }: RequestedPrice, reference: string): string => {
  if (estimate?.zone === 'quote') {
    return `Pricing request ${reference}: more than ${fmtPeople(QUOTE_REQUIRED_ABOVE)} people, on request`
  }
  const price = estimate ? `${fmtEur(estimate.totalThisVoteCents)} + VAT` : 'price unavailable'
  return `Pricing request ${reference}: ${fmtPeople(voters)} people, ${price}`
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
  request: RequestedPrice,
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
  const subject = buildPricingSubject(request, reference)
  const estimateBlock = describeEstimate(request, context)
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
  request: RequestedPrice,
  context: PricingRequestContext
): string => {
  const subject = buildPricingSubject(request, context.reference)
  const estimateBlock = describeEstimate(request, context)
  const userMessage = values.message.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const body = userMessage ? `${userMessage}\n\n${estimateBlock}` : estimateBlock

  return `mailto:${PRICING_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
