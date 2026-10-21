import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { PRICING_LEGAL } from '@/lib/pricing/constants'

export function TrustFootnote() {
  const { t } = useTranslation()

  return (
    <div className='max-w-3xl text-sm text-muted-foreground'>
      <p>
        {t(
          'pricing.trust.prices',
          'Prices in EUR without VAT. EU businesses with a valid VAT number are invoiced under the reverse charge; customers outside the EU pay no EU VAT.'
        )}
      </p>
      <p className='mt-2'>
        {t(
          'pricing.trust.payment',
          'Paying online is on the way. For now a person at Vocdoni confirms your price, then you pay by card or bank transfer with an invoice.'
        )}
      </p>

      <div className='mt-3 flex flex-wrap gap-x-4 gap-y-1'>
        <span>{PRICING_LEGAL.entityName}</span>
        {PRICING_LEGAL.vatId && <span>{t('pricing.trust.vat_id', 'VAT ID {{id}}', { id: PRICING_LEGAL.vatId })}</span>}
        <Link href='/privacy' variant='unstyled' className='hover:text-foreground transition-colors'>
          {t('pricing.trust.privacy', 'Privacy policy')}
        </Link>
        <Link href='/terms' variant='unstyled' className='hover:text-foreground transition-colors'>
          {t('pricing.trust.terms', 'Terms')}
        </Link>
        {PRICING_LEGAL.dpaUrl && (
          <Link
            href={PRICING_LEGAL.dpaUrl}
            variant='unstyled'
            className='hover:text-foreground transition-colors'
            target='_blank'
          >
            {t('pricing.trust.dpa', 'Data processing agreement')}
          </Link>
        )}
      </div>
    </div>
  )
}
