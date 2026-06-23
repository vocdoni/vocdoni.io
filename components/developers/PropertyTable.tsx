import { cn } from '@/lib/utils'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

export type PropertyRow = {
  // Field name and type are technical tokens, rendered in <code>.
  name: string
  type?: string
  required?: boolean
  // Prose - pass from the page content object (translatable).
  description?: React.ReactNode
}

interface PropertyTableProps {
  rows: PropertyRow[]
  className?: string
}

// Schema field table for request/response bodies. Column headers and the
// "required" label are translated; field names and types stay as code tokens.
export function PropertyTable({ rows, className }: PropertyTableProps) {
  const { t } = useTranslation()

  return (
    <div className={cn('my-6 overflow-hidden rounded-xl border border-border/60', className)}>
      <table className='w-full border-collapse text-left text-sm'>
        <thead>
          <tr className='bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground'>
            <th className='px-4 py-2.5 font-medium'>{t('developers.docs.common.table.field', 'Field')}</th>
            <th className='px-4 py-2.5 font-medium'>{t('developers.docs.common.table.type', 'Type')}</th>
            <th className='px-4 py-2.5 font-medium'>{t('developers.docs.common.table.description', 'Description')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className='border-t border-border/60 align-top'>
              <td className='whitespace-nowrap px-4 py-3'>
                <code className='font-mono text-[13px] text-foreground'>{row.name}</code>
                {row.required ? (
                  <span className='ml-2 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive'>
                    {t('developers.docs.common.table.required', 'Required')}
                  </span>
                ) : null}
              </td>
              <td className='whitespace-nowrap px-4 py-3'>
                {row.type ? <code className='font-mono text-[13px] text-muted-foreground'>{row.type}</code> : null}
              </td>
              <td className='px-4 py-3 text-muted-foreground'>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
