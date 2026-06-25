import { describe, expect, it } from 'vitest'

import type { DocMeta } from '@/lib/docs/markdown'
import { buildDocsNav } from '@/lib/docs/nav'

const metas: DocMeta[] = [
  { slug: 'quickstart', group: 'get_started', order: 10, titles: { en: 'Quickstart' } },
  { slug: 'overview', group: 'get_started', order: 0, titles: { en: 'Overview', es: 'Resumen' } },
  { slug: 'census', group: 'core_concepts', order: 5, titles: { en: 'Census' } },
  { slug: 'api-reference', group: 'api_reference', order: 1, titles: { en: 'API reference' } },
]

describe('buildDocsNav', () => {
  it('groups in taxonomy order and omits empty groups', () => {
    const nav = buildDocsNav('en', metas)
    expect(nav.map((g) => g.id)).toEqual(['get_started', 'core_concepts', 'api_reference'])
  })

  it('sorts items within a group by order', () => {
    const nav = buildDocsNav('en', metas)
    expect(nav[0].items.map((i) => i.slug)).toEqual(['overview', 'quickstart'])
  })

  it('maps the overview slug to the docs index and others to /developers/docs/<slug>', () => {
    const nav = buildDocsNav('en', metas)
    const get = nav[0].items
    expect(get.find((i) => i.slug === 'overview')?.href).toBe('/developers/docs')
    expect(get.find((i) => i.slug === 'quickstart')?.href).toBe('/developers/docs/quickstart')
  })

  it('uses the locale title, falling back to English', () => {
    const nav = buildDocsNav('es', metas)
    expect(nav[0].items.find((i) => i.slug === 'overview')?.label).toBe('Resumen')
    // quickstart has no es title -> en fallback
    expect(nav[0].items.find((i) => i.slug === 'quickstart')?.label).toBe('Quickstart')
  })
})
