import { BadgeCheck, CheckCircle2, Clock, Scale, ShieldCheck, Users } from 'lucide-react'
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

export default function UseCasesReferendaPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.referenda.hero.eyebrow', 'Referenda')}
        title={t('use_case_procedures.referenda.hero.title', 'How to run a referendum online with verifiable results')}
        subtitle={t(
          'use_case_procedures.referenda.hero.subtitle',
          'Put a yes or no question to your community online, track quorum and turnout, and publish a result anyone can verify.'
        )}
        primaryCta={{
          label: t('use_case_procedures.referenda.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.referenda.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.referenda.hero.bullet_1', 'Clear yes or no ballots'),
          t('use_case_procedures.referenda.hero.bullet_2', 'Quorum and turnout thresholds'),
          t('use_case_procedures.referenda.hero.bullet_3', 'Verifiable, binding-ready results'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.referenda.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.referenda.intro.title', 'Running a referendum online')}
        intro={t(
          'use_case_procedures.referenda.intro.intro',
          'A referendum puts a single decision directly to a community as a yes or no question. Running it online opens it to everyone eligible, enforces any quorum or majority you need, and proves the result.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.referenda.intro.block_1.heading', 'Why run a referendum online'),
            paragraphs: [
              t(
                'use_case_procedures.referenda.intro.block_1.p1',
                'A referendum carries weight only if the result is trusted. Online voting reaches every eligible voter, tracks turnout against any threshold, and produces an end-to-end verifiable outcome.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.referenda.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.referenda.intro.block_2.bullet_1', 'Anonymous ballots via zk-SNARK'),
              t('use_case_procedures.referenda.intro.block_2.bullet_2', 'End-to-end verifiable, public result'),
              t('use_case_procedures.referenda.intro.block_2.bullet_3', 'Open source, EU-hosted and GDPR compliant'),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.referenda.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.referenda.steps.title', 'How to run a referendum with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.referenda.steps.step_1.title', 'Set up the voter census'),
            description: t(
              'use_case_procedures.referenda.steps.step_1.description',
              'Upload everyone eligible to vote, each with a private, single-use credential.'
            ),
          },
          {
            title: t('use_case_procedures.referenda.steps.step_2.title', 'Frame the question'),
            description: t(
              'use_case_procedures.referenda.steps.step_2.description',
              'Write the yes or no question and set any quorum or majority the result must reach to count.'
            ),
          },
          {
            title: t('use_case_procedures.referenda.steps.step_3.title', 'Open voting and track turnout'),
            description: t(
              'use_case_procedures.referenda.steps.step_3.description',
              'Voters cast a secret ballot from any device while you watch turnout against your threshold.'
            ),
          },
          {
            title: t('use_case_procedures.referenda.steps.step_4.title', 'Verify the result'),
            description: t(
              'use_case_procedures.referenda.steps.step_4.description',
              'The outcome is computed automatically and is end-to-end verifiable by any voter.'
            ),
          },
          {
            title: t('use_case_procedures.referenda.steps.step_5.title', 'Publish the decision'),
            description: t(
              'use_case_procedures.referenda.steps.step_5.description',
              'Announce the result with a verifiable record that documents turnout and the majority reached.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.referenda.features.eyebrow', 'Built for referenda')}
        title={t('use_case_procedures.referenda.features.title', 'What a referendum needs')}
        columns={3}
        features={[
          {
            icon: Scale,
            title: t('use_case_procedures.referenda.features.thresholds.title', 'Quorum and majorities'),
            description: t(
              'use_case_procedures.referenda.features.thresholds.description',
              'Set the turnout and majority a result must reach, applied automatically.'
            ),
          },
          {
            icon: Users,
            title: t('use_case_procedures.referenda.features.turnout.title', 'Live turnout'),
            description: t(
              'use_case_procedures.referenda.features.turnout.description',
              'Track participation in real time to see whether the threshold is met.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.referenda.features.verifiable.title', 'Verifiable result'),
            description: t(
              'use_case_procedures.referenda.features.verifiable.description',
              'Anyone can confirm the outcome from public proofs, so the decision holds.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('use_case_procedures.referenda.features.secret.title', 'Secret ballots'),
            description: t(
              'use_case_procedures.referenda.features.secret.description',
              'Anonymous voting protects every voter on a sensitive question.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.referenda.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.referenda.features.results.description',
              'The decision is known the moment voting closes.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.referenda.features.reach.title', 'Wide reach'),
            description: t(
              'use_case_procedures.referenda.features.reach.description',
              'Every eligible voter can take part from any device.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.referenda.faq.eyebrow', 'Referendum questions')}
        title={t('use_case_procedures.referenda.faq.title', 'Common questions about online referenda')}
        items={[
          {
            question: t('use_case_procedures.referenda.faq.q1.question', 'Can we require a minimum turnout?'),
            answer: t(
              'use_case_procedures.referenda.faq.q1.answer',
              'Yes. You can set a quorum so the result only counts if participation reaches your threshold, and turnout is tracked live against it.'
            ),
          },
          {
            question: t('use_case_procedures.referenda.faq.q2.question', 'Is the result strong enough to be binding?'),
            answer: t(
              'use_case_procedures.referenda.faq.q2.answer',
              'The outcome is end-to-end verifiable with a documented turnout and majority, giving you an auditable record to treat as binding under your rules.'
            ),
          },
          {
            question: t('use_case_procedures.referenda.faq.q3.question', 'How do voters know the count is honest?'),
            answer: t(
              'use_case_procedures.referenda.faq.q3.answer',
              'Every voter can check the published proofs to confirm the result matches the votes cast, without revealing how anyone voted.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.referenda.cta.title', 'Ready to run your referendum online?')}
        description={t(
          'use_case_procedures.referenda.cta.description',
          'Start free today, or talk to our team about your quorum and majority rules.'
        )}
        primaryCta={{
          label: t('use_case_procedures.referenda.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.referenda.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.referenda.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.referenda.related.link_1', 'Voting for public administration'),
            href: '/solutions/public-administration',
            description: t(
              'use_case_procedures.referenda.related.link_1_desc',
              'Trusted digital participation for the public sector.'
            ),
          },
          {
            label: t('use_case_procedures.referenda.related.link_2', 'All voting use cases'),
            href: '/use-cases',
            description: t('use_case_procedures.referenda.related.link_2_desc', 'Browse every procedure we support.'),
          },
          {
            label: t('use_case_procedures.referenda.related.link_3', 'How to run citizen consultations'),
            href: '/use-cases/citizen-consultations',
            description: t(
              'use_case_procedures.referenda.related.link_3_desc',
              'Gather resident input before deciding.'
            ),
          },
        ]}
      />
    </>
  )
}
