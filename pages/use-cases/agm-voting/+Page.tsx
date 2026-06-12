import { BadgeCheck, CheckCircle2, Clock, ListChecks, Scale, Users } from 'lucide-react'
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

export default function UseCasesAgmVotingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.agm_voting.hero.eyebrow', 'AGM voting')}
        title={t('use_case_procedures.agm_voting.hero.title', 'How to run an online AGM with verifiable results')}
        subtitle={t(
          'use_case_procedures.agm_voting.hero.subtitle',
          'Hold your annual general meeting online or hybrid, track quorum live, and publish results your members can verify themselves.'
        )}
        primaryCta={{
          label: t('use_case_procedures.agm_voting.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.agm_voting.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.agm_voting.hero.bullet_1', 'Live quorum and attendance tracking'),
          t('use_case_procedures.agm_voting.hero.bullet_2', 'Anonymous, end-to-end verifiable ballots'),
          t('use_case_procedures.agm_voting.hero.bullet_3', 'Instant results your members can audit'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.agm_voting.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.agm_voting.intro.title', 'Running an AGM vote online, the right way')}
        intro={t(
          'use_case_procedures.agm_voting.intro.intro',
          'An annual general meeting (AGM) is where members approve accounts, elect officers, and decide statutory motions. Running it online removes the logistics of a single venue while keeping every vote secret and every result provable.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.agm_voting.intro.block_1.heading', 'Why move your AGM online'),
            paragraphs: [
              t(
                'use_case_procedures.agm_voting.intro.block_1.p1',
                'Members vote from any device, so turnout no longer depends on who can travel on the day. Quorum is tracked in real time, and the chair always knows whether a motion can be carried.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.agm_voting.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.agm_voting.intro.block_2.bullet_1', 'Every ballot is anonymous via zk-SNARK'),
              t('use_case_procedures.agm_voting.intro.block_2.bullet_2', 'Results are end-to-end verifiable by anyone'),
              t('use_case_procedures.agm_voting.intro.block_2.bullet_3', 'Hosted in the EU and GDPR compliant'),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.agm_voting.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.agm_voting.steps.title', 'How to run your AGM vote with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.agm_voting.steps.step_1.title', 'Build your member census'),
            description: t(
              'use_case_procedures.agm_voting.steps.step_1.description',
              'Upload your list of eligible members. Each member gets a private, single-use credential to vote.'
            ),
          },
          {
            title: t('use_case_procedures.agm_voting.steps.step_2.title', 'Configure the agenda and ballots'),
            description: t(
              'use_case_procedures.agm_voting.steps.step_2.description',
              'Add each motion and election as a question. Set yes / no / abstain options and the majority rule each one needs.'
            ),
          },
          {
            title: t('use_case_procedures.agm_voting.steps.step_3.title', 'Open voting and track quorum'),
            description: t(
              'use_case_procedures.agm_voting.steps.step_3.description',
              'Members vote live during the meeting or within a set window. Watch participation and quorum update in real time.'
            ),
          },
          {
            title: t('use_case_procedures.agm_voting.steps.step_4.title', 'Verify the count'),
            description: t(
              'use_case_procedures.agm_voting.steps.step_4.description',
              'When voting closes, the tally is computed automatically and anyone can check that results match the votes cast.'
            ),
          },
          {
            title: t('use_case_procedures.agm_voting.steps.step_5.title', 'Publish minutes-ready results'),
            description: t(
              'use_case_procedures.agm_voting.steps.step_5.description',
              'Export a clean record of every motion and its outcome to attach to your AGM minutes.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.agm_voting.features.eyebrow', 'Built for AGMs')}
        title={t('use_case_procedures.agm_voting.features.title', 'The features an AGM actually needs')}
        columns={3}
        features={[
          {
            icon: Users,
            title: t('use_case_procedures.agm_voting.features.quorum.title', 'Live quorum tracking'),
            description: t(
              'use_case_procedures.agm_voting.features.quorum.description',
              'See attendance and participation in real time so the chair knows when a vote is valid.'
            ),
          },
          {
            icon: ListChecks,
            title: t('use_case_procedures.agm_voting.features.agenda.title', 'Multi-motion agendas'),
            description: t(
              'use_case_procedures.agm_voting.features.agenda.description',
              'Run every motion and election of the meeting in one structured, ordered ballot.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.agm_voting.features.verifiable.title', 'Verifiable outcomes'),
            description: t(
              'use_case_procedures.agm_voting.features.verifiable.description',
              'Every result is provable, so approvals of accounts and officers cannot be disputed.'
            ),
          },
          {
            icon: Scale,
            title: t('use_case_procedures.agm_voting.features.majorities.title', 'Custom majorities'),
            description: t(
              'use_case_procedures.agm_voting.features.majorities.description',
              'Set simple, qualified, or two-thirds majority rules per motion to match your statutes.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.agm_voting.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.agm_voting.features.results.description',
              'No manual counting. Outcomes are ready the moment voting closes.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.agm_voting.features.hybrid.title', 'Hybrid friendly'),
            description: t(
              'use_case_procedures.agm_voting.features.hybrid.description',
              'Combine in-person and remote attendees in a single, consistent count.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.agm_voting.faq.eyebrow', 'AGM questions')}
        title={t('use_case_procedures.agm_voting.faq.title', 'Common questions about online AGMs')}
        items={[
          {
            question: t('use_case_procedures.agm_voting.faq.q1.question', 'How do you track quorum online?'),
            answer: t(
              'use_case_procedures.agm_voting.faq.q1.answer',
              'Vocdoni shows live attendance and participation against your census, so the chair can confirm quorum before opening or closing any motion.'
            ),
          },
          {
            question: t('use_case_procedures.agm_voting.faq.q2.question', 'Can members still vote in the room?'),
            answer: t(
              'use_case_procedures.agm_voting.faq.q2.answer',
              'Yes. You can run a hybrid AGM where in-person and remote members vote through the same system and are counted together.'
            ),
          },
          {
            question: t('use_case_procedures.agm_voting.faq.q3.question', 'Are the results legally defensible?'),
            answer: t(
              'use_case_procedures.agm_voting.faq.q3.answer',
              'Every ballot is anonymous and every result is end-to-end verifiable, giving you an auditable record to attach to your minutes.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.agm_voting.cta.title', 'Ready to run your next AGM online?')}
        description={t(
          'use_case_procedures.agm_voting.cta.description',
          'Start free today, or talk to our team about your meeting and statutes.'
        )}
        primaryCta={{
          label: t('use_case_procedures.agm_voting.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.agm_voting.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.agm_voting.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.agm_voting.related.link_1', 'Voting for associations and federations'),
            href: '/solutions/associations-federations',
            description: t(
              'use_case_procedures.agm_voting.related.link_1_desc',
              'Tailored online voting for member organizations.'
            ),
          },
          {
            label: t('use_case_procedures.agm_voting.related.link_2', 'Voting for cooperatives'),
            href: '/solutions/cooperatives',
            description: t(
              'use_case_procedures.agm_voting.related.link_2_desc',
              'Hybrid assemblies with weighted voting.'
            ),
          },
          {
            label: t('use_case_procedures.agm_voting.related.link_3', 'All voting use cases'),
            href: '/use-cases',
            description: t('use_case_procedures.agm_voting.related.link_3_desc', 'Browse every procedure we support.'),
          },
          {
            label: t('use_case_procedures.agm_voting.related.link_4', 'How to amend your bylaws online'),
            href: '/use-cases/bylaws-amendments',
            description: t(
              'use_case_procedures.agm_voting.related.link_4_desc',
              'Run statutory changes with qualified majorities.'
            ),
          },
        ]}
      />
    </>
  )
}
