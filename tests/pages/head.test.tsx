import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it } from 'vitest'

import HeadDefault from '@/pages/+Head'

type PartialPageContext = {
  locale?: string
  initialLocale?: string
  urlLogical?: string
  is404?: boolean
  config?: {
    title?: string
    description?: string
    image?: string
  }
}

const renderHead = (pageContext: PartialPageContext) => renderToStaticMarkup(HeadDefault(pageContext as any))

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
    expect(html).toContain('rel="alternate" hrefLang="en" href="https://vocdoni.io/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="es" href="https://vocdoni.io/es/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="x-default" href="https://vocdoni.io/privacy"')
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
    expect(html).toContain('meta name="language" content="es"')
    expect(html).toContain('property="og:locale" content="es"')
  })

  it('renders absolute og:image URLs when image is relative', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/',
      config: { image: '/assets/static/vocdoni.png' },
    })

    expect(html).toContain('property="og:image" content="https://vocdoni.io/assets/static/vocdoni.png"')
  })

  it('uses non-prefixed canonical URLs for the default locale', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/privacy',
      config: { title: 'Privacy Policy - Vocdoni' },
    })

    expect(html).toContain('rel="canonical" href="https://vocdoni.io/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="en" href="https://vocdoni.io/privacy"')
    expect(html).toContain('rel="alternate" hrefLang="x-default" href="https://vocdoni.io/privacy"')
    expect(html).toContain('property="og:url" content="https://vocdoni.io/privacy"')
  })

  it('injects Organization and WebSite JSON-LD schema', () => {
    const html = renderHead({
      locale: 'en',
      urlLogical: '/',
      config: { title: 'Vocdoni - Blockchain Voting Technology' },
    })

    expect(html).toContain('type="application/ld+json"')
    expect(html).toContain('"@type":"Organization"')
    expect(html).toContain('"@type":"WebSite"')
    expect(html).toContain('"url":"https://vocdoni.io"')
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
