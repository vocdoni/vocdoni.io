import { UsersIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { VerticalPage } from '@/components/solutions/vertical/VerticalPage'
import type { VerticalContent } from '@/components/solutions/vertical/types'
import { getAssociationsProof } from '@/lib/solutions/verticalProof'
import { getTestimonialsData } from '@/lib/testimonials-data'
import type { Locale } from '@/locales'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'
import logoCec from '@/assets/logos/logo_cec_colour.webp'
import logoPlataforma from '@/assets/logos/logo_plataforma_colour.webp'
import logoAguicat from '@/assets/logos/logo_aguicat_round.webp'
import logoArxivers from '@/assets/logos/logo_arxivers_colour.webp'

/**
 * Vertical-tagged signup, so the app can shape onboarding for a membership
 * association. The `type` is what joins a click here to a signup there, so it
 * is also sent as an event property, and the vertical is repeated in every
 * `ctaId` below - hence the `associations` prefix.
 */
const APP_SIGNUP_URL = `${APP_URL}/account/signin?type=associations`
const PRICING_URL = `${APP_URL}/plans`

const CASE_STUDY_HREF = '/case-studies/omnium-cultural'
const BLOG_HREF =
  '/blog/how-plataforma-per-la-llengua-runs-online-voting-for-an-association-with-members-across-four-states'

/** Logo art and the `platformName` each organization uses in the testimonials data. */
const ORGANIZATIONS: Record<string, { logo: string; alt: string; platformName: string }> = {
  Omnium: { logo: logoOmnium, alt: 'Òmnium Cultural', platformName: 'Òmnium' },
  CEC: {
    logo: logoCec,
    alt: 'Centre Excursionista de Catalunya',
    platformName: 'Centre Excursionista de Catalunya',
  },
  Plataforma: { logo: logoPlataforma, alt: 'Plataforma per la Llengua', platformName: 'Plataforma per la Llengua' },
  AGUICAT: { logo: logoAguicat, alt: 'AGUICAT', platformName: 'AGUICAT' },
  Arxivers: { logo: logoArxivers, alt: 'Arxivers de Catalunya', platformName: 'Arxivers de Catalunya' },
}

/**
 * Òmnium has a case study but no photography, so the proof block renders without
 * an image column rather than reserving empty space for one.
 */
const CASE_STUDIES: Record<string, { logo: string; image?: string; href: string; blogHref: string }> = {
  Omnium: { logo: logoOmnium, href: CASE_STUDY_HREF, blogHref: BLOG_HREF },
}

export default function Page() {
  const { t } = useTranslation()
  const { locale } = usePageContext() as unknown as { locale: Locale }
  const content = t('solutions.associations', { returnObjects: true }) as VerticalContent
  const testimonials = getTestimonialsData(t)
  const proof = getAssociationsProof(locale)

  // Testimonials are resolved by organization, so a market override is a name
  // change rather than an import change.
  const quoteFor = (org: string) => {
    const platformName = ORGANIZATIONS[org]?.platformName
    return testimonials.find((item) => item.platformName === platformName)
  }

  return (
    <VerticalPage
      icon={UsersIcon}
      content={content}
      appHref={APP_SIGNUP_URL}
      pricingHref={PRICING_URL}
      ctaPrefix='associations'
      logos={proof.logos.map((org) => ({ src: ORGANIZATIONS[org].logo, alt: ORGANIZATIONS[org].alt }))}
      caseStudy={CASE_STUDIES[proof.caseStudy] ?? CASE_STUDIES.Omnium}
      quotes={{
        stakes: quoteFor(proof.quotes.stakes),
        how: quoteFor(proof.quotes.how),
        proof: quoteFor(proof.quotes.proof),
      }}
      resourceLinks={[
        { href: CASE_STUDY_HREF },
        { href: '/learn/quorum-meaning-for-online-voting' },
        { href: '/learn/how-to-run-a-legally-valid-agm-online' },
        { href: '/learn/anonymous-voting-explained' },
        { href: '/learn/verifiable-voting-explained' },
        { href: '/learn/gdpr-requirements-for-digital-voting' },
      ]}
    />
  )
}
