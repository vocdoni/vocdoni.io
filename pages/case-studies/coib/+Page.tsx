import { BadgeCheck, Headset, ShieldCheck, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection, RelatedLinks, StatStrip } from '@/components/marketing'

export default function CaseStudyCoibPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('case_studies.coib.hero.eyebrow', 'Healthcare colleges')}
        title={t('case_studies.coib.hero.title', 'How COIB ran its assembly online for around 180,000 members')}
        subtitle={t(
          'case_studies.coib.hero.subtitle',
          'The Official College of Nurses of Barcelona moved its junta general online with Vocdoni, with instant and verifiable results.'
        )}
        primaryCta={{
          label: t('case_studies.coib.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.coib.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <StatStrip
        stats={[
          {
            value: t('case_studies.coib.stats.members_value', '180,000'),
            label: t('case_studies.coib.stats.members_label', 'Members able to participate'),
          },
          {
            value: t('case_studies.coib.stats.results_value', 'Instant'),
            label: t('case_studies.coib.stats.results_label', 'Verifiable vote count'),
          },
          {
            value: t('case_studies.coib.stats.access_value', 'Anywhere'),
            label: t('case_studies.coib.stats.access_label', 'Members vote from any device'),
          },
        ]}
      />

      <ProseSection
        eyebrow={t('case_studies.coib.story.eyebrow', 'The story')}
        title={t('case_studies.coib.story.title', 'A large membership, one trusted assembly')}
        blocks={[
          {
            heading: t('case_studies.coib.story.challenge.heading', 'The challenge'),
            paragraphs: [
              t(
                'case_studies.coib.story.challenge.paragraph_1',
                'With around 180,000 members, the Official College of Nurses of Barcelona needed a way to run its junta general that let everyone participate from anywhere, without compromising on secrecy or on the integrity of the count.'
              ),
            ],
          },
          {
            heading: t('case_studies.coib.story.solution.heading', 'The solution'),
            paragraphs: [
              t(
                'case_studies.coib.story.solution.paragraph_1',
                'COIB ran its assembly online with Vocdoni. Members could exercise their rights from any device, with anonymous ballots and a count that anyone could verify, all backed by responsive technical support.'
              ),
            ],
          },
          {
            heading: t('case_studies.coib.story.result.heading', 'The result'),
            paragraphs: [
              t(
                'case_studies.coib.story.result.paragraph_1',
                'The process was agile, transparent, and reliable. As Lluis Serrat i Andreu, head of projects at the Official College of Nurses of Barcelona, explains: "At the Official College of Nurses of Barcelona, we trust Vocdoni for all our participatory processes, ensuring members can exercise their rights from anywhere. We especially value the immediate vote count, the simplicity of the system, and the fast, effective response and guidance from its technical support, which makes the entire process agile, transparent, and reliable."'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('case_studies.coib.features.eyebrow', 'What they used')}
        title={t('case_studies.coib.features.title', 'The building blocks of the COIB assembly')}
        columns={4}
        features={[
          {
            icon: BadgeCheck,
            title: t('case_studies.coib.features.verifiable.title', 'Verifiable results'),
            description: t(
              'case_studies.coib.features.verifiable.description',
              'An immediate count that members and auditors can check.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('case_studies.coib.features.anonymity.title', 'Secret ballot'),
            description: t(
              'case_studies.coib.features.anonymity.description',
              'Anonymous voting that protects how every member votes.'
            ),
          },
          {
            icon: Users,
            title: t('case_studies.coib.features.scale.title', 'Voting at scale'),
            description: t(
              'case_studies.coib.features.scale.description',
              'A system that supports a very large membership without friction.'
            ),
          },
          {
            icon: Headset,
            title: t('case_studies.coib.features.support.title', 'Human support'),
            description: t(
              'case_studies.coib.features.support.description',
              'Fast, effective guidance before and during the vote.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('case_studies.coib.cta.title', 'Run your assembly online with confidence')}
        description={t(
          'case_studies.coib.cta.description',
          'Start a free vote today, or talk to us about your junta general.'
        )}
        primaryCta={{
          label: t('case_studies.coib.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.coib.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('case_studies.coib.related.title', 'Keep exploring')}
        links={[
          {
            label: t('case_studies.coib.related.solution', 'Online voting for professional colleges'),
            href: '/solutions/professional-colleges',
            description: t('case_studies.coib.related.solution_desc', 'Statutory votes with total legal cover.'),
          },
          {
            label: t('case_studies.coib.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t('case_studies.coib.related.verifiability_desc', 'Why results can be checked by anyone.'),
          },
          {
            label: t('case_studies.coib.related.more', 'More case studies'),
            href: '/case-studies',
            description: t('case_studies.coib.related.more_desc', 'See how other organizations vote online.'),
          },
        ]}
      />
    </>
  )
}
