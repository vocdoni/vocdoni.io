import { useTranslation } from 'react-i18next'

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
    </div>
  )
}
