import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it } from 'vitest'

import { HeadTags } from '@/lib/seo-head'

type PartialPageContext = {
  locale?: string
  initialLocale?: string
  urlLogical?: string
  urlPathname?: string
  urlOriginal?: string
  is404?: boolean
  isCompatibilityRedirect?: boolean
  config?: {
    title?: string
    description?: string
    image?: string
  }
  initialI18nStore?: Record<string, { common: Record<string, unknown> }>
}

const renderHead = (pageContext: PartialPageContext) => renderToStaticMarkup(<HeadTags {...(pageContext as any)} />)

describe('Head meta tags', () => {
  beforeEach(() => {
    ;(globalThis as any).SITE_URL = 'https://vocdoni.io'
    ;(globalThis as any).PLAUSIBLE_DOMAIN = ''
  })

  it('renders locale-aware canonical, hreflang, and og:url for non-default locales', () => {
    const html = renderHead({
      locale: 'es',
      urlLogical: '/privacy',
      config: { title: 'Privacy Policy - Vocdoni' },
    })

    expect(html).toContain('rel="canonical" href="https://vocdoni.io/es/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="en" href="https://vocdoni.io/en/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="es" href="https://vocdoni.io/es/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="x-default" href="https://vocdoni.io/en/privacy"')
    expect(html).toContain('meta name="language" content="es"')
    expect(html).toContain('property="og:locale" content="es"')
    expect(html).toContain('property="og:url" content="https://vocdoni.io/es/privacy"')
  })

  it('falls back to initialLocale when locale is missing', () => {
    const html = renderHead({
      initialLocale: 'es',
      urlLogical: '/',
      config: { title: 'Vocdoni - Tecnología de votación blockchain' },
    })

    expect(html).toContain('rel="canonical" href="https://vocdoni.io/es"')
    expect(html).toContain('rel="alternate" hrefLang="x-default" href="https://vocdoni.io/en"')
    expect(html).toContain('meta name="language" content="es"')
    expect(html).toContain('property="og:locale" content="es"')
  })

  it('renders absolute og:image URLs when image is relative', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/',
      config: { image: '/assets/static/vocdoni.webp' },
    })

    expect(html).toContain('property="og:image" content="https://vocdoni.io/assets/static/vocdoni.webp"')
  })

  it('uses prefixed canonical and x-default URLs for the default locale', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/privacy',
      config: { title: 'Privacy Policy - Vocdoni' },
    })

    expect(html).toContain('rel="canonical" href="https://vocdoni.io/en/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="en" href="https://vocdoni.io/en/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="x-default" href="https://vocdoni.io/en/privacy"')
    expect(html).toContain('property="og:url" content="https://vocdoni.io/en/privacy"')
  })

  it('derives locale and logical path from the rendered URL when custom context is missing', () => {
    const html = renderHead({
      urlPathname: '/ca/use-cases',
      config: { title: "Casos d'ús - Vocdoni" },
    })

    expect(html).toContain('rel="canonical" href="https://vocdoni.io/ca/use-cases"')
    expect(html).toContain('rel="alternate" hrefLang="en" href="https://vocdoni.io/en/use-cases"')
    expect(html).toContain('rel="alternate" hrefLang="ca" href="https://vocdoni.io/ca/use-cases"')
    expect(html).toContain('rel="alternate" hrefLang="x-default" href="https://vocdoni.io/en/use-cases"')
    expect(html).toContain('meta name="language" content="ca"')
    expect(html).toContain('property="og:locale" content="ca"')
    expect(html).toContain('property="og:url" content="https://vocdoni.io/ca/use-cases"')
  })

  it('adds noindex and a refresh target for unprefixed compatibility URLs', () => {
    const html = renderHead({
      urlPathname: '/app',
      config: { title: 'Vocdoni app' },
    })

    expect(html).toContain('meta name="robots" content="noindex,follow"')
    expect(html).toContain('http-equiv="refresh" content="0;url=/en/app"')
    expect(html).not.toContain('rel="canonical"')
  })

  it('injects Organization and WebSite JSON-LD schema', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/',
      config: { title: 'Vocdoni - Blockchain Voting Technology' },
    })

    expect(html).toContain('type="application/ld+json"')
    expect(html).toContain('"@type":"Organization"')
    expect(html).toContain('"@id":"https://vocdoni.io/#organization"')
    expect(html).toContain('"@type":"WebSite"')
    expect(html).toContain('"url":"https://vocdoni.io"')
    expect(html).toContain('"sameAs":["https://github.com/vocdoni"')
    expect(html).toContain('"@type":"ImageObject"')
    expect(html).toContain('"@id":"https://vocdoni.io/#logo"')
  })

  it('adds page-specific JSON-LD and breadcrumbs for about and contact pages', () => {
    const aboutHtml = renderHead({
      locale: 'en',
      urlLogical: '/about-us',
      config: {
        title: 'About Vocdoni - open source online voting infrastructure',
        description: 'Meet the team building verifiable voting infrastructure.',
      },
    })
    const contactHtml = renderHead({
      locale: 'ca',
      urlLogical: '/contact',
      config: {
        title: 'Contacte - Vocdoni',
        description: 'Parleu amb Vocdoni sobre votació online segura.',
      },
    })

    expect(aboutHtml).toContain('"@type":"AboutPage"')
    expect(aboutHtml).toContain('"@type":"BreadcrumbList"')
    expect(aboutHtml).toContain('"item":"https://vocdoni.io/en/about-us"')
    expect(contactHtml).toContain('"@type":"ContactPage"')
    expect(contactHtml).toContain('"item":"https://vocdoni.io/ca/contact"')
  })

  it('adds SoftwareApplication and FAQPage schema for the app page', () => {
    const html = renderHead({
      locale: 'es',
      urlLogical: '/app',
      config: {
        title: 'App de votación online segura para organizaciones - Vocdoni',
        description: 'Empieza gratis y publica resultados verificables.',
      },
      initialI18nStore: {
        es: {
          common: {
            app_landing: {
              faq: {
                items: [
                  {
                    question: '¿Puedo ejecutar una votación gratis?',
                    answer: 'Sí. Puedes ejecutar una votación gratis para hasta 100 miembros.',
                  },
                ],
              },
            },
          },
        },
      },
    })

    expect(html).toContain('"@type":"SoftwareApplication"')
    expect(html).toContain('"@id":"https://vocdoni.io/#vocdoni-app"')
    expect(html).toContain('"name":"Vocdoni app"')
    expect(html).toContain('"isAccessibleForFree":true')
    expect(html).toContain('"publisher":{"@id":"https://vocdoni.io/#organization"}')
    expect(html).toContain('"@type":"FAQPage"')
    expect(html).toContain('"name":"¿Puedo ejecutar una votación gratis?"')
    expect(html).toContain('"text":"Sí. Puedes ejecutar una votación gratis para hasta 100 miembros."')
  })

  it('keeps the Organization logo stable when a page has its own image', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/case-studies/coib',
      config: {
        title: 'COIB case study | Vocdoni',
        image: '/case-studies/coib.webp',
      },
    })

    expect(html).toContain('property="og:image" content="https://vocdoni.io/case-studies/coib.webp"')
    expect(html).toContain('"logo":{"@type":"ImageObject","@id":"https://vocdoni.io/#logo"')
    expect(html).not.toContain('"logo":"https://vocdoni.io/case-studies/coib.webp"')
  })

  it('adds noindex for 404 pages and omits canonical/hreflang tags', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/missing',
      is404: true,
      config: { title: 'Page Not Found' },
    })

    expect(html).toContain('meta name="robots" content="noindex,nofollow"')
    expect(html).not.toContain('rel="canonical"')
    expect(html).not.toContain('rel="alternate" hrefLang="en"')
    expect(html).not.toContain('rel="alternate" hrefLang="es"')
    expect(html).not.toContain('property="og:url"')
  })
})
