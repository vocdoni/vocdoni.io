import { Link } from '@/components/Link'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { DOCS_NAV, navLabels } from './docs-nav'

interface DocsBreadcrumbsProps {
  slug: string
}

// Documentation > {group} > {page}. The overview page only shows the root crumb.
export function DocsBreadcrumbs({ slug }: DocsBreadcrumbsProps) {
  const { t } = useTranslation()
  const labels = navLabels(t)
  const group = DOCS_NAV.find((candidate) => candidate.items.some((item) => item.slug === slug))
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
            <li>{labels?.groups?.[group.id]}</li>
            <ChevronRight className='size-3.5 shrink-0' aria-hidden='true' />
            <li className='font-medium text-foreground'>{labels?.items?.[slug]}</li>
          </>
        ) : null}
      </ol>
    </nav>
  )
}
