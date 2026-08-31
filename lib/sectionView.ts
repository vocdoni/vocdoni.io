import { capturePostHogEvent } from '@/lib/posthog'

/**
 * Section ids already reported for this page load. Percentage scroll depth is
 * meaningless on a page whose length varies across eleven locales, so we report
 * which sections were actually reached instead, once each.
 */
const reported = new Set<string>()

export function resetSectionViews(): void {
  reported.clear()
}

export function reportSectionView(sectionId: string, pageId: string): boolean {
  const key = `${pageId}:${sectionId}`
  if (reported.has(key)) return false

  reported.add(key)
  return capturePostHogEvent('section_view', { section_id: sectionId, page_id: pageId })
}
