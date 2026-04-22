import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { CalBookingDialog } from '@/components/CalBookingDialog'

vi.mock('@calcom/embed-react', () => ({
  getCalApi: vi.fn(),
}))

describe('CalBookingDialog', () => {
  it('renders a cal trigger button with the official event attributes', () => {
    const html = renderToStaticMarkup(
      <CalBookingDialog triggerAriaLabel='Open booking'>Schedule a call</CalBookingDialog>
    )

    expect(html).toContain('data-cal-namespace="first"')
    expect(html).toContain('data-cal-link="ferran-vocdoni/first"')
    expect(html).toContain(
      'data-cal-config="{&quot;layout&quot;:&quot;month_view&quot;,&quot;useSlotsViewOnSmallScreen&quot;:&quot;true&quot;}"'
    )
  })
})
