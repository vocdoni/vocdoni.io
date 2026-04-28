import { localeDefault } from '@/locales'

const t = (_key: string, defaultValue: string) => defaultValue

const metaDefaults = {
  'meta.index.title': t('meta.index.title', 'Vocdoni - secure digital voting you can trust'),
  'meta.index.description': t(
    'meta.index.description',
    'Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.'
  ),
  'meta.contact.title': t('meta.contact.title', 'Contact - Vocdoni'),
  'meta.contact.description': t(
    'meta.contact.description',
    'Talk to Vocdoni about secure online voting, verifiable elections, pricing, demos, and custom digital governance projects.'
  ),
  'meta.about_us.title': t('meta.about_us.title', 'About Vocdoni - open source online voting infrastructure'),
  'meta.about_us.description': t(
    'meta.about_us.description',
    'Meet the team building open source, verifiable digital voting infrastructure for organizations that need trustworthy decisions.'
  ),
  'meta.privacy.title': t('meta.privacy.title', 'Privacy policy - Vocdoni'),
  'meta.privacy.description': t(
    'meta.privacy.description',
    'Learn how Vocdoni collects, uses, and protects your personal data and privacy.'
  ),
  'meta.terms.title': t('meta.terms.title', 'Terms & conditions - Vocdoni'),
  'meta.terms.description': t(
    'meta.terms.description',
    "Read the terms and conditions that govern the use of Vocdoni's services and platform."
  ),
  'meta.use_cases.title': t('meta.use_cases.title', 'Online voting use cases for organizations - Vocdoni'),
  'meta.use_cases.description': t(
    'meta.use_cases.description',
    "Discover real-world voting and governance use cases powered by Vocdoni's secure and transparent technology."
  ),
  'meta.app.title': t('meta.app.title', 'Secure online voting app for organizations - Vocdoni'),
  'meta.app.description': t(
    'meta.app.description',
    'Start free, upload your voter list, and publish results your members can verify. Built for organizations that need trust, speed, and proof.'
  ),
} as const

const getNestedValue = (source: unknown, key: string) => {
  return key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment]
    }

    return undefined
  }, source)
}

export const getMetaByKey = (pageContext: Vike.PageContextServer, key: string) => {
  const locale = pageContext.initialLocale || pageContext.locale || localeDefault
  const resources = pageContext.initialI18nStore
  const fallback = metaDefaults[key as keyof typeof metaDefaults] ?? key
  if (!resources || !resources[locale]) {
    return fallback
  }

  const value = getNestedValue(resources[locale]?.common, key.replace(/^common\./, ''))
  return typeof value === 'string' && value.trim() ? value : fallback
}
