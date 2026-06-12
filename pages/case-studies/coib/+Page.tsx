import { useTranslation } from 'react-i18next'

import { CaseStudyPage, type CaseStudyContent } from '@/components/case-studies/CaseStudyPage'
import logoCoib from '@/assets/logos/logo_coib_round.webp'
import imageCoib from '@/assets/images/success/coib_experience.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('case_studies.coib', { returnObjects: true }) as CaseStudyContent

  return (
    <CaseStudyPage
      content={content}
      logo={logoCoib}
      image={imageCoib}
      blogHref='https://blog.vocdoni.io/how-coib-a-professional-body-of-nurses-ran-its-2025-annual-general-meeting-vote-online-securely-and-with-instant-results/'
      solutionHref='/solutions/professional-colleges'
    />
  )
}
