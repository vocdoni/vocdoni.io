import { useTranslation } from 'react-i18next'

import { CtaBanner, MarketingHero, ProseSection, RelatedLinks, StatStrip } from '@/components/marketing'

export default function CaseStudiesHubPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('case_studies.hub.hero.eyebrow', 'Case studies')}
        title={t('case_studies.hub.hero.title', 'How real organizations vote online with Vocdoni')}
        subtitle={t(
          'case_studies.hub.hero.subtitle',
          'From professional colleges to city councils, see how teams run verifiable elections their members can trust. Every story is a real Vocdoni project.'
        )}
        primaryCta={{
          label: t('case_studies.hub.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.hub.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <StatStrip
        stats={[
          {
            value: t('case_studies.hub.stats.votes_value', '200,000+'),
            label: t('case_studies.hub.stats.votes_label', 'Votes processed across organizations'),
          },
          {
            value: t('case_studies.hub.stats.verifiable_value', '100%'),
            label: t('case_studies.hub.stats.verifiable_label', 'Universally verifiable results'),
          },
          {
            value: t('case_studies.hub.stats.sectors_value', '5'),
            label: t('case_studies.hub.stats.sectors_label', 'Sectors already voting with Vocdoni'),
          },
        ]}
      />

      <ProseSection
        eyebrow={t('case_studies.hub.proof.eyebrow', 'Proof you can check')}
        title={t('case_studies.hub.proof.title', 'Trust built on evidence, not promises')}
        intro={t(
          'case_studies.hub.proof.intro',
          'Each organization below moved a high-stakes vote online without giving up control, privacy, or legal certainty.'
        )}
        blocks={[
          {
            heading: t('case_studies.hub.proof.block_1.heading', 'Results anyone can verify'),
            paragraphs: [
              t(
                'case_studies.hub.proof.block_1.paragraph_1',
                'Every vote produces an audit trail and a result that members, auditors, and boards can verify independently. Outcomes are not something you have to take on faith.'
              ),
            ],
          },
          {
            heading: t('case_studies.hub.proof.block_2.heading', 'Privacy that holds up'),
            paragraphs: [
              t(
                'case_studies.hub.proof.block_2.paragraph_1',
                'Ballots stay secret by design, even from us. Organizations get transparency on the count without exposing how any single member voted.'
              ),
            ],
          },
          {
            heading: t('case_studies.hub.proof.block_3.heading', 'Support through the whole process'),
            paragraphs: [
              t(
                'case_studies.hub.proof.block_3.paragraph_1',
                'Teams that have run hundreds of elections help with the census, the configuration, and the live vote, so secretariats are never left on their own.'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('case_studies.hub.related.title', 'Explore the case studies')}
        links={[
          {
            label: t('case_studies.hub.related.icoes', 'ICOES college elections'),
            href: '/case-studies/icoes',
            description: t(
              'case_studies.hub.related.icoes_desc',
              'How the nursing college of Seville digitized its electoral process.'
            ),
          },
          {
            label: t('case_studies.hub.related.coib', 'COIB online assembly'),
            href: '/case-studies/coib',
            description: t(
              'case_studies.hub.related.coib_desc',
              'A junta general for around 180,000 nurses, with instant verifiable results.'
            ),
          },
          {
            label: t('case_studies.hub.related.ccv', 'CCV SuperNodes channel'),
            href: '/case-studies/ccv-supernodes',
            description: t(
              'case_studies.hub.related.ccv_desc',
              'Partner-led distribution that brings Vocdoni to more organizations.'
            ),
          },
          {
            label: t('case_studies.hub.related.ilp', 'ILP digital platform'),
            href: '/case-studies/ilp-digital-platform',
            description: t(
              'case_studies.hub.related.ilp_desc',
              'A citizen-initiative platform for public-administration use.'
            ),
          },
          {
            label: t('case_studies.hub.related.municipal', 'Municipal voting pilot'),
            href: '/case-studies/municipal-pilot',
            description: t(
              'case_studies.hub.related.municipal_desc',
              'A pilot of municipal digital voting with guarantees.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('case_studies.hub.cta.title', 'Want a result like these?')}
        description={t(
          'case_studies.hub.cta.description',
          'Run a free vote today, or talk to us about your election and we will help you plan it.'
        )}
        primaryCta={{
          label: t('case_studies.hub.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('case_studies.hub.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
