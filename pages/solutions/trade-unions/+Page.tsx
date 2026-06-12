import { Banknote, ScrollText, ShieldCheck, Users } from 'lucide-react'
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

export default function SolutionsTradeUnionsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.trade_unions.hero.eyebrow', 'Trade unions')}
        title={t(
          'solutions.trade_unions.hero.title',
          'Online voting for trade unions: mass delegate elections, audited'
        )}
        subtitle={t(
          'solutions.trade_unions.hero.subtitle',
          'Run elecciones sindicales across every workplace with a full audit trail, and cut election-day cost by up to 80%. Voto sindical that members trust.'
        )}
        primaryCta={{
          label: t('solutions.trade_unions.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.trade_unions.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
        bullets={[
          t('solutions.trade_unions.hero.bullet_1', 'Mass delegate elections with a full audit trail'),
          t('solutions.trade_unions.hero.bullet_2', 'Cuts election-day cost by up to 80%'),
          t('solutions.trade_unions.hero.bullet_3', 'Secret, verifiable voto sindical from any workplace'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.trade_unions.benefits.eyebrow', 'Built for elecciones sindicales')}
        title={t('solutions.trade_unions.benefits.title', 'Delegate elections at union scale')}
        columns={4}
        features={[
          {
            icon: Users,
            title: t('solutions.trade_unions.benefits.scale.title', 'Mass elections'),
            description: t(
              'solutions.trade_unions.benefits.scale.description',
              'Elect delegates across thousands of members and many workplaces at once.'
            ),
          },
          {
            icon: Banknote,
            title: t('solutions.trade_unions.benefits.cost.title', 'Lower cost'),
            description: t(
              'solutions.trade_unions.benefits.cost.description',
              'Cut election-day cost by up to 80% by removing paper, ballots and logistics.'
            ),
          },
          {
            icon: ScrollText,
            title: t('solutions.trade_unions.benefits.audit.title', 'Full audit trail'),
            description: t(
              'solutions.trade_unions.benefits.audit.description',
              'Every step is recorded so results stand up to scrutiny from any side.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('solutions.trade_unions.benefits.secret.title', 'Secret ballot'),
            description: t(
              'solutions.trade_unions.benefits.secret.description',
              'Zero-knowledge voting protects members from any workplace pressure.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('solutions.trade_unions.steps.eyebrow', 'How it works')}
        title={t('solutions.trade_unions.steps.title', 'Run a union-wide election in four steps')}
        steps={[
          {
            title: t('solutions.trade_unions.steps.step_1.title', 'Build the census'),
            description: t(
              'solutions.trade_unions.steps.step_1.description',
              'Import members by workplace, sector or section to mirror your structure.'
            ),
          },
          {
            title: t('solutions.trade_unions.steps.step_2.title', 'Set up delegate seats'),
            description: t(
              'solutions.trade_unions.steps.step_2.description',
              'Configure delegate elections and weighted votes for each unit as needed.'
            ),
          },
          {
            title: t('solutions.trade_unions.steps.step_3.title', 'Open voting'),
            description: t(
              'solutions.trade_unions.steps.step_3.description',
              'Members vote securely from any device, removing the need for in-person ballots.'
            ),
          },
          {
            title: t('solutions.trade_unions.steps.step_4.title', 'Publish and audit'),
            description: t(
              'solutions.trade_unions.steps.step_4.description',
              'Share instant results with a complete audit trail for every section.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('solutions.trade_unions.prose.eyebrow', 'Cost and trust')}
        title={t('solutions.trade_unions.prose.title', 'Union elections are expensive and easy to contest')}
        intro={t(
          'solutions.trade_unions.prose.intro',
          'Organizing elecciones sindicales across many workplaces means printing, transport, staffing and counting. It is costly, slow, and a single irregularity can put the result in doubt.'
        )}
        blocks={[
          {
            heading: t('solutions.trade_unions.prose.block_1.heading', 'What election day usually costs'),
            bullets: [
              t(
                'solutions.trade_unions.prose.block_1.bullet_1',
                'Printing and distributing ballots to every workplace'
              ),
              t('solutions.trade_unions.prose.block_1.bullet_2', 'Staffing polling points and counting by hand'),
              t('solutions.trade_unions.prose.block_1.bullet_3', 'Travel and lost hours for members and delegates'),
            ],
          },
          {
            heading: t('solutions.trade_unions.prose.block_2.heading', 'What Vocdoni changes'),
            bullets: [
              t('solutions.trade_unions.prose.block_2.bullet_1', 'Remote voting cuts election-day cost by up to 80%'),
              t(
                'solutions.trade_unions.prose.block_2.bullet_2',
                'A verifiable audit trail makes results hard to contest'
              ),
              t(
                'solutions.trade_unions.prose.block_2.bullet_3',
                'Secret ballots protect members across every workplace'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('solutions.trade_unions.faq.eyebrow', 'FAQ')}
        title={t('solutions.trade_unions.faq.title', 'Questions from secretarías de organización')}
        items={[
          {
            question: t(
              'solutions.trade_unions.faq.q1.question',
              'How much can online voting save us on election day?'
            ),
            answer: t(
              'solutions.trade_unions.faq.q1.answer',
              'Most unions cut election-day cost by up to 80% by removing printing, transport, polling staff and manual counting across workplaces.'
            ),
          },
          {
            question: t(
              'solutions.trade_unions.faq.q2.question',
              'Can it handle delegate elections across many workplaces?'
            ),
            answer: t(
              'solutions.trade_unions.faq.q2.answer',
              'Yes. The census mirrors your structure by workplace, sector or section, so you can elect delegates everywhere in a single coordinated process.'
            ),
          },
          {
            question: t('solutions.trade_unions.faq.q3.question', 'Is there a full audit trail for the results?'),
            answer: t(
              'solutions.trade_unions.faq.q3.answer',
              'There is. Every step is recorded and end-to-end verifiable, so the result stands up to scrutiny from members, rival lists and labour authorities.'
            ),
          },
          {
            question: t('solutions.trade_unions.faq.q4.question', 'Is voto sindical secret on Vocdoni?'),
            answer: t(
              'solutions.trade_unions.faq.q4.answer',
              'Yes. Zero-knowledge cryptography keeps each ballot anonymous, protecting members from any pressure at work while still letting anyone verify the count.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.trade_unions.cta.title', 'Run your elecciones sindicales for less')}
        description={t(
          'solutions.trade_unions.cta.description',
          'Start a free vote today, or book a call and we will plan your union-wide election.'
        )}
        primaryCta={{
          label: t('solutions.trade_unions.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('solutions.trade_unions.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('solutions.trade_unions.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.trade_unions.related.primaries', 'Primaries'),
            href: '/use-cases/primaries',
            description: t(
              'solutions.trade_unions.related.primaries_desc',
              'Run internal candidacies with verifiable results.'
            ),
          },
          {
            label: t('solutions.trade_unions.related.delegate', 'Delegate elections'),
            href: '/use-cases/delegate-elections',
            description: t(
              'solutions.trade_unions.related.delegate_desc',
              'Elect delegates at scale with a full audit trail.'
            ),
          },
          {
            label: t('solutions.trade_unions.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.trade_unions.related.pricing_desc', 'Plans and tailored quotes.'),
          },
          {
            label: t('solutions.trade_unions.related.security', 'Security'),
            href: '/security',
            description: t('solutions.trade_unions.related.security_desc', 'Architecture, audits and verifiability.'),
          },
          {
            label: t('solutions.trade_unions.related.case_studies', 'Case studies'),
            href: '/case-studies',
            description: t('solutions.trade_unions.related.case_studies_desc', 'See how organizations vote at scale.'),
          },
        ]}
      />
    </>
  )
}
