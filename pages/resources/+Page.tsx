import { useTranslation } from 'react-i18next'

import { CtaBanner, MarketingHero, RelatedLinks } from '@/components/marketing'

export default function ResourcesHubPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('resources.hub.hero.eyebrow', 'Resources')}
        title={t('resources.hub.hero.title', 'Practical guides and templates for running online votes')}
        subtitle={t(
          'resources.hub.hero.subtitle',
          'Everything you need to plan and run a secure election: a complete online voting guide, an AGM checklist, a ready-made election rules template, a glossary, and our technical whitepapers.'
        )}
        primaryCta={{
          label: t('resources.hub.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('resources.hub.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('resources.hub.related.title', 'Browse the resources')}
        links={[
          {
            label: t('resources.hub.related.guide.label', 'The complete online voting guide'),
            href: '/resources/online-voting-guide',
            description: t('resources.hub.related.guide.desc', 'A pillar guide for organizations moving votes online.'),
          },
          {
            label: t('resources.hub.related.agm.label', 'Online AGM checklist'),
            href: '/resources/agm-checklist',
            description: t('resources.hub.related.agm.desc', 'A step-by-step checklist for a smooth virtual assembly.'),
          },
          {
            label: t('resources.hub.related.rules.label', 'Election rules template'),
            href: '/resources/election-rules-template',
            description: t('resources.hub.related.rules.desc', 'A ready-made voting rules outline you can adapt.'),
          },
          {
            label: t('resources.hub.related.glossary.label', 'Voting glossary'),
            href: '/resources/glossary',
            description: t('resources.hub.related.glossary.desc', 'Plain definitions for the terms that matter.'),
          },
          {
            label: t('resources.hub.related.whitepapers.label', 'Whitepapers'),
            href: '/resources/whitepapers',
            description: t(
              'resources.hub.related.whitepapers.desc',
              'Technical and legal documents behind the protocol.'
            ),
          },
          {
            label: t('resources.hub.related.learn.label', 'Learn the fundamentals'),
            href: '/learn',
            description: t(
              'resources.hub.related.learn.desc',
              'Guides on how voting works, security, and cryptography.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('resources.hub.cta.title', 'Turn the guide into a real vote')}
        description={t(
          'resources.hub.cta.description',
          'Start a free, anonymous, end-to-end verifiable election, or book a call and we will help you plan it.'
        )}
        primaryCta={{
          label: t('resources.hub.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('resources.hub.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
