import type { TFunction } from 'i18next'

// Single source of truth for the knowledge-base navigation: order, slugs and
// hrefs (non-translatable). Group titles and item labels live in i18n under
// `developers.docs.nav` (retrieved with returnObjects) and are joined by id/slug
// in DocsSidebar. This also drives breadcrumbs and the previous/next pager.

export type DocsNavItem = { slug: string; href: string }
export type DocsNavGroup = { id: string; items: DocsNavItem[] }

export const DOCS_NAV: DocsNavGroup[] = [
  {
    id: 'get_started',
    items: [
      { slug: 'overview', href: '/developers/docs' },
      { slug: 'quickstart', href: '/developers/docs/quickstart' },
      { slug: 'authentication', href: '/developers/docs/authentication' },
      { slug: 'sdks_and_tools', href: '/developers/docs/sdks-and-tools' },
    ],
  },
  {
    id: 'core_concepts',
    items: [
      { slug: 'organizations', href: '/developers/docs/organizations' },
      { slug: 'members_and_groups', href: '/developers/docs/members-and-groups' },
      { slug: 'census', href: '/developers/docs/census' },
      { slug: 'voting_processes', href: '/developers/docs/voting-processes' },
      { slug: 'results', href: '/developers/docs/results' },
      { slug: 'jobs', href: '/developers/docs/jobs' },
    ],
  },
  {
    id: 'integrator_platform',
    items: [
      { slug: 'managed_organizations', href: '/developers/docs/managed-organizations' },
      { slug: 'api_keys', href: '/developers/docs/api-keys' },
      { slug: 'quotas_and_subscriptions', href: '/developers/docs/quotas-and-subscriptions' },
    ],
  },
  {
    id: 'api_reference',
    items: [{ slug: 'api_reference', href: '/developers/docs/api-reference' }],
  },
]

// Flattened reading order, used for the previous/next pager.
export const DOCS_NAV_FLAT: DocsNavItem[] = DOCS_NAV.flatMap((group) => group.items)

export type DocsNavLabels = {
  groups: Record<string, string>
  items: Record<string, string>
}

// Group titles and item labels, resolved with static t() calls so the i18next
// extractor always sees them (dynamic keys would be pruned). Mirrors the
// buildResourcesItems pattern used in the navbar.
export function navLabels(t: TFunction): DocsNavLabels {
  return {
    groups: {
      get_started: t('developers.docs.nav.groups.get_started', 'Get started'),
      core_concepts: t('developers.docs.nav.groups.core_concepts', 'Core concepts'),
      integrator_platform: t('developers.docs.nav.groups.integrator_platform', 'Integrator platform'),
      api_reference: t('developers.docs.nav.groups.api_reference', 'API reference'),
    },
    items: {
      overview: t('developers.docs.nav.items.overview', 'Overview'),
      quickstart: t('developers.docs.nav.items.quickstart', 'Quickstart'),
      authentication: t('developers.docs.nav.items.authentication', 'Authentication'),
      sdks_and_tools: t('developers.docs.nav.items.sdks_and_tools', 'SDKs and tools'),
      organizations: t('developers.docs.nav.items.organizations', 'Organizations'),
      members_and_groups: t('developers.docs.nav.items.members_and_groups', 'Members and groups'),
      census: t('developers.docs.nav.items.census', 'Census'),
      voting_processes: t('developers.docs.nav.items.voting_processes', 'Voting processes'),
      results: t('developers.docs.nav.items.results', 'Results'),
      jobs: t('developers.docs.nav.items.jobs', 'Jobs'),
      managed_organizations: t('developers.docs.nav.items.managed_organizations', 'Managed organizations'),
      api_keys: t('developers.docs.nav.items.api_keys', 'API keys'),
      quotas_and_subscriptions: t('developers.docs.nav.items.quotas_and_subscriptions', 'Quotas and subscriptions'),
      api_reference: t('developers.docs.nav.items.api_reference', 'API reference'),
    },
  }
}
