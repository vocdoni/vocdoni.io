import { ChevronLeftIcon, CircleHelpIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  DecidimAccordion,
  DecidimButton,
  DecidimChoice,
  DecidimDecorator,
  DecidimField,
  DecidimHeader,
  DecidimMenuBar,
  DecidimNote,
  DecidimSeal,
  DecidimSectionTitle,
  DecidimTrail,
  DecidimVoteTopbar,
  DecidimVotingWindow,
} from '@/components/solutions/mockups/decidim-parts'
import type { DecidimMockupCopy, DecidimMockupFigures } from '@/components/solutions/mockups/decidim-types'
import { PhoneJourney } from '@/components/solutions/mockups/PhoneJourney'

/** The four moments of a member's vote, in the order of the page's four steps. */
export type DecidimVoterScreen = 'election' | 'identify' | 'ballot' | 'receipt'

export const DECIDIM_SCREENS: DecidimVoterScreen[] = ['election', 'identify', 'ballot', 'receipt']

interface DecidimVoterJourneyMockupProps {
  copy?: DecidimMockupCopy
  figures: DecidimMockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  className?: string
}

/**
 * The member's phone, from the election page in their organization's Decidim
 * to the receipt: the page with its Vote button, then the voting page the
 * module serves from the same instance, identifying, choosing, and the
 * receipt code. One screen per step of the list beside it; `PhoneJourney`
 * does the cycling. Under reduced motion it rests on the ballot.
 */
export function DecidimVoterJourneyMockup({ copy, figures, label, className }: DecidimVoterJourneyMockupProps) {
  if (!copy) return null
  return (
    <PhoneJourney
      product='decidim'
      label={label}
      className={className}
      restIndex={2}
      screens={DECIDIM_SCREENS.map((screen) => ({
        id: screen,
        render: () => <Screen screen={screen} copy={copy} figures={figures} />,
      }))}
    />
  )
}

