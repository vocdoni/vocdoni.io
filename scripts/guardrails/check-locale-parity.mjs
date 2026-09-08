import fs from 'node:fs'
import path from 'node:path'

import { flattenTranslationLeaves } from './lib.mjs'

/**
 * Every locale must carry the keys English carries.
 *
 * No other guardrail catches a missing nested key: the extractor only sees flat
 * `t()` calls, and the non-empty and no-copy checks inspect keys that exist. A
 * page that reads a whole subtree with `returnObjects` renders a missing key as
 * an empty section rather than falling back to English, so a dropped key stays
 * invisible until someone opens that page in that language.
 */
const SOURCE_LOCALE = 'en'
const LOCALES = ['ca', 'de', 'el', 'en', 'es', 'eu', 'fr', 'hi', 'it', 'pt', 'pt-br']

/**
 * Subtrees whose shape is deliberately per-locale, compared only for presence.
 *
 * A vertical's legal section names the statutes of the country the language is
 * actually read in, so its frameworks differ in number and in the length of
 * each response list. That is the point of the section, not drift, and holding
 * it to the English shape would force a German page to cite Spanish law.
 */
const JURISDICTION_SPECIFIC = /^(solutions\.[a-z_]+\.legal\.frameworks)\..+$/

const localeRelativePath = (locale) => `locales/${locale}/common.json`
const readLocale = (locale) => JSON.parse(fs.readFileSync(path.resolve(localeRelativePath(locale)), 'utf8'))

/**
 * Leaf paths, with jurisdiction-specific subtrees collapsed to the array that
 * holds them: `…legal.frameworks.1.response.3` becomes `…legal.frameworks`, so
 * a locale is required to have the section but free to fill it with its own
 * statutes.
 */
const comparableKeys = (data) =>
  new Set(flattenTranslationLeaves(data).map(([keyPath]) => keyPath.replace(JURISDICTION_SPECIFIC, '$1')))

const source = comparableKeys(readLocale(SOURCE_LOCALE))

const violations = LOCALES.filter((locale) => locale !== SOURCE_LOCALE).flatMap((locale) => {
  const keys = comparableKeys(readLocale(locale))
  const missing = [...source].filter((key) => !keys.has(key))
  const extra = [...keys].filter((key) => !source.has(key))
  return [
    ...missing.map((key) => `${localeRelativePath(locale)}: missing ${key}`),
    ...extra.map((key) => `${localeRelativePath(locale)}: not in ${SOURCE_LOCALE}, ${key}`),
  ]
})

if (violations.length > 0) {
  console.error('Locale key parity check failed:')
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  console.error('')
  console.error(`Every locale must hold the keys in locales/${SOURCE_LOCALE}/common.json.`)
  console.error('Add the missing keys with a translated value, or remove the stale ones.')
  process.exit(1)
}

console.log(`Locale key parity check passed for ${LOCALES.length} locales.`)
