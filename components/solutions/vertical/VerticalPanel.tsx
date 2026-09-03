import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const panelVariants = cva('rounded-card', {
  variants: {
    /**
     * How the panel separates itself from the section behind it. One rule keeps
     * it coherent: `raised` only on a tinted section, `outline` and `inset` only
     * on a plain one. A panel never carries a shadow it cannot cast.
     */
    surface: {
      raised: 'bg-background border shadow-sm',
      outline: 'border',
      inset: 'bg-muted/50 border',
      /** One document made of many rows; the 1px gap draws the hairlines. */
      ledger: 'bg-border border grid gap-px overflow-hidden',
    },
    padding: {
      none: '',
      md: 'p-6',
      lg: 'p-6 sm:p-8',
    },
    interactive: {
      true: 'hover:border-primary/40 focus-within:border-primary/40 transition-colors',
      false: '',
    },
  },
  defaultVariants: { surface: 'raised', padding: 'md', interactive: false },
})

type PanelTag = 'div' | 'li' | 'article' | 'section'

export interface VerticalPanelProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof panelVariants> {
  as?: PanelTag
}

/**
 * The page's single card treatment.
 *
 * Before this existed one page carried six different card styles, including a
 * shadow on a transparent box, so the same kind of object looked different in
 * two adjacent sections. Variants make the inconsistency hard to reintroduce
 * and give the nine sibling verticals one surface vocabulary to inherit.
 */
export function VerticalPanel({
  as: Tag = 'div',
  surface,
  padding,
  interactive,
  className,
  ...props
}: VerticalPanelProps) {
  return <Tag className={cn(panelVariants({ surface, padding, interactive }), className)} {...props} />
}

export default VerticalPanel
