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

export default function UseCasesCitizenConsultationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.citizen_consultations.hero.eyebrow', 'Citizen consultations')}
        title={t(
          'use_case_procedures.citizen_consultations.hero.title',
          'How to run an online citizen consultation with verifiable results'
        )}
        subtitle={t(
          'use_case_procedures.citizen_consultations.hero.subtitle',
          'Ask residents what they think on any issue online, keep responses anonymous, and publish results the whole community can verify.'
        )}
        primaryCta={{
          label: t('use_case_procedures.citizen_consultations.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.citizen_consultations.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.citizen_consultations.hero.bullet_1', 'Open to every eligible resident'),
          t('use_case_procedures.citizen_consultations.hero.bullet_2', 'Anonymous, accessible responses'),
          t('use_case_procedures.citizen_consultations.hero.bullet_3', 'Transparent, verifiable outcomes'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.citizen_consultations.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.citizen_consultations.intro.title', 'Running citizen consultations online')}
        intro={t(
          'use_case_procedures.citizen_consultations.intro.intro',
          'A citizen consultation gathers the views of residents before a decision is made. Running it online reaches far more people than a public meeting, keeps responses anonymous, and produces results no one can quietly edit.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.citizen_consultations.intro.block_1.heading', 'Why consult online'),
            paragraphs: [
              t(
                'use_case_procedures.citizen_consultations.intro.block_1.p1',
                'Online consultations remove the time and travel barriers of in-person sessions, so a more representative group responds. Results are anonymous, transparent, and ready instantly.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.citizen_consultations.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.citizen_consultations.intro.block_2.bullet_1', 'Anonymous responses via zk-SNARK'),
              t(
                'use_case_procedures.citizen_consultations.intro.block_2.bullet_2',
                'End-to-end verifiable, public results'
              ),
              t(
                'use_case_procedures.citizen_consultations.intro.block_2.bullet_3',
                'Open source, EU-hosted and GDPR compliant'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.citizen_consultations.steps.eyebrow', 'Step by step')}
        title={t(
          'use_case_procedures.citizen_consultations.steps.title',
          'How to run a citizen consultation with Vocdoni'
        )}
        steps={[
          {
            title: t('use_case_procedures.citizen_consultations.steps.step_1.title', 'Define who can respond'),
            description: t(
              'use_case_procedures.citizen_consultations.steps.step_1.description',
              'Set up the census of eligible residents, by area or the whole municipality.'
            ),
          },
          {
            title: t('use_case_procedures.citizen_consultations.steps.step_2.title', 'Write the questions'),
            description: t(
              'use_case_procedures.citizen_consultations.steps.step_2.description',
              'Add your consultation questions as single or multiple choice, in clear, accessible language.'
            ),
          },
          {
            title: t('use_case_procedures.citizen_consultations.steps.step_3.title', 'Open the consultation'),
            description: t(
              'use_case_procedures.citizen_consultations.steps.step_3.description',
              'Residents respond anonymously from any device during the window you set.'
            ),
          },
          {
            title: t('use_case_procedures.citizen_consultations.steps.step_4.title', 'Verify the results'),
            description: t(
              'use_case_procedures.citizen_consultations.steps.step_4.description',
              'Responses are tallied automatically and the result is end-to-end verifiable by anyone.'
            ),
          },
          {
            title: t('use_case_procedures.citizen_consultations.steps.step_5.title', 'Publish the findings'),
            description: t(
              'use_case_procedures.citizen_consultations.steps.step_5.description',
              'Share the outcome with a transparent record that residents can audit themselves.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.citizen_consultations.features.eyebrow', 'Built for public consultation')}
        title={t('use_case_procedures.citizen_consultations.features.title', 'What a citizen consultation needs')}
        columns={3}
        features={[
          {
            icon: Users,
            title: t('use_case_procedures.citizen_consultations.features.reach.title', 'Wide reach'),
            description: t(
              'use_case_procedures.citizen_consultations.features.reach.description',
              'Open the consultation to every resident on any device.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('use_case_procedures.citizen_consultations.features.anonymous.title', 'Anonymous responses'),
            description: t(
              'use_case_procedures.citizen_consultations.features.anonymous.description',
              'Residents answer honestly, knowing their response stays private.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.citizen_consultations.features.verifiable.title', 'Verifiable results'),
            description: t(
              'use_case_procedures.citizen_consultations.features.verifiable.description',
              'Anyone can confirm the published findings from public proofs.'
            ),
          },
          {
            icon: ListChecks,
            title: t('use_case_procedures.citizen_consultations.features.questions.title', 'Flexible questions'),
            description: t(
              'use_case_procedures.citizen_consultations.features.questions.description',
              'Ask single or multiple choice questions in one consultation.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.citizen_consultations.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.citizen_consultations.features.results.description',
              'Findings are ready the moment the consultation closes.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.citizen_consultations.features.areas.title', 'By area'),
            description: t(
              'use_case_procedures.citizen_consultations.features.areas.description',
              'Run separate consultations per district when local input matters.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.citizen_consultations.faq.eyebrow', 'Consultation questions')}
        title={t('use_case_procedures.citizen_consultations.faq.title', 'Common questions about citizen consultations')}
        items={[
          {
            question: t(
              'use_case_procedures.citizen_consultations.faq.q1.question',
              'Is a consultation the same as a binding vote?'
            ),
            answer: t(
              'use_case_procedures.citizen_consultations.faq.q1.answer',
              'A consultation gathers opinion to inform a decision rather than to bind it, but it runs on the same secure, verifiable system as a formal vote.'
            ),
          },
          {
            question: t(
              'use_case_procedures.citizen_consultations.faq.q2.question',
              'How do you keep responses anonymous?'
            ),
            answer: t(
              'use_case_procedures.citizen_consultations.faq.q2.answer',
              'Vocdoni uses zk-SNARK technology so each response is anonymous while the aggregate result stays fully verifiable.'
            ),
          },
          {
            question: t(
              'use_case_procedures.citizen_consultations.faq.q3.question',
              'Can residents check the results are real?'
            ),
            answer: t(
              'use_case_procedures.citizen_consultations.faq.q3.answer',
              'Yes. The outcome is end-to-end verifiable and public, so anyone can confirm the findings reflect the responses given.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.citizen_consultations.cta.title', 'Ready to consult your residents online?')}
        description={t(
          'use_case_procedures.citizen_consultations.cta.description',
          'Start free today, or talk to our team about your consultation.'
        )}
        primaryCta={{
          label: t('use_case_procedures.citizen_consultations.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.citizen_consultations.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.citizen_consultations.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.citizen_consultations.related.link_1', 'Voting for public administration'),
            href: '/solutions/public-administration',
            description: t(
              'use_case_procedures.citizen_consultations.related.link_1_desc',
              'Trusted digital participation for the public sector.'
            ),
          },
          {
            label: t('use_case_procedures.citizen_consultations.related.link_2', 'All voting use cases'),
            href: '/use-cases',
            description: t(
              'use_case_procedures.citizen_consultations.related.link_2_desc',
              'Browse every procedure we support.'
            ),
          },
          {
            label: t('use_case_procedures.citizen_consultations.related.link_3', 'How to run a referendum online'),
            href: '/use-cases/referenda',
            description: t(
              'use_case_procedures.citizen_consultations.related.link_3_desc',
              'Run a binding yes or no vote.'
            ),
          },
        ]}
      />
    </>
  )
}
