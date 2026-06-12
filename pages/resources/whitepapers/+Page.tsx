import { useTranslation } from 'react-i18next'

import { MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function WhitepapersPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('resources.whitepapers.hero.eyebrow', 'Resources')}
        title={t('resources.whitepapers.hero.title', 'Whitepapers and technical documents')}
        subtitle={t(
          'resources.whitepapers.hero.subtitle',
          'The technical and legal documents behind Vocdoni: the protocol design, the cryptography, the security model, and the certifications that back legally valid online voting. Everything is open and auditable.'
        )}
        primaryCta={{
          label: t('resources.whitepapers.hero.cta_primary', 'Read the developer docs'),
          href: 'https://developer.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('resources.whitepapers.hero.cta_secondary', 'Back to Resources'), href: '/resources' }}
      />

      <ProseSection
        eyebrow={t('resources.whitepapers.technical.eyebrow', 'Technical')}
        title={t('resources.whitepapers.technical.title', 'How the protocol is documented')}
        intro={t(
          'resources.whitepapers.technical.intro',
          'Vocdoni is open source and openly specified. The protocol, its cryptography, and its security assumptions are written down so that anyone can review, reproduce, and challenge them.'
        )}
        blocks={[
          {
            heading: t('resources.whitepapers.technical.protocol.heading', 'Protocol and architecture'),
            paragraphs: [
              t(
                'resources.whitepapers.technical.protocol.p1',
                'The protocol documentation covers how the census, ballots, voting process, and tally fit together, including the commitments and proofs that make an election verifiable end to end.'
              ),
            ],
          },
          {
            heading: t('resources.whitepapers.technical.crypto.heading', 'Cryptographic design'),
            paragraphs: [
              t(
                'resources.whitepapers.technical.crypto.p1',
                'The cryptographic specifications describe the zk-SNARK circuits, the mixnet, and the threshold scheme that together deliver ballot secrecy and a provable count. These documents target reviewers and implementers.'
              ),
            ],
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('resources.whitepapers.legal.eyebrow', 'Legal and certification')}
        title={t('resources.whitepapers.legal.title', 'Documents that support legal validity')}
        blocks={[
          {
            heading: t('resources.whitepapers.legal.icoes.heading', 'ICOES technical certificate'),
            paragraphs: [
              t(
                'resources.whitepapers.legal.icoes.p1',
                'The ICOES technical certificate is an independent assessment of the voting technology against recognized requirements for electronic elections. It sits alongside the technical papers as evidence that the system meets external standards, not just internal ones.'
              ),
            ],
          },
          {
            heading: t('resources.whitepapers.legal.compliance.heading', 'Privacy and compliance'),
            paragraphs: [
              t(
                'resources.whitepapers.legal.compliance.p1',
                'Data protection documentation explains how the platform meets GDPR obligations and keeps data in the EU, which matters for organizations that need a vote to stand up to legal scrutiny.'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('resources.whitepapers.related.title', 'Find the documents')}
        links={[
          {
            label: t('resources.whitepapers.related.docs.label', 'Developer documentation'),
            href: 'https://developer.vocdoni.io',
            description: t('resources.whitepapers.related.docs.desc', 'Protocol, APIs, and cryptography in depth.'),
            external: true,
          },
          {
            label: t('resources.whitepapers.related.github.label', 'Source code on GitHub'),
            href: 'https://github.com/vocdoni',
            description: t(
              'resources.whitepapers.related.github.desc',
              'Audit the open source implementation yourself.'
            ),
            external: true,
          },
          {
            label: t('resources.whitepapers.related.crypto.label', 'Cryptographic voting'),
            href: '/learn/cryptographic-voting',
            description: t('resources.whitepapers.related.crypto.desc', 'A readable introduction to the primitives.'),
          },
        ]}
      />
    </>
  )
}
