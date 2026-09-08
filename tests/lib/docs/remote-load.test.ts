import { clearCachedDocFiles } from '@/lib/docs/remote'
import { loadRemoteDocsData } from '@/lib/docs/remote-load'
import { afterEach, describe, expect, it, vi } from 'vitest'

const BRANCH = 'stage'

const doc = (title: string, group: string, order: number) =>
  `---\ntitle: ${title}\ngroup: ${group}\norder: ${order}\n---\n\n## Section\n\nBody.\n`

const SOURCES: Record<string, string> = {
  'content/developers/docs/en/overview.md': doc('Overview', 'get_started', 0),
  'content/developers/docs/en/quickstart.md': doc('Quickstart', 'get_started', 1),
  'content/developers/docs/es/quickstart.md': doc('Inicio rápido', 'get_started', 1),
}

const fakeFetch = () =>
  vi.fn(async (url: string) => {
    if (url.startsWith('https://api.github.com')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          tree: Object.keys(SOURCES).map((path) => ({ path, type: 'blob' })),
        }),
        text: async () => '',
      } as unknown as Response
    }
    const path = url.split(`/${BRANCH}/`)[1]
    return {
      ok: true,
      status: 200,
      json: async () => ({}),
      text: async () => SOURCES[path],
    } as unknown as Response
  })

afterEach(() => {
  clearCachedDocFiles(undefined, { storage: null })
})

describe('loadRemoteDocsData', () => {
  it('compiles the requested page and rebuilds the nav from the branch', async () => {
    const { doc: loaded, nav } = await loadRemoteDocsData(BRANCH, 'quickstart', 'es', {
      fetch: fakeFetch(),
      storage: null,
    })

    expect(loaded?.frontmatter.title).toBe('Inicio rápido')
    expect(loaded?.html).toContain('<h2')
    expect(nav[0].items.map((item) => item.slug)).toEqual(['overview', 'quickstart'])
  })

  it('points "view as markdown" at the branch source rather than this build mirror', async () => {
    const { doc: loaded } = await loadRemoteDocsData(BRANCH, 'quickstart', 'es', {
      fetch: fakeFetch(),
      storage: null,
    })

    expect(loaded?.rawHref).toBe(
      'https://raw.githubusercontent.com/vocdoni/vocdoni.io/stage/content/developers/docs/es/quickstart.md'
    )
  })

  it('uses the locale the doc actually fell back to in that url', async () => {
    const { doc: loaded } = await loadRemoteDocsData(BRANCH, 'overview', 'es', {
      fetch: fakeFetch(),
      storage: null,
    })

    expect(loaded?.usedLocale).toBe('en')
    expect(loaded?.rawHref).toBe(
      'https://raw.githubusercontent.com/vocdoni/vocdoni.io/stage/content/developers/docs/en/overview.md'
    )
  })

  it('returns a null doc (not an error) when the branch dropped the page', async () => {
    const { doc: loaded, nav } = await loadRemoteDocsData(BRANCH, 'gone', 'en', {
      fetch: fakeFetch(),
      storage: null,
    })

    expect(loaded).toBeNull()
    expect(nav.length).toBeGreaterThan(0)
  })
})
