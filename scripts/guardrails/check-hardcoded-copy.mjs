import fs from 'node:fs'
import path from 'node:path'

import { HARDCODED_COPY_BASELINE } from './baseline.mjs'
import { findHardcodedJsxCopyViolations } from './lib.mjs'

const roots = ['components', 'pages']

const collectTsxFiles = (directory) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue

    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectTsxFiles(absolutePath))
      continue
    }

    if (entry.isFile() && absolutePath.endsWith('.tsx')) {
      files.push(absolutePath)
    }
  }

  return files
}

const getSignature = (filePath, violation) => `${filePath}|${violation.kind}|${violation.value}`

const violations = roots
  .flatMap((root) => collectTsxFiles(path.resolve(root)))
  .flatMap((absolutePath) => {
    const relativePath = path.relative(process.cwd(), absolutePath).split(path.sep).join('/')
    const source = fs.readFileSync(absolutePath, 'utf8')

    return findHardcodedJsxCopyViolations(source, relativePath)
      .filter((violation) => !HARDCODED_COPY_BASELINE.has(getSignature(relativePath, violation)))
      .map((violation) => ({
        filePath: relativePath,
        ...violation,
      }))
  })
  .sort((left, right) => {
    if (left.filePath !== right.filePath) return left.filePath.localeCompare(right.filePath)
    if (left.line !== right.line) return left.line - right.line
    return left.value.localeCompare(right.value)
  })

if (violations.length > 0) {
  console.error('Hardcoded JSX copy found outside the allowlisted baseline:')
  for (const violation of violations) {
    console.error(`- ${violation.filePath}:${violation.line} [${violation.kind}] ${violation.value}`)
  }
  console.error('')
  console.error('Wrap user-facing copy with react-i18next t(...) using a default value, then rerun pnpm translations.')
  process.exit(1)
}

console.log('Hardcoded JSX copy check passed.')
