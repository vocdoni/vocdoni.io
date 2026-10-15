import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { type ReactNode, useEffect, useState } from 'react'

import { AppMockupFrame, type MockupProduct } from '@/components/solutions/mockups/AppMockupFrame'
import { useMemberJourney } from '@/components/solutions/mockups/journey-context'
import { cn } from '@/lib/utils'

/** Long enough to read a screen, short enough that the last is reached in one scroll pause. */
const DWELL_MS = 3200

export interface PhoneJourneyScreen {
  id: string
  render: () => ReactNode
}

interface PhoneJourneyProps {
  product?: MockupProduct
  /** One screen per step of the list beside the phone, in the same order. */
  screens: PhoneJourneyScreen[]
  /** The screen that stands on its own: where readers who prefer reduced motion start. */
  restIndex?: number
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  className?: string
}

/**
 * A phone cycling through the screens a member actually sees, one per step of
 * the list beside it, so the picture and the prose advance together. Driven by
 * `MemberJourneyContext` when a section provides one; on its own it
 * auto-advances unless the reader prefers reduced motion, and the dots under it
 * always allow picking a screen by hand.
 */
export function PhoneJourney({ product = 'app', screens, restIndex = 0, label, className }: PhoneJourneyProps) {
  const reducedMotion = useReducedMotion()
  const journey = useMemberJourney()
  const [ownIndex, setOwnIndex] = useState(reducedMotion ? restIndex : 0)
  const [paused, setPaused] = useState(false)
  const controlled = journey !== null
  const index = controlled ? journey.index : ownIndex
  const setIndex = controlled ? journey.setIndex : setOwnIndex
  const count = screens.length

  useEffect(() => {
    if (controlled || reducedMotion || paused || count === 0) return
    const id = window.setInterval(() => setOwnIndex((current) => (current + 1) % count), DWELL_MS)
    return () => window.clearInterval(id)
  }, [controlled, reducedMotion, paused, count])

  if (count === 0) return null
  const screen = screens[index % count]

  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AppMockupFrame variant='phone' product={product} label={label}>
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={screen.id}
            className='absolute inset-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            {screen.render()}
          </motion.div>
        </AnimatePresence>
      </AppMockupFrame>

      {/* Step dots, only when the phone is on its own: a driving section has
          the steps themselves as controls. */}
      {!controlled && (
        <div className='flex gap-2' role='tablist'>
          {screens.map((item, i) => (
            <button
              key={item.id}
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
      )}
    </div>
  )
}

export default PhoneJourney
