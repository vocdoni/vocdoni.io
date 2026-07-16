import matter from 'gray-matter'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

import { localeDefault, locales } from '../locales'

/**
 * Emits the raw blog-post markdown into the client build output so a "View as
 * markdown" button (and LLMs) can grab clean, HTML-free content - the blog
 * counterpart of `plugins/docs-markdown.ts`.
 *
 * The raw file mirrors the rendered page route + `.md`:
 *   /<locale>/blog/<slug>.md
 *
 * Sources live in `content/blog/<locale>/<slug>.mdoc`. We emit one file per
 * (locale x slug) so every prerendered post URL + `.md` works, using the localized
 * source when present and falling back to English (then any locale) - matching the
 * page's own locale resolution. Frontmatter is stripped and the post title is
 * prepended as an H1. Drafts are excluded from the build (served in dev). In dev a
 * middleware serves the same markdown so the button works there too.
 *
 * Mirrors `plugins/docs-markdown.ts`: generated at build, never committed, so it
 * cannot drift from the source.
 */

const CONTENT_BLOG = ['content', 'blog']
// Reserved sibling dirs under content/blog that are not locale post folders.
const NON_LOCALE_DIRS = new Set(['authors', 'categories'])

interface PostSource {
  source: string
  title: string
  draft: boolean
}

// Strip frontmatter and prepend the title as an H1 so the standalone markdown reads well.
export function processPost(source: string): string {
  const { content, data } = matter(source)
  const title = typeof data.title === 'string' ? data.title : ''
  const body = content.replace(/^\s+/, '')
  return title ? `# ${title}\n\n${body}` : body
}

// Output path (relative to the client dir) mirroring the page route + `.md`.
export function outputPathFor(locale: string, slug: string): string {
  return `${locale}/blog/${slug}.md`
}

// Maps a request URL to { locale, slug }, or null when it is not a raw blog-post
// request. Pure - used by the dev middleware and tested directly.
export function matchRawBlogRequest(url: string): { locale: string; slug: string } | null {
  const pathname = url.split('?')[0]
  if (!pathname.endsWith('.md') || pathname.includes('..')) return null
  const segs = pathname.replace(/^\/+/, '').split('/')
  // <locale>/blog/<slug>.md  (category archives have no .md companion)
  if (segs.length === 3 && segs[1] === 'blog' && segs[2].endsWith('.md')) {
    return { locale: segs[0], slug: segs[2].slice(0, -3) }
  }
  return null
}

// locale -> slug -> post source (build/Node side).
async function loadSources(blogRoot: string): Promise<Map<string, Map<string, PostSource>>> {
  const map = new Map<string, Map<string, PostSource>>()
  const localeDirs = await fs.readdir(blogRoot, { withFileTypes: true }).catch(() => [])
  for (const dir of localeDirs) {
    if (!dir.isDirectory() || NON_LOCALE_DIRS.has(dir.name)) continue
    if (!(locales as readonly string[]).includes(dir.name)) continue
    const files = await fs.readdir(path.join(blogRoot, dir.name)).catch(() => [])
    for (const file of files) {
      if (!file.endsWith('.mdoc')) continue
      const source = await fs.readFile(path.join(blogRoot, dir.name, file), 'utf8')
      const { data } = matter(source)
      const slug = file.replace(/\.mdoc$/, '')
      if (!map.has(dir.name)) map.set(dir.name, new Map())
      map.get(dir.name)!.set(slug, {
        source,
        title: typeof data.title === 'string' ? data.title : slug,
        draft: data.draft === true,
      })
    }
  }
  return map
}

// Resolve the source to serve for a (slug, requested locale): requested locale, then
// English, then any locale that has it - mirroring lib/blog/content.ts resolveSource.
function resolvePost(
  byLocale: Map<string, Map<string, PostSource>>,
  slug: string,
  locale: string,
  includeDrafts: boolean
): PostSource | null {
  const has = (l: string) => {
    const p = byLocale.get(l)?.get(slug)
    return p && (includeDrafts || !p.draft) ? p : null
  }
  const available = (locales as readonly string[]).filter((l) => has(l))
  if (!available.length) return null
  const used = available.includes(locale) ? locale : available.includes(localeDefault) ? localeDefault : available[0]
  return has(used)
}

export function blogMarkdownPlugin(): Plugin {
  let resolvedRoot: string
  let clientOutDir: string
  let isSSRBuild = false
  let ran = false

  const blogRoot = () => path.join(resolvedRoot, ...CONTENT_BLOG)

  return {
    name: 'blog-markdown-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      const resolvedOutDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = resolvedOutDir.endsWith(`${path.sep}client`) ? resolvedOutDir : path.join(resolvedOutDir, 'client')
      resolvedRoot = config.root ? path.resolve(config.root) : process.cwd()
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next()
        const match = matchRawBlogRequest(req.url)
        if (!match) return next()
        const byLocale = await loadSources(blogRoot())
        // Dev shows drafts, matching the blog pages.
        const post = resolvePost(byLocale, match.slug, match.locale, true)
        if (!post) return next()
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.end(processPost(post.source))
      })
    },
    async closeBundle() {
      if (isSSRBuild) return
      if (ran) return
      ran = true

      const byLocale = await loadSources(blogRoot())

      // Union of slugs that have at least one non-draft locale.
      const slugs = new Set<string>()
      for (const slugMap of byLocale.values()) {
        for (const [slug, post] of slugMap) if (!post.draft) slugs.add(slug)
      }

      await Promise.all(
        [...slugs].flatMap((slug) =>
          locales.map(async (locale) => {
            const post = resolvePost(byLocale, slug, locale, false)
            if (!post) return
            const outPath = path.join(clientOutDir, outputPathFor(locale, slug))
            await fs.mkdir(path.dirname(outPath), { recursive: true })
            await fs.writeFile(outPath, processPost(post.source), 'utf8')
          })
        )
      )
    },
  }
}
