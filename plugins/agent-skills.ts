import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import type { Plugin } from 'vite'
import matter from 'gray-matter'

/**
 * Emits /.well-known/agent-skills/index.json - the Agent Skills Discovery index
 * (RFC "Agent Skills Discovery via Well-Known URIs" v0.2.0,
 * https://github.com/cloudflare/agent-skills-discovery-rfc).
 *
 * Vocdoni does not vendor its skills in this repo: they live in the vocdoni/skills
 * marketplace (and the external source repos it references, e.g. vocdoni/integrator-sdk).
 * This plugin derives the index from that marketplace at build time so it can never
 * drift: it reads marketplace.json, keeps the SDK-category plugins (the Vocdoni-domain
 * skills, not the generic Go / tooling ones), discovers each plugin's SKILL.md files,
 * and pins every `url` to the exact commit SHA whose bytes it hashed - so the published
 * `digest` always matches the artifact a client fetches (the RFC requires it or clients
 * reject the content).
 *
 * Discovery uses git only - a shallow, blobless clone of each source repo over the git
 * transport (no api.github.com, so no unauthenticated REST rate limit and no token to
 * provision on any builder), reading marketplace.json and each SKILL.md via `git cat-file`.
 * `git` is always on PATH: the Netlify build runs in GitHub Actions and the DigitalOcean
 * production build runs on DO's builders - both are git checkouts. Failures are non-fatal:
 * the plugin warns and skips the file rather than breaking the build.
 *
 * The site is fully prerendered with no runtime server; this static JSON is served as-is
 * on both Netlify and DigitalOcean. Mirrors plugins/well-known.ts (also generated at
 * build, never committed).
 */

export const SKILLS_SCHEMA_URI = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json'

const MARKETPLACE_OWNER = 'vocdoni'
const MARKETPLACE_REPO = 'skills'
const MARKETPLACE_PATH = '.claude-plugin/marketplace.json'
const OUTPUT_PATH = '.well-known/agent-skills/index.json'

// Only these marketplace categories are advertised on vocdoni.io. The marketplace also
// carries generic engineering skills (Go, pi-subagent tooling) that are not Vocdoni-domain;
// those are intentionally excluded from the site's discovery index.
const INCLUDED_CATEGORIES = new Set(['sdk'])

export interface SkillEntry {
  name: string
  type: 'skill-md'
  description: string
  url: string
  digest: string
}

export interface MarketplacePlugin {
  name: string
  source: string
  category?: string
}

export interface SourceRef {
  owner: string
  repo: string
  subpath: string // '' for the repo root
}

// --- pure builders (unit-tested) --------------------------------------------

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** SHA-256 of the raw bytes, formatted as `sha256:{hex}` per the RFC. */
export function sha256Digest(bytes: Uint8Array | string): string {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`
}

/** Keep only the marketplace plugins whose category is advertised on the site. */
export function selectIncludedPlugins(plugins: MarketplacePlugin[]): MarketplacePlugin[] {
  return plugins.filter((p) => typeof p.category === 'string' && INCLUDED_CATEGORIES.has(p.category))
}

// Resolve a marketplace `source` to a repo + subpath. Local sources ("./plugins/x")
// resolve against the marketplace repo; absolute GitHub URLs point at their own repo root.
export function parseGithubSource(source: string, base: { owner: string; repo: string }): SourceRef | null {
  if (source.startsWith('./') || source.startsWith('../')) {
    const subpath = source.replace(/^\.\//, '').replace(/\/+$/, '')
    // A marketplace path resolves against the repo root and cannot escape it, so any
    // `..` segment (including a leading `../`) is invalid rather than silently rewritten.
    if (subpath === '' || subpath.split('/').includes('..')) return null
    return { owner: base.owner, repo: base.repo, subpath }
  }
  const m = source.match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/)
  if (!m) return null
  return { owner: m[1], repo: m[2].replace(/\.git$/, ''), subpath: '' }
}

// SKILL.md paths for a plugin: "<subpath>/skills/<name>/SKILL.md" (or "skills/<name>/SKILL.md"
// at the repo root). Only direct children of a `skills/` dir are treated as skills.
export function skillMdPaths(treePaths: string[], subpath: string): string[] {
  const prefix = subpath ? `${subpath.replace(/\/+$/, '')}/` : ''
  const re = new RegExp(`^${escapeRegExp(prefix)}skills/[^/]+/SKILL\\.md$`)
  return treePaths.filter((p) => re.test(p)).sort()
}

export function rawGithubUrl(owner: string, repo: string, ref: string, filePath: string): string {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filePath}`
}

// Build one index entry from the raw SKILL.md bytes. The digest is over the exact bytes
// served at `url`, and name/description come from the same bytes' YAML frontmatter.
export function buildSkillEntry(url: string, bytes: Buffer): SkillEntry {
  const { data } = matter(bytes.toString('utf8'))
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const description = typeof data.description === 'string' ? data.description.trim() : ''
  if (!name || !description) throw new Error(`SKILL.md at ${url} is missing name/description frontmatter`)
  return { name, type: 'skill-md', description, url, digest: sha256Digest(bytes) }
}

// Assemble the v0.2.0 index: de-duplicate by name (first wins) and sort for stable output.
export function buildSkillsIndex(entries: SkillEntry[]): string {
  const byName = new Map<string, SkillEntry>()
  for (const e of entries) if (!byName.has(e.name)) byName.set(e.name, e)
  const skills = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name))
  return JSON.stringify({ $schema: SKILLS_SCHEMA_URI, skills }, null, 2) + '\n'
}

