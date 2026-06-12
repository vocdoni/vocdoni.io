import { EyeOff, KeyRound, Lock, ShieldOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FaqAccordion, FeatureGrid, MarketingHero, ProseSection } from '@/components/marketing'

export default function ZeroKnowledgePage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('security.zero_knowledge.hero.eyebrow', 'Zero knowledge')}
        title={t('security.zero_knowledge.hero.title', 'Zero-knowledge voting: your vote is secret, even from us')}
        subtitle={t(
          'security.zero_knowledge.hero.subtitle',
          'Zero-knowledge voting lets a voter prove they are eligible and that their ballot is valid, without revealing who they are or how they voted. The secrecy is mathematical, not a matter of policy.'
        )}
        primaryCta={{
          label: t('security.zero_knowledge.hero.cta_primary', 'Try anonymous voting'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('security.zero_knowledge.hero.cta_secondary', 'Back to security overview'),
          href: '/security',
        }}
      />

      <ProseSection
        eyebrow={t('security.zero_knowledge.intro.eyebrow', 'For non-cryptographers')}
        title={t('security.zero_knowledge.intro.title', 'What is a zero-knowledge proof?')}
        intro={t(
          'security.zero_knowledge.intro.intro',
          'A zero-knowledge proof lets you convince someone that a statement is true while revealing nothing beyond the fact that it is true. No personal data, no underlying secret, just the conclusion.'
        )}
        blocks={[
          {
            heading: t('security.zero_knowledge.intro.analogy.heading', 'A simple analogy'),
            paragraphs: [
              t(
                'security.zero_knowledge.intro.analogy.p1',
                'Imagine proving you know the password to a locked door by walking through it, without ever saying the password out loud. The observer is convinced you are authorized, yet learns nothing they could reuse.'
              ),
            ],
          },
          {
            heading: t('security.zero_knowledge.intro.snark.heading', 'zk-SNARKs in voting'),
            paragraphs: [
              t(
                'security.zero_knowledge.intro.snark.p1',
                'Vocdoni uses zk-SNARKs, a compact form of zero-knowledge proof. When a voter casts a ballot, the proof shows the vote comes from an eligible voter and is well formed, without linking it to a name or identity.'
              ),
              t(
                'security.zero_knowledge.intro.snark.p2',
                'The proof is small and fast to verify, so the network can confirm millions of ballots are valid without ever learning who is behind them.'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('security.zero_knowledge.grid.eyebrow', 'What this protects')}
        title={t('security.zero_knowledge.grid.title', 'Privacy guarantees that do not depend on trust')}
        columns={2}
        features={[
          {
            icon: EyeOff,
            title: t('security.zero_knowledge.grid.anonymity.title', 'Ballot anonymity'),
            description: t(
              'security.zero_knowledge.grid.anonymity.description',
              'Votes cannot be linked back to the voter, not by us, not by an administrator, not by an attacker.'
            ),
          },
          {
            icon: ShieldOff,
            title: t('security.zero_knowledge.grid.receipt.title', 'Receipt-freeness'),
            description: t(
              'security.zero_knowledge.grid.receipt.description',
              'A voter cannot produce a usable receipt proving how they voted, which removes the basis for vote selling.'
            ),
          },
          {
            icon: Lock,
            title: t('security.zero_knowledge.grid.coercion.title', 'Coercion resistance'),
            description: t(
              'security.zero_knowledge.grid.coercion.description',
              'Because no provable receipt exists, there is far less leverage for anyone trying to pressure a voter.'
            ),
          },
          {
            icon: KeyRound,
            title: t('security.zero_knowledge.grid.eligibility.title', 'Provable eligibility'),
            description: t(
              'security.zero_knowledge.grid.eligibility.description',
              'Each ballot still proves it came from a registered voter, so anonymity never weakens integrity.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('security.zero_knowledge.privacy.eyebrow', 'Secret even from us')}
        title={t('security.zero_knowledge.privacy.title', 'Why we cannot see your vote either')}
        intro={t(
          'security.zero_knowledge.privacy.intro',
          'A common worry is that the platform operator can quietly look at the ballots. With zero-knowledge voting, that is not possible by construction.'
        )}
        blocks={[
          {
            paragraphs: [
              t(
                'security.zero_knowledge.privacy.p1',
                'The link between a voter and their ballot is never stored, because it is never created. The proof attests to eligibility without exposing identity, so there is no hidden table to leak, subpoena, or misuse.'
              ),
              t(
                'security.zero_knowledge.privacy.p2',
                'This is the difference between privacy by policy and privacy by design. We do not promise to behave. The system is built so the information simply is not there to be abused.'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('security.zero_knowledge.faq.eyebrow', 'FAQ')}
        title={t('security.zero_knowledge.faq.title', 'Questions about zero-knowledge voting')}
        items={[
          {
            question: t('security.zero_knowledge.faq.q1.question', 'Do I need to understand cryptography to vote?'),
            answer: t(
              'security.zero_knowledge.faq.q1.answer',
              'No. The proofs are generated and checked automatically. You vote normally, and the zero-knowledge layer protects your privacy in the background.'
            ),
          },
          {
            question: t(
              'security.zero_knowledge.faq.q2.question',
              'If my vote is secret, how can the result be verified?'
            ),
            answer: t(
              'security.zero_knowledge.faq.q2.answer',
              'Secrecy and verifiability are complementary. The proofs let anyone confirm every ballot is valid and the tally is correct, without any single ballot being decrypted or linked to a person.'
            ),
          },
          {
            question: t('security.zero_knowledge.faq.q3.question', 'What is receipt-freeness?'),
            answer: t(
              'security.zero_knowledge.faq.q3.answer',
              'Receipt-freeness means a voter cannot generate convincing proof of how they voted. This protects against vote buying and coercion, since a buyer or coercer cannot confirm compliance.'
            ),
          },
          {
            question: t('security.zero_knowledge.faq.q4.question', 'Can Vocdoni or an administrator see my vote?'),
            answer: t(
              'security.zero_knowledge.faq.q4.answer',
              'No. The connection between voter and ballot is never recorded. There is no internal view, admin override, or backdoor that exposes how an individual voted.'
            ),
          },
        ]}
      />
    </>
  )
}
