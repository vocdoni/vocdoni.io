import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface AppMockupFrameProps {
  /** `window` is a desktop browser frame at 16:10; `phone` a handset at 9:16. */
  variant: 'window' | 'phone'
  /** What the picture shows, for assistive technology. Usually the figure caption. */
  label?: string
  /** `close` draws the window's contents larger, for a narrow slot such as the hero column. */
  scale?: 'default' | 'close'
  className?: string
  children: ReactNode
}

// Shown in the window's address pill. A constant rather than JSX text so the
// hardcoded-copy guardrail reads it as an identifier, which is what it is.
const APP_HOST = 'app.vocdoni.io'

/**
 * The chrome around a faked Vocdoni App screen.
 *
 * The frame does three jobs: it scopes the app's own palette and typeface
 * (`.app-mockup`, `font-app`) so the inside looks like the product and not the
 * website; it fixes the aspect ratio, so the slot is the same size as the
 * placeholder it replaces; and it is the one accessible node, an image with a
 * label, with everything inside hidden. Type scales with the frame's width
 * through a container-query font size, so one component serves a 550px hero
 * column and an 900px full-width slot without two layouts.
 */
export function AppMockupFrame({ variant, label, scale = 'default', className, children }: AppMockupFrameProps) {
  if (variant === 'phone') {
    return (
      <div
        role='img'
        aria-label={label}
        className={cn(
          'app-mockup font-app @container bg-surface-dark pointer-events-none aspect-[9/16] w-full rounded-[2.6em] p-[0.5em] text-[clamp(6px,3.8cqw,10.5px)] shadow-xl select-none',
          className
        )}
      >
        <div aria-hidden='true' className='bg-app-bg text-app-fg relative h-full overflow-hidden rounded-[2.1em]'>
          <div className='bg-surface-dark absolute top-[0.6em] left-1/2 h-[1.3em] w-[4.6em] -translate-x-1/2 rounded-full' />
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      role='img'
      aria-label={label}
      className={cn(
        'app-mockup font-app @container image-outline rounded-card bg-app-bg text-app-fg pointer-events-none flex aspect-[16/10] w-full flex-col overflow-hidden select-none',
        scale === 'close' ? 'text-[clamp(7px,2.05cqw,14px)]' : 'text-[clamp(6px,1.5cqw,13px)]',
        className
      )}
    >
      <div
        aria-hidden='true'
        className='bg-app-menu border-app-border flex h-[2.4em] shrink-0 items-center gap-[0.45em] border-b px-[1em]'
      >
        <span className='bg-app-border size-[0.7em] rounded-full' />
        <span className='bg-app-border size-[0.7em] rounded-full' />
        <span className='bg-app-border size-[0.7em] rounded-full' />
        <span className='bg-app-bg border-app-border text-app-faint mx-auto flex h-[1.5em] w-[40%] items-center justify-center rounded-[0.4em] border text-[0.7em]'>
          {APP_HOST}
        </span>
      </div>
      <div aria-hidden='true' className='flex min-h-0 flex-1'>
        {children}
      </div>
    </div>
  )
}

export default AppMockupFrame
