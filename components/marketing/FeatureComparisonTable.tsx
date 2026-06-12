import { CircleCheckIcon, MinusIcon, XCircleIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export type ComparisonCell = {
  status: 'positive' | 'negative' | 'neutral'
  text: string
}

export type ComparisonColumn = {
  name: string
  highlighted?: boolean
}

export type ComparisonRow = {
  feature: string
  cells: ComparisonCell[]
}

export type FeatureComparisonTableProps = {
  eyebrow?: string
  title?: string
  description?: string
  featureColumnLabel: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
}

function StatusIcon({ status }: { status: ComparisonCell['status'] }) {
  if (status === 'positive') return <CircleCheckIcon className='size-5 flex-shrink-0 text-success' aria-hidden='true' />
  if (status === 'negative') return <XCircleIcon className='size-5 flex-shrink-0 text-destructive' aria-hidden='true' />
  return <MinusIcon className='size-5 flex-shrink-0 text-muted-foreground' aria-hidden='true' />
}

export default function FeatureComparisonTable({
  eyebrow,
  title,
  description,
  featureColumnLabel,
  columns,
  rows,
}: FeatureComparisonTableProps) {
  return (
    <Section>
      <Container>
        {(eyebrow || title || description) && (
          <div className='max-w-3xl mb-12 sm:mb-16'>
            {eyebrow && <p className='text-primary mb-3 text-sm font-medium uppercase tracking-wide'>{eyebrow}</p>}
            {title && (
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-balance'>{title}</h2>
            )}
            {description && <p className='mt-4 text-lg text-muted-foreground'>{description}</p>}
          </div>
        )}

        {/* Desktop table */}
        <div className='hidden lg:block overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope='col' className='w-1/4'>
                  <span className='sr-only'>{featureColumnLabel}</span>
                </TableHead>
                {columns.map((column, columnIndex) => (
                  <TableHead
                    scope='col'
                    key={columnIndex}
                    className={cn('text-center', { 'bg-primary/10': column.highlighted })}
                  >
                    <h3 className={cn('py-3 text-lg font-semibold sm:text-xl', { 'text-primary': column.highlighted })}>
                      {column.name}
                    </h3>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => {
                const isLastRow = rowIndex === rows.length - 1
                return (
                  <TableRow key={row.feature}>
                    <TableHead
                      scope='row'
                      className={cn('p-4 text-base font-normal', { 'border-border border-b': !isLastRow })}
                    >
                      {row.feature}
                    </TableHead>
                    {row.cells.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className={cn('p-4', {
                          'border-border border-b': !isLastRow,
                          'bg-primary/5': columns[cellIndex]?.highlighted,
                        })}
                      >
                        <div className='flex items-center gap-2'>
                          <StatusIcon status={cell.status} />
                          <span className='text-sm font-medium'>{cell.text}</span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile cards */}
        <div className='lg:hidden space-y-6'>
          {columns.map((column, columnIndex) => (
            <div
              key={column.name}
              className={cn('rounded-lg border p-6 space-y-4', {
                'border-primary bg-primary/5': column.highlighted,
              })}
            >
              <h3 className={cn('text-xl font-semibold text-center', { 'text-primary': column.highlighted })}>
                {column.name}
              </h3>
              <div className='space-y-3'>
                {rows.map((row) => (
                  <div key={row.feature} className='space-y-1'>
                    <p className='text-sm font-medium text-muted-foreground'>{row.feature}</p>
                    <div className='flex items-center gap-2'>
                      <StatusIcon status={row.cells[columnIndex]?.status ?? 'neutral'} />
                      <span className='text-sm font-medium'>{row.cells[columnIndex]?.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
