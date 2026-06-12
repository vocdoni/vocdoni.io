import { Boxes, Clock, Eye, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FaqAccordion, FeatureGrid, MarketingHero, ProseSection } from '@/components/marketing'

export default function BlockchainVotingPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('security.blockchain_voting.hero.eyebrow', 'Blockchain')}
        title={t('security.blockchain_voting.hero.title', 'A blockchain voting platform, used for what it is good at')}
        subtitle={t(
          'security.blockchain_voting.hero.subtitle',
          'Vocdoni is a blockchain voting platform, but we are honest about the role the blockchain plays. It is a public bulletin board that makes tampering evident. It is not a magic source of trust on its own.'
        )}
        primaryCta={{
          label: t('security.blockchain_voting.hero.cta_primary', 'See it in action'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('security.blockchain_voting.hero.cta_secondary', 'Back to security overview'),
          href: '/security',
        }}
      />

      <ProseSection
        eyebrow={t('security.blockchain_voting.role.eyebrow', 'The honest version')}
        title={t('security.blockchain_voting.role.title', 'What the blockchain actually does here')}
        intro={t(
          'security.blockchain_voting.role.intro',
          'The blockchain in Vocdoni plays one focused role: it is a shared, append-only ledger that records ballots and process data where everyone can see them and no one can quietly rewrite them.'
        )}
        blocks={[
          {
            heading: t('security.blockchain_voting.role.bulletin.heading', 'A public bulletin board'),
            paragraphs: [
              t(
                'security.blockchain_voting.role.bulletin.p1',
                'Every encrypted ballot and every step of the process is published to a ledger that all participants share. Anyone can read it, copy it, and check it against the published results.'
              ),
            ],
          },
          {
            heading: t('security.blockchain_voting.role.tamper.heading', 'Tamper-evidence'),
            paragraphs: [
              t(
                'security.blockchain_voting.role.tamper.p1',
                'Because each entry is chained and replicated, removing or altering a ballot after the fact would break the record visibly. The point is not that tampering is impossible, but that it cannot happen unnoticed.'
              ),
            ],
          },
          {
            heading: t('security.blockchain_voting.role.ordering.heading', 'Neutral ordering and timing'),
            paragraphs: [
              t(
                'security.blockchain_voting.role.ordering.p1',
                'The ledger also provides a shared sense of order and time, so it is clear which ballots arrived before voting closed, without relying on a single trusted clock.'
              ),
            ],
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('security.blockchain_voting.limits.eyebrow', 'What it does not do')}
        title={t('security.blockchain_voting.limits.title', 'Where the blockchain is not the answer')}
        intro={t(
          'security.blockchain_voting.limits.intro',
          'Just as important as what the blockchain provides is what it does not. We do not want anyone choosing Vocdoni based on blockchain hype.'
        )}
        blocks={[
          {
            bullets: [
              t(
                'security.blockchain_voting.limits.bullet_1',
                'It does not make votes anonymous. Privacy comes from zero-knowledge cryptography, not from the ledger.'
              ),
              t(
                'security.blockchain_voting.limits.bullet_2',
                'It does not decide who is eligible. Eligibility is defined by your census and proven by each ballot.'
              ),
              t(
                'security.blockchain_voting.limits.bullet_3',
                'It does not magically guarantee a correct result. The result is correct because it is verifiable, and the ledger is what makes that verification public.'
              ),
              t(
                'security.blockchain_voting.limits.bullet_4',
                'It is not a cryptocurrency. There is no token to buy and nothing speculative about casting a vote.'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('security.blockchain_voting.grid.eyebrow', 'The benefit in practice')}
        title={t('security.blockchain_voting.grid.title', 'Why a public ledger improves an election')}
        columns={2}
        features={[
          {
            icon: Eye,
            title: t('security.blockchain_voting.grid.transparency.title', 'Open transparency'),
            description: t(
              'security.blockchain_voting.grid.transparency.description',
              'Every participant sees the same record, so no one has a privileged or hidden copy.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('security.blockchain_voting.grid.integrity.title', 'Tamper-evident integrity'),
            description: t(
              'security.blockchain_voting.grid.integrity.description',
              'Any attempt to alter or delete a recorded ballot is immediately visible to all.'
            ),
          },
          {
            icon: Boxes,
            title: t('security.blockchain_voting.grid.resilience.title', 'No single point of control'),
            description: t(
              'security.blockchain_voting.grid.resilience.description',
              'The record is replicated, so it does not depend on one server or one operator staying honest.'
            ),
          },
          {
            icon: Clock,
            title: t('security.blockchain_voting.grid.timing.title', 'Trustworthy timing'),
            description: t(
              'security.blockchain_voting.grid.timing.description',
              'A shared timeline shows clearly which ballots were cast within the voting window.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('security.blockchain_voting.faq.eyebrow', 'FAQ')}
        title={t('security.blockchain_voting.faq.title', 'Questions about blockchain voting')}
        items={[
          {
            question: t('security.blockchain_voting.faq.q1.question', 'Does blockchain make my vote anonymous?'),
            answer: t(
              'security.blockchain_voting.faq.q1.answer',
              'No. Anonymity comes from zero-knowledge proofs that hide the link between voter and ballot. The blockchain stores the encrypted, unlinkable ballots; it is not what protects your privacy.'
            ),
          },
          {
            question: t('security.blockchain_voting.faq.q2.question', 'Is this a cryptocurrency or do I need tokens?'),
            answer: t(
              'security.blockchain_voting.faq.q2.answer',
              'No. Voting on Vocdoni does not require buying or holding any token. The ledger is used purely as a tamper-evident public record of the voting process.'
            ),
          },
          {
            question: t('security.blockchain_voting.faq.q3.question', 'Why use a blockchain at all?'),
            answer: t(
              'security.blockchain_voting.faq.q3.answer',
              'It gives every participant the same append-only record, so results can be verified publicly and tampering becomes evident. That public bulletin board is what a central database alone cannot guarantee.'
            ),
          },
          {
            question: t('security.blockchain_voting.faq.q4.question', 'Could someone change the results on the chain?'),
            answer: t(
              'security.blockchain_voting.faq.q4.answer',
              'Altering recorded ballots would break the chained, replicated record in a way everyone can detect. Combined with verifiable tallies, this makes a silent change to the outcome impractical.'
            ),
          },
        ]}
      />
    </>
  )
}
