import { useReducedMotion } from 'motion/react'
import { type ReactNode, useEffect, useState } from 'react'

import { MemberJourneyContext } from '@/components/solutions/mockups/journey-context'
import type { VerticalItem } from '@/components/solutions/vertical/types'
import { cn } from '@/lib/utils'

interface VerticalMemberJourneyProps {
  title?: string
  steps: VerticalItem[]
  footnote?: string
  /** The member's phone, a `MemberJourneyMockup`: it reads the active step from context. */
  phone?: ReactNode
}

/** Long enough to read a step's description before the next one takes over. */
const DWELL_MS = 5000

/**
 * The member's four steps and the phone that shows each of them, as one
 * object: pick a step and the phone shows that screen, leave it alone and
 * both advance together. The steps are the controls, so there is no second
 * set of dots under the phone.
 *
 * Readers who prefer reduced motion get no auto-advance and start on the
 * ballot, the one screen that stands on its own.
 */
export function VerticalMemberJourney({ title, steps, footnote, phone }: VerticalMemberJourneyProps) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(reducedMotion ? 2 : 0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reducedMotion || paused || steps.length === 0) return
    const id = window.setInterval(() => setIndex((current) => (current + 1) % steps.length), DWELL_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion, paused, steps.length])

  if (steps.length === 0) return null

  return (
    <MemberJourneyContext.Provider value={{ index, setIndex }}>
      <div
        className='bg-muted/50 rounded-card mt-16 grid gap-10 border p-6 sm:mt-20 sm:p-10 lg:grid-cols-[1fr_minmax(15rem,17rem)] lg:gap-16'
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div>
          {title && <h3 className='text-2xl text-balance sm:text-3xl'>{title}</h3>}

          <ol className='mt-8 flex flex-col' role='tablist' aria-orientation='vertical'>
            {steps.map((step, i) => {
              const active = i === index
              const done = i < index
              const last = i === steps.length - 1
              return (
                <li key={step.title}>
                  <button
                    type='button'
                    role='tab'
                    aria-selected={active}
                    onClick={() => {
                      setIndex(i)
                      setPaused(true)
                    }}
                    className={cn(
                      'grid w-full grid-cols-[2.25rem_1fr] gap-x-4 rounded-xl px-3 pt-3 text-left transition-colors sm:px-4 sm:pt-4',
                      active ? 'bg-background shadow-sm' : 'hover:bg-background/60',
                      last ? 'pb-3 sm:pb-4' : 'pb-1'
                    )}
                  >
                    {/* Number, and the connector running from it to the next
                        number. The connector lives in the same column as the
                        circle, so it is centred under it whatever the padding. */}
                    <span className='flex flex-col items-center gap-1.5' aria-hidden='true'>
                      <span
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums transition-colors',
                          active && 'bg-primary text-primary-foreground',
                          done && 'bg-primary/15 text-primary',
                          !active && !done && 'bg-background text-muted-foreground border'
                        )}
                      >
                        {i + 1}
                      </span>
                      {!last && <span className={cn('w-px grow rounded-full', done ? 'bg-primary/30' : 'bg-border')} />}
                    </span>
                    <span className={cn('min-w-0 pt-1.5', last ? 'pb-0' : 'pb-4')}>
                      <span className={cn('block font-semibold', !active && 'text-muted-foreground')}>
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          'text-muted-foreground mt-1.5 block text-sm leading-relaxed',
                          !active && 'hidden sm:block sm:line-clamp-1'
                        )}
                      >
                        {step.description}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          {footnote && <p className='text-muted-foreground mt-6 text-sm leading-relaxed'>{footnote}</p>}
        </div>

        <div className='mx-auto w-full max-w-[15rem] lg:sticky lg:top-24 lg:mx-0 lg:max-w-none lg:self-start'>
          {phone}
        </div>
      </div>
    </MemberJourneyContext.Provider>
  )
}

export default VerticalMemberJourney
