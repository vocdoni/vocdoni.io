import { cn } from '@/lib/utils'
import { forwardRef, type HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {}

export const Section = forwardRef<HTMLElement, SectionProps>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn('py-section sm:py-section-md lg:py-section-lg', className)} {...props} />
))

Section.displayName = 'Section'
