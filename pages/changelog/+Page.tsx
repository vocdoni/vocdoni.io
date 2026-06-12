import { useTranslation } from 'react-i18next'

import { MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function ChangelogPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('changelog.hero.eyebrow', 'Changelog')}
        title={t('changelog.hero.title', 'Always improving the way you vote')}
        subtitle={t(
          'changelog.hero.subtitle',
          'Vocdoni is under active development. Here is a look at the kind of improvements we ship across verifiability, performance, languages, and accessibility.'
        )}
        primaryCta={{
          label: t('changelog.hero.cta_primary', 'Open the app'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('changelog.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <ProseSection
        eyebrow={t('changelog.entries.eyebrow', 'Recent improvements')}
        title={t('changelog.entries.title', 'What we have been working on')}
        intro={t(
          'changelog.entries.intro',
          'We release improvements continuously. These themes group the most recent work across the platform.'
        )}
        blocks={[
          {
            heading: t('changelog.entries.verifiability.heading', 'Stronger verifiability'),
            paragraphs: [
              t(
                'changelog.entries.verifiability.paragraph_1',
                'We have made it easier for voters and auditors to confirm that every ballot was counted and that published results match the votes cast, with clearer proofs and a smoother verification flow.'
              ),
            ],
          },
          {
            heading: t('changelog.entries.performance.heading', 'Better performance at scale'),
            paragraphs: [
              t(
                'changelog.entries.performance.paragraph_1',
                'Recent work focuses on handling larger censuses and higher turnout without slowing down, so big elections stay fast from the first ballot to the final tally.'
              ),
            ],
          },
          {
            heading: t('changelog.entries.languages.heading', 'More languages'),
            paragraphs: [
              t(
                'changelog.entries.languages.paragraph_1',
                'We continue to add and refine languages across the voting portal so members can take part in the language they are most comfortable with.'
              ),
            ],
          },
          {
            heading: t('changelog.entries.accessibility.heading', 'Improved accessibility'),
            paragraphs: [
              t(
                'changelog.entries.accessibility.paragraph_1',
                'Ongoing accessibility work brings the interface closer to WCAG guidelines, improving screen-reader support and keyboard navigation so every member can vote independently.'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('changelog.related.title', 'Keep up with Vocdoni')}
        links={[
          {
            label: t('changelog.related.product', 'Explore the product'),
            href: '/product',
            description: t('changelog.related.product_desc', 'See the full platform and its core capabilities.'),
          },
          {
            label: t('changelog.related.features', 'Product features'),
            href: '/product/features',
            description: t('changelog.related.features_desc', 'Voting methods, 2FA, and accessibility.'),
          },
          {
            label: t('changelog.related.blog', 'Vocdoni blog'),
            href: 'https://blog.vocdoni.io',
            external: true,
            description: t('changelog.related.blog_desc', 'Product news, deep dives, and announcements.'),
          },
        ]}
      />
    </>
  )
}
