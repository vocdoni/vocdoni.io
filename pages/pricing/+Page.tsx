import { BadgeCheck, Calculator, Headset, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  CtaBanner,
  FaqAccordion,
  FeatureGrid,
  ManagedProjectSection,
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
          'Two ways to vote with Vocdoni: run it yourself with our self-service plans, or let our team manage the whole election for you. Start free and pay only for the voters you need.'
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
        eyebrow={t('pricing_page.tiers.eyebrow', 'Self-service · SaaS')}
        title={t('pricing_page.tiers.title', 'Run your own vote, your way')}
        description={t(
          'pricing_page.tiers.description',
          'Sign up, upload your census and launch in minutes. Self-service plans include the full voting platform with basic branding and configuration. Prices are per year, excluding VAT.'
        )}
        moreLabel={t('pricing_page.tiers.more_label', 'See all features')}
        lessLabel={t('pricing_page.tiers.less_label', 'Show fewer')}
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
              t('pricing_page.tiers.free.feature_4', 'Set up a vote in minutes'),
            ],
            cta: {
              label: t('pricing_page.tiers.free.cta', 'Start free'),
              href: 'https://app.vocdoni.io',
              external: true,
            },
          },
          {
            name: t('pricing_page.tiers.essential.name', 'Essential'),
            price: t('pricing_page.tiers.essential.price', '€590'),
            priceNote: t('pricing_page.tiers.essential.note', '/ year'),
            priceSubnote: t('pricing_page.tiers.essential.subnote', '+€50 per extra 500 voters'),
            description: t(
              'pricing_page.tiers.essential.description',
              'For associations and clubs running regular votes.'
            ),
            features: [
              t('pricing_page.tiers.essential.feature_1', 'Up to 1,000 voters'),
              t('pricing_page.tiers.essential.feature_2', 'Unlimited voting processes'),
              t('pricing_page.tiers.essential.feature_3', 'Upload your own census (CSV or Excel)'),
              t('pricing_page.tiers.essential.feature_4', 'Email invitations and reminders'),
            ],
            moreFeatures: [
              t('pricing_page.tiers.essential.more_1', 'Multiple voting types: single, multiple choice and weighted'),
              t('pricing_page.tiers.essential.more_2', 'Multi-question ballots'),
              t('pricing_page.tiers.essential.more_3', 'Downloadable PDF results report'),
              t('pricing_page.tiers.essential.more_4', 'Real-time participation tracking'),
              t('pricing_page.tiers.essential.more_5', 'Email support'),
            ],
            cta: {
              label: t('pricing_page.tiers.essential.cta', 'Start free'),
              href: 'https://app.vocdoni.io',
              external: true,
            },
          },
          {
            name: t('pricing_page.tiers.premium.name', 'Premium'),
            price: t('pricing_page.tiers.premium.price', '€1,890'),
            priceNote: t('pricing_page.tiers.premium.note', '/ year'),
            priceSubnote: t('pricing_page.tiers.premium.subnote', '+€50 per extra 500 voters'),
            description: t(
              'pricing_page.tiers.premium.description',
              'For colleges and federations with large memberships.'
            ),
            features: [
              t('pricing_page.tiers.premium.feature_1', 'Up to 5,000 voters'),
              t('pricing_page.tiers.premium.feature_2', 'Everything in Essential'),
              t('pricing_page.tiers.premium.feature_3', 'Branded voting portal'),
              t('pricing_page.tiers.premium.feature_4', 'Hybrid in-person and remote voting'),
            ],
            moreFeatures: [
              t('pricing_page.tiers.premium.more_1', 'Custom census fields and voter segments'),
              t('pricing_page.tiers.premium.more_2', 'Weighted and delegated voting'),
              t('pricing_page.tiers.premium.more_3', 'Advanced results PDF with audit trail'),
              t('pricing_page.tiers.premium.more_4', 'Scheduled and recurring votes'),
              t('pricing_page.tiers.premium.more_5', 'Multiple administrators'),
              t('pricing_page.tiers.premium.more_6', 'Priority support and onboarding'),
            ],
            cta: {
              label: t('pricing_page.tiers.premium.cta', 'Start free'),
              href: 'https://app.vocdoni.io',
              external: true,
            },
            highlighted: true,
            badge: t('pricing_page.tiers.premium.badge', 'Most popular'),
          },
        ]}
        footnote={t(
          'pricing_page.tiers.footnote',
          'Essential and Premium scale with your census: +€50 per additional 500 voters. Voting with more than 5,000 voters? We recommend talking to us for a tailored quote.'
        )}
      />

      <ManagedProjectSection
        eyebrow={t('pricing_page.managed.eyebrow', 'Fully managed · Custom project')}
        badge={t('pricing_page.managed.badge', '5,000+ voters')}
        title={t('pricing_page.managed.title', 'We design, run and deliver your election')}
        description={t(
          'pricing_page.managed.description',
          'For high-stakes or complex votes. Our team handles everything end to end - you only approve the setup and announce the results.'
        )}
        priceLabel={t('pricing_page.managed.price_label', 'Tailored quote')}
        priceNote={t(
          'pricing_page.managed.price_note',
          'Recommended for elections above 5,000 voters or bespoke processes.'
        )}
        groups={[
          {
            heading: t('pricing_page.managed.group_1.heading', 'Expert accompaniment'),
            items: [
              t('pricing_page.managed.group_1.item_1', 'Dedicated project manager'),
              t('pricing_page.managed.group_1.item_2', 'Periodic planning meetings'),
              t('pricing_page.managed.group_1.item_3', 'A full rehearsal vote before election day'),
              t('pricing_page.managed.group_1.item_4', 'Expert support before, during and after the vote'),
            ],
          },
          {
            heading: t('pricing_page.managed.group_2.heading', 'Total management'),
            items: [
              t('pricing_page.managed.group_2.item_1', 'Custom voting page and branding'),
              t('pricing_page.managed.group_2.item_2', 'Custom flows and integrations (SSO, eIDAS)'),
              t('pricing_page.managed.group_2.item_3', 'We build and validate your census'),
              t('pricing_page.managed.group_2.item_4', 'Configuration, setup and fine-tuning'),
              t('pricing_page.managed.group_2.item_5', 'Results report and certification'),
            ],
          },
        ]}
        primaryCta={{ label: t('pricing_page.managed.cta_primary', 'Request a quote'), href: '/contact' }}
        secondaryCta={{ label: t('pricing_page.managed.cta_secondary', 'Explore solutions'), href: '/solutions' }}
        footnote={t(
          'pricing_page.managed.footnote',
          'Every custom project includes the same privacy and verifiability guarantees as our self-service plans.'
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
            question: t(
              'pricing_page.faq.q2.question',
              "What's the difference between self-service and a custom project?"
            ),
            answer: t(
              'pricing_page.faq.q2.answer',
              'With self-service (SaaS) plans you run the vote yourself: sign up, upload your census, configure your ballot and launch, with basic branding and configuration. With a custom project our team manages everything for you - a tailored voting page, custom flows, census preparation, rehearsals and expert support throughout.'
            ),
          },
          {
            question: t('pricing_page.faq.q3.question', 'How does pricing scale with my census?'),
            answer: t(
              'pricing_page.faq.q3.answer',
              'Self-service plans are priced by census size: Essential covers up to 1,000 voters and Premium up to 5,000. Beyond your plan limit, extra voters cost €50 per additional 500. For elections with more than 5,000 voters we recommend a tailored quote.'
            ),
          },
          {
            question: t('pricing_page.faq.q4.question', 'What does a custom project include?'),
            answer: t(
              'pricing_page.faq.q4.answer',
              'A dedicated project manager, custom voting page and flows, census preparation, configuration and fine-tuning, periodic meetings, a full rehearsal vote before election day, and expert support before, during and after the election.'
            ),
          },
          {
            question: t('pricing_page.faq.q5.question', 'Can I change or cancel my plan?'),
            answer: t(
              'pricing_page.faq.q5.answer',
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
        ]}
      />
    </>
  )
}
