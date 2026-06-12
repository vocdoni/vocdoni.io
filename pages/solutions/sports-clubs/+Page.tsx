import { BadgeCheck, Newspaper, ShieldCheck, Trophy } from 'lucide-react'
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

export default function SolutionsSportsClubsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.sports_clubs.hero.eyebrow', 'Sports clubs')}
        title={t('solutions.sports_clubs.hero.title', 'Online voting for sports clubs the press cannot pull apart')}
        subtitle={t(
          'solutions.sports_clubs.hero.subtitle',
          'Run board and presidential elections that hold up to public scrutiny. Anonymous, end-to-end verifiable ballots that leave no room for doubt.'
        )}
        primaryCta={{
          label: t('solutions.sports_clubs.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.sports_clubs.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.sports_clubs.hero.bullet_1', 'Member elections the press cannot pull apart'),
          t('solutions.sports_clubs.hero.bullet_2', 'Anonymous ballots, end-to-end verifiable results'),
          t('solutions.sports_clubs.hero.bullet_3', 'Members vote from any device, no queues'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.sports_clubs.benefits.eyebrow', 'Built for member-owned clubs')}
        title={t('solutions.sports_clubs.benefits.title', 'Elections that survive public scrutiny')}
        columns={4}
        features={[
          {
            icon: Newspaper,
            title: t('solutions.sports_clubs.benefits.scrutiny.title', 'Press-proof results'),
            description: t(
              'solutions.sports_clubs.benefits.scrutiny.description',
              'Verifiable outcomes leave no story for journalists to pull apart.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('solutions.sports_clubs.benefits.secret.title', 'Secret ballot'),
            description: t(
              'solutions.sports_clubs.benefits.secret.description',
              'Zero-knowledge voting keeps each member ballot private and safe from pressure.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.sports_clubs.benefits.verifiable.title', 'End-to-end verifiable'),
            description: t(
              'solutions.sports_clubs.benefits.verifiable.description',
              'Any member or candidate can confirm the count is correct.'
            ),
          },
          {
            icon: Trophy,
            title: t('solutions.sports_clubs.benefits.turnout.title', 'Higher turnout'),
            description: t(
              'solutions.sports_clubs.benefits.turnout.description',
              'Members vote from any device, so participation climbs and quorum is easy.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.sports_clubs.steps.eyebrow', 'How it works')}
        title={t('solutions.sports_clubs.steps.title', 'Run a club election in four steps')}
        steps={[
          {
            title: t('solutions.sports_clubs.steps.step_1.title', 'Build the member census'),
            description: t(
              'solutions.sports_clubs.steps.step_1.description',
              'Import your socios and set who is eligible to vote in this election.'
            ),
          },
          {
            title: t('solutions.sports_clubs.steps.step_2.title', 'Set up the candidacies'),
            description: t(
              'solutions.sports_clubs.steps.step_2.description',
              'Configure presidential or board candidacies and the voting rules.'
            ),
          },
          {
            title: t('solutions.sports_clubs.steps.step_3.title', 'Open voting'),
            description: t(
              'solutions.sports_clubs.steps.step_3.description',
              'Members vote securely from any device, with no queues at the club.'
            ),
          },
          {
            title: t('solutions.sports_clubs.steps.step_4.title', 'Publish verifiable results'),
            description: t(
              'solutions.sports_clubs.steps.step_4.description',
              'Share instant results with proof that members, candidates and press can check.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.sports_clubs.prose.eyebrow', 'Reputation on the line')}
        title={t('solutions.sports_clubs.prose.title', 'A contested club election becomes a headline')}
        intro={t(
          'solutions.sports_clubs.prose.intro',
          'Member-owned clubs are watched closely by their supporters and the media. A disputed presidential election can dominate the sports pages for weeks.'
        )}
        blocks={[
          {
            heading: t('solutions.sports_clubs.prose.block_1.heading', 'Where club elections go wrong'),
            bullets: [
              t(
                'solutions.sports_clubs.prose.block_1.bullet_1',
                'Manual counts that rival candidacies refuse to accept'
              ),
              t('solutions.sports_clubs.prose.block_1.bullet_2', 'Long queues at the club that depress turnout'),
              t('solutions.sports_clubs.prose.block_1.bullet_3', 'Media scrutiny that magnifies every irregularity'),
            ],
          },
          {
            heading: t('solutions.sports_clubs.prose.block_2.heading', 'How Vocdoni protects the club'),
            bullets: [
              t(
                'solutions.sports_clubs.prose.block_2.bullet_1',
                'End-to-end verifiable results that the press cannot pull apart'
              ),
              t(
                'solutions.sports_clubs.prose.block_2.bullet_2',
                'Remote voting that lifts turnout and removes the queues'
              ),
              t(
                'solutions.sports_clubs.prose.block_2.bullet_3',
                'Anonymous ballots that protect members from pressure'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.sports_clubs.faq.eyebrow', 'FAQ')}
        title={t('solutions.sports_clubs.faq.title', 'Questions from club boards')}
        items={[
          {
            question: t(
              'solutions.sports_clubs.faq.q1.question',
              'How do we stop a losing candidate contesting the result?'
            ),
            answer: t(
              'solutions.sports_clubs.faq.q1.answer',
              'Every ballot is end-to-end verifiable, so any candidacy can independently confirm the count. That removes the technical grounds for contesting the election.'
            ),
          },
          {
            question: t('solutions.sports_clubs.faq.q2.question', 'Can members vote without coming to the club?'),
            answer: t(
              'solutions.sports_clubs.faq.q2.answer',
              'Yes. Members vote securely from any device, which removes queues at the club and significantly lifts turnout.'
            ),
          },
          {
            question: t('solutions.sports_clubs.faq.q3.question', 'Is each member ballot really secret?'),
            answer: t(
              'solutions.sports_clubs.faq.q3.answer',
              'It is. Zero-knowledge cryptography keeps each vote anonymous, even from the club, while still letting anyone verify the final result.'
            ),
          },
          {
            question: t('solutions.sports_clubs.faq.q4.question', 'Will the result stand up to media scrutiny?'),
            answer: t(
              'solutions.sports_clubs.faq.q4.answer',
              'Yes. A public, verifiable audit trail means journalists and members can check the outcome for themselves, leaving no story to pull apart.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.sports_clubs.cta.title', 'Run a club election no one can pull apart')}
        description={t(
          'solutions.sports_clubs.cta.description',
          'Start a free vote today, or book a call and we will plan your club election.'
        )}
        primaryCta={{
          label: t('solutions.sports_clubs.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.sports_clubs.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.sports_clubs.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.sports_clubs.related.agm', 'AGM and assembly voting'),
            href: '/use-cases/agm-voting',
            description: t('solutions.sports_clubs.related.agm_desc', 'How member assemblies work with Vocdoni.'),
          },
          {
            label: t('solutions.sports_clubs.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.sports_clubs.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.sports_clubs.related.security', 'Security'),
            href: '/security',
            description: t('solutions.sports_clubs.related.security_desc', 'Architecture, audits and verifiability.'),
          },
          {
            label: t('solutions.sports_clubs.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t('solutions.sports_clubs.related.case_studies_desc', 'See how clubs run their elections.'),
          },
        ]}
      />
    </>
  )
}
