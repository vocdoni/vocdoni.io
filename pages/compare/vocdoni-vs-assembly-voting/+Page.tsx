import { EyeOff, Unlock, Wallet } from 'lucide-react'
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

export default function CompareAssemblyVotingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('compare.assembly_voting.hero.eyebrow', 'Comparison')}
        title={t(
          'compare.assembly_voting.hero.title',
          'Vocdoni vs Assembly Voting: which online voting platform fits you?'
        )}
        subtitle={t(
          'compare.assembly_voting.hero.subtitle',
          'Assembly Voting is a Danish provider focused on elections and AGMs with end-to-end verifiability. This honest comparison shows where each tool is strongest.'
        )}
        primaryCta={{
          label: t('compare.assembly_voting.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.assembly_voting.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <ProseSection
        eyebrow={t('compare.assembly_voting.intro.eyebrow', 'Who each tool is for')}
        title={t('compare.assembly_voting.intro.title', 'Two verifiability-focused voting tools')}
        blocks={[
          {
            heading: t('compare.assembly_voting.intro.competitor.heading', 'What Assembly Voting offers'),
            paragraphs: [
              t(
                'compare.assembly_voting.intro.competitor.p1',
                'Assembly Voting is a Danish provider focused on elections and AGM voting, with end-to-end verifiability. It is aimed at organizations that run formal assemblies and want a vendor centered on that use case.'
              ),
            ],
          },
          {
            heading: t('compare.assembly_voting.intro.vocdoni.heading', 'What Vocdoni offers'),
            paragraphs: [
              t(
                'compare.assembly_voting.intro.vocdoni.p1',
                'Vocdoni shares that verifiability focus and adds open source code, zero-knowledge anonymity, and transparent self-serve pricing with a free tier. You can audit the whole stack and start a real vote without a sales process.'
              ),
            ],
          },
        ]}
      />

      <FeatureComparisonTable
        eyebrow={t('compare.assembly_voting.table.eyebrow', 'Feature by feature')}
        title={t('compare.assembly_voting.table.title', 'Vocdoni and Assembly Voting side by side')}
        description={t(
          'compare.assembly_voting.table.description',
          'A fair, feature-by-feature look. Assembly Voting also focuses on verifiability, and we mark that honestly.'
        )}
        featureColumnLabel={t('compare.assembly_voting.table.feature_label', 'Feature')}
        columns={[
          { name: t('compare.assembly_voting.table.col_vocdoni', 'Vocdoni'), highlighted: true },
          { name: 'Assembly Voting' },
        ]}
        rows={[
          {
            feature: t('compare.assembly_voting.table.row_verifiability', 'End-to-end verifiability'),
            cells: [
              {
                status: 'positive',
                text: t('compare.assembly_voting.table.verifiability_v', 'Universally verifiable results'),
              },
              { status: 'positive', text: t('compare.assembly_voting.table.verifiability_c', 'E2E verifiable') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_anonymity', 'Anonymity (zero-knowledge)'),
            cells: [
              {
                status: 'positive',
                text: t('compare.assembly_voting.table.anonymity_v', 'zk-SNARK anonymous ballots'),
              },
              { status: 'neutral', text: t('compare.assembly_voting.table.anonymity_c', 'Standard secret ballot') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_open_source', 'Open source'),
            cells: [
              { status: 'positive', text: t('compare.assembly_voting.table.open_source_v', 'Fully open source') },
              { status: 'negative', text: t('compare.assembly_voting.table.open_source_c', 'Proprietary') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_weighted', 'Weighted voting'),
            cells: [
              { status: 'positive', text: t('compare.assembly_voting.table.weighted_v', 'Supported') },
              { status: 'positive', text: t('compare.assembly_voting.table.weighted_c', 'Supported') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_hybrid', 'Hybrid voting'),
            cells: [
              { status: 'positive', text: t('compare.assembly_voting.table.hybrid_v', 'In-person and remote') },
              { status: 'positive', text: t('compare.assembly_voting.table.hybrid_c', 'AGM hybrid voting') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_instant', 'Instant results'),
            cells: [
              { status: 'positive', text: t('compare.assembly_voting.table.instant_v', 'Results in seconds') },
              { status: 'positive', text: t('compare.assembly_voting.table.instant_c', 'Fast digital tally') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_gdpr', 'GDPR / EU hosting'),
            cells: [
              { status: 'positive', text: t('compare.assembly_voting.table.gdpr_v', 'EU-hosted, GDPR compliant') },
              { status: 'positive', text: t('compare.assembly_voting.table.gdpr_c', 'EU-based, GDPR compliant') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_pricing', 'Pricing transparency'),
            cells: [
              { status: 'positive', text: t('compare.assembly_voting.table.pricing_v', 'Public plans and free tier') },
              { status: 'neutral', text: t('compare.assembly_voting.table.pricing_c', 'Quote on request') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_support', 'Expert support'),
            cells: [
              { status: 'positive', text: t('compare.assembly_voting.table.support_v', 'Election specialists') },
              { status: 'positive', text: t('compare.assembly_voting.table.support_c', 'Dedicated support') },
            ],
          },
          {
            feature: t('compare.assembly_voting.table.row_dispute', 'Dispute resistance'),
            cells: [
              {
                status: 'positive',
                text: t('compare.assembly_voting.table.dispute_v', 'Cryptographic proof of result'),
              },
              { status: 'positive', text: t('compare.assembly_voting.table.dispute_c', 'Verifiable process') },
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('compare.assembly_voting.reasons.eyebrow', 'Why teams switch')}
        title={t('compare.assembly_voting.reasons.title', 'Three reasons teams pick Vocdoni over Assembly Voting')}
        columns={3}
        features={[
          {
            icon: Unlock,
            title: t('compare.assembly_voting.reasons.open.title', 'Open source you can audit'),
            description: t(
              'compare.assembly_voting.reasons.open.description',
              'The whole stack is public, so verifiability is backed by code anyone can inspect.'
            ),
          },
          {
            icon: EyeOff,
            title: t('compare.assembly_voting.reasons.anonymity.title', 'Anonymity via zero-knowledge'),
            description: t(
              'compare.assembly_voting.reasons.anonymity.description',
              'zk-SNARK ballots keep every vote private while remaining verifiable.'
            ),
          },
          {
            icon: Wallet,
            title: t('compare.assembly_voting.reasons.pricing.title', 'Transparent, self-serve pricing'),
            description: t(
              'compare.assembly_voting.reasons.pricing.description',
              'Published plans and a free tier let you start without a sales call.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('compare.assembly_voting.faq.eyebrow', 'Questions')}
        title={t('compare.assembly_voting.faq.title', 'Vocdoni and Assembly Voting, answered')}
        items={[
          {
            question: t('compare.assembly_voting.faq.q1.question', 'Is Vocdoni a good Assembly Voting alternative?'),
            answer: t(
              'compare.assembly_voting.faq.q1.answer',
              'Yes. Both put end-to-end verifiability first. Vocdoni adds open source code, zero-knowledge anonymity, and a transparent free tier, which appeals to teams that want to audit the system and start for free.'
            ),
          },
          {
            question: t('compare.assembly_voting.faq.q2.question', 'Can we migrate from Assembly Voting to Vocdoni?'),
            answer: t(
              'compare.assembly_voting.faq.q2.answer',
              'Yes. Import your member census as a spreadsheet and run a verifiable AGM or election quickly. Our team supports onboarding and a rehearsal vote for formal assemblies.'
            ),
          },
          {
            question: t('compare.assembly_voting.faq.q3.question', 'How does pricing compare?'),
            answer: t(
              'compare.assembly_voting.faq.q3.answer',
              'Vocdoni publishes a free tier and fixed annual plans, with custom quotes for large elections. Assembly Voting typically provides pricing on request.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('compare.assembly_voting.cta.title', 'Verifiable AGMs and elections, openly')}
        description={t(
          'compare.assembly_voting.cta.description',
          'Run a free, anonymous, verifiable vote today, or talk to us about your assembly.'
        )}
        primaryCta={{
          label: t('compare.assembly_voting.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.assembly_voting.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('compare.assembly_voting.related.title', 'Keep comparing')}
        links={[
          {
            label: t('compare.assembly_voting.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('compare.assembly_voting.related.verifiability_desc', 'The proof behind every result.'),
          },
          {
            label: t('compare.assembly_voting.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('compare.assembly_voting.related.pricing_desc', 'Plans, free tier, and custom quotes.'),
          },
          {
            label: t('compare.assembly_voting.related.alternatives', 'All voting platform alternatives'),
            href: '/alternatives',
            description: t('compare.assembly_voting.related.alternatives_desc', 'See every comparison in one place.'),
          },
          {
            label: t('compare.assembly_voting.related.polyas', 'Vocdoni vs Polyas'),
            href: '/compare/vocdoni-vs-polyas',
            description: t('compare.assembly_voting.related.polyas_desc', 'Compared with certified German voting.'),
          },
          {
            label: t('compare.assembly_voting.related.sequent', 'Vocdoni vs Sequent'),
            href: '/compare/vocdoni-vs-sequent',
            description: t('compare.assembly_voting.related.sequent_desc', 'Two open source approaches compared.'),
          },
        ]}
      />
    </>
  )
}
