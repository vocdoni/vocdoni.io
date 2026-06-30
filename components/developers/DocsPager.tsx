import { Link } from '@/components/Link'
import type { DocsPageData } from '@/lib/docs/nav'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'

import { flattenDocsNav } from './docs-nav'

interface DocsPagerProps {
  slug: string
}

// Previous / next navigation derived from the flattened reading order.
export function DocsPager({ slug }: DocsPagerProps) {
  const { t } = useTranslation()
  const { nav } = useData<DocsPageData>()
  const flat = flattenDocsNav(nav)
  const index = flat.findIndex((item) => item.slug === slug)
  if (index === -1) return null

  const previous = index > 0 ? flat[index - 1] : null
  const next = index < flat.length - 1 ? flat[index + 1] : null

  return (
    <div className='mt-14 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2'>
      {previous ? (
        <Link
          href={previous.href}
          variant='unstyled'
          className='group flex flex-col gap-1 rounded-xl border border-border/60 p-4 transition-colors hover:border-primary/40'
        >
          <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
            <ArrowLeft className='size-3.5' />
            {t('developers.docs.common.previous', 'Previous')}
          </span>
          <span className='font-medium text-foreground group-hover:text-primary'>{previous.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          variant='unstyled'
          className={cn(
            'group flex flex-col gap-1 rounded-xl border border-border/60 p-4 text-right transition-colors hover:border-primary/40',
            !previous && 'sm:col-start-2'
          )}
        >
          <span className='inline-flex items-center justify-end gap-1 text-xs text-muted-foreground'>
            {t('developers.docs.common.next', 'Next')}
            <ArrowRight className='size-3.5' />
          </span>
          <span className='font-medium text-foreground group-hover:text-primary'>{next.label}</span>
        </Link>
      ) : null}
    </div>
  )
}
