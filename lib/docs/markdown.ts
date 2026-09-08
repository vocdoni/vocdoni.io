import {
  allDocSlugs as allDocSlugsFrom,
  type DocFileMap,
  type DocMeta,
  listDocsMeta as listDocsMetaFrom,
  loadDoc as loadDocFrom,
  type LoadedDoc,
} from '@/lib/docs/pipeline'
import type { Locale } from '@/locales'

// ---------------------------------------------------------------------------
// Build-time entry point for the developer docs markdown pipeline.
//
// The pipeline itself lives in lib/docs/pipeline.ts and is pure: it takes the
// markdown sources as an argument, so it stays importable from the client. This
// module binds it to the build-time content glob below, which is why it is
// server/build only - importing it from a component would inline every doc into
// the client bundle. Everything pure is re-exported so existing server callers
// keep a single import site.
// ---------------------------------------------------------------------------

export * from '@/lib/docs/pipeline'

// Eagerly loaded raw markdown sources. Keys look like
// `/content/developers/docs/en/quickstart.md`. Server/build only.
const DOC_FILES = import.meta.glob('/content/developers/docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as DocFileMap

// Slugs available for routing/nav, taken from the canonical English folder and
// excluding the overview (which is served by the docs index route).
export function allDocSlugs(files: DocFileMap = DOC_FILES): string[] {
  return allDocSlugsFrom(files)
}

// Loads one doc for a locale, falling back to English when the localized file
// is missing. Returns null when neither exists.
export function loadDoc(slug: string, locale: Locale, files: DocFileMap = DOC_FILES): LoadedDoc | null {
  return loadDocFrom(slug, locale, files)
}

// Frontmatter-only metadata for every slug across locales, used to build the
// navigation. Group/order come from the canonical English file.
export function listDocsMeta(files: DocFileMap = DOC_FILES): DocMeta[] {
  return listDocsMetaFrom(files)
}

export { DOC_FILES }
