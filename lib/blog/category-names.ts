import { localeDefault, type Locale } from '@/locales'

// ---------------------------------------------------------------------------
// Blog category display-name localization.
//
// Categories are authored English-only as Keystatic `.mdoc` files
// (content/blog/categories/<slug>.mdoc); posts reference them by slug. Category
// names are consumed server/build-side by the blog loader (lib/blog/content.ts)
// and baked into the page data, so they never pass through React's t(). To still
// keep them in the locale files we mirror lib/page-meta.ts: a local no-op `t`
// makes the `blog.category_names.*` keys visible to i18next-cli (which only sees
// static string literals), so `pnpm translations` never prunes them.
//
// The English defaults below must match the `name` frontmatter of each category
// file. Add a line here when adding a category; without one, the loader falls
// back to the authored English name.
// ---------------------------------------------------------------------------

const t = (_key: string, defaultValue: string) => defaultValue

const categoryNameDefaults: Record<string, string> = {
  announcements: t('blog.category_names.announcements', 'Announcements'),
  davinci: t('blog.category_names.davinci', 'DAVINCI'),
  partnerships: t('blog.category_names.partnerships', 'Partnerships'),
  'product-updates': t('blog.category_names.product-updates', 'Product updates'),
  'success-stories': t('blog.category_names.success-stories', 'Success stories'),
  technology: t('blog.category_names.technology', 'Technology'),
  'use-cases': t('blog.category_names.use-cases', 'Use cases'),
  'vocdoni-app': t('blog.category_names.vocdoni-app', 'Vocdoni App'),
}

// Locale common.json bundles, read at build time (same glob technique as
// pages/+onBeforeRender.ts). Server/build only.
type CategoryNamesBundle = { blog?: { category_names?: Record<string, string> } }
const LOCALE_JSON = import.meta.glob('/locales/*/common.json', {
  eager: true,
  import: 'default',
}) as Record<string, CategoryNamesBundle>

const localizedName = (slug: string, locale: Locale): string | undefined => {
  const value = LOCALE_JSON[`/locales/${locale}/common.json`]?.blog?.category_names?.[slug]
  return typeof value === 'string' && value.trim() ? value : undefined
}

// Resolve a category's display name for a locale: requested locale, then English
// locale, then the built-in English default, then the authored `.mdoc` name.
export const categoryDisplayName = (slug: string, locale: Locale, fallbackName: string): string =>
  localizedName(slug, locale) ?? localizedName(slug, localeDefault) ?? categoryNameDefaults[slug] ?? fallbackName
