'use client'

import { useTranslation } from 'react-i18next'

import { Checkbox } from '@/components/ui/checkbox'
import type { AddonPrices } from '@/lib/pricing/compute'
import { ONE_TIME_ADDONS, PER_VOTE_ADDONS, type AddonKey } from '@/lib/pricing/constants'
import { formatCurrency, formatRate } from '@/lib/pricing/format'

import type { PricingEstimateState } from './usePricingEstimate'

interface AddonRowsProps {
  state: PricingEstimateState
  locale: string
}

interface AddonRowProps {
  addonKey: AddonKey
  checked: boolean
  onCheckedChange: (key: AddonKey, checked: boolean) => void
  prices: AddonPrices | null
  locale: string
}

export function AddonTitle({ addonKey }: { addonKey: AddonKey }) {
  const { t } = useTranslation()
  switch (addonKey) {
    case 'sms':
      return <>{t('pricing.addons.sms.title', 'Verification codes by text message')}</>
    case 'certificate':
      return <>{t('pricing.addons.certificate.title', 'Signed results report (PDF)')}</>
    case 'branding':
      return <>{t('pricing.addons.branding.title', 'Your logo and colours')}</>
    case 'domain':
      return <>{t('pricing.addons.domain.title', 'Your own web address')}</>
  }
}

function AddonPrice({ addonKey, prices, locale }: { addonKey: AddonKey; prices: AddonPrices | null; locale: string }) {
  const { t } = useTranslation()
  // Prices come from the backend; until they arrive (or if they never do) the row shows none.
  const unit = prices?.[addonKey]
  if (unit === undefined) return null
  switch (addonKey) {
    case 'sms': {
      // In hundredths of a cent per person.
      const price = formatRate(unit, locale)
      return <>{t('pricing.addons.sms.price', '{{price}} per person on your list', { price })}</>
    }
    case 'certificate': {
      const price = formatCurrency(unit, locale)
      return <>{t('pricing.addons.certificate.price', '{{price}} per vote', { price })}</>
    }
    case 'branding': {
      const price = formatCurrency(unit, locale)
      return <>{t('pricing.addons.branding.price', '{{price}} once', { price })}</>
    }
    case 'domain': {
      const price = formatCurrency(unit, locale)
      return <>{t('pricing.addons.domain.price', '{{price}} once', { price })}</>
    }
  }
}

function AddonDescription({ addonKey }: { addonKey: AddonKey }) {
  const { t } = useTranslation()
  switch (addonKey) {
    case 'sms':
      return (
        <>
          {t(
            'pricing.addons.sms.description',
            'Send the code by text message instead of, or as well as, by email. Codes by email are always included.'
          )}
        </>
      )
    case 'certificate':
      return (
        <>
          {t(
            'pricing.addons.certificate.description',
            'A PDF with the full record of your vote: how it ran, the results and how anyone can verify them. Ready to attach to your minutes.'
          )}
        </>
      )
    case 'branding':
      return (
        <>
          {t(
            'pricing.addons.branding.description',
            'Your branding on the voting page and emails, for every future vote.'
          )}
        </>
      )
    case 'domain':
      return (
        <>
          {t(
            'pricing.addons.domain.description',
            'People vote at an address like yourorganisation.vocdoni.vote. A domain of your own is also possible, on request.'
          )}
        </>
      )
  }
}

function AddonRow({ addonKey, checked, onCheckedChange, prices, locale }: AddonRowProps) {
  const { t } = useTranslation()
  const isSms = addonKey === 'sms'
  // The whole row is the label; the title names the checkbox and the description describes it.
  const titleId = `pricing-addon-${addonKey}-title`
  const descriptionId = `pricing-addon-${addonKey}-description`

  return (
    <label className='group grid min-h-12 cursor-pointer grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-1 rounded-md border border-border bg-background p-4 transition-[background-color,border-color] duration-150 hover:bg-accent has-[[data-state=checked]]:border-foreground/20'>
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(addonKey, value === true)}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className='mt-0.5 border-muted-foreground data-[state=checked]:border-primary'
      />

      <span id={titleId} className='text-[15px] font-medium'>
        <AddonTitle addonKey={addonKey} />
      </span>

      <span className='text-right text-sm tabular-nums text-muted-foreground group-has-[[data-state=checked]]:text-foreground'>
        <AddonPrice addonKey={addonKey} prices={prices} locale={locale} />
      </span>

      <span id={descriptionId} className='col-start-2 col-end-4 text-sm text-muted-foreground'>
        <AddonDescription addonKey={addonKey} />
      </span>

      {isSms && (
        <span className='col-start-2 col-end-4 text-[13px] text-muted-foreground'>
          {t(
            'pricing.addons.sms.note',
            'Estimated cost in Europe. The final cost per text message can vary by country.'
          )}
        </span>
      )}
    </label>
  )
}

export function AddonRows({ state, locale }: AddonRowsProps) {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-6'>
      {/* Per-vote add-ons */}
      <div>
        <p className='mb-3 text-[11px] font-semibold uppercase tracking-wider text-faint'>
          {t('pricing.addons.per_vote_title', 'Add to this vote')}
        </p>
        <div className='flex flex-col gap-3'>
          {PER_VOTE_ADDONS.map((key) => (
            <AddonRow
              key={key}
              addonKey={key}
              checked={state.addons[key] === true}
              onCheckedChange={state.toggleAddon}
              prices={state.addonPrices}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* One-time add-ons */}
      <div>
        <p className='mb-3 text-[11px] font-semibold uppercase tracking-wider text-faint'>
          {t('pricing.addons.one_time_title', 'Charged once for your organisation')}
        </p>
        <div className='flex flex-col gap-3'>
          {ONE_TIME_ADDONS.map((key) => (
            <AddonRow
              key={key}
              addonKey={key}
              checked={state.addons[key] === true}
              onCheckedChange={state.toggleAddon}
              prices={state.addonPrices}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
