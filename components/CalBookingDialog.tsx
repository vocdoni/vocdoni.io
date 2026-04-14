import * as React from 'react'
import { getCalApi } from '@calcom/embed-react'

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
}

export function CalBookingDialog({
  children,
  className,
  dialogTitle = CAL_BOOKING_DIALOG_TITLE,
  triggerAriaLabel,
}: CalBookingDialogProps) {
  React.useEffect(() => {
    void (async function initCal() {
      const cal = await getCalApi({ namespace: CAL_BOOKING_NAMESPACE })
      cal('ui', CAL_BOOKING_UI_CONFIG)
    })()
  }, [])

  return (
    <button
      type='button'
      className={cn(className)}
      aria-label={triggerAriaLabel}
      title={dialogTitle}
      data-cal-namespace={CAL_BOOKING_NAMESPACE}
      data-cal-link={CAL_BOOKING_LINK}
      data-cal-config={JSON.stringify(CAL_BOOKING_TRIGGER_CONFIG)}
    >
      {children}
    </button>
  )
}