function Screen({
  screen,
  copy,
  figures,
}: {
  screen: DecidimVoterScreen
  copy: DecidimMockupCopy
  figures: DecidimMockupFigures
}) {
  const { t } = useTranslation()
  const question = copy.questions[0]

  if (screen === 'election') {
    // The election page on a phone: header, the bar with the way back to the
    // elections list, the voting window, the title and the questions, and the
    // Vote button pinned to the bottom as the sticky aside places it.
    return (
      <div className='flex h-full flex-col pt-[2.2em]'>
        <DecidimHeader organization={copy.organization} compact />
        <DecidimMenuBar>
          <ChevronLeftIcon className='size-[1.1em]' />
          <span>{t('solutions.mockups.decidim.elections', 'Elections')}</span>
        </DecidimMenuBar>
        <div className='flex min-h-0 flex-1 flex-col gap-[0.9em] overflow-hidden px-[1.1em] pt-[1em]'>
          <DecidimVotingWindow start={figures.start} end={figures.end} className='text-[0.72em]' />
          <div>
            <p className='text-[1.4em] leading-tight font-bold text-balance'>{copy.title}</p>
            <DecidimDecorator />
          </div>
          <p className='text-decidim-ink-soft line-clamp-2 text-[0.85em] leading-snug'>{copy.description}</p>
          <DecidimSectionTitle icon={CircleHelpIcon} className='text-[1.05em]'>
            {t('solutions.mockups.decidim.election_questions', 'Election questions')}
          </DecidimSectionTitle>
          {copy.questions.map((item) => (
            <DecidimAccordion key={item.title} title={item.title} open={false} compact />
          ))}
        </div>
        <div className='border-decidim-rule bg-decidim-page shrink-0 border-t px-[1.1em] py-[0.8em]'>
          <DecidimButton variant='filled' className='w-full'>
            {t('solutions.mockups.decidim.vote', 'Vote')}
          </DecidimButton>
        </div>
      </div>
    )
  }

  // The voting page: the bar across the top, the election's title with its
  // decorator, the trail, and the current step.
  return (
    <div className='flex h-full flex-col pt-[2.2em]'>
      <DecidimVoteTopbar />
      <div className='flex min-h-0 flex-1 flex-col gap-[1em] overflow-hidden px-[1.1em] pt-[1em] pb-[1em]'>
        <div>
          <p className='text-[1.3em] leading-tight font-bold text-balance'>{copy.title}</p>
          <DecidimDecorator />
        </div>

        {screen === 'identify' && (
          <>
            <DecidimTrail current={0} />
            <p className='text-[1.05em] font-semibold'>
              {t('solutions.mockups.decidim.identify_title', 'Identify yourself')}
            </p>
            <p className='line-clamp-3 text-[0.8em] leading-snug'>
              {t(
                'solutions.mockups.decidim.identify_body',
                'To open your ballot we need to check that you are on the census for this election. These details are sent to the voting network, never stored by this website.'
              )}
            </p>
            <DecidimField
              label={t('solutions.mockups.decidim.membership_number', 'Membership number')}
              value={figures.memberNumber}
            />
            <p className='text-[0.9em] font-semibold'>
              {t('solutions.mockups.decidim.send_code_legend', 'Where should we send your code?')}
            </p>
            <DecidimField label={t('solutions.mockups.decidim.email_address', 'Email address')} value={figures.email} />
            <DecidimNote>
              {t(
                'solutions.mockups.decidim.privacy_note',
                'Your identity is used only to prove you may vote. It is never linked to your ballot.'
              )}
            </DecidimNote>
            <div className='border-decidim-rule mt-auto flex items-center justify-between gap-[0.8em] border-t pt-[0.9em]'>
              <DecidimButton variant='quiet' size='sm'>
                {t('solutions.mockups.decidim.cancel', 'Cancel')}
              </DecidimButton>
              <DecidimButton variant='brand' size='sm'>
                {t('solutions.mockups.decidim.continue', 'Continue')}
              </DecidimButton>
            </div>
          </>
        )}

        {screen === 'ballot' && question && (
          <>
            <DecidimTrail current={1} />
            <p className='text-decidim-ink-soft text-[0.78em]'>
              {t('solutions.mockups.decidim.question_counter', 'Question {{current}} of {{total}}', {
                current: 1,
                total: copy.questions.length,
              })}
            </p>
            <p className='-mt-[0.4em] text-[1.1em] leading-snug font-semibold text-balance'>{question.title}</p>
            <p className='text-decidim-ink-soft -mt-[0.4em] text-[0.78em]'>
              {t('solutions.mockups.decidim.pick_one', 'Pick one option.')}
            </p>
            <div className='flex flex-col gap-[0.5em]'>
              {question.choices.map((choice, i) => (
                <DecidimChoice key={choice} label={choice} selected={i === figures.selectedChoice} />
              ))}
            </div>
            <div className='border-decidim-rule mt-auto flex justify-end border-t pt-[0.9em]'>
              <DecidimButton variant='brand' size='sm'>
                {t('solutions.mockups.decidim.next', 'Next')}
              </DecidimButton>
            </div>
          </>
        )}

        {screen === 'receipt' && question && (
          <>
            <DecidimTrail current={3} />
            <div className='flex items-center gap-[0.7em]'>
              <DecidimSeal />
              <p className='text-[1.05em] leading-snug font-semibold text-balance'>
                {t('solutions.mockups.decidim.vote_recorded', 'Your vote was recorded')}
              </p>
            </div>
            <p className='line-clamp-2 text-[0.8em] leading-snug'>
              {t(
                'solutions.mockups.decidim.receipt_body',
                'Each receipt below proves a vote was recorded on the voting network. It does not reveal what you voted.'
              )}
            </p>
            <div className='border-decidim-edge flex flex-col gap-[0.4em] rounded-[0.5em] border p-[0.8em]'>
              <p className='truncate text-[0.85em] font-semibold'>{question.title}</p>
              <p className='text-decidim-ink-soft text-[0.75em]'>
                {t('solutions.mockups.decidim.receipt_code', 'Receipt code')}
              </p>
              <code className='border-decidim-edge bg-decidim-field rounded-[0.3em] border px-[0.6em] py-[0.4em] font-mono text-[0.68em] leading-snug break-all'>
                {figures.receipt}
              </code>
              <DecidimButton variant='quiet' size='sm' className='self-start'>
                {t('solutions.mockups.decidim.copy', 'Copy')}
              </DecidimButton>
            </div>
            <DecidimNote className='line-clamp-3'>
              {t(
                'solutions.mockups.decidim.receipt_return_note',
                'You can see these receipts again at any time by coming back to this election and identifying yourself.'
              )}
            </DecidimNote>
            <div className='border-decidim-rule mt-auto flex border-t pt-[0.9em]'>
              <DecidimButton variant='quiet' size='sm'>
                {t('solutions.mockups.decidim.back_to_election', 'Back to the election')}
              </DecidimButton>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DecidimVoterJourneyMockup
