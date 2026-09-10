import { Eyebrow } from '@/components/Eyebrow'
import { cn } from '@/lib/utils'
import { createElement, type HTMLAttributes, type ReactNode } from 'react'

/**
 * Heading tiers. `display` is the page-opening size; `section` sits a step below
 * it so an h1 keeps its primacy and section headings stop competing with it.
 */
const HEADING_SIZE = {
  display: 'text-4xl sm:text-5xl lg:text-6xl',
  section: 'text-3xl sm:text-4xl lg:text-[2.75rem]',
} as const

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
  /**
   * Heading tier. Defaults to `display` so existing pages are untouched; long
   * pages with many sections should pass `section`.
   */
  size?: keyof typeof HEADING_SIZE
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
  size = 'display',
  titleClassName,
  className,
  ...props
}: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div className={cn('flex flex-col gap-4', centered && 'items-center text-center', className)} {...props}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {createElement(headingLevel, { className: cn(HEADING_SIZE[size], titleClassName) }, title)}
      {lede && <p className={cn('max-w-2xl text-lg text-muted-foreground', centered && 'mx-auto')}>{lede}</p>}
    </div>
  )
}
