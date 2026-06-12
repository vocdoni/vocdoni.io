import { ShieldCheck, Unlock, Wallet } from 'lucide-react'
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

export default function CompareEligoPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('compare.eligo.hero.eyebrow', 'Comparison')}
        title={t('compare.eligo.hero.title', 'Vocdoni vs Eligo: which online voting platform fits you?')}
        subtitle={t(
          'compare.eligo.hero.subtitle',
          'Eligo is an established Italian online voting provider. This honest comparison shows where each tool is strongest so you can choose with confidence.'
        )}
        primaryCta={{
          label: t('compare.eligo.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.eligo.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <ProseSection
        eyebrow={t('compare.eligo.intro.eyebrow', 'Who each tool is for')}
        title={t('compare.eligo.intro.title', 'Italian market heritage or open verifiability')}
        blocks={[
          {
            heading: t('compare.eligo.intro.eligo.heading', 'Where Eligo shines'),
            paragraphs: [
              t(
                'compare.eligo.intro.eligo.p1',
                'Eligo is a well known Italian online voting provider with a solid presence in the Italian market and experience across associations, professional bodies, and companies. If you want a local provider with deep familiarity of Italian requirements, Eligo is a credible choice.'
              ),
            ],
          },
          {
            heading: t('compare.eligo.intro.vocdoni.heading', 'Where Vocdoni shines'),
            paragraphs: [
              t(
                'compare.eligo.intro.vocdoni.p1',
                'Vocdoni is open source, end-to-end verifiable, and anonymous through zero-knowledge cryptography, with transparent pricing and a free tier. Any member can independently verify the result, and you can start a real vote without a sales process.'
              ),
            ],
          },
        ]}
      />

      <FeatureComparisonTable
        eyebrow={t('compare.eligo.table.eyebrow', 'Feature by feature')}
        title={t('compare.eligo.table.title', 'Vocdoni and Eligo side by side')}
        description={t(
          'compare.eligo.table.description',
          'A fair, feature-by-feature look. Where Eligo does something well, we say so.'
        )}
        featureColumnLabel={t('compare.eligo.table.feature_label', 'Feature')}
        columns={[{ name: t('compare.eligo.table.col_vocdoni', 'Vocdoni'), highlighted: true }, { name: 'Eligo' }]}
        rows={[
          {
            feature: t('compare.eligo.table.row_verifiability', 'End-to-end verifiability'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.verifiability_v', 'Universally verifiable results') },
              { status: 'neutral', text: t('compare.eligo.table.verifiability_c', 'Audited, less open proof') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_anonymity', 'Anonymity (zero-knowledge)'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.anonymity_v', 'zk-SNARK anonymous ballots') },
              { status: 'neutral', text: t('compare.eligo.table.anonymity_c', 'Standard secret ballot') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_open_source', 'Open source'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.open_source_v', 'Fully open source') },
              { status: 'negative', text: t('compare.eligo.table.open_source_c', 'Proprietary') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_weighted', 'Weighted voting'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.weighted_v', 'Supported') },
              { status: 'positive', text: t('compare.eligo.table.weighted_c', 'Supported') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_hybrid', 'Hybrid voting'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.hybrid_v', 'In-person and remote') },
              { status: 'positive', text: t('compare.eligo.table.hybrid_c', 'Hybrid assemblies') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_instant', 'Instant results'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.instant_v', 'Results in seconds') },
              { status: 'positive', text: t('compare.eligo.table.instant_c', 'Fast digital tally') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_gdpr', 'GDPR / EU hosting'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.gdpr_v', 'EU-hosted, GDPR compliant') },
              { status: 'positive', text: t('compare.eligo.table.gdpr_c', 'Italian hosting, GDPR compliant') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_pricing', 'Pricing transparency'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.pricing_v', 'Public plans and free tier') },
              { status: 'neutral', text: t('compare.eligo.table.pricing_c', 'Quote on request') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_support', 'Expert support'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.support_v', 'Election specialists') },
              { status: 'positive', text: t('compare.eligo.table.support_c', 'Local support team') },
            ],
          },
          {
            feature: t('compare.eligo.table.row_dispute', 'Dispute resistance'),
            cells: [
              { status: 'positive', text: t('compare.eligo.table.dispute_v', 'Cryptographic proof of result') },
              { status: 'neutral', text: t('compare.eligo.table.dispute_c', 'Audit trail') },
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('compare.eligo.reasons.eyebrow', 'Why teams switch')}
        title={t('compare.eligo.reasons.title', 'Three reasons teams pick Vocdoni over Eligo')}
        columns={3}
        features={[
          {
            icon: ShieldCheck,
            title: t('compare.eligo.reasons.verifiable.title', 'Provably correct results'),
            description: t(
              'compare.eligo.reasons.verifiable.description',
              'Every voter can independently verify the count, not just rely on an audit report.'
            ),
          },
          {
            icon: Unlock,
            title: t('compare.eligo.reasons.open.title', 'Open source by default'),
            description: t(
              'compare.eligo.reasons.open.description',
              'The full stack is public, so anyone can inspect how votes are handled.'
            ),
          },
          {
            icon: Wallet,
            title: t('compare.eligo.reasons.pricing.title', 'Transparent pricing'),
            description: t(
              'compare.eligo.reasons.pricing.description',
              'Published plans and a free tier mean no surprises and no sales call to get started.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('compare.eligo.faq.eyebrow', 'Questions')}
        title={t('compare.eligo.faq.title', 'Vocdoni and Eligo, answered')}
        items={[
          {
            question: t('compare.eligo.faq.q1.question', 'Is Vocdoni a good Eligo alternative?'),
            answer: t(
              'compare.eligo.faq.q1.answer',
              'Yes, especially if you want open source code, end-to-end verifiability, and transparent pricing. Eligo is a solid Italian provider, while Vocdoni lets any member prove the result is correct and start for free.'
            ),
          },
          {
            question: t('compare.eligo.faq.q2.question', 'Can we migrate from Eligo to Vocdoni?'),
            answer: t(
              'compare.eligo.faq.q2.answer',
              'Yes. Import your voter census as a spreadsheet and run a verifiable vote quickly. Our team supports onboarding and a rehearsal vote for larger assemblies.'
            ),
          },
          {
            question: t('compare.eligo.faq.q3.question', 'How does pricing compare?'),
            answer: t(
              'compare.eligo.faq.q3.answer',
              'Vocdoni publishes a free tier and fixed annual plans, with custom quotes for large elections. Eligo generally provides pricing on request.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('compare.eligo.cta.title', 'Open, verifiable voting for Italy and beyond')}
        description={t(
          'compare.eligo.cta.description',
          'Run a free, anonymous, verifiable vote today, or talk to us about your election.'
        )}
        primaryCta={{
          label: t('compare.eligo.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.eligo.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('compare.eligo.related.title', 'Keep comparing')}
        links={[
          {
            label: t('compare.eligo.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('compare.eligo.related.verifiability_desc', 'The proof behind every result.'),
          },
          {
            label: t('compare.eligo.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('compare.eligo.related.pricing_desc', 'Plans, free tier, and custom quotes.'),
          },
          {
            label: t('compare.eligo.related.alternatives', 'All voting platform alternatives'),
            href: '/alternatives',
            description: t('compare.eligo.related.alternatives_desc', 'See every comparison in one place.'),
          },
          {
            label: t('compare.eligo.related.kuorum', 'Vocdoni vs Kuorum'),
            href: '/compare/vocdoni-vs-kuorum',
            description: t('compare.eligo.related.kuorum_desc', 'Compared with a participation platform.'),
          },
          {
            label: t('compare.eligo.related.polyas', 'Vocdoni vs Polyas'),
            href: '/compare/vocdoni-vs-polyas',
            description: t('compare.eligo.related.polyas_desc', 'Compared with certified German voting.'),
          },
        ]}
      />
    </>
  )
}
