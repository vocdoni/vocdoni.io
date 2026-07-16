import { DEVELOPERS_SKILLS_URL, DEVELOPERS_SWAGGER_URL } from '@/lib/developers'
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

// Resolve which locale key holds the FAQ items for the current page, if any.
// Route slugs are kebab-case; i18n keys are snake_case.
const getFaqItemsKey = (urlLogical: string) => {
  if (urlLogical === '/app') return 'app_landing.faq.items'
  const toKey = (slug: string) => slug.replace(/-/g, '_')
  if (urlLogical.startsWith('/solutions/')) {
    const slug = urlLogical.split('/')[2]
    if (slug) return `solutions.${toKey(slug)}.faq.items`
  }
  if (urlLogical.startsWith('/learn/')) {
    const slug = urlLogical.split('/')[2]
    // Learn articles store FAQ items as a direct array under `faq`.
    if (slug) return `learn.${toKey(slug)}.faq`
  }
  return null
}

const buildFaqSchema = (pageContext: PageContext, locale: string, itemsKey: string) => {
  const items = getLocalizedValue(pageContext, locale, itemsKey)
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

const buildArticleSchema = (
  urlLogical: string,
  siteUrl: string,
  canonicalUrl: string,
  locale: string,
  title?: string,
  description?: string,
  image?: string
) => {
  if (!urlLogical.startsWith('/learn/') || urlLogical === '/learn') return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cleanTitle(title ?? undefined),
    inLanguage: locale,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    author: { '@type': 'Organization', name: 'Vocdoni', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'Vocdoni',
      url: siteUrl,
      ...(image ? { logo: { '@type': 'ImageObject', url: image } } : {}),
    },
  }
}

interface BlogPostSeo {
  frontmatter: {
    title: string
    excerpt?: string
    coverImage?: string
    publishedDate: string
    updatedDate?: string
    seo?: { ogImage?: string }
  }
  authors: { name: string; website?: string }[]
  usedLocale: string
  availableLocales: string[]
}

