import { readdirSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { buildNetlifyRedirects, LEGACY_REDIRECTS } from '@/lib/legacyRedirects'
import { localeDefault, locales } from '@/locales'

const PAGES_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../pages')

/** Every directory under `pages/` that holds a `+Page.*` file (Vike filesystem routing). */
const collectPageDirs = (dir: string): string[] => {
  const dirs: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) dirs.push(...collectPageDirs(join(dir, entry.name)))
    else if (/^\+Page\.[jt]sx?$/.test(entry.name)) dirs.push(dir)
  }
  return dirs
}

// Real routes, derived from pages/ so they can never drift out of sync with the filesystem.
// `pages/index` -> `/`; Vike control routes (`_error`, etc.) are excluded.
const REAL_BASE_ROUTES = collectPageDirs(PAGES_DIR)
  .map((d) => `/${relative(PAGES_DIR, d).split(sep).join('/')}`)
  .filter((route) => !route.split('/').some((seg) => seg.startsWith('_')))
  .map((route) => (route === '/index' ? '/' : route))
  .sort()
// Every URL actually served: each base route both bare (compatibility redirect) and locale-prefixed
// (home -> /<locale>). A legacy `from` must not equal or prefix any of these.
const REAL_URLS = new Set(
  REAL_BASE_ROUTES.flatMap((r) => [r, ...locales.map((l) => (r === '/' ? `/${l}` : `/${l}${r}`))])
)

// Matches any configured locale, not just two-letter ones: `pt-br` is a real locale
// and renamed-route redirects target every locale the old URL was served in.
const stripLocale = (url: string) => {
  for (const locale of locales) {
    if (url === `/${locale}`) return '/'
    if (url.startsWith(`/${locale}/`)) return url.slice(locale.length + 1)
  }
  return null
}

describe('LEGACY_REDIRECTS source of truth', () => {
  it('has unique `from` paths', () => {
    const froms = LEGACY_REDIRECTS.map((r) => r.from)
    expect(new Set(froms).size).toBe(froms.length)
  })

  it('never redirects a path that is, or prefixes, a real route', () => {
    // Netlify matches `_redirects` rules by path, so a `from` must neither equal nor prefix any live URL.
    for (const { from } of LEGACY_REDIRECTS) {
      expect(REAL_URLS.has(from)).toBe(false)
      for (const real of REAL_URLS) expect(real.startsWith(from)).toBe(false)
    }
  })

  it('targets a real, locale-prefixed URL in a single hop (no chains)', () => {
    const froms = new Set(LEGACY_REDIRECTS.map((r) => r.from))
    for (const { to } of LEGACY_REDIRECTS) {
      const rest = stripLocale(to)
      expect(rest, `"${to}" must be locale-prefixed`).not.toBeNull()
      expect(REAL_BASE_ROUTES).toContain(rest)
      expect(froms.has(to)).toBe(false) // a target must not itself be a redirect source
    }
  })

  it('maps each legacy path to its current destination', () => {
    const map = Object.fromEntries(LEGACY_REDIRECTS.map((r) => [r.from, r.to]))
    expect(map['/product']).toBe('/en/app') // unprefixed -> default locale
    expect(map['/es/product']).toBe('/es/app')
    expect(map['/advantages']).toBe('/en')
    expect(map['/es/advantages']).toBe('/es')
    expect(map['/docs']).toBe('/en/developers')
    expect(map['/es/docs']).toBe('/es/developers')
    expect(map['/footer']).toBe('/en')
    expect(map['/api']).toBe('/en') // internal only - never an external site
    expect(map['/politica-priv-14fruites']).toBe('/en/privacy')
  })

  it('keeps the language for active locales and collapses inactive ones to the default', () => {
    for (const { from, to } of LEGACY_REDIRECTS) {
      const match = from.match(/^\/([a-z]{2})\//)
      if (!match) continue // unprefixed legacy path or one-off
      const lang = match[1]
      const expected = (locales as readonly string[]).includes(lang) ? lang : localeDefault
      expect(to.startsWith(`/${expected}`), `${from} -> ${to} should target /${expected}`).toBe(true)
    }
  })
})

describe('buildNetlifyRedirects', () => {
  it('emits one 301 line per redirect, most-specific first', () => {
    const lines = buildNetlifyRedirects()
      .split('\n')
      .filter((line) => line && !line.startsWith('#'))
    expect(lines).toHaveLength(LEGACY_REDIRECTS.length)
    for (const line of lines) expect(line).toMatch(/^\/\S+ {2}\/\S+ {2}301$/)
    // longest `from` first, so a shorter prefix can never shadow a more specific rule
    const lengths = lines.map((line) => line.split(/\s+/)[0].length)
    expect(lengths).toEqual([...lengths].sort((a, b) => b - a))
  })
})
