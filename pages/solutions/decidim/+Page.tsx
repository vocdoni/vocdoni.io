import { PuzzleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { VerticalClosingCta } from '@/components/solutions/vertical/VerticalClosingCta'
import { VerticalComparison } from '@/components/solutions/vertical/VerticalComparison'
import { VerticalEngagement } from '@/components/solutions/vertical/VerticalEngagement'
import { VerticalFaq } from '@/components/solutions/vertical/VerticalFaq'
import { VerticalHero } from '@/components/solutions/vertical/VerticalHero'
import { VerticalHowItRuns } from '@/components/solutions/vertical/VerticalHowItRuns'
import { VerticalLegal } from '@/components/solutions/vertical/VerticalLegal'
import { VerticalPartnerBand } from '@/components/solutions/vertical/VerticalPartnerBand'
import { VerticalSectionIndex, type VerticalIndexItem } from '@/components/solutions/vertical/VerticalSectionIndex'
import { VerticalGuarantees } from '@/components/solutions/vertical/VerticalGuarantees'
import { VerticalTrustBand } from '@/components/solutions/vertical/VerticalTrustBand'
import type { VerticalContent } from '@/components/solutions/vertical/types'
import logoDecidim from '@/assets/logos/logo_decidim_colour.webp'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'
import logoErc from '@/assets/logos/erc.webp'
import logoBcn from '@/assets/logos/barcelona.webp'
import logoPlataforma from '@/assets/logos/logo_plataforma_colour.webp'
import logoCec from '@/assets/logos/logo_cec_colour.webp'

/**
 * The conversion goal here is contact, not app signup, which is why `appHref`
 * is the contact page rather than the usual vertical-tagged signup. The `type`
 * is kept because `readSignupType` in lib/analytics.ts still reads it, so a
 * click from this page carries `signup_type: decidim` and joins the funnel the
 * same way the self-serve verticals do.
 *
 * Nothing on this page can be self-served today: Decidim 0.33 is unreleased,
 * the module is installed from source, and an integrator API key has to be
 * asked for. Commercial terms are agreed in conversation, so the page carries
 * no pricing and no link to the plans.
 */
const CONTACT_URL = '/contact?type=decidim'
const REPO_URL = 'https://github.com/vocdoni/decidim-secure_elections'
/** Where the Decidim team itself points readers who need cryptographic guarantees. */
const DECIDIM_RELEASE_NOTES_URL = 'https://decidim.org/blog/2025-11-20-new-version-0-31-0/'
const CTA_PREFIX = 'decidim'

/**
 * The trust band carries Vocdoni references only. Decidim's mark sits in the
 * partner band above it, where the subject is the partnership: a customer logo
 * row containing it would assert that Decidim is a Vocdoni customer.
 */
const DECIDIM_LOGO = { src: logoDecidim, alt: 'Decidim' }
const LOGOS = [
  { src: logoOmnium, alt: 'Òmnium Cultural' },
  { src: logoErc, alt: 'Esquerra Republicana de Catalunya' },
  { src: logoBcn, alt: 'Ajuntament de Barcelona' },
  { src: logoPlataforma, alt: 'Plataforma per la Llengua' },
  { src: logoCec, alt: 'Centre Excursionista de Catalunya' },
]

/**
 * Composed from the vertical kit's sections directly rather than through
 * `VerticalPage`, because this page differs from the organization verticals in
 * shape, not just copy: it opens with a partner band, has no case study and no
 * proof section, and puts the comparison right after the stakes, since "a form
 * or an election" is the whole argument for an operator who already votes
 * online. `VerticalPage` keeps its fixed order for the nine verticals that
 * share it.
 *
 * Two buyers read this page: an organization already on Decidim and the
 * integrator who maintains it for them. Sections that address them separately
 * (engagement, closing) do so in copy, not in layout.
 */
export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.decidim', { returnObjects: true }) as VerticalContent

  // The partner band is deliberately not indexed: it is a credential, not a
  // section the reader navigates to.
  const indexItems: VerticalIndexItem[] = [
    { id: 'overview', label: content?.eyebrow },
    { id: 'stakes', label: content?.guarantees?.eyebrow },
    { id: 'comparison', label: content?.comparison?.eyebrow },
    { id: 'how-it-runs', label: content?.how?.eyebrow },
    { id: 'legal-validity', label: content?.legal?.eyebrow },
    { id: 'engagement', label: content?.engagement?.eyebrow },
    { id: 'faq', label: content?.faq?.eyebrow },
  ].filter((item): item is VerticalIndexItem => Boolean(item.label))

  return (
    <>
      <VerticalSectionIndex items={indexItems} />

      <VerticalHero
        icon={PuzzleIcon}
        eyebrow={content?.eyebrow}
        hero={content?.hero}
        appHref={CONTACT_URL}
        secondaryHref={REPO_URL}
        ctaId={`${CTA_PREFIX}_hero`}
        // No Decidim screenshot exists yet, and the reserved media panel beside
        // the headline would be an empty box promising nothing.
        layout='centered'
      />

      <VerticalPartnerBand
        partner={content?.partner}
        logo={DECIDIM_LOGO}
        href={DECIDIM_RELEASE_NOTES_URL}
        pageId={CTA_PREFIX}
        ctaId={`${CTA_PREFIX}_partner`}
      />

      <VerticalTrustBand trust={content?.trust} logos={LOGOS} />

      <VerticalGuarantees guarantees={content?.guarantees} pageId={CTA_PREFIX} />

      <VerticalComparison comparison={content?.comparison} pageId={CTA_PREFIX} />

      <VerticalHowItRuns how={content?.how} pageId={CTA_PREFIX} />

      <VerticalLegal legal={content?.legal} pageId={CTA_PREFIX} appHref={CONTACT_URL} ctaId={`${CTA_PREFIX}_legal`} />

      {/* Both lanes ask for a conversation, so both hrefs are the contact page
          and the analytics id tells the lanes apart by the `_app` and
          `_contact` suffixes VerticalCtaPair appends. */}
      <VerticalEngagement
        engagement={content?.engagement}
        pageId={CTA_PREFIX}
        appHref={CONTACT_URL}
        ctaId={`${CTA_PREFIX}_engagement`}
        pricingHref={CONTACT_URL}
        pricingCtaId={`${CTA_PREFIX}_pricing`}
      />

      <VerticalFaq faq={content?.faq} pageId={CTA_PREFIX} />

      <VerticalClosingCta
        closing={content?.closing}
        pageId={CTA_PREFIX}
        appHref={CONTACT_URL}
        secondaryHref={REPO_URL}
        ctaId={`${CTA_PREFIX}_closing`}
      />
    </>
  )
}
