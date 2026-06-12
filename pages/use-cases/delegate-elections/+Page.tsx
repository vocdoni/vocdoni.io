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

export default function UseCasesDelegateElectionsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.delegate_elections.hero.eyebrow', 'Delegate elections')}
        title={t(
          'use_case_procedures.delegate_elections.hero.title',
          'How to run online delegate elections with verifiable results'
        )}
        subtitle={t(
          'use_case_procedures.delegate_elections.hero.subtitle',
          'Elect delegates and representatives online with secret ballots by section or region, automatic counting, and a result anyone can verify.'
        )}
        primaryCta={{
          label: t('use_case_procedures.delegate_elections.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.delegate_elections.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.delegate_elections.hero.bullet_1', 'Elect delegates by section or region'),
          t('use_case_procedures.delegate_elections.hero.bullet_2', 'Secret, single-use ballots'),
          t('use_case_procedures.delegate_elections.hero.bullet_3', 'Verifiable results across every group'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.delegate_elections.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.delegate_elections.intro.title', 'Electing delegates online')}
        intro={t(
          'use_case_procedures.delegate_elections.intro.intro',
          'Delegate elections choose the representatives who will vote on behalf of a section, branch, or region at a congress or assembly. Running them online keeps each contest separate, secret, and verifiable.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.delegate_elections.intro.block_1.heading', 'Why elect delegates online'),
            paragraphs: [
              t(
                'use_case_procedures.delegate_elections.intro.block_1.p1',
                'Coordinating dozens of separate delegate contests on paper is slow and error-prone. Online, each group votes within its own census, counting is automatic, and every result is provable.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.delegate_elections.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.delegate_elections.intro.block_2.bullet_1', 'Anonymous ballots via zk-SNARK'),
              t(
                'use_case_procedures.delegate_elections.intro.block_2.bullet_2',
                'End-to-end verifiable in every contest'
              ),
              t(
                'use_case_procedures.delegate_elections.intro.block_2.bullet_3',
                'Open source, EU-hosted and GDPR compliant'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.delegate_elections.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.delegate_elections.steps.title', 'How to run delegate elections with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.delegate_elections.steps.step_1.title', 'Define each census'),
            description: t(
              'use_case_procedures.delegate_elections.steps.step_1.description',
              'Split your members into the sections or regions that elect delegates, each with its own voter list.'
            ),
          },
          {
            title: t('use_case_procedures.delegate_elections.steps.step_2.title', 'Configure the ballots'),
            description: t(
              'use_case_procedures.delegate_elections.steps.step_2.description',
              'Add candidates per group, set how many delegate seats are open, and choose the selection rule.'
            ),
          },
          {
            title: t('use_case_procedures.delegate_elections.steps.step_3.title', 'Open voting per group'),
            description: t(
              'use_case_procedures.delegate_elections.steps.step_3.description',
              'Each section votes in secret from any device within the window you set.'
            ),
          },
          {
            title: t('use_case_procedures.delegate_elections.steps.step_4.title', 'Verify every result'),
            description: t(
              'use_case_procedures.delegate_elections.steps.step_4.description',
              'Counting is automatic per group and end-to-end verifiable, so each delegation is provable.'
            ),
          },
          {
            title: t('use_case_procedures.delegate_elections.steps.step_5.title', 'Publish the delegations'),
            description: t(
              'use_case_procedures.delegate_elections.steps.step_5.description',
              'Announce elected delegates for every group and export a verifiable record for the congress.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.delegate_elections.features.eyebrow', 'Built for delegate votes')}
        title={t('use_case_procedures.delegate_elections.features.title', 'What delegate elections need')}
        columns={3}
        features={[
          {
            icon: Users,
            title: t('use_case_procedures.delegate_elections.features.segmented.title', 'Segmented censuses'),
            description: t(
              'use_case_procedures.delegate_elections.features.segmented.description',
              'Run one contest per section or region, each with its own eligible voters.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('use_case_procedures.delegate_elections.features.secret.title', 'Secret ballots'),
            description: t(
              'use_case_procedures.delegate_elections.features.secret.description',
              'Anonymous voting keeps every choice private across all groups.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.delegate_elections.features.verifiable.title', 'Verifiable per group'),
            description: t(
              'use_case_procedures.delegate_elections.features.verifiable.description',
              'Each delegation can be independently confirmed from public proofs.'
            ),
          },
          {
            icon: ListChecks,
            title: t('use_case_procedures.delegate_elections.features.multi_seat.title', 'Multi-seat ballots'),
            description: t(
              'use_case_procedures.delegate_elections.features.multi_seat.description',
              'Fill several delegate seats per group in one ballot.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.delegate_elections.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.delegate_elections.features.results.description',
              'All delegations are ready the moment voting closes.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.delegate_elections.features.eligibility.title', 'Eligibility control'),
            description: t(
              'use_case_procedures.delegate_elections.features.eligibility.description',
              'Members vote only in their own group, and only once.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.delegate_elections.faq.eyebrow', 'Delegate questions')}
        title={t('use_case_procedures.delegate_elections.faq.title', 'Common questions about delegate elections')}
        items={[
          {
            question: t(
              'use_case_procedures.delegate_elections.faq.q1.question',
              'Can each section elect its own delegates?'
            ),
            answer: t(
              'use_case_procedures.delegate_elections.faq.q1.answer',
              'Yes. You define a separate census and ballot per section or region, so each group elects its delegates within its own pool of voters.'
            ),
          },
          {
            question: t(
              'use_case_procedures.delegate_elections.faq.q2.question',
              'Can we run all the contests at once?'
            ),
            answer: t(
              'use_case_procedures.delegate_elections.faq.q2.answer',
              'You can open every delegate contest in the same window and track participation across all of them from one place.'
            ),
          },
          {
            question: t(
              'use_case_procedures.delegate_elections.faq.q3.question',
              'How are results proven to each group?'
            ),
            answer: t(
              'use_case_procedures.delegate_elections.faq.q3.answer',
              'Each contest is end-to-end verifiable, so members of any section can confirm their delegates from the published proofs.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.delegate_elections.cta.title', 'Ready to elect your delegates online?')}
        description={t(
          'use_case_procedures.delegate_elections.cta.description',
          'Start free today, or talk to our team about your delegate structure.'
        )}
        primaryCta={{
          label: t('use_case_procedures.delegate_elections.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.delegate_elections.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.delegate_elections.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.delegate_elections.related.link_1', 'Voting for political parties'),
            href: '/solutions/political-parties',
            description: t(
              'use_case_procedures.delegate_elections.related.link_1_desc',
              'Secure internal democracy for parties.'
            ),
          },
          {
            label: t('use_case_procedures.delegate_elections.related.link_2', 'Voting for trade unions'),
            href: '/solutions/trade-unions',
            description: t(
              'use_case_procedures.delegate_elections.related.link_2_desc',
              'Member votes unions can defend.'
            ),
          },
          {
            label: t('use_case_procedures.delegate_elections.related.link_3', 'All voting use cases'),
            href: '/use-cases',
            description: t(
              'use_case_procedures.delegate_elections.related.link_3_desc',
              'Browse every procedure we support.'
            ),
          },
          {
            label: t('use_case_procedures.delegate_elections.related.link_4', 'How to run party primaries'),
            href: '/use-cases/primaries',
            description: t(
              'use_case_procedures.delegate_elections.related.link_4_desc',
              'Let members choose candidates online.'
            ),
          },
        ]}
      />
    </>
  )
}
