import { useTranslation } from 'react-i18next'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { graduatedTotalCents } from '@/lib/pricing/compute'
import { QUOTE_REQUIRED_ABOVE, VOTER_BANDS } from '@/lib/pricing/constants'
import { formatCurrency, formatPeople, formatRate } from '@/lib/pricing/format'
import { cn } from '@/lib/utils'

interface BandTableProps {
  voters: number
  locale: string
}

// Precompute band from values (previous upTo + 1, first band starts at 1)
const BAND_FROMS = VOTER_BANDS.map((_, i) => (i === 0 ? 1 : VOTER_BANDS[i - 1].upTo + 1))

export function BandTable({ voters, locale }: BandTableProps) {
  const { t } = useTranslation()

  // Highlighted band: first band with upTo >= voters, only when voters <= QUOTE_REQUIRED_ABOVE
  const highlightedIndex = voters <= QUOTE_REQUIRED_ABOVE ? VOTER_BANDS.findIndex((b) => b.upTo >= voters) : -1

  return (
    <div>
      <h3 className='font-serif text-2xl font-normal'>{t('pricing.bands.title', 'Prices at a glance')}</h3>

      {/* Desktop table (md+) */}
      <div className='mt-4 hidden md:block'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              {/* marker column */}
              <TableHead className='h-auto w-4 px-0 pb-3 text-[11px] font-semibold uppercase tracking-wider text-faint' />
              <TableHead className='h-auto px-0 pb-3 text-[11px] font-semibold uppercase tracking-wider text-faint'>
                {t('pricing.bands.col_people', 'People who can vote')}
              </TableHead>
              <TableHead className='h-auto px-0 pb-3 text-[11px] font-semibold uppercase tracking-wider text-faint'>
                {t('pricing.bands.col_rate', 'Price each')}
              </TableHead>
              <TableHead className='h-auto px-0 pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-faint'>
                {t('pricing.bands.col_total', 'A vote with this many people costs')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VOTER_BANDS.map((band, i) => {
              const isHighlighted = i === highlightedIndex
              const from = BAND_FROMS[i]
              return (
                <TableRow
                  key={band.upTo}
                  aria-current={isHighlighted ? 'true' : undefined}
                  className={cn(
                    'hover:bg-transparent',
                    isHighlighted && 'bg-accent [&>td:first-child]:rounded-l-md [&>td:last-child]:rounded-r-md'
                  )}
                >
                  <TableCell className='px-0 py-4'>
                    {isHighlighted && <span className='inline-block size-1.5 rounded-full bg-primary' aria-hidden />}
                    {isHighlighted && (
                      <span className='sr-only'>{t('pricing.bands.current', 'Your list falls in this range')}</span>
                    )}
                  </TableCell>
                  <TableCell className='px-0 py-4 text-foreground'>
                    {t('pricing.bands.range', '{{from}} - {{to}}', {
                      from: formatPeople(from, locale),
                      to: formatPeople(band.upTo, locale),
                    })}
                  </TableCell>
                  <TableCell className='px-0 py-4 tabular-nums text-muted-foreground'>
                    {t('pricing.bands.each', '{{rate}} each', {
                      rate: formatRate(band.rateHundredthsOfCent, locale),
                    })}
                  </TableCell>
                  <TableCell className='px-0 py-4 text-right font-medium tabular-nums'>
                    {formatCurrency(graduatedTotalCents(band.upTo), locale)}
                  </TableCell>
                </TableRow>
              )
            })}
            {/* Quote row */}
            <TableRow className='hover:bg-transparent'>
              <TableCell className='px-0 py-4' />
              <TableCell colSpan={3} className='px-0 py-4 text-muted-foreground'>
                {t('pricing.bands.above_limit', 'More than {{limit}} people: ask us for a quote.', {
                  limit: formatPeople(QUOTE_REQUIRED_ABOVE, locale),
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Mobile list (below md) */}
      <ul className='mt-4 divide-y divide-border md:hidden'>
        {VOTER_BANDS.map((band, i) => {
          const isHighlighted = i === highlightedIndex
          const from = BAND_FROMS[i]
          return (
            <li
              key={band.upTo}
              aria-current={isHighlighted ? 'true' : undefined}
              className={cn('py-3', isHighlighted && '-mx-5 rounded-md bg-accent px-5')}
            >
              <div className='flex items-center justify-between gap-4 text-sm'>
                <span className='text-foreground'>
                  {t('pricing.bands.range', '{{from}} - {{to}}', {
                    from: formatPeople(from, locale),
                    to: formatPeople(band.upTo, locale),
                  })}
                  {isHighlighted && (
                    <span className='sr-only'> {t('pricing.bands.current', 'Your list falls in this range')}</span>
                  )}
                </span>
                <span className='font-medium tabular-nums'>
                  {formatCurrency(graduatedTotalCents(band.upTo), locale)}
                </span>
              </div>
              <p className='mt-0.5 text-sm text-muted-foreground'>
                {t('pricing.bands.each', '{{rate}} each', {
                  rate: formatRate(band.rateHundredthsOfCent, locale),
                })}
              </p>
            </li>
          )
        })}
        <li className='py-3 text-sm text-muted-foreground'>
          {t('pricing.bands.above_limit', 'More than {{limit}} people: ask us for a quote.', {
            limit: formatPeople(QUOTE_REQUIRED_ABOVE, locale),
          })}
        </li>
      </ul>
    </div>
  )
}
