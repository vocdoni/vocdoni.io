import { getCompatibilityRedirectTarget } from '@/lib/localeRedirect'
import { localeDefault, locales } from '@/locales'
import type { PageContext } from 'vike/types'
import ogImageDefault from '../assets/images/vocdoni.webp'

const normalizePath = (path: string) => {
  if (!path) return '/'
  if (!path.startsWith('/')) return `/${path}`
  return path
}

const withLocalePrefix = (locale: string, urlLogical: string) => {
  const normalized = normalizePath(urlLogical)
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

const hasLocalePrefix = (urlPathname: string) => {
  const firstSegment = urlPathname.split('/')[1] || ''
  return locales.includes(firstSegment as (typeof locales)[number])
}

const stripLocalePrefix = (urlPathname: string) => {
  if (!hasLocalePrefix(urlPathname)) return normalizePath(urlPathname)
  const segments = urlPathname.split('/')
  return normalizePath('/' + (segments.slice(2).join('/') || ''))
}

const getUrlPathname = (pageContext: PageContext) => {
  const context = pageContext as any
  return context.urlPathname || context.urlOriginal || context.urlParsed?.pathname || ''
}

const getPathLocale = (urlPathname: string) => {
  const firstSegment = urlPathname.split('/')[1] || ''
  return locales.includes(firstSegment as (typeof locales)[number]) ? firstSegment : undefined
}

const getLocale = (pageContext: PageContext) => {
  const urlPathname = getUrlPathname(pageContext)
  return pageContext.locale || getPathLocale(urlPathname) || pageContext.initialLocale || localeDefault
}

const getLogicalPath = (pageContext: PageContext) => {
  if (pageContext.urlLogical) return pageContext.urlLogical
  const urlPathname = getUrlPathname(pageContext)
  if (urlPathname) return stripLocalePrefix(urlPathname)
  if (!pageContext.pageId) return '/'

  const pageId = pageContext.pageId.replace(/^\/pages/, '') || '/'
  return pageId === '/index' ? '/' : pageId
}

const isCompatibilityRedirectPage = (pageContext: PageContext) => {
  if ((pageContext as any).isCompatibilityRedirect !== undefined) {
    return Boolean((pageContext as any).isCompatibilityRedirect)
  }

  const urlPathname = getUrlPathname(pageContext)
  if (!urlPathname) return false
  return !hasLocalePrefix(urlPathname)
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

const getNestedValue = (source: unknown, key: string) => {
  return key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment]
    }

    return undefined
  }, source)
}

const getLocalizedValue = (pageContext: PageContext, locale: string, key: string) => {
  const store = (pageContext as any).initialI18nStore
  return getNestedValue(store?.[locale]?.common, key)
}

const getPageSchemaType = (urlLogical: string) => {
  if (urlLogical === '/about-us') return 'AboutPage'
  if (urlLogical === '/contact') return 'ContactPage'
  return 'WebPage'
}

const cleanTitle = (title?: string) => {
  if (!title) return 'Vocdoni'
  return title.replace(/\s+-\s+Vocdoni$/i, '').trim()
}

const getBreadcrumbName = (segment: string, title?: string) => {
  if (title) return cleanTitle(title)
  return segment
    .split('-')
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ')
}

const buildBreadcrumbSchema = (siteUrl: string, locale: string, urlLogical: string, title?: string) => {
  if (urlLogical === '/') return null

  const segments = urlLogical.split('/').filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Vocdoni',
        item: `${siteUrl}/${locale}`,
      },
      ...segments.map((segment, index) => {
        const path = segments.slice(0, index + 1).join('/')
        return {
          '@type': 'ListItem',
          position: index + 2,
          name: index === segments.length - 1 ? getBreadcrumbName(segment, title) : getBreadcrumbName(segment),
          item: `${siteUrl}/${locale}/${path}`,
        }
      }),
    ],
  }
}

const buildFaqSchema = (pageContext: PageContext, locale: string) => {
  const items = getLocalizedValue(pageContext, locale, 'app_landing.faq.items')
  if (!Array.isArray(items)) return null

  const mainEntity = items
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const question = (item as Record<string, unknown>).question
      const answer = (item as Record<string, unknown>).answer
      if (typeof question !== 'string' || typeof answer !== 'string') return null

      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }
    })
    .filter(Boolean)

  if (mainEntity.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}

export function HeadTags(pageContext: PageContext) {
  const is404 = Boolean(pageContext.is404)
  const isCompatibilityRedirect = isCompatibilityRedirectPage(pageContext) && !is404
  const locale = getLocale(pageContext)
  const urlLogical = getLogicalPath(pageContext)
  const siteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL

  const canonicalPath = withLocalePrefix(locale, urlLogical)
  const canonicalUrl = `${siteUrl}${canonicalPath}`
  const xDefaultUrl = `${siteUrl}${withLocalePrefix(localeDefault, urlLogical)}`

  const title = resolveConfigValue(pageContext.config?.title, pageContext)
  const description = resolveConfigValue(pageContext.config?.description, pageContext)
  const image = resolveConfigValue(pageContext.config?.image, pageContext) || ogImageDefault
  const ogImageUrl = toAbsoluteUrl(siteUrl, image) || undefined

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vocdoni',
    url: siteUrl,
    ...(ogImageUrl ? { logo: ogImageUrl } : {}),
    sameAs: [
      'https://github.com/vocdoni',
      'https://x.com/vocdoni',
      'https://www.linkedin.com/company/vocdoni',
      'https://blog.vocdoni.io',
      'https://developer.vocdoni.io',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vocdoni',
    url: siteUrl,
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': getPageSchemaType(urlLogical),
    name: cleanTitle(title ?? undefined),
    url: canonicalUrl,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Vocdoni',
      url: siteUrl,
    },
    ...(description ? { description } : {}),
    ...(ogImageUrl ? { image: ogImageUrl } : {}),
  }

  const appSchema =
    urlLogical === '/app'
      ? {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Vocdoni app',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: canonicalUrl,
          inLanguage: locale,
          publisher: {
            '@type': 'Organization',
            name: 'Vocdoni',
            url: siteUrl,
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
          },
          ...(description ? { description } : {}),
        }
      : null

  const schema = [
    organizationSchema,
    websiteSchema,
    pageSchema,
    buildBreadcrumbSchema(siteUrl, locale, urlLogical, title ?? undefined),
    appSchema,
    urlLogical === '/app' ? buildFaqSchema(pageContext, locale) : null,
  ].filter(Boolean)

  if (isCompatibilityRedirect) {
    return (
      <>
        <meta name='robots' content='noindex,follow' />
        <meta httpEquiv='refresh' content={`0;url=${getCompatibilityRedirectTarget(urlLogical)}`} />
      </>
    )
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
      <script type='application/ld+json'>{JSON.stringify(schema)}</script>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400..800&family=Lora:ital,wght@0,400..700;1,400..700&display=swap'
        rel='stylesheet'
      />
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
