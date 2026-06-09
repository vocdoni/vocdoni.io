import { UsersIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'
import logoArxivers from '@/assets/logos/logo_arxivers_colour.webp'
import logoNewBelarus from '@/assets/logos/new_belarus.webp'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.associations', { returnObjects: true }) as SolutionContent

  return (
    <SolutionPage
      icon={UsersIcon}
      content={content}
      logos={[
        { src: logoOmnium, alt: 'Òmnium Cultural' },
        { src: logoNewBelarus, alt: 'New Belarus' },
        { src: logoArxivers, alt: "Associació de Professionals de l'Arxivística" },
      ]}
      caseStudyHref='/case-studies/omnium-cultural'
    />
  )
}
