import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

import { resolveTokens, stripFrontmatter } from '../lib/docs/tokens'
import { localeDefault, locales } from '../locales'

/**
 * Emits the raw developer-docs markdown into the client build output so an
 * "LLM / view as markdown" button can serve clean, HTML-free content.
 *
 * The raw file mirrors the rendered page route + `.md`:
 *   /<locale>/developers/docs/<slug>.md   (and /<locale>/developers/docs.md for the overview)
 *
 * Sources live in `content/developers/docs/<lang>/<slug>.md`. We emit one file
 * per (locale x slug) so every page URL + `.md` works, using the localized
 * source when present and falling back to English otherwise. Each file has its
 * `{{TOKENS}}` resolved and frontmatter stripped. In dev a middleware serves the
 * same resolved markdown so the button works there too.
 *
 * Mirrors `plugins/vike-sitemap.ts` / `plugins/legacy-redirects.ts`: generated
 * at build time, never committed, so it cannot drift from the source.
 */

const CONTENT_DOCS = ['content', 'developers', 'docs']
const OVERVIEW_SLUG = 'overview'

// Resolve tokens + strip frontmatter for the served/emitted file.
export function processDoc(source: string): string {
  return resolveTokens(stripFrontmatter(source))
}

// Output path (relative to the client dir) mirroring the page route + `.md`.
export function outputPathFor(locale: string, slug: string): string {
  return slug === OVERVIEW_SLUG ? `${locale}/developers/docs.md` : `${locale}/developers/docs/${slug}.md`
}

// Maps a request URL to { locale, slug }, or null when it is not a raw doc
// request. Pure - used by the dev middleware and tested directly.
export function matchRawDocRequest(url: string): { locale: string; slug: string } | null {
  const pathname = url.split('?')[0]
  if (!pathname.endsWith('.md') || pathname.includes('..')) return null
  const segs = pathname.replace(/^\/+/, '').split('/')
  // <locale>/developers/docs.md -> overview
  if (segs.length === 3 && segs[1] === 'developers' && segs[2] === 'docs.md') {
    return { locale: segs[0], slug: OVERVIEW_SLUG }
  }
  // <locale>/developers/docs/<slug>.md
  if (segs.length === 4 && segs[1] === 'developers' && segs[2] === 'docs' && segs[3].endsWith('.md')) {
    return { locale: segs[0], slug: segs[3].slice(0, -3) }
  }
  return null
}

async function walkMarkdown(dir: string): Promise<string[]> {
  const out: string[] = []
  let entries: import('node:fs').Dirent[]
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walkMarkdown(full)))
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

// locale -> slug -> raw source
async function loadSources(docsRoot: string): Promise<Map<string, Map<string, string>>> {
  const map = new Map<string, Map<string, string>>()
  for (const file of await walkMarkdown(docsRoot)) {
    const rel = path.relative(docsRoot, file).split(path.sep)
    const locale = rel[0]
    const slug = rel.slice(1).join('/').replace(/\.md$/, '')
    if (!locale || !slug) continue
    if (!map.has(locale)) map.set(locale, new Map())
    map.get(locale)!.set(slug, await fs.readFile(file, 'utf8'))
  }
  return map
}

export function docsMarkdownPlugin(): Plugin {
  let resolvedRoot: string
  let clientOutDir: string
  let isSSRBuild = false
  let ran = false

  const docsRoot = () => path.join(resolvedRoot, ...CONTENT_DOCS)

  return {
    name: 'docs-markdown-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      const resolvedOutDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = resolvedOutDir.endsWith(`${path.sep}client`) ? resolvedOutDir : path.join(resolvedOutDir, 'client')
      resolvedRoot = config.root ? path.resolve(config.root) : process.cwd()
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next()
        const match = matchRawDocRequest(req.url)
        if (!match) return next()
        const localized = path.join(docsRoot(), match.locale, `${match.slug}.md`)
        const fallback = path.join(docsRoot(), localeDefault, `${match.slug}.md`)
        try {
          let source: string
          try {
            source = await fs.readFile(localized, 'utf8')
          } catch {
            source = await fs.readFile(fallback, 'utf8')
          }
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
          res.end(processDoc(source))
        } catch {
          next()
        }
      })
    },
    async closeBundle() {
      if (isSSRBuild) return
      if (ran) return
      ran = true

      const sources = await loadSources(docsRoot())
      const canonical = sources.get(localeDefault)
      if (!canonical) return

      await Promise.all(
        locales.flatMap((locale) =>
          [...canonical.keys()].map(async (slug) => {
            const source = sources.get(locale)?.get(slug) ?? canonical.get(slug)!
            const outPath = path.join(clientOutDir, outputPathFor(locale, slug))
            await fs.mkdir(path.dirname(outPath), { recursive: true })
            await fs.writeFile(outPath, processDoc(source), 'utf8')
          })
        )
      )
    },
  }
}
