import { getCalApi } from '@calcom/embed-react'
import * as React from 'react'

import {
  CAL_BOOKING_DIALOG_TITLE,
  CAL_BOOKING_LINK,
  CAL_BOOKING_NAMESPACE,
  CAL_BOOKING_TRIGGER_CONFIG,
  CAL_BOOKING_UI_CONFIG,
  claimCalBookingListener,
  demoBookedEvent,
  recordDemoRequest,
} from '@/lib/cal-booking'
import { trackAnalyticsEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

type CalBookingDialogProps = {
  children: React.ReactNode
  className?: string
  dialogTitle?: string
  triggerAriaLabel: string
  /** Where this trigger sits, e.g. `navbar_desktop`. Breaks down the funnel. */
  location: string
  onClick?: () => void
}

export function CalBookingDialog({
  children,
  className,
  dialogTitle = CAL_BOOKING_DIALOG_TITLE,
  triggerAriaLabel,
  location,
  onClick,
}: CalBookingDialogProps) {
  React.useEffect(() => {
    void (async function initCal() {
      const cal = await getCalApi({ namespace: CAL_BOOKING_NAMESPACE })
      cal('ui', CAL_BOOKING_UI_CONFIG)

      // Registered once per namespace, not per mounted trigger.
      if (!claimCalBookingListener()) return
      cal('on', {
        action: 'bookingSuccessfulV2',
        callback: () => trackAnalyticsEvent(demoBookedEvent()),
      })
    })()
  }, [])

  return (
    <button
      type='button'
      className={cn(className)}
      aria-label={triggerAriaLabel}
      title={dialogTitle}
      onClick={() => {
        trackAnalyticsEvent(recordDemoRequest(location))
        onClick?.()
      }}
      data-cal-namespace={CAL_BOOKING_NAMESPACE}
      data-cal-link={CAL_BOOKING_LINK}
      data-cal-config={JSON.stringify(CAL_BOOKING_TRIGGER_CONFIG)}
    >
      {children}
    </button>
  )
}
