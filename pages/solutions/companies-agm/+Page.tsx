import { BuildingIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import logoCoib from '@/assets/logos/logo_coib_round.webp'
import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.companies_agm', { returnObjects: true }) as SolutionContent

  return (
    <SolutionPage
      icon={BuildingIcon}
      content={content}
      logos={[{ src: logoCoib, alt: "Col·legi Oficial d'Infermeres i Infermers de Barcelona" }]}
      caseStudyHref='/case-studies/coib'
    />
  )
}
