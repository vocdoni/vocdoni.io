import { BadgeCheck, Landmark, MessageSquare, Wallet } from 'lucide-react'
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

export default function SolutionsPublicAdministrationPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.public_administration.hero.eyebrow', 'Public administration')}
        title={t(
          'solutions.public_administration.hero.title',
          'Online voting for public administration and citizen participation'
        )}
        subtitle={t(
          'solutions.public_administration.hero.subtitle',
          'Run participatory budgeting and citizen consultations with cryptographic proof. Trusted by the city councils of Bellpuig and La Bisbal d Empordà.'
        )}
        primaryCta={{
          label: t('solutions.public_administration.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.public_administration.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.public_administration.hero.bullet_1', 'Participatory budgeting and citizen consultations'),
          t('solutions.public_administration.hero.bullet_2', 'Cryptographic proof for every decision'),
          t('solutions.public_administration.hero.bullet_3', 'GDPR compliant and hosted in the EU'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.public_administration.benefits.eyebrow', 'Built for public institutions')}
        title={t('solutions.public_administration.benefits.title', 'Participation citizens can trust')}
        columns={4}
        features={[
          {
            icon: Wallet,
            title: t('solutions.public_administration.benefits.budgeting.title', 'Participatory budgeting'),
            description: t(
              'solutions.public_administration.benefits.budgeting.description',
              'Let residents decide how public money is spent, with results they can verify.'
            ),
          },
          {
            icon: MessageSquare,
            title: t('solutions.public_administration.benefits.consultations.title', 'Citizen consultations'),
            description: t(
              'solutions.public_administration.benefits.consultations.description',
              'Run local consultations and referendums that produce defensible outcomes.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.public_administration.benefits.proof.title', 'Cryptographic proof'),
            description: t(
              'solutions.public_administration.benefits.proof.description',
              'Every result is backed by proof anyone can verify, with no need to trust officials.'
            ),
          },
          {
            icon: Landmark,
            title: t('solutions.public_administration.benefits.compliant.title', 'Public-sector ready'),
            description: t(
              'solutions.public_administration.benefits.compliant.description',
              'GDPR compliant, EU hosted and aligned with eIDAS, ENS and LSSI.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.public_administration.steps.eyebrow', 'How it works')}
        title={t('solutions.public_administration.steps.title', 'Run a citizen process in four steps')}
        steps={[
          {
            title: t('solutions.public_administration.steps.step_1.title', 'Define eligibility'),
            description: t(
              'solutions.public_administration.steps.step_1.description',
              'Set who can take part, from registered residents to specific districts.'
            ),
          },
          {
            title: t('solutions.public_administration.steps.step_2.title', 'Design the process'),
            description: t(
              'solutions.public_administration.steps.step_2.description',
              'Configure participatory budgeting, a consultation or a local referendum.'
            ),
          },
          {
            title: t('solutions.public_administration.steps.step_3.title', 'Open participation'),
            description: t(
              'solutions.public_administration.steps.step_3.description',
              'Residents take part securely from any device across the participation window.'
            ),
          },
          {
            title: t('solutions.public_administration.steps.step_4.title', 'Publish with proof'),
            description: t(
              'solutions.public_administration.steps.step_4.description',
              'Share results backed by cryptographic proof that any citizen can verify.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.public_administration.prose.eyebrow', 'Public trust')}
        title={t('solutions.public_administration.prose.title', 'Citizen participation only works if people trust it')}
        intro={t(
          'solutions.public_administration.prose.intro',
          'Participatory budgeting and consultations build legitimacy only when residents believe the result is genuine. Opaque tools undermine the very participation they invite.'
        )}
        blocks={[
          {
            heading: t('solutions.public_administration.prose.block_1.heading', 'The trust gap'),
            bullets: [
              t('solutions.public_administration.prose.block_1.bullet_1', 'Residents doubt results they cannot verify'),
              t(
                'solutions.public_administration.prose.block_1.bullet_2',
                'Low participation when the process feels remote or unclear'
              ),
              t(
                'solutions.public_administration.prose.block_1.bullet_3',
                'Strict data protection duties for public bodies'
              ),
            ],
          },
          {
            heading: t('solutions.public_administration.prose.block_2.heading', 'How Vocdoni helps'),
            bullets: [
              t(
                'solutions.public_administration.prose.block_2.bullet_1',
                'Cryptographic proof lets any citizen verify the outcome'
              ),
              t(
                'solutions.public_administration.prose.block_2.bullet_2',
                'Easy remote access raises participation across the territory'
              ),
              t(
                'solutions.public_administration.prose.block_2.bullet_3',
                'GDPR compliant, EU-hosted infrastructure for public bodies'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.public_administration.faq.eyebrow', 'FAQ')}
        title={t('solutions.public_administration.faq.title', 'Questions from participation directors')}
        items={[
          {
            question: t(
              'solutions.public_administration.faq.q1.question',
              'Can we run participatory budgeting with Vocdoni?'
            ),
            answer: t(
              'solutions.public_administration.faq.q1.answer',
              'Yes. Residents can propose and choose how public funds are spent, and the results come with cryptographic proof anyone can verify.'
            ),
          },
          {
            question: t(
              'solutions.public_administration.faq.q2.question',
              'How do citizens know the result is genuine?'
            ),
            answer: t(
              'solutions.public_administration.faq.q2.answer',
              'Every process is end-to-end verifiable. Citizens can check that the published result matches the votes cast, without trusting the administration.'
            ),
          },
          {
            question: t(
              'solutions.public_administration.faq.q3.question',
              'Is it compliant with public-sector requirements?'
            ),
            answer: t(
              'solutions.public_administration.faq.q3.answer',
              'It is. Vocdoni is GDPR compliant, hosted in the EU and aligned with eIDAS, ENS and LSSI, which is why city councils already rely on it.'
            ),
          },
          {
            question: t(
              'solutions.public_administration.faq.q4.question',
              'Which administrations already use Vocdoni?'
            ),
            answer: t(
              'solutions.public_administration.faq.q4.answer',
              'The city councils of Bellpuig and La Bisbal d Empordà use Vocdoni for citizen participation, among other public and civic organizations.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.public_administration.cta.title', 'Give citizens a process they can trust')}
        description={t(
          'solutions.public_administration.cta.description',
          'Start a free process today, or book a call and we will design your participation initiative.'
        )}
        primaryCta={{
          label: t('solutions.public_administration.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.public_administration.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.public_administration.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.public_administration.related.budgeting', 'Participatory budgeting'),
            href: '/use-cases/participatory-budgeting',
            description: t(
              'solutions.public_administration.related.budgeting_desc',
              'How residents decide public spending with Vocdoni.'
            ),
          },
          {
            label: t('solutions.public_administration.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.public_administration.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.public_administration.related.security', 'Security'),
            href: '/security',
            description: t(
              'solutions.public_administration.related.security_desc',
              'Architecture, audits and verifiability.'
            ),
          },
          {
            label: t('solutions.public_administration.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t(
              'solutions.public_administration.related.case_studies_desc',
              'See how city councils use Vocdoni.'
            ),
          },
        ]}
      />
    </>
  )
}
