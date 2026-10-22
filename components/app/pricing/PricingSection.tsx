'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { AddonRows } from '@/components/app/pricing/AddonRows'
import { EstimatePanel } from '@/components/app/pricing/EstimatePanel'
import { IncludedList } from '@/components/app/pricing/IncludedList'
import { LiveTotalAnnouncer } from '@/components/app/pricing/LiveTotalAnnouncer'
import { PeopleControl } from '@/components/app/pricing/PeopleControl'
import { PricingRequestForm } from '@/components/app/pricing/PricingRequestForm'
import { TrustFootnote } from '@/components/app/pricing/TrustFootnote'
import { usePricingEstimate } from '@/components/app/pricing/usePricingEstimate'
import { AnalyticsEvents, trackAnalyticsEvent } from '@/lib/analytics'
import { reportSectionView } from '@/lib/sectionView'

export default function PricingSection() {
  const { t } = useTranslation()
  const locale = (usePageContext().locale as string) ?? 'en'
  const state = usePricingEstimate()
  // Counted rather than boolean so a second click scrolls again and reopens a finished form.
  const [requestOpenCount, setRequestOpenCount] = useState(0)
  const requestOpen = requestOpenCount > 0
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { voters, estimate, status, addons, source } = state

  // Report section view once when 25 % of it enters the viewport.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reportSectionView('pricing', 'app_landing')
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // pricing_changed once a new price arrives (the hook already debounces the requests); the default
  // estimate the page loads with is not a change. Add-ons and source are read at that moment on purpose.
  useEffect(() => {
    if (!estimate || source === null) return
    trackAnalyticsEvent({
      name: AnalyticsEvents.PricingChanged,
      props: {
        people: estimate.voters,
        zone: estimate.zone,
        total_cents: estimate.totalThisVoteCents,
        one_time_cents: estimate.oneTimeCents,
        addon_sms: !!addons.sms,
        addon_certificate: !!addons.certificate,
        addon_branding: !!addons.branding,
        addon_domain: !!addons.domain,
        source,
      },
    })
  }, [estimate])

  // Scroll to the request form after it becomes visible.
  useEffect(() => {
    if (requestOpenCount === 0) return
    if (typeof document === 'undefined') return
    const el = document.getElementById('pricing-request')
    if (el) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
  }, [requestOpenCount, reduced])

  const handleRequest = () => {
    setRequestOpenCount((count) => count + 1)
    trackAnalyticsEvent({
      name: AnalyticsEvents.PricingRequestOpened,
      props: {
        zone: estimate?.zone ?? 'unavailable',
        people: voters,
        total_cents: estimate?.totalThisVoteCents ?? 0,
      },
    })
  }

  const handleSent = ({ hasMessage }: { reference: string; hasMessage: boolean }) => {
    trackAnalyticsEvent({
      name: AnalyticsEvents.PricingRequestSent,
      props: {
        zone: estimate?.zone ?? 'unavailable',
        people: voters,
        total_cents: estimate?.totalThisVoteCents ?? 0,
        has_message: hasMessage,
      },
    })
  }

  return (
    <Section id='pricing' className='bg-muted' ref={sectionRef}>
      <Container>
        <MotionPreset fade slide={{ direction: 'up', offset: 24 }} delay={0} transition={{ duration: 0.5 }}>
          <SectionHeader
            size='section'
            align='center'
            eyebrow={t('pricing.eyebrow', 'Pricing')}
            title={t('pricing.title', 'Pay once per vote. No subscription.')}
            lede={t(
              'pricing.lede',
              'The price depends on how many people can vote, not on how many turn up. Votes with up to 50 people are free, and anonymous, verifiable voting is always included.'
            )}
          />
        </MotionPreset>

        <MotionPreset fade slide={{ direction: 'up', offset: 24 }} delay={0.1} transition={{ duration: 0.5 }}>
          <Card className='mt-10 p-5 sm:p-8 lg:mt-12 lg:p-10'>
            <LiveTotalAnnouncer estimate={estimate} status={status} touched={source !== null} locale={locale} />
            <div className='grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10'>
              {/* Left column: people control stacked above add-on rows */}
              <div className='flex flex-col gap-8'>
                <PeopleControl state={state} locale={locale} />
                <AddonRows state={state} locale={locale} />
              </div>
              {/* Right column: estimate panel, sticky on lg */}
              <div className='lg:sticky lg:top-24 lg:self-start'>
                <EstimatePanel state={state} locale={locale} onRequest={handleRequest} />
              </div>
            </div>
          </Card>
        </MotionPreset>

        <MotionPreset fade slide={{ direction: 'up', offset: 24 }} delay={0.15} transition={{ duration: 0.5 }}>
          <div className='mt-12 lg:mt-16'>
            <IncludedList />
          </div>
        </MotionPreset>

        <div className='mt-10'>
          <TrustFootnote />
        </div>

        <div className='mt-10'>
          <PricingRequestForm
            request={{ voters: estimate?.voters ?? voters, addons, estimate }}
            locale={locale}
            open={requestOpen}
            openCount={requestOpenCount}
            onSent={handleSent}
          />
        </div>
      </Container>
    </Section>
  )
}
