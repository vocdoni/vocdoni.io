import { buildDocsNav, listDocsMeta, loadDoc } from '@/lib/docs/pipeline'
import {
  clearCachedDocFiles,
  docFilesFromTree,
  docsCacheKey,
  DOCS_REMOTE_CACHE_TTL_MS,
  docsRemoteErrorKind,
  DocsRemoteError,
  fetchRemoteDocFiles,
  rawDocUrl,
  readCachedDocFiles,
  remoteDocPath,
  toDocFileMap,
  treeUrl,
  writeCachedDocFiles,
} from '@/lib/docs/remote'
import { afterEach, describe, expect, it, vi } from 'vitest'

const BRANCH = 'stage'

const treePayload = (paths: Array<{ path: string; type?: string }>) => ({
  sha: 'abc',
  truncated: false,
  tree: paths.map((entry) => ({ path: entry.path, type: entry.type ?? 'blob', mode: '100644' })),
})

const doc = (title: string, group: string, order: number, body = '# Body\n\nText.\n') =>
  `---\ntitle: ${title}\ngroup: ${group}\norder: ${order}\n---\n\n${body}`

function memoryStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial))
  return {
    store,
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
  }
}

const okResponse = (body: string) =>
  ({
    ok: true,
    status: 200,
    json: async () => JSON.parse(body),
    text: async () => body,
  }) as unknown as Response

const errorResponse = (status: number) =>
  ({
    ok: false,
    status,
    json: async () => ({}),
    text: async () => '',
  }) as unknown as Response

afterEach(() => {
  clearCachedDocFiles(undefined, { storage: null })
})

describe('docFilesFromTree', () => {
  it('keeps only markdown blobs under the docs content folder', () => {
    const files = docFilesFromTree(
      treePayload([
        { path: 'content/developers/docs/en/quickstart.md' },
        { path: 'content/developers/docs/es/quickstart.md' },
        { path: 'content/developers/docs/en', type: 'tree' },
        { path: 'content/developers/docs/en/diagram.png' },
        { path: 'content/blog/en/post.md' },
        { path: 'README.md' },
      ]),
      BRANCH
    )

    expect(files.map((file) => file.path)).toEqual([
      'content/developers/docs/en/quickstart.md',
      'content/developers/docs/es/quickstart.md',
    ])
    expect(files[0].url).toBe(
      'https://raw.githubusercontent.com/vocdoni/vocdoni.io/stage/content/developers/docs/en/quickstart.md'
    )
  })

  it('returns an empty list for a payload without a tree', () => {
    expect(docFilesFromTree(null, BRANCH)).toEqual([])
    expect(docFilesFromTree({}, BRANCH)).toEqual([])
    expect(docFilesFromTree({ tree: 'nope' }, BRANCH)).toEqual([])
  })

  it('builds urls that round-trip through remoteDocPath', () => {
    expect(rawDocUrl(BRANCH, remoteDocPath('en', 'quickstart'))).toBe(
      'https://raw.githubusercontent.com/vocdoni/vocdoni.io/stage/content/developers/docs/en/quickstart.md'
    )
  })

  it('escapes branch names in the tree endpoint', () => {
    expect(treeUrl('feat/docs')).toBe(
      'https://api.github.com/repos/vocdoni/vocdoni.io/git/trees/feat%2Fdocs?recursive=1'
    )
  })
})

describe('toDocFileMap', () => {
  it('keys sources the way the build-time glob does', () => {
    const files = toDocFileMap([
      { path: 'content/developers/docs/en/overview.md', source: 'a' },
      { path: '/content/developers/docs/es/overview.md', source: 'b' },
    ])

    expect(Object.keys(files)).toEqual([
      '/content/developers/docs/en/overview.md',
      '/content/developers/docs/es/overview.md',
    ])
  })

  it('produces a map the pipeline can load, index and navigate', () => {
    const files = toDocFileMap([
      { path: 'content/developers/docs/en/overview.md', source: doc('Overview', 'get_started', 0) },
      { path: 'content/developers/docs/en/quickstart.md', source: doc('Quickstart', 'get_started', 1) },
      { path: 'content/developers/docs/es/quickstart.md', source: doc('Inicio rápido', 'get_started', 1) },
      { path: 'content/developers/docs/en/census.md', source: doc('Census', 'core_concepts', 0) },
    ])

    const loaded = loadDoc('quickstart', 'es', files)
    expect(loaded?.usedLocale).toBe('es')
    expect(loaded?.frontmatter.title).toBe('Inicio rápido')
    expect(loaded?.html).toContain('<h1')

    // Missing localization falls back to English inside loadDoc.
    expect(loadDoc('census', 'es', files)?.usedLocale).toBe('en')
    expect(loadDoc('nope', 'en', files)).toBeNull()

    const metas = listDocsMeta(files)
    expect(metas.map((meta) => meta.slug).sort()).toEqual(['census', 'overview', 'quickstart'])
    expect(metas.find((meta) => meta.slug === 'quickstart')?.titles).toEqual({
      en: 'Quickstart',
      es: 'Inicio rápido',
    })

    const nav = buildDocsNav('es', metas)
    expect(nav.map((group) => group.id)).toEqual(['get_started', 'core_concepts'])
    expect(nav[0].items.map((item) => item.slug)).toEqual(['overview', 'quickstart'])
    expect(nav[0].items[1].label).toBe('Inicio rápido')
    expect(nav[0].items[1].href).toBe('/developers/docs/quickstart')
  })
})

