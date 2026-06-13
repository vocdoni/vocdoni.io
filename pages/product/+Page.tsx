import { BadgeCheck, Boxes, ShieldCheck, Sparkles, Vote, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, RelatedLinks, StepList } from '@/components/marketing'

export default function ProductPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('product.hub.hero.eyebrow', 'Product')}
        title={t('product.hub.hero.title', 'The voting platform built for trust')}
        subtitle={t(
          'product.hub.hero.subtitle',
          'Vocdoni runs private, end-to-end verifiable elections for your organization, with instant results and a portal your members will actually use.'
        )}
        primaryCta={{
          label: t('product.hub.hero.cta_primary', 'Open the app'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('product.hub.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
        bullets={[
          t('product.hub.hero.bullet_1', 'Private ballots, secret even from us'),
          t('product.hub.hero.bullet_2', 'Results anyone can verify, in seconds'),
          t('product.hub.hero.bullet_3', 'GDPR compliant and hosted in the EU'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('product.hub.capabilities.eyebrow', 'Core capabilities')}
        title={t('product.hub.capabilities.title', 'Everything you need to run a real election')}
        columns={3}
        features={[
          {
            icon: ShieldCheck,
            title: t('product.hub.capabilities.privacy.title', 'Private by design'),
            description: t(
              'product.hub.capabilities.privacy.description',
              'Zero-knowledge ballots keep every vote secret, even from Vocdoni.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('product.hub.capabilities.verifiable.title', 'End-to-end verifiable'),
            description: t(
              'product.hub.capabilities.verifiable.description',
              'Every voter can confirm their ballot counted, and anyone can audit the result.'
            ),
          },
          {
            icon: Vote,
            title: t('product.hub.capabilities.methods.title', 'Flexible voting methods'),
            description: t(
              'product.hub.capabilities.methods.description',
              'Single and multiple choice, ranked, and weighted voting in the same platform.'
            ),
          },
          {
            icon: Zap,
            title: t('product.hub.capabilities.results.title', 'Instant results'),
            description: t(
              'product.hub.capabilities.results.description',
              'No manual counting and no recount nights. Results are ready the moment voting closes.'
            ),
          },
          {
            icon: Sparkles,
            title: t('product.hub.capabilities.branded.title', 'Branded member portal'),
            description: t(
              'product.hub.capabilities.branded.description',
              'A white-label, multi-language portal that looks and feels like your organization.'
            ),
          },
          {
            icon: Boxes,
            title: t('product.hub.capabilities.integrations.title', 'Connects to your systems'),
            description: t(
              'product.hub.capabilities.integrations.description',
              'SSO, member databases, and a CSV census import to set up votes in minutes.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('product.hub.how.eyebrow', 'How it works')}
        title={t('product.hub.how.title', 'From voter list to verified result in four steps')}
        steps={[
          {
            title: t('product.hub.how.step_1.title', 'Build your census'),
            description: t(
              'product.hub.how.step_1.description',
              'Import your members from a CSV file or connect your existing database to define who can vote.'
            ),
          },
          {
            title: t('product.hub.how.step_2.title', 'Design the vote'),
            description: t(
              'product.hub.how.step_2.description',
              'Choose a voting method, set the questions, and add 2FA and weighting where you need them.'
            ),
          },
          {
            title: t('product.hub.how.step_3.title', 'Members cast their ballots'),
            description: t(
              'product.hub.how.step_3.description',
              'Voters take part from any device through your branded portal, in their own language.'
            ),
          },
          {
            title: t('product.hub.how.step_4.title', 'Publish verifiable results'),
            description: t(
              'product.hub.how.step_4.description',
              'Results are tallied instantly and published with proof that anyone can independently verify.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('product.hub.related.title', 'Go deeper')}
        links={[
          {
            label: t('product.hub.related.features', 'Features'),
            href: '/product/features',
            description: t('product.hub.related.features_desc', 'Voting methods, 2FA, accessibility, and more.'),
          },
          {
            label: t('product.hub.related.integrations', 'Integrations'),
            href: '/product/integrations',
            description: t('product.hub.related.integrations_desc', 'SSO, connectors, API and SDK, CSV import.'),
          },
          {
            label: t('product.hub.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('product.hub.related.pricing_desc', 'Transparent plans and tailored quotes.'),
          },
          {
            label: t('product.hub.related.security', 'Security'),
            href: '/security',
            description: t('product.hub.related.security_desc', 'How we keep every vote secret and verifiable.'),
          },
        ]}
      />

      <CtaBanner
        title={t('product.hub.cta.title', 'See the platform in action')}
        description={t(
          'product.hub.cta.description',
          'Start a free vote today, or book a call and we will walk you through Vocdoni for your organization.'
        )}
        primaryCta={{
          label: t('product.hub.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('product.hub.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
