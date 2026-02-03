// https://vike.dev/Head
import { localeDefault, locales } from '@/locales'
import type { PageContext } from 'vike/types'

const normalizePath = (path: string) => {
  if (!path) return '/'
  if (!path.startsWith('/')) return `/${path}`
  return path
}

const withLocalePrefix = (locale: string, urlLogical: string) => {
  const normalized = normalizePath(urlLogical)
  if (locale === localeDefault) {
    return normalized
  }
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

const toAbsoluteUrl = (baseUrl: string, value?: string) => {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  const normalized = value.startsWith('/') ? value : `/${value}`
  return `${baseUrl}${normalized}`
}

const resolveConfigValue = <T,>(value: T | ((pageContext: PageContext) => T) | undefined, pageContext: PageContext) => {
  if (typeof value === 'function') {
    return (value as (ctx: PageContext) => T)(pageContext)
  }
  return value
}

export default function HeadDefault(pageContext: PageContext) {
  // GTM initialization is now handled by the CookieConsent component
  // based on user consent. This ensures compliance with cookie regulations.

  const is404 = Boolean(pageContext.is404)
  const locale = pageContext.locale || pageContext.initialLocale || localeDefault
  const urlLogical = pageContext.urlLogical || '/'
  const siteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL

  const canonicalPath = withLocalePrefix(locale, urlLogical)
  const canonicalUrl = `${siteUrl}${canonicalPath}`
  const xDefaultUrl = `${siteUrl}${withLocalePrefix(localeDefault, urlLogical)}`

  const title = resolveConfigValue(pageContext.config?.title, pageContext)
  const description = resolveConfigValue(pageContext.config?.description, pageContext)
  const image = resolveConfigValue(pageContext.config?.image, pageContext)
  const ogImageUrl = toAbsoluteUrl(siteUrl, image) || undefined

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vocdoni',
    url: siteUrl,
    ...(ogImageUrl ? { logo: ogImageUrl } : {}),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vocdoni',
    url: siteUrl,
  }

  if (is404) {
    return (
      <>
        <meta name='robots' content='noindex,nofollow' />
        {title && <meta property='og:title' content={title} />}
        {description && <meta property='og:description' content={description} />}
        {ogImageUrl && <meta property='og:image' content={ogImageUrl} />}
        <meta name='twitter:card' content='summary_large_image' />
        {title && <meta name='twitter:title' content={title} />}
        {description && <meta name='twitter:description' content={description} />}
        {ogImageUrl && <meta name='twitter:image' content={ogImageUrl} />}
      </>
    )
  }

  return (
    <>
      <script type='application/ld+json'>{JSON.stringify([organizationSchema, websiteSchema])}</script>
      <link rel='canonical' href={canonicalUrl} />
      {locales.map((hrefLang) => (
        <link
          key={hrefLang}
          rel='alternate'
          hrefLang={hrefLang}
          href={`${siteUrl}${withLocalePrefix(hrefLang, urlLogical)}`}
        />
      ))}
      <link rel='alternate' hrefLang='x-default' href={xDefaultUrl} />
      <meta name='language' content={locale} />
      <meta property='og:locale' content={locale} />
      {locales
        .filter((hrefLang) => hrefLang !== locale)
        .map((hrefLang) => (
          <meta key={hrefLang} property='og:locale:alternate' content={hrefLang} />
        ))}
      <meta property='og:type' content='website' />
      {title && <meta property='og:title' content={title} />}
      {description && <meta property='og:description' content={description} />}
      <meta property='og:url' content={canonicalUrl} />
      {ogImageUrl && <meta property='og:image' content={ogImageUrl} />}
      <meta name='twitter:card' content='summary_large_image' />
      {title && <meta name='twitter:title' content={title} />}
      {description && <meta name='twitter:description' content={description} />}
      {ogImageUrl && <meta name='twitter:image' content={ogImageUrl} />}
      {PLAUSIBLE_DOMAIN && (
        <script defer data-domain={PLAUSIBLE_DOMAIN} src='https://plausible.io/js/script.js'></script>
      )}
    </>
  )
}