describe('docs remote cache', () => {
  it('returns a written map back within the TTL and drops it afterwards', () => {
    const storage = memoryStorage()
    writeCachedDocFiles(BRANCH, { '/a.md': 'a' }, { storage, now: 1_000 })

    expect(readCachedDocFiles(BRANCH, { storage, now: 1_000 })).toEqual({ '/a.md': 'a' })
    expect(readCachedDocFiles(BRANCH, { storage, now: 1_000 + DOCS_REMOTE_CACHE_TTL_MS - 1 })).toEqual({
      '/a.md': 'a',
    })
    expect(readCachedDocFiles(BRANCH, { storage, now: 1_000 + DOCS_REMOTE_CACHE_TTL_MS })).toBeNull()
    expect(storage.store.has(docsCacheKey(BRANCH))).toBe(false)
  })

  it('reads an entry written by an earlier session (memo cold)', () => {
    const storage = memoryStorage({
      [docsCacheKey(BRANCH)]: JSON.stringify({ at: 500, files: { '/a.md': 'a' } }),
    })

    expect(readCachedDocFiles(BRANCH, { storage, now: 600 })).toEqual({ '/a.md': 'a' })
  })

  it('treats corrupted entries as a miss', () => {
    const storage = memoryStorage({ [docsCacheKey(BRANCH)]: '{not json' })
    expect(readCachedDocFiles(BRANCH, { storage, now: 1 })).toBeNull()

    const shaped = memoryStorage({ [docsCacheKey(BRANCH)]: JSON.stringify({ files: { '/a.md': 'a' } }) })
    expect(readCachedDocFiles(BRANCH, { storage: shaped, now: 1 })).toBeNull()
  })

  it('survives a storage that throws on read and on write', () => {
    const throwing = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('quota exceeded')
      },
      removeItem: () => {
        throw new Error('blocked')
      },
    }

    expect(() => writeCachedDocFiles(BRANCH, { '/a.md': 'a' }, { storage: throwing, now: 10 })).not.toThrow()
    // The in-module memo still answers even though nothing was persisted.
    expect(readCachedDocFiles(BRANCH, { storage: throwing, now: 10 })).toEqual({ '/a.md': 'a' })

    clearCachedDocFiles(BRANCH, { storage: null })
    expect(readCachedDocFiles(BRANCH, { storage: throwing, now: 10 })).toBeNull()
  })

  it('skips persistence entirely when no storage is available', () => {
    expect(() => writeCachedDocFiles(BRANCH, { '/a.md': 'a' }, { storage: null, now: 10 })).not.toThrow()
    expect(readCachedDocFiles(BRANCH, { storage: null, now: 10 })).toEqual({ '/a.md': 'a' })
  })
})

describe('fetchRemoteDocFiles', () => {
  it('lists the tree, downloads every doc and caches the result', async () => {
    const storage = memoryStorage()
    const fetchMock = vi.fn(async (url: string) => {
      if (url.startsWith('https://api.github.com')) {
        return okResponse(JSON.stringify(treePayload([{ path: 'content/developers/docs/en/overview.md' }])))
      }
      return okResponse(doc('Overview', 'get_started', 0))
    })

    const files = await fetchRemoteDocFiles(BRANCH, { fetch: fetchMock, storage, now: 1_000 })
    expect(Object.keys(files)).toEqual(['/content/developers/docs/en/overview.md'])
    expect(fetchMock).toHaveBeenCalledTimes(2)

    const again = await fetchRemoteDocFiles(BRANCH, { fetch: fetchMock, storage, now: 1_100 })
    expect(again).toEqual(files)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('reports a missing branch as not-found', async () => {
    const fetchMock = vi.fn(async () => errorResponse(404))
    await expect(fetchRemoteDocFiles(BRANCH, { fetch: fetchMock, storage: null })).rejects.toMatchObject({
      kind: 'not-found',
      status: 404,
    })
  })

  it('reports a branch without docs as not-found', async () => {
    const fetchMock = vi.fn(async () => okResponse(JSON.stringify(treePayload([{ path: 'README.md' }]))))
    await expect(fetchRemoteDocFiles(BRANCH, { fetch: fetchMock, storage: null })).rejects.toMatchObject({
      kind: 'not-found',
    })
  })

  it('reports server and transport failures as network errors', async () => {
    const serverError = vi.fn(async () => errorResponse(503))
    await expect(fetchRemoteDocFiles(BRANCH, { fetch: serverError, storage: null })).rejects.toMatchObject({
      kind: 'network',
      status: 503,
    })

    const offline = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    await expect(fetchRemoteDocFiles(BRANCH, { fetch: offline, storage: null })).rejects.toMatchObject({
      kind: 'network',
    })
  })

  it('does not cache a failed load', async () => {
    const storage = memoryStorage()
    const failing = vi.fn(async () => errorResponse(500))
    await expect(fetchRemoteDocFiles(BRANCH, { fetch: failing, storage, now: 1 })).rejects.toBeInstanceOf(
      DocsRemoteError
    )
    expect(readCachedDocFiles(BRANCH, { storage, now: 1 })).toBeNull()
  })
})

describe('docsRemoteErrorKind', () => {
  it('classifies unknown rejections as network failures', () => {
    expect(docsRemoteErrorKind(new DocsRemoteError('not-found', 'gone'))).toBe('not-found')
    expect(docsRemoteErrorKind(new DocsRemoteError('network', 'oops'))).toBe('network')
    expect(docsRemoteErrorKind(new Error('boom'))).toBe('network')
    expect(docsRemoteErrorKind(undefined)).toBe('network')
  })
})
