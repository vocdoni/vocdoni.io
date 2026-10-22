import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CalBookingDialog } from '@/components/CalBookingDialog'
import { Link } from '@/components/Link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppAuthUrl } from '@/hooks/useAppAuthUrl'
import { perPersonHundredthsOfCent } from '@/lib/pricing/compute'
import type { AddonKey } from '@/lib/pricing/constants'
import { formatCurrency, formatPeople, formatRate } from '@/lib/pricing/format'
import { cn } from '@/lib/utils'
import { useIsClient } from '@/lib/useIsClient'
import type { PricingEstimateState } from '@/components/app/pricing/usePricingEstimate'

interface EstimatePanelProps {
  state: PricingEstimateState
  locale: string
  onRequest: () => void
}

function addonPanelLabel(
  key: AddonKey,
  subtotalCents: number,
  voters: number,
  locale: string,
  t: ReturnType<typeof useTranslation>['t']
): string {
  switch (key) {
    case 'sms':
      return t('pricing.panel.line_sms', 'Text-message codes, {{people}} × {{unit}}', {
        people: formatPeople(voters, locale),
        unit: formatRate(perPersonHundredthsOfCent(subtotalCents, voters), locale),
      })
    case 'certificate':
      return t('pricing.panel.line_certificate', 'Signed results report (PDF)')
    case 'branding':
      return t('pricing.panel.line_branding', 'Your logo and colours')
    case 'domain':
      return t('pricing.panel.line_domain', 'Your own web address')
  }
}

