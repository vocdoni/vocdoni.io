import { useTranslation } from 'react-i18next'

import { CtaBanner, MarketingHero, ProseSection, RelatedLinks } from '@/components/marketing'

export default function ElectionRulesTemplatePage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('resources.election_rules_template.hero.eyebrow', 'Resources')}
        title={t('resources.election_rules_template.hero.title', 'Election rules template')}
        subtitle={t(
          'resources.election_rules_template.hero.subtitle',
          'A ready-made outline for your voting rules, the reglamento that governs how an election is run. Use it as a starting point and adapt each section to your statutes and the decision at hand.'
        )}
        secondaryCta={{
          label: t('resources.election_rules_template.hero.cta', 'Back to Resources'),
          href: '/resources',
        }}
      />

      <ProseSection
        eyebrow={t('resources.election_rules_template.how.eyebrow', 'How to use this')}
        title={t('resources.election_rules_template.how.title', 'A starting point, not legal advice')}
        intro={t(
          'resources.election_rules_template.how.intro',
          'Copy these sections into your own document and fill in the specifics. The headings cover the decisions every set of voting rules should make explicit. Have your legal advisor review the final version against your statutes.'
        )}
        blocks={[
          {
            heading: t('resources.election_rules_template.how.scope.heading', '1. Scope and legal basis'),
            bullets: [
              t('resources.election_rules_template.how.scope.b1', 'Which body or decision these rules govern'),
              t(
                'resources.election_rules_template.how.scope.b2',
                'The statute or bylaw clauses that authorize electronic voting'
              ),
              t('resources.election_rules_template.how.scope.b3', 'How these rules relate to existing regulations'),
            ],
          },
          {
            heading: t('resources.election_rules_template.how.eligibility.heading', '2. Eligibility and the census'),
            bullets: [
              t(
                'resources.election_rules_template.how.eligibility.b1',
                'Who is entitled to vote and on what date eligibility is fixed'
              ),
              t(
                'resources.election_rules_template.how.eligibility.b2',
                'How the census is compiled, published, and corrected'
              ),
              t('resources.election_rules_template.how.eligibility.b3', 'Any vote weighting and how it is calculated'),
              t(
                'resources.election_rules_template.how.eligibility.b4',
                'Rules for proxies or delegated votes, if allowed'
              ),
            ],
          },
          {
            heading: t('resources.election_rules_template.how.ballot.heading', '3. The ballot and questions'),
            bullets: [
              t(
                'resources.election_rules_template.how.ballot.b1',
                'The questions, candidates, or motions to be decided'
              ),
              t(
                'resources.election_rules_template.how.ballot.b2',
                'Whether voting is single choice, multiple choice, or ranked'
              ),
              t('resources.election_rules_template.how.ballot.b3', 'How abstentions and blank votes are treated'),
            ],
          },
          {
            heading: t('resources.election_rules_template.how.process.heading', '4. Voting process and timeline'),
            bullets: [
              t(
                'resources.election_rules_template.how.process.b1',
                'The opening and closing date and time of the vote'
              ),
              t('resources.election_rules_template.how.process.b2', 'How voters access and cast their ballot'),
              t(
                'resources.election_rules_template.how.process.b3',
                'Whether voting is fully online or hybrid with in-person voting'
              ),
              t('resources.election_rules_template.how.process.b4', 'How privacy and ballot secrecy are guaranteed'),
            ],
          },
          {
            heading: t('resources.election_rules_template.how.quorum.heading', '5. Quorum and thresholds'),
            bullets: [
              t('resources.election_rules_template.how.quorum.b1', 'The quorum required for the vote to be valid'),
              t('resources.election_rules_template.how.quorum.b2', 'The majority needed to carry each decision'),
              t('resources.election_rules_template.how.quorum.b3', 'How ties are resolved'),
            ],
          },
          {
            heading: t(
              'resources.election_rules_template.how.results.heading',
              '6. Results, verification, and appeals'
            ),
            bullets: [
              t('resources.election_rules_template.how.results.b1', 'How and when results are published'),
              t('resources.election_rules_template.how.results.b2', 'How the result can be independently verified'),
              t(
                'resources.election_rules_template.how.results.b3',
                'The process and deadline for challenges or appeals'
              ),
              t('resources.election_rules_template.how.results.b4', 'How records and proofs are archived'),
            ],
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('resources.election_rules_template.tips.eyebrow', 'Guidance')}
        title={t('resources.election_rules_template.tips.title', 'A few things that prevent disputes')}
        blocks={[
          {
            bullets: [
              t(
                'resources.election_rules_template.tips.b1',
                'Fix the eligibility date clearly so there is no argument about who could vote'
              ),
              t(
                'resources.election_rules_template.tips.b2',
                'State the verification method up front so members trust the result'
              ),
              t(
                'resources.election_rules_template.tips.b3',
                'Approve the rules before the notice goes out, not after voting starts'
              ),
              t(
                'resources.election_rules_template.tips.b4',
                'Keep the language plain so every member understands the process'
              ),
            ],
          },
        ]}
      />

      <RelatedLinks
        title={t('resources.election_rules_template.related.title', 'Related resources')}
        links={[
          {
            label: t('resources.election_rules_template.related.guide.label', 'The complete online voting guide'),
            href: '/resources/online-voting-guide',
            description: t(
              'resources.election_rules_template.related.guide.desc',
              'Plan and run your election end to end.'
            ),
          },
          {
            label: t('resources.election_rules_template.related.agm.label', 'Online AGM checklist'),
            href: '/resources/agm-checklist',
            description: t(
              'resources.election_rules_template.related.agm.desc',
              'A checklist for running your assembly.'
            ),
          },
          {
            label: t('resources.election_rules_template.related.glossary.label', 'Voting glossary'),
            href: '/resources/glossary',
            description: t(
              'resources.election_rules_template.related.glossary.desc',
              'Definitions for the terms used here.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('resources.election_rules_template.cta.title', 'Put your rules into practice')}
        description={t(
          'resources.election_rules_template.cta.description',
          'Once your rules are set, run the vote itself for free with an anonymous, verifiable process.'
        )}
        primaryCta={{
          label: t('resources.election_rules_template.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('resources.election_rules_template.cta.secondary', 'Talk to our team'),
          href: '/contact',
        }}
      />
    </>
  )
}
