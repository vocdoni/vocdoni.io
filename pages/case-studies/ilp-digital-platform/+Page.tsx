import { BadgeCheck, FileSignature, Landmark, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection, RelatedLinks, StatStrip } from '@/components/marketing'

export default function CaseStudyIlpDigitalPlatformPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('case_studies.ilp.hero.eyebrow', 'Public administration')}
        title={t('case_studies.ilp.hero.title', 'How the ILP digital platform supports citizen initiatives')}
        subtitle={t(
          'case_studies.ilp.hero.subtitle',
          'Plataforma Digital Vocdoni for the iniciativa legislativa popular brings digital signature collection to citizen-led legislative projects.'
        )}
        primaryCta={{
          label: t('case_studies.ilp.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.ilp.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <StatStrip
        stats={[
          {
            value: t('case_studies.ilp.stats.citizen_value', 'Citizen-led'),
            label: t('case_studies.ilp.stats.citizen_label', 'Legislative initiative platform'),
          },
          {
            value: t('case_studies.ilp.stats.digital_value', 'Digital'),
            label: t('case_studies.ilp.stats.digital_label', 'Signature collection'),
          },
          {
            value: t('case_studies.ilp.stats.verifiable_value', 'Verifiable'),
            label: t('case_studies.ilp.stats.verifiable_label', 'Process you can audit'),
          },
        ]}
      />

      <ProseSection
        eyebrow={t('case_studies.ilp.story.eyebrow', 'The story')}
        title={t('case_studies.ilp.story.title', 'Bringing citizen initiatives into the digital age')}
        blocks={[
          {
            heading: t('case_studies.ilp.story.challenge.heading', 'The challenge'),
            paragraphs: [
              t(
                'case_studies.ilp.story.challenge.paragraph_1',
                'A citizen initiative, or iniciativa legislativa popular, depends on collecting and validating signatures at scale. Doing this on paper is slow, hard to verify, and difficult to manage across a whole territory.'
              ),
            ],
          },
          {
            heading: t('case_studies.ilp.story.solution.heading', 'The solution'),
            paragraphs: [
              t(
                'case_studies.ilp.story.solution.paragraph_1',
                'The Plataforma Digital Vocdoni for the ILP supports digital signature collection for citizen-led legislative projects, positioning Vocdoni for public-administration use with a verifiable, auditable process.'
              ),
            ],
          },
          {
            heading: t('case_studies.ilp.story.result.heading', 'The result'),
            paragraphs: [
              t(
                'case_studies.ilp.story.result.paragraph_1',
                'Citizen initiatives gain a digital path that is easier to take part in and straightforward to audit, helping public participation move online with the right guarantees.'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('case_studies.ilp.features.eyebrow', 'What it offers')}
        title={t('case_studies.ilp.features.title', 'The building blocks of the ILP platform')}
        columns={4}
        features={[
          {
            icon: FileSignature,
            title: t('case_studies.ilp.features.signatures.title', 'Digital signature collection'),
            description: t(
              'case_studies.ilp.features.signatures.description',
              'Citizens support an initiative digitally, at scale.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('case_studies.ilp.features.verifiable.title', 'Verifiable process'),
            description: t(
              'case_studies.ilp.features.verifiable.description',
              'An auditable trail that can be checked independently.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('case_studies.ilp.features.privacy.title', 'Privacy by design'),
            description: t(
              'case_studies.ilp.features.privacy.description',
              'Personal data handled with privacy at the core.'
            ),
          },
          {
            icon: Landmark,
            title: t('case_studies.ilp.features.public.title', 'Built for public use'),
            description: t(
              'case_studies.ilp.features.public.description',
              'Positioned for public-administration and citizen participation.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('case_studies.ilp.cta.title', 'Bring citizen participation online')}
        description={t(
          'case_studies.ilp.cta.description',
          'Start a free vote today, or talk to us about a public-administration project.'
        )}
        primaryCta={{
          label: t('case_studies.ilp.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.ilp.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('case_studies.ilp.related.title', 'Keep exploring')}
        links={[
          {
            label: t('case_studies.ilp.related.solution', 'Online voting for public administration'),
            href: '/solutions/public-administration',
            description: t(
              'case_studies.ilp.related.solution_desc',
              'Verifiable participation for governments and institutions.'
            ),
          },
          {
            label: t('case_studies.ilp.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('case_studies.ilp.related.verifiability_desc', 'Why results can be checked by anyone.'),
          },
          {
            label: t('case_studies.ilp.related.more', 'More case studies'),
            href: '/case-studies',
            description: t('case_studies.ilp.related.more_desc', 'See how other organizations vote online.'),
          },
        ]}
      />
    </>
  )
}
