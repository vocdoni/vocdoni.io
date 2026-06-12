import { BadgeCheck, FileCheck, Scale, ShieldCheck } from 'lucide-react'
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

export default function SolutionsProfessionalCollegesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.professional_colleges.hero.eyebrow', 'Professional colleges')}
        title={t(
          'solutions.professional_colleges.hero.title',
          'Online voting for professional associations, with total legal cover'
        )}
        subtitle={t(
          'solutions.professional_colleges.hero.subtitle',
          'Run statutory elections and your junta general with zero challenges and the operational load off your team. Trusted by colleges like ICOES and COIB.'
        )}
        primaryCta={{
          label: t('solutions.professional_colleges.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.professional_colleges.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.professional_colleges.hero.bullet_1', 'Voto telemático with full legal validity'),
          t('solutions.professional_colleges.hero.bullet_2', 'No disputes, no impugnaciones, no recounts'),
          t('solutions.professional_colleges.hero.bullet_3', 'We run the vote so your secretariat does not have to'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.professional_colleges.benefits.eyebrow', 'Built for colegios profesionales')}
        title={t('solutions.professional_colleges.benefits.title', 'Statutory votes the board can defend')}
        columns={4}
        features={[
          {
            icon: Scale,
            title: t('solutions.professional_colleges.benefits.legal.title', 'Total legal cover'),
            description: t(
              'solutions.professional_colleges.benefits.legal.description',
              'Process and evidence aligned with your statutes and eIDAS, ENS and LSSI.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('solutions.professional_colleges.benefits.privacy.title', 'Secret ballot guaranteed'),
            description: t(
              'solutions.professional_colleges.benefits.privacy.description',
              'Zero-knowledge cryptography keeps each colegiado vote anonymous.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.professional_colleges.benefits.disputes.title', 'Zero challenges'),
            description: t(
              'solutions.professional_colleges.benefits.disputes.description',
              'Verifiable results remove the grounds for impugnaciones after the vote.'
            ),
          },
          {
            icon: FileCheck,
            title: t('solutions.professional_colleges.benefits.load.title', 'Load off your team'),
            description: t(
              'solutions.professional_colleges.benefits.load.description',
              'We prepare the census, rehearse, and support the secretariat on voting day.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.professional_colleges.steps.eyebrow', 'How it works')}
        title={t('solutions.professional_colleges.steps.title', 'From convocatoria to certified result')}
        steps={[
          {
            title: t('solutions.professional_colleges.steps.step_1.title', 'Prepare the census'),
            description: t(
              'solutions.professional_colleges.steps.step_1.description',
              'Import your roll of colegiados and define eligibility and any weighted votes.'
            ),
          },
          {
            title: t('solutions.professional_colleges.steps.step_2.title', 'Rehearse the election'),
            description: t(
              'solutions.professional_colleges.steps.step_2.description',
              'Run a dry run with our team so the junta directiva sees exactly how voting day will go.'
            ),
          },
          {
            title: t('solutions.professional_colleges.steps.step_3.title', 'Open the vote'),
            description: t(
              'solutions.professional_colleges.steps.step_3.description',
              'Colegiados vote remotely or in person at the junta general, all on one secure system.'
            ),
          },
          {
            title: t('solutions.professional_colleges.steps.step_4.title', 'Certify the result'),
            description: t(
              'solutions.professional_colleges.steps.step_4.description',
              'Get instant, verifiable results and a post-vote report for your records.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.professional_colleges.prose.eyebrow', 'Legal validity')}
        title={t('solutions.professional_colleges.prose.title', 'Elections your statutes and your members can trust')}
        intro={t(
          'solutions.professional_colleges.prose.intro',
          'Professional colleges operate under strict statutes, and a contested election can paralyse the institution for months. Vocdoni is designed to remove that risk.'
        )}
        blocks={[
          {
            heading: t('solutions.professional_colleges.prose.block_1.heading', 'Where colleges get stuck'),
            bullets: [
              t(
                'solutions.professional_colleges.prose.block_1.bullet_1',
                'Postal voting is slow, costly and hard to audit'
              ),
              t(
                'solutions.professional_colleges.prose.block_1.bullet_2',
                'A losing candidate can challenge an unverifiable count'
              ),
              t(
                'solutions.professional_colleges.prose.block_1.bullet_3',
                'Low turnout puts the validity of the junta general at risk'
              ),
            ],
          },
          {
            heading: t('solutions.professional_colleges.prose.block_2.heading', 'How Vocdoni closes the gap'),
            bullets: [
              t(
                'solutions.professional_colleges.prose.block_2.bullet_1',
                'End-to-end verifiable ballots leave no room for dispute'
              ),
              t(
                'solutions.professional_colleges.prose.block_2.bullet_2',
                'Anonymous voting protects the secret ballot your statutes require'
              ),
              t(
                'solutions.professional_colleges.prose.block_2.bullet_3',
                'Higher participation secures quorum without endless reminders'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.professional_colleges.faq.eyebrow', 'FAQ')}
        title={t('solutions.professional_colleges.faq.title', 'Questions from secretarías generales')}
        items={[
          {
            question: t(
              'solutions.professional_colleges.faq.q1.question',
              'Is voto telemático legally valid for our junta general?'
            ),
            answer: t(
              'solutions.professional_colleges.faq.q1.answer',
              'Yes. Vocdoni provides anonymous, end-to-end verifiable ballots with eIDAS, ENS and LSSI grade evidence, designed to satisfy the statutes that govern professional colleges.'
            ),
          },
          {
            question: t(
              'solutions.professional_colleges.faq.q2.question',
              'Can a candidate challenge the result afterwards?'
            ),
            answer: t(
              'solutions.professional_colleges.faq.q2.answer',
              'Every ballot is verifiable, so anyone can confirm the count matches the votes cast. This removes the technical grounds that usually lead to impugnaciones.'
            ),
          },
          {
            question: t(
              'solutions.professional_colleges.faq.q3.question',
              'Can members vote both remotely and at the assembly?'
            ),
            answer: t(
              'solutions.professional_colleges.faq.q3.answer',
              'Yes. Vocdoni supports hybrid voting, so colegiados can vote remotely beforehand or in person during the junta general, all counted on one secure system.'
            ),
          },
          {
            question: t('solutions.professional_colleges.faq.q4.question', 'How much work falls on our secretariat?'),
            answer: t(
              'solutions.professional_colleges.faq.q4.answer',
              'Very little. Our team prepares the census, rehearses the process with you, supports you on voting day and delivers a final report for your records.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.professional_colleges.cta.title', 'Run your statutory election without disputes')}
        description={t(
          'solutions.professional_colleges.cta.description',
          'Start a free vote today, or book a call and we will map your junta general end to end.'
        )}
        primaryCta={{
          label: t('solutions.professional_colleges.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.professional_colleges.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.professional_colleges.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.professional_colleges.related.agm', 'AGM and junta general voting'),
            href: '/use-cases/agm-voting',
            description: t(
              'solutions.professional_colleges.related.agm_desc',
              'How hybrid assemblies work with Vocdoni.'
            ),
          },
          {
            label: t('solutions.professional_colleges.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.professional_colleges.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.professional_colleges.related.security', 'Security'),
            href: '/security',
            description: t(
              'solutions.professional_colleges.related.security_desc',
              'Architecture, audits and verifiability.'
            ),
          },
          {
            label: t('solutions.professional_colleges.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t(
              'solutions.professional_colleges.related.case_studies_desc',
              'See how colleges run their elections.'
            ),
          },
        ]}
      />
    </>
  )
}
