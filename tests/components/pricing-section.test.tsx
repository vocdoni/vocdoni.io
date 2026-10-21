// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import { render, screen, waitFor } from '@testing-library/react'
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
  })

  it('renders the section with id="pricing"', () => {
    setup()
    expect(document.getElementById('pricing')).toBeInTheDocument()
  })

  it('default 200 people shows €109, per-person rate and VAT line', async () => {
    setup()
    // There are two €109 occurrences: the spring figure and the vote breakdown row
    await waitFor(() => expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1))
    expect(screen.getByText('€0.545 per person who can vote')).toBeInTheDocument()
    expect(screen.getByText('≈ €131.89 with 21% VAT (Spain)')).toBeInTheDocument()
  })

  it('typing "1.200" switches to 1,200 people and shows €383', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '1.200')
    await waitFor(() => expect(screen.getAllByText('€383').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
  })

  it('typing "50" switches to free zone: shows Free, no + VAT, Create a free account link', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '50')
    await user.tab() // blur to stabilise
    await waitFor(() => expect(screen.getAllByText('Free').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    expect(screen.queryByText('+ VAT')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Create a free account/ })).toBeInTheDocument()
  })

  it('typing "51" shows €33.66', async () => {
    const { user } = setup()
    const input = getPeopleInput()
    await user.clear(input)
    await user.type(input, '51')
    await user.tab()
    await waitFor(() => expect(screen.getAllByText('€33.66').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
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
    const input = getPeopleInput()
    await user.clear(input)
    // Input is focused and empty; voters still 200 → estimate unchanged
    expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1)
    // Do not blur — the value resets only on blur
  })

  it('ticking SMS at 200 people shows €119 and two SMS note occurrences', async () => {
    const { user } = setup()
    const smsCheckbox = screen.getByRole('checkbox', { name: /Verification codes by text message/ })
    await user.click(smsCheckbox)
    await waitFor(() => expect(screen.getAllByText('€119').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
    // SMS note appears in AddonRows (always) and in EstimatePanel (when addon active)
    expect(screen.getAllByText(/Estimated cost in Europe/).length).toBeGreaterThanOrEqual(2)
  })

  it('ticking branding shows One-time setup with €149 and vote total stays €109', async () => {
    const { user } = setup()
    const brandingCheckbox = screen.getByRole('checkbox', { name: /Your logo and colours/ })
    await user.click(brandingCheckbox)
    await waitFor(() => expect(screen.getAllByText('One-time setup').length).toBeGreaterThanOrEqual(1), {
      timeout: 3000,
    })
    expect(screen.getAllByText('€149').length).toBeGreaterThanOrEqual(1)
    // Vote total (big figure) is still €109
    expect(screen.getAllByText('€109').length).toBeGreaterThanOrEqual(1)
  })

  it('live region eventually contains Total for this vote after 400 ms debounce', async () => {
    setup()
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/Total for this vote/), {
      timeout: 1500,
    })
  })

  it('slider ArrowRight from 200 people changes voters to 210', async () => {
    const { user } = setup()
    const slider = screen.getByRole('slider')
    await user.click(slider)
    await user.keyboard('{ArrowRight}')
    // 210 people → 11,330 cents → €113.30 (targetDecimals=2 since 11330 % 100 = 30)
    // Brief note: the delivery brief states "€114" but the computed value is €113.30;
    // using the correct calculated value here.
    await waitFor(() => expect(screen.getAllByText('€113.30').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
  })

  it('slider PageDown from 200 people jumps to 100 people (€66)', async () => {
    const { user } = setup()
    const slider = screen.getByRole('slider')
    await user.click(slider)
    await user.keyboard('{PageDown}')
    await waitFor(() => expect(screen.getAllByText('€66').length).toBeGreaterThanOrEqual(1), { timeout: 3000 })
  })

  it('band table row with aria-current contains 101 - 500 for 200 people', () => {
    setup()
    // Both the desktop <tr> and mobile <li> carry aria-current="true"
    const currentEls = document.querySelectorAll('[aria-current="true"]')
    expect(currentEls.length).toBeGreaterThanOrEqual(1)
    const textContent = Array.from(currentEls)
      .map((el) => el.textContent ?? '')
      .join(' ')
    expect(textContent).toMatch(/101/)
    expect(textContent).toMatch(/500/)
  })

  it('clicking Request this price reveals the form, focuses name field, and fires analytics', async () => {
    const { user } = setup()
    // In standard zone (200 people) the primary CTA is a Button
    const requestBtn = screen.getByRole('button', { name: 'Request this price' })
    await user.click(requestBtn)
    // Form should appear
    await waitFor(() => expect(screen.getByLabelText(/Your name/)).toBeInTheDocument(), { timeout: 2000 })
    // Name input should receive focus via requestAnimationFrame → setFocus('name')
    await waitFor(() => expect(screen.getByLabelText(/Your name/)).toHaveFocus(), { timeout: 2000 })
    expect(trackAnalyticsEvent).toHaveBeenCalledWith(expect.objectContaining({ name: 'pricing_request_opened' }))
  })
})