const toIsoDate = (value?: string) => {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

const buildBlogPostingSchema = (post: BlogPostSeo, siteUrl: string, canonicalUrl: string, image?: string) => {
  const published = toIsoDate(post.frontmatter.publishedDate)
  const modified = toIsoDate(post.frontmatter.updatedDate) ?? published
  const authors = post.authors.length
    ? post.authors.map((author) => ({
        '@type': 'Person',
        name: author.name,
        ...(author.website ? { url: author.website } : {}),
      }))
    : [{ '@type': 'Organization', name: 'Vocdoni', url: siteUrl }]

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: cleanTitle(post.frontmatter.title),
    ...(post.frontmatter.excerpt ? { description: post.frontmatter.excerpt } : {}),
    ...(image ? { image: [image] } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    inLanguage: post.usedLocale,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    author: authors,
    publisher: {
      '@type': 'Organization',
      name: 'Vocdoni',
      url: siteUrl,
      ...(image ? { logo: { '@type': 'ImageObject', url: image } } : {}),
    },
  }
}

export function HeadTags(pageContext: PageContext) {
  const is404 = Boolean(pageContext.is404)
  const isCompatibilityRedirect = isCompatibilityRedirectPage(pageContext) && !is404
  const locale = getLocale(pageContext)
  const urlLogical = getLogicalPath(pageContext)
  const siteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL

  // Blog post pages carry rich metadata from the data loader (dates, authors,
  // cover image, available translations) for Article SEO + accurate hreflang.
  const blogPost = (pageContext as any).data?.post as BlogPostSeo | undefined
  const isBlogPost = Boolean(blogPost) && urlLogical.startsWith('/blog/') && !urlLogical.startsWith('/blog/category/')
  const isBlogSection = urlLogical === '/blog' || urlLogical.startsWith('/blog/')

  // When a post is served via fallback (e.g. /es for an English-only post), the
  // real content locale is usedLocale. Canonicalize + advertise that locale so
  // fallback URLs consolidate to the page that actually holds the content and the
  // canonical always has a matching hreflang self-reference.
  const effectiveLocale = isBlogPost && blogPost!.usedLocale ? blogPost!.usedLocale : locale

  const canonicalPath = withLocalePrefix(effectiveLocale, urlLogical)
  const canonicalUrl = `${siteUrl}${canonicalPath}`
  // x-default points at the default-language version, falling back to the post's
  // canonical locale when the post has no default-language source (otherwise it
  // would target a fallback URL whose own canonical points elsewhere).
  const xDefaultLocale =
    isBlogPost && blogPost!.availableLocales?.length && !blogPost!.availableLocales.includes(localeDefault)
      ? effectiveLocale
      : localeDefault
  const xDefaultUrl = `${siteUrl}${withLocalePrefix(xDefaultLocale, urlLogical)}`

  const title = resolveConfigValue(pageContext.config?.title, pageContext)
  const description = resolveConfigValue(pageContext.config?.description, pageContext)

  const configImage = resolveConfigValue(pageContext.config?.image, pageContext)
  const image =
    (isBlogPost && (blogPost!.frontmatter.seo?.ogImage || blogPost!.frontmatter.coverImage)) ||
    configImage ||
    ogImageDefault
  const ogImageUrl = toAbsoluteUrl(siteUrl, image) || undefined
  const ogType = isBlogPost ? 'article' : 'website'

  // Raw-markdown companion for agents, emitted by plugins/blog-markdown.ts and
  // plugins/docs-markdown.ts. Advertised at the same locale as the canonical URL so it
  // always resolves to a file that exists. Only docs pages and blog posts have one.
  const markdownAltHref = (() => {
    if (isBlogPost) {
      const slug = urlLogical.slice('/blog/'.length)
      return slug ? `${siteUrl}/${effectiveLocale}/blog/${slug}.md` : null
    }
    if (urlLogical === '/developers/docs') return `${siteUrl}/${effectiveLocale}/developers/docs.md`
    if (urlLogical.startsWith('/developers/docs/')) {
      const slug = urlLogical.slice('/developers/docs/'.length)
      return slug ? `${siteUrl}/${effectiveLocale}/developers/docs/${slug}.md` : null
    }
    return null
  })()

  // hreflang / og:locale alternates: for a post, advertise only the locales it
  // actually has (English fallback covers the rest); every other page lists all.
  const alternateLocales = (
    isBlogPost && blogPost!.availableLocales?.length ? blogPost!.availableLocales : locales
  ) as readonly string[]

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
    inLanguage: effectiveLocale,
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

  const faqItemsKey = getFaqItemsKey(urlLogical)

  const schema = [
    organizationSchema,
    websiteSchema,
    pageSchema,
    buildBreadcrumbSchema(siteUrl, locale, urlLogical, title ?? undefined),
    appSchema,
    faqItemsKey ? buildFaqSchema(pageContext, locale, faqItemsKey) : null,
    buildArticleSchema(
      urlLogical,
      siteUrl,
      canonicalUrl,
      locale,
      title ?? undefined,
      description ?? undefined,
      ogImageUrl
    ),
    isBlogPost ? buildBlogPostingSchema(blogPost!, siteUrl, canonicalUrl, ogImageUrl) : null,
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
      {/* Self-hosted fonts (see scripts/copy-fonts.mjs). Served from public/ so only the
          unicode-range subset each page needs is fetched, with font-display: swap. */}
      <link
        rel='preload'
        href='/fonts/files/hanken-grotesk-latin-wght-normal.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      {/* Headings render above the fold on every page, so preload the serif too. */}
      <link
        rel='preload'
        href='/fonts/files/fraunces-latin-full-normal.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <link rel='stylesheet' href='/fonts/fonts.css' />
      <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
      <link rel='dns-prefetch' href='https://plausible.io' />
      {urlLogical.startsWith('/app') && (
        <>
          <link rel='preconnect' href='https://www.youtube-nocookie.com' />
          <link rel='preconnect' href='https://www.youtube.com' />
          <link rel='preconnect' href='https://i.ytimg.com' />
        </>
      )}
      <link rel='canonical' href={canonicalUrl} />
      {/* Agent discovery pointers (RFC 8288 relations). Static site: emitted as <link>
          elements since production cannot set HTTP Link headers. See plugins/well-known.ts. */}
      <link rel='api-catalog' href='/.well-known/api-catalog' />
      <link rel='service-doc' href={`${siteUrl}/developers/docs`} />
      <link rel='service-desc' href={DEVELOPERS_SWAGGER_URL} />
      <link rel='related' title='Vocdoni agent skills' href={DEVELOPERS_SKILLS_URL} />
      {markdownAltHref && <link rel='alternate' type='text/markdown' href={markdownAltHref} />}
      {isBlogSection && (
        <link rel='alternate' type='application/rss+xml' title='Vocdoni blog' href={`${siteUrl}/blog/rss.xml`} />
      )}
      {alternateLocales.map((hrefLang) => (
        <link
          key={hrefLang}
          rel='alternate'
          hrefLang={hrefLang}
          href={`${siteUrl}${withLocalePrefix(hrefLang, urlLogical)}`}
        />
      ))}
      <link rel='alternate' hrefLang='x-default' href={xDefaultUrl} />
      <meta name='language' content={effectiveLocale} />
      <meta property='og:locale' content={effectiveLocale} />
      {alternateLocales
        .filter((hrefLang) => hrefLang !== effectiveLocale)
        .map((hrefLang) => (
          <meta key={hrefLang} property='og:locale:alternate' content={hrefLang} />
        ))}
      <meta property='og:type' content={ogType} />
      {isBlogPost && toIsoDate(blogPost!.frontmatter.publishedDate) && (
        <meta property='article:published_time' content={toIsoDate(blogPost!.frontmatter.publishedDate)} />
      )}
      {isBlogPost && toIsoDate(blogPost!.frontmatter.updatedDate ?? blogPost!.frontmatter.publishedDate) && (
        <meta
          property='article:modified_time'
          content={toIsoDate(blogPost!.frontmatter.updatedDate ?? blogPost!.frontmatter.publishedDate)}
        />
      )}
      {isBlogPost &&
        blogPost!.authors.map((author, index) => (
          <meta key={`${author.name}-${index}`} property='article:author' content={author.name} />
        ))}
      {title && <meta property='og:title' content={title} />}
      {description && <meta property='og:description' content={description} />}
      <meta property='og:url' content={canonicalUrl} />
      {ogImageUrl && <meta property='og:image' content={ogImageUrl} />}
      <meta name='twitter:card' content='summary_large_image' />
      {title && <meta name='twitter:title' content={title} />}
      {description && <meta name='twitter:description' content={description} />}
      {ogImageUrl && <meta name='twitter:image' content={ogImageUrl} />}
      {PLAUSIBLE_DOMAIN && (
        <script async data-domain={PLAUSIBLE_DOMAIN} src='https://plausible.io/js/script.js'></script>
      )}
    </>
  )
}
