import {
  CURATED_SECTIONS,
  FAMILIES,
  type FamilyName,
  FAMILY_META_NAMESPACE,
  familyNoteKey,
  INTRO_KEYS,
  LLMS_FULL_NOTE_KEY,
  LLMS_FULL_TITLE_KEY,
  OPTIONAL_SECTION_ID,
  SUMMARY_KEY,
  sectionHeadingKey,
} from './catalog'
import {
  blogCategoryPath,
  type DocEntry,
  discoverDocs,
  discoverPageRoutes,
  discoverPosts,
  discoverRouteChildren,
  docPath,
  localePath,
  type PostEntry,
  postPath,
  rawDocPath,
  rawPostPath,
} from './routes'
import { type LlmsDocument, type LlmsLink, type LlmsSection, renderLlms } from './render'
import { firstSentence, loadStrings, metaKeyForSlug, stripBrandSuffix } from './strings'

/**
 * Composes the two agent-discovery indexes:
 *   /llms.txt        curated, buyer-first, one annotated link per page that matters
 *   /llms-full.txt   complete machine enumeration of every route and markdown mirror
 *
 * Pulled into the Vite config bundle - relative imports only.
 */

export interface LlmsContext {
  root: string
  hostname: string
  locale: string
  defaultLocale: string
  locales: readonly string[]
  /**
   * Pre-loaded content tree. A build emits one index per locale plus the full index,
   * so without this the content tree would be walked a dozen times over. Omit it in
   * dev so every request reflects the files on disk right now.
   */
  content?: LlmsContent
}

/** Everything the indexes are derived from, walked once. */
export interface LlmsContent {
  routes: string[]
  docs: DocEntry[]
  posts: PostEntry[]
  categories: string[]
  familyChildren: Record<FamilyName, string[]>
}

const DOC_SOURCE_LOCALE = 'en'
const SITE_TITLE = 'Vocdoni'

export async function loadLlmsContent(root: string, locales: readonly string[]): Promise<LlmsContent> {
  const [routes, docs, posts] = await Promise.all([
    discoverPageRoutes(root),
    discoverDocs(root, DOC_SOURCE_LOCALE),
    discoverPosts(root, locales),
  ])

  const familyChildren = {} as Record<FamilyName, string[]>
  await Promise.all(
    FAMILIES.map(async (family) => {
      familyChildren[family] = await discoverRouteChildren(root, family)
    })
  )

  const categories = new Set<string>()
  for (const post of posts) for (const category of post.categories) categories.add(category)

  return { routes, docs, posts, categories: [...categories].sort(), familyChildren }
}

/** A curated link is only worth emitting if it is annotated; an unannotated one is a bug. */
function required(value: string, what: string): string {
  if (!value.trim()) throw new Error(`llms.txt: missing ${what}`)
  return value
}

export async function buildLlmsIndex(ctx: LlmsContext): Promise<string> {
  const { root, locale } = ctx
  const t = await loadStrings(root, locale)

  const { docs, posts, familyChildren } = ctx.content ?? (await loadLlmsContent(root, ctx.locales))
  const postBySlug = new Map(posts.map((p) => [p.slug, p]))

  const sections: LlmsSection[] = []

  for (const section of CURATED_SECTIONS) {
    const links: LlmsLink[] = []

    for (const block of section.blocks) {
      switch (block.type) {
        case 'route':
          links.push({
            title: required(stripBrandSuffix(t(block.titleKey)), `title for ${block.route} (${block.titleKey})`),
            url: localePath(locale, block.route),
            note: required(t(block.noteKey), `note for ${block.route} (${block.noteKey})`),
          })
          break

        case 'external':
          links.push({
            title: required(t(block.titleKey), `title for ${block.url} (${block.titleKey})`),
            url: block.url,
            note: required(t(block.noteKey), `note for ${block.url} (${block.noteKey})`),
          })
          break

        case 'post': {
          const post = postBySlug.get(block.slug)
          if (!post) throw new Error(`llms.txt: curated blog post "${block.slug}" not found (renamed, or now a draft?)`)
          links.push({
            title: post.title,
            url: postPath(locale, post.slug),
            note: required(t(block.noteKey), `note for blog post ${block.slug} (${block.noteKey})`),
          })
          break
        }

        case 'family': {
          const namespace = FAMILY_META_NAMESPACE[block.family]
          for (const slug of familyChildren[block.family] ?? []) {
            const noteKey = familyNoteKey(block.family, slug)
            links.push({
              title: required(
                stripBrandSuffix(t(`${metaKeyForSlug(namespace, slug)}.title`)),
                `title for /${block.family}/${slug}`
              ),
              url: localePath(locale, `/${block.family}/${slug}`),
              note: required(t(noteKey), `note for /${block.family}/${slug} (${noteKey})`),
            })
          }
          break
        }

        case 'docs':
          for (const doc of docs) {
            links.push({
              title: doc.title,
              url: docPath(locale, doc.slug),
              note: required(firstSentence(doc.lead), `lead for developer doc "${doc.slug}"`),
            })
          }
          break
      }
    }

    sections.push({ heading: required(t(sectionHeadingKey(section.id)), `heading for section "${section.id}"`), links })
  }

  // llmstxt.org reserves `## Optional` for secondary material a consumer may skip.
  sections.push({
    heading: required(t(sectionHeadingKey(OPTIONAL_SECTION_ID)), 'heading for the Optional section'),
    links: [
      {
        title: required(t(LLMS_FULL_TITLE_KEY), 'title for llms-full.txt'),
        url: '/llms-full.txt',
        note: required(t(LLMS_FULL_NOTE_KEY), 'note for llms-full.txt'),
      },
    ],
  })

  const doc: LlmsDocument = {
    title: SITE_TITLE,
    summary: required(t(SUMMARY_KEY), `summary (${SUMMARY_KEY})`),
    intro: INTRO_KEYS.map((key) => t(key)).filter((p) => p.trim()),
    sections,
  }

  return renderLlms(doc, ctx.hostname)
}

export async function buildLlmsFull(ctx: LlmsContext): Promise<string> {
  const { root, locale } = ctx
  const t = await loadStrings(root, locale)

  const { routes, docs, posts, categories } = ctx.content ?? (await loadLlmsContent(root, ctx.locales))

  const doc: LlmsDocument = {
    title: SITE_TITLE,
    summary: t(SUMMARY_KEY),
    intro: [
      'Complete link index of vocdoni.io. Append `.md` to any developer-docs or blog URL for its raw markdown; ' +
        'the markdown mirrors are listed below. Every page also exists under each of the ' +
        `${ctx.locales.length} locale prefixes (${ctx.locales.join(', ')}). ` +
        'For a curated, buyer-first entry point, read /llms.txt instead.',
    ],
    sections: [
      { heading: 'Pages', links: routes.map((route) => ({ title: route, url: localePath(locale, route) })) },
      {
        heading: 'Developer docs (markdown)',
        links: docs.map((d) => ({ title: d.title, url: rawDocPath(locale, d.slug) })),
      },
      {
        heading: 'Blog posts (markdown)',
        links: posts.map((p) => ({ title: p.title, url: rawPostPath(locale, p.slug) })),
      },
      {
        heading: 'Blog categories',
        links: categories.map((c) => ({ title: c, url: blogCategoryPath(locale, c) })),
      },
    ],
  }

  return renderLlms(doc, ctx.hostname)
}
