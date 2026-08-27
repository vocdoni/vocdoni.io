import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { buildLlmsFull, buildLlmsIndex, type LlmsContext } from '@/lib/llms/build'
import { allLinks, parseLlmsTxt } from '@/lib/llms/parse'
import {
  blogCategoryPath,
  discoverBlogCategories,
  discoverDocs,
  discoverPageRoutes,
  discoverPosts,
  discoverRouteChildren,
  docPath,
  localePath,
  postPath,
  rawDocPath,
  rawPostPath,
} from '@/lib/llms/routes'
import { locales } from '@/locales'

const ROOT = path.resolve(__dirname, '../../..')
const HOST = 'https://vocdoni.io'
const ctx: LlmsContext = { root: ROOT, hostname: HOST, locale: 'en', defaultLocale: 'en', locales }

const index = parseLlmsTxt(await buildLlmsIndex(ctx))
const full = parseLlmsTxt(await buildLlmsFull(ctx))
const indexPaths = new Set(allLinks(index).map((l) => l.url.replace(HOST, '')))
const fullPaths = new Set(allLinks(full).map((l) => l.url.replace(HOST, '')))

/** Everything the prerender will actually emit, built from the same primitives the index is. */
async function prerenderedPaths(): Promise<Set<string>> {
  const [routes, docs, posts, categories] = await Promise.all([
    discoverPageRoutes(ROOT),
    discoverDocs(ROOT, 'en'),
    discoverPosts(ROOT, locales),
    discoverBlogCategories(ROOT, locales),
  ])
  return new Set([
    ...routes.map((r) => localePath('en', r)),
    ...docs.flatMap((d) => [docPath('en', d.slug), rawDocPath('en', d.slug)]),
    ...posts.flatMap((p) => [postPath('en', p.slug), rawPostPath('en', p.slug)]),
    ...categories.map((c) => blogCategoryPath('en', c)),
    '/llms.txt',
    '/llms-full.txt',
  ])
}

describe('llms.txt is llmstxt.org-shaped', () => {
  it('opens with the H1 and a single blockquote summary', async () => {
    const raw = await buildLlmsIndex(ctx)
    expect(raw.split('\n')[0]).toBe('# Vocdoni')
    expect(raw.split('\n')[2].startsWith('> ')).toBe(true)
    expect(index.summary.length).toBeGreaterThan(120)
  })

  it('carries the free-form intro prose before the first section', () => {
    expect(index.intro.length).toBe(6)
    for (const paragraph of index.intro) expect(paragraph.length).toBeGreaterThan(80)
  })

  it('states the positioning an agent needs to rank Vocdoni', () => {
    const prose = index.intro.join(' ').toLowerCase()
    expect(prose).toContain('recorded as cast')
    expect(prose).toContain('counted as recorded')
    expect(prose).toContain('vocdoni app')
    expect(prose).toContain('vocdoni projects')
    expect(prose).toContain('api and typescript sdk')
  })

  it('never claims the API is in alpha', async () => {
    expect((await buildLlmsIndex(ctx)).toLowerCase()).not.toContain('alpha')
  })

  it('annotates every single link', () => {
    const bare = allLinks(index).filter((l) => !l.note?.trim())
    expect(bare.map((l) => l.url)).toEqual([])
  })

  it('ends with the Optional section pointing at the full index', () => {
    const optional = index.sections.at(-1)!
    expect(optional.links.map((l) => l.url.replace(HOST, ''))).toEqual(['/llms-full.txt'])
  })

  it('advertises no per-locale index, because only the English one ships', () => {
    const txt = allLinks(index)
      .map((l) => l.url.replace(HOST, ''))
      .filter((u) => u.endsWith('.txt'))
    expect(txt).toEqual(['/llms-full.txt'])
  })
})

describe('llms.txt covers the site', () => {
  it.each(['solutions', 'learn', 'case-studies'])('links every page under pages/%s', async (family) => {
    for (const slug of await discoverRouteChildren(ROOT, family)) {
      expect(indexPaths, `/${family}/${slug} is missing from llms.txt`).toContain(
        localePath('en', `/${family}/${slug}`)
      )
    }
  })

  it('links every developer doc', async () => {
    for (const doc of await discoverDocs(ROOT, 'en')) {
      expect(indexPaths, `doc "${doc.slug}" is missing from llms.txt`).toContain(docPath('en', doc.slug))
    }
  })

  it('links all three products', () => {
    for (const route of ['/en/app', '/en/contact', '/en/developers']) expect(indexPaths).toContain(route)
  })

  it('has no duplicate URLs', () => {
    const urls = allLinks(index).map((l) => l.url)
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i)
    expect(dupes).toEqual([])
  })
})

describe('llms.txt links nothing that will 404', () => {
  it('resolves every internal link to a route that will be prerendered', async () => {
    const valid = await prerenderedPaths()
    const broken = allLinks(index)
      .map((l) => l.url)
      .filter((url) => url.startsWith(HOST))
      .map((url) => url.replace(HOST, ''))
      .filter((p) => !valid.has(p))
    expect(broken).toEqual([])
  })

  it('leaves off-site links untouched', () => {
    const external = allLinks(index).filter((l) => !l.url.startsWith(HOST))
    expect(external.length).toBeGreaterThan(0)
    for (const link of external) expect(link.url).toMatch(/^https:\/\//)
  })
})

describe('llms-full.txt enumerates everything', () => {
  it('lists the markdown mirror of every developer doc', async () => {
    for (const doc of await discoverDocs(ROOT, 'en')) expect(fullPaths).toContain(rawDocPath('en', doc.slug))
  })

  it('lists the markdown mirror of every published blog post', async () => {
    for (const post of await discoverPosts(ROOT, locales)) expect(fullPaths).toContain(rawPostPath('en', post.slug))
  })

  it('omits drafts', () => {
    expect([...fullPaths].some((p) => p.includes('canadas-online-voting-standard'))).toBe(false)
  })

  it('lists every blog category archive', async () => {
    for (const category of await discoverBlogCategories(ROOT, locales)) {
      expect(fullPaths).toContain(blogCategoryPath('en', category))
    }
  })

  it('lists every static route', async () => {
    for (const route of await discoverPageRoutes(ROOT)) expect(fullPaths).toContain(localePath('en', route))
  })

  it('says what it is, and points back at the curated index', () => {
    expect(full.intro.join(' ')).toContain('/llms.txt')
    expect(full.intro.join(' ')).toContain('.md')
  })
})
