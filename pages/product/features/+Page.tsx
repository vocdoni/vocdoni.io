import {
  Accessibility,
  Brush,
  Building2,
  Languages,
  ListOrdered,
  ListChecks,
  Scale,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection } from '@/components/marketing'

export default function ProductFeaturesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('product.features.hero.eyebrow', 'Features')}
        title={t('product.features.hero.title', 'Voting features that fit how your organization decides')}
        subtitle={t(
          'product.features.hero.subtitle',
          'From ranked and weighted ballots to two-factor authentication and a fully branded portal, Vocdoni adapts to your statutes and your members.'
        )}
        primaryCta={{
          label: t('product.features.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('product.features.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <FeatureGrid
        eyebrow={t('product.features.grid.eyebrow', 'What you can do')}
        title={t('product.features.grid.title', 'A complete toolkit for real elections')}
        columns={3}
        features={[
          {
            icon: ListChecks,
            title: t('product.features.grid.choice.title', 'Single and multiple choice'),
            description: t(
              'product.features.grid.choice.description',
              'Run simple yes or no votes or let members pick several options on the same ballot.'
            ),
          },
          {
            icon: ListOrdered,
            title: t('product.features.grid.ranked.title', 'Ranked voting'),
            description: t(
              'product.features.grid.ranked.description',
              'Let voters order candidates or options by preference for more expressive results.'
            ),
          },
          {
            icon: Scale,
            title: t('product.features.grid.weighted.title', 'Weighted voting'),
            description: t(
              'product.features.grid.weighted.description',
              'Assign voting power by shares, seniority, or delegate count when one member is not one vote.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('product.features.grid.twofa.title', 'Two-factor authentication'),
            description: t(
              'product.features.grid.twofa.description',
              'Add 2FA so only the right person can cast each ballot, without breaking anonymity.'
            ),
          },
          {
            icon: Brush,
            title: t('product.features.grid.branded.title', 'White-label branded portal'),
            description: t(
              'product.features.grid.branded.description',
              'Put your logo, colors, and domain on a portal members recognize and trust.'
            ),
          },
          {
            icon: Languages,
            title: t('product.features.grid.languages.title', 'Multi-language'),
            description: t(
              'product.features.grid.languages.description',
              'Offer the vote in every language your members speak, on the same process.'
            ),
          },
          {
            icon: Accessibility,
            title: t('product.features.grid.accessibility.title', 'Accessibility'),
            description: t(
              'product.features.grid.accessibility.description',
              'An interface built to WCAG guidelines so every member can vote independently.'
            ),
          },
          {
            icon: Building2,
            title: t('product.features.grid.hybrid.title', 'Hybrid voting'),
            description: t(
              'product.features.grid.hybrid.description',
              'Combine in-person and remote ballots in a single, consistent tally.'
            ),
          },
          {
            icon: Zap,
            title: t('product.features.grid.instant.title', 'Instant results'),
            description: t(
              'product.features.grid.instant.description',
              'Tallies are computed the moment voting closes, with proof anyone can verify.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('product.features.detail.eyebrow', 'Built around your members')}
        title={t('product.features.detail.title', 'Designed so everyone can take part')}
        intro={t(
          'product.features.detail.intro',
          'Features only matter if every member can use them. Vocdoni pairs flexible voting methods with accessibility, language, and security choices that meet people where they are.'
        )}
        blocks={[
          {
            heading: t('product.features.detail.block_1.heading', 'Choose the right voting method'),
            paragraphs: [
              t(
                'product.features.detail.block_1.paragraph_1',
                'Statutes differ, so the platform does too. Mix single and multiple choice questions, switch to ranked preferences for board elections, and apply weighting when votes carry different power. Every method produces a result anyone can verify.'
              ),
            ],
          },
          {
            heading: t('product.features.detail.block_2.heading', 'Accessible and inclusive by default'),
            bullets: [
              t(
                'product.features.detail.block_2.bullet_1',
                'WCAG-aligned interface that works with screen readers and keyboard navigation'
              ),
              t('product.features.detail.block_2.bullet_2', 'Multi-language ballots so no member is left behind'),
              t(
                'product.features.detail.block_2.bullet_3',
                'Hybrid voting that includes members who attend in person and those who do not'
              ),
            ],
          },
          {
            heading: t('product.features.detail.block_3.heading', 'Secure without sacrificing privacy'),
            paragraphs: [
              t(
                'product.features.detail.block_3.paragraph_1',
                'Two-factor authentication confirms identity at the door, while zero-knowledge ballots keep the vote itself secret. The result is a process that is both auditable and anonymous, with instant results when voting ends.'
              ),
            ],
          },
        ]}
      />

      <CtaBanner
        title={t('product.features.cta.title', 'Find the features your statutes require')}
        description={t(
          'product.features.cta.description',
          'Run a free vote to try them, or talk to our team about configuring Vocdoni for your election.'
        )}
        primaryCta={{
          label: t('product.features.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('product.features.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
