import { BadgeCheck, EyeOff, FileCheck, GitBranch, Server, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, RelatedLinks, StepList } from '@/components/marketing'

export default function SecurityPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('security.hub.hero.eyebrow', 'Security')}
        title={t('security.hub.hero.title', 'Trust is not a promise. It is a structural property.')}
        subtitle={t(
          'security.hub.hero.subtitle',
          'Vocdoni is built so that you do not have to take our word for it. Every vote is anonymous, every result is end-to-end verifiable, and the entire stack is open source and hosted in the EU.'
        )}
        primaryCta={{
          label: t('security.hub.hero.cta_primary', 'Start a verifiable vote'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('security.hub.hero.cta_secondary', 'Read our compliance overview'),
          href: '/compliance',
        }}
        bullets={[
          t('security.hub.hero.bullet_1', 'Anonymous by design with zero-knowledge cryptography'),
          t('security.hub.hero.bullet_2', 'End-to-end verifiable results anyone can check'),
          t('security.hub.hero.bullet_3', 'Open source code, hosted in the EU'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('security.hub.pillars.eyebrow', 'Security pillars')}
        title={t('security.hub.pillars.title', 'Five guarantees that hold even if you do not trust us')}
        description={t(
          'security.hub.pillars.description',
          'Each pillar is a property you can inspect, not a policy you have to believe.'
        )}
        columns={3}
        features={[
          {
            icon: EyeOff,
            title: t('security.hub.pillars.anonymity.title', 'Anonymity'),
            description: t(
              'security.hub.pillars.anonymity.description',
              'Zero-knowledge proofs let voters prove eligibility without revealing who they are or how they voted.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('security.hub.pillars.verifiability.title', 'Verifiability'),
            description: t(
              'security.hub.pillars.verifiability.description',
              'Anyone can confirm that votes were cast as intended, recorded as cast, and counted as recorded.'
            ),
          },
          {
            icon: GitBranch,
            title: t('security.hub.pillars.open_source.title', 'Open source'),
            description: t(
              'security.hub.pillars.open_source.description',
              'The full protocol and software are public, so the system can be reviewed and reproduced independently.'
            ),
          },
          {
            icon: Server,
            title: t('security.hub.pillars.eu_hosting.title', 'EU hosting'),
            description: t(
              'security.hub.pillars.eu_hosting.description',
              'Infrastructure runs in the EU under GDPR, with data residency you can rely on.'
            ),
          },
          {
            icon: FileCheck,
            title: t('security.hub.pillars.audits.title', 'Audits'),
            description: t(
              'security.hub.pillars.audits.description',
              'The voting process has passed external technical certification, with more audits planned.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('security.hub.pillars.integrity.title', 'Integrity'),
            description: t(
              'security.hub.pillars.integrity.description',
              'A public, tamper-evident record makes any attempt to alter results immediately detectable.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('security.hub.flow.eyebrow', 'End to end')}
        title={t('security.hub.flow.title', 'How a vote stays secure from start to finish')}
        description={t(
          'security.hub.flow.description',
          'Every stage produces evidence that the next stage, and any observer, can check.'
        )}
        steps={[
          {
            title: t('security.hub.flow.step_1.title', 'Eligible voters are registered'),
            description: t(
              'security.hub.flow.step_1.description',
              'A census of eligible voters is created. Voters later prove they belong to it without revealing their identity.'
            ),
          },
          {
            title: t('security.hub.flow.step_2.title', 'A ballot is cast anonymously'),
            description: t(
              'security.hub.flow.step_2.description',
              'The vote is encrypted on the voter device and submitted with a zero-knowledge proof of eligibility.'
            ),
          },
          {
            title: t('security.hub.flow.step_3.title', 'The vote is recorded publicly'),
            description: t(
              'security.hub.flow.step_3.description',
              'Each ballot lands on a public, append-only bulletin board, so it cannot be removed or altered unnoticed.'
            ),
          },
          {
            title: t('security.hub.flow.step_4.title', 'Results are tallied and proven'),
            description: t(
              'security.hub.flow.step_4.description',
              'The tally is computed from the public record, and anyone can verify that the count matches the votes cast.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('security.hub.related.title', 'Go deeper on each guarantee')}
        links={[
          {
            label: t('security.hub.related.verifiability', 'End-to-end verifiable voting'),
            href: '/security/verifiability',
            description: t(
              'security.hub.related.verifiability_desc',
              'How cast, recorded, and counted are each proven.'
            ),
          },
          {
            label: t('security.hub.related.zero_knowledge', 'Zero-knowledge voting'),
            href: '/security/zero-knowledge',
            description: t('security.hub.related.zero_knowledge_desc', 'Your vote stays secret, even from us.'),
          },
          {
            label: t('security.hub.related.blockchain', 'Blockchain voting platform'),
            href: '/security/blockchain-voting',
            description: t('security.hub.related.blockchain_desc', 'What the blockchain does, and what it does not.'),
          },
          {
            label: t('security.hub.related.audit', 'Audits and certifications'),
            href: '/security/audit',
            description: t('security.hub.related.audit_desc', 'Published audits and our certification on file.'),
          },
          {
            label: t('security.hub.related.open_source', 'Open source by default'),
            href: '/security/open-source',
            description: t('security.hub.related.open_source_desc', 'Why elections should run on public code.'),
          },
          {
            label: t('security.hub.related.compliance', 'Compliance and frameworks'),
            href: '/compliance',
            description: t('security.hub.related.compliance_desc', 'GDPR, eIDAS, ENS, and LSSI in plain terms.'),
          },
        ]}
      />

      <CtaBanner
        title={t('security.hub.cta.title', 'See the guarantees for yourself')}
        description={t(
          'security.hub.cta.description',
          'Run a free, verifiable vote and inspect every step, or talk to us about a high-stakes election.'
        )}
        primaryCta={{
          label: t('security.hub.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('security.hub.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
