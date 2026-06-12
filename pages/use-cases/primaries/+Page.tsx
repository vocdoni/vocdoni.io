import { BadgeCheck, CheckCircle2, Clock, ListChecks, ShieldCheck, Users } from 'lucide-react'
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

export default function UseCasesPrimariesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.primaries.hero.eyebrow', 'Primaries')}
        title={t(
          'use_case_procedures.primaries.hero.title',
          'How to run online party primaries with verifiable results'
        )}
        subtitle={t(
          'use_case_procedures.primaries.hero.subtitle',
          'Let your members choose candidates in a secret, secure online primary, with a count anyone can verify and no room for doubt.'
        )}
        primaryCta={{
          label: t('use_case_procedures.primaries.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.primaries.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.primaries.hero.bullet_1', 'Secret ballots at any scale'),
          t('use_case_procedures.primaries.hero.bullet_2', 'Members vote from any device'),
          t('use_case_procedures.primaries.hero.bullet_3', 'Verifiable results that build trust'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.primaries.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.primaries.intro.title', 'Running party primaries online')}
        intro={t(
          'use_case_procedures.primaries.intro.intro',
          'A primary lets members pick the candidate who will represent them. Running it online opens it to every member, keeps each vote secret, and produces a result the whole organization can trust.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.primaries.intro.block_1.heading', 'Why run primaries online'),
            paragraphs: [
              t(
                'use_case_procedures.primaries.intro.block_1.p1',
                'High participation gives the winner real legitimacy. Online voting reaches members wherever they are, scales to tens of thousands, and removes the disputes that come with manual counting.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.primaries.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.primaries.intro.block_2.bullet_1', 'Anonymous ballots via zk-SNARK'),
              t('use_case_procedures.primaries.intro.block_2.bullet_2', 'End-to-end verifiable outcomes'),
              t('use_case_procedures.primaries.intro.block_2.bullet_3', 'Open source, EU-hosted and GDPR compliant'),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.primaries.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.primaries.steps.title', 'How to run your primary with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.primaries.steps.step_1.title', 'Set up the member census'),
            description: t(
              'use_case_procedures.primaries.steps.step_1.description',
              'Import the list of members eligible to vote. Each gets a private, single-use credential.'
            ),
          },
          {
            title: t('use_case_procedures.primaries.steps.step_2.title', 'Configure the candidate ballot'),
            description: t(
              'use_case_procedures.primaries.steps.step_2.description',
              'Add every candidate, set whether members pick one or rank several, and define the winning rule.'
            ),
          },
          {
            title: t('use_case_procedures.primaries.steps.step_3.title', 'Open voting to members'),
            description: t(
              'use_case_procedures.primaries.steps.step_3.description',
              'Members vote in secret from any device within your chosen window, with reminders to lift turnout.'
            ),
          },
          {
            title: t('use_case_procedures.primaries.steps.step_4.title', 'Verify the count'),
            description: t(
              'use_case_procedures.primaries.steps.step_4.description',
              'Counting is automatic and end-to-end verifiable, so the result cannot be quietly altered.'
            ),
          },
          {
            title: t('use_case_procedures.primaries.steps.step_5.title', 'Publish the result'),
            description: t(
              'use_case_procedures.primaries.steps.step_5.description',
              'Announce the chosen candidate with a verifiable record that closes off any challenge.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.primaries.features.eyebrow', 'Built for primaries')}
        title={t('use_case_procedures.primaries.features.title', 'What a legitimate primary needs')}
        columns={3}
        features={[
          {
            icon: ShieldCheck,
            title: t('use_case_procedures.primaries.features.secret.title', 'Secret ballots'),
            description: t(
              'use_case_procedures.primaries.features.secret.description',
              'Anonymous voting protects members and keeps the contest fair.'
            ),
          },
          {
            icon: Users,
            title: t('use_case_procedures.primaries.features.scale.title', 'Scales to thousands'),
            description: t(
              'use_case_procedures.primaries.features.scale.description',
              'Run a primary for a local branch or a nationwide membership on the same system.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.primaries.features.verifiable.title', 'Verifiable results'),
            description: t(
              'use_case_procedures.primaries.features.verifiable.description',
              'Anyone can confirm the winner from public proofs, giving them clear legitimacy.'
            ),
          },
          {
            icon: ListChecks,
            title: t('use_case_procedures.primaries.features.formats.title', 'Flexible formats'),
            description: t(
              'use_case_procedures.primaries.features.formats.description',
              'Single choice or ranked voting, in one or several rounds.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.primaries.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.primaries.features.results.description',
              'No counting night. The outcome is ready as soon as voting ends.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.primaries.features.eligibility.title', 'One member, one vote'),
            description: t(
              'use_case_procedures.primaries.features.eligibility.description',
              'Only eligible members vote, and the system enforces a single vote each.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.primaries.faq.eyebrow', 'Primary questions')}
        title={t('use_case_procedures.primaries.faq.title', 'Common questions about online primaries')}
        items={[
          {
            question: t('use_case_procedures.primaries.faq.q1.question', 'Can it handle a nationwide primary?'),
            answer: t(
              'use_case_procedures.primaries.faq.q1.answer',
              'Yes. Vocdoni scales from a small branch to a membership of tens of thousands without changing how the vote works.'
            ),
          },
          {
            question: t('use_case_procedures.primaries.faq.q2.question', 'How do we stop people voting twice?'),
            answer: t(
              'use_case_procedures.primaries.faq.q2.answer',
              'Each member on your census gets a single-use credential, so the system enforces one vote per person while keeping the vote anonymous.'
            ),
          },
          {
            question: t('use_case_procedures.primaries.faq.q3.question', 'Can we use ranked or multi-round voting?'),
            answer: t(
              'use_case_procedures.primaries.faq.q3.answer',
              'You can run single-choice, ranked, or multi-round primaries, and the result stays end-to-end verifiable in every format.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.primaries.cta.title', 'Ready to run your next primary online?')}
        description={t(
          'use_case_procedures.primaries.cta.description',
          'Start free today, or talk to our team about your primary rules.'
        )}
        primaryCta={{
          label: t('use_case_procedures.primaries.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.primaries.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.primaries.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.primaries.related.link_1', 'Voting for political parties'),
            href: '/solutions/political-parties',
            description: t(
              'use_case_procedures.primaries.related.link_1_desc',
              'Secure internal democracy for parties.'
            ),
          },
          {
            label: t('use_case_procedures.primaries.related.link_2', 'Voting for trade unions'),
            href: '/solutions/trade-unions',
            description: t('use_case_procedures.primaries.related.link_2_desc', 'Member votes unions can defend.'),
          },
          {
            label: t('use_case_procedures.primaries.related.link_3', 'All voting use cases'),
            href: '/use-cases',
            description: t('use_case_procedures.primaries.related.link_3_desc', 'Browse every procedure we support.'),
          },
          {
            label: t('use_case_procedures.primaries.related.link_4', 'How to run delegate elections'),
            href: '/use-cases/delegate-elections',
            description: t('use_case_procedures.primaries.related.link_4_desc', 'Elect delegates and representatives.'),
          },
        ]}
      />
    </>
  )
}
