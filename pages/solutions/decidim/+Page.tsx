import { PuzzleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { VerticalPage } from '@/components/solutions/vertical/VerticalPage'
import type { VerticalContent } from '@/components/solutions/vertical/types'
import logoDecidim from '@/assets/logos/logo_decidim_colour.webp'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'
import logoErc from '@/assets/logos/logo_erc_round.webp'
import logoBcn from '@/assets/logos/logo_bcn_round.webp'
import logoPlataforma from '@/assets/logos/logo_plataforma_colour.webp'
import logoCec from '@/assets/logos/logo_cec_colour.webp'

/**
 * The conversion goal here is contact, not app signup, which is why `appHref`
 * is the contact page rather than the usual vertical-tagged signup. The `type`
 * is kept because `readSignupType` in lib/analytics.ts still reads it, so a
 * click from this page carries `signup_type: decidim` and joins the funnel the
 * same way the self-serve verticals do.
 *
 * Nothing on this page can be self-served today: Decidim 0.33 is unreleased and
 * the gem is installed from source, and an integrator API key has to be asked
 * for. The single ask is therefore correct rather than a compromise.
 */
const CONTACT_URL = '/contact?type=decidim'
const PRICING_URL = `${APP_URL}/plans`

const REPO_URL = 'https://github.com/vocdoni/decidim-secure_elections'
/** Decidim's own seed data, so every label pointing here says sandbox. */
const SANDBOX_URL = 'https://decidim.vocdoni.io/'

/**
 * The trust band carries Vocdoni references, not Decidim's mark: a customer
 * logo row containing it would assert that Decidim is a Vocdoni customer. The
 * mark appears once, in the proof block, where the subject is the module.
 */
const LOGOS = [
  { src: logoOmnium, alt: 'Òmnium Cultural' },
  { src: logoErc, alt: 'Esquerra Republicana de Catalunya' },
  { src: logoBcn, alt: 'Ajuntament de Barcelona' },
  { src: logoPlataforma, alt: 'Plataforma per la Llengua' },
  { src: logoCec, alt: 'Centre Excursionista de Catalunya' },
]

export default function Page() {
  const { t } = useTranslation()
  const content = t('solutions.decidim', { returnObjects: true }) as VerticalContent

  return (
    <VerticalPage
      icon={PuzzleIcon}
      content={content}
      appHref={CONTACT_URL}
      secondaryHref={REPO_URL}
      pricingHref={PRICING_URL}
      ctaPrefix='decidim'
      logos={LOGOS}
      // The module is the subject, so the two links are the sandbox and the
      // source rather than a case study and a post. There is no Decidim
      // customer testimonial and none is invented: `quotes` is empty and
      // VerticalProof drops the blockquote.
      caseStudy={{ logo: logoDecidim, href: SANDBOX_URL, blogHref: REPO_URL }}
      quotes={{}}
      resourceLinks={[
        { href: REPO_URL },
        { href: SANDBOX_URL },
        { href: '/developers/docs/overview' },
        { href: '/learn/verifiable-voting-explained' },
        { href: '/learn/anonymous-voting-explained' },
        { href: '/learn/gdpr-requirements-for-digital-voting' },
      ]}
    />
  )
}
