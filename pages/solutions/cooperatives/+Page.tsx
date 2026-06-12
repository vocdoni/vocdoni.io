import { BadgeCheck, Scale, Users, Vote } from 'lucide-react'
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

export default function SolutionsCooperativesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.cooperatives.hero.eyebrow', 'Cooperatives')}
        title={t('solutions.cooperatives.hero.title', 'Online voting for cooperatives, with full legal validity')}
        subtitle={t(
          'solutions.cooperatives.hero.subtitle',
          'Run your hybrid asamblea general with weighted voting (vot ponderat) and complete validity under cooperative law. Decisions your consell rector can defend.'
        )}
        primaryCta={{
          label: t('solutions.cooperatives.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.cooperatives.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.cooperatives.hero.bullet_1', 'Hybrid assembly with in-person and remote votes'),
          t('solutions.cooperatives.hero.bullet_2', 'Weighted voting (vot ponderat) built in'),
          t('solutions.cooperatives.hero.bullet_3', 'Full legal validity under cooperative law'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.cooperatives.benefits.eyebrow', 'Built for cooperative governance')}
        title={t('solutions.cooperatives.benefits.title', 'Assemblies that respect every member')}
        columns={4}
        features={[
          {
            icon: Scale,
            title: t('solutions.cooperatives.benefits.weighted.title', 'Weighted voting'),
            description: t(
              'solutions.cooperatives.benefits.weighted.description',
              'Vot ponderat by capital, activity or seniority, exactly as your statutes define.'
            ),
          },
          {
            icon: Vote,
            title: t('solutions.cooperatives.benefits.hybrid.title', 'Hybrid assembly'),
            description: t(
              'solutions.cooperatives.benefits.hybrid.description',
              'Members vote in the room or remotely, all counted on one secure system.'
            ),
          },
          {
            icon: Scale,
            title: t('solutions.cooperatives.benefits.legal.title', 'Legal validity'),
            description: t(
              'solutions.cooperatives.benefits.legal.description',
              'Process and evidence aligned with cooperative law and your statutes.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.cooperatives.benefits.verifiable.title', 'Verifiable results'),
            description: t(
              'solutions.cooperatives.benefits.verifiable.description',
              'Any member can confirm the outcome while their own ballot stays secret.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.cooperatives.steps.eyebrow', 'How it works')}
        title={t('solutions.cooperatives.steps.title', 'Run your asamblea general in four steps')}
        steps={[
          {
            title: t('solutions.cooperatives.steps.step_1.title', 'Set up the census'),
            description: t(
              'solutions.cooperatives.steps.step_1.description',
              'Import members and assign vote weight for vot ponderat where it applies.'
            ),
          },
          {
            title: t('solutions.cooperatives.steps.step_2.title', 'Prepare the agenda'),
            description: t(
              'solutions.cooperatives.steps.step_2.description',
              'Add the motions and elections on your asamblea agenda with the rules each one needs.'
            ),
          },
          {
            title: t('solutions.cooperatives.steps.step_3.title', 'Run the hybrid assembly'),
            description: t(
              'solutions.cooperatives.steps.step_3.description',
              'Members vote in person or remotely, with weighted ballots tallied automatically.'
            ),
          },
          {
            title: t('solutions.cooperatives.steps.step_4.title', 'Approve and record'),
            description: t(
              'solutions.cooperatives.steps.step_4.description',
              'Publish verifiable results and keep a legally valid record for the consell rector.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.cooperatives.prose.eyebrow', 'Cooperative law')}
        title={t('solutions.cooperatives.prose.title', 'Weighted votes and legal validity in one assembly')}
        intro={t(
          'solutions.cooperatives.prose.intro',
          'Cooperatives need assemblies that honour every member while respecting weighted voting and the formalities of cooperative law. Doing that on paper is slow and error prone.'
        )}
        blocks={[
          {
            heading: t('solutions.cooperatives.prose.block_1.heading', 'The cooperative challenge'),
            bullets: [
              t(
                'solutions.cooperatives.prose.block_1.bullet_1',
                'Vot ponderat is hard to calculate and verify by hand'
              ),
              t('solutions.cooperatives.prose.block_1.bullet_2', 'Members who cannot attend in person are left out'),
              t(
                'solutions.cooperatives.prose.block_1.bullet_3',
                'Assemblies must meet strict legal formalities to be valid'
              ),
            ],
          },
          {
            heading: t('solutions.cooperatives.prose.block_2.heading', 'How Vocdoni helps'),
            bullets: [
              t(
                'solutions.cooperatives.prose.block_2.bullet_1',
                'Weighted voting is applied and verified automatically'
              ),
              t(
                'solutions.cooperatives.prose.block_2.bullet_2',
                'Hybrid voting brings remote members into the same assembly'
              ),
              t(
                'solutions.cooperatives.prose.block_2.bullet_3',
                'Process and evidence give the assembly full legal validity'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.cooperatives.faq.eyebrow', 'FAQ')}
        title={t('solutions.cooperatives.faq.title', 'Questions from the consell rector')}
        items={[
          {
            question: t('solutions.cooperatives.faq.q1.question', 'Does Vocdoni support vot ponderat?'),
            answer: t(
              'solutions.cooperatives.faq.q1.answer',
              'Yes. You can assign weighted votes by capital, activity, seniority or any rule in your statutes, and the system applies and verifies the weighting automatically.'
            ),
          },
          {
            question: t('solutions.cooperatives.faq.q2.question', 'Is a hybrid asamblea general legally valid?'),
            answer: t(
              'solutions.cooperatives.faq.q2.answer',
              'It is. Vocdoni combines in-person and remote voting with verifiable evidence designed to meet the formalities of cooperative law and your statutes.'
            ),
          },
          {
            question: t('solutions.cooperatives.faq.q3.question', 'Can members who cannot attend still vote?'),
            answer: t(
              'solutions.cooperatives.faq.q3.answer',
              'Yes. Remote voting lets members take part from any device, so distance or scheduling no longer keeps them out of the assembly.'
            ),
          },
          {
            question: t('solutions.cooperatives.faq.q4.question', 'Can every member verify the result?'),
            answer: t(
              'solutions.cooperatives.faq.q4.answer',
              'They can. Results are end-to-end verifiable, so any member can confirm the count is correct while their own ballot remains anonymous.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.cooperatives.cta.title', 'Run a hybrid assembly with full legal validity')}
        description={t(
          'solutions.cooperatives.cta.description',
          'Start a free vote today, or book a call and we will set up your weighted assembly.'
        )}
        primaryCta={{
          label: t('solutions.cooperatives.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.cooperatives.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.cooperatives.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.cooperatives.related.agm', 'AGM and assembly voting'),
            href: '/use-cases/agm-voting',
            description: t('solutions.cooperatives.related.agm_desc', 'How hybrid assemblies work with Vocdoni.'),
          },
          {
            label: t('solutions.cooperatives.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.cooperatives.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.cooperatives.related.security', 'Security'),
            href: '/security',
            description: t('solutions.cooperatives.related.security_desc', 'Architecture, audits and verifiability.'),
          },
          {
            label: t('solutions.cooperatives.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t('solutions.cooperatives.related.case_studies_desc', 'See how members run assemblies.'),
          },
        ]}
      />
    </>
  )
}
