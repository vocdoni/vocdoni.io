import { describe, expect, it } from 'vitest'

import { buildSitemapXml } from '@/plugins/vike-sitemap'

describe('vike sitemap plugin', () => {
  it('emits canonical locale-prefixed URLs with reciprocal hreflang alternates', () => {
    const xml = buildSitemapXml(
      'https://vocdoni.io',
      ['/ca/use-cases', '/en/use-cases', '/es/use-cases'],
      ['ca', 'en', 'es'],
      'en'
    )

    expect(xml).toContain('<loc>https://vocdoni.io/en/use-cases</loc>')
    expect(xml).toContain('<loc>https://vocdoni.io/es/use-cases</loc>')
    expect(xml).toContain('<loc>https://vocdoni.io/ca/use-cases</loc>')
    expect(xml).not.toContain('<loc>https://vocdoni.io/use-cases</loc>')
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="ca" href="https://vocdoni.io/ca/use-cases" />')
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://vocdoni.io/en/use-cases" />')
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://vocdoni.io/en/use-cases" />')
  })
})
