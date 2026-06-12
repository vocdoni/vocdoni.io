import { BadgeCheck, Building2, ShieldCheck, Vote } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection, RelatedLinks, StatStrip } from '@/components/marketing'

export default function CaseStudyMunicipalPilotPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('case_studies.municipal_pilot.hero.eyebrow', 'Public administration')}
        title={t(
          'case_studies.municipal_pilot.hero.title',
          'How city councils piloted municipal digital voting with guarantees'
        )}
        subtitle={t(
          'case_studies.municipal_pilot.hero.subtitle',
          "A pilot of municipal digital voting with guarantees, with city councils like Bellpuig and La Bisbal d'Empordà giving residents a secure, verifiable way to take part."
        )}
        primaryCta={{
          label: t('case_studies.municipal_pilot.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('case_studies.municipal_pilot.hero.cta_secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <StatStrip
        stats={[
          {
            value: t('case_studies.municipal_pilot.stats.councils_value', 'City councils'),
            label: t('case_studies.municipal_pilot.stats.councils_label', 'Real municipal clients of Vocdoni'),
          },
          {
            value: t('case_studies.municipal_pilot.stats.hybrid_value', 'Hybrid'),
            label: t('case_studies.municipal_pilot.stats.hybrid_label', 'In-person and remote voting'),
          },
          {
            value: t('case_studies.municipal_pilot.stats.verifiable_value', 'Verifiable'),
            label: t('case_studies.municipal_pilot.stats.verifiable_label', 'Results residents can trust'),
          },
        ]}
      />

      <ProseSection
        eyebrow={t('case_studies.municipal_pilot.story.eyebrow', 'The story')}
        title={t('case_studies.municipal_pilot.story.title', 'Municipal voting, digital and with guarantees')}
        blocks={[
          {
            heading: t('case_studies.municipal_pilot.story.challenge.heading', 'The challenge'),
            paragraphs: [
              t(
                'case_studies.municipal_pilot.story.challenge.paragraph_1',
                'City councils want to involve residents in local decisions, but doing so on paper limits participation and makes the process slow to count and hard to verify. They need digital voting that still holds up to scrutiny.'
              ),
            ],
          },
          {
            heading: t('case_studies.municipal_pilot.story.solution.heading', 'The solution'),
            paragraphs: [
              t(
                'case_studies.municipal_pilot.story.solution.paragraph_1',
                'In a pilot of municipal digital voting with guarantees, city councils used Vocdoni to give residents a secure way to vote, with anonymous ballots, instant results, and the option of hybrid in-person and remote participation.'
              ),
            ],
          },
          {
            heading: t('case_studies.municipal_pilot.story.result.heading', 'The result'),
            paragraphs: [
              t(
                'case_studies.municipal_pilot.story.result.paragraph_1',
                'Local participation became easier to run and to trust. Adrià Cortadellas, civic participation officer at La Bisbal d\'Empordà City Council, describes the experience: "Vocdoni powered our Bisbalenc/a de l\'Any vote, boosting citizen participation and delivering transparency, security, and instant results on blockchain. We valued its security, scalability, universal verifiability, and flexibility. In 2023 it also enabled hybrid voting, greatly simplifying the entire process."'
              ),
              t(
                'case_studies.municipal_pilot.story.result.paragraph_2',
                'Jordi Estiarte, mayor of Bellpuig City Council, sees the wider direction: "We chose Vocdoni\'s technology because we believe it is the future of what real elections of any kind should be. Electronic voting is open to everyone and facilitates the process for the citizenry."'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('case_studies.municipal_pilot.features.eyebrow', 'What they used')}
        title={t('case_studies.municipal_pilot.features.title', 'The building blocks of the municipal pilot')}
        columns={4}
        features={[
          {
            icon: BadgeCheck,
            title: t('case_studies.municipal_pilot.features.verifiable.title', 'Verifiable results'),
            description: t(
              'case_studies.municipal_pilot.features.verifiable.description',
              'Universally verifiable outcomes residents can check.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('case_studies.municipal_pilot.features.anonymity.title', 'Secret ballot'),
            description: t(
              'case_studies.municipal_pilot.features.anonymity.description',
              "Anonymous voting that keeps each resident's choice private."
            ),
          },
          {
            icon: Vote,
            title: t('case_studies.municipal_pilot.features.hybrid.title', 'Hybrid voting'),
            description: t(
              'case_studies.municipal_pilot.features.hybrid.description',
              'In-person and remote participation in a single process.'
            ),
          },
          {
            icon: Building2,
            title: t('case_studies.municipal_pilot.features.support.title', 'Support for councils'),
            description: t(
              'case_studies.municipal_pilot.features.support.description',
              'A team that helps run the pilot from setup to results.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('case_studies.municipal_pilot.cta.title', 'Pilot digital voting in your municipality')}
        description={t(
          'case_studies.municipal_pilot.cta.description',
          'Start a free vote today, or talk to us about a municipal pilot with guarantees.'
        )}
        primaryCta={{
          label: t('case_studies.municipal_pilot.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('case_studies.municipal_pilot.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />

      <RelatedLinks
        title={t('case_studies.municipal_pilot.related.title', 'Keep exploring')}
        links={[
          {
            label: t('case_studies.municipal_pilot.related.solution', 'Online voting for public administration'),
            href: '/solutions/public-administration',
            description: t(
              'case_studies.municipal_pilot.related.solution_desc',
              'Verifiable participation for governments and institutions.'
            ),
          },
          {
            label: t('case_studies.municipal_pilot.related.verifiability', 'How verifiability works'),
            href: '/security/verifiability',
            description: t(
              'case_studies.municipal_pilot.related.verifiability_desc',
              'Why results can be checked by anyone.'
            ),
          },
          {
            label: t('case_studies.municipal_pilot.related.more', 'More case studies'),
            href: '/case-studies',
            description: t(
              'case_studies.municipal_pilot.related.more_desc',
              'See how other organizations vote online.'
            ),
          },
        ]}
      />
    </>
  )
}
