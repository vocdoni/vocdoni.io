import { BadgeCheck, CheckCircle2, Clock, ListChecks, Scale, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  CtaBanner,
  FaqAccordion,
  FeatureGrid,
  MarketingHero,
  ProseSection,
  RelatedLinks,
  StepList,
} from '@/components/marketing'

export default function UseCasesWeightedVotingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.weighted_voting.hero.eyebrow', 'Weighted voting')}
        title={t(
          'use_case_procedures.weighted_voting.hero.title',
          'How to run an online vote with weighted shares and verifiable results'
        )}
        subtitle={t(
          'use_case_procedures.weighted_voting.hero.subtitle',
          'Give each member voting power by shares, capital, or seniority, run the vote online, and publish a result anyone can verify.'
        )}
        primaryCta={{
          label: t('use_case_procedures.weighted_voting.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.weighted_voting.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.weighted_voting.hero.bullet_1', 'Voting power by shares or capital'),
          t('use_case_procedures.weighted_voting.hero.bullet_2', 'Weights applied automatically'),
          t('use_case_procedures.weighted_voting.hero.bullet_3', 'Verifiable, dispute-free results'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.weighted_voting.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.weighted_voting.intro.title', 'Running a weighted vote online')}
        intro={t(
          'use_case_procedures.weighted_voting.intro.intro',
          'In a weighted vote, members do not all carry the same weight: voting power follows shares, capital, seniority, or another rule in your statutes. Running it online applies those weights automatically and proves the result.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.weighted_voting.intro.block_1.heading', 'Why run weighted votes online'),
            paragraphs: [
              t(
                'use_case_procedures.weighted_voting.intro.block_1.p1',
                'Calculating weighted results by hand is slow and easy to dispute. Online, each ballot carries its assigned weight, the tally is automatic, and anyone can verify that the weighting was applied correctly.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.weighted_voting.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.weighted_voting.intro.block_2.bullet_1', 'Anonymous ballots via zk-SNARK'),
              t('use_case_procedures.weighted_voting.intro.block_2.bullet_2', 'End-to-end verifiable weighted tallies'),
              t(
                'use_case_procedures.weighted_voting.intro.block_2.bullet_3',
                'Open source, EU-hosted and GDPR compliant'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.weighted_voting.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.weighted_voting.steps.title', 'How to run a weighted vote with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.weighted_voting.steps.step_1.title', 'Set voting weights in the census'),
            description: t(
              'use_case_procedures.weighted_voting.steps.step_1.description',
              'Upload members with their voting weight by shares, capital, or seniority, exactly as your statutes define.'
            ),
          },
          {
            title: t('use_case_procedures.weighted_voting.steps.step_2.title', 'Configure the ballot'),
            description: t(
              'use_case_procedures.weighted_voting.steps.step_2.description',
              'Add your questions and set the majority each one needs, measured by weighted votes.'
            ),
          },
          {
            title: t('use_case_procedures.weighted_voting.steps.step_3.title', 'Open voting'),
            description: t(
              'use_case_procedures.weighted_voting.steps.step_3.description',
              'Members vote in secret from any device; each ballot automatically carries its assigned weight.'
            ),
          },
          {
            title: t('use_case_procedures.weighted_voting.steps.step_4.title', 'Verify the weighted count'),
            description: t(
              'use_case_procedures.weighted_voting.steps.step_4.description',
              'The weighted tally is computed automatically and is end-to-end verifiable by any member.'
            ),
          },
          {
            title: t('use_case_procedures.weighted_voting.steps.step_5.title', 'Publish the result'),
            description: t(
              'use_case_procedures.weighted_voting.steps.step_5.description',
              'Announce the outcome with a verifiable record showing the weighting was applied correctly.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.weighted_voting.features.eyebrow', 'Built for weighted votes')}
        title={t('use_case_procedures.weighted_voting.features.title', 'What weighted voting needs')}
        columns={3}
        features={[
          {
            icon: Scale,
            title: t('use_case_procedures.weighted_voting.features.weights.title', 'Per-member weights'),
            description: t(
              'use_case_procedures.weighted_voting.features.weights.description',
              'Assign voting power by shares, capital, or seniority, applied automatically.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.weighted_voting.features.verifiable.title', 'Verifiable tallies'),
            description: t(
              'use_case_procedures.weighted_voting.features.verifiable.description',
              'Anyone can confirm the weighting was applied exactly as defined.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('use_case_procedures.weighted_voting.features.secret.title', 'Secret ballots'),
            description: t(
              'use_case_procedures.weighted_voting.features.secret.description',
              'Votes stay anonymous even though weights differ between members.'
            ),
          },
          {
            icon: ListChecks,
            title: t('use_case_procedures.weighted_voting.features.questions.title', 'Multi-question ballots'),
            description: t(
              'use_case_procedures.weighted_voting.features.questions.description',
              'Run several weighted decisions in a single, ordered ballot.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.weighted_voting.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.weighted_voting.features.results.description',
              'The weighted outcome is ready the moment voting closes.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.weighted_voting.features.rules.title', 'Statute-matched rules'),
            description: t(
              'use_case_procedures.weighted_voting.features.rules.description',
              'Configure majorities and thresholds to match your governing documents.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.weighted_voting.faq.eyebrow', 'Weighted voting questions')}
        title={t('use_case_procedures.weighted_voting.faq.title', 'Common questions about weighted voting')}
        items={[
          {
            question: t('use_case_procedures.weighted_voting.faq.q1.question', 'How are weights assigned?'),
            answer: t(
              'use_case_procedures.weighted_voting.faq.q1.answer',
              'You set the weight of each member in the census, by shares, capital, seniority, or any rule in your statutes, and Vocdoni applies it automatically.'
            ),
          },
          {
            question: t(
              'use_case_procedures.weighted_voting.faq.q2.question',
              'Can votes stay secret with different weights?'
            ),
            answer: t(
              'use_case_procedures.weighted_voting.faq.q2.answer',
              'Yes. Ballots remain anonymous via zk-SNARK technology, while the weighted tally is still end-to-end verifiable.'
            ),
          },
          {
            question: t(
              'use_case_procedures.weighted_voting.faq.q3.question',
              'Can members verify the weighting was correct?'
            ),
            answer: t(
              'use_case_procedures.weighted_voting.faq.q3.answer',
              'Any member can confirm from the published proofs that the result reflects the assigned weights, which removes disputes.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.weighted_voting.cta.title', 'Ready to run a weighted vote online?')}
        description={t(
          'use_case_procedures.weighted_voting.cta.description',
          'Start free today, or talk to our team about your weighting rules.'
        )}
        primaryCta={{
          label: t('use_case_procedures.weighted_voting.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.weighted_voting.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.weighted_voting.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.weighted_voting.related.link_1', 'Voting for chambers of commerce'),
            href: '/solutions/chambers-of-commerce',
            description: t(
              'use_case_procedures.weighted_voting.related.link_1_desc',
              'Weighted votes for business membership bodies.'
            ),
          },
          {
            label: t('use_case_procedures.weighted_voting.related.link_2', 'Voting for cooperatives'),
            href: '/solutions/cooperatives',
            description: t(
              'use_case_procedures.weighted_voting.related.link_2_desc',
              'Hybrid assemblies with weighted voting.'
            ),
          },
          {
            label: t('use_case_procedures.weighted_voting.related.link_3', 'All voting use cases'),
            href: '/use-cases',
            description: t(
              'use_case_procedures.weighted_voting.related.link_3_desc',
              'Browse every procedure we support.'
            ),
          },
          {
            label: t('use_case_procedures.weighted_voting.related.link_4', 'How to run an online AGM'),
            href: '/use-cases/agm-voting',
            description: t(
              'use_case_procedures.weighted_voting.related.link_4_desc',
              'Hold your annual general meeting online.'
            ),
          },
        ]}
      />
    </>
  )
}
