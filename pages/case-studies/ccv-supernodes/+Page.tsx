import { BadgeCheck, Handshake, Network, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection, RelatedLinks, StatStrip } from '@/components/marketing'

export default function CaseStudyCcvSupernodesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('case_studies.ccv_supernodes.hero.eyebrow', 'Channel partnership')}
        title={t('case_studies.ccv_supernodes.hero.title', 'How CCV SuperNodes brings Vocdoni to more organizations')}
        subtitle={t(
          'case_studies.ccv_supernodes.hero.subtitle',
          'A partner-led channel programme that puts verifiable online voting in reach of organizations through trusted distribution partners.'
        )}
        primaryCta={{
          label: t('case_studies.ccv_supernodes.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('case_studies.ccv_supernodes.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <StatStrip
        stats={[
          {
            value: t('case_studies.ccv_supernodes.stats.reach_value', 'Wider'),
            label: t('case_studies.ccv_supernodes.stats.reach_label', 'Reach through partner distribution'),
          },
          {
            value: t('case_studies.ccv_supernodes.stats.verifiable_value', '100%'),
            label: t('case_studies.ccv_supernodes.stats.verifiable_label', 'Verifiable voting, end to end'),
          },
          {
            value: t('case_studies.ccv_supernodes.stats.model_value', 'Partner-led'),
            label: t('case_studies.ccv_supernodes.stats.model_label', 'Channel programme model'),
          },
        ]}
      />

      <ProseSection
        eyebrow={t('case_studies.ccv_supernodes.story.eyebrow', 'The story')}
        title={t('case_studies.ccv_supernodes.story.title', 'Reaching more organizations through partners')}
        blocks={[
          {
            heading: t('case_studies.ccv_supernodes.story.challenge.heading', 'The challenge'),
            paragraphs: [
              t(
                'case_studies.ccv_supernodes.story.challenge.paragraph_1',
                'Many organizations would benefit from verifiable online voting but reach Vocdoni through their existing technology and service providers rather than directly. Meeting them where they already are calls for a strong channel.'
              ),
            ],
          },
          {
            heading: t('case_studies.ccv_supernodes.story.solution.heading', 'The solution'),
            paragraphs: [
              t(
                'case_studies.ccv_supernodes.story.solution.paragraph_1',
                'The CCV SuperNodes channel programme is a partner-led distribution model. Partners bring Vocdoni to the organizations they serve, while the underlying voting keeps the same privacy and verifiability guarantees.'
              ),
            ],
          },
          {
            heading: t('case_studies.ccv_supernodes.story.result.heading', 'The result'),
            paragraphs: [
              t(
                'case_studies.ccv_supernodes.story.result.paragraph_1',
                'More organizations can adopt secure, verifiable voting through partners they already trust, without compromising on the guarantees that make Vocdoni different.'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('case_studies.ccv_supernodes.features.eyebrow', 'What it offers')}
        title={t('case_studies.ccv_supernodes.features.title', 'The building blocks of the channel programme')}
        columns={4}
        features={[
          {
            icon: Handshake,
            title: t('case_studies.ccv_supernodes.features.partner.title', 'Partner-led distribution'),
            description: t(
              'case_studies.ccv_supernodes.features.partner.description',
              'Partners deliver Vocdoni to the organizations they already serve.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('case_studies.ccv_supernodes.features.verifiable.title', 'Verifiable results'),
            description: t(
              'case_studies.ccv_supernodes.features.verifiable.description',
              'The same end-to-end verifiability, regardless of the channel.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('case_studies.ccv_supernodes.features.privacy.title', 'Privacy by design'),
            description: t(
              'case_studies.ccv_supernodes.features.privacy.description',
              'Ballots stay secret, however the organization comes on board.'
            ),
          },
          {
            icon: Network,
            title: t('case_studies.ccv_supernodes.features.scale.title', 'Built to scale'),
            description: t(
              'case_studies.ccv_supernodes.features.scale.description',
              'A model designed to extend reach without diluting trust.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('case_studies.ccv_supernodes.cta.title', 'Bring verifiable voting to your network')}
        description={t(
          'case_studies.ccv_supernodes.cta.description',
          'Start a free vote today, or talk to us about partnering with Vocdoni.'
        )}
        primaryCta={{
          label: t('case_studies.ccv_supernodes.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('case_studies.ccv_supernodes.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('case_studies.ccv_supernodes.related.title', 'Keep exploring')}
        links={[
          {
            label: t('case_studies.ccv_supernodes.related.partners', 'Partner with Vocdoni'),
            href: '/partners',
            description: t(
              'case_studies.ccv_supernodes.related.partners_desc',
              'How channel partnerships work with Vocdoni.'
            ),
          },
          {
            label: t('case_studies.ccv_supernodes.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t(
              'case_studies.ccv_supernodes.related.verifiability_desc',
              'Why results can be checked by anyone.'
            ),
          },
          {
            label: t('case_studies.ccv_supernodes.related.more', 'More case studies'),
            href: '/case-studies',
            description: t('case_studies.ccv_supernodes.related.more_desc', 'See how other organizations vote online.'),
          },
        ]}
      />
    </>
  )
}
