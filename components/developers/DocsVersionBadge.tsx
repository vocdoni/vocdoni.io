import { Badge } from '@/components/ui/badge'
import { useDocsData } from '@/hooks/useDocsData'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { docsVersionLabels } from './docs-version-labels'

// Sits next to the article title. The badge is a claim about what is on screen,
// so it keys off `showingRemote` (the branch content really did load) rather
// than `isRemote` (the reader picked that version): while loading there is only
// a discreet spinner, and on a failure - or when the branch does not carry this
// page - the baked article shows with no badge at all.
export function DocsVersionBadge() {
  const { t } = useTranslation()
  const { isRemote, showingRemote, loading, version } = useDocsData()

  if (!isRemote) return null
  if (!showingRemote && !loading) return null

  const label = docsVersionLabels(t)[version.id] ?? version.labelDefault

  return (
    <div className='mb-3 flex flex-wrap items-center gap-2'>
      {showingRemote ? (
        <Badge variant='warning'>{t('developers.docs.version.badge', '{{version}} preview', { version: label })}</Badge>
      ) : null}
      {loading ? (
        <span className='inline-flex items-center gap-1.5 text-xs font-normal text-muted-foreground'>
          <Loader2 className='size-3.5 animate-spin' aria-hidden='true' />
          {t('developers.docs.version.loading', 'Loading {{version}} content', { version: label })}
        </span>
      ) : null}
    </div>
  )
}
