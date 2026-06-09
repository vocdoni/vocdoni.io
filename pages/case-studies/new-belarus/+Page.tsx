import { useTranslation } from 'react-i18next'

import { CaseStudyPage, type CaseStudyContent } from '@/components/case-studies/CaseStudyPage'
import logoNewBelarus from '@/assets/logos/new_belarus.webp'
import imageNewBelarus from '@/assets/images/success/newbelarus_experience.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('case_studies.new_belarus', { returnObjects: true }) as CaseStudyContent

  return (
    <CaseStudyPage
      content={content}
      logo={logoNewBelarus}
      image={imageNewBelarus}
      blogHref='https://blog.vocdoni.io/new-belarus-case-study/'
      solutionHref='/solutions/ngos'
    />
  )
}
