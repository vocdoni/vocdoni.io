import { BriefcaseIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { VerticalPage } from '@/components/solutions/vertical/VerticalPage'
import type { VerticalContent } from '@/components/solutions/vertical/types'
import { getProfessionalAssociationsProof } from '@/lib/solutions/verticalProof'
import { getTestimonialsData } from '@/lib/testimonials-data'
import type { Locale } from '@/locales'
import logoCoib from '@/assets/logos/logo_coib_round.webp'
import logoEic from '@/assets/logos/logo_eic_colour.webp'
import logoIcoes from '@/assets/logos/logo_icoes_colour.webp'
import logoAti from '@/assets/logos/logo_ati_colour.webp'
import logoArxivers from '@/assets/logos/logo_arxivers_colour.webp'
import imageCoib from '@/assets/images/success/coib_experience.webp'

/**
 * Vertical-tagged signup, so the app can shape onboarding for a statutory body.
 * `trackAppCtaClick` records only the destination path, so the vertical also has
 * to live in every `ctaId` below - hence the `pro_bodies` prefix.
 */
const APP_SIGNUP_URL = `${APP_URL}/account/signin?type=professional-associations`
const PRICING_URL = `${APP_URL}/plans`

const CASE_STUDY_HREF = '/case-studies/coib'
const BLOG_HREF =
  '/blog/how-coib-a-professional-body-of-nurses-ran-its-2025-annual-general-meeting-vote-online-securely-and-with-instant-results'

/** Logo art and the `platformName` each organization uses in the testimonials data. */
const ORGANIZATIONS: Record<string, { logo: string; alt: string; platformName: string }> = {
  COIB: { logo: logoCoib, alt: 'COIB', platformName: 'COIB' },
  COEIC: {
    logo: logoEic,
    alt: 'Enginyers Industrials de Catalunya',
    platformName: 'College of Industrial Engineers of Catalonia',
  },
  ICOES: { logo: logoIcoes, alt: 'ICOES', platformName: 'ICOES' },
  Arxivers: { logo: logoArxivers, alt: 'Arxivers de Catalunya', platformName: 'Arxivers de Catalunya' },
  ATI: {
    logo: logoAti,
    alt: 'Associazione Termotecnica Italiana',
    platformName: 'Associazione Termotecnica Italiana',
  },
}

/** Case study assets, keyed by the organization the market leads with. */
const CASE_STUDIES: Record<string, { logo: string; image?: string; href: string; blogHref: string }> = {
  COIB: { logo: logoCoib, image: imageCoib, href: CASE_STUDY_HREF, blogHref: BLOG_HREF },
}

export default function Page() {
  const { t } = useTranslation()
  const pageContext = usePageContext()
  const locale = ((pageContext as { locale?: Locale }).locale ?? 'en') as Locale

  const content = t('solutions.professional_associations', { returnObjects: true }) as VerticalContent
  const proof = getProfessionalAssociationsProof(locale)
  const testimonials = getTestimonialsData(t)

  // Testimonials are resolved by organization, so a market override is a name
  // change rather than an import change.
  const quoteFor = (org: string) => {
    const platformName = ORGANIZATIONS[org]?.platformName
    return testimonials.find((item) => item.platformName === platformName)
  }

  return (
    <VerticalPage
      icon={BriefcaseIcon}
      content={content}
      appHref={APP_SIGNUP_URL}
      pricingHref={PRICING_URL}
      ctaPrefix='pro_associations'
      logos={proof.logos.map((org) => ({ src: ORGANIZATIONS[org].logo, alt: ORGANIZATIONS[org].alt }))}
      caseStudy={CASE_STUDIES[proof.caseStudy] ?? CASE_STUDIES.COIB}
      quotes={{
        stakes: quoteFor(proof.quotes.stakes),
        how: quoteFor(proof.quotes.how),
        proof: quoteFor(proof.quotes.proof),
      }}
      resourceLinks={[
        { href: CASE_STUDY_HREF },
        { href: '/learn/how-to-run-a-legally-valid-agm-online' },
        { href: '/learn/gdpr-requirements-for-digital-voting' },
        { href: '/learn/quorum-meaning-for-online-voting' },
        { href: '/learn/verifiable-voting-explained' },
        { href: '/learn/how-to-prevent-election-fraud-online' },
      ]}
    />
  )
}
