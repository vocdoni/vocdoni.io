import { describe, expect, it } from 'vitest'

import { buildRobotsTxt, buildSitemapXml } from '@/plugins/vike-sitemap'

describe('vike sitemap plugin', () => {
  it('emits canonical locale-prefixed URLs with reciprocal hreflang alternates', () => {
    const xml = buildSitemapXml('https://vocdoni.io', [{ baseRoute: '/use-cases', locales: ['ca', 'en', 'es'] }], 'en')

    expect(xml).toContain('<loc>https://vocdoni.io/en/use-cases</loc>')
    expect(xml).toContain('<loc>https://vocdoni.io/es/use-cases</loc>')
    expect(xml).toContain('<loc>https://vocdoni.io/ca/use-cases</loc>')
    expect(xml).not.toContain('<loc>https://vocdoni.io/use-cases</loc>')
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="ca" href="https://vocdoni.io/ca/use-cases" />')
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://vocdoni.io/en/use-cases" />')
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://vocdoni.io/en/use-cases" />')
  })

  it('advertises only the locales a post actually exists in', () => {
    const xml = buildSitemapXml('https://vocdoni.io', [{ baseRoute: '/blog/only-catalan', locales: ['ca'] }], 'en')

    // Only the Catalan URL is listed, and it is the x-default (no English source).
    expect(xml).toContain('<loc>https://vocdoni.io/ca/blog/only-catalan</loc>')
    expect(xml).not.toContain('https://vocdoni.io/en/blog/only-catalan')
    expect(xml).not.toContain('https://vocdoni.io/es/blog/only-catalan')
    expect(xml).toContain(
      '<xhtml:link rel="alternate" hreflang="x-default" href="https://vocdoni.io/ca/blog/only-catalan" />'
    )
  })

  it('uses real content dates when available and omits unknown dates', () => {
    const xml = buildSitemapXml(
      'https://vocdoni.io',
      [
        { baseRoute: '/app', locales: ['en'] },
        { baseRoute: '/blog/dated-post', locales: ['en', 'es'], lastModified: '2026-03-24' },
      ],
      'en'
    )

    const appBlock = xml.split('<loc>https://vocdoni.io/en/app</loc>')[1].split('</url>')[0]
    expect(appBlock).not.toContain('<lastmod>')
    expect(xml.match(/<lastmod>2026-03-24<\/lastmod>/g)).toHaveLength(2)
    expect(xml).not.toMatch(/<lastmod>\d{4}-\d{2}-\d{2}T/)
  })
})

describe('buildRobotsTxt', () => {
  it('declares AIPREF content signals and points at the sitemap', () => {
    const robots = buildRobotsTxt('https://vocdoni.io/')
    expect(robots).toContain('Content-Signal: search=yes, ai-input=yes, ai-train=no')
    expect(robots).toContain('Disallow: /keystatic')
    expect(robots).toContain('Sitemap: https://vocdoni.io/sitemap.xml')
  })

  it('stops advertising the sitemap on noindex deploys but keeps the site crawlable', () => {
    const robots = buildRobotsTxt('https://vocdoni-io-dev.netlify.app', true)
    expect(robots).not.toContain('Sitemap:')
    // Still `Allow: /` on purpose - a blocked crawl would never read the X-Robots-Tag header.
    expect(robots).toContain('Allow: /')
  })
})