// --- discovery (build/Node side, git transport) -----------------------------

const execFileAsync = promisify(execFile)

// A cloned source repo: its checked-out HEAD SHA, every blob path, and the temp dir.
interface RepoResolution {
  sha: string
  treePaths: string[]
  dir: string
}

async function git(args: string[]): Promise<Buffer> {
  // encoding: 'buffer' keeps SKILL.md bytes intact so digests match what raw.githubusercontent
  // serves. maxBuffer is generous - marketplace.json and SKILL.md files are small.
  const { stdout } = await execFileAsync('git', args, { encoding: 'buffer', maxBuffer: 32 * 1024 * 1024 })
  return stdout as unknown as Buffer
}

// Shallow, blobless clone: fetches trees (so ls-tree can enumerate) but no file contents until
// a specific blob is read via `git cat-file`. HEAD tracks the remote's default branch, so we
// never need to know the branch name.
async function cloneRepo(owner: string, repo: string, parentDir: string): Promise<RepoResolution> {
  const dir = await fs.mkdtemp(path.join(parentDir, `${repo}-`))
  const url = `https://github.com/${owner}/${repo}.git`
  await git(['clone', '--depth', '1', '--filter=blob:none', '--no-checkout', '--quiet', url, dir])
  const sha = (await git(['-C', dir, 'rev-parse', 'HEAD'])).toString('utf8').trim()
  const listing = (await git(['-C', dir, 'ls-tree', '-r', '--name-only', 'HEAD'])).toString('utf8')
  const treePaths = listing
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  return { sha, treePaths, dir }
}

// Read a single file's raw bytes from a cloned repo (lazily fetches just that blob).
function readBlob(dir: string, filePath: string): Promise<Buffer> {
  return git(['-C', dir, 'cat-file', '-p', `HEAD:${filePath}`])
}

// Orchestrates discovery end to end. Returns the index JSON, or null if it could not be built
// (git/network failure or nothing resolved) - callers skip emission on null. All clones land in
// one temp dir that is always removed before returning.
export async function generateSkillsIndex(): Promise<string | null> {
  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'vocdoni-skills-'))
  try {
    const base = { owner: MARKETPLACE_OWNER, repo: MARKETPLACE_REPO }
    const repoCache = new Map<string, RepoResolution>()
    const resolve = async (owner: string, repo: string) => {
      const key = `${owner}/${repo}`
      let r = repoCache.get(key)
      if (!r) {
        r = await cloneRepo(owner, repo, workDir)
        repoCache.set(key, r)
      }
      return r
    }

    const marketRepo = await resolve(base.owner, base.repo)
    const marketBytes = await readBlob(marketRepo.dir, MARKETPLACE_PATH)
    const marketplace = JSON.parse(marketBytes.toString('utf8')) as { plugins?: MarketplacePlugin[] }
    const included = selectIncludedPlugins(Array.isArray(marketplace.plugins) ? marketplace.plugins : [])

    const entries: SkillEntry[] = []
    for (const plugin of included) {
      const ref = parseGithubSource(plugin.source, base)
      if (!ref) {
        console.warn(`[agent-skills] unsupported source for plugin ${plugin.name}: ${plugin.source}`)
        continue
      }
      let repo: RepoResolution
      try {
        repo = await resolve(ref.owner, ref.repo)
      } catch (err) {
        console.warn(`[agent-skills] cannot clone ${ref.owner}/${ref.repo}:`, (err as Error).message)
        continue
      }
      for (const filePath of skillMdPaths(repo.treePaths, ref.subpath)) {
        // url is pinned to the SHA whose bytes we hash, so the digest always matches the artifact.
        const url = rawGithubUrl(ref.owner, ref.repo, repo.sha, filePath)
        try {
          entries.push(buildSkillEntry(url, await readBlob(repo.dir, filePath)))
        } catch (err) {
          console.warn(`[agent-skills] skipping ${url}:`, (err as Error).message)
        }
      }
    }

    if (!entries.length) {
      console.warn('[agent-skills] no skills resolved; skipping index.json')
      return null
    }
    return buildSkillsIndex(entries)
  } catch (err) {
    console.warn('[agent-skills] failed to build index.json:', (err as Error).message)
    return null
  } finally {
    await fs.rm(workDir, { recursive: true, force: true })
  }
}

// --- plugin -----------------------------------------------------------------

export function agentSkillsPlugin(): Plugin {
  let clientOutDir: string
  let isSSRBuild = false
  let ran = false
  let cached: Promise<string | null> | null = null
  const build = () => (cached ??= generateSkillsIndex())

  return {
    name: 'agent-skills-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      const resolvedOutDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = resolvedOutDir.endsWith(`${path.sep}client`) ? resolvedOutDir : path.join(resolvedOutDir, 'client')
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next()
        if (req.url.split('?')[0] !== `/${OUTPUT_PATH}`) return next()
        const json = await build()
        if (json == null) {
          res.statusCode = 503
          return void res.end('agent-skills index unavailable')
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        return void res.end(json)
      })
    },
    async closeBundle() {
      if (isSSRBuild) return
      if (ran) return
      ran = true

      const json = await build()
      if (json == null) return
      const out = path.join(clientOutDir, OUTPUT_PATH)
      await fs.mkdir(path.dirname(out), { recursive: true })
      await fs.writeFile(out, json, 'utf8')
    },
  }
}
