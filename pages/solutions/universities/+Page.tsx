import { BadgeCheck, GraduationCap, Landmark, Users } from 'lucide-react'
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

export default function SolutionsUniversitiesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.universities.hero.eyebrow', 'Universities')}
        title={t(
          'solutions.universities.hero.title',
          'Online voting for universities: student, senate and rectorate elections'
        )}
        subtitle={t(
          'solutions.universities.hero.subtitle',
          'Run student elections, faculty senate votes and rectorate elections on one secure platform, with weighted electoral colleges and verifiable results.'
        )}
        primaryCta={{
          label: t('solutions.universities.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.universities.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.universities.hero.bullet_1', 'Student, senate and rectorate elections in one place'),
          t('solutions.universities.hero.bullet_2', 'Weighted electoral colleges for each constituency'),
          t('solutions.universities.hero.bullet_3', 'Anonymous, verifiable ballots across the campus'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.universities.benefits.eyebrow', 'Built for academic governance')}
        title={t('solutions.universities.benefits.title', 'Every campus election on one platform')}
        columns={4}
        features={[
          {
            icon: GraduationCap,
            title: t('solutions.universities.benefits.students.title', 'Student elections'),
            description: t(
              'solutions.universities.benefits.students.description',
              'Run student council and representative elections with high turnout.'
            ),
          },
          {
            icon: Users,
            title: t('solutions.universities.benefits.senate.title', 'Faculty senate'),
            description: t(
              'solutions.universities.benefits.senate.description',
              'Hold senate and faculty votes with the formality academic bodies require.'
            ),
          },
          {
            icon: Landmark,
            title: t('solutions.universities.benefits.rectorate.title', 'Rectorate elections'),
            description: t(
              'solutions.universities.benefits.rectorate.description',
              'Manage rectorate elections with weighted colleges for each constituency.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.universities.benefits.verifiable.title', 'Verifiable and anonymous'),
            description: t(
              'solutions.universities.benefits.verifiable.description',
              'Results anyone on campus can verify, with every ballot kept secret.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.universities.steps.eyebrow', 'How it works')}
        title={t('solutions.universities.steps.title', 'Run a campus election in four steps')}
        steps={[
          {
            title: t('solutions.universities.steps.step_1.title', 'Define the constituencies'),
            description: t(
              'solutions.universities.steps.step_1.description',
              'Import students, faculty and staff and set the weight of each electoral college.'
            ),
          },
          {
            title: t('solutions.universities.steps.step_2.title', 'Configure the election'),
            description: t(
              'solutions.universities.steps.step_2.description',
              'Set up candidacies and rules for student, senate or rectorate elections.'
            ),
          },
          {
            title: t('solutions.universities.steps.step_3.title', 'Open voting'),
            description: t(
              'solutions.universities.steps.step_3.description',
              'The campus votes securely from any device within the voting window.'
            ),
          },
          {
            title: t('solutions.universities.steps.step_4.title', 'Publish results'),
            description: t(
              'solutions.universities.steps.step_4.description',
              'Share instant, verifiable results weighted by college, ready to certify.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.universities.prose.eyebrow', 'Academic governance')}
        title={t('solutions.universities.prose.title', 'Campus elections are complex and high stakes')}
        intro={t(
          'solutions.universities.prose.intro',
          'Universities run many elections across students, faculty and staff, often with weighted electoral colleges. Coordinating them on paper is slow and easy to contest.'
        )}
        blocks={[
          {
            heading: t('solutions.universities.prose.block_1.heading', 'The campus challenge'),
            bullets: [
              t('solutions.universities.prose.block_1.bullet_1', 'Multiple constituencies with different vote weights'),
              t(
                'solutions.universities.prose.block_1.bullet_2',
                'Low student turnout when voting means queuing in person'
              ),
              t(
                'solutions.universities.prose.block_1.bullet_3',
                'Sensitive rectorate elections that must be beyond doubt'
              ),
            ],
          },
          {
            heading: t('solutions.universities.prose.block_2.heading', 'How Vocdoni helps'),
            bullets: [
              t(
                'solutions.universities.prose.block_2.bullet_1',
                'Weighted electoral colleges configured and counted automatically'
              ),
              t('solutions.universities.prose.block_2.bullet_2', 'Remote voting lifts student and staff participation'),
              t(
                'solutions.universities.prose.block_2.bullet_3',
                'End-to-end verifiable results that withstand any challenge'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.universities.faq.eyebrow', 'FAQ')}
        title={t('solutions.universities.faq.title', 'Questions from rectorates and student affairs')}
        items={[
          {
            question: t(
              'solutions.universities.faq.q1.question',
              'Can one platform handle student, senate and rectorate elections?'
            ),
            answer: t(
              'solutions.universities.faq.q1.answer',
              'Yes. Vocdoni runs every kind of campus election on one platform, each with its own census, rules and electoral colleges.'
            ),
          },
          {
            question: t('solutions.universities.faq.q2.question', 'Does it support weighted electoral colleges?'),
            answer: t(
              'solutions.universities.faq.q2.answer',
              'It does. You can weight each constituency, such as students, faculty and staff, and the system applies the weighting automatically.'
            ),
          },
          {
            question: t('solutions.universities.faq.q3.question', 'Will remote voting improve student turnout?'),
            answer: t(
              'solutions.universities.faq.q3.answer',
              'Yes. When students can vote from any device instead of queuing on campus, participation rises significantly.'
            ),
          },
          {
            question: t(
              'solutions.universities.faq.q4.question',
              'Are sensitive elections like the rectorate fully verifiable?'
            ),
            answer: t(
              'solutions.universities.faq.q4.answer',
              'Yes. Every ballot is anonymous and end-to-end verifiable, so even the most sensitive rectorate election is beyond reasonable dispute.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.universities.cta.title', 'Bring every campus election onto one platform')}
        description={t(
          'solutions.universities.cta.description',
          'Start a free vote today, or book a call and we will map your electoral colleges.'
        )}
        primaryCta={{
          label: t('solutions.universities.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.universities.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.universities.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.universities.related.delegate', 'Delegate elections'),
            href: '/use-cases/delegate-elections',
            description: t(
              'solutions.universities.related.delegate_desc',
              'Elect representatives by constituency at scale.'
            ),
          },
          {
            label: t('solutions.universities.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.universities.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.universities.related.security', 'Security'),
            href: '/security',
            description: t('solutions.universities.related.security_desc', 'Architecture, audits and verifiability.'),
          },
          {
            label: t('solutions.universities.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t('solutions.universities.related.case_studies_desc', 'See how institutions run elections.'),
          },
        ]}
      />
    </>
  )
}
