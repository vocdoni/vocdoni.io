import type { DocsNav } from '@/components/developers/docs-nav'
import { buildDocsNav, listDocsMeta, loadDoc, type LoadedDoc } from '@/lib/docs/pipeline'
import { fetchRemoteDocFiles, type FetchRemoteDocsOptions, rawDocUrl, remoteDocPath } from '@/lib/docs/remote'
import type { Locale } from '@/locales'

// ---------------------------------------------------------------------------
// Lazy entry point for branch-backed documentation versions.
//
// This is the ONLY client-reachable module that pulls in the markdown pipeline
// (unified/remark/rehype/gray-matter), so it must never be imported statically
// from a component: `hooks/useDocsData.ts` reaches it through a dynamic
// `import()` and Rollup keeps the whole machinery in a lazy chunk that a reader
// on the baked (production) version never downloads.
// ---------------------------------------------------------------------------

export interface RemoteDocsData {
  /**
   * The requested slug compiled from the branch, or null when that page does
   * not exist on the branch (deleted there, or added after this build). The
   * caller keeps showing the baked page in that case.
   */
  doc: LoadedDoc | null
  nav: DocsNav
}

/**
 * Fetches a branch's documentation, compiles the requested page and rebuilds
 * the navigation from its frontmatter. Rejects with a `DocsRemoteError` when the
 * branch cannot be listed or downloaded.
 */
export async function loadRemoteDocsData(
  branch: string,
  slug: string,
  locale: Locale,
  options: FetchRemoteDocsOptions = {}
): Promise<RemoteDocsData> {
  const files = await fetchRemoteDocFiles(branch, options)
  const doc = loadDoc(slug, locale, files)
  const nav = buildDocsNav(locale, listDocsMeta(files))

  return {
    // `loadDoc` points rawHref at this build's local `.md` mirror, which only
    // exists for baked pages; the remote body has to link to its own source.
    doc: doc ? { ...doc, rawHref: rawDocUrl(branch, remoteDocPath(doc.usedLocale, doc.slug)) } : null,
    nav,
  }
}
