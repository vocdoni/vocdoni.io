import fs from 'node:fs'
import path from 'node:path'

import { findDynamicTranslationKeys } from './lib.mjs'

const roots = ['components', 'pages']

const collectSourceFiles = (directory) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue

    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(absolutePath))
      continue
    }

    if (entry.isFile() && (absolutePath.endsWith('.tsx') || absolutePath.endsWith('.ts'))) {
      files.push(absolutePath)
    }
  }

  return files
}

const violations = roots
  .flatMap((root) => collectSourceFiles(path.resolve(root)))
  .flatMap((absolutePath) => {
    const relativePath = path.relative(process.cwd(), absolutePath).split(path.sep).join('/')
    const source = fs.readFileSync(absolutePath, 'utf8')

    return findDynamicTranslationKeys(source, relativePath).map((violation) => ({
      filePath: relativePath,
      ...violation,
    }))
  })
  .sort((a, b) => a.filePath.localeCompare(b.filePath) || a.line - b.line)

if (violations.length > 0) {
  console.error('Dynamic translation keys found:')
  for (const v of violations) {
    console.error(`  ${v.filePath}:${v.line}  t(${v.snippet})`)
  }
  console.error('')
  console.error('The i18next extractor only recognises static string literals.')
  console.error('Keys passed as variables or template literals are invisible to the extractor,')
  console.error('so they are deleted from the locale files on the next extraction run and')
  console.error('the push guardrail rejects the commit.')
  console.error('')
  console.error('Fix: use a fully static string for every t() call.')
  console.error('')
  console.error('  // BAD — extractor cannot see this key')
  console.error('  t(variable)')
  console.error('  t(`feature.${key}.title`)')
  console.error('')
  console.error('  // GOOD — one static call per item')
  console.error("  t('feature.speed.title', 'Fast')")
  console.error("  t('feature.privacy.title', 'Private')")
  console.error('')
  console.error('  // GOOD — static key + returnObjects for arrays')
  console.error("  t('feature.items', { returnObjects: true })")
  process.exit(1)
}

console.log('Dynamic translation key check passed.')
