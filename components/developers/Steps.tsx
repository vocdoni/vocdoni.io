import { cn } from '@/lib/utils'
import * as React from 'react'

interface StepsProps {
  children: React.ReactNode
  className?: string
}

// Vertical numbered steps with a connecting guide line. Compose with <Step>.
export function Steps({ children, className }: StepsProps) {
  const items = React.Children.toArray(children)
  return (
    <ol className={cn('my-6 space-y-6', className)}>
      {items.map((child, index) => (
        <li key={index} className='relative flex gap-4'>
          <div className='flex flex-col items-center'>
            <span className='z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary'>
              {index + 1}
            </span>
            {index < items.length - 1 ? <span className='mt-1 w-px flex-1 bg-border' aria-hidden='true' /> : null}
          </div>
          <div className='min-w-0 flex-1 pb-2'>{child}</div>
        </li>
      ))}
    </ol>
  )
}

interface StepProps {
  title: React.ReactNode
  children?: React.ReactNode
}

export function Step({ title, children }: StepProps) {
  return (
    <div className='space-y-2'>
      <h3 className='mt-1 text-base font-semibold text-foreground'>{title}</h3>
      <div className='text-sm leading-7 text-muted-foreground'>{children}</div>
    </div>
  )
}
