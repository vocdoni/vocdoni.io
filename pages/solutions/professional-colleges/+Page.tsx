import { BriefcaseIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'
import logoCoib from '@/assets/logos/logo_coib_round.webp'
import logoEic from '@/assets/logos/logo_eic_colour.webp'
import logoIcoes from '@/assets/logos/logo_icoes_colour.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.professional_colleges', { returnObjects: true }) as SolutionContent

  return (
    <SolutionPage
      icon={BriefcaseIcon}
      content={content}
      logos={[
        { src: logoCoib, alt: 'COIB' },
        { src: logoEic, alt: 'Enginyers Industrials de Catalunya' },
        { src: logoIcoes, alt: 'ICOES' },
      ]}
      caseStudyHref='/case-studies/coib'
    />
  )
}
