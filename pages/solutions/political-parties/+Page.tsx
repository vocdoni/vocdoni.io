import { BadgeCheck, ScrollText, ShieldCheck, Vote } from 'lucide-react'
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

export default function SolutionsPoliticalPartiesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.political_parties.hero.eyebrow', 'Political parties')}
        title={t(
          'solutions.political_parties.hero.title',
          'Online voting for political parties: primaries without disputes'
        )}
        subtitle={t(
          'solutions.political_parties.hero.subtitle',
          'Run elecciones primarias and delegate elections that every faction can trust. Anonymous, verifiable ballots that close the door on contested results.'
        )}
        primaryCta={{
          label: t('solutions.political_parties.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.political_parties.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.political_parties.hero.bullet_1', 'Primaries and delegate elections without disputes'),
          t('solutions.political_parties.hero.bullet_2', 'Secret ballot guaranteed by zero-knowledge cryptography'),
          t('solutions.political_parties.hero.bullet_3', 'Results every faction can independently verify'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.political_parties.benefits.eyebrow', 'Built for party democracy')}
        title={t('solutions.political_parties.benefits.title', 'Internal elections that hold up to scrutiny')}
        columns={4}
        features={[
          {
            icon: Vote,
            title: t('solutions.political_parties.benefits.primaries.title', 'Primaries at any scale'),
            description: t(
              'solutions.political_parties.benefits.primaries.description',
              'Run elecciones primarias for thousands of affiliates in a single secure process.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('solutions.political_parties.benefits.secret.title', 'Secret ballot'),
            description: t(
              'solutions.political_parties.benefits.secret.description',
              'Zero-knowledge voting protects each affiliate from internal pressure.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.political_parties.benefits.disputes.title', 'No disputes'),
            description: t(
              'solutions.political_parties.benefits.disputes.description',
              'Verifiable results give losing camps nothing to contest.'
            ),
          },
          {
            icon: ScrollText,
            title: t('solutions.political_parties.benefits.audit.title', 'Full audit trail'),
            description: t(
              'solutions.political_parties.benefits.audit.description',
              'Every step is recorded and independently checkable after the vote.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.political_parties.steps.eyebrow', 'How it works')}
        title={t('solutions.political_parties.steps.title', 'From candidacies to certified results')}
        steps={[
          {
            title: t('solutions.political_parties.steps.step_1.title', 'Register the census'),
            description: t(
              'solutions.political_parties.steps.step_1.description',
              'Load the roll of affiliates or delegates and set eligibility rules.'
            ),
          },
          {
            title: t('solutions.political_parties.steps.step_2.title', 'Configure the contest'),
            description: t(
              'solutions.political_parties.steps.step_2.description',
              'Set up primaries, delegate elections or internal referendums with the rules you need.'
            ),
          },
          {
            title: t('solutions.political_parties.steps.step_3.title', 'Open voting'),
            description: t(
              'solutions.political_parties.steps.step_3.description',
              'Affiliates vote securely and anonymously from any device within the voting window.'
            ),
          },
          {
            title: t('solutions.political_parties.steps.step_4.title', 'Verify and certify'),
            description: t(
              'solutions.political_parties.steps.step_4.description',
              'Publish instant results with proof that any candidacy or observer can verify.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.political_parties.prose.eyebrow', 'Trust between factions')}
        title={t('solutions.political_parties.prose.title', 'In a party, the result has to be beyond doubt')}
        intro={t(
          'solutions.political_parties.prose.intro',
          'Internal elections are where parties are most exposed. A contested primary can split the organization and dominate the headlines for weeks.'
        )}
        blocks={[
          {
            heading: t('solutions.political_parties.prose.block_1.heading', 'Where internal votes go wrong'),
            bullets: [
              t('solutions.political_parties.prose.block_1.bullet_1', 'Opaque counts let losing camps cry foul'),
              t(
                'solutions.political_parties.prose.block_1.bullet_2',
                'Manual processes are slow and easy to challenge'
              ),
              t(
                'solutions.political_parties.prose.block_1.bullet_3',
                'Affiliates fear their vote is not really secret'
              ),
            ],
          },
          {
            heading: t('solutions.political_parties.prose.block_2.heading', 'How Vocdoni protects the process'),
            bullets: [
              t(
                'solutions.political_parties.prose.block_2.bullet_1',
                'End-to-end verifiable results leave no room for accusations'
              ),
              t(
                'solutions.political_parties.prose.block_2.bullet_2',
                'Anonymous ballots shield affiliates from internal pressure'
              ),
              t(
                'solutions.political_parties.prose.block_2.bullet_3',
                'A complete audit trail satisfies observers and the media'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.political_parties.faq.eyebrow', 'FAQ')}
        title={t('solutions.political_parties.faq.title', 'Questions from secretarías de organización')}
        items={[
          {
            question: t(
              'solutions.political_parties.faq.q1.question',
              'How does Vocdoni prevent disputes in primaries?'
            ),
            answer: t(
              'solutions.political_parties.faq.q1.answer',
              'Every ballot is end-to-end verifiable, so any candidacy can independently confirm the result matches the votes cast. That removes the technical grounds for contesting a primary.'
            ),
          },
          {
            question: t('solutions.political_parties.faq.q2.question', 'Is the affiliate vote truly secret?'),
            answer: t(
              'solutions.political_parties.faq.q2.answer',
              'Yes. Zero-knowledge cryptography keeps each vote anonymous, even from the party administration, protecting affiliates from any internal pressure.'
            ),
          },
          {
            question: t(
              'solutions.political_parties.faq.q3.question',
              'Can we run delegate elections as well as primaries?'
            ),
            answer: t(
              'solutions.political_parties.faq.q3.answer',
              'Yes. The platform handles primaries, delegate elections and internal referendums, with weighted votes where your structure requires them.'
            ),
          },
          {
            question: t('solutions.political_parties.faq.q4.question', 'Can observers audit the election?'),
            answer: t(
              'solutions.political_parties.faq.q4.answer',
              'They can. Vocdoni produces a full, public audit trail that observers, the press and any affiliate can inspect without trusting the organizers.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.political_parties.cta.title', 'Run primaries no one can contest')}
        description={t(
          'solutions.political_parties.cta.description',
          'Start a free vote today, or book a call and we will design your internal election.'
        )}
        primaryCta={{
          label: t('solutions.political_parties.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.political_parties.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.political_parties.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.political_parties.related.primaries', 'Primaries'),
            href: '/use-cases/primaries',
            description: t(
              'solutions.political_parties.related.primaries_desc',
              'How verifiable primaries work with Vocdoni.'
            ),
          },
          {
            label: t('solutions.political_parties.related.delegate', 'Delegate elections'),
            href: '/use-cases/delegate-elections',
            description: t(
              'solutions.political_parties.related.delegate_desc',
              'Elect delegates at scale with a full audit trail.'
            ),
          },
          {
            label: t('solutions.political_parties.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.political_parties.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.political_parties.related.security', 'Security'),
            href: '/security',
            description: t(
              'solutions.political_parties.related.security_desc',
              'Architecture, audits and verifiability.'
            ),
          },
          {
            label: t('solutions.political_parties.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t(
              'solutions.political_parties.related.case_studies_desc',
              'See how organizations run internal elections.'
            ),
          },
        ]}
      />
    </>
  )
}
