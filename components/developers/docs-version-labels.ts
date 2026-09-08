import type { TFunction } from 'i18next'

// Version labels, resolved with static t() calls so the i18next extractor
// always sees them (a dynamic key built from DocsVersion.labelKey would be
// pruned on the next extraction run - see docs-nav.ts for the same pattern).
export function docsVersionLabels(t: TFunction): Record<string, string> {
  return {
    production: t('developers.docs.version.production', 'Production'),
    stage: t('developers.docs.version.stage', 'Stage'),
  }
}
