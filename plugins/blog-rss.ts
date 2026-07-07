import matter from 'gray-matter'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

// Generates /blog/rss.xml from the blog content files (default-locale feed, with
// fallback to any locale a post exists in). Served dynamically in dev and written
// to the client build output at build time - mirrors plugins/vike-sitemap.ts.

type Options = {
  hostname: string
  locales: string[]
  defaultLocale: string
}

interface FeedItem {
  slug: string
  locale: string
  title: string
  excerpt: string
  publishedDate: string
}

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

async function collectPosts(root: string, locales: string[], defaultLocale: string): Promise<FeedItem[]> {
  const blogDir = path.join(root, 'content', 'blog')
  const bySlug = new Map<string, FeedItem>()

  for (const locale of locales) {
    const dir = path.join(blogDir, locale)
    let files: string[]
    try {
      files = await fs.readdir(dir)
    } catch {
      continue
    }
    for (const file of files) {
      if (!file.endsWith('.mdoc')) continue
      const slug = file.replace(/\.mdoc$/, '')
      const { data } = matter(await fs.readFile(path.join(dir, file), 'utf8'))
      if (data.draft === true) continue
      // Prefer the default locale when a post exists in several.
      if (bySlug.has(slug) && locale !== defaultLocale) continue
      bySlug.set(slug, {
        slug,
        locale,
        title: typeof data.title === 'string' ? data.title : slug,
        excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
        publishedDate: String(data.publishedDate ?? ''),
      })
    }
  }

  return [...bySlug.values()].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
}

function buildRss(host: string, defaultLocale: string, posts: FeedItem[]): string {
  const site = host.replace(/\/+$/, '')
  const items = posts
    .slice(0, 50)
    .map((post) => {
      // Link to the post's actual content locale (its canonical URL), not the
      // default locale, so posts that only exist in another language aren't
      // pointed at a fallback URL.
      const url = escapeXml(`${site}/${post.locale}/blog/${post.slug}`)
      const date = new Date(post.publishedDate)
      const pubDate = Number.isNaN(date.getTime()) ? '' : date.toUTCString()
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : '',
        post.excerpt ? `      <description>${escapeXml(post.excerpt)}</description>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Vocdoni blog</title>',
    `    <link>${site}/${defaultLocale}/blog</link>`,
    '    <description>Insights on secure digital voting from Vocdoni.</description>',
    `    <language>${defaultLocale}</language>`,
    `    <atom:link href="${site}/blog/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

export function blogRssPlugin(options: Options): Plugin {
  let root = process.cwd()
  let clientOutDir = path.resolve('dist/client')
  let isSSRBuild = false
  let ran = false

  return {
    name: 'blog-rss-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      root = config.root ? path.resolve(config.root) : process.cwd()
      const outDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = outDir.endsWith(`${path.sep}client`) ? outDir : path.join(outDir, 'client')
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || req.url.split('?')[0] !== '/blog/rss.xml') return next()
        const posts = await collectPosts(root, options.locales, options.defaultLocale)
        res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
        res.end(buildRss(options.hostname, options.defaultLocale, posts))
      })
    },
    async closeBundle() {
      if (isSSRBuild || ran) return
      ran = true
      const posts = await collectPosts(root, options.locales, options.defaultLocale)
      await fs.mkdir(path.join(clientOutDir, 'blog'), { recursive: true })
      await fs.writeFile(
        path.join(clientOutDir, 'blog', 'rss.xml'),
        buildRss(options.hostname, options.defaultLocale, posts),
        'utf8'
      )
    },
  }
}
