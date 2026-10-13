import { CircleCheckIcon, MenuIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Logo from '@/components/illustrations/logo'
import { AppMockupFrame } from '@/components/solutions/mockups/AppMockupFrame'
import { AppChoice, AppTabs, AppTag, formatSchedule } from '@/components/solutions/mockups/parts'
import type { MockupFigures, VerticalMockupCopy } from '@/components/solutions/mockups/types'
import { cn } from '@/lib/utils'

/** The four moments of a member's vote, in the order of the page's four steps. */
export type MemberScreen = 'notice' | 'code' | 'ballot' | 'receipt'

const SCREENS: MemberScreen[] = ['notice', 'code', 'ballot', 'receipt']

/** Long enough to read a screen, short enough that the fourth is reached in one scroll pause. */
const DWELL_MS = 3200

interface MemberJourneyMockupProps {
  copy?: VerticalMockupCopy
  figures: MockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  className?: string
}

/**
 * The member's phone, cycling through the four screens the member actually
 * sees: the notice, the one-time code, the ballot and the receipt. One screen
 * per step of the list beside it, so the picture and the prose advance
 * together. Auto-advances unless the reader prefers reduced motion; the dots
 * under the phone always allow picking a screen by hand.
 */
export function MemberJourneyMockup({ copy, figures, label, className }: MemberJourneyMockupProps) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(reducedMotion ? 2 : 0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reducedMotion || paused) return
    const id = window.setInterval(() => setIndex((current) => (current + 1) % SCREENS.length), DWELL_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion, paused])

  if (!copy) return null
  const screen = SCREENS[index]

  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AppMockupFrame variant='phone' label={label}>
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={screen}
            className='absolute inset-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <PhoneScreen screen={screen} copy={copy} figures={figures} />
          </motion.div>
        </AnimatePresence>
      </AppMockupFrame>

      {/* Step dots: numbered like the list beside the phone. */}
      <div className='flex gap-2' role='tablist'>
        {SCREENS.map((item, i) => (
          <button
            key={item}
            type='button'
            role='tab'
            aria-selected={i === index}
            aria-label={String(i + 1)}
            onClick={() => {
              setIndex(i)
              setPaused(true)
            }}
            className={cn(
              'flex size-7 items-center justify-center rounded-full text-xs font-semibold tabular-nums transition-colors',
              i === index ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

function PhoneScreen({
  screen,
  copy,
  figures,
}: {
  screen: MemberScreen
  copy: VerticalMockupCopy
  figures: MockupFigures
}) {
  const { t, i18n } = useTranslation()
  const schedule = formatSchedule(i18n.language, figures.start, figures.end)
  const scheduleText = t('solutions.mockups.app.schedule_range', 'Voting from {{begin}} to {{end}}', schedule)
  const question = copy.questions[0]

  if (screen === 'notice') {
    // The notice, as it lands: the organization's name, the title, the window,
    // and the one link. Drawn as the message itself rather than as the app.
    return (
      <div className='flex h-full flex-col gap-[0.8em] px-[1.1em] pt-[3em] pb-[1em]'>
        <div className='bg-app-muted flex flex-col gap-[0.4em] rounded-[0.8em] p-[0.9em]'>
          <div className='flex items-center gap-[0.5em]'>
            <Logo className='size-[1.6em] shrink-0' />
            <span className='truncate text-[0.75em] font-medium'>{copy.organization}</span>
          </div>
          <p className='text-[1em] leading-snug font-medium text-balance'>{copy.title}</p>
          <p className='text-app-fg-muted text-[0.7em] leading-snug'>{scheduleText}</p>
          <span className='text-app-blue-fg mt-[0.2em] truncate text-[0.7em] underline'>{figures.noticeLink}</span>
        </div>
        <div className='bg-app-muted h-[2.2em] w-[70%] rounded-[0.8em]' />
        <div className='bg-app-muted h-[2.2em] w-[55%] rounded-[0.8em]' />
      </div>
    )
  }

  if (screen === 'code') {
    // The CSP dialog, step 1: title, subtitle, six-box input, "Identify".
    return (
      <div className='flex h-full flex-col px-[1.1em] pt-[3em] pb-[1em]'>
        <PhoneHeader organization={copy.organization} />
        <p className='text-app-faint mt-[1em] text-[1.3em] leading-tight font-medium opacity-40'>{copy.title}</p>
        <div className='bg-app-bg border-app-border mt-[1.4em] flex flex-col gap-[0.9em] rounded-[0.8em] border p-[1em] shadow-xl'>
          <p className='text-[1em] font-medium'>{t('solutions.mockups.app.authentication', 'Authentication')}</p>
          <p className='text-app-fg-muted text-[0.75em] leading-snug'>
            {t('solutions.mockups.app.enter_code', 'Enter the verification code')}
          </p>
          <div className='grid grid-cols-6 gap-[0.35em]'>
            {figures.code.split('').map((digit, i) => (
              <span
                key={i}
                className='border-app-border flex h-[2.4em] items-center justify-center rounded-[0.4em] border text-[1em] font-medium tabular-nums'
              >
                {digit}
              </span>
            ))}
          </div>
          <p className='flex items-center gap-[0.4em] text-[0.7em]'>
            <CircleCheckIcon className='text-app-green-fg size-[1.2em] shrink-0' />
            <span className='truncate'>{t('solutions.mockups.app.code_sent', 'Verification code sent')}</span>
          </p>
          <div className='bg-app-solid text-app-solid-fg flex h-[2.8em] items-center justify-center rounded-[0.5em] text-[0.9em] font-medium'>
            {t('solutions.mockups.app.identify', 'Identify')}
          </div>
        </div>
      </div>
    )
  }

  const voted = screen === 'receipt'
  return (
    <div className='flex h-full flex-col gap-[0.7em] px-[1.1em] pt-[2.8em] pb-[0.9em]'>
      <PhoneHeader organization={copy.organization} />
      <p className='mt-[0.3em] text-[1.3em] leading-tight font-medium text-balance'>{copy.title}</p>
      <div className='flex items-center gap-[0.6em]'>
        <AppTag tone='green'>{t('solutions.mockups.app.ongoing', 'Ongoing')}</AppTag>
        <span className='text-app-faint truncate text-[0.65em] font-medium italic'>{scheduleText}</span>
      </div>

      {voted ? (
        // The inline alert the voter sees after casting: green, centred, with
        // the identifier that lets them verify their own vote.
        <div className='bg-app-green-bg text-app-green-fg flex flex-col gap-[0.4em] rounded-[0.6em] p-[0.9em] text-center'>
          <CircleCheckIcon className='mx-auto size-[1.8em]' />
          <p className='text-[0.85em] leading-snug font-medium'>
            {t('solutions.mockups.app.vote_cast', 'Your vote was successfully cast!')}
          </p>
          <p className='text-[0.7em] leading-snug'>
            {t('solutions.mockups.app.verify_hint', 'To verify your vote, you can use this unique identifier: {{id}}', {
              id: '',
            })}
            <span className='font-mono underline'>{figures.voteId}</span>
          </p>
        </div>
      ) : (
        <AppTabs active='questions' className='w-full *:flex-1 *:text-center' />
      )}

      {question && (
        <div
          className={cn(
            'border-app-border flex flex-col gap-[0.6em] rounded-[0.6em] border p-[0.8em]',
            voted && 'opacity-50'
          )}
        >
          <p className='text-[0.85em] leading-snug font-medium'>{question.title}</p>
          {question.choices.map((choice, i) => (
            <AppChoice key={choice} label={choice} selected={i === figures.selectedChoice} />
          ))}
        </div>
      )}

      {!voted && (
        <div className='bg-app-solid text-app-solid-fg mt-auto flex h-[3em] shrink-0 items-center justify-center rounded-[0.5em] text-[0.95em] font-medium'>
          {t('solutions.mockups.app.vote', 'Vote')}
        </div>
      )}
    </div>
  )
}

function PhoneHeader({ organization }: { organization: string }) {
  return (
    <div className='flex items-center justify-between'>
      <span className='flex min-w-0 items-center gap-[0.5em]'>
        <Logo className='size-[1.6em] shrink-0' />
        <span className='truncate text-[0.75em] font-medium'>{organization}</span>
      </span>
      <span className='bg-app-muted flex size-[1.9em] items-center justify-center rounded-[0.4em]'>
        <MenuIcon className='size-[1em]' />
      </span>
    </div>
  )
}

export default MemberJourneyMockup
