// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, onTestFinished } from 'vitest'

import { makeMockT } from './helpers/i18n-mock'

const t = makeMockT()

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ locale: 'en', urlLogical: '/app' }),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t, i18n: { language: 'en' } }),
  Trans: ({ defaults }: { defaults?: string }) => <>{String(defaults ?? '').replace(/<\/?[a-z]+>/g, '')}</>,
}))

vi.mock('@calcom/embed-react', () => ({
  getCalApi: async () => () => {},
}))

vi.mock('@emailjs/browser', () => ({
  send: vi.fn(),
}))

vi.mock('react-google-recaptcha', () => ({
  default: React.forwardRef(function MockReCAPTCHA(
    props: { onChange: (token: string) => void },
    _ref: React.ForwardedRef<unknown>
  ) {
    React.useImperativeHandle(_ref, () => ({ reset: () => {} }))
    return (
      <button type='button' data-testid='recaptcha' onClick={() => props.onChange('token')}>
        captcha
      </button>
    )
  }),
}))

vi.mock('@/lib/analytics', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/analytics')>()
  return {
    ...original,
    trackAnalyticsEvent: vi.fn(),
  }
})

vi.mock('@/lib/sectionView', () => ({
  reportSectionView: vi.fn(),
}))

vi.mock('motion/react', async (importOriginal) => {
  const original = await importOriginal<typeof import('motion/react')>()
  return {
    ...original,
    useReducedMotion: () => true,
  }
})

// Must come after vi.mock calls
import { PricingRequestForm } from '@/components/app/pricing/PricingRequestForm'
import { estimateFromQuote } from '@/lib/pricing/compute'
import type { RequestedPrice } from '@/lib/pricing/request'
import { send } from '@emailjs/browser'
import { trackAnalyticsEvent } from '@/lib/analytics'
import { getCookieConsent, setCookieConsent } from '@/lib/cookieConsent'

import { PRICING_FIXTURES } from '../lib/pricing-fixtures'

const sendMock = vi.mocked(send)

function stubGlobals() {
  vi.stubGlobal('EMAILJS_PUBLIC_KEY', 'pk-test')
  vi.stubGlobal('EMAILJS_SERVICE_ID', 'svc-test')
  vi.stubGlobal('EMAILJS_TEMPLATE_ID', 'tmpl-test')
  vi.stubGlobal('RECAPTCHA_SITE_KEY', 'rckey-test')
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    }
  )
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    }
  )
  Element.prototype.scrollIntoView = vi.fn()
}

const request: RequestedPrice = {
  voters: 1200,
  addons: {},
  estimate: estimateFromQuote(1200, PRICING_FIXTURES['1200']),
}

type OnSentCallback = (info: { reference: string; hasMessage: boolean }) => void

function setup(onSent?: OnSentCallback) {
  const user = userEvent.setup()
  render(<PricingRequestForm request={request} locale='en' open onSent={onSent} />)
  return { user }
}

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Your name/), 'Test User')
  await user.type(screen.getByLabelText(/Organisation/), 'Test Org')
  await user.type(screen.getByLabelText(/Email/), 'test@example.com')
  await user.selectOptions(screen.getByLabelText(/Country/), 'ES')
}

