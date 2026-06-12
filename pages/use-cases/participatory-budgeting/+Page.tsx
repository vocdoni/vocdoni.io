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

export default function UseCasesParticipatoryBudgetingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.participatory_budgeting.hero.eyebrow', 'Participatory budgeting')}
        title={t(
          'use_case_procedures.participatory_budgeting.hero.title',
          'How to run participatory budgeting online with verifiable results'
        )}
        subtitle={t(
          'use_case_procedures.participatory_budgeting.hero.subtitle',
          'Let residents decide how public money is spent online, distribute votes across projects, and publish results the whole community can verify.'
        )}
        primaryCta={{
          label: t('use_case_procedures.participatory_budgeting.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.participatory_budgeting.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.participatory_budgeting.hero.bullet_1', 'Distribute votes across projects'),
          t('use_case_procedures.participatory_budgeting.hero.bullet_2', 'Open to every eligible resident'),
          t('use_case_procedures.participatory_budgeting.hero.bullet_3', 'Transparent, verifiable outcomes'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.participatory_budgeting.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.participatory_budgeting.intro.title', 'Running participatory budgeting online')}
        intro={t(
          'use_case_procedures.participatory_budgeting.intro.intro',
          'Participatory budgeting lets residents choose which projects a public budget should fund. Running it online reaches far more people, lets them weigh several projects at once, and makes the result transparent.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.participatory_budgeting.intro.block_1.heading', 'Why run it online'),
            paragraphs: [
              t(
                'use_case_procedures.participatory_budgeting.intro.block_1.p1',
                'Online voting removes the barriers of in-person events, so more residents take part. They can spread votes or points across projects, and the count is transparent and instant.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.participatory_budgeting.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.participatory_budgeting.intro.block_2.bullet_1', 'Anonymous ballots via zk-SNARK'),
              t(
                'use_case_procedures.participatory_budgeting.intro.block_2.bullet_2',
                'End-to-end verifiable, public results'
              ),
              t(
                'use_case_procedures.participatory_budgeting.intro.block_2.bullet_3',
                'Open source, EU-hosted and GDPR compliant'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.participatory_budgeting.steps.eyebrow', 'Step by step')}
        title={t(
          'use_case_procedures.participatory_budgeting.steps.title',
          'How to run participatory budgeting with Vocdoni'
        )}
        steps={[
          {
            title: t('use_case_procedures.participatory_budgeting.steps.step_1.title', 'Define who can vote'),
            description: t(
              'use_case_procedures.participatory_budgeting.steps.step_1.description',
              'Set up the census of eligible residents, by neighbourhood or district if needed.'
            ),
          },
          {
            title: t('use_case_procedures.participatory_budgeting.steps.step_2.title', 'Add the projects'),
            description: t(
              'use_case_procedures.participatory_budgeting.steps.step_2.description',
              'List each proposal with its budget, and choose whether residents pick one, several, or distribute points.'
            ),
          },
          {
            title: t('use_case_procedures.participatory_budgeting.steps.step_3.title', 'Open the vote'),
            description: t(
              'use_case_procedures.participatory_budgeting.steps.step_3.description',
              'Residents vote from any device during the window you set, with a simple, accessible ballot.'
            ),
          },
          {
            title: t('use_case_procedures.participatory_budgeting.steps.step_4.title', 'Verify the results'),
            description: t(
              'use_case_procedures.participatory_budgeting.steps.step_4.description',
              'Counting is automatic and end-to-end verifiable, so the funded projects cannot be questioned.'
            ),
          },
          {
            title: t('use_case_procedures.participatory_budgeting.steps.step_5.title', 'Publish the winning projects'),
            description: t(
              'use_case_procedures.participatory_budgeting.steps.step_5.description',
              'Announce which projects will be funded with a transparent record the community can audit.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.participatory_budgeting.features.eyebrow', 'Built for public participation')}
        title={t('use_case_procedures.participatory_budgeting.features.title', 'What participatory budgeting needs')}
        columns={3}
        features={[
          {
            icon: ListChecks,
            title: t('use_case_procedures.participatory_budgeting.features.distribute.title', 'Distribute votes'),
            description: t(
              'use_case_procedures.participatory_budgeting.features.distribute.description',
              'Let residents back several projects or spread points across them.'
            ),
          },
          {
            icon: Users,
            title: t('use_case_procedures.participatory_budgeting.features.reach.title', 'Wide reach'),
            description: t(
              'use_case_procedures.participatory_budgeting.features.reach.description',
              'Open the vote to every resident on any device, with an accessible ballot.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.participatory_budgeting.features.verifiable.title', 'Verifiable results'),
            description: t(
              'use_case_procedures.participatory_budgeting.features.verifiable.description',
              'Anyone can confirm which projects won from public proofs.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('use_case_procedures.participatory_budgeting.features.private.title', 'Private votes'),
            description: t(
              'use_case_procedures.participatory_budgeting.features.private.description',
              'Anonymous ballots protect residents while keeping the count honest.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.participatory_budgeting.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.participatory_budgeting.features.results.description',
              'The funded projects are known as soon as voting closes.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.participatory_budgeting.features.districts.title', 'By district'),
            description: t(
              'use_case_procedures.participatory_budgeting.features.districts.description',
              'Run separate budgets per neighbourhood or district when you need to.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.participatory_budgeting.faq.eyebrow', 'Budgeting questions')}
        title={t(
          'use_case_procedures.participatory_budgeting.faq.title',
          'Common questions about online participatory budgeting'
        )}
        items={[
          {
            question: t(
              'use_case_procedures.participatory_budgeting.faq.q1.question',
              'Can residents support more than one project?'
            ),
            answer: t(
              'use_case_procedures.participatory_budgeting.faq.q1.answer',
              'Yes. You can let residents pick several projects or distribute a set number of points across the proposals they prefer.'
            ),
          },
          {
            question: t(
              'use_case_procedures.participatory_budgeting.faq.q2.question',
              'Can we run separate budgets per district?'
            ),
            answer: t(
              'use_case_procedures.participatory_budgeting.faq.q2.answer',
              'You can define a census and project list per neighbourhood or district, so each area decides on its own budget.'
            ),
          },
          {
            question: t(
              'use_case_procedures.participatory_budgeting.faq.q3.question',
              'How do we keep the process transparent?'
            ),
            answer: t(
              'use_case_procedures.participatory_budgeting.faq.q3.answer',
              'Every result is end-to-end verifiable and public, so residents can confirm for themselves that the funded projects reflect the votes.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.participatory_budgeting.cta.title', 'Ready to put the budget to a vote?')}
        description={t(
          'use_case_procedures.participatory_budgeting.cta.description',
          'Start free today, or talk to our team about your participation process.'
        )}
        primaryCta={{
          label: t('use_case_procedures.participatory_budgeting.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.participatory_budgeting.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.participatory_budgeting.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.participatory_budgeting.related.link_1', 'Voting for public administration'),
            href: '/solutions/public-administration',
            description: t(
              'use_case_procedures.participatory_budgeting.related.link_1_desc',
              'Trusted digital participation for the public sector.'
            ),
          },
          {
            label: t('use_case_procedures.participatory_budgeting.related.link_2', 'All voting use cases'),
            href: '/use-cases',
            description: t(
              'use_case_procedures.participatory_budgeting.related.link_2_desc',
              'Browse every procedure we support.'
            ),
          },
          {
            label: t('use_case_procedures.participatory_budgeting.related.link_3', 'How to run citizen consultations'),
            href: '/use-cases/citizen-consultations',
            description: t(
              'use_case_procedures.participatory_budgeting.related.link_3_desc',
              'Gather resident input on any issue.'
            ),
          },
        ]}
      />
    </>
  )
}
