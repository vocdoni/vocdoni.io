import { useTranslation } from 'react-i18next'

import { CtaBanner, MarketingHero, ProseSection } from '@/components/marketing'

export default function AgmChecklistPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('resources.agm_checklist.hero.eyebrow', 'Resources')}
        title={t('resources.agm_checklist.hero.title', 'The online AGM checklist')}
        subtitle={t(
          'resources.agm_checklist.hero.subtitle',
          'A practical checklist for running an annual general meeting online: what to prepare beforehand, how to run voting on the day, and how to close out cleanly with a verifiable, minute-ready result.'
        )}
        secondaryCta={{ label: t('resources.agm_checklist.hero.cta', 'Back to Resources'), href: '/resources' }}
      />

      <ProseSection
        eyebrow={t('resources.agm_checklist.before.eyebrow', 'Before the meeting')}
        title={t('resources.agm_checklist.before.title', 'Weeks ahead: get the foundations right')}
        intro={t(
          'resources.agm_checklist.before.intro',
          'Most AGM problems are avoidable with preparation. Work through these items well before the notice period closes.'
        )}
        blocks={[
          {
            heading: t('resources.agm_checklist.before.rules.heading', 'Confirm the rules and notice'),
            bullets: [
              t('resources.agm_checklist.before.rules.b1', 'Check your statutes allow electronic and remote voting'),
              t('resources.agm_checklist.before.rules.b2', 'Confirm the quorum required for valid decisions'),
              t(
                'resources.agm_checklist.before.rules.b3',
                'Send the formal notice and agenda within the required period'
              ),
              t('resources.agm_checklist.before.rules.b4', 'Decide whether the meeting is fully online or hybrid'),
            ],
          },
          {
            heading: t('resources.agm_checklist.before.census.heading', 'Prepare the census and motions'),
            bullets: [
              t('resources.agm_checklist.before.census.b1', 'Compile an up-to-date list of members eligible to vote'),
              t('resources.agm_checklist.before.census.b2', 'Apply any vote weighting and proxy rules'),
              t('resources.agm_checklist.before.census.b3', 'Finalize each motion and its voting options'),
              t('resources.agm_checklist.before.census.b4', 'Run a pilot vote with the board to test the flow'),
            ],
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('resources.agm_checklist.during.eyebrow', 'On the day')}
        title={t('resources.agm_checklist.during.title', 'During the meeting: run voting smoothly')}
        blocks={[
          {
            heading: t('resources.agm_checklist.during.open.heading', 'Open and verify attendance'),
            bullets: [
              t('resources.agm_checklist.during.open.b1', 'Confirm quorum is met before any binding vote'),
              t('resources.agm_checklist.during.open.b2', 'Share clear instructions for accessing each ballot'),
              t('resources.agm_checklist.during.open.b3', 'Have a support channel ready for members who need help'),
            ],
          },
          {
            heading: t('resources.agm_checklist.during.vote.heading', 'Run each vote'),
            bullets: [
              t('resources.agm_checklist.during.vote.b1', 'Open one motion at a time and read it aloud'),
              t('resources.agm_checklist.during.vote.b2', 'Give a clear, announced window to cast each vote'),
              t('resources.agm_checklist.during.vote.b3', 'Watch turnout against quorum and remind stragglers'),
              t('resources.agm_checklist.during.vote.b4', 'Show the verifiable result before moving on'),
            ],
          },
        ]}
      />

      <ProseSection
        eyebrow={t('resources.agm_checklist.after.eyebrow', 'After the meeting')}
        title={t('resources.agm_checklist.after.title', 'Closing out: record and archive')}
        blocks={[
          {
            heading: t('resources.agm_checklist.after.record.heading', 'Capture the outcome'),
            bullets: [
              t('resources.agm_checklist.after.record.b1', 'Record each result and the turnout in the minutes'),
              t('resources.agm_checklist.after.record.b2', 'Save the verification proofs alongside the minutes'),
              t('resources.agm_checklist.after.record.b3', 'Notify members of the decisions taken'),
              t('resources.agm_checklist.after.record.b4', 'Archive the census and audit record for future reference'),
            ],
          },
        ]}
      />

      <CtaBanner
        title={t('resources.agm_checklist.cta.title', 'Run your AGM vote for free')}
        description={t(
          'resources.agm_checklist.cta.description',
          'Set up an anonymous, verifiable vote for your assembly in minutes. No credit card needed to start.'
        )}
        primaryCta={{
          label: t('resources.agm_checklist.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('resources.agm_checklist.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />
    </>
  )
}
