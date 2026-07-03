/**
 * One-time importer: Ghost export JSON -> Keystatic blog content.
 *
 * Reads a Ghost content export and writes:
 *   - content/blog/<locale>/<slug>.mdoc   (posts, YAML frontmatter + markdown body)
 *   - content/blog/authors/<slug>.mdoc    (authors referenced by posts)
 *   - content/blog/categories/<slug>.mdoc (public tags -> categories)
 *   - public/blog/images/<year>/<month>/… (referenced post images, copied from images_for_blog/)
 *   - public/blog/authors/<slug>.webp     (author avatars hosted by Ghost)
 *
 * Post language is derived from the internal Ghost tags `#en` / `#ca` (default `en`).
 * The site renders these files with the existing docs markdown pipeline; Keystatic
 * edits the same files. Re-runnable: it clears content/blog/<locale> post folders and
 * the generated author/category folders before writing.
 *
 * Usage: pnpm exec tsx scripts/import-ghost-blog.ts [path/to/export.json]
 */
import matter from 'gray-matter'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkGfm from 'remark-gfm'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

const ROOT = path.resolve(import.meta.dirname, '..')
const DEFAULT_EXPORT = path.join(os.homedir(), 'Downloads', 'vocdoni-blog.ghost.2026-07-01-13-53-15.json')
const EXPORT_PATH = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_EXPORT
const IMAGES_SRC = path.join(ROOT, 'images_for_blog')
const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'blog', 'images')
const PUBLIC_AVATARS = path.join(ROOT, 'public', 'blog', 'authors')
const TEAM_DIR = path.join(ROOT, 'assets', 'images', 'team')

// Prefer the About Us team photos for author avatars over Ghost's profile images.
const TEAM_AVATARS: Record<string, string> = {
  ferran: 'ferran.webp',
  pau: 'pau_escrich.webp',
  'jordi-pinyana': 'jordi_pinyana.webp',
  lucas: 'lucas.webp',
}

// Locales that have real source content in the export. Everything else falls back
// to English at render time, so we only ever write en/ca here.
const LOCALES = ['ca', 'de', 'el', 'en', 'es', 'eu', 'fr', 'it', 'pt']

// --- taxonomy normalisation --------------------------------------------------

// Ghost tag slug -> canonical category slug (merge duplicates).
const CATEGORY_ALIAS: Record<string, string> = {
  'vocdoni-app-2': 'vocdoni-app',
}
// Human names in sentence case (AGENTS.md), preserving proper nouns/brands.
const CATEGORY_NAMES: Record<string, string> = {
  news: 'News',
  technology: 'Technology',
  'success-stories': 'Success stories',
  'product-updates': 'Product updates',
  partnerships: 'Partnerships',
  davinci: 'DAVINCI',
  'vocdoni-app': 'Vocdoni App',
  announcements: 'Announcements',
  'use-cases': 'Use cases',
}

// --- small helpers -----------------------------------------------------------

type AnyRow = Record<string, any>

const dateOnly = (iso?: string | null): string | undefined => {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString().slice(0, 10)
}

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const excerptFrom = (plaintext?: string | null): string => {
  if (!plaintext) return ''
  const clean = plaintext.replace(/\s+/g, ' ').trim()
  if (clean.length <= 160) return clean
  return clean.slice(0, 157).replace(/\s+\S*$/, '') + '…'
}

const langFromTags = (tagSlugs: string[]): string => {
  if (tagSlugs.includes('hash-ca')) return 'ca'
  return 'en'
}

// --- image resolution --------------------------------------------------------

