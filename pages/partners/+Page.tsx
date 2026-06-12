import { Boxes, Handshake, Landmark, Network, Puzzle, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function PartnersPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('partners.hero.eyebrow', 'Partners')}
        title={t('partners.hero.title', 'Grow with the most verifiable voting technology')}
        subtitle={t(
          'partners.hero.subtitle',
          'Through the SuperNodes channel programme and our integrator partnerships, partners bring anonymous, verifiable voting to their own clients and markets.'
        )}
        primaryCta={{ label: t('partners.hero.cta_primary', 'Become a partner'), href: '/contact' }}
        secondaryCta={{
          label: t('partners.hero.cta_secondary', 'Read the developer docs'),
          href: 'https://developer.vocdoni.io',
          external: true,
        }}
        bullets={[
          t('partners.hero.bullet_1', 'Open source technology you can build on'),
          t('partners.hero.bullet_2', 'GDPR compliant and hosted in the EU'),
          t('partners.hero.bullet_3', 'Joint go-to-market with the Vocdoni team'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('partners.why.eyebrow', 'Why partner with Vocdoni')}
        title={t('partners.why.title', 'A programme built for every kind of partner')}
        columns={3}
        features={[
          {
            icon: TrendingUp,
            title: t('partners.why.resellers.title', 'Resellers'),
            description: t(
              'partners.why.resellers.description',
              'Add verifiable online voting to your portfolio and earn on every account you bring.'
            ),
          },
          {
            icon: Puzzle,
            title: t('partners.why.integrators.title', 'Integrators'),
            description: t(
              'partners.why.integrators.description',
              'Embed Vocdoni in your platform with our API and SDK, like BLOOCK does today.'
            ),
          },
          {
            icon: Landmark,
            title: t('partners.why.public.title', 'Public-administration channels'),
            description: t(
              'partners.why.public.description',
              'Channels such as the CCV programme bring participation tools to public institutions.'
            ),
          },
          {
            icon: Network,
            title: t('partners.why.supernodes.title', 'SuperNodes programme'),
            description: t(
              'partners.why.supernodes.description',
              'Join the SuperNodes channel programme and deliver Vocdoni under a shared framework.'
            ),
          },
          {
            icon: Boxes,
            title: t('partners.why.opensource.title', 'Open source foundation'),
            description: t(
              'partners.why.opensource.description',
              'Build on transparent, auditable technology you and your clients can inspect.'
            ),
          },
          {
            icon: Handshake,
            title: t('partners.why.support.title', 'Hands-on support'),
            description: t(
              'partners.why.support.description',
              'Get enablement, technical guidance, and co-selling from a team that runs elections.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('partners.detail.eyebrow', 'How partnerships work')}
        title={t('partners.detail.title', 'Two routes to bring Vocdoni to your market')}
        intro={t(
          'partners.detail.intro',
          'Whether you sell to organizations or build software for them, there is a way to partner that fits how you already work.'
        )}
        blocks={[
          {
            heading: t('partners.detail.block_1.heading', 'The SuperNodes channel programme'),
            paragraphs: [
              t(
                'partners.detail.block_1.paragraph_1',
                'SuperNodes resell and deliver Vocdoni to their own clients under a shared commercial framework. It is the right fit for consultancies, channel partners, and public-administration intermediaries such as the CCV programme who want to offer verifiable voting without building it themselves.'
              ),
            ],
          },
          {
            heading: t('partners.detail.block_2.heading', 'Integrator partnerships'),
            paragraphs: [
              t(
                'partners.detail.block_2.paragraph_1',
                'Integrators like BLOOCK embed Vocdoni inside their own platforms using our API and SDK, adding verifiable voting as a native feature of their product. We support the integration end to end, from first prototype to production.'
              ),
            ],
          },
        ]}
      />

      <CtaBanner
        title={t('partners.cta.title', 'Become a partner')}
        description={t(
          'partners.cta.description',
          'Tell us about your market and clients, and we will find the partnership model that fits.'
        )}
        primaryCta={{ label: t('partners.cta.primary', 'Become a partner'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('partners.related.title', 'See it in practice')}
        links={[
          {
            label: t('partners.related.ccv', 'CCV SuperNodes case study'),
            href: '/case-studies/ccv-supernodes',
            description: t('partners.related.ccv_desc', 'How the CCV channel programme delivers Vocdoni.'),
          },
          {
            label: t('partners.related.integrations', 'Integrations'),
            href: '/product/integrations',
            description: t('partners.related.integrations_desc', 'SSO, connectors, API and SDK, CSV import.'),
          },
          {
            label: t('partners.related.docs', 'Developer documentation'),
            href: 'https://developer.vocdoni.io',
            external: true,
            description: t('partners.related.docs_desc', 'Everything your team needs to build on Vocdoni.'),
          },
        ]}
      />
    </>
  )
}
