import { useTranslation } from 'react-i18next'

import { CaseStudyPage, type CaseStudyContent } from '@/components/case-studies/CaseStudyPage'
import logoBellpuig from '@/assets/logos/logo_bellpuig_colour.webp'
import imageBellpuig from '@/assets/images/success/bellpuig_experience.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('case_studies.bellpuig', { returnObjects: true }) as CaseStudyContent

  return (
    <CaseStudyPage
      content={content}
      logo={logoBellpuig}
      image={imageBellpuig}
      blogHref='https://blog.vocdoni.io/referendum-bellpuig/'
      solutionHref='/solutions/municipalities'
    />
  )
}
