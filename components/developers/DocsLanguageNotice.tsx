import { Alert, AlertDescription } from '@/components/ui/alert'
import type { DocsPageData } from '@/lib/docs/nav'
import { Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'

export function DocsLanguageNotice() {
  const { doc } = useData<DocsPageData>()
  const { t } = useTranslation()

  if (doc.locale === doc.usedLocale) return null

  return (
    <Alert className='mb-6 border-primary/25 bg-primary/5'>
      <Info className='size-4 text-primary' />
      <AlertDescription>
        {t('developers.docs.common.language_notice', 'This page is only available in English.')}
      </AlertDescription>
    </Alert>
  )
}
