import fs from 'node:fs'
import path from 'node:path'

import { findUntranslatedLeafValues } from './lib.mjs'

const SOURCE_LOCALE = 'en'
// Complete, human-maintained locales used as the reference. A key counts as translatable when at
// least one of them renders it differently from English, which keeps proper nouns, brands and
// acronyms (identical across every reference) from being reported as untranslated copy.
const REFERENCE_LOCALES = ['es', 'ca']
// In-progress locales that must never ship copy pasted verbatim from the English source.
const TARGET_LOCALES = ['de', 'el', 'fr', 'it', 'pt']

const localeRelativePath = (locale) => `locales/${locale}/common.json`
const readLocale = (locale) => JSON.parse(fs.readFileSync(path.resolve(localeRelativePath(locale)), 'utf8'))

const source = readLocale(SOURCE_LOCALE)
const references = REFERENCE_LOCALES.map(readLocale)

// Keys whose value is intentionally identical to English (proper nouns, brands, acronyms, or words
// genuinely identical in the target language such as German loanwords and French/English cognates).
// Reviewed manually - see untranslated-copy-allowlist.json.
const allowlistPath = path.resolve('scripts/guardrails/untranslated-copy-allowlist.json')
const allowlist = fs.existsSync(allowlistPath) ? JSON.parse(fs.readFileSync(allowlistPath, 'utf8')) : {}

const violations = TARGET_LOCALES.flatMap((locale) => {
  const data = readLocale(locale)
  const allowed = new Set(Array.isArray(allowlist[locale]) ? allowlist[locale] : [])
  return findUntranslatedLeafValues(data, source, references)
    .filter((keyPath) => !allowed.has(keyPath))
    .map((keyPath) => `${localeRelativePath(locale)}:${keyPath}`)
})

if (violations.length > 0) {
  console.error('Untranslated copy found (values identical to the English source):')
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  console.error('')
  console.error(
    'These keys still hold the English copy. Translate them, or set the value to an empty string ("") ' +
      'so the translation tooling can fill them in.'
  )
  process.exit(1)
}

console.log('Untranslated-copy check passed.')
