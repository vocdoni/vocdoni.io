import { flattenDocsNav, type DocsNav } from '@/components/developers/docs-nav'
import { useDocsVersion } from '@/hooks/useDocsVersion'
import type { DocsPageData } from '@/lib/docs/nav'
import type { LoadedDoc } from '@/lib/docs/pipeline'
import { docsRemoteErrorKind, type DocsRemoteErrorKind } from '@/lib/docs/remote'
import type { RemoteDocsData } from '@/lib/docs/remote-load'
import { isRemoteVersion, type DocsVersion } from '@/lib/docs/versions'
import * as React from 'react'
import { useData } from 'vike-react/useData'

// ---------------------------------------------------------------------------
// Single read point for the documentation UI.
//
// On the baked (production) version this is `useData()` with a few constant
// extras, so nothing changes: no fetch, no markdown pipeline, no extra render.
// On a branch-backed version it lazily loads lib/docs/remote-load (the only
// client-reachable module that imports the markdown pipeline) and swaps in the
// freshly compiled doc + nav once they arrive, keeping the baked content on
// screen while it loads and if it fails.
//
// The work lives in a provider mounted once by the docs layout: the sidebar,
// article, pager, breadcrumbs and TOC all read the same result instead of each
// firing its own fetch + compile.
//
// Never import '@/lib/docs/markdown' or '@/lib/docs/nav' for values here - both
// hold an eager glob of every markdown file. Types only.
// ---------------------------------------------------------------------------

/**
 * Identity of one remote load. A result is only accepted while the key it was
 * requested under is still the current one, so a slow response for a page (or
 * version, or locale) the reader has already left is dropped.
 */
export const docsRequestKey = (branch: string, slug: string, locale: string): string => `${branch} ${slug} ${locale}`

interface RemoteState {
  key: string
  loading: boolean
  data: RemoteDocsData | null
  error: DocsRemoteErrorKind | null
}

export interface DocsData {
  doc: LoadedDoc
  nav: DocsNav
  /** True while a remote version is being fetched and compiled. */
  loading: boolean
  /** Set when the remote load failed; the baked content stays on screen. */
  error: DocsRemoteErrorKind | null
  isRemote: boolean
  version: DocsVersion
  /**
   * Slugs this build actually prerendered. A remote branch can introduce pages
   * that have no route here yet, and linking to them would 404 - see
   * DocsSidebar for how those entries render instead.
   */
  bakedSlugs: ReadonlySet<string>
}

const DocsDataContext = React.createContext<DocsData | undefined>(undefined)

function useDocsDataValue(): DocsData {
  const baked = useData<DocsPageData>()
  const { version } = useDocsVersion()

  const branch = version.branch
  const isRemote = isRemoteVersion(version)
  const slug = baked.doc.slug
  const locale = baked.doc.locale
  const key = branch ? docsRequestKey(branch, slug, locale) : null

  const [state, setState] = React.useState<RemoteState | null>(null)

  React.useEffect(() => {
    if (!branch || !key) {
      setState(null)
      return
    }

    let cancelled = false
    setState({ key, loading: true, data: null, error: null })

    // Dynamic so the markdown pipeline stays out of the entry chunk.
    import('@/lib/docs/remote-load')
      .then(({ loadRemoteDocsData }) => loadRemoteDocsData(branch, slug, locale))
      .then((data) => {
        if (cancelled) return
        setState({ key, loading: false, data, error: null })
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setState({ key, loading: false, data: null, error: docsRemoteErrorKind(error) })
      })

    return () => {
      cancelled = true
    }
  }, [branch, key, slug, locale])

  // Ignore anything left over from a previous slug/version/locale: at this
  // point in the render the effect that replaces it has not run yet.
  const remote = state && state.key === key ? state : null

  const bakedSlugs = React.useMemo(() => {
    const slugs = new Set(flattenDocsNav(baked.nav).map((item) => item.slug))
    // The current page is prerendered by definition, even when it is the
    // overview (which the nav does not necessarily list).
    slugs.add(baked.doc.slug)
    return slugs
  }, [baked.nav, baked.doc.slug])

  return React.useMemo<DocsData>(
    () => ({
      doc: remote?.data?.doc ?? baked.doc,
      nav: remote?.data?.nav ?? baked.nav,
      loading: remote?.loading ?? false,
      error: remote?.error ?? null,
      isRemote,
      version,
      bakedSlugs,
    }),
    [remote, baked.doc, baked.nav, isRemote, version, bakedSlugs]
  )
}

/**
 * Resolves the documentation content for the active version once per page and
 * shares it with every docs component. Mounted by pages/developers/docs/+Layout.
 */
export function DocsDataProvider({ children }: { children: React.ReactNode }) {
  const value = useDocsDataValue()
  return React.createElement(DocsDataContext.Provider, { value }, children)
}

export function useDocsData(): DocsData {
  const context = React.useContext(DocsDataContext)
  if (!context) {
    throw new Error('useDocsData must be used within a DocsDataProvider')
  }
  return context
}
