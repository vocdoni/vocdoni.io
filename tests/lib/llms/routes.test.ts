import path from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  blogCategoryPath,
  discoverBlogCategories,
  discoverDocs,
  discoverPageRoutes,
  discoverPosts,
  discoverRouteChildren,
  docPath,
  llmsFileName,
  localePath,
  rawDocPath,
  rawPostPath,
} from '@/lib/llms/routes'
import { locales } from '@/locales'

const ROOT = path.resolve(__dirname, '../../..')

describe('discoverPageRoutes', () => {
  it('returns locale-stripped static routes including the homepage', async () => {
    const routes = await discoverPageRoutes(ROOT)
    expect(routes).toContain('/')
    expect(routes).toContain('/app')
    expect(routes).toContain('/solutions/associations')
    expect(routes).toContain('/developers/docs')
  })

  it('skips Vike internals, dynamic-param dirs and the Keystatic admin', async () => {
    const routes = await discoverPageRoutes(ROOT)
    expect(routes.some((r) => r.includes('@'))).toBe(false)
    expect(routes.some((r) => r.includes('_error'))).toBe(false)
    expect(routes.some((r) => r.startsWith('/keystatic'))).toBe(false)
    expect(routes).not.toContain('/404')
  })

  it('is sorted and free of duplicates', async () => {
    const routes = await discoverPageRoutes(ROOT)
    expect(routes).toEqual([...routes].sort())
    expect(new Set(routes).size).toBe(routes.length)
  })
})

describe('discoverRouteChildren', () => {
  it('lists the direct child routes of a static page family', async () => {
    const solutions = await discoverRouteChildren(ROOT, 'solutions')
    expect(solutions).toContain('associations')
    expect(solutions).toContain('trade-unions')
    expect(solutions).toEqual([...solutions].sort())
  })

  it('returns an empty list for a family that does not exist', async () => {
    expect(await discoverRouteChildren(ROOT, 'not-a-family')).toEqual([])
  })
})

describe('discoverDocs', () => {
  it('reads slug, title, lead, group and order from frontmatter', async () => {
    const docs = await discoverDocs(ROOT, 'en')
    const census = docs.find((d) => d.slug === 'census')
    expect(census).toMatchObject({ slug: 'census', title: 'Census', group: 'core_concepts', order: 30 })
    expect(census!.lead.length).toBeGreaterThan(0)
  })

  it('sorts by nav group, then order', async () => {
    const docs = await discoverDocs(ROOT, 'en')
    expect(docs[0].slug).toBe('overview')
    const groups = docs.map((d) => d.group)
    expect(groups.indexOf('get_started')).toBeLessThan(groups.indexOf('core_concepts'))
    expect(groups.lastIndexOf('core_concepts')).toBeLessThan(groups.indexOf('integrator_platform'))
  })
})

describe('discoverPosts', () => {
  it('records the locales each post was authored in', async () => {
    const posts = await discoverPosts(ROOT, locales)
    const post = posts.find((p) => p.slug === 'referendum-bellpuig')
    expect(post?.locales).toContain('en')
    expect(post?.locales).toEqual(locales.filter((l) => post!.locales.includes(l)))
  })

  it('excludes drafts', async () => {
    const posts = await discoverPosts(ROOT, locales)
    expect(
      posts.some((p) => p.slug === 'canadas-online-voting-standard-what-can-dgsi-111-requires-and-why-it-matters')
    ).toBe(false)
  })

  it('sorts newest first', async () => {
    const dates = (await discoverPosts(ROOT, locales)).map((p) => p.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })
})

describe('discoverBlogCategories', () => {
  it('returns the categories referenced by non-draft posts', async () => {
    const categories = await discoverBlogCategories(ROOT, locales)
    expect(categories).toContain('success-stories')
    expect(categories).toEqual([...categories].sort())
  })
})

describe('path builders', () => {
  it('prefixes routes with the locale, collapsing the homepage', () => {
    expect(localePath('en', '/')).toBe('/en')
    expect(localePath('ca', '/solutions/ngos')).toBe('/ca/solutions/ngos')
  })

  it('maps the docs overview to the section root', () => {
    expect(docPath('en', 'overview')).toBe('/en/developers/docs')
    expect(docPath('en', 'census')).toBe('/en/developers/docs/census')
    expect(rawDocPath('en', 'overview')).toBe('/en/developers/docs.md')
    expect(rawDocPath('es', 'census')).toBe('/es/developers/docs/census.md')
  })

  it('builds blog paths', () => {
    expect(rawPostPath('en', 'referendum-bellpuig')).toBe('/en/blog/referendum-bellpuig.md')
    expect(blogCategoryPath('de', 'technology')).toBe('/de/blog/category/technology')
  })

  it('names the default locale file llms.txt and every other llms-<locale>.txt', () => {
    expect(llmsFileName('en', 'en')).toBe('llms.txt')
    expect(llmsFileName('es', 'en')).toBe('llms-es.txt')
  })
})
