import type { TFunction } from 'i18next'

// Client-safe navigation types + group labels for the knowledge base.
//
// The nav itself is generated from the markdown frontmatter at build time
// (lib/docs/nav.ts) and passed to the client via useData() - so these client
// components never import the markdown glob. Item labels come from each doc's
// frontmatter title; only the group titles stay in i18n (stable taxonomy).

export interface DocsNavItem {
  slug: string
  href: string
  label: string
}
export interface DocsNavGroup {
  id: string
  items: DocsNavItem[]
}
export type DocsNav = DocsNavGroup[]

// Stable group order + ids. New docs slot into a group via frontmatter `group`.
export const DOCS_GROUP_ORDER = ['get_started', 'core_concepts', 'integrator_platform'] as const

// Group titles, resolved with static t() calls so the i18next extractor always
// sees them (dynamic keys would be pruned).
export function navGroupLabels(t: TFunction): Record<string, string> {
  return {
    get_started: t('developers.docs.nav.groups.get_started', 'Get started'),
    core_concepts: t('developers.docs.nav.groups.core_concepts', 'Core concepts'),
    integrator_platform: t('developers.docs.nav.groups.integrator_platform', 'Account & platform'),
  }
}

export const flattenDocsNav = (nav: DocsNav): DocsNavItem[] => nav.flatMap((group) => group.items)
