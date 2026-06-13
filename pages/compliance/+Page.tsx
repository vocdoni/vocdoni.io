import { FileCheck, Fingerprint, Scale, Server, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FaqAccordion, FeatureGrid, MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function CompliancePage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('compliance.hero.eyebrow', 'Compliance')}
        title={t('compliance.hero.title', 'Built to meet European data and identity rules')}
        subtitle={t(
          'compliance.hero.subtitle',
          'Vocdoni is designed around the frameworks that matter for elections in Europe: GDPR for data protection, eIDAS for identity, and Spanish standards such as ENS and LSSI. Hosting stays in the EU.'
        )}
        primaryCta={{
          label: t('compliance.hero.cta_primary', 'Request a DPA'),
          href: '/contact',
        }}
        secondaryCta={{
          label: t('compliance.hero.cta_secondary', 'See how we secure votes'),
          href: '/security',
        }}
        bullets={[
          t('compliance.hero.bullet_1', 'GDPR compliant and hosted in the EU'),
          t('compliance.hero.bullet_2', 'eIDAS-aligned identity options'),
          t('compliance.hero.bullet_3', 'Data processing addendum available on request'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('compliance.frameworks.eyebrow', 'Frameworks we work within')}
        title={t('compliance.frameworks.title', 'The standards behind a compliant election')}
        description={t(
          'compliance.frameworks.description',
          'Each framework covers a different part of running a lawful, trustworthy vote in the EU.'
        )}
        columns={3}
        features={[
          {
            icon: ShieldCheck,
            title: t('compliance.frameworks.gdpr.title', 'GDPR'),
            description: t(
              'compliance.frameworks.gdpr.description',
              'We process personal data lawfully, minimize what we collect, and support data subject rights across the EU.'
            ),
          },
          {
            icon: Fingerprint,
            title: t('compliance.frameworks.eidas.title', 'eIDAS'),
            description: t(
              'compliance.frameworks.eidas.description',
              'Identity and electronic signature options align with eIDAS, so eligibility can be established to a high standard.'
            ),
          },
          {
            icon: Server,
            title: t('compliance.frameworks.eu_hosting.title', 'EU hosting'),
            description: t(
              'compliance.frameworks.eu_hosting.description',
              'Infrastructure runs in the EU, keeping data residency within the European Union.'
            ),
          },
          {
            icon: FileCheck,
            title: t('compliance.frameworks.ens.title', 'ENS'),
            description: t(
              'compliance.frameworks.ens.description',
              'We follow the Esquema Nacional de Seguridad, the Spanish national security framework for information systems.'
            ),
          },
          {
            icon: Scale,
            title: t('compliance.frameworks.lssi.title', 'LSSI'),
            description: t(
              'compliance.frameworks.lssi.description',
              'Our online services account for the Spanish LSSI rules governing information society and e-commerce services.'
            ),
          },
          {
            icon: FileCheck,
            title: t('compliance.frameworks.dpa.title', 'DPA on request'),
            description: t(
              'compliance.frameworks.dpa.description',
              'A data processing addendum is available on request to formalize roles and obligations under GDPR.'
            ),
          },
        ]}
      />

      <ProseSection
        eyebrow={t('compliance.details.eyebrow', 'In practice')}
        title={t('compliance.details.title', 'How compliance shows up in the product')}
        intro={t(
          'compliance.details.intro',
          'Compliance is not a separate document for us. It is reflected in how data is handled, where it lives, and what we put in writing for you.'
        )}
        blocks={[
          {
            heading: t('compliance.details.data.heading', 'Data protection by design'),
            paragraphs: [
              t(
                'compliance.details.data.p1',
                'Anonymous, zero-knowledge ballots mean we do not hold a link between voters and their choices. Minimizing personal data is the strongest form of GDPR compliance, because what is never collected cannot be exposed.'
              ),
            ],
          },
          {
            heading: t('compliance.details.residency.heading', 'EU data residency'),
            paragraphs: [
              t(
                'compliance.details.residency.p1',
                'Hosting in the EU keeps your election data within the European Union, which simplifies your own obligations around cross-border data transfers.'
              ),
            ],
          },
          {
            heading: t('compliance.details.paperwork.heading', 'The paperwork you need'),
            paragraphs: [
              t(
                'compliance.details.paperwork.p1',
                'For organizations that require formal agreements, a data processing addendum is available on request. It sets out the roles, responsibilities, and safeguards expected under GDPR.'
              ),
            ],
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('compliance.faq.eyebrow', 'FAQ')}
        title={t('compliance.faq.title', 'Questions about compliance')}
        items={[
          {
            question: t('compliance.faq.q1.question', 'Is Vocdoni GDPR compliant?'),
            answer: t(
              'compliance.faq.q1.answer',
              'Yes. We process personal data lawfully and minimize what we collect. Because ballots are private, there is no stored link between a voter and their vote, which strengthens data protection.'
            ),
          },
          {
            question: t('compliance.faq.q2.question', 'Where is my data hosted?'),
            answer: t(
              'compliance.faq.q2.answer',
              'Infrastructure is hosted in the EU, so your election data stays within the European Union and within the scope of EU data protection law.'
            ),
          },
          {
            question: t('compliance.faq.q3.question', 'Can I get a data processing addendum?'),
            answer: t(
              'compliance.faq.q3.answer',
              'Yes. A DPA is available on request. Contact us and we will provide one that formalizes the GDPR roles and safeguards for your organization.'
            ),
          },
          {
            question: t('compliance.faq.q4.question', 'How does Vocdoni handle identity under eIDAS?'),
            answer: t(
              'compliance.faq.q4.answer',
              'We offer identity and electronic signature options aligned with eIDAS, so you can establish voter eligibility to the assurance level your election requires.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('compliance.related.title', 'Related security topics')}
        links={[
          {
            label: t('compliance.related.security', 'Security overview'),
            href: '/security',
            description: t('compliance.related.security_desc', 'The structural guarantees behind every vote.'),
          },
          {
            label: t('compliance.related.audit', 'Audits and certifications'),
            href: '/security/audit',
            description: t('compliance.related.audit_desc', 'Independent review of the voting process.'),
          },
          {
            label: t('compliance.related.zero_knowledge', 'Zero-knowledge voting'),
            href: '/security/zero-knowledge',
            description: t('compliance.related.zero_knowledge_desc', 'How we collect almost no personal data.'),
          },
        ]}
      />
    </>
  )
}
