import { LandmarkIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'
import logoBcn from '@/assets/logos/logo_bcn_bw.webp'
import logoBellpuig from '@/assets/logos/logo_bellpuig_colour.webp'
import logoBerga from '@/assets/logos/logo_berga_bw.webp'
import logoBisbal from '@/assets/logos/logo_bisbal_round.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.municipalities', { returnObjects: true }) as SolutionContent

  return (
    <SolutionPage
      icon={LandmarkIcon}
      content={content}
      logos={[
        { src: logoBellpuig, alt: 'Bellpuig' },
        { src: logoBerga, alt: 'Berga' },
        { src: logoBisbal, alt: "La Bisbal de l'Emporda" },
        { src: logoBcn, alt: 'Barcelona' },
      ]}
      caseStudyHref='/case-studies/bellpuig'
    />
  )
}
