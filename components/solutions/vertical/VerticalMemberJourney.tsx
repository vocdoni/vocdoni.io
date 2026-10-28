import { useInView, useReducedMotion } from 'motion/react'
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react'

import { MEMBER_SCREEN_COUNT } from '@/components/solutions/mockups/MemberJourneyMockup'
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

/** Long enough to read a step's description (about 45 words) before the next one takes over. */
const DWELL_MS = 8000

/**
 * The member's four steps and the phone that shows each of them, as one
 * object: pick a step and the phone shows that screen, leave it alone and
 * both advance together. The steps are the tabs, so there is no second set
 * of dots under the phone.
 *
 * Rotation runs only while the section is on screen and the phone sits beside
 * the list (lg and up): stacked, advancing would move the phone under the
 * reader. Hover and focus pause it, a click or key press keeps the choice.
 *
 * Readers who prefer reduced motion get no auto-advance and start on the
 * ballot, the one screen that stands on its own.
 */
export function VerticalMemberJourney({ title, steps, footnote, phone }: VerticalMemberJourneyProps) {
  const reducedMotion = useReducedMotion()
  const baseId = useId()
  const ref = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(ref)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [chosen, setChosen] = useState(false)
  const paused = hovered || focused || chosen
  // The phone shows four screens, so rotation cycles over those even when the list is longer.
  const cycle = phone ? Math.min(steps.length, MEMBER_SCREEN_COUNT) : steps.length

  const tabId = (i: number) => `${baseId}-tab-${i}`
  const panelId = `${baseId}-panel`

  useEffect(() => {
    if (reducedMotion) setIndex(2)
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion || paused || !inView || cycle === 0) return
    const wide = window.matchMedia('(min-width: 64rem)')
    let id: number | undefined
    const sync = () => {
      window.clearInterval(id)
      id = wide.matches ? window.setInterval(() => setIndex((current) => (current + 1) % cycle), DWELL_MS) : undefined
    }
    sync()
    wide.addEventListener('change', sync)
    return () => {
      wide.removeEventListener('change', sync)
      window.clearInterval(id)
    }
  }, [reducedMotion, paused, inView, cycle])

  if (steps.length === 0) return null

  const select = (next: number) => {
    setIndex(next)
    setChosen(true)
  }

  const onTablistKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = steps.length - 1
    const moves: Record<string, number | undefined> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    const next = moves[event.key]
    if (next === undefined) return
    event.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <MemberJourneyContext.Provider value={{ index, setIndex }}>
      <div
        ref={ref}
        className='bg-muted/50 rounded-card mt-16 grid gap-10 border p-6 sm:mt-20 sm:p-10 lg:grid-cols-[1fr_minmax(15rem,17rem)] lg:gap-16'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
        }}
      >
        <div>
          {title && <h3 className='text-2xl text-balance sm:text-3xl'>{title}</h3>}

          <div role='tablist' aria-orientation='vertical' className='mt-8 flex flex-col' onKeyDown={onTablistKeyDown}>
            {steps.map((step, i) => {
              const active = i === index
              const done = i < index
              const last = i === steps.length - 1
              return (
                <button
                  key={step.title}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  id={tabId(i)}
                  type='button'
                  role='tab'
                  aria-selected={active}
                  aria-controls={panelId}
                  aria-labelledby={`${baseId}-title-${i}`}
                  aria-describedby={`${baseId}-description-${i}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(i)}
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
                    <span
                      id={`${baseId}-title-${i}`}
                      className={cn('block font-semibold', !active && 'text-muted-foreground')}
                    >
                      {step.title}
                    </span>
                    <span
                      id={`${baseId}-description-${i}`}
                      className={cn(
                        'text-muted-foreground mt-1.5 block text-sm leading-relaxed',
                        !active && 'hidden sm:block sm:line-clamp-1'
                      )}
                    >
                      {step.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {footnote && <p className='text-muted-foreground mt-6 text-sm leading-relaxed'>{footnote}</p>}
        </div>

        <div
          id={panelId}
          role='tabpanel'
          aria-labelledby={tabId(index)}
          className='mx-auto w-full max-w-[15rem] lg:sticky lg:top-24 lg:mx-0 lg:max-w-none lg:self-start'
        >
          {phone}
        </div>
      </div>
    </MemberJourneyContext.Provider>
  )
}

export default VerticalMemberJourney
