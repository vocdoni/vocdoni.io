import { UsersIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { useAppAuthUrl } from '@/hooks/useAppAuthUrl'
import { MemberJourneyMockup } from '@/components/solutions/mockups/MemberJourneyMockup'
import { ProcessConsoleMockup } from '@/components/solutions/mockups/ProcessConsoleMockup'
import type { MockupFigures } from '@/components/solutions/mockups/types'
import { PRICING_HREF } from '@/components/app/pricing/PricingLink'
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
const APP_SIGNUP_TYPE = 'associations'
const PRICING_URL = PRICING_HREF

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

/**
 * The assembly the product mockups picture: an annual general assembly of an
 * association with a few thousand members, one evening of voting. Numbers live
 * here, words in `solutions.associations.mockups`.
 */
const FIGURES: MockupFigures = {
  census: 4280,
  liveVotes: 1537,
  finalVotes: 2961,
  start: new Date(2026, 5, 18, 17, 0),
  end: new Date(2026, 5, 18, 21, 0),
  results: [
    [2588, 219, 154],
    [1712, 1035, 214],
  ],
  selectedChoice: 0,
  memberNumber: '0931',
  code: '730256',
  processId: '0x5b17…a9d3',
  voteId: '0x9e2c…47f0',
}

export default function Page() {
  const { t } = useTranslation()
  const pageContext = usePageContext()
  const appSignupUrl = useAppAuthUrl('signup', APP_SIGNUP_TYPE)
  const locale = ((pageContext as { locale?: Locale }).locale ?? 'en') as Locale

  const content = t('solutions.associations', { returnObjects: true }) as VerticalContent
  const testimonials = getTestimonialsData(t)
  const proof = getAssociationsProof(locale)

  // Testimonials are resolved by organization, so a market override is a name
  // change rather than an import change.
  const quoteFor = (org: string) => {
    const platformName = ORGANIZATIONS[org]?.platformName
    return testimonials.find((item) => item.platformName === platformName)
  }

  // Skip rather than throw: a market override naming an organization this page
  // has no art for should cost one logo, not blank the whole prerendered page.
  const logos = proof.logos
    .map((org) => ORGANIZATIONS[org])
    .filter(Boolean)
    .map(({ logo, alt }) => ({ src: logo, alt }))

  return (
    <VerticalPage
      icon={UsersIcon}
      content={content}
      appHref={appSignupUrl}
      pricingHref={PRICING_URL}
      ctaPrefix='associations'
      logos={logos}
      caseStudy={CASE_STUDIES[proof.caseStudy] ?? CASE_STUDIES.Omnium}
      quotes={{
        stakes: quoteFor(proof.quotes.stakes),
        how: quoteFor(proof.quotes.how),
        proof: quoteFor(proof.quotes.proof),
      }}
      media={{
        console: (
          <ProcessConsoleMockup
            state='live'
            density='close'
            copy={content?.mockups}
            figures={FIGURES}
            label={content?.how?.media_caption}
          />
        ),
        results: (
          <ProcessConsoleMockup
            state='results'
            copy={content?.mockups}
            figures={FIGURES}
            label={content?.how?.results_media_caption ?? content?.how?.media_caption}
          />
        ),
        ballot: (
          <MemberJourneyMockup copy={content?.mockups} figures={FIGURES} label={content?.how?.steps_media_caption} />
        ),
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
