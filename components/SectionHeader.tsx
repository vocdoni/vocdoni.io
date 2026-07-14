import { Eyebrow } from '@/components/Eyebrow'
import { cn } from '@/lib/utils'
import { createElement, type HTMLAttributes, type ReactNode } from 'react'

interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Uppercase label rendered above the heading with the signal dot. */
  eyebrow?: ReactNode
  /** Section heading text. */
  title: ReactNode
  /** Muted paragraph rendered under the heading. */
  lede?: ReactNode
  /** Heading element for the document outline. Defaults to h2. */
  headingLevel?: 'h1' | 'h2' | 'h3'
  /** Horizontal alignment of the whole header block. Defaults to center. */
  align?: 'center' | 'left'
  /** Extra classes for the heading element (e.g. size overrides). */
  titleClassName?: string
}

/**
 * Standard section opener: eyebrow, display heading, and an optional lede,
 * following the shared section rhythm.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  headingLevel = 'h2',
  align = 'center',
  titleClassName,
  className,
  ...props
}: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div className={cn('flex flex-col gap-4', centered && 'items-center text-center', className)} {...props}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {createElement(headingLevel, { className: cn('text-4xl sm:text-5xl lg:text-6xl', titleClassName) }, title)}
      {lede && <p className={cn('max-w-2xl text-lg text-muted-foreground', centered && 'mx-auto')}>{lede}</p>}
    </div>
  )
}
