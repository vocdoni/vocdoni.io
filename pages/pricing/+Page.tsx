import { BadgeCheck, Calculator, Headset, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  CtaBanner,
  FaqAccordion,
  FeatureGrid,
  MarketingHero,
  PricingTiers,
  ProseSection,
  RelatedLinks,
} from '@/components/marketing'

export default function PricingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('pricing_page.hero.eyebrow', 'Pricing')}
        title={t('pricing_page.hero.title', 'Transparent pricing for online voting you can trust')}
        subtitle={t(
          'pricing_page.hero.subtitle',
          'Start free and upgrade when you need more. Fixed annual plans for recurring votes, and tailored quotes for large or high-stakes elections.'
        )}
        primaryCta={{
          label: t('pricing_page.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('pricing_page.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
        bullets={[
          t('pricing_page.hero.bullet_1', 'No credit card needed to start'),
          t('pricing_page.hero.bullet_2', 'GDPR compliant, hosted in the EU'),
          t('pricing_page.hero.bullet_3', 'Cancel or change plan at any time'),
        ]}
      />

      <PricingTiers
        eyebrow={t('pricing_page.tiers.eyebrow', 'Plans')}
        title={t('pricing_page.tiers.title', 'Pick the plan that fits your organization')}
        description={t(
          'pricing_page.tiers.description',
          'Every plan includes private voting, universally verifiable results, and an audit trail. Prices are per year, excluding VAT.'
        )}
        tiers={[
          {
            name: t('pricing_page.tiers.free.name', 'Free'),
            price: t('pricing_page.tiers.free.price', '€0'),
            priceNote: t('pricing_page.tiers.free.note', 'forever'),
            description: t('pricing_page.tiers.free.description', 'Try a real, verifiable vote with a small group.'),
            features: [
              t('pricing_page.tiers.free.feature_1', 'Up to 50 voters'),
              t('pricing_page.tiers.free.feature_2', 'Private, verifiable ballots'),
              t('pricing_page.tiers.free.feature_3', 'Instant, public results'),
              t('pricing_page.tiers.free.feature_4', 'Email support'),
            ],
            cta: {
              label: t('pricing_page.tiers.free.cta', 'Start free'),
              href: 'https://app.vocdoni.io',
              external: true,
            },
          },
          {
            name: t('pricing_page.tiers.basic.name', 'Basic'),
            price: t('pricing_page.tiers.basic.price', '€590'),
            priceNote: t('pricing_page.tiers.basic.note', '/ year'),
            description: t('pricing_page.tiers.basic.description', 'For associations and clubs running regular votes.'),
            features: [
              t('pricing_page.tiers.basic.feature_1', 'Up to 500 voters'),
              t('pricing_page.tiers.basic.feature_2', 'Unlimited voting processes'),
              t('pricing_page.tiers.basic.feature_3', 'Custom census and reminders'),
              t('pricing_page.tiers.basic.feature_4', 'Weighted and multi-question voting'),
            ],
            cta: {
              label: t('pricing_page.tiers.basic.cta', 'Start free'),
              href: 'https://app.vocdoni.io',
              external: true,
            },
          },
          {
            name: t('pricing_page.tiers.premium.name', 'Premium'),
            price: t('pricing_page.tiers.premium.price', '€1,890'),
            priceNote: t('pricing_page.tiers.premium.note', '/ year'),
            description: t(
              'pricing_page.tiers.premium.description',
              'For colleges and federations with large memberships.'
            ),
            features: [
              t('pricing_page.tiers.premium.feature_1', 'Up to 10,000 voters'),
              t('pricing_page.tiers.premium.feature_2', 'Hybrid in-person and remote voting'),
              t('pricing_page.tiers.premium.feature_3', 'Branded voting portal'),
              t('pricing_page.tiers.premium.feature_4', 'Priority support and onboarding'),
            ],
            cta: {
              label: t('pricing_page.tiers.premium.cta', 'Start free'),
              href: 'https://app.vocdoni.io',
              external: true,
            },
            highlighted: true,
            badge: t('pricing_page.tiers.premium.badge', 'Most popular'),
          },
          {
            name: t('pricing_page.tiers.custom.name', 'Custom'),
            price: t('pricing_page.tiers.custom.price', 'from €3,210'),
            description: t('pricing_page.tiers.custom.description', 'For high-stakes elections and tailored projects.'),
            features: [
              t('pricing_page.tiers.custom.feature_1', 'Unlimited voters'),
              t('pricing_page.tiers.custom.feature_2', 'eIDAS-grade identity and SSO'),
              t('pricing_page.tiers.custom.feature_3', 'Expert support before, during and after the vote'),
              t('pricing_page.tiers.custom.feature_4', 'Custom integrations and SLAs'),
            ],
            cta: { label: t('pricing_page.tiers.custom.cta', 'Request a quote'), href: '/contact' },
          },
        ]}
        footnote={t(
          'pricing_page.tiers.footnote',
          'Need something in between? Plans scale with your census size - talk to us for the exact figure.'
        )}
      />

      <FeatureGrid
        eyebrow={t('pricing_page.included.eyebrow', 'Included in every plan')}
        title={t('pricing_page.included.title', 'The guarantees never sit behind a paywall')}
        columns={4}
        features={[
          {
            icon: ShieldCheck,
            title: t('pricing_page.included.privacy.title', 'Private by design'),
            description: t(
              'pricing_page.included.privacy.description',
              'Zero-knowledge ballots keep every vote secret, even from us.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('pricing_page.included.verifiable.title', 'End-to-end verifiable'),
            description: t(
              'pricing_page.included.verifiable.description',
              'Anyone can check that results match the votes cast.'
            ),
          },
          {
            icon: Calculator,
            title: t('pricing_page.included.results.title', 'Instant results'),
            description: t(
              'pricing_page.included.results.description',
              'No manual counting, no disputes, no recount nights.'
            ),
          },
          {
            icon: Headset,
            title: t('pricing_page.included.support.title', 'Human support'),
            description: t(
              'pricing_page.included.support.description',
              'Real people who have run hundreds of elections.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('pricing_page.roi.eyebrow', 'Return on investment')}
        title={t('pricing_page.roi.title', 'Most organizations cut voting costs by 80-90%')}
        intro={t(
          'pricing_page.roi.intro',
          'Paper and postal voting carry hidden costs: printing, postage, venue hire, staff hours, and recounts. Moving online removes almost all of them.'
        )}
        blocks={[
          {
            heading: t('pricing_page.roi.block_1.heading', 'What you stop paying for'),
            bullets: [
              t('pricing_page.roi.block_1.bullet_1', 'Printing and mailing ballots to every member'),
              t('pricing_page.roi.block_1.bullet_2', 'Venue, logistics and staff for assembly day'),
              t('pricing_page.roi.block_1.bullet_3', 'Manual counting and contested recounts'),
            ],
          },
          {
            heading: t('pricing_page.roi.block_2.heading', 'What you gain'),
            bullets: [
              t('pricing_page.roi.block_2.bullet_1', 'Higher turnout from members who vote from any device'),
              t('pricing_page.roi.block_2.bullet_2', 'Results in seconds, with proof anyone can verify'),
              t('pricing_page.roi.block_2.bullet_3', 'A legally defensible, dispute-free process'),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('pricing_page.faq.eyebrow', 'Pricing FAQ')}
        title={t('pricing_page.faq.title', 'Questions about plans and quotes')}
        items={[
          {
            question: t('pricing_page.faq.q1.question', 'Is the free plan really free?'),
            answer: t(
              'pricing_page.faq.q1.answer',
              'Yes. You can run a real, verifiable vote with up to 50 voters without a credit card. It is the best way to see how Vocdoni works before committing.'
            ),
          },
          {
            question: t('pricing_page.faq.q2.question', 'How is the price calculated?'),
            answer: t(
              'pricing_page.faq.q2.answer',
              'Plans scale with the size of your census - the number of eligible voters. Larger or more sensitive elections move to a tailored quote that includes expert support.'
            ),
          },
          {
            question: t('pricing_page.faq.q3.question', 'What does a custom project include?'),
            answer: t(
              'pricing_page.faq.q3.answer',
              'Custom projects add eIDAS-grade identity, single sign-on, custom integrations, branded portals, and a dedicated team that rehearses, runs and reports on your election.'
            ),
          },
          {
            question: t('pricing_page.faq.q4.question', 'Can I change or cancel my plan?'),
            answer: t(
              'pricing_page.faq.q4.answer',
              'Yes. You can upgrade, downgrade or cancel at any time. We will help you migrate your census and history if you move between plans.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('pricing_page.cta.title', 'See it before you decide')}
        description={t(
          'pricing_page.cta.description',
          'Run a free vote today, or book a call and we will quote your exact election.'
        )}
        primaryCta={{
          label: t('pricing_page.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('pricing_page.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('pricing_page.related.title', 'Keep exploring')}
        links={[
          {
            label: t('pricing_page.related.security', 'How we keep votes secure'),
            href: '/security',
            description: t('pricing_page.related.security_desc', 'Architecture, audits and verifiability.'),
          },
          {
            label: t('pricing_page.related.solutions', 'Solutions for your organization'),
            href: '/solutions',
            description: t('pricing_page.related.solutions_desc', 'Tailored answers by sector.'),
          },
          {
            label: t('pricing_page.related.compare', 'Compare Vocdoni'),
            href: '/compare',
            description: t('pricing_page.related.compare_desc', 'See how we stack up against alternatives.'),
          },
        ]}
      />
    </>
  )
}
