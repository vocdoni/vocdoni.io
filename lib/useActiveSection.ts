import { useIsClient } from '@/lib/useIsClient'
import { useEffect, useState } from 'react'

/**
 * Hook to detect which section is currently visible using Intersection Observer
 * SSR safe: only runs on client
 */
export function useActiveSection(sectionCount: number) {
  const isClient = useIsClient()
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    if (!isClient) return
    const sectionEls = Array.from({ length: sectionCount }, (_, i) => document.getElementById(`section-${i}`))
    if (sectionEls.some((el) => !el)) return

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          const index = sectionEls.findIndex((el) => el === visible[0].target)
          if (index !== -1) setActiveSection(index)
        }
      },
      {
        threshold: 0.5, // Section is considered active if 50% visible
      }
    )
    sectionEls.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [isClient, sectionCount])

  return activeSection
}
