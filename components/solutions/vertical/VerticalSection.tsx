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
 * A page section that reports itself once it is half in view. The legal section
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
      { threshold: 0.5 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [sectionId, pageId])

  return (
    <Section ref={ref} id={sectionId} className={cn('scroll-mt-24', className)} {...props}>
      {children}
    </Section>
  )
}

export default VerticalSection
