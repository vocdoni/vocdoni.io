import * as React from 'react'

import { Section } from '@/components/Section'
import { cn } from '@/lib/utils'
import { reportSectionView } from '@/lib/sectionView'

interface VerticalSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Stable id reported to analytics and usable as a deep link anchor. */
  sectionId: string
  /** Page the section belongs to, so one event stream covers every vertical. */
  pageId: string
}

/**
 * A page section that reports itself once it reaches the middle of the screen.
 * The legal section
 * is the one worth watching: what share of readers reach it, and what share
 * reach it and keep going, is readable at low traffic where an A/B test is not.
 *
 * Sections carry a real `id`, so a general secretary can send their lawyer a
 * link straight to the part that matters.
 */
export function VerticalSection({ sectionId, pageId, children, className, ...props }: VerticalSectionProps) {
  const ref = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reportSectionView(sectionId, pageId)
          observer.disconnect()
        }
      },
      // Not `threshold: 0.5`: a section taller than twice the viewport can never
      // reach that ratio, which on a phone is every long section on this page -
      // legal validity and the comparison table included, the two the event
      // exists to measure. Collapsing the root to its horizontal midline
      // reports a section once it crosses the middle of the screen, at any height.
      { threshold: 0, rootMargin: '-50% 0px -50% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [sectionId, pageId])

  return (
    <Section ref={ref} id={sectionId} className={cn('scroll-mt-[3.25rem] xl:scroll-mt-[1.5rem]', className)} {...props}>
      {children}
    </Section>
  )
}

export default VerticalSection
