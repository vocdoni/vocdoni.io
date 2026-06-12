import { Globe2, ShieldCheck, Unlock } from 'lucide-react'
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

export default function CompareKuorumPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('compare.kuorum.hero.eyebrow', 'Comparison')}
        title={t('compare.kuorum.hero.title', 'Vocdoni vs Kuorum: which online voting platform fits you?')}
        subtitle={t(
          'compare.kuorum.hero.subtitle',
          'Both tools help organizations run digital votes. This honest comparison looks at verifiability, privacy, and openness so you can decide which one matches your needs.'
        )}
        primaryCta={{
          label: t('compare.kuorum.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.kuorum.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <ProseSection
        eyebrow={t('compare.kuorum.intro.eyebrow', 'Who each tool is for')}
        title={t('compare.kuorum.intro.title', 'Two solid tools, built for different priorities')}
        blocks={[
          {
            heading: t('compare.kuorum.intro.kuorum.heading', 'Where Kuorum shines'),
            paragraphs: [
              t(
                'compare.kuorum.intro.kuorum.p1',
                'Kuorum is a Spanish govtech and participation platform with a strong track record in public participation, citizen engagement, and institutional decision making. If your priority is broad participation campaigns and engagement workflows, Kuorum is a capable, well established choice.'
              ),
            ],
          },
          {
            heading: t('compare.kuorum.intro.vocdoni.heading', 'Where Vocdoni shines'),
            paragraphs: [
              t(
                'compare.kuorum.intro.vocdoni.p1',
                'Vocdoni is built around trust you can prove. Every vote is end-to-end verifiable, anonymous through zero-knowledge cryptography, and the whole stack is open source. If your members need to independently confirm that results are correct, that is our core strength.'
              ),
            ],
          },
        ]}
      />

      <FeatureComparisonTable
        eyebrow={t('compare.kuorum.table.eyebrow', 'Feature by feature')}
        title={t('compare.kuorum.table.title', 'Vocdoni and Kuorum side by side')}
        description={t(
          'compare.kuorum.table.description',
          'A fair, feature-by-feature look. Where Kuorum does something well, we say so.'
        )}
        featureColumnLabel={t('compare.kuorum.table.feature_label', 'Feature')}
        columns={[{ name: t('compare.kuorum.table.col_vocdoni', 'Vocdoni'), highlighted: true }, { name: 'Kuorum' }]}
        rows={[
          {
            feature: t('compare.kuorum.table.row_verifiability', 'End-to-end verifiability'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.verifiability_v', 'Universally verifiable results') },
              { status: 'neutral', text: t('compare.kuorum.table.verifiability_c', 'Not the core focus') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_anonymity', 'Anonymity (zero-knowledge)'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.anonymity_v', 'zk-SNARK anonymous ballots') },
              { status: 'neutral', text: t('compare.kuorum.table.anonymity_c', 'Standard secret ballot') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_open_source', 'Open source'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.open_source_v', 'Fully open source') },
              { status: 'negative', text: t('compare.kuorum.table.open_source_c', 'Proprietary') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_weighted', 'Weighted voting'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.weighted_v', 'Supported') },
              { status: 'positive', text: t('compare.kuorum.table.weighted_c', 'Supported') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_hybrid', 'Hybrid voting'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.hybrid_v', 'In-person and remote') },
              { status: 'neutral', text: t('compare.kuorum.table.hybrid_c', 'Varies by setup') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_instant', 'Instant results'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.instant_v', 'Results in seconds') },
              { status: 'positive', text: t('compare.kuorum.table.instant_c', 'Fast digital tally') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_gdpr', 'GDPR / EU hosting'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.gdpr_v', 'EU-hosted, GDPR compliant') },
              { status: 'positive', text: t('compare.kuorum.table.gdpr_c', 'EU-based, GDPR compliant') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_pricing', 'Pricing transparency'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.pricing_v', 'Public plans and free tier') },
              { status: 'neutral', text: t('compare.kuorum.table.pricing_c', 'Quote on request') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_support', 'Expert support'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.support_v', 'Election specialists') },
              { status: 'positive', text: t('compare.kuorum.table.support_c', 'Dedicated support') },
            ],
          },
          {
            feature: t('compare.kuorum.table.row_dispute', 'Dispute resistance'),
            cells: [
              { status: 'positive', text: t('compare.kuorum.table.dispute_v', 'Cryptographic proof of result') },
              { status: 'neutral', text: t('compare.kuorum.table.dispute_c', 'Audit logs') },
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('compare.kuorum.reasons.eyebrow', 'Why teams switch')}
        title={t('compare.kuorum.reasons.title', 'Three reasons teams pick Vocdoni over Kuorum')}
        columns={3}
        features={[
          {
            icon: ShieldCheck,
            title: t('compare.kuorum.reasons.verifiable.title', 'Proof, not just trust'),
            description: t(
              'compare.kuorum.reasons.verifiable.description',
              'Every voter can independently verify that their vote was counted and the result is correct.'
            ),
          },
          {
            icon: Unlock,
            title: t('compare.kuorum.reasons.open.title', 'Open source by default'),
            description: t(
              'compare.kuorum.reasons.open.description',
              'The whole stack is public, so anyone can audit how votes are cast and counted.'
            ),
          },
          {
            icon: Globe2,
            title: t('compare.kuorum.reasons.privacy.title', 'Anonymous by design'),
            description: t(
              'compare.kuorum.reasons.privacy.description',
              'Zero-knowledge cryptography keeps every ballot secret, even from us.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('compare.kuorum.faq.eyebrow', 'Questions')}
        title={t('compare.kuorum.faq.title', 'Vocdoni and Kuorum, answered')}
        items={[
          {
            question: t('compare.kuorum.faq.q1.question', 'Is Vocdoni a good Kuorum alternative?'),
            answer: t(
              'compare.kuorum.faq.q1.answer',
              'If you need end-to-end verifiability, anonymous ballots, and open source code, yes. Kuorum is strong for public participation campaigns, while Vocdoni is built for votes that must be provably correct.'
            ),
          },
          {
            question: t('compare.kuorum.faq.q2.question', 'Can we migrate from Kuorum to Vocdoni?'),
            answer: t(
              'compare.kuorum.faq.q2.answer',
              'Yes. You can import your voter census as a spreadsheet and run your first verifiable vote within a day. Our team helps with onboarding for larger memberships.'
            ),
          },
          {
            question: t('compare.kuorum.faq.q3.question', 'How does pricing compare?'),
            answer: t(
              'compare.kuorum.faq.q3.answer',
              'Vocdoni publishes its plans, including a free tier and fixed annual prices, so you know the cost upfront. Kuorum typically works from a custom quote.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('compare.kuorum.cta.title', 'See verifiable voting for yourself')}
        description={t(
          'compare.kuorum.cta.description',
          'Run a free, anonymous, verifiable vote today, or talk to us about your election.'
        )}
        primaryCta={{
          label: t('compare.kuorum.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('compare.kuorum.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('compare.kuorum.related.title', 'Keep comparing')}
        links={[
          {
            label: t('compare.kuorum.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('compare.kuorum.related.verifiability_desc', 'The proof behind every result.'),
          },
          {
            label: t('compare.kuorum.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('compare.kuorum.related.pricing_desc', 'Plans, free tier, and custom quotes.'),
          },
          {
            label: t('compare.kuorum.related.alternatives', 'All voting platform alternatives'),
            href: '/alternatives',
            description: t('compare.kuorum.related.alternatives_desc', 'See every comparison in one place.'),
          },
          {
            label: t('compare.kuorum.related.polyas', 'Vocdoni vs Polyas'),
            href: '/compare/vocdoni-vs-polyas',
            description: t('compare.kuorum.related.polyas_desc', 'Compared with certified German voting.'),
          },
          {
            label: t('compare.kuorum.related.sequent', 'Vocdoni vs Sequent'),
            href: '/compare/vocdoni-vs-sequent',
            description: t('compare.kuorum.related.sequent_desc', 'Two open source approaches compared.'),
          },
        ]}
      />
    </>
  )
}
