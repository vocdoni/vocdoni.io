import { EyeOff, FileSearch, Fingerprint, Lock, ShieldAlert, UserCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FaqAccordion, FeatureGrid, MarketingHero, ProseSection } from '@/components/marketing'

export default function ElectionSecurityPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('learn.election_security.hero.eyebrow', 'Learn')}
        title={t(
          'learn.election_security.hero.title',
          'Election security: the threats and how online voting answers them'
        )}
        subtitle={t(
          'learn.election_security.hero.subtitle',
          'Elections face pressure from coercion, ballot stuffing, tampering, and disputes over the count. Modern online voting meets each of these with privacy, verifiability, and tamper-evidence built into the process.'
        )}
        secondaryCta={{ label: t('learn.election_security.hero.cta', 'Back to Learn'), href: '/learn' }}
      />

      <ProseSection
        eyebrow={t('learn.election_security.threats.eyebrow', 'The threat model')}
        title={t('learn.election_security.threats.title', 'What can actually go wrong in an election')}
        intro={t(
          'learn.election_security.threats.intro',
          'Security is not abstract. It means defending against specific, well-understood ways an election can be undermined. The first step is to name them.'
        )}
        blocks={[
          {
            heading: t('learn.election_security.threats.coercion.heading', 'Coercion and vote buying'),
            paragraphs: [
              t(
                'learn.election_security.threats.coercion.p1',
                'If someone can prove how they voted, they can be pressured or paid to vote a certain way. Strong elections make it impossible to produce such proof, so a coerced voter cannot demonstrate compliance.'
              ),
            ],
          },
          {
            heading: t('learn.election_security.threats.stuffing.heading', 'Ballot stuffing and double voting'),
            paragraphs: [
              t(
                'learn.election_security.threats.stuffing.p1',
                'Adding fake ballots or letting people vote more than once distorts the result. Eligibility checks against a committed census, with one valid ballot per voter, close this gap.'
              ),
            ],
          },
          {
            heading: t('learn.election_security.threats.tampering.heading', 'Tampering with the count'),
            paragraphs: [
              t(
                'learn.election_security.threats.tampering.p1',
                'A dishonest insider or a compromised server could try to change totals. When the count is computed over committed data and backed by public proofs, any alteration becomes detectable.'
              ),
            ],
          },
          {
            heading: t('learn.election_security.threats.disputes.heading', 'Disputed results'),
            paragraphs: [
              t(
                'learn.election_security.threats.disputes.p1',
                'Even an honest count is worthless if people do not trust it. Verifiable elections replace "trust us" with evidence anyone can check, which removes most grounds for dispute.'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('learn.election_security.defenses.eyebrow', 'The defenses')}
        title={t('learn.election_security.defenses.title', 'Three properties that make an election trustworthy')}
        description={t(
          'learn.election_security.defenses.description',
          'Modern online voting does not rely on a single safeguard. These properties reinforce each other so that no single point of failure can compromise the vote.'
        )}
        columns={3}
        features={[
          {
            icon: EyeOff,
            title: t('learn.election_security.defenses.privacy.title', 'Privacy'),
            description: t(
              'learn.election_security.defenses.privacy.description',
              'Ballots are unlinkable from voters, so no one can be coerced, bought, or punished for how they voted.'
            ),
          },
          {
            icon: FileSearch,
            title: t('learn.election_security.defenses.verifiability.title', 'Verifiability'),
            description: t(
              'learn.election_security.defenses.verifiability.description',
              'Voters can check their ballot was recorded, and anyone can check the result matches the votes cast.'
            ),
          },
          {
            icon: ShieldAlert,
            title: t('learn.election_security.defenses.tamper.title', 'Tamper-evidence'),
            description: t(
              'learn.election_security.defenses.tamper.description',
              'Any change to the census, ballots, or tally leaves a visible trace, so manipulation cannot stay hidden.'
            ),
          },
          {
            icon: UserCheck,
            title: t('learn.election_security.defenses.eligibility.title', 'Eligibility enforcement'),
            description: t(
              'learn.election_security.defenses.eligibility.description',
              'Only voters on the committed census can cast a valid ballot, and only once each.'
            ),
          },
          {
            icon: Lock,
            title: t('learn.election_security.defenses.secrecy.title', 'Ballot secrecy'),
            description: t(
              'learn.election_security.defenses.secrecy.description',
              'Ballots are encrypted end to end, so even operators cannot read individual votes.'
            ),
          },
          {
            icon: Fingerprint,
            title: t('learn.election_security.defenses.audit.title', 'Independent audit'),
            description: t(
              'learn.election_security.defenses.audit.description',
              'Open data and open source let third parties audit the process without trusting the vendor.'
            ),
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('learn.election_security.online.eyebrow', 'Paper versus verifiable online')}
        title={t('learn.election_security.online.title', 'Where online voting can do better than paper')}
        blocks={[
          {
            paragraphs: [
              t(
                'learn.election_security.online.p1',
                'Paper voting hides ballots in a box and asks you to trust the people counting them. A small number of observers see part of the process, and recounts are slow and contestable.'
              ),
              t(
                'learn.election_security.online.p2',
                'Verifiable online voting flips this. The ballot stays secret, but the evidence is public. Instead of trusting a handful of officials, every voter and observer can independently confirm the outcome. Done right, this is not less secure than paper - it is more accountable.'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('learn.election_security.faq.eyebrow', 'Security questions')}
        title={t('learn.election_security.faq.title', 'What people worry about, answered')}
        items={[
          {
            question: t('learn.election_security.faq.q1.question', 'Is online voting safe from hackers?'),
            answer: t(
              'learn.election_security.faq.q1.answer',
              'A verifiable system does not ask you to assume the servers are honest. Even if infrastructure were attacked, tampering with the census, ballots, or tally would break the published proofs and be detected.'
            ),
          },
          {
            question: t('learn.election_security.faq.q2.question', 'How is coercion prevented if I vote from home?'),
            answer: t(
              'learn.election_security.faq.q2.answer',
              'Because you cannot produce a convincing proof of how you voted, a coercer has no way to verify compliance. This property is called receipt-freeness, and it removes the incentive to pressure voters.'
            ),
          },
          {
            question: t('learn.election_security.faq.q3.question', 'What if the voting company itself is malicious?'),
            answer: t(
              'learn.election_security.faq.q3.answer',
              'With open source software and public verification data, you do not have to trust the vendor. Independent parties can audit the code and the proofs, so honesty is demonstrated, not assumed.'
            ),
          },
        ]}
      />
    </>
  )
}
