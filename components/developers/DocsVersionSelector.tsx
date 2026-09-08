import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDocsVersion } from '@/hooks/useDocsVersion'
import { DOCS_VERSIONS } from '@/lib/docs/versions'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { docsVersionLabels } from './docs-version-labels'

/**
 * Compact version picker for /developers/docs pages. Selecting a version only
 * updates and persists state (via useDocsVersion) - swapping the rendered
 * content for the chosen version is wired separately.
 */
export function DocsVersionSelector() {
  const { t } = useTranslation()
  const { version, setVersionId } = useDocsVersion()
  const labels = docsVersionLabels(t)

  if (DOCS_VERSIONS.length < 2) return null

  return (
    <div className='mb-4 px-3'>
      <label className='mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>
        {t('developers.docs.version.label', 'Version')}
      </label>
      <Select value={version.id} onValueChange={setVersionId}>
        <SelectTrigger className='h-8 w-full text-sm text-muted-foreground'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DOCS_VERSIONS.map((docsVersion) => (
            <SelectItem key={docsVersion.id} value={docsVersion.id}>
              {labels[docsVersion.id] ?? docsVersion.labelDefault}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
