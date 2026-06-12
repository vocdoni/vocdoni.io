import { BadgeCheck, CheckCircle2, Clock, FileText, Scale, Users } from 'lucide-react'
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

export default function UseCasesBylawsAmendmentsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('use_case_procedures.bylaws_amendments.hero.eyebrow', 'Bylaws amendments')}
        title={t(
          'use_case_procedures.bylaws_amendments.hero.title',
          'How to amend your bylaws online with verifiable results'
        )}
        subtitle={t(
          'use_case_procedures.bylaws_amendments.hero.subtitle',
          'Put statute changes to your members online, enforce the qualified majority each one needs, and keep a verifiable record for the registry.'
        )}
        primaryCta={{
          label: t('use_case_procedures.bylaws_amendments.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.bylaws_amendments.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('use_case_procedures.bylaws_amendments.hero.bullet_1', 'Qualified and two-thirds majorities'),
          t('use_case_procedures.bylaws_amendments.hero.bullet_2', 'Quorum tracked in real time'),
          t('use_case_procedures.bylaws_amendments.hero.bullet_3', 'A verifiable record for filings'),
        ]}
      />

      <ProseSection
        eyebrow={t('use_case_procedures.bylaws_amendments.intro.eyebrow', 'What this is')}
        title={t('use_case_procedures.bylaws_amendments.intro.title', 'Amending bylaws online')}
        intro={t(
          'use_case_procedures.bylaws_amendments.intro.intro',
          'Changing your bylaws or statutes usually requires a quorum and a reinforced majority. Running the vote online lets every member take part while the system enforces the exact thresholds your rules demand.'
        )}
        blocks={[
          {
            heading: t('use_case_procedures.bylaws_amendments.intro.block_1.heading', 'Why amend online'),
            paragraphs: [
              t(
                'use_case_procedures.bylaws_amendments.intro.block_1.p1',
                'Statutory votes are exactly where a disputed count is most damaging. Online voting tracks quorum live, applies the correct majority automatically, and produces proof that the amendment passed cleanly.'
              ),
            ],
          },
          {
            heading: t('use_case_procedures.bylaws_amendments.intro.block_2.heading', 'Trust built in'),
            bullets: [
              t('use_case_procedures.bylaws_amendments.intro.block_2.bullet_1', 'Anonymous ballots via zk-SNARK'),
              t(
                'use_case_procedures.bylaws_amendments.intro.block_2.bullet_2',
                'End-to-end verifiable, registry-ready proof'
              ),
              t(
                'use_case_procedures.bylaws_amendments.intro.block_2.bullet_3',
                'Open source, EU-hosted and GDPR compliant'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('use_case_procedures.bylaws_amendments.steps.eyebrow', 'Step by step')}
        title={t('use_case_procedures.bylaws_amendments.steps.title', 'How to amend your bylaws with Vocdoni')}
        steps={[
          {
            title: t('use_case_procedures.bylaws_amendments.steps.step_1.title', 'Build the member census'),
            description: t(
              'use_case_procedures.bylaws_amendments.steps.step_1.description',
              'Upload the members eligible to vote on statutory changes, each with a single-use credential.'
            ),
          },
          {
            title: t('use_case_procedures.bylaws_amendments.steps.step_2.title', 'Set up each amendment'),
            description: t(
              'use_case_procedures.bylaws_amendments.steps.step_2.description',
              'Add each proposed change as a motion and assign the quorum and qualified majority it requires.'
            ),
          },
          {
            title: t('use_case_procedures.bylaws_amendments.steps.step_3.title', 'Open voting and watch quorum'),
            description: t(
              'use_case_procedures.bylaws_amendments.steps.step_3.description',
              'Members vote from any device while you track quorum live to confirm the vote is valid.'
            ),
          },
          {
            title: t('use_case_procedures.bylaws_amendments.steps.step_4.title', 'Verify the outcome'),
            description: t(
              'use_case_procedures.bylaws_amendments.steps.step_4.description',
              'The system applies the required majority and the result is end-to-end verifiable by any member.'
            ),
          },
          {
            title: t('use_case_procedures.bylaws_amendments.steps.step_5.title', 'Publish and file'),
            description: t(
              'use_case_procedures.bylaws_amendments.steps.step_5.description',
              'Export a verifiable record of each amendment for your minutes and registry filings.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('use_case_procedures.bylaws_amendments.features.eyebrow', 'Built for statute changes')}
        title={t('use_case_procedures.bylaws_amendments.features.title', 'What a statutory vote needs')}
        columns={3}
        features={[
          {
            icon: Scale,
            title: t('use_case_procedures.bylaws_amendments.features.majorities.title', 'Qualified majorities'),
            description: t(
              'use_case_procedures.bylaws_amendments.features.majorities.description',
              'Set two-thirds or other reinforced thresholds per amendment, applied automatically.'
            ),
          },
          {
            icon: Users,
            title: t('use_case_procedures.bylaws_amendments.features.quorum.title', 'Live quorum'),
            description: t(
              'use_case_procedures.bylaws_amendments.features.quorum.description',
              'Track participation in real time so you know the vote meets your statutes.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('use_case_procedures.bylaws_amendments.features.verifiable.title', 'Verifiable outcomes'),
            description: t(
              'use_case_procedures.bylaws_amendments.features.verifiable.description',
              'Every member can prove the amendment passed exactly as published.'
            ),
          },
          {
            icon: FileText,
            title: t('use_case_procedures.bylaws_amendments.features.record.title', 'Registry-ready record'),
            description: t(
              'use_case_procedures.bylaws_amendments.features.record.description',
              'Export a clean, auditable record for your minutes and filings.'
            ),
          },
          {
            icon: Clock,
            title: t('use_case_procedures.bylaws_amendments.features.results.title', 'Instant results'),
            description: t(
              'use_case_procedures.bylaws_amendments.features.results.description',
              'Outcomes are ready the moment voting closes, with no manual count.'
            ),
          },
          {
            icon: CheckCircle2,
            title: t('use_case_procedures.bylaws_amendments.features.hybrid.title', 'Hybrid friendly'),
            description: t(
              'use_case_procedures.bylaws_amendments.features.hybrid.description',
              'Combine in-person and remote members in a single, consistent count.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('use_case_procedures.bylaws_amendments.faq.eyebrow', 'Amendment questions')}
        title={t('use_case_procedures.bylaws_amendments.faq.title', 'Common questions about amending bylaws online')}
        items={[
          {
            question: t(
              'use_case_procedures.bylaws_amendments.faq.q1.question',
              'Can it enforce a two-thirds majority?'
            ),
            answer: t(
              'use_case_procedures.bylaws_amendments.faq.q1.answer',
              'Yes. You set the exact majority each amendment needs, and Vocdoni applies it automatically when it computes the result.'
            ),
          },
          {
            question: t('use_case_procedures.bylaws_amendments.faq.q2.question', 'How do we prove quorum was reached?'),
            answer: t(
              'use_case_procedures.bylaws_amendments.faq.q2.answer',
              'Participation is tracked live against your census and recorded in the verifiable result, so quorum is documented in the audit trail.'
            ),
          },
          {
            question: t(
              'use_case_procedures.bylaws_amendments.faq.q3.question',
              'Is the record valid for the registry?'
            ),
            answer: t(
              'use_case_procedures.bylaws_amendments.faq.q3.answer',
              'You can export an end-to-end verifiable record of each amendment, suitable to attach to your minutes and registry filings.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('use_case_procedures.bylaws_amendments.cta.title', 'Ready to amend your bylaws online?')}
        description={t(
          'use_case_procedures.bylaws_amendments.cta.description',
          'Start free today, or talk to our team about your statutes and majorities.'
        )}
        primaryCta={{
          label: t('use_case_procedures.bylaws_amendments.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('use_case_procedures.bylaws_amendments.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('use_case_procedures.bylaws_amendments.related.title', 'Keep exploring')}
        links={[
          {
            label: t('use_case_procedures.bylaws_amendments.related.link_1', 'Voting for associations and federations'),
            href: '/solutions/associations-federations',
            description: t(
              'use_case_procedures.bylaws_amendments.related.link_1_desc',
              'Tailored online voting for member organizations.'
            ),
          },
          {
            label: t('use_case_procedures.bylaws_amendments.related.link_2', 'Voting for cooperatives'),
            href: '/solutions/cooperatives',
            description: t(
              'use_case_procedures.bylaws_amendments.related.link_2_desc',
              'Hybrid assemblies with weighted voting.'
            ),
          },
          {
            label: t('use_case_procedures.bylaws_amendments.related.link_3', 'All voting use cases'),
            href: '/use-cases',
            description: t(
              'use_case_procedures.bylaws_amendments.related.link_3_desc',
              'Browse every procedure we support.'
            ),
          },
          {
            label: t('use_case_procedures.bylaws_amendments.related.link_4', 'How to run an online AGM'),
            href: '/use-cases/agm-voting',
            description: t(
              'use_case_procedures.bylaws_amendments.related.link_4_desc',
              'Hold your annual general meeting online.'
            ),
          },
        ]}
      />
    </>
  )
}
