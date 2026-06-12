import { useTranslation } from 'react-i18next'

import { CtaBanner, MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function AlternativesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('alternatives.hero.eyebrow', 'Comparison')}
        title={t('alternatives.hero.title', 'Online voting platform alternatives')}
        subtitle={t(
          'alternatives.hero.subtitle',
          'Looking for the best alternative to your current voting tool? Here are honest, side-by-side comparisons with the platforms teams evaluate most.'
        )}
        primaryCta={{
          label: t('alternatives.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('alternatives.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <ProseSection
        eyebrow={t('alternatives.intro.eyebrow', 'Why consider Vocdoni')}
        title={t('alternatives.intro.title', 'The best alternative depends on what you value')}
        intro={t(
          'alternatives.intro.intro',
          'Most voting tools ask you to trust their results. Vocdoni lets you prove them. If verifiability, anonymity, open source, and transparent pricing matter to you, the comparisons below show exactly how we stack up.'
        )}
        blocks={[
          {
            heading: t('alternatives.intro.what.heading', 'What makes Vocdoni different'),
            bullets: [
              t('alternatives.intro.what.bullet_1', 'End-to-end verifiable results any voter can check'),
              t('alternatives.intro.what.bullet_2', 'Anonymous ballots via zero-knowledge cryptography'),
              t('alternatives.intro.what.bullet_3', 'Fully open source, EU-hosted, and GDPR compliant'),
              t('alternatives.intro.what.bullet_4', 'Transparent pricing with a free tier, no sales call to start'),
            ],
          },
          {
            heading: t('alternatives.intro.fair.heading', 'A fair look at each option'),
            paragraphs: [
              t(
                'alternatives.intro.fair.p1',
                'Every comparison is written to be honest. Where a competitor genuinely does something well, we say so. The goal is to help you pick the right platform, not to disparage anyone.'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('alternatives.comparisons.title', 'Compare the alternatives')}
        links={[
          {
            label: t('alternatives.comparisons.kuorum', 'Vocdoni vs Kuorum'),
            href: '/compare/vocdoni-vs-kuorum',
            description: t('alternatives.comparisons.kuorum_desc', 'A Spanish participation platform.'),
          },
          {
            label: t('alternatives.comparisons.polyas', 'Vocdoni vs Polyas'),
            href: '/compare/vocdoni-vs-polyas',
            description: t('alternatives.comparisons.polyas_desc', 'A certified German voting vendor.'),
          },
          {
            label: t('alternatives.comparisons.sequent', 'Vocdoni vs Sequent'),
            href: '/compare/vocdoni-vs-sequent',
            description: t('alternatives.comparisons.sequent_desc', 'Open source verifiable voting, formerly nVotes.'),
          },
          {
            label: t('alternatives.comparisons.assembly', 'Vocdoni vs Assembly Voting'),
            href: '/compare/vocdoni-vs-assembly-voting',
            description: t('alternatives.comparisons.assembly_desc', 'Danish election and AGM voting.'),
          },
          {
            label: t('alternatives.comparisons.eligo', 'Vocdoni vs Eligo'),
            href: '/compare/vocdoni-vs-eligo',
            description: t('alternatives.comparisons.eligo_desc', 'Italian online voting.'),
          },
          {
            label: t('alternatives.comparisons.pricing', 'Pricing'),
            href: '/pricing',
            description: t('alternatives.comparisons.pricing_desc', 'Free tier, annual plans, and custom quotes.'),
          },
          {
            label: t('alternatives.comparisons.security', 'Security and verifiability'),
            href: '/security',
            description: t('alternatives.comparisons.security_desc', 'How we keep votes private and provable.'),
          },
        ]}
      />

      <CtaBanner
        title={t('alternatives.cta.title', 'Find the right voting platform')}
        description={t(
          'alternatives.cta.description',
          'Run a free, anonymous, verifiable vote today, or talk to us about your election.'
        )}
        primaryCta={{
          label: t('alternatives.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('alternatives.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
