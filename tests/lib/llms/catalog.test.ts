import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { catalogStringKeys, CURATED_SECTIONS, FAMILIES, FAMILY_META_NAMESPACE, familyNoteKey } from '@/lib/llms/catalog'
import { discoverPageRoutes, discoverPosts, discoverRouteChildren } from '@/lib/llms/routes'
import { loadRawStrings, loadStrings, metaKeyForSlug, snake } from '@/lib/llms/strings'
import { locales } from '@/locales'

const ROOT = path.resolve(__dirname, '../../..')
const t = await loadStrings(ROOT, 'en')
const enKeys = await loadRawStrings(ROOT, 'en')

/**
 * These are the anti-rot assertions. Adding a page under pages/solutions, pages/learn
 * or pages/case-studies without writing an llms.txt note must fail here, and so must
 * leaving a note behind for a page that was deleted.
 */
describe.each(FAMILIES)('curated notes cover pages/%s exactly', (family) => {
  it('has one note per child page, and no orphans', async () => {
    const slugs = await discoverRouteChildren(ROOT, family)
    expect(slugs.length).toBeGreaterThan(0)

    // A page with no note: the note lookup comes back empty.
    const annotated = slugs.filter((slug) => t(familyNoteKey(family, slug)).trim())
    expect(annotated, `pages/${family} children without an llms.txt note`).toEqual(slugs)

    // A note with no page: a key under llms.notes.<family> that no directory matches.
    const prefix = `llms.notes.${snake(family)}.`
    const expected = new Set(slugs.map(snake))
    const orphans = Object.keys(enKeys)
      .filter((key) => key.startsWith(prefix))
      .map((key) => key.slice(prefix.length))
      .filter((slug) => !expected.has(slug))
    expect(orphans, `llms.txt notes left behind for deleted pages/${family} children`).toEqual([])
  })

  it('resolves every child page to a title in locales/en/common.json', async () => {
    const namespace = FAMILY_META_NAMESPACE[family]
    for (const slug of await discoverRouteChildren(ROOT, family)) {
      expect(t(`${metaKeyForSlug(namespace, slug)}.title`), `missing title for /${family}/${slug}`).not.toBe('')
    }
  })
})

describe('curated notes are well formed', () => {
  it('gives every catalog string key a non-empty English value', () => {
    const missing = catalogStringKeys().filter((key) => !t(key).trim())
    expect(missing).toEqual([])
  })

  it('keeps every note on a single line and short enough to scan', async () => {
    const notes: [string, string][] = []
    for (const family of FAMILIES) {
      for (const slug of await discoverRouteChildren(ROOT, family)) {
        notes.push([familyNoteKey(family, slug), t(familyNoteKey(family, slug))])
      }
    }
    for (const key of catalogStringKeys()) {
      if (key.startsWith('llms.notes.')) notes.push([key, t(key)])
    }
    for (const [key, note] of notes) {
      expect(note, `${key} must be one line`).not.toMatch(/\n/)
      expect(note.length, `${key} is ${note.length} chars`).toBeLessThanOrEqual(260)
    }
  })
})

describe('curated structure', () => {
  it('has unique section ids', () => {
    const ids = CURATED_SECTIONS.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('points every hand-written route at a page that will be prerendered', async () => {
    const routes = new Set(await discoverPageRoutes(ROOT))
    for (const section of CURATED_SECTIONS) {
      for (const block of section.blocks) {
        if (block.type !== 'route') continue
        expect(routes, `${block.route} (section "${section.id}") is not a real route`).toContain(block.route)
      }
    }
  })

  it('points every curated blog post at a published post', async () => {
    const slugs = new Set((await discoverPosts(ROOT, locales)).map((p) => p.slug))
    for (const section of CURATED_SECTIONS) {
      for (const block of section.blocks) {
        if (block.type !== 'post') continue
        expect(slugs, `blog post "${block.slug}" (section "${section.id}") is missing or a draft`).toContain(block.slug)
      }
    }
  })
})
