import { Boxes, KeyRound, Shuffle, Sigma } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FeatureGrid, MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function CryptographicVotingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('learn.cryptographic_voting.hero.eyebrow', 'Learn')}
        title={t('learn.cryptographic_voting.hero.title', 'The cryptography behind private, verifiable voting')}
        subtitle={t(
          'learn.cryptographic_voting.hero.subtitle',
          'A readable tour of the primitives that let an election be secret and provable at once: zk-SNARKs, mixnets, threshold cryptography, and end-to-end verifiability. Written for a technical reader, without assuming a cryptography degree.'
        )}
        secondaryCta={{ label: t('learn.cryptographic_voting.hero.cta', 'Back to Learn'), href: '/learn' }}
      />

      <ProseSection
        eyebrow={t('learn.cryptographic_voting.intro.eyebrow', 'The core tension')}
        title={t(
          'learn.cryptographic_voting.intro.title',
          'Secret ballots and public proofs should not coexist - yet they do'
        )}
        intro={t(
          'learn.cryptographic_voting.intro.intro',
          'The whole field of cryptographic voting exists to resolve one apparent contradiction: nobody should learn how you voted, and yet everybody should be able to confirm the result is correct. Modern primitives make both true at the same time.'
        )}
        blocks={[
          {
            heading: t('learn.cryptographic_voting.intro.commit.heading', 'Commitments lock in data'),
            paragraphs: [
              t(
                'learn.cryptographic_voting.intro.commit.p1',
                'A commitment is like a sealed envelope: it fixes a value without revealing it. The census and the ballots are committed before counting, so they cannot be changed later without breaking the seal that everyone can see.'
              ),
            ],
          },
          {
            heading: t('learn.cryptographic_voting.intro.encrypt.heading', 'Encryption protects each ballot'),
            paragraphs: [
              t(
                'learn.cryptographic_voting.intro.encrypt.p1',
                'Ballots are encrypted on the voter device. The plaintext choice never leaves that device in the clear, so no server or operator ever sees an individual vote.'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('learn.cryptographic_voting.primitives.eyebrow', 'The primitives')}
        title={t('learn.cryptographic_voting.primitives.title', 'Four building blocks of a verifiable election')}
        columns={2}
        features={[
          {
            icon: Sigma,
            title: t('learn.cryptographic_voting.primitives.zk.title', 'zk-SNARKs'),
            description: t(
              'learn.cryptographic_voting.primitives.zk.description',
              'A zero-knowledge succinct proof lets a voter show they are eligible and voted correctly without revealing their identity or their choice. The proof is tiny and fast to check, even for huge censuses.'
            ),
          },
          {
            icon: Shuffle,
            title: t('learn.cryptographic_voting.primitives.mixnet.title', 'Mixnets'),
            description: t(
              'learn.cryptographic_voting.primitives.mixnet.description',
              'A mixnet shuffles and re-encrypts ballots in verifiable stages, severing the link between a voter and their ballot while proving that no ballot was added, dropped, or altered during the shuffle.'
            ),
          },
          {
            icon: KeyRound,
            title: t('learn.cryptographic_voting.primitives.threshold.title', 'Threshold cryptography'),
            description: t(
              'learn.cryptographic_voting.primitives.threshold.description',
              'The decryption key is split among several parties, so no single party can decrypt ballots alone. Only a quorum acting together can open the tally, which removes any single point of trust.'
            ),
          },
          {
            icon: Boxes,
            title: t('learn.cryptographic_voting.primitives.e2e.title', 'End-to-end verifiability'),
            description: t(
              'learn.cryptographic_voting.primitives.e2e.description',
              'Cast-as-intended, recorded-as-cast, and counted-as-recorded: voters can verify their ballot, and anyone can verify the tally, with the proofs above tying the chain together.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('learn.cryptographic_voting.together.eyebrow', 'How it fits together')}
        title={t('learn.cryptographic_voting.together.title', 'From a cast ballot to a provable result')}
        blocks={[
          {
            paragraphs: [
              t(
                'learn.cryptographic_voting.together.p1',
                'A voter encrypts their ballot and attaches a zk-SNARK proving they are on the committed census and voted within the rules - all without revealing identity or choice. The encrypted ballot enters the system.'
              ),
              t(
                'learn.cryptographic_voting.together.p2',
                'When voting closes, a mixnet shuffles the encrypted ballots so the order no longer reveals who cast what, while proving the set of ballots is unchanged. A threshold of key-holders then jointly decrypts the shuffled set to produce the tally.'
              ),
              t(
                'learn.cryptographic_voting.together.p3',
                'Every step emits a proof. Anyone can replay the proofs to confirm that only eligible ballots were counted and that the published result is exactly the sum of those ballots - without ever learning how a single person voted.'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('learn.cryptographic_voting.related.title', 'Related reading')}
        links={[
          {
            label: t('learn.cryptographic_voting.related.zk.label', 'Zero-knowledge proofs'),
            href: '/security/zero-knowledge',
            description: t(
              'learn.cryptographic_voting.related.zk.desc',
              'How zk proofs keep ballots private and verifiable.'
            ),
          },
          {
            label: t('learn.cryptographic_voting.related.verifiability.label', 'Verifiability'),
            href: '/security/verifiability',
            description: t(
              'learn.cryptographic_voting.related.verifiability.desc',
              'End-to-end verification in a Vocdoni election.'
            ),
          },
        ]}
      />
    </>
  )
}
