import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  /** Adds a soft halo ring around the signal dot. */
  withHalo?: boolean
}

/**
 * Small uppercase label that precedes section headings, marked by a signal dot.
 * The signal yellow is reserved for these dots - never for larger surfaces.
 */
export function Eyebrow({ withHalo = false, className, children, ...props }: EyebrowProps) {
  return (
    <span className={cn('eyebrow', className)} {...props}>
      <span className={cn('eyebrow-dot', withHalo && 'eyebrow-dot-halo')} aria-hidden='true' />
      {children}
    </span>
  )
}
