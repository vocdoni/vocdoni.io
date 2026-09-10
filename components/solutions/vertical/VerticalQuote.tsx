import TestimonialCard from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonial-card'
import type { Testimonial } from '@/lib/testimonials-data'
import { cn } from '@/lib/utils'

/**
 * One testimonial, placed next to the argument it corroborates.
 *
 * Deliberately not a gallery: a wall of organizations the reader has never heard
 * of adds nothing after a named case study, and consecutive proof blocks read as
 * thin evidence dressed up. Quotes work as interruptions inside an argument.
 */
export function VerticalQuote({ testimonial, className }: { testimonial?: Testimonial; className?: string }) {
  if (!testimonial) return null

  return (
    <div className={cn('mx-auto mt-10 max-w-xl', className)}>
      <TestimonialCard testimonial={testimonial} />
    </div>
  )
}

export default VerticalQuote
