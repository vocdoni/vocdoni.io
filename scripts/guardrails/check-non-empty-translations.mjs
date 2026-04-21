import fs from 'node:fs'
import path from 'node:path'

import { findEmptyTranslationLeafValues } from './lib.mjs'

const localeFiles = ['locales/en/common.json', 'locales/es/common.json', 'locales/ca/common.json']

const violations = localeFiles.flatMap((relativePath) => {
  const absolutePath = path.resolve(relativePath)
  const source = fs.readFileSync(absolutePath, 'utf8')
  const data = JSON.parse(source)

  return findEmptyTranslationLeafValues(data).map((keyPath) => `${relativePath}:${keyPath}`)
})

if (violations.length > 0) {
  console.error('Empty translation values found:')
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  console.error('')
  console.error('Do not keep extractor-created keys as empty strings. Add copy or remove the key until it is translated.')
  process.exit(1)
}

console.log('Non-empty translation check passed.')
