import type { DocFileMap } from '@/lib/docs/pipeline'
import { DOCS_GITHUB_REPO } from '@/lib/docs/versions'

// ---------------------------------------------------------------------------
// Client-side fetch layer for branch-backed documentation versions.
//
// A remote version (see lib/docs/versions.ts) points at a branch of the public
// repo. Its markdown is listed through the GitHub tree API and downloaded from
// raw.githubusercontent.com, then handed to the pure pipeline in
// lib/docs/pipeline.ts as a `DocFileMap`. Both origins are allowlisted in the
// CSP connect-src (see plugins/well-known.ts).
//
// The module is deliberately split into pure mapping helpers (tree JSON -> file
// list, sources -> DocFileMap, cache envelope handling) and the thin async
// wrapper that performs the requests, so everything but the network hop is
// unit-testable without mocking fetch.
//
// This file must stay importable from the browser: it holds no markdown
// machinery and imports the pipeline for types only.
// ---------------------------------------------------------------------------

// Matches the key format the pipeline parses (`/content/developers/docs/<locale>/<slug>.md`)
// minus the leading slash, which is how GitHub reports repo-relative paths.
const CONTENT_PATH_PREFIX = 'content/developers/docs/'

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com'

// GitHub raw is served through a CDN with a ~5 minute cache, so a shorter TTL
// here would only add requests that return the same bytes. The product promise
// is "merge to the branch, reload the page a few minutes later".
export const DOCS_REMOTE_CACHE_TTL_MS = 5 * 60 * 1000

const CACHE_KEY_PREFIX = 'docs-remote-files:'

// --- Failures ---------------------------------------------------------------

// `not-found` means the branch (or its docs folder) does not exist, which the UI
// can phrase as a configuration problem. Everything else is `network`.
export type DocsRemoteErrorKind = 'not-found' | 'network'

export class DocsRemoteError extends Error {
  readonly kind: DocsRemoteErrorKind
  readonly status?: number

  constructor(kind: DocsRemoteErrorKind, message: string, status?: number) {
    super(message)
    this.name = 'DocsRemoteError'
    this.kind = kind
    this.status = status
  }
}

export const isDocsRemoteError = (error: unknown): error is DocsRemoteError => error instanceof DocsRemoteError

// Any non-`DocsRemoteError` rejection (an abort, a thrown TypeError from fetch)
// is a network failure as far as the UI is concerned.
export const docsRemoteErrorKind = (error: unknown): DocsRemoteErrorKind =>
  isDocsRemoteError(error) ? error.kind : 'network'

// --- Pure mapping -----------------------------------------------------------

export interface RemoteDocFile {
  /** Repo-relative path, e.g. `content/developers/docs/en/quickstart.md`. */
  path: string
  /** Absolute raw.githubusercontent.com URL for that path on the branch. */
  url: string
}

/** Raw URL for one repo-relative path on a branch. */
export function rawDocUrl(branch: string, path: string): string {
  return `${GITHUB_RAW_BASE}/${DOCS_GITHUB_REPO}/${encodeURIComponent(branch)}/${path}`
}

/** Repo-relative content path for a locale + slug, mirroring the build-time layout. */
export function remoteDocPath(locale: string, slug: string): string {
  return `${CONTENT_PATH_PREFIX}${locale}/${slug}.md`
}

/** GitHub tree API endpoint listing every blob on a branch. */
export function treeUrl(branch: string): string {
  return `${GITHUB_API_BASE}/repos/${DOCS_GITHUB_REPO}/git/trees/${encodeURIComponent(branch)}?recursive=1`
}

interface GitTreeResponse {
  tree?: unknown
  truncated?: boolean
}

/**
 * Maps a GitHub tree API payload to the docs markdown blobs it contains.
 * Pure: the branch is only used to build the raw URLs.
 *
 * A truncated listing (very large repos) simply yields fewer files; the docs
 * folder sorts early enough that this repo never hits the limit.
 */
export function docFilesFromTree(payload: unknown, branch: string): RemoteDocFile[] {
  const tree = (payload as GitTreeResponse | null)?.tree
  if (!Array.isArray(tree)) return []

  const files: RemoteDocFile[] = []
  for (const entry of tree) {
    if (!entry || typeof entry !== 'object') continue
    const node = entry as { path?: unknown; type?: unknown }
    if (node.type !== 'blob') continue
    const path = node.path
    if (typeof path !== 'string') continue
    if (!path.startsWith(CONTENT_PATH_PREFIX) || !path.endsWith('.md')) continue
    files.push({ path, url: rawDocUrl(branch, path) })
  }
  return files
}

/**
 * Builds the `DocFileMap` the pipeline expects. Keys are the repo-relative
 * paths prefixed with `/`, matching the build-time `import.meta.glob` keys
 * (`/content/developers/docs/en/quickstart.md`).
 */
export function toDocFileMap(entries: Array<{ path: string; source: string }>): DocFileMap {
  const files: DocFileMap = {}
  for (const entry of entries) {
    files[entry.path.startsWith('/') ? entry.path : `/${entry.path}`] = entry.source
  }
  return files
}

// --- Cache ------------------------------------------------------------------

export interface DocsCacheStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

interface CacheEntry {
  at: number
  files: DocFileMap
}

export interface DocsCacheOptions {
  /** Defaults to `window.sessionStorage`; pass `null` to skip persistent caching. */
  storage?: DocsCacheStorage | null
  /** Injectable clock, defaults to `Date.now()`. */
  now?: number
  ttlMs?: number
}

