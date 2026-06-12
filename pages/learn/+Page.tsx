import { BookOpen, KeyRound, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, RelatedLinks } from '@/components/marketing'

export default function LearnHubPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('learn.hub.hero.eyebrow', 'Learn')}
        title={t('learn.hub.hero.title', 'Understand how secure online voting really works')}
        subtitle={t(
          'learn.hub.hero.subtitle',
          'Plain-language guides to digital elections: how a vote travels from a voter to a verified result, why it stays secret, and how anyone can check the outcome. No prior cryptography needed.'
        )}
        primaryCta={{ label: t('learn.hub.hero.cta_primary', 'Explore the guides'), href: '#topics' }}
        secondaryCta={{ label: t('learn.hub.hero.cta_secondary', 'See how we keep votes secure'), href: '/security' }}
      />

      <div id='topics'>
        <FeatureGrid
          eyebrow={t('learn.hub.topics.eyebrow', 'Topics')}
          title={t('learn.hub.topics.title', 'Start with the fundamentals')}
          description={t(
            'learn.hub.topics.description',
            'Three short reads that build on each other, from the basics of casting a digital ballot to the cryptography that protects it.'
          )}
          columns={3}
          features={[
            {
              icon: BookOpen,
              title: t('learn.hub.topics.how.title', 'How digital voting works'),
              description: t(
                'learn.hub.topics.how.description',
                'Follow a vote from the census to the count: how ballots are cast, kept secret, tallied, and verified.'
              ),
            },
            {
              icon: ShieldCheck,
              title: t('learn.hub.topics.security.title', 'Election security'),
              description: t(
                'learn.hub.topics.security.description',
                'The real threats to elections and how modern online voting answers them with anonymity, verifiability, and tamper-evidence.'
              ),
            },
            {
              icon: KeyRound,
              title: t('learn.hub.topics.crypto.title', 'Cryptographic voting'),
              description: t(
                'learn.hub.topics.crypto.description',
                'A readable tour of zk-SNARKs, mixnets, and threshold cryptography, and how they make end-to-end verifiability possible.'
              ),
            },
          ]}
        />
      </div>

      <RelatedLinks
        title={t('learn.hub.related.title', 'Read the guides')}
        links={[
          {
            label: t('learn.hub.related.how.label', 'How online voting works'),
            href: '/learn/how-online-voting-works',
            description: t(
              'learn.hub.related.how.desc',
              'Census, ballot, casting, counting, and verification explained.'
            ),
          },
          {
            label: t('learn.hub.related.security.label', 'Election security'),
            href: '/learn/election-security',
            description: t(
              'learn.hub.related.security.desc',
              'How online voting defends against the threats paper cannot.'
            ),
          },
          {
            label: t('learn.hub.related.crypto.label', 'Cryptographic voting'),
            href: '/learn/cryptographic-voting',
            description: t('learn.hub.related.crypto.desc', 'The cryptography behind private, verifiable elections.'),
          },
          {
            label: t('learn.hub.related.zk.label', 'Zero-knowledge proofs'),
            href: '/security/zero-knowledge',
            description: t('learn.hub.related.zk.desc', 'How votes stay private while results stay provable.'),
          },
          {
            label: t('learn.hub.related.verifiability.label', 'Verifiability'),
            href: '/security/verifiability',
            description: t(
              'learn.hub.related.verifiability.desc',
              'Why anyone can audit a Vocdoni election end to end.'
            ),
          },
          {
            label: t('learn.hub.related.resources.label', 'Resources and guides'),
            href: '/resources',
            description: t(
              'learn.hub.related.resources.desc',
              'Checklists, templates, and the complete online voting guide.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('learn.hub.cta.title', 'Ready to run a verifiable vote?')}
        description={t(
          'learn.hub.cta.description',
          'Put the theory into practice. Start a free, anonymous, end-to-end verifiable election in minutes.'
        )}
        primaryCta={{
          label: t('learn.hub.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('learn.hub.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
