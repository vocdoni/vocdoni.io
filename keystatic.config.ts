import { collection, config, fields } from '@keystatic/core'
import { availableLocales, localeDefault } from './locales/index'

// Keystatic CMS for the Vocdoni blog.
//
// Storage is `local` only: the admin at /keystatic writes markdown files straight
// to disk during `pnpm dev`, and you commit them yourself. There is no deployed
// editing surface - editors run the admin locally (see plugins/keystatic-api.ts).
//
// The live site does NOT read content through Keystatic's reader: it renders the
// same files with the existing docs markdown pipeline (see lib/blog/*). Keystatic
// is purely the authoring layer, so it never sits on the production build path.

// Locales that get their own posts collection in the admin, derived from the served
// locales in locales/index.ts (default locale first) so the two never drift. Imported
// relative rather than via the `@/` alias. locales/index.ts is self-contained, so a
// relative import stays safe in every build context.
const LOCALES: Record<string, string> = Object.fromEntries(
  [...availableLocales]
    .sort((a, b) => (a.value === localeDefault ? -1 : b.value === localeDefault ? 1 : 0))
    .map(({ value, label }) => [value, label])
)

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
  storage: { kind: 'local' },
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
