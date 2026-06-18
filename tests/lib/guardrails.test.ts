import { describe, expect, it } from 'vitest'

import {
  findDynamicTranslationKeys,
  findEmptyTranslationLeafValues,
  findHardcodedJsxCopyViolations,
  findUntranslatedLeafValues,
  getConfiguredLocales,
  getInvalidComponentDirectories,
} from '../../scripts/guardrails/lib.mjs'

describe('getInvalidComponentDirectories', () => {
  it('accepts approved buckets, domain folders, and documented legacy exceptions', () => {
    expect(
      getInvalidComponentDirectories([
        'components/ui',
        'components/shadcn-studio',
        'components/app',
        'components/use-cases',
        'components/alternative-landing',
      ])
    ).toEqual([])
  })

  it('rejects new versioned, new-*, and legacy-* top-level component folders', () => {
    expect(
      getInvalidComponentDirectories(['components/FooV3', 'components/new-home', 'components/legacy-home'])
    ).toEqual(['components/FooV3', 'components/legacy-home', 'components/new-home'])
  })
})

describe('findDynamicTranslationKeys', () => {
  it('flags variable keys, template literals with substitutions, and binary expressions', () => {
    const source = `
      export function C() {
        const key = 'foo'
        const a = t(key)
        const b = t(\`section.\${key}.title\`)
        const c = t('prefix.' + key)
        return null
      }
    `
    expect(findDynamicTranslationKeys(source, 'components/app/C.tsx')).toEqual([
      { line: 4, snippet: 'key' },
      { line: 5, snippet: '`section.${key}.title`' },
      { line: 6, snippet: "'prefix.' + key" },
    ])
  })

  it('allows static string literals and no-substitution template literals', () => {
    const source = `
      export function C() {
        const a = t('static.key', 'Default')
        const b = t('other.key', { returnObjects: true })
        return null
      }
    `
    expect(findDynamicTranslationKeys(source, 'components/app/C.tsx')).toEqual([])
  })
})

describe('findHardcodedJsxCopyViolations', () => {
  it('flags visible JSX text and accessible copy in relevant attributes', () => {
    const source = `
      export function Example() {
        return (
          <section>
            <h2>Hello world</h2>
            <button aria-label="Open menu">Toggle menu</button>
            <img alt="Dashboard preview" src="/demo.png" />
            <span>{'Start free'}</span>
          </section>
        )
      }
    `

    expect(findHardcodedJsxCopyViolations(source, 'components/app/Example.tsx')).toEqual([
      { kind: 'text', line: 5, value: 'Hello world' },
      { kind: 'attribute', line: 6, value: 'Open menu' },
      { kind: 'text', line: 6, value: 'Toggle menu' },
      { kind: 'attribute', line: 7, value: 'Dashboard preview' },
      { kind: 'expression', line: 8, value: 'Start free' },
    ])
  })

  it('ignores translated copy and non-user-facing strings', () => {
    const source = `
      import { useTranslation } from 'react-i18next'

      export function Example() {
        const { t } = useTranslation()

        return (
          <div className="rounded-xl border" data-testid="hero-card">
            <h2>{t('hero.title', 'Run your vote online')}</h2>
            <button aria-label={t('hero.cta', 'Open menu')}>{t('hero.cta', 'Open menu')}</button>
            <a href="https://vocdoni.io">Docs</a>
          </div>
        )
      }
    `

    expect(findHardcodedJsxCopyViolations(source, 'components/app/Example.tsx')).toEqual([
      { kind: 'text', line: 11, value: 'Docs' },
    ])
  })

  it('skips files inside approved generated block directories', () => {
    const source = `
      export default function StudioBlock() {
        return <div>Static studio copy</div>
      }
    `

    expect(findHardcodedJsxCopyViolations(source, 'components/shadcn-studio/blocks/example/example.tsx')).toEqual([])
  })
})

describe('findEmptyTranslationLeafValues', () => {
  it('finds empty string leaf values in locale resources', () => {
    expect(
      findEmptyTranslationLeafValues({
        easy_features: {
          title: '',
          tabs: {
            members: { name: '' },
          },
        },
        steps_section: {
          subtitle: 'Filled',
        },
      })
    ).toEqual(['easy_features.title', 'easy_features.tabs.members.name'])
  })

  it('ignores non-empty strings, arrays, and nested objects without empty leaves', () => {
    expect(
      findEmptyTranslationLeafValues({
        use_cases_page: {
          hero: {
            stats: [
              { value: '200,000+', label: 'Votes processed' },
              { value: '500+', label: 'Organizations' },
            ],
          },
        },
        vocdoni_app: {
          features: {
            subtitle: 'Everything you need to run secure voting.',
          },
        },
      })
    ).toEqual([])
  })
})

describe('getConfiguredLocales', () => {
  it('extracts the locales array from the locales/index.ts source', () => {
    const source = `
      type Locale = 'ca' | 'en' | 'es'
      const locales: Locale[] = ['ca', 'en', 'es']
      const localeDefault: Locale = 'en'
      const availableLocales: { value: Locale; label: string }[] = [
        { value: 'ca', label: 'Català' },
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' },
      ]
      export { availableLocales, localeDefault, locales, type Locale }
    `
    expect(getConfiguredLocales(source)).toEqual(['ca', 'en', 'es'])
  })

  it('returns null when no locales array is present', () => {
    expect(getConfiguredLocales('export const localeDefault = "en"')).toBeNull()
  })
})

describe('findUntranslatedLeafValues', () => {
  const source = {
    hero: { title: 'Secure online voting', cta: 'Get started' },
    badges: ['Accessible', 'GDPR'],
    brand: 'Vocdoni',
    stats: [{ value: 'OECD', label: 'Format' }],
  }
  const references = [
    {
      hero: { title: 'Votación segura en línea', cta: 'Empezar' },
      badges: ['Accesible', 'GDPR'],
      brand: 'Vocdoni',
      stats: [{ value: 'OCDE', label: 'Formato' }],
    },
    {
      hero: { title: 'Votació segura en línia', cta: 'Comença' },
      badges: ['Accessible', 'GDPR'],
      brand: 'Vocdoni',
      stats: [{ value: 'OCDE', label: 'Format' }],
    },
  ]

  it('flags object and array leaves copied verbatim from English when a reference translates them', () => {
    const locale = {
      hero: { title: 'Secure online voting', cta: 'Loslegen' },
      badges: ['Accessible', 'GDPR'],
      brand: 'Vocdoni',
      stats: [{ value: 'OECD', label: 'Format' }],
    }

    // badges.0 ('Accessible') only Spanish translates ('Accesible'); stats.0.label ('Format') only
    // Spanish translates ('Formato'). badges.1/brand/stats.0.value stay identical in every reference.
    expect(findUntranslatedLeafValues(locale, source, references)).toEqual([
      'hero.title',
      'badges.0',
      'stats.0.value',
      'stats.0.label',
    ])
  })

  it('ignores empty strings, proper nouns/acronyms, and already translated values', () => {
    const locale = {
      hero: { title: '', cta: 'Loslegen' },
      badges: ['Accessible', 'GDPR'],
      brand: 'Vocdoni',
      stats: [{ value: 'OECD', label: 'Format' }],
    }

    // hero.title is empty (pending); brand/GDPR never qualify; the rest stay flagged.
    expect(findUntranslatedLeafValues(locale, source, references)).toEqual([
      'badges.0',
      'stats.0.value',
      'stats.0.label',
    ])
  })
})
