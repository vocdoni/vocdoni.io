import { HeartHandshakeIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'
import logoNewBelarus from '@/assets/logos/new_belarus.webp'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.ngos', { returnObjects: true }) as SolutionContent

  return (
    <SolutionPage
      icon={HeartHandshakeIcon}
      content={content}
      logos={[
        { src: logoNewBelarus, alt: 'New Belarus' },
        { src: logoOmnium, alt: 'Omnium Cultural' },
      ]}
      caseStudyHref='/case-studies/new-belarus'
    />
  )
}
