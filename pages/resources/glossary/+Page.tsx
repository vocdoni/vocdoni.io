import { useTranslation } from 'react-i18next'

import { MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function GlossaryPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('resources.glossary.hero.eyebrow', 'Resources')}
        title={t('resources.glossary.hero.title', 'Online voting glossary')}
        subtitle={t(
          'resources.glossary.hero.subtitle',
          'Plain-language definitions for the terms that come up when people talk about secure, verifiable online voting. From E2E verifiability to coercion resistance.'
        )}
        secondaryCta={{ label: t('resources.glossary.hero.cta', 'Back to Resources'), href: '/resources' }}
      />

      <ProseSection
        eyebrow={t('resources.glossary.terms.eyebrow', 'Terms')}
        title={t('resources.glossary.terms.title', 'The vocabulary of verifiable voting')}
        blocks={[
          {
            heading: t('resources.glossary.terms.e2e.heading', 'E2E verifiability'),
            paragraphs: [
              t(
                'resources.glossary.terms.e2e.body',
                'End-to-end verifiability lets a voter check that their ballot was cast as intended and recorded as cast, and lets anyone check that all recorded ballots were counted as recorded. It covers the whole chain from voter to final tally.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.zksnark.heading', 'zk-SNARK'),
            paragraphs: [
              t(
                'resources.glossary.terms.zksnark.body',
                'A zero-knowledge succinct non-interactive argument of knowledge. It is a small, fast-to-verify proof that a statement is true - for example that a voter is eligible and voted correctly - without revealing the underlying secret data.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.mixnet.heading', 'Mixnet'),
            paragraphs: [
              t(
                'resources.glossary.terms.mixnet.body',
                'A chain of servers that shuffles and re-encrypts ballots so the output order cannot be linked to the input order. Each stage proves it preserved the set of ballots, breaking the link between voter and ballot without losing any votes.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.threshold.heading', 'Threshold cryptography'),
            paragraphs: [
              t(
                'resources.glossary.terms.threshold.body',
                'A scheme that splits a secret, such as a decryption key, among several parties so that a minimum number of them - the threshold - must cooperate to use it. No single party can act alone, removing a single point of trust.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.census.heading', 'Census'),
            paragraphs: [
              t(
                'resources.glossary.terms.census.body',
                'The list of voters eligible to take part in an election, together with any vote weights. The census is committed before voting so it cannot be changed unnoticed once the vote opens.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.quorum.heading', 'Quorum'),
            paragraphs: [
              t(
                'resources.glossary.terms.quorum.body',
                'The minimum participation required for a vote to be valid. If turnout falls below the quorum set in your rules, the decision does not carry, regardless of how the votes split.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.weighted.heading', 'Weighted voting'),
            paragraphs: [
              t(
                'resources.glossary.terms.weighted.body',
                'A scheme where some votes count more than others, for example by shareholding, membership tier, or delegated proxies. Each voter is assigned a weight that the tally applies automatically.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.receipt.heading', 'Receipt-freeness'),
            paragraphs: [
              t(
                'resources.glossary.terms.receipt.body',
                'A property that prevents a voter from producing a convincing proof of how they voted. Without such a receipt, a voter cannot demonstrate their choice to a third party, which protects them from vote buying.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.coercion.heading', 'Coercion resistance'),
            paragraphs: [
              t(
                'resources.glossary.terms.coercion.body',
                'A stronger guarantee than receipt-freeness: even a voter who is actively pressured during voting cannot be forced to prove compliance, because the system gives them ways to behave as the coercer demands while still voting freely.'
              ),
            ],
          },
          {
            heading: t('resources.glossary.terms.privacy.heading', 'Privacy set'),
            paragraphs: [
              t(
                'resources.glossary.terms.privacy.body',
                'The group of voters among whom any individual ballot could plausibly belong. The larger the privacy set, the harder it is to link a ballot to a person. A strong system keeps this set as large as the full census.'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('resources.glossary.related.title', 'Learn more')}
        links={[
          {
            label: t('resources.glossary.related.crypto.label', 'Cryptographic voting'),
            href: '/learn/cryptographic-voting',
            description: t('resources.glossary.related.crypto.desc', 'See these primitives working together.'),
          },
          {
            label: t('resources.glossary.related.security.label', 'Election security'),
            href: '/learn/election-security',
            description: t('resources.glossary.related.security.desc', 'How these properties defend a vote.'),
          },
        ]}
      />
    </>
  )
}
