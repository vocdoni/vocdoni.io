import { PrivacyPolicyCA } from '@/components/legal/privacy/PrivacyPolicyCA'
import { PrivacyPolicyEN } from '@/components/legal/privacy/PrivacyPolicyEN'
import { PrivacyPolicyES } from '@/components/legal/privacy/PrivacyPolicyES'
import { usePageContext } from 'vike-react/usePageContext'

export default function PrivacyPage() {
  const { locale } = usePageContext() as { locale: string }

  if (locale === 'es') {
    return <PrivacyPolicyES />
  }

  if (locale === 'ca') {
    return <PrivacyPolicyCA />
  }

  return <PrivacyPolicyEN />
}