export function EstimatePanel({ state, locale, onRequest }: EstimatePanelProps) {
  const { t } = useTranslation()
  const { estimate, status } = state
  const zone = estimate?.zone
  const totalThisVoteCents = estimate?.totalThisVoteCents ?? 0
  const oneTimeCents = estimate?.oneTimeCents ?? 0
  const addons = estimate?.addons ?? []
  // No price yet (first load, and the prerendered HTML) versus no price at all (the request failed).
  const unavailable = status === 'error'
  const pending = !estimate && !unavailable

  const cents = totalThisVoteCents
  // Lock decimals to the TARGET value so the figure width stays stable during the spring animation.
  const targetDecimals: 0 | 2 = cents % 100 === 0 ? 0 : 2

  // Spring animation - initial state matches SSR exactly
  const [shown, setShown] = useState(cents)
  const reduced = useReducedMotion()
  const mounted = useIsClient()
  const spring = useSpring(cents, { damping: 34, stiffness: 320 })

  useMotionValueEvent(spring, 'change', (v) => {
    setShown(Math.round(v))
  })

  // The first figure after the loading state appears as is rather than counting up from zero.
  const hadFigure = useRef(false)
  useEffect(() => {
    if (!mounted || reduced || !hadFigure.current) {
      spring.jump(cents)
    } else {
      spring.set(cents)
    }
    hadFigure.current = !!estimate
    // The spring reference is stable; mounted, reduced, cents and estimate are the real dependencies.
  }, [cents, mounted, reduced, estimate])

  const isFreeNoCharge = zone === 'free' && cents === 0
  const isQuote = zone === 'quote'
  const showVatLine = !!estimate && !isFreeNoCharge && !isQuote && cents > 0
  const showPerPerson = showVatLine
  const hasOneTime = oneTimeCents > 0

  const signupUrl = useAppAuthUrl('signup')

  const perVoteAddons = addons.filter((a) => !a.oneTime)
  const oneTimeAddons = addons.filter((a) => a.oneTime)

  return (
    <div>
      {/* Dark estimate panel */}
      <div
        aria-busy={status === 'loading'}
        className={cn(
          'rounded-lg bg-surface-dark p-6 text-surface-dark-foreground shadow-inset-top transition-opacity duration-150 sm:p-7',
          // A new price is on its way: keep the last one on screen, slightly dimmed.
          status === 'loading' && estimate && 'opacity-70'
        )}
      >
        {/* Label */}
        <p className='text-[11px] font-semibold uppercase tracking-wider text-surface-dark-foreground/70'>
          {t('pricing.panel.title', 'Your price')}
        </p>

        {/* Big figure */}
        <div className='mt-2 flex items-end gap-2'>
          {unavailable ? (
            <span className='font-serif text-4xl sm:text-5xl'>
              {t('pricing.panel.unavailable', 'Price unavailable')}
            </span>
          ) : pending ? (
            <>
              <span
                aria-hidden
                className='h-12 w-40 rounded-md bg-surface-dark-foreground/15 motion-safe:animate-pulse sm:h-15'
              />
              <span className='sr-only'>{t('pricing.panel.loading', 'Working out your price')}</span>
            </>
          ) : isFreeNoCharge ? (
            <span className='font-serif text-5xl sm:text-6xl'>{t('pricing.panel.free', 'Free')}</span>
          ) : isQuote ? (
            <span className='font-serif text-4xl sm:text-5xl'>{t('pricing.panel.on_request', 'On request')}</span>
          ) : (
            <>
              <span className='text-5xl font-medium leading-none tracking-[-0.02em] tabular-nums sm:text-6xl xl:text-7xl'>
                {formatCurrency(shown, locale, targetDecimals)}
              </span>
              <span className='pb-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-surface-dark-foreground/70'>
                {t('pricing.panel.vat_suffix', '+ VAT')}
              </span>
            </>
          )}
        </div>

        {/* Per-person and with-VAT lines */}
        {showPerPerson && (
          <p className='mt-2 tabular-nums text-base text-surface-dark-foreground/70'>
            {t('pricing.panel.per_person', '{{price}} per person who can vote', {
              price: formatRate(estimate.perPersonHundredthsOfCent, locale),
            })}
          </p>
        )}
        {showVatLine && (
          <p className='text-sm text-surface-dark-foreground/70'>
            {t('pricing.panel.with_vat', '≈ {{total}} with 21% VAT (Spain)', {
              total: formatCurrency(totalThisVoteCents + estimate.vatCents, locale),
            })}
          </p>
        )}

        {unavailable && (
          <p className='mt-4 text-sm text-surface-dark-foreground/80'>
            {t(
              'pricing.panel.unavailable_body',
              'We cannot show the price right now. Request it and we send you the figure within one business day.'
            )}
          </p>
        )}

        {/* Divider */}
        {estimate && <div className='my-4 border-t border-surface-dark-foreground/15' />}

        {/* Breakdown rows */}
        {estimate && (
          <div className='flex flex-col gap-1.5'>
            {/* Vote row */}
            <div className='flex justify-between gap-4 text-sm'>
              <span>
                {t('pricing.panel.line_vote', 'Vote, {{people}} people', {
                  people: formatPeople(estimate.voters, locale),
                })}
              </span>
              <span className='w-[5.5rem] shrink-0 text-right tabular-nums'>
                {isQuote
                  ? '-'
                  : zone === 'free'
                    ? t('pricing.panel.free', 'Free')
                    : formatCurrency(estimate.voterPriceCents, locale)}
              </span>
            </div>

            {/* Per-vote addon rows */}
            {perVoteAddons.map((addon) => (
              <div key={addon.key}>
                <div className='flex justify-between gap-4 text-sm'>
                  <span>{addonPanelLabel(addon.key, addon.subtotalCents, estimate.voters, locale, t)}</span>
                  <span className='w-[5.5rem] shrink-0 text-right tabular-nums'>
                    {formatCurrency(addon.subtotalCents, locale)}
                  </span>
                </div>
                {addon.key === 'sms' && (
                  <p className='mt-0.5 text-[13px] text-surface-dark-foreground/70'>
                    {t(
                      'pricing.addons.sms.note',
                      'Estimated cost in Europe. The final cost per text message can vary by country.'
                    )}
                  </p>
                )}
              </div>
            ))}

            {/* Lifts a small paid vote to the minimum the backend charges */}
            {estimate.minimumChargeCents > 0 && (
              <div>
                <div className='flex justify-between gap-4 text-sm'>
                  <span>{t('pricing.panel.line_minimum_charge', 'Minimum charge')}</span>
                  <span className='w-[5.5rem] shrink-0 text-right tabular-nums'>
                    {formatCurrency(estimate.minimumChargeCents, locale)}
                  </span>
                </div>
                <p className='mt-0.5 text-[13px] text-surface-dark-foreground/70'>
                  {t('pricing.panel.minimum_charge_note', 'A vote with a charge costs at least {{minimum}}.', {
                    minimum: formatCurrency(totalThisVoteCents, locale),
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* One-time block */}
        {estimate && hasOneTime && (
          <div className='mt-4 border-t border-dashed border-surface-dark-foreground/20 pt-4'>
            <p className='mb-2 text-[11px] font-semibold uppercase tracking-wider text-surface-dark-foreground/70'>
              {t('pricing.panel.one_time_title', 'One-time setup')}
            </p>
            <div className='flex flex-col gap-1.5'>
              {oneTimeAddons.map((addon) => (
                <div key={addon.key} className='flex justify-between gap-4 text-sm'>
                  <span>{addonPanelLabel(addon.key, addon.subtotalCents, estimate.voters, locale, t)}</span>
                  <span className='w-[5.5rem] shrink-0 text-right tabular-nums'>
                    {formatCurrency(addon.subtotalCents, locale)}
                  </span>
                </div>
              ))}
              {/* A subtotal only earns its row when there is more than one line to add up. */}
              {oneTimeAddons.length > 1 && (
                <div className='flex justify-between gap-4 text-sm font-medium'>
                  <span>{t('pricing.panel.one_time_title', 'One-time setup')}</span>
                  <span className='w-[5.5rem] shrink-0 text-right tabular-nums'>
                    {formatCurrency(oneTimeCents, locale)}
                  </span>
                </div>
              )}
            </div>
            <p className='mt-2 text-sm text-surface-dark-foreground/70'>
              {t('pricing.panel.one_time_note', 'Paid once, not with every vote.')}
            </p>
          </div>
        )}

        {/* Zone slot: "this vote is free" only while nothing is charged (add-ons still are) */}
        {isFreeNoCharge && (
          <div className='mt-4 flex gap-2 text-sm text-surface-dark-foreground/80'>
            <CheckIcon className='mt-0.5 size-4 shrink-0' aria-hidden />
            <span>{t('pricing.zones.free', 'This vote is free. Votes with up to 25 people are always free.')}</span>
          </div>
        )}
        {zone === 'dedicated' && (
          <div className='mt-4 flex flex-col gap-2 text-sm text-surface-dark-foreground/80'>
            <Badge
              variant='outline'
              className='w-fit border-surface-dark-foreground/25 text-surface-dark-foreground/80'
            >
              {t('pricing.zones.dedicated_badge', 'Large vote')}
            </Badge>
            <span>
              {t(
                'pricing.zones.dedicated',
                'A vote this size usually needs a conversation. The price above holds, and you get a dedicated contact.'
              )}
            </span>
          </div>
        )}
        {zone === 'quote' && (
          <p className='mt-4 text-sm text-surface-dark-foreground/80'>
            {t('pricing.zones.quote', 'Tell us what you need and we send a figure within one business day.')}
          </p>
        )}
      </div>

      {/* CTAs */}
      <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center'>
        {zone === 'free' ? (
          <>
            <Button size='lg' className='w-full sm:w-auto has-[>svg]:px-6' asChild>
              <Link href={signupUrl} ctaId='pricing_free_signup' target='_blank' variant='unstyled'>
                {t('pricing.cta.create_account', 'Create a free account')}
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
            <button
              type='button'
              onClick={onRequest}
              className='inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            >
              {t('pricing.cta.request_price', 'Request this price')}
            </button>
          </>
        ) : (
          <>
            <Button size='lg' className='w-full sm:w-auto has-[>svg]:px-6' onClick={onRequest}>
              {isQuote
                ? t('pricing.cta.request_quote', 'Request a quote')
                : t('pricing.cta.request_price', 'Request this price')}
              <ArrowRightIcon aria-hidden />
            </Button>
            <CalBookingDialog
              location='pricing'
              triggerAriaLabel={t('pricing.cta.talk', 'Talk to us')}
              className='inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            >
              {t('pricing.cta.talk', 'Talk to us')}
            </CalBookingDialog>
          </>
        )}
      </div>

      {/* Footnotes */}
      <div className='mt-4 flex flex-col gap-1 text-xs text-muted-foreground'>
        <p>{t('pricing.cta.no_commitment', 'No commitment. We reply within one business day.')}</p>
        <p>{t('pricing.cta.repeat_hint', 'Running several votes this year? Tell us in the request.')}</p>
      </div>
    </div>
  )
}
