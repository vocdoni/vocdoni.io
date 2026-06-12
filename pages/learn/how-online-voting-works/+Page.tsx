import { useTranslation } from 'react-i18next'

import { FaqAccordion, MarketingHero, ProseSection, RelatedLinks, StepList } from '@/components/marketing'

export default function HowOnlineVotingWorksPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('learn.how_online_voting_works.hero.eyebrow', 'Learn')}
        title={t('learn.how_online_voting_works.hero.title', 'How online voting works, step by step')}
        subtitle={t(
          'learn.how_online_voting_works.hero.subtitle',
          'A clear walkthrough of a digital election: who is allowed to vote, how a ballot is filled in and cast, how votes are counted, and how anyone can verify the result without breaking ballot secrecy.'
        )}
        secondaryCta={{ label: t('learn.how_online_voting_works.hero.cta', 'Back to Learn'), href: '/learn' }}
      />

      <ProseSection
        eyebrow={t('learn.how_online_voting_works.intro.eyebrow', 'Overview')}
        title={t('learn.how_online_voting_works.intro.title', 'A vote is a small journey with strong guarantees')}
        intro={t(
          'learn.how_online_voting_works.intro.intro',
          'Good online voting is not just a web form. Every stage is designed so that only eligible people vote, each vote stays secret, the tally cannot be tampered with, and the outcome can be checked by anyone.'
        )}
        blocks={[
          {
            heading: t('learn.how_online_voting_works.intro.census.heading', 'It starts with the census'),
            paragraphs: [
              t(
                'learn.how_online_voting_works.intro.census.p1',
                'The census is the list of eligible voters. Before a vote opens, the organizer defines who can take part and, if needed, how much each vote weighs. The census is committed cryptographically so it cannot be quietly changed once voting begins.'
              ),
              t(
                'learn.how_online_voting_works.intro.census.p2',
                'Voters prove they belong to the census without revealing which entry is theirs. This is what lets the system check eligibility while keeping individual ballots anonymous.'
              ),
            ],
          },
          {
            heading: t('learn.how_online_voting_works.intro.ballot.heading', 'The ballot defines the choice'),
            paragraphs: [
              t(
                'learn.how_online_voting_works.intro.ballot.p1',
                'A ballot can be a simple yes or no, a single choice among candidates, a ranked list, or several questions at once. The rules - how many options, whether abstention counts, how weighting applies - are fixed when the process is created.'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('learn.how_online_voting_works.steps.eyebrow', 'The five stages')}
        title={t('learn.how_online_voting_works.steps.title', 'From eligible voter to verified result')}
        steps={[
          {
            title: t('learn.how_online_voting_works.steps.s1.title', 'Build the census'),
            description: t(
              'learn.how_online_voting_works.steps.s1.description',
              'The organizer uploads or syncs the list of eligible voters and sets any vote weights. The census is committed so its contents are locked in.'
            ),
          },
          {
            title: t('learn.how_online_voting_works.steps.s2.title', 'Open the ballot'),
            description: t(
              'learn.how_online_voting_works.steps.s2.description',
              'The questions, options, and rules are published. Voters receive a secure link or credential to access their ballot from any device.'
            ),
          },
          {
            title: t('learn.how_online_voting_works.steps.s3.title', 'Cast the vote'),
            description: t(
              'learn.how_online_voting_works.steps.s3.description',
              'A voter proves they are on the census, makes their choice, and submits an encrypted ballot. The proof confirms eligibility without linking the ballot to their identity.'
            ),
          },
          {
            title: t('learn.how_online_voting_works.steps.s4.title', 'Count the votes'),
            description: t(
              'learn.how_online_voting_works.steps.s4.description',
              'When voting closes, encrypted ballots are processed and tallied. Because the count is computed over committed data, no one can add, drop, or alter votes unnoticed.'
            ),
          },
          {
            title: t('learn.how_online_voting_works.steps.s5.title', 'Verify the result'),
            description: t(
              'learn.how_online_voting_works.steps.s5.description',
              'The process publishes proofs that let any observer confirm the published result matches the votes that were cast - end-to-end verifiability, without exposing how anyone voted.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('learn.how_online_voting_works.secrecy.eyebrow', 'Two hard problems')}
        title={t(
          'learn.how_online_voting_works.secrecy.title',
          'Keeping votes secret and the count honest, at the same time'
        )}
        blocks={[
          {
            heading: t('learn.how_online_voting_works.secrecy.privacy.heading', 'Ballot secrecy'),
            paragraphs: [
              t(
                'learn.how_online_voting_works.secrecy.privacy.p1',
                'Ballots are encrypted on the voter device and never linked to a name. Even the people running the election cannot see how a given person voted. This protects voters from pressure and retaliation.'
              ),
            ],
          },
          {
            heading: t('learn.how_online_voting_works.secrecy.integrity.heading', 'Tally integrity'),
            paragraphs: [
              t(
                'learn.how_online_voting_works.secrecy.integrity.p1',
                'At the same time, every step produces evidence. Anyone can check that only eligible votes were counted and that the published total is exactly the sum of the ballots cast. Secrecy and verifiability are not a trade-off here - the system delivers both.'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('learn.how_online_voting_works.faq.eyebrow', 'Common questions')}
        title={t('learn.how_online_voting_works.faq.title', 'Questions people ask about online voting')}
        items={[
          {
            question: t('learn.how_online_voting_works.faq.q1.question', 'Can the organizer see how I voted?'),
            answer: t(
              'learn.how_online_voting_works.faq.q1.answer',
              'No. Your ballot is encrypted on your device and is never linked to your identity. The system can confirm you were eligible and that you voted, but not what you chose.'
            ),
          },
          {
            question: t('learn.how_online_voting_works.faq.q2.question', 'How do I know my vote was counted?'),
            answer: t(
              'learn.how_online_voting_works.faq.q2.answer',
              'After casting, you receive a receipt that lets you confirm your ballot was recorded. The published proofs then let anyone check that recorded ballots were included in the final tally.'
            ),
          },
          {
            question: t('learn.how_online_voting_works.faq.q3.question', 'What stops someone voting twice?'),
            answer: t(
              'learn.how_online_voting_works.faq.q3.answer',
              'Eligibility is checked against the committed census, and each census entry can cast only one valid ballot. Double voting is rejected without revealing who anyone is.'
            ),
          },
          {
            question: t('learn.how_online_voting_works.faq.q4.question', 'Do voters need special software?'),
            answer: t(
              'learn.how_online_voting_works.faq.q4.answer',
              'No. Voters use a normal web browser on a phone or computer. The cryptography runs quietly in the background so the experience stays simple.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('learn.how_online_voting_works.related.title', 'Go deeper')}
        links={[
          {
            label: t('learn.how_online_voting_works.related.security.label', 'Election security'),
            href: '/learn/election-security',
            description: t(
              'learn.how_online_voting_works.related.security.desc',
              'The threats online voting is built to resist.'
            ),
          },
          {
            label: t('learn.how_online_voting_works.related.crypto.label', 'Cryptographic voting'),
            href: '/learn/cryptographic-voting',
            description: t(
              'learn.how_online_voting_works.related.crypto.desc',
              'The cryptography that makes verification possible.'
            ),
          },
          {
            label: t('learn.how_online_voting_works.related.guide.label', 'The complete online voting guide'),
            href: '/resources/online-voting-guide',
            description: t(
              'learn.how_online_voting_works.related.guide.desc',
              'A practical pillar guide for organizations.'
            ),
          },
        ]}
      />
    </>
  )
}
