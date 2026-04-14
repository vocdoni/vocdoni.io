import { describe, expect, it } from 'vitest'

import {
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
  CAL_BOOKING_TRIGGER_CONFIG,
  CAL_BOOKING_UI_CONFIG,
  CAL_BOOKING_DIALOG_TITLE,
} from '@/lib/cal-booking'

describe('cal booking config', () => {
  it('uses the shared cal.com event settings and dialog title', () => {
    expect(CAL_BOOKING_NAMESPACE).toBe('first')
    expect(CAL_BOOKING_LINK).toBe('ferran-vocdoni/first')
    expect(CAL_BOOKING_TRIGGER_CONFIG).toEqual({
      layout: 'month_view',
      useSlotsViewOnSmallScreen: 'true',
    })
    expect(CAL_BOOKING_UI_CONFIG).toEqual({
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
    expect(CAL_BOOKING_DIALOG_TITLE).toBe('Schedule a call')
  })
})
