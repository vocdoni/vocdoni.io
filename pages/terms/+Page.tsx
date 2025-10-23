import { TermsCA } from '@/components/legal/terms/TermsCA'
import { TermsEN } from '@/components/legal/terms/TermsEN'
import { TermsES } from '@/components/legal/terms/TermsES'
import { usePageContext } from 'vike-react/usePageContext'

export default function TermsPage() {
  const { locale } = usePageContext() as { locale: string }

  if (locale === 'es') {
    return <TermsES />
  }

  if (locale === 'ca') {
    return <TermsCA />
  }

  return <TermsEN />
}
