import { AnalyticsEvents, type AnalyticsEvent } from '@/lib/analytics'

export const CAL_BOOKING_DIALOG_TITLE = 'Schedule a call'
export const CAL_BOOKING_NAMESPACE = 'first'
export const CAL_BOOKING_LINK = 'ferran-vocdoni/first'
export const CAL_BOOKING_UI_CONFIG = {
  hideEventTypeDetails: false,
  layout: 'month_view',
} as const
export const CAL_BOOKING_TRIGGER_CONFIG = {
  layout: 'month_view',
  useSlotsViewOnSmallScreen: 'true',
} as const

/**
 * Cal's `on` handlers are registered per namespace, not per component, and
 * several triggers are mounted at once (the navbar renders a desktop and a
 * mobile one). Registering from every instance would report one `demo_booked`
 * per mounted trigger and inflate the last step of the sales-assist funnel.
 *
 * `bookingSuccessfulV2` also carries no reference to the trigger that opened
 * the dialog, so the location the funnel breaks down by is remembered here at
 * request time instead.
 */
let bookingListenerRegistered = false
let lastRequestedFrom: string | null = null

/** True only for the first caller, which owns registering the Cal listener. */
export function claimCalBookingListener(): boolean {
  if (bookingListenerRegistered) return false
  bookingListenerRegistered = true
  return true
}

export function recordDemoRequest(location: string): AnalyticsEvent {
  lastRequestedFrom = location
  return { name: AnalyticsEvents.DemoRequested, props: { location } }
}

export function demoBookedEvent(): AnalyticsEvent {
  return { name: AnalyticsEvents.DemoBooked, props: { location: lastRequestedFrom ?? 'unknown' } }
}

/** Test seam: the two module-level values above outlive a component remount. */
export function resetCalBookingAnalytics(): void {
  bookingListenerRegistered = false
  lastRequestedFrom = null
}
