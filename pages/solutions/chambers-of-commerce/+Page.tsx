import { Building2, FileCheck, Scale, Sparkles } from 'lucide-react'
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

export default function SolutionsChambersOfCommercePage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.chambers_of_commerce.hero.eyebrow', 'Chambers of commerce')}
        title={t(
          'solutions.chambers_of_commerce.hero.title',
          'Online voting for chambers of commerce, with eIDAS-grade evidence'
        )}
        subtitle={t(
          'solutions.chambers_of_commerce.hero.subtitle',
          'Run plenary and committee elections with weighted voting, an institutional image, and evidence that stands up to any challenge.'
        )}
        primaryCta={{
          label: t('solutions.chambers_of_commerce.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.chambers_of_commerce.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.chambers_of_commerce.hero.bullet_1', 'Weighted voting by sector and category'),
          t('solutions.chambers_of_commerce.hero.bullet_2', 'eIDAS-grade evidence for every ballot'),
          t('solutions.chambers_of_commerce.hero.bullet_3', 'A branded, institutional voting experience'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.chambers_of_commerce.benefits.eyebrow', 'Built for institutional governance')}
        title={t('solutions.chambers_of_commerce.benefits.title', 'Elections worthy of your institution')}
        columns={4}
        features={[
          {
            icon: Scale,
            title: t('solutions.chambers_of_commerce.benefits.weighted.title', 'Weighted voting'),
            description: t(
              'solutions.chambers_of_commerce.benefits.weighted.description',
              'Assign vote weight by sector, category or contribution, exactly as your rules require.'
            ),
          },
          {
            icon: FileCheck,
            title: t('solutions.chambers_of_commerce.benefits.evidence.title', 'eIDAS-grade evidence'),
            description: t(
              'solutions.chambers_of_commerce.benefits.evidence.description',
              'Every ballot carries verifiable, legally robust evidence of how it was cast.'
            ),
          },
          {
            icon: Sparkles,
            title: t('solutions.chambers_of_commerce.benefits.image.title', 'Institutional image'),
            description: t(
              'solutions.chambers_of_commerce.benefits.image.description',
              'A branded voting portal that reflects the standing of your chamber.'
            ),
          },
          {
            icon: Building2,
            title: t('solutions.chambers_of_commerce.benefits.governance.title', 'Plenary and committees'),
            description: t(
              'solutions.chambers_of_commerce.benefits.governance.description',
              'Run plenary, committee and board elections on one secure platform.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.chambers_of_commerce.steps.eyebrow', 'How it works')}
        title={t('solutions.chambers_of_commerce.steps.title', 'From electoral census to certified plenary')}
        steps={[
          {
            title: t('solutions.chambers_of_commerce.steps.step_1.title', 'Define the electoral census'),
            description: t(
              'solutions.chambers_of_commerce.steps.step_1.description',
              'Import members and set categories, sectors and the weight each vote carries.'
            ),
          },
          {
            title: t('solutions.chambers_of_commerce.steps.step_2.title', 'Brand the experience'),
            description: t(
              'solutions.chambers_of_commerce.steps.step_2.description',
              'Apply your chamber identity to a portal that members instantly recognise.'
            ),
          },
          {
            title: t('solutions.chambers_of_commerce.steps.step_3.title', 'Open the vote'),
            description: t(
              'solutions.chambers_of_commerce.steps.step_3.description',
              'Members vote remotely or in person, with weighted ballots counted automatically.'
            ),
          },
          {
            title: t('solutions.chambers_of_commerce.steps.step_4.title', 'Certify with evidence'),
            description: t(
              'solutions.chambers_of_commerce.steps.step_4.description',
              'Publish verifiable results backed by eIDAS-grade evidence and a final report.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.chambers_of_commerce.prose.eyebrow', 'Evidence and standing')}
        title={t('solutions.chambers_of_commerce.prose.title', 'Your elections carry institutional weight')}
        intro={t(
          'solutions.chambers_of_commerce.prose.intro',
          'Chambers of commerce sit between business and public administration, so their elections must be impeccable in both process and presentation.'
        )}
        blocks={[
          {
            heading: t('solutions.chambers_of_commerce.prose.block_1.heading', 'What a chamber election demands'),
            bullets: [
              t(
                'solutions.chambers_of_commerce.prose.block_1.bullet_1',
                'Weighted votes that reflect categories and sectors'
              ),
              t(
                'solutions.chambers_of_commerce.prose.block_1.bullet_2',
                'Evidence robust enough for legal and institutional review'
              ),
              t(
                'solutions.chambers_of_commerce.prose.block_1.bullet_3',
                'A presentation that matches the chamber image'
              ),
            ],
          },
          {
            heading: t('solutions.chambers_of_commerce.prose.block_2.heading', 'How Vocdoni delivers'),
            bullets: [
              t(
                'solutions.chambers_of_commerce.prose.block_2.bullet_1',
                'Native weighted voting configured to your electoral rules'
              ),
              t(
                'solutions.chambers_of_commerce.prose.block_2.bullet_2',
                'eIDAS-grade, end-to-end verifiable evidence for each ballot'
              ),
              t(
                'solutions.chambers_of_commerce.prose.block_2.bullet_3',
                'A branded portal that upholds your institutional standing'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.chambers_of_commerce.faq.eyebrow', 'FAQ')}
        title={t('solutions.chambers_of_commerce.faq.title', 'Questions from secretaries general')}
        items={[
          {
            question: t(
              'solutions.chambers_of_commerce.faq.q1.question',
              'Can votes be weighted by category or sector?'
            ),
            answer: t(
              'solutions.chambers_of_commerce.faq.q1.answer',
              'Yes. Vocdoni supports weighted voting, so you can assign each member or category the exact vote weight your electoral rules define.'
            ),
          },
          {
            question: t(
              'solutions.chambers_of_commerce.faq.q2.question',
              'What kind of evidence does each ballot carry?'
            ),
            answer: t(
              'solutions.chambers_of_commerce.faq.q2.answer',
              'Every ballot is end-to-end verifiable and backed by eIDAS-grade evidence, giving you a legally robust record for institutional and legal review.'
            ),
          },
          {
            question: t('solutions.chambers_of_commerce.faq.q3.question', 'Can we brand the voting portal?'),
            answer: t(
              'solutions.chambers_of_commerce.faq.q3.answer',
              'Yes. The portal can carry your chamber identity, so members vote in an environment that reflects the standing of your institution.'
            ),
          },
          {
            question: t('solutions.chambers_of_commerce.faq.q4.question', 'Can members vote remotely and in person?'),
            answer: t(
              'solutions.chambers_of_commerce.faq.q4.answer',
              'They can. Vocdoni runs hybrid elections, combining remote and in-person weighted ballots in a single, verifiable tally.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.chambers_of_commerce.cta.title', 'Run a chamber election worthy of your institution')}
        description={t(
          'solutions.chambers_of_commerce.cta.description',
          'Start a free vote today, or book a call and we will design your weighted election.'
        )}
        primaryCta={{
          label: t('solutions.chambers_of_commerce.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.chambers_of_commerce.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.chambers_of_commerce.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.chambers_of_commerce.related.agm', 'AGM and plenary voting'),
            href: '/use-cases/agm-voting',
            description: t(
              'solutions.chambers_of_commerce.related.agm_desc',
              'How weighted assemblies work with Vocdoni.'
            ),
          },
          {
            label: t('solutions.chambers_of_commerce.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.chambers_of_commerce.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.chambers_of_commerce.related.security', 'Security'),
            href: '/security',
            description: t(
              'solutions.chambers_of_commerce.related.security_desc',
              'Architecture, audits and verifiability.'
            ),
          },
          {
            label: t('solutions.chambers_of_commerce.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t(
              'solutions.chambers_of_commerce.related.case_studies_desc',
              'See how institutions run their elections.'
            ),
          },
        ]}
      />
    </>
  )
}
