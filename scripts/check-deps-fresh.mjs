#!/usr/bin/env node
/**
 * Warn when `node_modules` is older than `pnpm-lock.yaml`.
 *
 * Rebasing onto a moving `main` — or pulling a dependabot commit — changes the
 * lockfile without touching `node_modules`. The failure that follows is not
 * obvious: a transitive dependency simply is not there, and the first thing to
 * ask for it dies with a raw `MODULE_NOT_FOUND` stack from inside a library
 * nobody here imports directly. The cause (a stale install) appears nowhere in
 * that trace.
 *
 * `pnpm` copies the lockfile it installed from to `node_modules/.pnpm/lock.yaml`,
 * so comparing the two files is exact and costs nothing.
 *
 * This only ever warns. A hook that blocks or installs on its own would be
 * worse than the problem: it would fire mid-rebase and surprise people.
 */
import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'

const LOCKFILE = 'pnpm-lock.yaml'
const INSTALLED = 'node_modules/.pnpm/lock.yaml'

const say = (message) => process.stderr.write(`\n  ${message}\n  Run: pnpm install\n\n`)

if (!existsSync('node_modules')) {
  say('Dependencies are not installed.')
  process.exit(0)
}

// No copy means an install shape this check does not understand. Stay quiet
// rather than nag about something that may well be fine.
if (!existsSync(LOCKFILE) || !existsSync(INSTALLED)) process.exit(0)

const digest = (path) => createHash('sha256').update(readFileSync(path)).digest('hex')

if (digest(LOCKFILE) !== digest(INSTALLED)) {
  say(`${LOCKFILE} has changed since the last install, so node_modules is stale.`)
}

process.exit(0)
