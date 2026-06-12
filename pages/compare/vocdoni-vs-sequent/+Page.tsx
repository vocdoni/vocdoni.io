import { EyeOff, Headset, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  CtaBanner,
  FaqAccordion,
  FeatureComparisonTable,
  FeatureGrid,
  MarketingHero,
  ProseSection,
  RelatedLinks,
} from '@/components/marketing'

export default function CompareSequentPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('compare.sequent.hero.eyebrow', 'Comparison')}
        title={t('compare.sequent.hero.title', 'Vocdoni vs Sequent: which online voting platform fits you?')}
        subtitle={t(
          'compare.sequent.hero.subtitle',
          'Sequent, formerly nVotes, is an open source verifiable voting project. Both tools share open values, so this comparison focuses on the real day-to-day differences.'
        )}
        primaryCta={{
          label: t('compare.sequent.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.sequent.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <ProseSection
        eyebrow={t('compare.sequent.intro.eyebrow', 'Who each tool is for')}
        title={t('compare.sequent.intro.title', 'Two open source, verifiable voting projects')}
        blocks={[
          {
            heading: t('compare.sequent.intro.sequent.heading', 'Where Sequent shines'),
            paragraphs: [
              t(
                'compare.sequent.intro.sequent.p1',
                'Sequent, previously known as nVotes, is an open source, verifiable voting platform with a strong cryptographic heritage. If you value open source and want a verifiable tally, Sequent is a respected, capable project that shares many of our principles.'
              ),
            ],
          },
          {
            heading: t('compare.sequent.intro.vocdoni.heading', 'Where Vocdoni shines'),
            paragraphs: [
              t(
                'compare.sequent.intro.vocdoni.p1',
                'Vocdoni pairs the same open, verifiable foundations with a polished self-serve product, anonymity through zero-knowledge cryptography, EU hosting, and hands-on expert support. You can launch a real vote for free in minutes without standing up infrastructure yourself.'
              ),
            ],
          },
        ]}
      />

      <FeatureComparisonTable
        eyebrow={t('compare.sequent.table.eyebrow', 'Feature by feature')}
        title={t('compare.sequent.table.title', 'Vocdoni and Sequent side by side')}
        description={t(
          'compare.sequent.table.description',
          'A fair, feature-by-feature look. Sequent is also open source and verifiable, and we say so clearly.'
        )}
        featureColumnLabel={t('compare.sequent.table.feature_label', 'Feature')}
        columns={[{ name: t('compare.sequent.table.col_vocdoni', 'Vocdoni'), highlighted: true }, { name: 'Sequent' }]}
        rows={[
          {
            feature: t('compare.sequent.table.row_verifiability', 'End-to-end verifiability'),
            cells: [
              {
                status: 'positive',
                text: t('compare.sequent.table.verifiability_v', 'Universally verifiable results'),
              },
              { status: 'positive', text: t('compare.sequent.table.verifiability_c', 'Verifiable tally') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_anonymity', 'Anonymity (zero-knowledge)'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.anonymity_v', 'zk-SNARK anonymous ballots') },
              { status: 'neutral', text: t('compare.sequent.table.anonymity_c', 'Mixnet-based secrecy') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_open_source', 'Open source'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.open_source_v', 'Fully open source') },
              { status: 'positive', text: t('compare.sequent.table.open_source_c', 'Fully open source') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_weighted', 'Weighted voting'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.weighted_v', 'Supported') },
              { status: 'positive', text: t('compare.sequent.table.weighted_c', 'Supported') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_hybrid', 'Hybrid voting'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.hybrid_v', 'In-person and remote') },
              { status: 'neutral', text: t('compare.sequent.table.hybrid_c', 'Mainly remote') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_instant', 'Instant results'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.instant_v', 'Results in seconds') },
              { status: 'positive', text: t('compare.sequent.table.instant_c', 'Verifiable count') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_gdpr', 'GDPR / EU hosting'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.gdpr_v', 'EU-hosted, GDPR compliant') },
              { status: 'neutral', text: t('compare.sequent.table.gdpr_c', 'Self-host or managed') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_pricing', 'Pricing transparency'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.pricing_v', 'Public plans and free tier') },
              { status: 'neutral', text: t('compare.sequent.table.pricing_c', 'Project-based quote') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_support', 'Expert support'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.support_v', 'Election specialists') },
              { status: 'neutral', text: t('compare.sequent.table.support_c', 'Project support') },
            ],
          },
          {
            feature: t('compare.sequent.table.row_dispute', 'Dispute resistance'),
            cells: [
              { status: 'positive', text: t('compare.sequent.table.dispute_v', 'Cryptographic proof of result') },
              { status: 'positive', text: t('compare.sequent.table.dispute_c', 'Cryptographic proof of result') },
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('compare.sequent.reasons.eyebrow', 'Why teams switch')}
        title={t('compare.sequent.reasons.title', 'Three reasons teams pick Vocdoni over Sequent')}
        columns={3}
        features={[
          {
            icon: Rocket,
            title: t('compare.sequent.reasons.product.title', 'A ready, self-serve product'),
            description: t(
              'compare.sequent.reasons.product.description',
              'Start a real vote for free in minutes, with no infrastructure to set up or maintain.'
            ),
          },
          {
            icon: EyeOff,
            title: t('compare.sequent.reasons.anonymity.title', 'Anonymity via zero-knowledge'),
            description: t(
              'compare.sequent.reasons.anonymity.description',
              'zk-SNARK ballots keep votes private while staying fully verifiable.'
            ),
          },
          {
            icon: Headset,
            title: t('compare.sequent.reasons.support.title', 'EU hosting and expert support'),
            description: t(
              'compare.sequent.reasons.support.description',
              'EU-hosted and GDPR compliant, with specialists who have run hundreds of elections.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('compare.sequent.faq.eyebrow', 'Questions')}
        title={t('compare.sequent.faq.title', 'Vocdoni and Sequent, answered')}
        items={[
          {
            question: t('compare.sequent.faq.q1.question', 'Is Vocdoni a good Sequent alternative?'),
            answer: t(
              'compare.sequent.faq.q1.answer',
              'Yes. Both are open source and verifiable, so this is a close call. Vocdoni adds a polished self-serve product, zero-knowledge anonymity, EU hosting, and a free tier, which suits teams that want to start fast without running their own infrastructure.'
            ),
          },
          {
            question: t('compare.sequent.faq.q2.question', 'Can we migrate from Sequent to Vocdoni?'),
            answer: t(
              'compare.sequent.faq.q2.answer',
              'Yes. Import your voter census as a spreadsheet and run a verifiable vote without deploying anything. Our team helps with onboarding and a rehearsal vote for larger elections.'
            ),
          },
          {
            question: t('compare.sequent.faq.q3.question', 'How does pricing compare?'),
            answer: t(
              'compare.sequent.faq.q3.answer',
              'Vocdoni offers a free tier and published annual plans, so you can begin at no cost. Sequent projects are usually scoped and quoted individually, often including self-hosting.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('compare.sequent.cta.title', 'Open, verifiable, and ready to use')}
        description={t(
          'compare.sequent.cta.description',
          'Run a free, anonymous, verifiable vote today, or talk to us about your election.'
        )}
        primaryCta={{
          label: t('compare.sequent.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.sequent.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('compare.sequent.related.title', 'Keep comparing')}
        links={[
          {
            label: t('compare.sequent.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('compare.sequent.related.verifiability_desc', 'The proof behind every result.'),
          },
          {
            label: t('compare.sequent.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('compare.sequent.related.pricing_desc', 'Plans, free tier, and custom quotes.'),
          },
          {
            label: t('compare.sequent.related.alternatives', 'All voting platform alternatives'),
            href: '/alternatives',
            description: t('compare.sequent.related.alternatives_desc', 'See every comparison in one place.'),
          },
          {
            label: t('compare.sequent.related.kuorum', 'Vocdoni vs Kuorum'),
            href: '/compare/vocdoni-vs-kuorum',
            description: t('compare.sequent.related.kuorum_desc', 'Compared with a participation platform.'),
          },
          {
            label: t('compare.sequent.related.eligo', 'Vocdoni vs Eligo'),
            href: '/compare/vocdoni-vs-eligo',
            description: t('compare.sequent.related.eligo_desc', 'Compared with Italian online voting.'),
          },
        ]}
      />
    </>
  )
}
