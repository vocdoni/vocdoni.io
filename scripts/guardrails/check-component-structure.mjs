import fs from 'node:fs'
import path from 'node:path'

import { getInvalidComponentDirectories } from './lib.mjs'

const componentsRoot = path.resolve('components')

const topLevelDirectories = fs
  .readdirSync(componentsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.posix.join('components', entry.name))

const invalidDirectories = getInvalidComponentDirectories(topLevelDirectories)

if (invalidDirectories.length > 0) {
  console.error('Disallowed component directories found:')
  for (const directory of invalidDirectories) {
    console.error(`- ${directory}`)
  }
  console.error('')
  console.error('Use stable domain folders such as components/app or components/use-cases.')
  console.error('Reserve components/shadcn-studio for studio-derived blocks and components/ui for primitives.')
  process.exit(1)
}

console.log(`Component structure check passed for ${topLevelDirectories.length} top-level directories.`)
