import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { formatCurrency, formatPeople, formatRate } from '@/lib/pricing/format'
import { QUOTE_REQUIRED_ABOVE } from '@/lib/pricing/constants'
import type { PriceListRow } from '@/pages/pricing/+data'

interface PriceListProps {
  priceList: PriceListRow[]
  locale: string
}

/** Server-rendered price table: one row per published ladder edge, plus a final on-request row. */
export default function PriceList({ priceList, locale }: PriceListProps) {
  const { t } = useTranslation()

  return (
    <Section className='bg-background'>
      <Container>
        <SectionHeader
          size='section'
          align='left'
          headingLevel='h2'
          eyebrow={t('pricing.eyebrow', 'Pricing')}
          title={t('pricing.price_list.heading', 'Published prices')}
        />

        <div className='mt-8 overflow-x-auto rounded-lg border border-border'>
          <table className='w-full caption-bottom text-sm'>
            <caption className='mt-4 px-4 pb-4 text-left text-sm text-muted-foreground'>
              {t(
                'pricing.trust.prices',
                'Prices in EUR without VAT. EU businesses with a valid VAT number are invoiced under the reverse charge; customers outside the EU pay no EU VAT.'
              )}
            </caption>
            <thead className='[&_tr]:border-b'>
              <tr className='border-b'>
                <th scope='col' className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
                  {t('pricing.price_list.col_people', 'People who can vote')}
                </th>
                <th scope='col' className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                  {t('pricing.price_list.col_total', 'Price per vote')}
                </th>
                <th scope='col' className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
                  {t('pricing.price_list.col_per_person', 'Per person')}
                </th>
              </tr>
            </thead>
            <tbody className='[&_tr:last-child]:border-0'>
              {priceList.map((row) => (
                <tr key={row.voters} className='border-b transition-colors hover:bg-muted/50'>
                  <td className='p-4 align-middle tabular-nums'>{formatPeople(row.voters, locale)}</td>
                  <td className='p-4 text-right align-middle tabular-nums'>
                    {row.isFree
                      ? t('pricing.panel.free', 'Free')
                      : !row.priceAvailable
                        ? t('pricing.panel.on_request', 'On request')
                        : formatCurrency(row.voterPriceCents, locale)}
                  </td>
                  <td className='p-4 text-right align-middle tabular-nums text-muted-foreground'>
                    {row.isFree
                      ? t('pricing.panel.free', 'Free')
                      : !row.priceAvailable
                        ? t('pricing.panel.on_request', 'On request')
                        : formatRate(row.perPersonHundredthsOfCent, locale)}
                  </td>
                </tr>
              ))}
              {/* Static on-request row for counts above the quote threshold */}
              <tr className='border-b transition-colors hover:bg-muted/50'>
                <td className='p-4 align-middle text-muted-foreground'>
                  {t('pricing.price_list.row_above', 'More than {{limit}} people', {
                    limit: formatPeople(QUOTE_REQUIRED_ABOVE, locale),
                  })}
                </td>
                <td className='p-4 text-right align-middle text-muted-foreground'>
                  {t('pricing.panel.on_request', 'On request')}
                </td>
                <td className='p-4 text-right align-middle text-muted-foreground'>
                  {t('pricing.panel.on_request', 'On request')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}
