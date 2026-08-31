import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalComparisonRow, type VerticalContent } from '@/components/solutions/vertical/types'
import { cn } from '@/lib/utils'

interface VerticalComparisonProps {
  comparison: VerticalContent['comparison']
  pageId: string
}

/**
 * Three ways of running the same election side by side: paper, a typical
 * commercial provider, and this one.
 *
 * The provider column is optional. Locales that have not been given `digital`
 * copy yet fall back to the two-way comparison rather than rendering an empty
 * column, so the section degrades instead of breaking.
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
    { label: comparison?.traditional_label, get: (row: VerticalComparisonRow) => row.traditional },
    ...(withProvider ? [{ label: comparison?.digital_label, get: (row: VerticalComparisonRow) => row.digital }] : []),
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
                    {column.get(row)}
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
                  {row.vocdoni}
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
