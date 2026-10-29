// @vitest-environment jsdom

// The real react-google-recaptcha (no module mock), so the script-load path is the one a browser takes:
// the widget injects `recaptcha/api.js`, and a blocked script surfaces through react-async-script.

import '@testing-library/jest-dom/vitest'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, onTestFinished } from 'vitest'

import { makeMockT } from './helpers/i18n-mock'

const t = makeMockT()

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ locale: 'en', urlLogical: '/pricing' }),
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

vi.mock('@/lib/analytics', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/analytics')>()
  return { ...original, trackAnalyticsEvent: vi.fn() }
})

// Must come after vi.mock calls
import { PricingRequestForm } from '@/components/app/pricing/PricingRequestForm'
import { estimateFromQuote } from '@/lib/pricing/compute'
import type { RequestedPrice } from '@/lib/pricing/request'
import { send } from '@emailjs/browser'
import { trackAnalyticsEvent } from '@/lib/analytics'

import { PRICING_FIXTURES } from '../lib/pricing-fixtures'

const request: RequestedPrice = {
  voters: 1200,
  addons: {},
  estimate: estimateFromQuote(1200, PRICING_FIXTURES['1200']),
}

// The latest injected script: jsdom keeps earlier tests' scripts in the document.
const recaptchaScript = () =>
  [...document.querySelectorAll<HTMLScriptElement>('script[src*="recaptcha/api.js"]')].at(-1) ?? null

describe('PricingRequestForm with the real reCAPTCHA loader', () => {
  beforeEach(() => {
    vi.stubGlobal('EMAILJS_PUBLIC_KEY', 'pk-test')
    vi.stubGlobal('EMAILJS_SERVICE_ID', 'svc-test')
    vi.stubGlobal('EMAILJS_PRICING_TEMPLATE_ID', 'tmpl-pricing-test')
    vi.stubGlobal('RECAPTCHA_SITE_KEY', 'rckey-test')
    vi.clearAllMocks()
  })

  it('loads reCAPTCHA only after pressing send, and offers the email fallbacks when its script is blocked', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    onTestFinished(() => consoleError.mockRestore())

    const user = userEvent.setup()
    render(<PricingRequestForm request={request} locale='en' open />)
    // Nothing from Google before the visitor sends (the cookie notice says sending accepts cookies).
    expect(recaptchaScript()).toBeNull()
    await user.type(screen.getByLabelText(/Your name/), 'Test User')
    await user.type(screen.getByLabelText(/Organisation/), 'Test Org')
    await user.type(screen.getByLabelText(/Email/), 'test@example.com')
    await user.selectOptions(screen.getByLabelText(/Country/), 'ES')
    await user.click(screen.getByRole('button', { name: /Send request/ }))
    await waitFor(() => expect(recaptchaScript()).not.toBeNull())

    // What a blocker or a network failure does to the injected script.
    recaptchaScript()!.onerror?.(new Event('error'))

    expect(await screen.findByRole('link', { name: 'Open in Gmail' })).toBeInTheDocument()
    expect(send).not.toHaveBeenCalled()
    // react-async-script caches the failed script until a reload, so "Try again" would fail at once:
    // the fallback explains it and offers a reload instead.
    expect(screen.getByText(/The security check could not load/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reload the page' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument()
    expect(trackAnalyticsEvent).toHaveBeenCalledWith({
      name: 'pricing_request_failed',
      props: expect.objectContaining({ reason: 'captcha_unavailable' }),
    })
  })
})
