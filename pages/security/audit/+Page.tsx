import { useTranslation } from 'react-i18next'

import { MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function AuditPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('security.audit.hero.eyebrow', 'Audits and certifications')}
        title={t('security.audit.hero.title', 'Independent review of how we run elections')}
        subtitle={t(
          'security.audit.hero.subtitle',
          'Open source code can be inspected by anyone, but we also pursue formal review. Here is what has been certified so far and where we are headed next.'
        )}
        primaryCta={{
          label: t('security.audit.hero.cta_primary', 'Talk to our team'),
          href: '/contact',
        }}
        secondaryCta={{
          label: t('security.audit.hero.cta_secondary', 'Back to security overview'),
          href: '/security',
        }}
      />

      <ProseSection
        eyebrow={t('security.audit.current.eyebrow', 'On file today')}
        title={t('security.audit.current.title', 'Certified telematic voting process')}
        intro={t(
          'security.audit.current.intro',
          'Vocdoni issues a technical certification of the telematic voting process: a document that gathers the cryptography used, the configuration, the results, and how to verify them end to end.'
        )}
        blocks={[
          {
            heading: t('security.audit.current.certification.heading', 'A document that proves the vote is correct'),
            paragraphs: [
              t(
                'security.audit.current.certification.p1',
                'For each election, Vocdoni can issue a technical certification of the telematic voting process - a PDF document that brings together the full record of the vote: the cryptography used, the process configuration, the results, and step-by-step instructions to verify them end to end.'
              ),
              t(
                'security.audit.current.certification.p2',
                'It is issued by Vocdoni so that clients and their auditors can independently confirm that everything is correct. Professional colleges and other organizations attach it to the minutes of their general assembly as formal evidence of the process.'
              ),
            ],
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('security.audit.transparency.eyebrow', 'Why certification is only part of it')}
        title={t('security.audit.transparency.title', 'Open code is a standing invitation to audit')}
        intro={t(
          'security.audit.transparency.intro',
          'Certifications are point-in-time snapshots. Open source means the system is open to review continuously, by anyone, not only at audit time.'
        )}
        blocks={[
          {
            paragraphs: [
              t(
                'security.audit.transparency.p1',
                'Because the protocol and software are public, security researchers, integrators, and your own technical staff can examine exactly how votes are cast, recorded, and counted. That ongoing scrutiny complements formal certificates.'
              ),
            ],
          },
        ]}
      />

      <ProseSection
        eyebrow={t('security.audit.future.eyebrow', 'What comes next')}
        title={t('security.audit.future.title', 'Our roadmap for assurance')}
        intro={t(
          'security.audit.future.intro',
          'We are committed to expanding independent assurance over time. We describe these as commitments, not claims, and we will publish results as they are completed.'
        )}
        blocks={[
          {
            bullets: [
              t('security.audit.future.bullet_1', 'Independent penetration tests of the platform and infrastructure'),
              t('security.audit.future.bullet_2', 'Working toward SOC2-aligned controls and reporting'),
              t('security.audit.future.bullet_3', 'Publishing audit summaries so customers can verify our progress'),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('security.audit.related.title', 'Related security topics')}
        links={[
          {
            label: t('security.audit.related.security', 'Security overview'),
            href: '/security',
            description: t('security.audit.related.security_desc', 'All five security pillars in one place.'),
          },
          {
            label: t('security.audit.related.verifiability', 'End-to-end verifiable voting'),
            href: '/security/verifiability',
            description: t('security.audit.related.verifiability_desc', 'How every stage is independently checkable.'),
          },
          {
            label: t('security.audit.related.open_source', 'Open source by default'),
            href: '/security/open-source',
            description: t('security.audit.related.open_source_desc', 'The basis for continuous, public review.'),
          },
          {
            label: t('security.audit.related.compliance', 'Compliance and frameworks'),
            href: '/compliance',
            description: t('security.audit.related.compliance_desc', 'GDPR, eIDAS, ENS, and LSSI in plain terms.'),
          },
        ]}
      />
    </>
  )
}
