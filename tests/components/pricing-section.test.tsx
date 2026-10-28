// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

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
import PricingSection from '@/components/app/pricing/PricingSection'
import { trackAnalyticsEvent } from '@/lib/analytics'
import { reportSectionView } from '@/lib/sectionView'

import { PRICING_FIXTURES, fixtureKey, mockPricingFetch } from '../lib/pricing-fixtures'

let fetchMock: ReturnType<typeof mockPricingFetch>

/** The `voters` of every price request the calculator sent, leaving out the add-on price list. */
const requestedVoters = () =>
  fetchMock.mock.calls
    .map(([url]) => fixtureKey(url))
    .filter((key) => key !== '100 smsTwoFA signedCertificate branding customUrl')
    .map((key) => Number(key.split(' ')[0]))

// Globals expected by PricingRequestForm at render time
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
  // jsdom has no pointer capture; the Radix slider calls these on pointerdown and would throw
  // an uncaught TypeError after the test, which vitest reports as an unhandled error.
  Element.prototype.hasPointerCapture = () => false
  Element.prototype.setPointerCapture = () => {}
  Element.prototype.releasePointerCapture = () => {}
}

function setup() {
  const user = userEvent.setup()
  render(<PricingSection />)
  return { user }
}

function getPeopleInput() {
  return screen.getByRole('textbox', { name: 'How many people can vote?' })
}

