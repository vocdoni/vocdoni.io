'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { QUOTE_REQUIRED_ABOVE } from '@/lib/pricing/constants'
import { type Estimate } from '@/lib/pricing/compute'
import type { PricingStatus } from '@/components/app/pricing/usePricingEstimate'
import { formatCurrency, formatPeople, formatRate } from '@/lib/pricing/format'

interface LiveTotalAnnouncerProps {
  estimate: Estimate | null
  status: PricingStatus
  /** False until the visitor changes anything: announcing the default estimate unprompted is noise. */
  touched: boolean
  locale: string
}

export function LiveTotalAnnouncer({ estimate, status, touched, locale }: LiveTotalAnnouncerProps) {
  const { t } = useTranslation()
  const [announcedText, setAnnouncedText] = useState('')

  useEffect(() => {
    // Nothing new to say while a price is on its way.
    if (!touched || status === 'loading') return
    const timer = setTimeout(() => {
      let text: string
      if (!estimate) {
        text = t('pricing.panel.unavailable', 'Price unavailable')
      } else if (estimate.zone === 'quote') {
        text = t('pricing.live.quote', 'More than {{limit}} people: on request.', {
          limit: formatPeople(QUOTE_REQUIRED_ABOVE, locale),
        })
      } else if (estimate.zone === 'free' && estimate.totalCents === 0) {
        text = t('pricing.live.free', 'This vote is free.')
      } else if (estimate.oneTimeCents > 0) {
        text = t('pricing.live.total_with_setup', 'Total, setup included: {{total}} plus VAT.', {
          total: formatCurrency(estimate.totalCents, locale),
        })
      } else {
        const total = formatCurrency(estimate.totalThisVoteCents, locale)
        const perPerson = formatRate(estimate.perPersonHundredthsOfCent, locale)
        text = t('pricing.live.total', 'Total for this vote: {{total}} plus VAT. {{perPerson}} per person.', {
          total,
          perPerson,
        })
      }
      setAnnouncedText(text)
    }, 400)

    return () => clearTimeout(timer)
  }, [estimate, status, touched, locale, t])

  return (
    <div role='status' aria-live='polite' aria-atomic='true' className='sr-only'>
      {announcedText}
    </div>
  )
}
