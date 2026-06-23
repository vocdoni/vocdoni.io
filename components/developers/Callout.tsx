import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Info, Lightbulb, ShieldAlert, TriangleAlert } from 'lucide-react'
import * as React from 'react'

const calloutVariants = cva('my-6 flex gap-3 rounded-xl border p-4 text-sm leading-6', {
  variants: {
    variant: {
      note: 'border-border/70 bg-muted/40 text-foreground',
      tip: 'border-primary/25 bg-primary/5 text-foreground',
      warning: 'border-warning/30 bg-warning/10 text-foreground',
      danger: 'border-destructive/30 bg-destructive/10 text-foreground',
    },
  },
  defaultVariants: { variant: 'note' },
})

const iconClass = {
  note: 'text-muted-foreground',
  tip: 'text-primary',
  warning: 'text-warning',
  danger: 'text-destructive',
} as const

const icons = {
  note: Info,
  tip: Lightbulb,
  warning: TriangleAlert,
  danger: ShieldAlert,
} as const

interface CalloutProps extends VariantProps<typeof calloutVariants> {
  title?: React.ReactNode
  children: React.ReactNode
  className?: string
}

// Admonition block (note / tip / warning / danger). Title and body come from
// the page content object, so no hardcoded copy lives here.
export function Callout({ variant = 'note', title, children, className }: CalloutProps) {
  const key = (variant ?? 'note') as keyof typeof icons
  const Icon = icons[key]

  return (
    <div className={cn(calloutVariants({ variant }), className)} role='note'>
      <Icon className={cn('mt-0.5 size-5 shrink-0', iconClass[key])} aria-hidden='true' />
      <div className='min-w-0 space-y-1'>
        {title ? <p className='font-semibold text-foreground'>{title}</p> : null}
        <div className='text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_code]:rounded [&_code]:bg-background/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]'>
          {children}
        </div>
      </div>
    </div>
  )
}