describe('PricingRequestForm', () => {
  beforeEach(() => {
    stubGlobals()
    vi.clearAllMocks()
    sendMock.mockResolvedValue({} as ReturnType<typeof send> extends Promise<infer T> ? T : never)
  })

  it('renders nothing when open={false}', () => {
    render(<PricingRequestForm request={request} locale='en' open={false} />)
    expect(screen.queryByLabelText(/Your name/)).not.toBeInTheDocument()
  })

  it('reports started once, then which fields failed validation, with no personal data', async () => {
    const { user } = setup()
    await user.type(screen.getByLabelText(/Your name/), 'Jane')
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    const calls = vi.mocked(trackAnalyticsEvent).mock.calls.map(([event]) => event)
    expect(calls.filter((event) => event.name === 'pricing_request_started')).toHaveLength(1)
    expect(calls).toContainEqual({
      name: 'pricing_request_invalid',
      props: { zone: 'standard', people: 1200, fields: 'email,organization' },
    })
    expect(JSON.stringify(calls)).not.toContain('Jane')
  })

  it('submitting empty form shows three role=alert errors', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert')
      expect(alerts.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('does not send without a country', async () => {
    const { user } = setup()
    await fillForm(user)
    await user.selectOptions(screen.getByLabelText(/Country/), '')
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    expect(await screen.findByText('Select your country', { selector: '[role=alert]' })).toBeInTheDocument()
    expect(screen.queryByTestId('recaptcha')).not.toBeInTheDocument()
  })

  it('filling required fields and submitting shows the reCAPTCHA stub', async () => {
    const { user } = setup()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await waitFor(() => expect(screen.getByTestId('recaptcha')).toBeInTheDocument(), { timeout: 3000 })
  })

  it('clicking captcha calls send with correct subject and message, then shows success state', async () => {
    const onSent = vi.fn<OnSentCallback>()
    const { user } = setup(onSent)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await waitFor(() => expect(screen.getByTestId('recaptcha')).toBeInTheDocument(), { timeout: 3000 })
    await user.click(screen.getByTestId('recaptcha'))

    await waitFor(
      () => {
        expect(sendMock).toHaveBeenCalledTimes(1)
      },
      { timeout: 3000 }
    )

    const [, , params] = sendMock.mock.calls[0]
    expect((params as Record<string, string>).subject).toMatch(/^Pricing request VOC-\d{4}-[23456789A-HJ-NP-Z]{4}: /)
    expect((params as Record<string, string>).message).toContain('People who can vote: 1,200')
    expect((params as Record<string, string>).message).toContain('Country: Spain (ES)')

    await waitFor(() => expect(screen.getByText('Request received')).toBeInTheDocument(), { timeout: 3000 })
    expect(screen.getByText(/Your reference: VOC-/)).toBeInTheDocument()

    expect(onSent).toHaveBeenCalledTimes(1)
    expect(onSent).toHaveBeenCalledWith({
      reference: expect.stringMatching(/^VOC-/),
      hasMessage: false,
      country: 'ES',
    })
  })

  it('a filled honeypot field reaches success state without calling send or onSent', async () => {
    const onSent = vi.fn<OnSentCallback>()
    const { user } = setup(onSent)
    await fillForm(user)

    // The honeypot is aria-hidden and sr-only; access via DOM query
    const honeypot = document.querySelector<HTMLInputElement>('input[name="website"]')
    expect(honeypot).not.toBeNull()
    fireEvent.change(honeypot!, { target: { value: 'bot@spammer.com' } })

    await user.click(screen.getByRole('button', { name: /Send request/ }))

    await waitFor(() => expect(screen.getByText('Request received')).toBeInTheDocument(), { timeout: 3000 })
    expect(sendMock).not.toHaveBeenCalled()
    expect(onSent).not.toHaveBeenCalled()
  })

  it('sends a request without a price when the calculator could not get one', async () => {
    const user = userEvent.setup()
    render(<PricingRequestForm request={{ voters: 1200, addons: {}, estimate: null }} locale='en' open />)
    expect(screen.queryByText(/\+ VAT/)).not.toBeInTheDocument()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await user.click(await screen.findByTestId('recaptcha'))
    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1))
    const [, , params] = sendMock.mock.calls[0]
    expect((params as Record<string, string>).subject).toMatch(/: 1,200 people, price unavailable$/)
  })

  it('when send rejects, offers Gmail, Outlook, a mailto: link and a copy button', async () => {
    sendMock.mockRejectedValueOnce(new Error('network error'))
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    onTestFinished(() => consoleError.mockRestore())
    const { user } = setup()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await waitFor(() => expect(screen.getByTestId('recaptcha')).toBeInTheDocument(), { timeout: 3000 })
    await user.click(screen.getByTestId('recaptcha'))

    await waitFor(() => expect(screen.getByRole('link', { name: 'Other email app' })).toBeInTheDocument(), {
      timeout: 3000,
    })
    expect(consoleError).toHaveBeenCalledWith('[Pricing Request] EmailJS send error:', expect.any(Error))
    expect(screen.getByRole('link', { name: 'Other email app' })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:contact@vocdoni\.org\?/)
    )
    expect(screen.getByRole('link', { name: 'Open in Gmail' })).toHaveAttribute(
      'href',
      expect.stringMatching(/^https:\/\/mail\.google\.com\/mail\/\?view=cm/)
    )
    expect(screen.getByRole('link', { name: 'Open in Outlook' })).toHaveAttribute(
      'href',
      expect.stringMatching(/^https:\/\/outlook\.office\.com\/mail\/deeplink\/compose\?/)
    )

    expect(trackAnalyticsEvent).toHaveBeenCalledWith({
      name: 'pricing_request_failed',
      props: expect.objectContaining({ reason: 'send_error' }),
    })

    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    await user.click(screen.getByRole('button', { name: 'Copy text' }))
    expect(writeText).toHaveBeenCalledWith(expect.stringMatching(/^Pricing request VOC-.*\n\n.*People who can vote/s))
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument()
    expect(trackAnalyticsEvent).toHaveBeenCalledWith({
      name: 'pricing_request_fallback_used',
      props: expect.objectContaining({ method: 'copy' }),
    })
  })

  it('sending the request accepts cookies, as the note under the form states', async () => {
    setCookieConsent(false)
    const { user } = setup()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    expect(await screen.findByTestId('recaptcha')).toBeInTheDocument()
    expect(getCookieConsent()).toBe('accepted')
  })

  it('success offers a free account only when nothing is charged', async () => {
    const sendAndWaitForSuccess = async (fixture: string) => {
      const free: RequestedPrice = {
        voters: 10,
        addons: {},
        estimate: estimateFromQuote(10, PRICING_FIXTURES[fixture]),
      }
      const user = userEvent.setup()
      const { unmount } = render(<PricingRequestForm request={free} locale='en' open />)
      await fillForm(user)
      await user.click(screen.getByRole('button', { name: /Send request/ }))
      await user.click(await screen.findByTestId('recaptcha'))
      expect(await screen.findByText('Request received')).toBeInTheDocument()
      return unmount
    }

    const unmountFree = await sendAndWaitForSuccess('10')
    expect(screen.getByRole('link', { name: /Create your free account/ })).toBeInTheDocument()
    unmountFree()

    await sendAndWaitForSuccess('10 branding')
    expect(screen.queryByRole('link', { name: /Create your free account/ })).not.toBeInTheDocument()
  })
})
