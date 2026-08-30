import { useTranslation } from 'react-i18next'

import { AlternativesPage, type AlternativesContent } from '@/components/alternatives/AlternativesPage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('alternatives.electionbuddy', { returnObjects: true }) as AlternativesContent

  return <AlternativesPage content={content} />
}
