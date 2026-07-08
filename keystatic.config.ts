import { collection, config, fields } from '@keystatic/core'

// Keystatic CMS for the Vocdoni blog.
//
// Storage is environment-aware so the same config powers both editing modes:
//   - development -> `local`  : the admin at /keystatic writes markdown files
//     straight to disk; you commit them yourself.
//   - production  -> `github` : the deployed admin commits through the Keystatic
//     GitHub App (needs the app installed + KEYSTATIC_* env vars on the host).
//
// The live site does NOT read content through Keystatic's reader: it renders the
// same files with the existing docs markdown pipeline (see lib/blog/*). Keystatic
// is purely the authoring layer, so it never sits on the production build path.

// PROD detection that works in the browser (Vike statically replaces
// import.meta.env.PROD), in Vite SSR, and in a plain Node bundle (Netlify
// function). Vike only substitutes the static `import.meta.env.PROD` form, so it
// must be written exactly like that; in a Node bundle import.meta.env is undefined
// and the access throws, so we fall back to NODE_ENV there.
let isProd: boolean
try {
  isProd = Boolean(import.meta.env.PROD)
} catch {
  isProd = typeof process !== 'undefined' && process.env.NODE_ENV === 'production'
}

// Locales that get their own posts collection in the admin. Mirrors locales/index.ts;
// kept as a literal here so keystatic.config stays importable without the app alias.
const LOCALES: Record<string, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
  de: 'Deutsch',
  el: 'Ελληνικά',
  eu: 'Euskara',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
}

const postSchema = {
  title: fields.slug({
    name: { label: 'Title', validation: { isRequired: true } },
    slug: { label: 'Slug (URL)', description: 'The final part of the post URL: /<lang>/blog/<slug>' },
  }),
  publishedDate: fields.date({ label: 'Published date', validation: { isRequired: true } }),
  updatedDate: fields.date({ label: 'Updated date' }),
  excerpt: fields.text({
    label: 'Excerpt',
    description: 'Short summary shown in listings and used as the meta description fallback.',
    multiline: true,
  }),
  coverImage: fields.image({
    label: 'Cover image',
    directory: 'public/blog/images',
    publicPath: '/blog/images/',
  }),
  coverAlt: fields.text({ label: 'Cover image alt text' }),
  authors: fields.array(fields.relationship({ label: 'Author', collection: 'authors' }), {
    label: 'Authors',
    itemLabel: (props) => props.value ?? 'Author',
  }),
  categories: fields.array(fields.relationship({ label: 'Category', collection: 'categories' }), {
    label: 'Categories',
    itemLabel: (props) => props.value ?? 'Category',
  }),
  featured: fields.checkbox({ label: 'Featured', description: 'Highlight this post at the top of the blog.' }),
  draft: fields.checkbox({ label: 'Draft', description: 'Hidden from the live site until unchecked.' }),
  seo: fields.object(
    {
      metaTitle: fields.text({ label: 'Meta title' }),
      metaDescription: fields.text({ label: 'Meta description', multiline: true }),
      ogImage: fields.image({
        label: 'Social share image',
        directory: 'public/blog/images',
        publicPath: '/blog/images/',
      }),
      canonicalUrl: fields.url({ label: 'Canonical URL' }),
    },
    { label: 'SEO', description: 'Optional overrides. Falls back to title / excerpt / cover image.' }
  ),
  content: fields.markdoc({ label: 'Body' }),
}

const postsCollections = Object.fromEntries(
  Object.entries(LOCALES).map(([code, label]) => [
    `posts_${code}`,
    collection({
      label: `Posts (${label})`,
      path: `content/blog/${code}/*`,
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'publishedDate'],
      schema: postSchema,
    }),
  ])
)

export default config({
  storage: isProd ? { kind: 'github', repo: { owner: 'vocdoni', name: 'vocdoni.io' } } : { kind: 'local' },
  ui: {
    brand: { name: 'Vocdoni blog' },
    navigation: {
      Content: [...Object.keys(LOCALES).map((code) => `posts_${code}`)],
      Taxonomy: ['authors', 'categories'],
    },
  },
  collections: {
    ...postsCollections,
    authors: collection({
      label: 'Authors',
      path: 'content/blog/authors/*',
      slugField: 'name',
      format: { contentField: 'bio' },
      columns: ['name', 'role'],
      schema: {
        name: fields.slug({ name: { label: 'Name', validation: { isRequired: true } } }),
        role: fields.text({ label: 'Role' }),
        avatar: fields.image({ label: 'Avatar', directory: 'public/blog/authors', publicPath: '/blog/authors/' }),
        website: fields.url({ label: 'Website' }),
        bio: fields.markdoc({ label: 'Bio' }),
      },
    }),
    categories: collection({
      label: 'Categories',
      path: 'content/blog/categories/*',
      slugField: 'name',
      format: { contentField: 'description' },
      schema: {
        name: fields.slug({ name: { label: 'Name', validation: { isRequired: true } } }),
        description: fields.markdoc({ label: 'Description' }),
      },
    }),
  },
})
