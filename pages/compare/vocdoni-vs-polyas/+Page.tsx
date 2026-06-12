import { Gauge, Unlock, Wallet } from 'lucide-react'
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

export default function ComparePolyasPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('compare.polyas.hero.eyebrow', 'Comparison')}
        title={t('compare.polyas.hero.title', 'Vocdoni vs Polyas: which online voting platform fits you?')}
        subtitle={t(
          'compare.polyas.hero.subtitle',
          'Polyas is a long-established, certified voting provider. This honest comparison shows where each tool is strongest so you can choose with confidence.'
        )}
        primaryCta={{
          label: t('compare.polyas.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.polyas.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <ProseSection
        eyebrow={t('compare.polyas.intro.eyebrow', 'Who each tool is for')}
        title={t('compare.polyas.intro.title', 'Certified heritage or open, self-serve verifiability')}
        blocks={[
          {
            heading: t('compare.polyas.intro.polyas.heading', 'Where Polyas shines'),
            paragraphs: [
              t(
                'compare.polyas.intro.polyas.p1',
                'Polyas is a German voting provider with a long history and formal certifications, often chosen for regulated elections that need an established, certified vendor. If certification heritage and a traditional sales-led rollout are your priority, Polyas is a credible option.'
              ),
            ],
          },
          {
            heading: t('compare.polyas.intro.vocdoni.heading', 'Where Vocdoni shines'),
            paragraphs: [
              t(
                'compare.polyas.intro.vocdoni.p1',
                'Vocdoni is open source, end-to-end verifiable, and self-serve. You can start a real vote for free in minutes, see transparent pricing, and let any member verify the result independently rather than relying on a vendor certificate alone.'
              ),
            ],
          },
        ]}
      />

      <FeatureComparisonTable
        eyebrow={t('compare.polyas.table.eyebrow', 'Feature by feature')}
        title={t('compare.polyas.table.title', 'Vocdoni and Polyas side by side')}
        description={t(
          'compare.polyas.table.description',
          'A fair, feature-by-feature look. Polyas has real strengths and we mark them honestly.'
        )}
        featureColumnLabel={t('compare.polyas.table.feature_label', 'Feature')}
        columns={[{ name: t('compare.polyas.table.col_vocdoni', 'Vocdoni'), highlighted: true }, { name: 'Polyas' }]}
        rows={[
          {
            feature: t('compare.polyas.table.row_verifiability', 'End-to-end verifiability'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.verifiability_v', 'Universally verifiable results') },
              { status: 'neutral', text: t('compare.polyas.table.verifiability_c', 'Certified, less open proof') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_anonymity', 'Anonymity (zero-knowledge)'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.anonymity_v', 'zk-SNARK anonymous ballots') },
              { status: 'neutral', text: t('compare.polyas.table.anonymity_c', 'Standard secret ballot') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_open_source', 'Open source'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.open_source_v', 'Fully open source') },
              { status: 'negative', text: t('compare.polyas.table.open_source_c', 'Proprietary') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_weighted', 'Weighted voting'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.weighted_v', 'Supported') },
              { status: 'positive', text: t('compare.polyas.table.weighted_c', 'Supported') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_hybrid', 'Hybrid voting'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.hybrid_v', 'In-person and remote') },
              { status: 'neutral', text: t('compare.polyas.table.hybrid_c', 'Mainly remote') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_instant', 'Instant results'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.instant_v', 'Results in seconds') },
              { status: 'positive', text: t('compare.polyas.table.instant_c', 'Fast digital tally') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_gdpr', 'GDPR / EU hosting'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.gdpr_v', 'EU-hosted, GDPR compliant') },
              { status: 'positive', text: t('compare.polyas.table.gdpr_c', 'German hosting, GDPR compliant') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_pricing', 'Pricing transparency'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.pricing_v', 'Public plans and free tier') },
              { status: 'negative', text: t('compare.polyas.table.pricing_c', 'Sales contact required') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_support', 'Expert support'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.support_v', 'Election specialists') },
              { status: 'positive', text: t('compare.polyas.table.support_c', 'Established support team') },
            ],
          },
          {
            feature: t('compare.polyas.table.row_dispute', 'Dispute resistance'),
            cells: [
              { status: 'positive', text: t('compare.polyas.table.dispute_v', 'Cryptographic proof of result') },
              { status: 'positive', text: t('compare.polyas.table.dispute_c', 'Certified process') },
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('compare.polyas.reasons.eyebrow', 'Why teams switch')}
        title={t('compare.polyas.reasons.title', 'Three reasons teams pick Vocdoni over Polyas')}
        columns={3}
        features={[
          {
            icon: Unlock,
            title: t('compare.polyas.reasons.open.title', 'Open source you can audit'),
            description: t(
              'compare.polyas.reasons.open.description',
              'Trust does not stop at a certificate. The whole stack is public for anyone to inspect.'
            ),
          },
          {
            icon: Gauge,
            title: t('compare.polyas.reasons.selfserve.title', 'Free, self-serve start'),
            description: t(
              'compare.polyas.reasons.selfserve.description',
              'Launch a real vote in minutes without waiting on a sales call.'
            ),
          },
          {
            icon: Wallet,
            title: t('compare.polyas.reasons.pricing.title', 'Transparent pricing'),
            description: t(
              'compare.polyas.reasons.pricing.description',
              'Published plans and a free tier, so you know the cost before you commit.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('compare.polyas.faq.eyebrow', 'Questions')}
        title={t('compare.polyas.faq.title', 'Vocdoni and Polyas, answered')}
        items={[
          {
            question: t('compare.polyas.faq.q1.question', 'Is Vocdoni a good Polyas alternative?'),
            answer: t(
              'compare.polyas.faq.q1.answer',
              'Yes, especially if you want open source code, transparent pricing, and end-to-end verifiability. Polyas is a solid certified vendor, while Vocdoni lets you prove correctness openly and start for free.'
            ),
          },
          {
            question: t('compare.polyas.faq.q2.question', 'Can we migrate from Polyas to Vocdoni?'),
            answer: t(
              'compare.polyas.faq.q2.answer',
              'Yes. Import your voter census as a spreadsheet and run a verifiable vote quickly. For statutory elections, our team supports onboarding and a rehearsal vote.'
            ),
          },
          {
            question: t('compare.polyas.faq.q3.question', 'How does pricing compare?'),
            answer: t(
              'compare.polyas.faq.q3.answer',
              'Vocdoni publishes a free tier and fixed annual plans, with custom quotes for large elections. Polyas generally requires a sales conversation to get a price.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('compare.polyas.cta.title', 'Try verifiable voting, no sales call needed')}
        description={t(
          'compare.polyas.cta.description',
          'Run a free, anonymous, verifiable vote today, or talk to us about a regulated election.'
        )}
        primaryCta={{
          label: t('compare.polyas.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.polyas.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('compare.polyas.related.title', 'Keep comparing')}
        links={[
          {
            label: t('compare.polyas.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('compare.polyas.related.verifiability_desc', 'The proof behind every result.'),
          },
          {
            label: t('compare.polyas.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('compare.polyas.related.pricing_desc', 'Plans, free tier, and custom quotes.'),
          },
          {
            label: t('compare.polyas.related.alternatives', 'All voting platform alternatives'),
            href: '/alternatives',
            description: t('compare.polyas.related.alternatives_desc', 'See every comparison in one place.'),
          },
          {
            label: t('compare.polyas.related.kuorum', 'Vocdoni vs Kuorum'),
            href: '/compare/vocdoni-vs-kuorum',
            description: t('compare.polyas.related.kuorum_desc', 'Compared with a participation platform.'),
          },
          {
            label: t('compare.polyas.related.assembly', 'Vocdoni vs Assembly Voting'),
            href: '/compare/vocdoni-vs-assembly-voting',
            description: t('compare.polyas.related.assembly_desc', 'Two verifiability-focused tools compared.'),
          },
        ]}
      />
    </>
  )
}
