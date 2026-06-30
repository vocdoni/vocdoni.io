import { Link } from '@/components/Link'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import * as React from 'react'

interface CardGridProps {
  children: React.ReactNode
  className?: string
  // Columns at the large breakpoint. Defaults to 2.
  columns?: 2 | 3
}

export function CardGrid({ children, className, columns = 2 }: CardGridProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2', className)}>
      {children}
    </div>
  )
}

interface DocCardProps {
  href: string
  title: React.ReactNode
  description?: React.ReactNode
  icon?: LucideIcon
  eyebrow?: React.ReactNode
  external?: boolean
}

// Linked card used on the landing and section indexes. All copy is passed in.
export function DocCard({ href, title, description, icon: Icon, eyebrow, external }: DocCardProps) {
  return (
    <Card className='group h-full border-border/60 transition-all duration-300 hover:border-primary/40 hover:shadow-md'>
      <Link
        href={href}
        variant='unstyled'
        target={external ? '_blank' : undefined}
        className='flex h-full flex-col gap-3 p-5'
      >
        {Icon ? (
          <span className='inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
            <Icon className='size-5' aria-hidden='true' />
          </span>
        ) : null}
        {eyebrow ? <span className='text-xs font-medium uppercase tracking-wide text-primary'>{eyebrow}</span> : null}
        <div className='flex items-center gap-1.5 text-base font-semibold text-foreground'>
          {title}
          <ArrowRight className='size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary' />
        </div>
        {description ? <p className='text-sm leading-relaxed text-muted-foreground'>{description}</p> : null}
      </Link>
    </Card>
  )
}
