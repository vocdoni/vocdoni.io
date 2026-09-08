import { Badge } from '@/components/ui/badge'
import { useDocsData } from '@/hooks/useDocsData'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { docsVersionLabels } from './docs-version-labels'

// Sits next to the article title whenever the body was fetched from a branch
// instead of being baked into this build, so nobody mistakes preview copy for
// what is published. Renders nothing on the baked version.
export function DocsVersionBadge() {
  const { t } = useTranslation()
  const { isRemote, loading, version } = useDocsData()

  if (!isRemote) return null

  const label = docsVersionLabels(t)[version.id] ?? version.labelDefault

  return (
    <div className='mb-3 flex flex-wrap items-center gap-2'>
      <Badge variant='warning'>{t('developers.docs.version.badge', '{{version}} preview', { version: label })}</Badge>
      {loading ? (
        <span className='inline-flex items-center gap-1.5 text-xs font-normal text-muted-foreground'>
          <Loader2 className='size-3.5 animate-spin' aria-hidden='true' />
          {t('developers.docs.version.loading', 'Loading {{version}} content', { version: label })}
        </span>
      ) : null}
    </div>
  )
}
