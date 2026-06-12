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

export default function UseCasesBoardElectionsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.board_elections.hero.eyebrow', 'Board elections')}
        title={t(
          'use_case_procedures.board_elections.hero.title',
          'How to run online board elections with verifiable results'
        )}
        subtitle={t(
          'use_case_procedures.board_elections.hero.subtitle',
          'Elect your board or committee online with secret ballots, automatic counting, and an audit trail your members can check themselves.'
        )}
        primaryCta={{
          label: t('use_case_procedures.board_elections.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.board_elections.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.board_elections.hero.bullet_1', 'Secret ballots for contested seats'),
          t('use_case_procedures.board_elections.hero.bullet_2', 'Automatic counting, no recounts'),
          t('use_case_procedures.board_elections.hero.bullet_3', 'Results anyone can verify'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.board_elections.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.board_elections.intro.title', 'Electing your board online')}
        intro={t(
          'use_case_procedures.board_elections.intro.intro',
          'Board and committee elections decide who leads your organization. Running them online lets every eligible member vote in secret, from anywhere, with a result no one can question.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.board_elections.intro.block_1.heading', 'Why elect online'),
            paragraphs: [
              t(
                'use_case_procedures.board_elections.intro.block_1.p1',
                'Postal and in-person elections limit who can stand and who can vote. Online elections raise turnout, remove counting errors, and produce a record that holds up if a result is challenged.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.board_elections.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t(
                'use_case_procedures.board_elections.intro.block_2.bullet_1',
                'Secret ballots protected by zk-SNARK technology'
              ),
              t(
                'use_case_procedures.board_elections.intro.block_2.bullet_2',
                'End-to-end verifiable, so no seat is disputed'
              ),
              t(
                'use_case_procedures.board_elections.intro.block_2.bullet_3',
                'Open source, EU-hosted and GDPR compliant'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.board_elections.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.board_elections.steps.title', 'How to run your board election with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.board_elections.steps.step_1.title', 'Set up the voter census'),
            description: t(
              'use_case_procedures.board_elections.steps.step_1.description',
              'Import your roll of eligible members. Each receives a private credential they can only use once.'
            ),
          },
          {
            title: t('use_case_procedures.board_elections.steps.step_2.title', 'Configure the ballot'),
            description: t(
              'use_case_procedures.board_elections.steps.step_2.description',
              'Add candidates per seat, set how many a member may choose, and decide the majority each seat requires.'
            ),
          },
          {
            title: t('use_case_procedures.board_elections.steps.step_3.title', 'Open the voting window'),
            description: t(
              'use_case_procedures.board_elections.steps.step_3.description',
              'Members vote in secret from any device during the period you set, with reminders to boost turnout.'
            ),
          },
          {
            title: t('use_case_procedures.board_elections.steps.step_4.title', 'Verify the results'),
            description: t(
              'use_case_procedures.board_elections.steps.step_4.description',
              'Counting is automatic and the outcome is end-to-end verifiable, so any member can confirm it independently.'
            ),
          },
          {
            title: t('use_case_procedures.board_elections.steps.step_5.title', 'Announce and record'),
            description: t(
              'use_case_procedures.board_elections.steps.step_5.description',
              'Publish the elected board and export a verifiable record for your minutes and registry filings.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.board_elections.features.eyebrow', 'Built for elections')}
        title={t('use_case_procedures.board_elections.features.title', 'Everything a clean board election needs')}
        columns={3}
        features={[
          {
            icon: ShieldCheck,
            title: t('use_case_procedures.board_elections.features.secret.title', 'Secret ballots'),
            description: t(
              'use_case_procedures.board_elections.features.secret.description',
              'Anonymous voting keeps each choice private, even from the organizers.'
            ),
          },
          {
            icon: ListChecks,
            title: t('use_case_procedures.board_elections.features.seats.title', 'Multi-seat ballots'),
            description: t(
              'use_case_procedures.board_elections.features.seats.description',
              'Elect several positions at once with the selection rules each seat needs.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.board_elections.features.verifiable.title', 'Verifiable counts'),
            description: t(
              'use_case_procedures.board_elections.features.verifiable.description',
              'Every voter can check that the published result matches the votes cast.'
            ),
          },
          {
            icon: Users,
            title: t('use_case_procedures.board_elections.features.eligibility.title', 'Eligibility control'),
            description: t(
              'use_case_procedures.board_elections.features.eligibility.description',
              'Only members on your census can vote, and only once each.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.board_elections.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.board_elections.features.results.description',
              'The winner of each seat is known the moment voting closes.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.board_elections.features.audit.title', 'Audit trail'),
            description: t(
              'use_case_procedures.board_elections.features.audit.description',
              'A complete, tamper-evident record for any seat that is contested.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.board_elections.faq.eyebrow', 'Election questions')}
        title={t('use_case_procedures.board_elections.faq.title', 'Common questions about online board elections')}
        items={[
          {
            question: t('use_case_procedures.board_elections.faq.q1.question', 'Are the ballots really secret?'),
            answer: t(
              'use_case_procedures.board_elections.faq.q1.answer',
              'Yes. Vocdoni uses zk-SNARK technology so each vote stays anonymous while the overall result remains fully verifiable.'
            ),
          },
          {
            question: t(
              'use_case_procedures.board_elections.faq.q2.question',
              'Can we elect several positions in one vote?'
            ),
            answer: t(
              'use_case_procedures.board_elections.faq.q2.answer',
              'You can run multiple seats in a single ballot, each with its own candidates, selection limits, and majority rule.'
            ),
          },
          {
            question: t(
              'use_case_procedures.board_elections.faq.q3.question',
              'What if a candidate disputes the result?'
            ),
            answer: t(
              'use_case_procedures.board_elections.faq.q3.answer',
              'Because the count is end-to-end verifiable, anyone can independently confirm the outcome from the published proofs, which settles disputes quickly.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.board_elections.cta.title', 'Ready to elect your next board online?')}
        description={t(
          'use_case_procedures.board_elections.cta.description',
          'Start free today, or talk to our team about your election rules.'
        )}
        primaryCta={{
          label: t('use_case_procedures.board_elections.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.board_elections.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.board_elections.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.board_elections.related.link_1', 'Voting for associations and federations'),
            href: '/solutions/associations-federations',
            description: t(
              'use_case_procedures.board_elections.related.link_1_desc',
              'Tailored online voting for member organizations.'
            ),
          },
          {
            label: t('use_case_procedures.board_elections.related.link_2', 'Voting for cooperatives'),
            href: '/solutions/cooperatives',
            description: t(
              'use_case_procedures.board_elections.related.link_2_desc',
              'Hybrid assemblies with weighted voting.'
            ),
          },
          {
            label: t('use_case_procedures.board_elections.related.link_3', 'All voting use cases'),
            href: '/use-cases',
            description: t(
              'use_case_procedures.board_elections.related.link_3_desc',
              'Browse every procedure we support.'
            ),
          },
          {
            label: t('use_case_procedures.board_elections.related.link_4', 'How to run an online AGM'),
            href: '/use-cases/agm-voting',
            description: t(
              'use_case_procedures.board_elections.related.link_4_desc',
              'Hold your annual general meeting online.'
            ),
          },
        ]}
      />
    </>
  )
}
