import { BadgeCheck, HeartHandshake, PiggyBank, Sparkles } from 'lucide-react'
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

export default function SolutionsNgosFoundationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.ngos_foundations.hero.eyebrow', 'NGOs and foundations')}
        title={t(
          'solutions.ngos_foundations.hero.title',
          'Online voting for NGOs and foundations that matches your mission'
        )}
        subtitle={t(
          'solutions.ngos_foundations.hero.subtitle',
          'Transparent, affordable governance that reflects your values. Board elections, member assemblies and consultations that are easy to run and easy to trust.'
        )}
        primaryCta={{
          label: t('solutions.ngos_foundations.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.ngos_foundations.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.ngos_foundations.hero.bullet_1', 'Governance that matches your mission'),
          t('solutions.ngos_foundations.hero.bullet_2', 'Affordable and transparent by design'),
          t('solutions.ngos_foundations.hero.bullet_3', 'Easy to run, even without a tech team'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.ngos_foundations.benefits.eyebrow', 'Built for mission-driven teams')}
        title={t('solutions.ngos_foundations.benefits.title', 'Transparent governance without the overhead')}
        columns={4}
        features={[
          {
            icon: HeartHandshake,
            title: t('solutions.ngos_foundations.benefits.mission.title', 'True to your values'),
            description: t(
              'solutions.ngos_foundations.benefits.mission.description',
              'Open, verifiable voting reflects the transparency your supporters expect.'
            ),
          },
          {
            icon: PiggyBank,
            title: t('solutions.ngos_foundations.benefits.cost.title', 'Affordable'),
            description: t(
              'solutions.ngos_foundations.benefits.cost.description',
              'A free plan to start and clear pricing that respects a tight budget.'
            ),
          },
          {
            icon: Sparkles,
            title: t('solutions.ngos_foundations.benefits.easy.title', 'Easy to run'),
            description: t(
              'solutions.ngos_foundations.benefits.easy.description',
              'Set up a vote in minutes with no technical skills and no installation.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.ngos_foundations.benefits.trust.title', 'Verifiable and private'),
            description: t(
              'solutions.ngos_foundations.benefits.trust.description',
              'Members trust the result because anyone can verify it, in secret.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.ngos_foundations.steps.eyebrow', 'How it works')}
        title={t('solutions.ngos_foundations.steps.title', 'Run a vote in four simple steps')}
        steps={[
          {
            title: t('solutions.ngos_foundations.steps.step_1.title', 'Add your members'),
            description: t(
              'solutions.ngos_foundations.steps.step_1.description',
              'Import your board, members or volunteers and set who can vote.'
            ),
          },
          {
            title: t('solutions.ngos_foundations.steps.step_2.title', 'Create the ballot'),
            description: t(
              'solutions.ngos_foundations.steps.step_2.description',
              'Set up board elections, motions or consultations in a few clicks.'
            ),
          },
          {
            title: t('solutions.ngos_foundations.steps.step_3.title', 'Invite and vote'),
            description: t(
              'solutions.ngos_foundations.steps.step_3.description',
              'Send secure invitations so people vote from any device, wherever they are.'
            ),
          },
          {
            title: t('solutions.ngos_foundations.steps.step_4.title', 'Share results'),
            description: t(
              'solutions.ngos_foundations.steps.step_4.description',
              'Publish instant, verifiable results your community can trust.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.ngos_foundations.prose.eyebrow', 'Transparency on a budget')}
        title={t('solutions.ngos_foundations.prose.title', 'Good governance should not strain your resources')}
        intro={t(
          'solutions.ngos_foundations.prose.intro',
          'NGOs and foundations are held to a high standard of transparency, yet rarely have the budget or staff to run heavy election processes. Vocdoni closes that gap.'
        )}
        blocks={[
          {
            heading: t('solutions.ngos_foundations.prose.block_1.heading', 'The everyday struggle'),
            bullets: [
              t('solutions.ngos_foundations.prose.block_1.bullet_1', 'Limited budget for governance tooling'),
              t('solutions.ngos_foundations.prose.block_1.bullet_2', 'Small teams with no time for manual counting'),
              t('solutions.ngos_foundations.prose.block_1.bullet_3', 'Donors and members who expect full transparency'),
            ],
          },
          {
            heading: t('solutions.ngos_foundations.prose.block_2.heading', 'How Vocdoni fits'),
            bullets: [
              t(
                'solutions.ngos_foundations.prose.block_2.bullet_1',
                'A free plan to start and affordable tiers as you grow'
              ),
              t(
                'solutions.ngos_foundations.prose.block_2.bullet_2',
                'Instant results with no manual work for your team'
              ),
              t(
                'solutions.ngos_foundations.prose.block_2.bullet_3',
                'Verifiable, open voting that proves your transparency'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.ngos_foundations.faq.eyebrow', 'FAQ')}
        title={t('solutions.ngos_foundations.faq.title', 'Questions from directors and operations leads')}
        items={[
          {
            question: t('solutions.ngos_foundations.faq.q1.question', 'Is there a plan that fits a small budget?'),
            answer: t(
              'solutions.ngos_foundations.faq.q1.answer',
              'Yes. You can start with a free plan and move to affordable annual tiers as your membership grows, with no hidden costs.'
            ),
          },
          {
            question: t('solutions.ngos_foundations.faq.q2.question', 'Do we need technical skills to run a vote?'),
            answer: t(
              'solutions.ngos_foundations.faq.q2.answer',
              'No. Vocdoni is designed to be set up in minutes with no installation or technical knowledge, so any team member can run an election.'
            ),
          },
          {
            question: t(
              'solutions.ngos_foundations.faq.q3.question',
              'How does it support our transparency commitments?'
            ),
            answer: t(
              'solutions.ngos_foundations.faq.q3.answer',
              'Every result is end-to-end verifiable and open source, so members and donors can independently confirm that decisions were made fairly.'
            ),
          },
          {
            question: t('solutions.ngos_foundations.faq.q4.question', 'Is members data protected?'),
            answer: t(
              'solutions.ngos_foundations.faq.q4.answer',
              'Yes. Vocdoni is GDPR compliant and hosted in the EU, and ballots are anonymous thanks to zero-knowledge cryptography.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.ngos_foundations.cta.title', 'Govern with the transparency you stand for')}
        description={t(
          'solutions.ngos_foundations.cta.description',
          'Start a free vote today, or book a call and we will tailor Vocdoni to your mission.'
        )}
        primaryCta={{
          label: t('solutions.ngos_foundations.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.ngos_foundations.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.ngos_foundations.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.ngos_foundations.related.agm', 'AGM and assembly voting'),
            href: '/use-cases/agm-voting',
            description: t('solutions.ngos_foundations.related.agm_desc', 'How member assemblies work with Vocdoni.'),
          },
          {
            label: t('solutions.ngos_foundations.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.ngos_foundations.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.ngos_foundations.related.security', 'Security'),
            href: '/security',
            description: t(
              'solutions.ngos_foundations.related.security_desc',
              'Architecture, audits and verifiability.'
            ),
          },
          {
            label: t('solutions.ngos_foundations.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t('solutions.ngos_foundations.related.case_studies_desc', 'See how organizations govern.'),
          },
        ]}
      />
    </>
  )
}
