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

/**
 * JSON-LD assertions parse the payload rather than substring-matching the serialized
 * output: key order and added fields are not part of the contract, the shape is.
 */
function jsonLd(html: string): Record<string, unknown>[] {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  return blocks.flatMap((m) => {
    const parsed = JSON.parse(m[1].replace(/\\u003c/g, '<'))
    return Array.isArray(parsed) ? parsed : [parsed]
  })
}

const node = (html: string, type: string) =>
  jsonLd(html).find((n) => n['@type'] === type) as Record<string, any> | undefined

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

    const org = node(html, 'Organization')!
    expect(org['@id']).toBe('https://vocdoni.io/#organization')
    expect(org.url).toBe('https://vocdoni.io')
    expect(org.legalName).toBe('Synergize S.L.')
    expect(org.description).toContain('online voting software for associations and organizations')
    expect(org.foundingDate).toBe('2018')
    expect(org.knowsAbout).toContain('online voting')
    expect(org.knowsAbout).toContain('end-to-end verifiable elections')
    expect(org.sameAs).toContain('https://github.com/vocdoni')
    expect(org.logo).toMatchObject({ '@type': 'ImageObject', '@id': 'https://vocdoni.io/#logo' })

    const site = node(html, 'WebSite')!
    expect(site['@id']).toBe('https://vocdoni.io/#website')
    expect(site.publisher).toEqual({ '@id': 'https://vocdoni.io/#organization' })
  })

  // The entity description is the one sentence a crawler and a reader should agree on, so it is
  // read from the same key the about page renders rather than duplicated as an English literal.
  it('takes Organization.description from the about-us identity copy, in the served locale', () => {
    const html = renderHead({
      locale: 'es',
      urlLogical: '/',
      config: { title: 'Vocdoni' },
      initialI18nStore: {
        es: {
          common: {
            about_us: {
              identity: {
                description:
                  'Vocdoni ofrece software de voto en línea de código abierto para asociaciones y organizaciones.',
              },
            },
          },
        },
      },
    })

    expect(node(html, 'Organization')!.description).toBe(
      'Vocdoni ofrece software de voto en línea de código abierto para asociaciones y organizaciones.'
    )
  })

  it('falls back to the English entity description when the i18n store has no identity copy', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/', config: { title: 'Vocdoni' } })
    expect(node(html, 'Organization')!.description).toContain(
      'Vocdoni provides open-source online voting software for associations and organizations'
    )
  })

  // 34 of 39 page titles use the `| Vocdoni` suffix; only the four legacy pages use ` - Vocdoni`.
  it('strips either brand suffix from WebPage.name and the breadcrumb leaf', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/solutions/associations',
      config: { title: 'Online voting for associations and board elections | Vocdoni' },
    })

    expect(node(html, 'WebPage')!.name).toBe('Online voting for associations and board elections')

    const crumbs = node(html, 'BreadcrumbList')!.itemListElement
    expect(crumbs[crumbs.length - 1].name).toBe('Online voting for associations and board elections')
    expect(JSON.stringify(crumbs)).not.toContain('| Vocdoni')
  })

  it('keeps stripping the legacy dash brand suffix', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/privacy', config: { title: 'Privacy policy - Vocdoni' } })
    expect(node(html, 'WebPage')!.name).toBe('Privacy policy')
  })

  it('falls back to the brand when a title is nothing but the brand suffix', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/privacy', config: { title: '| Vocdoni' } })
    expect(node(html, 'WebPage')!.name).toBe('Vocdoni')
  })

  it('links the page node to the WebSite node instead of redeclaring it', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/', config: { title: 'Vocdoni' } })
    expect(node(html, 'WebPage')!.isPartOf).toEqual({ '@id': 'https://vocdoni.io/#website' })
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

    const app = node(html, 'SoftwareApplication')!
    expect(app['@id']).toBe('https://vocdoni.io/#vocdoni-app')
    expect(app.name).toBe('Vocdoni app')
    expect(app.isAccessibleForFree).toBe(true)
    expect(app.publisher).toEqual({ '@id': 'https://vocdoni.io/#organization' })
    expect(html).toContain('"@type":"FAQPage"')
    expect(html).toContain('"name":"¿Puedo ejecutar una votación gratis?"')
    expect(html).toContain('"text":"Sí. Puedes ejecutar una votación gratis para hasta 100 miembros."')
  })

  it('adds reviewed pricing offers for the Free, Essential, Premium, and Custom plans', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/pricing',
      config: {
        title: 'Online voting pricing and plans | Vocdoni',
        description: 'Compare current Vocdoni App plans.',
      },
    })

    const app = node(html, 'SoftwareApplication')!
    expect(app['@id']).toBe('https://vocdoni.io/#vocdoni-app')
    expect(app.dateModified).toBe('2026-08-28')
    expect(app.url).toBe('https://vocdoni.io/en/pricing')
    expect(app.offers.map((offer: Record<string, unknown>) => offer.name)).toEqual([
      'Free',
      'Essential',
      'Premium',
      'Custom',
    ])
    expect(app.offers[1].priceSpecification).toMatchObject([
      { price: '69', priceCurrency: 'EUR', unitText: 'MONTH', valueAddedTaxIncluded: false },
      { price: '590', priceCurrency: 'EUR', unitText: 'YEAR', valueAddedTaxIncluded: false },
    ])
    expect(app.offers[2].priceSpecification).toMatchObject([
      { price: '199', unitText: 'MONTH' },
      { price: '1890', unitText: 'YEAR' },
    ])
    expect(app.offers[3].description).toBe('Price on request')
  })

  it('advertises the single English llms.txt index from every locale', () => {
    for (const locale of ['en', 'es', 'ca']) {
      expect(renderHead({ locale, urlLogical: '/app', config: { title: 'Vocdoni' } })).toContain(
        '<link rel="alternate" type="text/plain" href="/llms.txt"/>'
      )
    }
  })

  it('keeps the Organization logo stable when a page has its own social image', () => {
    const branded = renderHead({ locale: 'en', urlLogical: '/', config: { title: 'Vocdoni' } })
    const caseStudy = renderHead({
      locale: 'en',
      urlLogical: '/case-studies/coib',
      config: { title: 'COIB case study | Vocdoni', image: '/case-studies/coib.webp' },
    })

    // The page's own image still drives og:image...
    expect(caseStudy).toContain('property="og:image" content="https://vocdoni.io/case-studies/coib.webp"')

    // ...but the Organization logo is the brand default, not the case-study cover.
    const logo = node(caseStudy, 'Organization')!.logo
    expect(logo.url).not.toBe('https://vocdoni.io/case-studies/coib.webp')
    expect(logo.url).toBe(node(branded, 'Organization')!.logo.url)
  })

  it('adds canonical, locale alternatives, and breadcrumbs for an alternatives page', () => {
    const html = renderHead({
      locale: 'fr',
      urlLogical: '/alternatives/electionbuddy-alternatives',
      config: {
        title: '4 alternatives à ElectionBuddy pour les organisations | Vocdoni',
        description: 'Comparez quatre plateformes de vote.',
      },
    })

    expect(html).toContain('rel="canonical" href="https://vocdoni.io/fr/alternatives/electionbuddy-alternatives"')
    expect(html).toContain(
      'rel="alternate" hrefLang="en" href="https://vocdoni.io/en/alternatives/electionbuddy-alternatives"'
    )
    expect(html).toContain('"@type":"WebPage"')
    expect(html).toContain('"@type":"BreadcrumbList"')
    expect(html).toContain('"item":"https://vocdoni.io/fr/alternatives/electionbuddy-alternatives"')
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
