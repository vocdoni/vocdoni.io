import { BadgeCheck, CheckCircle2, Clock, ListChecks, MapPin, Users } from 'lucide-react'
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

export default function UseCasesHybridVotingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.hybrid_voting.hero.eyebrow', 'Hybrid voting')}
        title={t(
          'use_case_procedures.hybrid_voting.hero.title',
          'How to run a hybrid vote with in-person and remote members'
        )}
        subtitle={t(
          'use_case_procedures.hybrid_voting.hero.subtitle',
          'Let members in the room and members at home vote in the same election, counted together, with a single verifiable result.'
        )}
        primaryCta={{
          label: t('use_case_procedures.hybrid_voting.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.hybrid_voting.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.hybrid_voting.hero.bullet_1', 'In-person and remote in one count'),
          t('use_case_procedures.hybrid_voting.hero.bullet_2', 'No double voting across channels'),
          t('use_case_procedures.hybrid_voting.hero.bullet_3', 'One verifiable result for everyone'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.hybrid_voting.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.hybrid_voting.intro.title', 'Running a hybrid vote')}
        intro={t(
          'use_case_procedures.hybrid_voting.intro.intro',
          'A hybrid vote lets members take part whether they are physically present or joining remotely. Running it on one system means both channels share a census and a count, with no duplicate votes.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.hybrid_voting.intro.block_1.heading', 'Why run hybrid'),
            paragraphs: [
              t(
                'use_case_procedures.hybrid_voting.intro.block_1.p1',
                'Members who cannot attend in person no longer miss the vote, and those in the room still vote as usual. One system removes the risk of counting two channels separately and double voting.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.hybrid_voting.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.hybrid_voting.intro.block_2.bullet_1', 'Anonymous ballots via zk-SNARK'),
              t('use_case_procedures.hybrid_voting.intro.block_2.bullet_2', 'End-to-end verifiable combined result'),
              t(
                'use_case_procedures.hybrid_voting.intro.block_2.bullet_3',
                'Open source, EU-hosted and GDPR compliant'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.hybrid_voting.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.hybrid_voting.steps.title', 'How to run a hybrid vote with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.hybrid_voting.steps.step_1.title', 'Build one shared census'),
            description: t(
              'use_case_procedures.hybrid_voting.steps.step_1.description',
              'Upload all eligible members once, whether they will attend in person or vote remotely.'
            ),
          },
          {
            title: t('use_case_procedures.hybrid_voting.steps.step_2.title', 'Configure the ballot'),
            description: t(
              'use_case_procedures.hybrid_voting.steps.step_2.description',
              'Set up your questions and majorities once; the same ballot serves both channels.'
            ),
          },
          {
            title: t('use_case_procedures.hybrid_voting.steps.step_3.title', 'Open voting in the room and remotely'),
            description: t(
              'use_case_procedures.hybrid_voting.steps.step_3.description',
              'Members in the venue vote on site while remote members vote from any device, all within the same window.'
            ),
          },
          {
            title: t('use_case_procedures.hybrid_voting.steps.step_4.title', 'Verify the combined count'),
            description: t(
              'use_case_procedures.hybrid_voting.steps.step_4.description',
              'In-person and remote votes are tallied together and the single result is end-to-end verifiable.'
            ),
          },
          {
            title: t('use_case_procedures.hybrid_voting.steps.step_5.title', 'Publish one result'),
            description: t(
              'use_case_procedures.hybrid_voting.steps.step_5.description',
              'Announce a single, verifiable outcome that covers every member, however they voted.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.hybrid_voting.features.eyebrow', 'Built for hybrid meetings')}
        title={t('use_case_procedures.hybrid_voting.features.title', 'What hybrid voting needs')}
        columns={3}
        features={[
          {
            icon: MapPin,
            title: t('use_case_procedures.hybrid_voting.features.channels.title', 'In-person and remote'),
            description: t(
              'use_case_procedures.hybrid_voting.features.channels.description',
              'Both channels share one census and one ballot, counted together.'
            ),
          },
          {
            icon: Users,
            title: t('use_case_procedures.hybrid_voting.features.no_double.title', 'No double voting'),
            description: t(
              'use_case_procedures.hybrid_voting.features.no_double.description',
              'Single-use credentials make sure each member votes once across all channels.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.hybrid_voting.features.verifiable.title', 'One verifiable result'),
            description: t(
              'use_case_procedures.hybrid_voting.features.verifiable.description',
              'The combined count is end-to-end verifiable by any member.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.hybrid_voting.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.hybrid_voting.features.results.description',
              'The combined outcome is ready the moment voting closes.'
            ),
          },
          {
            icon: ListChecks,
            title: t('use_case_procedures.hybrid_voting.features.live.title', 'Live participation'),
            description: t(
              'use_case_procedures.hybrid_voting.features.live.description',
              'Track turnout across both channels in real time during the meeting.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.hybrid_voting.features.accessible.title', 'Accessible voting'),
            description: t(
              'use_case_procedures.hybrid_voting.features.accessible.description',
              'Remote members vote from any device, so no one is left out.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.hybrid_voting.faq.eyebrow', 'Hybrid questions')}
        title={t('use_case_procedures.hybrid_voting.faq.title', 'Common questions about hybrid voting')}
        items={[
          {
            question: t('use_case_procedures.hybrid_voting.faq.q1.question', 'How do you stop someone voting twice?'),
            answer: t(
              'use_case_procedures.hybrid_voting.faq.q1.answer',
              'Every member gets a single-use credential on one shared census, so they can vote either in the room or remotely, but only once.'
            ),
          },
          {
            question: t(
              'use_case_procedures.hybrid_voting.faq.q2.question',
              'Are in-person and remote votes counted together?'
            ),
            answer: t(
              'use_case_procedures.hybrid_voting.faq.q2.answer',
              'Yes. Both channels feed the same ballot, so there is one combined, end-to-end verifiable result rather than two separate counts.'
            ),
          },
          {
            question: t(
              'use_case_procedures.hybrid_voting.faq.q3.question',
              'Do remote members need special hardware?'
            ),
            answer: t(
              'use_case_procedures.hybrid_voting.faq.q3.answer',
              'No. Remote members vote from any phone or computer with a browser, while in-person members can vote on devices at the venue.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.hybrid_voting.cta.title', 'Ready to run a hybrid vote?')}
        description={t(
          'use_case_procedures.hybrid_voting.cta.description',
          'Start free today, or talk to our team about your hybrid meeting.'
        )}
        primaryCta={{
          label: t('use_case_procedures.hybrid_voting.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.hybrid_voting.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.hybrid_voting.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.hybrid_voting.related.link_1', 'Voting for professional colleges'),
            href: '/solutions/professional-colleges',
            description: t(
              'use_case_procedures.hybrid_voting.related.link_1_desc',
              'Hybrid elections for regulated professions.'
            ),
          },
          {
            label: t('use_case_procedures.hybrid_voting.related.link_2', 'All voting use cases'),
            href: '/use-cases',
            description: t(
              'use_case_procedures.hybrid_voting.related.link_2_desc',
              'Browse every procedure we support.'
            ),
          },
          {
            label: t('use_case_procedures.hybrid_voting.related.link_3', 'How to run an online AGM'),
            href: '/use-cases/agm-voting',
            description: t(
              'use_case_procedures.hybrid_voting.related.link_3_desc',
              'Hold your annual general meeting online.'
            ),
          },
        ]}
      />
    </>
  )
}
