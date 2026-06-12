import { BadgeCheck, ClipboardCheck, FileCheck, ListChecks } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FaqAccordion, FeatureGrid, MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function VerifiabilityPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('security.verifiability.hero.eyebrow', 'Verifiability')}
        title={t('security.verifiability.hero.title', 'End-to-end verifiable voting, explained step by step')}
        subtitle={t(
          'security.verifiability.hero.subtitle',
          'End-to-end verifiable voting means you never have to trust the system. You can check, with cryptographic evidence, that your vote was cast as intended, recorded as cast, and counted as recorded.'
        )}
        primaryCta={{
          label: t('security.verifiability.hero.cta_primary', 'Start a verifiable vote'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('security.verifiability.hero.cta_secondary', 'Back to security overview'),
          href: '/security',
        }}
      />

      <ProseSection
        eyebrow={t('security.verifiability.intro.eyebrow', 'What it means')}
        title={t('security.verifiability.intro.title', 'Three guarantees behind every verifiable election')}
        intro={t(
          'security.verifiability.intro.intro',
          'End-to-end verifiable voting breaks trust into three checkable claims. Each one closes a gap where a traditional system would simply ask you to believe it.'
        )}
        blocks={[
          {
            heading: t('security.verifiability.intro.cast.heading', 'Cast as intended'),
            paragraphs: [
              t(
                'security.verifiability.intro.cast.p1',
                'When you submit a ballot, you receive a verifiable confirmation that the encrypted vote really contains the choice you made. The encryption happens on your own device, so the selection that leaves your screen is the one you picked.'
              ),
            ],
          },
          {
            heading: t('security.verifiability.intro.recorded.heading', 'Recorded as cast'),
            paragraphs: [
              t(
                'security.verifiability.intro.recorded.p1',
                'Your encrypted ballot is published to a public, append-only record with a unique reference. You can look it up and confirm that the system stored exactly what you sent, with nothing changed and nothing dropped.'
              ),
            ],
          },
          {
            heading: t('security.verifiability.intro.counted.heading', 'Counted as recorded'),
            paragraphs: [
              t(
                'security.verifiability.intro.counted.p1',
                'The final tally is derived from the public record, accompanied by a cryptographic proof. Anyone, including independent observers, can recompute the result and confirm the count matches the recorded votes.'
              ),
            ],
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('security.verifiability.example.eyebrow', 'A worked example')}
        title={t('security.verifiability.example.title', 'Following one ballot from screen to result')}
        intro={t(
          'security.verifiability.example.intro',
          'Imagine an association electing a new board. Here is how a single member, Ana, can verify her own vote without revealing it to anyone.'
        )}
        blocks={[
          {
            heading: t('security.verifiability.example.step1.heading', '1. Ana votes'),
            paragraphs: [
              t(
                'security.verifiability.example.step1.p1',
                'Ana selects her candidate. Her device encrypts the choice and shows her a verification value she can use to confirm the ballot encodes exactly what she picked.'
              ),
            ],
          },
          {
            heading: t('security.verifiability.example.step2.heading', '2. The ballot is published'),
            paragraphs: [
              t(
                'security.verifiability.example.step2.p1',
                'The encrypted ballot appears on the public bulletin board with a reference. Ana looks it up and sees her ballot is present and unmodified, recorded as cast.'
              ),
            ],
          },
          {
            heading: t('security.verifiability.example.step3.heading', '3. The result is proven'),
            paragraphs: [
              t(
                'security.verifiability.example.step3.p1',
                'When voting closes, the tally is published with a proof. Ana, or anyone else, can verify that the published result is the correct count of all recorded ballots, counted as recorded.'
              ),
            ],
            bullets: [
              t('security.verifiability.example.step3.bullet_1', 'Ana never reveals her choice to verify it'),
              t('security.verifiability.example.step3.bullet_2', 'No central authority can quietly change the outcome'),
              t('security.verifiability.example.step3.bullet_3', 'Any discrepancy is detectable by any observer'),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('security.verifiability.grid.eyebrow', 'Why it matters')}
        title={t('security.verifiability.grid.title', 'What end-to-end verifiability gives your organization')}
        columns={2}
        features={[
          {
            icon: ClipboardCheck,
            title: t('security.verifiability.grid.individual.title', 'Individual verifiability'),
            description: t(
              'security.verifiability.grid.individual.description',
              'Each voter can confirm their own ballot was correctly cast and recorded.'
            ),
          },
          {
            icon: ListChecks,
            title: t('security.verifiability.grid.universal.title', 'Universal verifiability'),
            description: t(
              'security.verifiability.grid.universal.description',
              'Anyone can verify that the published result correctly counts all recorded ballots.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('security.verifiability.grid.disputes.title', 'Fewer disputes'),
            description: t(
              'security.verifiability.grid.disputes.description',
              'A proof that anyone can check leaves little room for contested or repeated counts.'
            ),
          },
          {
            icon: FileCheck,
            title: t('security.verifiability.grid.evidence.title', 'A defensible record'),
            description: t(
              'security.verifiability.grid.evidence.description',
              'You finish every election with public, durable evidence that the outcome is correct.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('security.verifiability.faq.eyebrow', 'FAQ')}
        title={t('security.verifiability.faq.title', 'Questions about verifiable voting')}
        items={[
          {
            question: t('security.verifiability.faq.q1.question', 'Does verifying my vote reveal how I voted?'),
            answer: t(
              'security.verifiability.faq.q1.answer',
              'No. Verification works on encrypted data and cryptographic proofs. You can confirm your ballot was cast and recorded correctly without ever disclosing your choice.'
            ),
          },
          {
            question: t(
              'security.verifiability.faq.q2.question',
              'What is the difference between individual and universal verifiability?'
            ),
            answer: t(
              'security.verifiability.faq.q2.answer',
              'Individual verifiability lets each voter check their own ballot. Universal verifiability lets anyone check that the final tally is the correct count of all recorded ballots. Vocdoni provides both.'
            ),
          },
          {
            question: t('security.verifiability.faq.q3.question', 'Do I need technical skills to verify a vote?'),
            answer: t(
              'security.verifiability.faq.q3.answer',
              'No. The checks are built into the tools, and the underlying data is public, so independent experts or observers can also run the verification on your behalf.'
            ),
          },
          {
            question: t('security.verifiability.faq.q4.question', 'What happens if the result does not verify?'),
            answer: t(
              'security.verifiability.faq.q4.answer',
              'A failed verification is itself the alarm. Because the record and proofs are public, any inconsistency between recorded ballots and the published tally is immediately detectable.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('security.verifiability.related.title', 'Related security topics')}
        links={[
          {
            label: t('security.verifiability.related.security', 'Security overview'),
            href: '/security',
            description: t('security.verifiability.related.security_desc', 'All five security pillars in one place.'),
          },
          {
            label: t('security.verifiability.related.zero_knowledge', 'Zero-knowledge voting'),
            href: '/security/zero-knowledge',
            description: t(
              'security.verifiability.related.zero_knowledge_desc',
              'How verifiability and secrecy coexist.'
            ),
          },
          {
            label: t('security.verifiability.related.audit', 'Audits and certifications'),
            href: '/security/audit',
            description: t('security.verifiability.related.audit_desc', 'Independent review of the voting process.'),
          },
        ]}
      />
    </>
  )
}