// Per-branch in-memory memo, so switching pages (or back and forth between
// versions) never re-parses the sessionStorage envelope.
const memo = new Map<string, CacheEntry>()

export const docsCacheKey = (branch: string): string => `${CACHE_KEY_PREFIX}${branch}`

// Reading `window.sessionStorage` can itself throw (blocked cookies/storage), so
// the access - not just the get/set - lives inside the try.
function defaultStorage(): DocsCacheStorage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

const resolveStorage = (options: DocsCacheOptions): DocsCacheStorage | null =>
  options.storage === undefined ? defaultStorage() : options.storage

const isFresh = (entry: CacheEntry, now: number, ttlMs: number) => now - entry.at >= 0 && now - entry.at < ttlMs

/**
 * Returns the cached file map for a branch when it is still within the TTL.
 * Every storage access is guarded: a throwing, missing or corrupted entry is
 * reported as a miss so the caller falls back to the network.
 */
export function readCachedDocFiles(branch: string, options: DocsCacheOptions = {}): DocFileMap | null {
  const now = options.now ?? Date.now()
  const ttlMs = options.ttlMs ?? DOCS_REMOTE_CACHE_TTL_MS

  const memoized = memo.get(branch)
  if (memoized && isFresh(memoized, now, ttlMs)) return memoized.files
  if (memoized) memo.delete(branch)

  const storage = resolveStorage(options)
  if (!storage) return null

  let serialized: string | null = null
  try {
    serialized = storage.getItem(docsCacheKey(branch))
  } catch {
    return null
  }
  if (!serialized) return null

  let entry: CacheEntry
  try {
    const parsed = JSON.parse(serialized) as Partial<CacheEntry>
    if (typeof parsed?.at !== 'number' || !parsed.files || typeof parsed.files !== 'object') return null
    entry = { at: parsed.at, files: parsed.files as DocFileMap }
  } catch {
    return null
  }

  if (!isFresh(entry, now, ttlMs)) {
    try {
      storage.removeItem(docsCacheKey(branch))
    } catch {
      // Nothing to do if the entry cannot be evicted; the TTL check above already rejected it.
    }
    return null
  }

  memo.set(branch, entry)
  return entry.files
}

/**
 * Caches a file map for a branch in memory and (best effort) in sessionStorage.
 * Quota and serialization failures are swallowed - the memo still holds it.
 */
export function writeCachedDocFiles(branch: string, files: DocFileMap, options: DocsCacheOptions = {}): void {
  const at = options.now ?? Date.now()
  memo.set(branch, { at, files })

  const storage = resolveStorage(options)
  if (!storage) return
  try {
    storage.setItem(docsCacheKey(branch), JSON.stringify({ at, files }))
  } catch {
    // Quota exceeded or storage disabled: the in-module memo is enough for this session.
  }
}

/** Drops the cached map for a branch (or every branch). Used by tests. */
export function clearCachedDocFiles(branch?: string, options: DocsCacheOptions = {}): void {
  const branches = branch ? [branch] : Array.from(memo.keys())
  for (const name of branches) memo.delete(name)
  const storage = resolveStorage(options)
  if (!storage) return
  for (const name of branches) {
    try {
      storage.removeItem(docsCacheKey(name))
    } catch {
      // ignore
    }
  }
}

// --- Fetching ---------------------------------------------------------------

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>

export interface FetchRemoteDocsOptions extends DocsCacheOptions {
  fetch?: FetchLike
  signal?: AbortSignal
}

const resolveFetch = (options: FetchRemoteDocsOptions): FetchLike => {
  const impl = options.fetch ?? (typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : undefined)
  if (!impl) throw new DocsRemoteError('network', 'fetch is unavailable in this environment')
  return impl
}

async function request(impl: FetchLike, url: string, signal?: AbortSignal): Promise<Response> {
  let response: Response
  try {
    response = await impl(url, { signal })
  } catch (error) {
    throw new DocsRemoteError('network', `Request to ${url} failed: ${(error as Error)?.message ?? 'unknown error'}`)
  }
  if (!response.ok) {
    throw new DocsRemoteError(
      response.status === 404 ? 'not-found' : 'network',
      `Request to ${url} failed with ${response.status}`,
      response.status
    )
  }
  return response
}

/**
 * Lists and downloads every documentation markdown file on a branch and returns
 * it as a `DocFileMap` keyed the same way as the build-time content glob.
 *
 * Results are cached per branch (in-module memo + sessionStorage, ~5 min TTL).
 * Throws a `DocsRemoteError`: `not-found` when the branch or its docs folder is
 * missing, `network` for everything else.
 */
export async function fetchRemoteDocFiles(branch: string, options: FetchRemoteDocsOptions = {}): Promise<DocFileMap> {
  const cached = readCachedDocFiles(branch, options)
  if (cached) return cached

  const impl = resolveFetch(options)
  const treeResponse = await request(impl, treeUrl(branch), options.signal)

  let payload: unknown
  try {
    payload = await treeResponse.json()
  } catch {
    throw new DocsRemoteError('network', `Could not parse the git tree listing for "${branch}"`)
  }

  const entries = docFilesFromTree(payload, branch)
  if (!entries.length) {
    throw new DocsRemoteError('not-found', `Branch "${branch}" has no documentation content`)
  }

  const sources = await Promise.all(
    entries.map(async (entry) => {
      const response = await request(impl, entry.url, options.signal)
      return { path: entry.path, source: await response.text() }
    })
  )

  const files = toDocFileMap(sources)
  writeCachedDocFiles(branch, files, options)
  return files
}
