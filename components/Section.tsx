import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {}

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn('py-section sm:py-section-md lg:py-section-lg', className)}
      {...props}
    />
  )
}
