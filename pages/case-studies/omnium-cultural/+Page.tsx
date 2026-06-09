import { useTranslation } from 'react-i18next'

import { CaseStudyPage, type CaseStudyContent } from '@/components/case-studies/CaseStudyPage'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('case_studies.omnium_cultural', { returnObjects: true }) as CaseStudyContent

  return (
    <CaseStudyPage
      content={content}
      logo={logoOmnium}
      blogHref='https://blog.vocdoni.io/tag/success-stories/'
      solutionHref='/solutions/associations'
    />
  )
}
