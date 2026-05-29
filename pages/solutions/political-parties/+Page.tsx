import { Building2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'
import logoAlhora from '@/assets/logos/logo_alhora_round.webp'
import logoErc from '@/assets/logos/erc.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.political_parties', { returnObjects: true }) as SolutionContent

  return (
    <SolutionPage
      icon={Building2Icon}
      content={content}
      logos={[
        { src: logoErc, alt: 'Esquerra Republicana' },
        { src: logoAlhora, alt: 'Alhora' },
      ]}
      caseStudyHref='/case-studies/esquerra-republicana'
    />
  )
}
