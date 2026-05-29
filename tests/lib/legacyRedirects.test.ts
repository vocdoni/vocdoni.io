import { describe, expect, it } from 'vitest'

import {
  buildDigitalOceanIngressRules,
  buildNetlifyRedirects,
  injectIngressRules,
  LEGACY_REDIRECT_RULES_MARKER,
  LEGACY_REDIRECTS,
} from '@/lib/legacyRedirects'
import { localeDefault, locales } from '@/locales'

// Real routes discovered under pages/ (unprefixed). Update if pages are added/removed.
const REAL_BASE_ROUTES = ['/', '/app', '/about-us', '/contact', '/use-cases', '/privacy', '/terms']
// Every URL actually served: each base route, locale-prefixed (home -> /<locale>).
const REAL_URLS = new Set(REAL_BASE_ROUTES.flatMap((r) => locales.map((l) => (r === '/' ? `/${l}` : `/${l}${r}`))))

const stripLocale = (url: string) => {
  const match = url.match(/^\/([a-z]{2})(\/.*|$)/)
  if (match && (locales as readonly string[]).includes(match[1])) return match[2] || '/'
  return null
}

describe('LEGACY_REDIRECTS source of truth', () => {
  it('has unique `from` paths', () => {
    const froms = LEGACY_REDIRECTS.map((r) => r.from)
    expect(new Set(froms).size).toBe(froms.length)
  })

  it('never redirects a path that is, or prefixes, a real route', () => {
    // DO matches by string prefix, so a `from` must neither equal nor prefix any live URL.
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

  it('maps /product to /app and everything else to home', () => {
    const map = Object.fromEntries(LEGACY_REDIRECTS.map((r) => [r.from, r.to]))
    expect(map['/product']).toBe('/en/app') // unprefixed -> default locale
    expect(map['/es/product']).toBe('/es/app')
    expect(map['/advantages']).toBe('/en')
    expect(map['/es/advantages']).toBe('/es')
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

describe('buildDigitalOceanIngressRules', () => {
  it('emits a prefix-matched 301 ingress rule per redirect', () => {
    const yaml = buildDigitalOceanIngressRules()
    expect((yaml.match(/redirect_code: 301/g) ?? []).length).toBe(LEGACY_REDIRECTS.length)
    expect((yaml.match(/- match:/g) ?? []).length).toBe(LEGACY_REDIRECTS.length)
    for (const { from, to } of LEGACY_REDIRECTS) {
      expect(yaml).toContain(`prefix: ${from}`)
      expect(yaml).toContain(`uri: ${to}`)
    }
  })
})

describe('injectIngressRules', () => {
  const template = [
    'ingress:',
    '  rules:',
    `  ${LEGACY_REDIRECT_RULES_MARKER}`,
    '  - component:',
    '      name: vocdoni-io',
    '    match:',
    '      path:',
    '        prefix: /',
    'static_sites:',
    '- envs:',
    '  - key: SITE_URL',
    '    value: ${SITE_URL}',
    '',
  ].join('\n')

  it('replaces the marker with every redirect rule, keeping the catch-all and env placeholders', () => {
    const spec = injectIngressRules(template)
    expect(spec).not.toContain(LEGACY_REDIRECT_RULES_MARKER)
    expect((spec.match(/redirect_code: 301/g) ?? []).length).toBe(LEGACY_REDIRECTS.length)
    expect(spec).toContain('- component:') // catch-all preserved
    expect(spec).toContain('value: ${SITE_URL}') // env placeholder left for app_action to substitute
    // the catch-all rule stays after the generated redirect rules
    expect(spec.indexOf('redirect_code: 301')).toBeLessThan(spec.indexOf('- component:'))
  })

  it('throws when the template is missing the marker', () => {
    expect(() => injectIngressRules('ingress:\n  rules: []\n')).toThrow(LEGACY_REDIRECT_RULES_MARKER)
  })
})