describe('PricingSection', () => {
  beforeEach(() => {
    stubGlobals()
    vi.clearAllMocks()
    fetchMock = mockPricingFetch()
    vi.stubGlobal('fetch', fetchMock)
  })

  it('renders the headline as the page h1', () => {
    render(<PricingSection />)
    expect(screen.getByRole('heading', { level: 1, name: 'Clear pricing for every vote.' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('reports the section view as the pricing page', () => {
    let callback: IntersectionObserverCallback = () => {}
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          callback = cb
        }
        observe() {}
        disconnect() {}
        unobserve() {}
      }
    )
    setup()
    callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    expect(reportSectionView).toHaveBeenCalledWith('pricing', 'pricing')
  })

  it('renders the section with id="pricing"', () => {
    setup()
    expect(document.getElementById('pricing')).toBeInTheDocument()
  })

  it('shows a loading state, and no figure, until the backend answers', async () => {
    setup()
    expect(screen.getByText('Working out your price')).toBeInTheDocument()
    expect(screen.queryByText(/€/)).not.toBeInTheDocument()
    await waitFor(() => expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1))
    expect(screen.queryByText('Working out your price')).not.toBeInTheDocument()
  })

  it('shows the add-on unit prices the backend sends', async () => {
    setup()
    await waitFor(() => expect(screen.getByText('€0.05 per person on your list')).toBeInTheDocument())
    expect(screen.getByText('€39 per vote')).toBeInTheDocument()
    expect(screen.getByText('€149 once')).toBeInTheDocument()
    expect(screen.getByText('€99 once')).toBeInTheDocument()
  })

  it('default 200 people shows €109 and the per-person rate, without a VAT-included figure', async () => {
    setup()
    // There are two €109 occurrences: the spring figure and the vote breakdown row
    await waitFor(() => expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1))
    expect(screen.getByText('€0.545 per person who can vote')).toBeInTheDocument()
    expect(screen.queryByText(/with 21% VAT/)).not.toBeInTheDocument()
  })

  it('typing "1.200" asks for 1,200 people only once typing settles, and shows €383', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '1.200')
    await waitFor(() => expect(screen.getAllByText('€383').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    // The debounce swallowed the counts in between (1, 12, 120).
    expect(requestedVoters()).toContain(1200)
    expect(requestedVoters()).not.toContain(12)
    expect(requestedVoters()).not.toContain(120)
  })

  it('typing "20" switches to free zone: shows Free, no + VAT, Create a free account link', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '20')
    await user.tab() // blur to stabilise
    await waitFor(() => expect(screen.getAllByText('Free').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    expect(screen.queryByText('+ VAT')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Create a free account/ })).toBeInTheDocument()
  })

  it('shows the minimum charge as its own line on a small vote with text messages', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '10')
    await user.tab()
    await user.click(screen.getByRole('checkbox', { name: /Verification codes by text message/ }))
    await waitFor(() => expect(screen.getByText('Minimum charge')).toBeInTheDocument(), { timeout: 3000 })
    expect(screen.getByText('Any payment is at least €1.')).toBeInTheDocument()
    expect(screen.getAllByText('€1').length).toBeGreaterThanOrEqual(1)
  })

  it('typing "50001" shows On request and Request a quote button', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '50001')
    await user.tab()
    await waitFor(() => expect(screen.getByText('On request')).toBeInTheDocument(), { timeout: 3000 })
    expect(screen.getByRole('button', { name: 'Request a quote' })).toBeInTheDocument()
  })

  it('clearing the input keeps the last estimate (€109) while still focused', async () => {
    const { user } = setup()
    await waitFor(() => expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1))
    const input = getPeopleInput()
    await user.clear(input)
    // Input is focused and empty; voters still 200 → estimate unchanged
    expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1)
    // Do not blur - the value resets only on blur
  })

  it('ticking SMS at 200 people shows €119 and two SMS note occurrences', async () => {
    const { user } = setup()
    const smsCheckbox = screen.getByRole('checkbox', { name: /Verification codes by text message/ })
    await user.click(smsCheckbox)
    await waitFor(() => expect(screen.getAllByText('€119').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    // SMS note appears in AddonRows (always) and in EstimatePanel (when addon active)
    expect(screen.getAllByText(/Estimated cost in Europe/).length).toBeGreaterThanOrEqual(2)
  })

  it('ticking branding makes the headline the total with setup (€258) and keeps the vote row at €109', async () => {
    const { user } = setup()
    const brandingCheckbox = screen.getByRole('checkbox', { name: /Your logo and colours/ })
    await user.click(brandingCheckbox)
    await waitFor(() => expect(screen.getAllByText('One-time setup').length).toBeGreaterThanOrEqual(1), {
      timeout: 3000,
    })
    expect(screen.getAllByText('€149').length).toBeGreaterThanOrEqual(1)
    await waitFor(() => expect(screen.getAllByText('€258').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    // The vote itself is still a €109 row under "This vote"
    expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('This vote').length).toBeGreaterThanOrEqual(1)
  })

  it('a free base line with a paid add-on keeps Request this price as the primary CTA', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '10')
    await user.tab()
    await waitFor(() => expect(screen.getAllByText('Free').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    await user.click(screen.getByRole('checkbox', { name: /Your logo and colours/ }))
    await waitFor(() => expect(screen.getAllByText('€149').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    expect(screen.queryByRole('link', { name: /Create a free account/ })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Request this price/ })).toBeInTheDocument()
  })

  it('live region stays silent on load and announces the total after a change', async () => {
    const { user } = setup()
    expect(screen.getByRole('status')).toHaveTextContent('')
    await user.click(screen.getByRole('button', { name: 'More people' }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/Total for this vote/), {
      timeout: 1500,
    })
  })

  it('names the slider thumb and reads the estimate as its value text', async () => {
    setup()
    const slider = screen.getByRole('slider', { name: 'How many people can vote' })
    expect(slider).toHaveAttribute('aria-valuetext', '200 people')
    await waitFor(() => expect(slider).toHaveAttribute('aria-valuetext', '200 people, €109 plus VAT'))
  })

  it('reads a free vote with a paid setup as the total to pay, not as free', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '10')
    await user.tab()
    await user.click(screen.getByRole('checkbox', { name: /Your logo and colours/ }))
    const slider = screen.getByRole('slider', { name: 'How many people can vote' })
    await waitFor(() => expect(slider).toHaveAttribute('aria-valuetext', '10 people, €149 plus VAT'), {
      timeout: 3000,
    })
  })

  it('slider ArrowRight from 200 people changes voters to 210', async () => {
    const { user } = setup()
    const slider = screen.getByRole('slider')
    await user.click(slider)
    await user.keyboard('{ArrowRight}')
    // 11,330 cents from the backend, shown with two decimals
    await waitFor(() => expect(screen.getAllByText('€113.30').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
  })

  it('slider PageDown from 200 people jumps to 100 people (€66)', async () => {
    const { user } = setup()
    const slider = screen.getByRole('slider')
    await user.click(slider)
    await user.keyboard('{PageDown}')
    await waitFor(() => expect(screen.getAllByText('€66').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
  })

  it('clicking Request this price reveals the form, focuses name field, and fires analytics', async () => {
    const { user } = setup()
    await waitFor(() => expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1))
    // In standard zone (200 people) the primary CTA is a Button
    const requestBtn = screen.getByRole('button', { name: 'Request this price' })
    await user.click(requestBtn)
    // Form should appear
    await waitFor(() => expect(screen.getByLabelText(/Your name/)).toBeInTheDocument(), { timeout: 2000 })
    // Name input should receive focus via requestAnimationFrame → setFocus('name')
    await waitFor(() => expect(screen.getByLabelText(/Your name/)).toHaveFocus(), { timeout: 2000 })
    expect(trackAnalyticsEvent).toHaveBeenCalledWith({
      name: 'pricing_request_opened',
      props: expect.objectContaining({ source: 'estimate_panel' }),
    })
  })

  it('reports pricing_changed with the backend total after a change, not on load', async () => {
    const { user } = setup()
    await waitFor(() => expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1))
    expect(trackAnalyticsEvent).not.toHaveBeenCalledWith(expect.objectContaining({ name: 'pricing_changed' }))
    await user.click(screen.getByRole('checkbox', { name: /Verification codes by text message/ }))
    await waitFor(() =>
      expect(trackAnalyticsEvent).toHaveBeenCalledWith({
        name: 'pricing_changed',
        props: expect.objectContaining({ people: 200, total_cents: 11900, addon_sms: true, source: 'addon' }),
      })
    )
  })

  it('ignores a stale answer that lands after a newer one', async () => {
    // The answer for 200 people is held back, and ignores the abort, until the one for 1,200 is on screen.
    let release200: () => void = () => {}
    let signal200: AbortSignal | undefined
    const serve = mockPricingFetch()
    fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (fixtureKey(url) !== '200') return serve(url)
      signal200 = init?.signal ?? undefined
      await new Promise<void>((resolve) => (release200 = resolve))
      return serve(url)
    })
    vi.stubGlobal('fetch', fetchMock)

    const { user } = setup()
    await waitFor(() => expect(requestedVoters()).toContain(200))
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '1200')
    await waitFor(() => expect(screen.getAllByText('€383').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    expect(signal200?.aborted).toBe(true)

    release200()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(screen.getAllByText('€383').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByText('€109')).not.toBeInTheDocument()
  })

  it('shows "price unavailable" and keeps the request path when the backend cannot answer', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{}', { status: 503 }))
    )
    const { user } = setup()
    await waitFor(() => expect(screen.getByText('Price unavailable')).toBeInTheDocument())
    expect(screen.queryByText(/€/)).not.toBeInTheDocument()
    expect(screen.getByText(/We cannot show the price right now/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Request this price' }))
    await waitFor(() => expect(screen.getByLabelText(/Your name/)).toBeInTheDocument())
    expect(screen.getByText('200 people')).toBeInTheDocument()
  })
})
