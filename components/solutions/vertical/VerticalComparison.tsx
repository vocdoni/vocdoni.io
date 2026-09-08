import { CircleCheckIcon, CircleMinusIcon, CircleXIcon, type LucideIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import {
  asArray,
  type VerticalComparisonRow,
  type VerticalComparisonStatus,
  type VerticalContent,
} from '@/components/solutions/vertical/types'
import { cn } from '@/lib/utils'

interface VerticalComparisonProps {
  comparison: VerticalContent['comparison']
  pageId: string
}

const STATUS_ICONS: Record<VerticalComparisonStatus, { icon: LucideIcon; className: string }> = {
  positive: { icon: CircleCheckIcon, className: 'text-success' },
  negative: { icon: CircleXIcon, className: 'text-destructive' },
  neutral: { icon: CircleMinusIcon, className: 'text-muted-foreground' },
}

/**
 * A cell's text, with a signal icon in front of it when the row carries one.
 *
 * The icon is decorative: the copy in a statused row already reads as a loss or
 * a gain on its own, and the status is the same word in every locale, so it
 * needs no translated label. A cell without a status renders exactly as before.
 */
function CellValue({ text, status }: { text?: string; status?: VerticalComparisonStatus }) {
  if (!status) return <>{text}</>
  const { icon: Icon, className } = STATUS_ICONS[status]
  return (
    <span className='flex gap-2' data-status={status}>
      <Icon className={cn('mt-0.5 size-4 shrink-0', className)} aria-hidden='true' />
      <span>{text}</span>
    </span>
  )
}

/**
 * Two or three ways of running the same election side by side: the way it is
 * done today, optionally a typical commercial provider, and this one.
 *
 * The provider column is optional. A vertical whose content has no `digital`
 * copy falls back to the two-way comparison rather than rendering an empty
 * column, so the section degrades instead of breaking.
 *
 * Rows may carry a status per cell, which adds a check, cross or dash in front
 * of the text so the two columns read as a form next to an election even when
 * skimmed.
 *
 * Built as an ARIA grid rather than a `<table>`: a multi-column table pushes the
 * Vocdoni column off a narrow viewport behind a horizontal scroll, which leaves
 * the reader holding the losing column and the argument off screen. The roles
 * keep table semantics while the layout reflows to one self-labelled card per
 * row on small screens.
 */
export function VerticalComparison({ comparison, pageId }: VerticalComparisonProps) {
  const rows = asArray<VerticalComparisonRow>(comparison?.rows)
  const withProvider = Boolean(comparison?.digital_label && rows.some((row) => row.digital))

  // Four columns need the room, so the table shape only appears at lg. Two
  // comparison columns fit from md.
  const columns = withProvider
    ? 'lg:grid-cols-[minmax(9rem,0.9fr)_1fr_1fr_1fr]'
    : 'md:grid-cols-[minmax(11rem,1.1fr)_1fr_1fr]'
  const tableUp = withProvider ? 'lg' : 'md'

  const comparedColumns = [
    {
      label: comparison?.traditional_label,
      get: (row: VerticalComparisonRow) => row.traditional,
      getStatus: (row: VerticalComparisonRow) => row.traditional_status,
    },
    ...(withProvider
      ? [
          {
            label: comparison?.digital_label,
            get: (row: VerticalComparisonRow) => row.digital,
            getStatus: (row: VerticalComparisonRow) => row.digital_status,
          },
        ]
      : []),
  ]

  return (
    <VerticalSection sectionId='comparison' pageId={pageId} className='bg-muted/50'>
      <Container className={withProvider ? 'max-w-6xl' : 'max-w-5xl'}>
        <SectionHeader
          size='section'
          eyebrow={comparison?.eyebrow}
          title={comparison?.title}
          lede={comparison?.intro}
        />

        <div
          role='table'
          aria-label={comparison?.title}
          className='bg-background rounded-card mt-12 overflow-hidden border shadow-sm sm:mt-16'
        >
          {/* Column labels exist only where columns do. On smaller screens each
              row carries its own inline labels, so no cell is ever unlabelled. */}
          <div role='rowgroup' className={cn('hidden', tableUp === 'lg' ? 'lg:block' : 'md:block')}>
            <div role='row' className={cn('grid items-stretch', columns)}>
              {[comparison?.criterion_label, ...comparedColumns.map((c) => c.label)].map((label) => (
                <span
                  key={label}
                  role='columnheader'
                  className='text-muted-foreground px-6 pt-6 pb-4 text-xs font-semibold tracking-wider uppercase'
                >
                  {label}
                </span>
              ))}
              <span
                role='columnheader'
                className='text-primary bg-primary/[0.07] px-6 pt-6 pb-4 text-xs font-semibold tracking-wider uppercase'
              >
                {comparison?.vocdoni_label}
              </span>
            </div>
          </div>

          <div role='rowgroup' className='divide-border divide-y'>
            {rows.map((row) => (
              <div
                role='row'
                key={row.criterion}
                className={cn(
                  'grid gap-3 p-6',
                  tableUp === 'lg' ? 'lg:items-baseline lg:gap-0 lg:p-0' : 'md:items-baseline md:gap-0 md:p-0',
                  columns
                )}
              >
                <span
                  role='rowheader'
                  className={cn(
                    'text-base font-medium text-balance',
                    tableUp === 'lg' ? 'lg:px-6 lg:py-5 lg:text-sm' : 'md:px-6 md:py-5 md:text-sm'
                  )}
                >
                  {row.criterion}
                </span>

                {comparedColumns.map((column) => (
                  <span
                    key={column.label}
                    role='cell'
                    className={cn(
                      'text-muted-foreground text-sm leading-relaxed',
                      tableUp === 'lg' ? 'lg:px-6 lg:py-5' : 'md:px-6 md:py-5'
                    )}
                  >
                    <span
                      className={cn(
                        'text-muted-foreground mb-1 block text-xs font-semibold tracking-wider uppercase',
                        tableUp === 'lg' ? 'lg:hidden' : 'md:hidden'
                      )}
                    >
                      {column.label}
                    </span>
                    <CellValue text={column.get(row)} status={column.getStatus(row)} />
                  </span>
                ))}

                {/* The answer column is a continuous tinted band once the table
                    shape appears, and a tinted block in every small-screen card,
                    so it is never the part that scrolls away. */}
                <span
                  role='cell'
                  className={cn(
                    'bg-primary/[0.07] rounded-md px-4 py-3 text-sm leading-relaxed',
                    tableUp === 'lg'
                      ? 'lg:h-full lg:rounded-none lg:px-6 lg:py-5'
                      : 'md:h-full md:rounded-none md:px-6 md:py-5'
                  )}
                >
                  <span
                    className={cn(
                      'text-primary mb-1 block text-xs font-semibold tracking-wider uppercase',
                      tableUp === 'lg' ? 'lg:hidden' : 'md:hidden'
                    )}
                  >
                    {comparison?.vocdoni_label}
                  </span>
                  <CellValue text={row.vocdoni} status={row.vocdoni_status} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </VerticalSection>
  )
}

export default VerticalComparison