// Map "year/month/basename" (no extension) -> repo-relative source path, plus a
// basename-only fallback. Ghost URLs may reference .png/.jpg while the exported
// file on disk is the .webp we actually ship.
async function buildImageIndex() {
  const byPath = new Map<string, string>()
  const byBase = new Map<string, string>()

  const walk = async (dir: string) => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = await fs.readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'size') continue // Ghost responsive derivatives
        await walk(full)
        continue
      }
      if (!entry.isFile()) continue
      const rel = path.relative(IMAGES_SRC, full)
      const noExt = rel.replace(/\.[^.]+$/, '')
      byPath.set(noExt, rel)
      const base = path.basename(noExt)
      if (!byBase.has(base)) byBase.set(base, rel)
    }
  }
  await walk(IMAGES_SRC)
  return { byPath, byBase }
}

const GHOST_IMAGE_RE = /(?:__GHOST_URL__|https?:\/\/[^\s)"']+?)?\/content\/images\/([^\s)"']+)/g

// Resolve a single "content/images/<tail>" reference to a public URL, copying the
// source file into public/blog/images. Returns null when the file is missing.
async function resolveImage(
  tail: string,
  index: Awaited<ReturnType<typeof buildImageIndex>>,
  copied: Set<string>
): Promise<string | null> {
  const decoded = decodeURIComponent(tail)
  const noExt = decoded.replace(/\.[^.]+$/, '')
  const rel = index.byPath.get(noExt) ?? index.byBase.get(path.basename(noExt))
  if (!rel) return null

  const dest = path.join(PUBLIC_IMAGES, rel)
  if (!copied.has(rel)) {
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(path.join(IMAGES_SRC, rel), dest)
    copied.add(rel)
  }
  return `/blog/images/${rel.split(path.sep).join('/')}`
}

// Replace every Ghost image reference in a string with its public URL.
async function rewriteImages(
  input: string,
  index: Awaited<ReturnType<typeof buildImageIndex>>,
  copied: Set<string>,
  missing: Set<string>
): Promise<string> {
  const matches = [...input.matchAll(GHOST_IMAGE_RE)]
  let out = input
  for (const m of matches) {
    const publicUrl = await resolveImage(m[1], index, copied)
    if (publicUrl) {
      out = out.split(m[0]).join(publicUrl)
    } else {
      missing.add(m[1])
    }
  }
  return out
}

// --- html -> markdown --------------------------------------------------------

// Ghost frequently emits emphasis with whitespace *inside* the tag
// (`<strong>text </strong>next`) and split emphasis (`</strong><strong>`), which
// makes remark-stringify escape the tag boundaries into ugly numeric entities.
// Normalising the HTML first keeps the generated markdown clean.
const cleanGhostHtml = (html: string): string => {
  let out = html
  for (let i = 0; i < 3; i++) {
    out = out
      .replace(/<\/(strong|em|b|i)>(\s*)<\1>/g, '$2') // merge adjacent same emphasis
      .replace(/<(strong|em|b|i)>(\s+)/g, '$2<$1>') // move leading space out
      .replace(/(\s+)<\/(strong|em|b|i)>/g, '</$2>$1') // move trailing space out
      .replace(/<(strong|em|b|i)>(\s*)<\/\1>/g, '$2') // drop empty emphasis
  }
  return out
}

const htmlToMarkdown = (html: string): string => {
  const file = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    // (input HTML is pre-cleaned by cleanGhostHtml before parsing)
    .use(remarkGfm)
    .use(remarkStringify, {
      bullet: '-',
      emphasis: '_',
      strong: '*',
      fence: '`',
      fences: true,
      listItemIndent: 'one',
      rule: '-',
    })
    .processSync(cleanGhostHtml(html))
  return String(file).trim() + '\n'
}

// Normalise a converted markdown body: rewrite Ghost internal post links to
// root-relative /blog/<slug> (the render pipeline localizes them to the current
// language), and remove em dashes (AGENTS.md) without creating markdown lists -
// attribution lines that sit after a "\" hard break get an escaped hyphen.
const normalizeBody = (body: string): string => {
  body = body.replace(/__GHOST_URL__\/([a-z0-9][a-z0-9-]*)\/?/g, '/blog/$1')

  const lines = body.split('\n')
  const out: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const afterHardbreak = i > 0 && /\\\s*$/.test(lines[i - 1])
    const m = lines[i].match(/^(\s*(?:> )*)([-—])\s+(.*)$/)
    if (afterHardbreak && m) {
      out.push(`${m[1]}\\- ${m[3]}`)
      continue
    }
    out.push(lines[i].replace(/^(\s*(?:> )*)—\s+/, '$1\\- '))
  }
  return out.join('\n').replaceAll(' — ', ' - ').replaceAll('—', ' - ')
}

