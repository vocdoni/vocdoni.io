import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { buildLlmsIndex, type LlmsContent, loadLlmsContent } from '@/lib/llms/build'
import { catalogStringKeys, FAMILIES, familyNoteKey } from '@/lib/llms/catalog'
import { allLinks, parseLlmsTxt } from '@/lib/llms/parse'
import { loadRawStrings } from '@/lib/llms/strings'
import { localeDefault, locales } from '@/locales'

const ROOT = path.resolve(__dirname, '../../..')
const HOST = 'https://vocdoni.io'
const content: LlmsContent = await loadLlmsContent(ROOT, locales)
const english = await loadRawStrings(ROOT, localeDefault)

/**
 * Only one index ships, in English (see lib/llms/catalog.ts). The generator still takes a
 * locale, so these assert that the English source is complete and that the locale seam
 * behaves if it is ever switched on.
 */
const requiredKeys = [
  ...catalogStringKeys(),
  ...FAMILIES.flatMap((family) => content.familyChildren[family].map((slug) => familyNoteKey(family, slug))),
]

describe('the English source is complete', () => {
  it('defines every key the catalog and the page families need', () => {
    const missing = requiredKeys.filter((key) => !english[key]?.trim())
    expect(missing).toEqual([])
  })

  it('carries no llms.* key the generator never reads', () => {
    const needed = new Set(requiredKeys)
    const orphans = Object.keys(english).filter((key) => key.startsWith('llms.') && !needed.has(key))
    expect(orphans).toEqual([])
  })
})

describe('the locale seam still works if switched on', () => {
  it('prefixes every internal link with the requested locale', async () => {
    const raw = await buildLlmsIndex({
      root: ROOT,
      hostname: HOST,
      locale: 'es',
      defaultLocale: localeDefault,
      locales,
      content,
    })
    const internal = allLinks(parseLlmsTxt(raw))
      .map((l) => l.url)
      .filter((u) => u.startsWith(`${HOST}/`) && !u.endsWith('.txt'))

    expect(internal.length).toBeGreaterThan(0)
    for (const url of internal) expect(url.startsWith(`${HOST}/es/`)).toBe(true)
  })
})
