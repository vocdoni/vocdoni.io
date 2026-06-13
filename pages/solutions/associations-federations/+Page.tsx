import { BadgeCheck, Clock, Smartphone, Users } from 'lucide-react'
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

export default function SolutionsAssociationsFederationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.associations_federations.hero.eyebrow', 'Associations and federations')}
        title={t(
          'solutions.associations_federations.hero.title',
          'Online voting for associations and federations that reach quorum'
        )}
        subtitle={t(
          'solutions.associations_federations.hero.subtitle',
          'Stop chasing votes. Members decide from any device, and your assembly stays valid. Òmnium Cultural runs votes for 180,000 members on Vocdoni.'
        )}
        primaryCta={{
          label: t('solutions.associations_federations.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.associations_federations.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.associations_federations.hero.bullet_1', 'Reach quorum without the chase'),
          t('solutions.associations_federations.hero.bullet_2', 'Members vote in minutes from any device'),
          t('solutions.associations_federations.hero.bullet_3', 'Private and end-to-end verifiable'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.associations_federations.benefits.eyebrow', 'Built for member-led organizations')}
        title={t('solutions.associations_federations.benefits.title', 'Assemblies that actually reach the room')}
        columns={4}
        features={[
          {
            icon: Users,
            title: t('solutions.associations_federations.benefits.quorum.title', 'Reach quorum'),
            description: t(
              'solutions.associations_federations.benefits.quorum.description',
              'Remote voting lifts turnout so your assembly stays valid every time.'
            ),
          },
          {
            icon: Smartphone,
            title: t('solutions.associations_federations.benefits.access.title', 'Vote from anywhere'),
            description: t(
              'solutions.associations_federations.benefits.access.description',
              'Members cast their ballot from any phone, tablet or computer in minutes.'
            ),
          },
          {
            icon: Clock,
            title: t('solutions.associations_federations.benefits.speed.title', 'Results in seconds'),
            description: t(
              'solutions.associations_federations.benefits.speed.description',
              'No manual counting. The outcome is ready the moment voting closes.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.associations_federations.benefits.trust.title', 'Verifiable and private'),
            description: t(
              'solutions.associations_federations.benefits.trust.description',
              'Every member can check the result while their own vote stays secret.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.associations_federations.steps.eyebrow', 'How it works')}
        title={t('solutions.associations_federations.steps.title', 'Set up an assembly vote in four steps')}
        steps={[
          {
            title: t('solutions.associations_federations.steps.step_1.title', 'Upload your members'),
            description: t(
              'solutions.associations_federations.steps.step_1.description',
              'Import your membership list and set who can vote, including federated bodies.'
            ),
          },
          {
            title: t('solutions.associations_federations.steps.step_2.title', 'Build the ballot'),
            description: t(
              'solutions.associations_federations.steps.step_2.description',
              'Add your motions and candidates, with weighted votes for federations if needed.'
            ),
          },
          {
            title: t('solutions.associations_federations.steps.step_3.title', 'Invite and remind'),
            description: t(
              'solutions.associations_federations.steps.step_3.description',
              'Send secure invitations and automatic reminders so members do not forget to vote.'
            ),
          },
          {
            title: t('solutions.associations_federations.steps.step_4.title', 'Publish results'),
            description: t(
              'solutions.associations_federations.steps.step_4.description',
              'Close the vote and share instant, verifiable results with your whole membership.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.associations_federations.prose.eyebrow', 'Quorum and participation')}
        title={t('solutions.associations_federations.prose.title', 'The hard part is getting members to vote')}
        intro={t(
          'solutions.associations_federations.prose.intro',
          'Associations and federations live and die by participation. When members cannot make the meeting, decisions stall and assemblies fail for lack of quorum.'
        )}
        blocks={[
          {
            heading: t('solutions.associations_federations.prose.block_1.heading', 'The participation problem'),
            bullets: [
              t(
                'solutions.associations_federations.prose.block_1.bullet_1',
                'In-person assemblies exclude members who cannot travel'
              ),
              t(
                'solutions.associations_federations.prose.block_1.bullet_2',
                'Chasing proxies and votes by email is slow and error prone'
              ),
              t(
                'solutions.associations_federations.prose.block_1.bullet_3',
                'Federations struggle to weight votes across member bodies'
              ),
            ],
          },
          {
            heading: t('solutions.associations_federations.prose.block_2.heading', 'How Vocdoni helps'),
            bullets: [
              t(
                'solutions.associations_federations.prose.block_2.bullet_1',
                'Remote voting opens participation to every member'
              ),
              t(
                'solutions.associations_federations.prose.block_2.bullet_2',
                'Automatic reminders push turnout past the quorum threshold'
              ),
              t(
                'solutions.associations_federations.prose.block_2.bullet_3',
                'Weighted voting handles federated structures cleanly'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.associations_federations.faq.eyebrow', 'FAQ')}
        title={t('solutions.associations_federations.faq.title', 'Questions from association boards')}
        items={[
          {
            question: t(
              'solutions.associations_federations.faq.q1.question',
              'Will online voting help us reach quorum?'
            ),
            answer: t(
              'solutions.associations_federations.faq.q1.answer',
              'Yes. When members can vote from any device with a reminder in their inbox, participation climbs well above what in-person assemblies achieve.'
            ),
          },
          {
            question: t(
              'solutions.associations_federations.faq.q2.question',
              'Can we run a hybrid assembly with remote and in-person votes?'
            ),
            answer: t(
              'solutions.associations_federations.faq.q2.answer',
              'Yes. Vocdoni combines remote and in-person ballots in a single, secure tally, so every member can take part however they attend.'
            ),
          },
          {
            question: t(
              'solutions.associations_federations.faq.q3.question',
              'Does it support weighted votes for federations?'
            ),
            answer: t(
              'solutions.associations_federations.faq.q3.answer',
              'It does. You can assign weighted votes to member bodies, which is essential for federations where each organization carries a different weight.'
            ),
          },
          {
            question: t('solutions.associations_federations.faq.q4.question', 'Is the vote really private?'),
            answer: t(
              'solutions.associations_federations.faq.q4.answer',
              'Yes. Zero-knowledge cryptography keeps every ballot secret, even from us, while still letting anyone verify the final result.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.associations_federations.cta.title', 'Reach quorum at your next assembly')}
        description={t(
          'solutions.associations_federations.cta.description',
          'Start a free vote today, or book a call and we will help you lift participation.'
        )}
        primaryCta={{
          label: t('solutions.associations_federations.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.associations_federations.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.associations_federations.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.associations_federations.related.agm', 'AGM and assembly voting'),
            href: '/use-cases/agm-voting',
            description: t(
              'solutions.associations_federations.related.agm_desc',
              'How hybrid assemblies work with Vocdoni.'
            ),
          },
          {
            label: t('solutions.associations_federations.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.associations_federations.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.associations_federations.related.security', 'Security'),
            href: '/security',
            description: t(
              'solutions.associations_federations.related.security_desc',
              'Architecture, audits and verifiability.'
            ),
          },
          {
            label: t('solutions.associations_federations.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t(
              'solutions.associations_federations.related.case_studies_desc',
              'See how associations run their votes.'
            ),
          },
        ]}
      />
    </>
  )
}