// --- yaml frontmatter --------------------------------------------------------

const stringify = (data: Record<string, unknown>, body: string): string =>
  matter.stringify('\n' + body.trim() + '\n', data, { lineWidth: -1 } as any)

const rmrf = async (dir: string) => fs.rm(dir, { recursive: true, force: true })

// --- main --------------------------------------------------------------------

async function main() {
  const raw = JSON.parse(await fs.readFile(EXPORT_PATH, 'utf8'))
  const data = raw.db[0].data as Record<string, AnyRow[]>

  const users = new Map<string, AnyRow>(data.users.map((u) => [u.id, u]))
  const tags = new Map<string, AnyRow>(data.tags.map((t) => [t.id, t]))
  const tagBySlug = new Map<string, AnyRow>(data.tags.map((t) => [t.slug, t]))
  const userBySlug = new Map<string, AnyRow>(data.users.map((u) => [u.slug, u]))
  const metaByPost = new Map<string, AnyRow>((data.posts_meta ?? []).map((m) => [m.post_id, m]))

  const tagsByPost = new Map<string, string[]>()
  for (const pt of data.posts_tags ?? []) {
    const tag = tags.get(pt.tag_id)
    if (!tag) continue
    const arr = tagsByPost.get(pt.post_id) ?? []
    arr[pt.sort_order ?? arr.length] = tag.slug
    tagsByPost.set(pt.post_id, arr)
  }
  const authorsByPost = new Map<string, string[]>()
  for (const pa of [...(data.posts_authors ?? [])].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))) {
    const user = users.get(pa.author_id)
    if (!user) continue
    const arr = authorsByPost.get(pa.post_id) ?? []
    arr.push(user.slug)
    authorsByPost.set(pa.post_id, arr)
  }

  const index = await buildImageIndex()
  const copied = new Set<string>()
  const missing = new Set<string>()

  // Fresh start for the generated folders.
  for (const loc of LOCALES) await rmrf(path.join(CONTENT_DIR, loc))
  await rmrf(path.join(CONTENT_DIR, 'authors'))
  await rmrf(path.join(CONTENT_DIR, 'categories'))
  await rmrf(PUBLIC_IMAGES)
  await rmrf(PUBLIC_AVATARS)

  const usedAuthors = new Set<string>()
  const usedCategories = new Set<string>()
  let count = 0

  for (const post of data.posts) {
    if (post.type !== 'post') continue

    const rawTags = tagsByPost.get(post.id)?.filter(Boolean) ?? []
    const locale = langFromTags(rawTags)
    const meta = metaByPost.get(post.id)

    const categories = [
      ...new Set(rawTags.filter((s) => tagBySlug.get(s)?.visibility !== 'internal').map((s) => CATEGORY_ALIAS[s] ?? s)),
    ]
    categories.forEach((c) => usedCategories.add(c))

    const postAuthors = authorsByPost.get(post.id) ?? []
    postAuthors.forEach((a) => usedAuthors.add(a))

    const bodyMd = normalizeBody(await rewriteImages(htmlToMarkdown(post.html ?? ''), index, copied, missing))

    const coverImage = post.feature_image ? await rewriteImages(post.feature_image, index, copied, missing) : undefined
    const ogImage = meta?.og_image ? await rewriteImages(meta.og_image, index, copied, missing) : undefined

    const publishedDate = dateOnly(post.published_at) ?? dateOnly(post.created_at) ?? '1970-01-01'
    const updated = dateOnly(post.updated_at)

    const seo: Record<string, string> = {}
    if (meta?.meta_title) seo.metaTitle = meta.meta_title
    if (meta?.meta_description) seo.metaDescription = meta.meta_description
    if (ogImage && ogImage.startsWith('/blog/')) seo.ogImage = ogImage
    if (post.canonical_url) seo.canonicalUrl = post.canonical_url

    const frontmatter: Record<string, unknown> = {
      title: post.title,
      publishedDate,
      ...(updated && updated !== publishedDate ? { updatedDate: updated } : {}),
      excerpt: post.custom_excerpt || excerptFrom(post.plaintext),
      ...(coverImage && coverImage.startsWith('/blog/') ? { coverImage } : {}),
      coverAlt: meta?.feature_image_alt || post.title,
      authors: postAuthors,
      categories,
      featured: post.featured === true || rawTags.includes('hash-featured'),
      draft: post.status !== 'published',
      ...(Object.keys(seo).length ? { seo } : {}),
    }

    const dir = path.join(CONTENT_DIR, locale)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, `${post.slug}.mdoc`), stringify(frontmatter, bodyMd), 'utf8')
    count++
  }

  // Authors -------------------------------------------------------------------
  await fs.mkdir(path.join(CONTENT_DIR, 'authors'), { recursive: true })
  for (const slug of usedAuthors) {
    const user = userBySlug.get(slug)
    if (!user) continue

    let avatar: string | undefined
    const teamFile = TEAM_AVATARS[slug]
    if (teamFile) {
      await fs.mkdir(PUBLIC_AVATARS, { recursive: true })
      try {
        await fs.copyFile(path.join(TEAM_DIR, teamFile), path.join(PUBLIC_AVATARS, `${slug}.webp`))
        avatar = `/blog/authors/${slug}.webp`
      } catch {
        /* ignore */
      }
    }
    if (!avatar && user.profile_image && !/gravatar\.com/.test(user.profile_image)) {
      const resolved = await rewriteImages(user.profile_image, index, copied, missing)
      if (resolved.startsWith('/blog/')) {
        // Move the copied file into public/blog/authors/<slug>.<ext> for a tidy path.
        const from = path.join(ROOT, 'public', resolved.replace(/^\//, ''))
        const ext = path.extname(from)
        await fs.mkdir(PUBLIC_AVATARS, { recursive: true })
        const to = path.join(PUBLIC_AVATARS, `${slug}${ext}`)
        try {
          await fs.copyFile(from, to)
          avatar = `/blog/authors/${slug}${ext}`
        } catch {
          /* ignore */
        }
      }
    }

    const fm: Record<string, unknown> = {
      name: user.name,
      role: '',
      ...(avatar ? { avatar } : {}),
      ...(user.website ? { website: user.website } : {}),
    }
    await fs.writeFile(
      path.join(CONTENT_DIR, 'authors', `${slug}.mdoc`),
      stringify(fm, (user.bio as string) || ''),
      'utf8'
    )
  }

  // Categories ----------------------------------------------------------------
  await fs.mkdir(path.join(CONTENT_DIR, 'categories'), { recursive: true })
  for (const slug of usedCategories) {
    const tag = tagBySlug.get(slug)
    const fm = { name: CATEGORY_NAMES[slug] ?? tag?.name ?? slug }
    await fs.writeFile(
      path.join(CONTENT_DIR, 'categories', `${slug}.mdoc`),
      stringify(fm, (tag?.description as string) || ''),
      'utf8'
    )
  }

  console.log(`\n✓ Imported ${count} posts`)
  console.log(`✓ Authors: ${[...usedAuthors].join(', ')}`)
  console.log(`✓ Categories: ${[...usedCategories].join(', ')}`)
  console.log(`✓ Images copied: ${copied.size}`)
  if (missing.size) {
    console.warn(`\n⚠ ${missing.size} image reference(s) had no source file:`)
    for (const m of missing) console.warn(`   content/images/${m}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
