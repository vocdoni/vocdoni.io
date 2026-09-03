import { capturePostHogEvent } from '@/lib/posthog'

/**
 * Sections already reported, keyed by the path they were reported from.
 *
 * Percentage scroll depth is meaningless on a page whose length varies across
 * eleven locales, so we report which sections were actually reached instead,
 * once each.
 *
 * The path is part of the key on purpose. This set lives for as long as the tab
 * does, and the site routes on the client: without the path, reading the
 * Spanish page after the English one would report nothing the second time,
 * because the section ids and the page id are identical across locales.
 */
const reported = new Set<string>()

export function reportSectionView(sectionId: string, pageId: string): boolean {
  if (typeof window === 'undefined') return false

  const key = `${window.location.pathname}:${pageId}:${sectionId}`
  if (reported.has(key)) return false

  reported.add(key)
  return capturePostHogEvent('section_view', { section_id: sectionId, page_id: pageId })
}
