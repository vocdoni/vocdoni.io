import { beforeEach, describe, expect, it } from 'vitest'

import {
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
  CAL_BOOKING_TRIGGER_CONFIG,
  CAL_BOOKING_UI_CONFIG,
  CAL_BOOKING_DIALOG_TITLE,
  claimCalBookingListener,
  demoBookedEvent,
  recordDemoRequest,
  resetCalBookingAnalytics,
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

describe('sales-assist funnel events', () => {
  beforeEach(() => {
    resetCalBookingAnalytics()
  })

  it('registers the Cal booking listener only once', () => {
    // The navbar mounts a desktop and a mobile trigger at the same time, and
    // Cal's handlers are per namespace: a second registration would report two
    // `demo_booked` events for one booking.
    expect(claimCalBookingListener()).toBe(true)
    expect(claimCalBookingListener()).toBe(false)
    expect(claimCalBookingListener()).toBe(false)
  })

  it('attributes the booking to the trigger that was actually clicked', () => {
    // `bookingSuccessfulV2` carries no reference to the trigger, so the
    // location has to be remembered at request time.
    expect(recordDemoRequest('navbar_desktop')).toEqual({
      name: 'demo_requested',
      props: { location: 'navbar_desktop' },
    })
    expect(demoBookedEvent()).toEqual({ name: 'demo_booked', props: { location: 'navbar_desktop' } })

    recordDemoRequest('contact_page')
    expect(demoBookedEvent()).toEqual({ name: 'demo_booked', props: { location: 'contact_page' } })
  })

  it('still reports a booking that follows no recorded request', () => {
    // A booking can arrive without a click this session (a restored dialog, a
    // direct Cal link); the funnel step must not be dropped for it.
    expect(demoBookedEvent()).toEqual({ name: 'demo_booked', props: { location: 'unknown' } })
  })
})
