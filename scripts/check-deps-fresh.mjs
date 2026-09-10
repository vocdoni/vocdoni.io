#!/usr/bin/env node
/**
 * Warn when `node_modules` is older than `pnpm-lock.yaml`.
 *
 * Rebasing onto a moving `main` — or switching to a branch that moved — changes
 * the lockfile without touching `node_modules`. The failure that follows is not
 * obvious: a transitive dependency simply is not there, and the first thing to
 * ask for it dies with a raw `MODULE_NOT_FOUND` stack from inside a library
 * nobody here imports directly. The cause (a stale install) appears nowhere in
 * that trace.
 *
 * `pnpm` copies the lockfile it installed from to `node_modules/.pnpm/lock.yaml`,
 * so comparing the two files is exact and costs nothing.
 *
 * Wired to two hooks, which between them cover every way the lockfile moves
 * under an install:
 *
 *   post-rewrite   `git rebase`, `git pull --rebase`, `git commit --amend`
 *   post-checkout  `git checkout` / `git switch` to another branch, `git clone`
 *
 * `post-checkout` also fires at the *start* of a rebase, and for file-level
 * checkouts, so those are filtered out below - a rebase reports once, at the
 * end, through `post-rewrite`.
 *
 * This only ever warns. A hook that blocked or ran an install on its own would
 * be worse than the problem: it would fire mid-rebase and take the decision
 * away from whoever is in the middle of something.
 */
import { createHash } from 'node:crypto'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const LOCKFILE = 'pnpm-lock.yaml'
const INSTALLED = 'node_modules/.pnpm/lock.yaml'

const say = (message) => process.stderr.write(`\n  ${message}\n  Run: pnpm install\n\n`)

/** `.git` is a directory in a normal clone and a file pointing elsewhere in a worktree. */
function gitDir() {
  if (!existsSync('.git')) return null
  if (statSync('.git').isDirectory()) return '.git'
  const pointer = readFileSync('.git', 'utf8').match(/^gitdir:\s*(.+)$/m)
  return pointer ? pointer[1].trim() : null
}

/** True while a rebase, merge, cherry-pick or revert is still running. */
function operationInProgress() {
  const dir = gitDir()
  if (!dir) return false
  return ['rebase-merge', 'rebase-apply', 'MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD'].some((entry) =>
    existsSync(join(dir, entry))
  )
}

// `post-checkout` is called with <previous HEAD> <new HEAD> <branch flag>, where
// the flag is 1 for a branch checkout and 0 for a file one. Every other hook
// passes something else, so this is also how we tell which hook called us.
const [previousHead, newHead, flag] = process.argv.slice(2)

if (flag === '0' || flag === '1') {
  // A file checkout moves no branch, and `git checkout -b` does not move HEAD.
  if (flag === '0' || previousHead === newHead) process.exit(0)
  // The checkout onto the rebase base is not the moment to report: the rebase
  // is still running, and `post-rewrite` will report once it lands.
  if (operationInProgress()) process.exit(0)
}

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
