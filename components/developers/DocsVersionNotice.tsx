import { Alert, AlertDescription } from '@/components/ui/alert'
import { useDocsData } from '@/hooks/useDocsData'
import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { docsVersionLabels } from './docs-version-labels'

// Inline notice for a failed remote version load. The baked article stays on
// screen underneath, so this only has to explain why it is not the requested
// version.
export function DocsVersionNotice() {
  const { t } = useTranslation()
  const { error, version } = useDocsData()

  if (!error) return null

  const label = docsVersionLabels(t)[version.id] ?? version.labelDefault

  return (
    <Alert className='mb-6 border-warning/30 bg-warning/10'>
      <TriangleAlert className='size-4 text-warning' />
      <AlertDescription>
        {error === 'not-found'
          ? t(
              'developers.docs.version.error_not_found',
              'The {{version}} branch has no documentation. Showing the published version instead.',
              { version: label }
            )
          : t(
              'developers.docs.version.error',
              'Could not load the {{version}} content. Showing the published version instead.',
              { version: label }
            )}
      </AlertDescription>
    </Alert>
  )
}
