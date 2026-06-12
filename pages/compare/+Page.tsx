import { Eye, Lock, Scale, Unlock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, RelatedLinks } from '@/components/marketing'

export default function CompareHubPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('compare.hub.hero.eyebrow', 'Comparison')}
        title={t('compare.hub.hero.title', 'Compare Vocdoni with other online voting platforms')}
        subtitle={t(
          'compare.hub.hero.subtitle',
          'Honest, feature-by-feature comparisons against the voting tools teams evaluate most. We are fair to every competitor and clear about where Vocdoni leads.'
        )}
        primaryCta={{
          label: t('compare.hub.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.hub.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('compare.hub.comparisons.title', 'Side-by-side comparisons')}
        links={[
          {
            label: t('compare.hub.comparisons.kuorum', 'Vocdoni vs Kuorum'),
            href: '/compare/vocdoni-vs-kuorum',
            description: t(
              'compare.hub.comparisons.kuorum_desc',
              'Verifiability and openness vs a participation platform.'
            ),
          },
          {
            label: t('compare.hub.comparisons.polyas', 'Vocdoni vs Polyas'),
            href: '/compare/vocdoni-vs-polyas',
            description: t(
              'compare.hub.comparisons.polyas_desc',
              'Open self-serve voting vs a certified German vendor.'
            ),
          },
          {
            label: t('compare.hub.comparisons.sequent', 'Vocdoni vs Sequent'),
            href: '/compare/vocdoni-vs-sequent',
            description: t('compare.hub.comparisons.sequent_desc', 'Two open source, verifiable voting projects.'),
          },
          {
            label: t('compare.hub.comparisons.assembly', 'Vocdoni vs Assembly Voting'),
            href: '/compare/vocdoni-vs-assembly-voting',
            description: t('compare.hub.comparisons.assembly_desc', 'Two verifiability-focused election tools.'),
          },
          {
            label: t('compare.hub.comparisons.eligo', 'Vocdoni vs Eligo'),
            href: '/compare/vocdoni-vs-eligo',
            description: t('compare.hub.comparisons.eligo_desc', 'Open verifiability vs Italian online voting.'),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('compare.hub.criteria.eyebrow', 'How to choose')}
        title={t('compare.hub.criteria.title', 'What to look for in an online voting platform')}
        description={t(
          'compare.hub.criteria.description',
          'Four questions that separate a tool you can trust from one you simply hope works.'
        )}
        columns={4}
        features={[
          {
            icon: Eye,
            title: t('compare.hub.criteria.verifiable.title', 'Can results be verified?'),
            description: t(
              'compare.hub.criteria.verifiable.description',
              'Look for end-to-end verifiability so any voter can confirm the count, not just trust the vendor.'
            ),
          },
          {
            icon: Lock,
            title: t('compare.hub.criteria.private.title', 'Are ballots truly secret?'),
            description: t(
              'compare.hub.criteria.private.description',
              'Zero-knowledge anonymity keeps votes private, even from the platform running them.'
            ),
          },
          {
            icon: Unlock,
            title: t('compare.hub.criteria.open.title', 'Is the code open?'),
            description: t(
              'compare.hub.criteria.open.description',
              'Open source lets independent experts audit how votes are cast and counted.'
            ),
          },
          {
            icon: Scale,
            title: t('compare.hub.criteria.pricing.title', 'Is pricing transparent?'),
            description: t(
              'compare.hub.criteria.pricing.description',
              'Published plans and a free tier let you test before you commit, with no surprise quotes.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('compare.hub.cta.title', 'See the difference for yourself')}
        description={t(
          'compare.hub.cta.description',
          'Run a free, anonymous, verifiable vote today, or talk to us about your election.'
        )}
        primaryCta={{
          label: t('compare.hub.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.hub.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
