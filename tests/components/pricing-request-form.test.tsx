// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

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
import { computeEstimate } from '@/lib/pricing/compute'
import { send } from '@emailjs/browser'

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

const estimate = computeEstimate(1200, {})

type OnSentCallback = (info: { reference: string; hasMessage: boolean }) => void

function setup(onSent?: OnSentCallback) {
  const user = userEvent.setup()
  render(<PricingRequestForm estimate={estimate} locale='en' open onSent={onSent} />)
  return { user }
}

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Your name/), 'Test User')
  await user.type(screen.getByLabelText(/Organisation/), 'Test Org')
  await user.type(screen.getByLabelText(/Email/), 'test@example.com')
}

describe('PricingRequestForm', () => {
  beforeEach(() => {
    stubGlobals()
    vi.clearAllMocks()
    sendMock.mockResolvedValue({} as ReturnType<typeof send> extends Promise<infer T> ? T : never)
  })

  it('renders nothing when open={false}', () => {
    render(<PricingRequestForm estimate={estimate} locale='en' open={false} />)
    expect(screen.queryByLabelText(/Your name/)).not.toBeInTheDocument()
  })

  it('submitting empty form shows three role=alert errors', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert')
      expect(alerts.length).toBeGreaterThanOrEqual(3)
    })
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

    await waitFor(() => expect(screen.getByText('Request received')).toBeInTheDocument(), { timeout: 3000 })
    expect(screen.getByText(/Your reference: VOC-/)).toBeInTheDocument()

    expect(onSent).toHaveBeenCalledTimes(1)
    expect(onSent).toHaveBeenCalledWith({
      reference: expect.stringMatching(/^VOC-/),
      hasMessage: false,
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

  it('when send rejects, shows Send it by email with a mailto: href', async () => {
    sendMock.mockRejectedValueOnce(new Error('network error'))
    const { user } = setup()
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await waitFor(() => expect(screen.getByTestId('recaptcha')).toBeInTheDocument(), { timeout: 3000 })
    await user.click(screen.getByTestId('recaptcha'))

    // The error state renders a link "Send it by email" (exact text) and a paragraph with longer text
    await waitFor(() => expect(screen.getByRole('link', { name: 'Send it by email' })).toBeInTheDocument(), {
      timeout: 3000,
    })
    const mailtoLink = screen.getByRole('link', { name: 'Send it by email' })
    expect(mailtoLink).toHaveAttribute('href', expect.stringMatching(/^mailto:/))
  })
})
