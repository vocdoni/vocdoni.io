import { HandshakeIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SolutionPage, type SolutionContent } from '@/components/solutions/SolutionPage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.cooperatives', { returnObjects: true }) as SolutionContent

  return <SolutionPage icon={HandshakeIcon} content={content} logos={[]} />
}
