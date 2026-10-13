import { CircleCheckIcon, MenuIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Logo from '@/components/illustrations/logo'
import { AppMockupFrame } from '@/components/solutions/mockups/AppMockupFrame'
import { AppChoice, AppTabs, AppTag, formatSchedule } from '@/components/solutions/mockups/parts'
import type { MockupFigures, VerticalMockupCopy } from '@/components/solutions/mockups/types'

interface MemberBallotMockupProps {
  copy?: VerticalMockupCopy
  figures: MockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  className?: string
}

/**
 * The member's phone: the public voting page as vocdoni-app renders it (title,
 * status, schedule, pill tabs, choice cards, the black "Vote" button), with the
 * two moments around it layered on top - the one-time code arriving before,
 * and the receipt with its verifiable identifier after. One still frame that
 * covers "from the notice to the receipt" without a carousel.
 */
export function MemberBallotMockup({ copy, figures, label, className }: MemberBallotMockupProps) {
  const { t, i18n } = useTranslation()
  if (!copy) return null

  const question = copy.questions[0]
  const schedule = formatSchedule(i18n.language, figures.start, figures.end)

  return (
    <AppMockupFrame variant='phone' label={label} className={className}>
      <div className='flex h-full flex-col gap-[0.7em] px-[1.1em] pt-[2.8em] pb-[0.9em]'>
        <div className='flex items-center justify-between'>
          <span className='flex min-w-0 items-center gap-[0.5em]'>
            <Logo className='size-[1.6em] shrink-0' />
            <span className='truncate text-[0.75em] font-medium'>{copy.organization}</span>
          </span>
          <span className='bg-app-muted flex size-[1.9em] items-center justify-center rounded-[0.4em]'>
            <MenuIcon className='size-[1em]' />
          </span>
        </div>

        {/* Before: the one-time code, as the toast and the six-box input show it. */}
        <div className='bg-app-bg border-app-border flex flex-col gap-[0.5em] rounded-[0.6em] border p-[0.7em] shadow-lg'>
          <p className='flex items-center gap-[0.4em] text-[0.7em] font-medium'>
            <CircleCheckIcon className='text-app-green-fg size-[1.2em] shrink-0' />
            <span className='truncate'>{t('solutions.mockups.app.code_sent', 'Verification code sent')}</span>
          </p>
          <div className='grid grid-cols-6 gap-[0.35em]'>
            {figures.code.split('').map((digit, index) => (
              <span
                key={index}
                className='border-app-border flex h-[2em] items-center justify-center rounded-[0.4em] border text-[0.9em] font-medium tabular-nums'
              >
                {digit}
              </span>
            ))}
          </div>
        </div>

        <p className='mt-[0.3em] text-[1.3em] leading-tight font-medium text-balance'>{copy.title}</p>

        <div className='flex items-center gap-[0.6em]'>
          <AppTag tone='green'>{t('solutions.mockups.app.ongoing', 'Ongoing')}</AppTag>
          <span className='text-app-faint truncate text-[0.65em] font-medium italic'>
            {t('solutions.mockups.app.schedule_range', 'Voting from {{begin}} to {{end}}', schedule)}
          </span>
        </div>

        <AppTabs active='questions' className='w-full *:flex-1 *:text-center' />

        {question && (
          <div className='border-app-border flex flex-col gap-[0.6em] rounded-[0.6em] border p-[0.8em]'>
            <p className='text-[0.85em] leading-snug font-medium'>{question.title}</p>
            {question.choices.map((choice, index) => (
              <AppChoice key={choice} label={choice} selected={index === figures.selectedChoice} />
            ))}
          </div>
        )}

        <div className='bg-app-solid text-app-solid-fg mt-auto flex h-[3em] shrink-0 items-center justify-center rounded-[0.5em] text-[0.95em] font-medium'>
          {t('solutions.mockups.app.vote', 'Vote')}
        </div>
      </div>

      {/* After: the receipt, with the identifier the member keeps. */}
      <div className='bg-app-green-bg text-app-green-fg absolute inset-x-[0.9em] bottom-[4.6em] rounded-[0.6em] p-[0.8em] shadow-lg'>
        <p className='text-[0.75em] leading-snug font-medium'>
          {t('solutions.mockups.app.vote_cast', 'Your vote was successfully cast!')}
        </p>
        <p className='mt-[0.4em] text-[0.65em] leading-snug'>
          {t('solutions.mockups.app.verify_hint', 'To verify your vote, you can use this unique identifier: {{id}}', {
            id: '',
          })}
          <span className='font-mono underline'>{figures.voteId}</span>
        </p>
      </div>
    </AppMockupFrame>
  )
}

export default MemberBallotMockup
