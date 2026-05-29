import { useTranslation } from 'react-i18next'

import { CaseStudyPage, type CaseStudyContent } from '@/components/case-studies/CaseStudyPage'
import logoErc from '@/assets/logos/erc.webp'
import imageErc from '@/assets/images/success/esquerra_experience.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('case_studies.esquerra_republicana', { returnObjects: true }) as CaseStudyContent

  return (
    <CaseStudyPage
      content={content}
      logo={logoErc}
      image={imageErc}
      blogHref='https://blog.vocdoni.io/esquerra-republicana-political-party-membership-vote-with-vocdoni-77-12-turnout-in-a-decisive-political-decision/'
      solutionHref='/solutions/political-parties'
    />
  )
}
