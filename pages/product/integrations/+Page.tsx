import { Database, FileSpreadsheet, KeyRound, Code2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FeatureGrid, MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function ProductIntegrationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('product.integrations.hero.eyebrow', 'Integrations')}
        title={t('product.integrations.hero.title', 'Plug Vocdoni into the systems you already use')}
        subtitle={t(
          'product.integrations.hero.subtitle',
          'Connect single sign-on, member databases, and your own software so setting up a vote takes minutes, not weeks.'
        )}
        primaryCta={{
          label: t('product.integrations.hero.cta_primary', 'Read the developer docs'),
          href: 'https://developer.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('product.integrations.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <FeatureGrid
        eyebrow={t('product.integrations.grid.eyebrow', 'Ways to connect')}
        title={t('product.integrations.grid.title', 'Identity, data, and code in one place')}
        columns={2}
        features={[
          {
            icon: KeyRound,
            title: t('product.integrations.grid.sso.title', 'Single sign-on'),
            description: t(
              'product.integrations.grid.sso.description',
              'Let members sign in with your identity provider over SAML or OIDC, with no extra passwords.'
            ),
          },
          {
            icon: Database,
            title: t('product.integrations.grid.connectors.title', 'CRM and member-database connectors'),
            description: t(
              'product.integrations.grid.connectors.description',
              'Sync your census from the CRM or membership system you already maintain.'
            ),
          },
          {
            icon: Code2,
            title: t('product.integrations.grid.api.title', 'API and SDK'),
            description: t(
              'product.integrations.grid.api.description',
              'Build voting straight into your own product with a documented API and SDK.'
            ),
          },
          {
            icon: FileSpreadsheet,
            title: t('product.integrations.grid.csv.title', 'CSV census import'),
            description: t(
              'product.integrations.grid.csv.description',
              'No system to connect? Upload a CSV file and your voter list is ready in seconds.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('product.integrations.detail.eyebrow', 'How it fits together')}
        title={t('product.integrations.detail.title', 'From your data to a verifiable vote')}
        intro={t(
          'product.integrations.detail.intro',
          'Vocdoni meets your stack at three points: who can vote, how they sign in, and how the vote is created and read back.'
        )}
        blocks={[
          {
            heading: t('product.integrations.detail.block_1.heading', 'Identity and access'),
            paragraphs: [
              t(
                'product.integrations.detail.block_1.paragraph_1',
                'Connect SAML or OIDC single sign-on so members authenticate with the credentials they already have. Access rules stay in your identity provider, and Vocdoni never sees a password.'
              ),
            ],
          },
          {
            heading: t('product.integrations.detail.block_2.heading', 'Building the census'),
            bullets: [
              t('product.integrations.detail.block_2.bullet_1', 'Sync directly from your CRM or member database'),
              t('product.integrations.detail.block_2.bullet_2', 'Import a CSV file when a one-off list is enough'),
              t(
                'product.integrations.detail.block_2.bullet_3',
                'Keep the census up to date automatically before each vote'
              ),
            ],
          },
          {
            heading: t('product.integrations.detail.block_3.heading', 'Automation with the API and SDK'),
            paragraphs: [
              t(
                'product.integrations.detail.block_3.paragraph_1',
                'Create processes, manage voters, and read verifiable results programmatically. The API and SDK let you embed voting in your own product or wire it into existing workflows.'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('product.integrations.related.title', 'Resources for builders')}
        links={[
          {
            label: t('product.integrations.related.docs', 'Developer documentation'),
            href: 'https://developer.vocdoni.io',
            external: true,
            description: t('product.integrations.related.docs_desc', 'API reference, SDK guides, and examples.'),
          },
          {
            label: t('product.integrations.related.github', 'Vocdoni on GitHub'),
            href: 'https://github.com/vocdoni',
            external: true,
            description: t('product.integrations.related.github_desc', 'Open source repositories and SDKs.'),
          },
          {
            label: t('product.integrations.related.features', 'Product features'),
            href: '/product/features',
            description: t('product.integrations.related.features_desc', 'Voting methods, 2FA, and accessibility.'),
          },
          {
            label: t('product.integrations.related.security', 'Security'),
            href: '/security',
            description: t(
              'product.integrations.related.security_desc',
              'How we keep every vote secret and verifiable.'
            ),
          },
        ]}
      />
    </>
  )
}
