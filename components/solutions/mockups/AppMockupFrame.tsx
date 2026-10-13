import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Which product the frame scopes: the app's palette and typeface, or Decidim's. */
export type MockupProduct = 'app' | 'decidim'

interface AppMockupFrameProps {
  /** `window` is a desktop browser frame at 16:10; `phone` a handset at 9:16. */
  variant: 'window' | 'phone'
  product?: MockupProduct
  /** What the picture shows, for assistive technology. Usually the figure caption. */
  label?: string
  /** `close` draws the window's contents larger, for a narrow slot such as the hero column. */
  scale?: 'default' | 'close'
  className?: string
  children: ReactNode
}

// The classes that make the inside read as one product or the other, and the
// host shown in the window's address pill: a constant rather than JSX text so
// the hardcoded-copy guardrail reads it as an identifier, which is what it is.
// Decidim is the organization's own instance, so its host is a placeholder.
const PRODUCT = {
  app: {
    scope: 'app-mockup font-app',
    screen: 'bg-app-bg text-app-fg',
    chrome: 'bg-app-menu border-app-border',
    dot: 'bg-app-border',
    pill: 'bg-app-bg border-app-border text-app-faint',
    host: 'app.vocdoni.io',
  },
  decidim: {
    scope: 'decidim-mockup font-decidim',
    screen: 'bg-decidim-page text-decidim-ink',
    chrome: 'bg-decidim-panel border-decidim-rule',
    dot: 'bg-decidim-rule',
    pill: 'bg-decidim-page border-decidim-rule text-decidim-ink-soft',
    host: 'decidim.example.org',
  },
} as const

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
export function AppMockupFrame({
  variant,
  product = 'app',
  label,
  scale = 'default',
  className,
  children,
}: AppMockupFrameProps) {
  const look = PRODUCT[product]
  if (variant === 'phone') {
    return (
      <div
        role='img'
        aria-label={label}
        className={cn(look.scope, '@container pointer-events-none aspect-[9/16] w-full select-none', className)}
      >
        <div
          aria-hidden='true'
          className='bg-surface-dark h-full w-full rounded-[2.6em] p-[0.5em] text-[clamp(6px,3.8cqw,10.5px)] shadow-xl'
        >
          <div className={cn(look.screen, 'relative h-full overflow-hidden rounded-[2.1em]')}>
            <div className='bg-surface-dark absolute top-[0.6em] left-1/2 h-[1.3em] w-[4.6em] -translate-x-1/2 rounded-full' />
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      role='img'
      aria-label={label}
      className={cn(
        look.scope,
        look.screen,
        '@container image-outline rounded-card pointer-events-none flex aspect-[16/10] w-full flex-col overflow-hidden select-none',
        className
      )}
    >
      <div
        aria-hidden='true'
        className={cn(
          'flex min-h-0 flex-1 flex-col',
          scale === 'close' ? 'text-[clamp(7px,2.05cqw,14px)]' : 'text-[clamp(6px,1.5cqw,13px)]'
        )}
      >
        <div className={cn(look.chrome, 'flex h-[2.4em] shrink-0 items-center gap-[0.45em] border-b px-[1em]')}>
          <span className={cn(look.dot, 'size-[0.7em] rounded-full')} />
          <span className={cn(look.dot, 'size-[0.7em] rounded-full')} />
          <span className={cn(look.dot, 'size-[0.7em] rounded-full')} />
          <span
            className={cn(
              look.pill,
              'mx-auto flex h-[1.5em] w-[40%] items-center justify-center rounded-[0.4em] border text-[0.7em]'
            )}
          >
            {look.host}
          </span>
        </div>
        <div className='flex min-h-0 flex-1'>{children}</div>
      </div>
    </div>
  )
}

export default AppMockupFrame
