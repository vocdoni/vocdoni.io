import { useTranslation } from 'react-i18next'

import { ComparisonPage, type ComparisonContent } from '@/components/compare/ComparisonPage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('compare_pages.vocdoni_vs_electionbuddy', { returnObjects: true }) as ComparisonContent

  return <ComparisonPage content={content} />
}
