import { describe, expect, it } from 'vitest'

import enCommon from '@/locales/en/common.json'
import { metaDefaults } from '@/lib/page-meta'

const getNestedValue = (source: unknown, key: string) =>
  key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in (value as Record<string, unknown>)) {
      return (value as Record<string, unknown>)[segment]
    }
    return undefined
  }, source)

/**
 * `metaDefaults` is the only real `t()` call site for the whole `meta.*` tree, so it is what
 * `i18next-cli extract` reads, while `locales/en/common.json` is what the site actually serves.
 * Two files holding the same strings drift silently: the extractor will not overwrite a key that
 * already has a value, so a stale default only surfaces once the key is reset or a locale is added.
 */
describe('metaDefaults', () => {
  const keys = Object.keys(metaDefaults)

  it('covers a realistic number of pages', () => {
    expect(keys.length).toBeGreaterThan(50)
  })

  it.each(keys)('%s matches locales/en/common.json', (key) => {
    expect(getNestedValue(enCommon, key)).toBe(metaDefaults[key as keyof typeof metaDefaults])
  })
})
