import { getCalApi } from '@calcom/embed-react'
import * as React from 'react'

import { AnalyticsEvents, trackAnalyticsEvent } from '@/lib/analytics'
import {
  CAL_BOOKING_DIALOG_TITLE,
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
  CAL_BOOKING_TRIGGER_CONFIG,
  CAL_BOOKING_UI_CONFIG,
} from '@/lib/cal-booking'
import { cn } from '@/lib/utils'

type CalBookingDialogProps = {
  children: React.ReactNode
  className?: string
  dialogTitle?: string
  triggerAriaLabel: string
  onClick?: () => void
  /**
   * Where this booking trigger sits (`navbar`, `contact`, ...). Reported with
   * both `demo_requested` and `demo_booked`, so the sales-assist funnel can tell
   * which surface produces booked calls rather than just opened dialogs.
   */
  location?: string
}

export function CalBookingDialog({
  children,
  className,
  dialogTitle = CAL_BOOKING_DIALOG_TITLE,
  triggerAriaLabel,
  onClick,
  location,
}: CalBookingDialogProps) {
  // Cal.com is the only place that knows a booking actually completed; without
  // this the funnel can see dialogs opened but never calls booked.
  const locationRef = React.useRef(location)
  locationRef.current = location

  React.useEffect(() => {
    void (async function initCal() {
      const cal = await getCalApi({ namespace: CAL_BOOKING_NAMESPACE })
      cal('ui', CAL_BOOKING_UI_CONFIG)
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          trackAnalyticsEvent({
            name: AnalyticsEvents.DemoBooked,
            props: { location: locationRef.current ?? 'unknown' },
          })
        },
      })
    })()
  }, [])

  const handleClick = () => {
    trackAnalyticsEvent({
      name: AnalyticsEvents.DemoRequested,
      props: { location: location ?? 'unknown' },
    })
    onClick?.()
  }

  return (
    <button
      type='button'
      className={cn(className)}
      aria-label={triggerAriaLabel}
      title={dialogTitle}
      onClick={handleClick}
      data-cal-namespace={CAL_BOOKING_NAMESPACE}
      data-cal-link={CAL_BOOKING_LINK}
      data-cal-config={JSON.stringify(CAL_BOOKING_TRIGGER_CONFIG)}
    >
      {children}
    </button>
  )
}
