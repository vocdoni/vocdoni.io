import { Link } from '@/components/Link'
import type { DocsPageData } from '@/lib/docs/nav'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'

import { navGroupLabels } from './docs-nav'

interface DocsBreadcrumbsProps {
  slug: string
}

// Documentation > {group} > {page}. The overview page only shows the root crumb.
export function DocsBreadcrumbs({ slug }: DocsBreadcrumbsProps) {
  const { t } = useTranslation()
  const { nav } = useData<DocsPageData>()
  const groupLabels = navGroupLabels(t)
  const group = nav.find((candidate) => candidate.items.some((item) => item.slug === slug))
  const item = group?.items.find((candidate) => candidate.slug === slug)
  const isOverview = slug === 'overview'

  return (
    <nav aria-label={t('developers.docs.common.breadcrumb', 'Breadcrumb')} className='mb-4'>
      <ol className='flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground'>
        <li>
          <Link href='/developers/docs' variant='unstyled' className='hover:text-foreground'>
            {t('developers.docs.nav.title', 'Documentation')}
          </Link>
        </li>
        {!isOverview && group ? (
          <>
            <ChevronRight className='size-3.5 shrink-0' aria-hidden='true' />
            <li>{groupLabels[group.id] ?? group.id}</li>
            <ChevronRight className='size-3.5 shrink-0' aria-hidden='true' />
            <li className='font-medium text-foreground'>{item?.label}</li>
          </>
        ) : null}
      </ol>
    </nav>
  )
}
