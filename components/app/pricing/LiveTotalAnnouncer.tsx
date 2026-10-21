'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { QUOTE_REQUIRED_ABOVE } from '@/lib/pricing/constants'
import { type Estimate } from '@/lib/pricing/compute'
import { formatCurrency, formatPeople, formatRate } from '@/lib/pricing/format'

interface LiveTotalAnnouncerProps {
  estimate: Estimate
  locale: string
}

export function LiveTotalAnnouncer({ estimate, locale }: LiveTotalAnnouncerProps) {
  const { t } = useTranslation()
  const [announcedText, setAnnouncedText] = useState('')
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      // The page has just loaded: announcing the default estimate unprompted is noise.
      isFirstRender.current = false
      return
    }
    const timer = setTimeout(() => {
      let text: string
      if (estimate.zone === 'quote') {
        text = t('pricing.live.quote', 'More than {{limit}} people: on request.', {
          limit: formatPeople(QUOTE_REQUIRED_ABOVE, locale),
        })
      } else if (estimate.zone === 'free' && estimate.totalThisVoteCents === 0) {
        text = t('pricing.live.free', 'This vote is free.')
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
  }, [estimate, locale, t])

  return (
    <div role='status' aria-live='polite' aria-atomic='true' className='sr-only'>
      {announcedText}
    </div>
  )
}
