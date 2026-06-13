import { BadgeCheck, FileCheck, Headset, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection, RelatedLinks, StatStrip } from '@/components/marketing'

export default function CaseStudyIcoesPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('case_studies.icoes.hero.eyebrow', 'Healthcare colleges')}
        title={t('case_studies.icoes.hero.title', 'How ICOES digitized college elections with full legal cover')}
        subtitle={t(
          'case_studies.icoes.hero.subtitle',
          'The Official College of Nursing of Seville moved its electoral process online with Vocdoni, with an audited technical certification on file.'
        )}
        primaryCta={{
          label: t('case_studies.icoes.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.icoes.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <StatStrip
        stats={[
          {
            value: t('case_studies.icoes.stats.audited_value', 'Audited'),
            label: t('case_studies.icoes.stats.audited_label', 'Technical certification of the telematic vote on file'),
          },
          {
            value: t('case_studies.icoes.stats.verifiable_value', '100%'),
            label: t('case_studies.icoes.stats.verifiable_label', 'Verifiable results'),
          },
          {
            value: t('case_studies.icoes.stats.access_value', 'Remote'),
            label: t('case_studies.icoes.stats.access_label', 'Voting for members who could not travel'),
          },
        ]}
      />

      <ProseSection
        eyebrow={t('case_studies.icoes.story.eyebrow', 'The story')}
        title={t('case_studies.icoes.story.title', 'A trusted electoral process, now online')}
        blocks={[
          {
            heading: t('case_studies.icoes.story.challenge.heading', 'The challenge'),
            paragraphs: [
              t(
                'case_studies.icoes.story.challenge.paragraph_1',
                'As a professional college, ICOES runs statutory elections that have to be reliable and defensible. Running them on paper made participation harder for members who could not attend in person and added operational load for the secretariat.'
              ),
            ],
          },
          {
            heading: t('case_studies.icoes.story.solution.heading', 'The solution'),
            paragraphs: [
              t(
                'case_studies.icoes.story.solution.paragraph_1',
                'ICOES digitized its electoral process with Vocdoni, giving members a telematic ballot with secret voting and verifiable results. The college keeps an audited technical certification of the telematic vote of the assembly on file, so the process can be defended with evidence.'
              ),
            ],
          },
          {
            heading: t('case_studies.icoes.story.result.heading', 'The result'),
            paragraphs: [
              t(
                'case_studies.icoes.story.result.paragraph_1',
                'Participation became easier and the process stayed agile and reliable. As Víctor Bohórquez, president of the Official College of Nursing of Seville, puts it: "Digitizing our voting with Vocdoni has made the entire electoral process more efficient. We have made participation much easier, especially for members who could not travel, while maintaining an agile and reliable system."'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('case_studies.icoes.features.eyebrow', 'What they used')}
        title={t('case_studies.icoes.features.title', 'The building blocks of the ICOES vote')}
        columns={4}
        features={[
          {
            icon: BadgeCheck,
            title: t('case_studies.icoes.features.verifiable.title', 'Verifiable results'),
            description: t(
              'case_studies.icoes.features.verifiable.description',
              'Outcomes anyone can check, backed by an audited technical certification.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('case_studies.icoes.features.privacy.title', 'Secret ballot'),
            description: t(
              'case_studies.icoes.features.privacy.description',
              'Votes stay private by design, even from the platform.'
            ),
          },
          {
            icon: FileCheck,
            title: t('case_studies.icoes.features.legal.title', 'Legal cover'),
            description: t(
              'case_studies.icoes.features.legal.description',
              'An evidence trail aligned with the college statutes and good practice.'
            ),
          },
          {
            icon: Headset,
            title: t('case_studies.icoes.features.support.title', 'Human support'),
            description: t(
              'case_studies.icoes.features.support.description',
              'A team that helps set up and run the vote end to end.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('case_studies.icoes.cta.title', 'Run your college elections with confidence')}
        description={t(
          'case_studies.icoes.cta.description',
          'Start a free vote today, or talk to us about your statutory elections.'
        )}
        primaryCta={{
          label: t('case_studies.icoes.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.icoes.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('case_studies.icoes.related.title', 'Keep exploring')}
        links={[
          {
            label: t('case_studies.icoes.related.solution', 'Online voting for professional colleges'),
            href: '/solutions/professional-colleges',
            description: t('case_studies.icoes.related.solution_desc', 'Statutory votes with total legal cover.'),
          },
          {
            label: t('case_studies.icoes.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('case_studies.icoes.related.verifiability_desc', 'Why results can be checked by anyone.'),
          },
          {
            label: t('case_studies.icoes.related.more', 'More case studies'),
            href: '/case-studies',
            description: t('case_studies.icoes.related.more_desc', 'See how other organizations vote online.'),
          },
        ]}
      />
    </>
  )
}
