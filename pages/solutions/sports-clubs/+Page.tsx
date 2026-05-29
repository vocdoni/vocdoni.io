import { TrophyIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'
import logoCec from '@/assets/logos/logo_cec_colour.webp'
import logoFcb from '@/assets/images/fcb.webp'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.sports_clubs', { returnObjects: true }) as SolutionContent

  return (
    <SolutionPage
      icon={TrophyIcon}
      content={content}
      logos={[
        { src: logoFcb, alt: 'FC Barcelona' },
        { src: logoCec, alt: 'Centre Excursionista de Catalunya' },
      ]}
    />
  )
}
