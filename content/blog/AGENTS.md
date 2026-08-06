# Blog Authoring Guide

This is the authoring reference for the Vocdoni blog. It is policy, not background context - follow
it when creating, translating, or editing posts. For general repo rules (copy style, i18n,
component placement, commits) see the root [`AGENTS.md`](../../AGENTS.md).

## How the blog works

Posts are `.mdoc` files (YAML frontmatter + Markdown body) stored at
`content/blog/<locale>/<slug>.mdoc`. They are authored through **Keystatic** (admin at `/keystatic` -
local file storage in dev, GitHub App in prod) and rendered at build time by `lib/blog/content.ts`,
which parses frontmatter with `gray-matter` and compiles the body to static HTML via the shared docs
markdown pipeline (`lib/docs/markdown.ts`).

- The **schema source of truth** is [`keystatic.config.ts`](../../keystatic.config.ts). The loader is
  [`lib/blog/content.ts`](../../lib/blog/content.ts).
- The body is **plain GitHub-flavored Markdown**. Despite the `.mdoc` extension, posts do **not** use
  custom Markdoc tags (`{% ... %}`). Standard Markdown only: `##`/`###` headings, `**bold**`, links,
  lists, images, `---` rules, GFM tables.
- The **slug is the filename** (`my-post.mdoc` → `/blog/my-post`), never a frontmatter field.

## Post frontmatter

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Display title. Quote it if it contains `:` or apostrophes. |
| `publishedDate` | `'YYYY-MM-DD'` | yes | Quoted ISO date. Drives newest-first sort order. |
| `updatedDate` | `'YYYY-MM-DD'` | no | Not rendered in the post UI. Feeds `article:modified_time` and the JSON-LD `dateModified` (`lib/seo-head.tsx`); falls back to `publishedDate`. |
| `excerpt` | string | no | Short summary; used in listings and as the meta-description fallback. |
| `coverImage` | path | no | Web-absolute, e.g. `/blog/images/2026/01/foo.webp`. |
| `coverAlt` | string | no | Cover alt text (usually mirrors the title). |
| `authors` | string[] | no | Author slugs (see below). YAML list. |
| `categories` | string[] | no | Category slugs (see below). YAML list. |
| `featured` | boolean | no | Highlights the post at the top of the blog index. Defaults `false`. |
| `draft` | boolean | no | Hidden on the live site, visible only in `pnpm dev`. Defaults `false`. |
| `seo` | object | no | Optional overrides: `metaTitle`, `metaDescription`, `ogImage`, `canonicalUrl`. Falls back to title / excerpt / cover image. |

Field names are exact: it is `publishedDate` / `updatedDate` / `coverImage` / `coverAlt` - not
`date` / `image` / `author` / `category`.

Example frontmatter:

```yaml
---
title: 'DAVINCI: the voting protocol that meets the criteria for universal adoption'
publishedDate: '2025-04-24'
updatedDate: '2026-03-06'
excerpt: 'We successfully raised $1 million pre-seed round from angel investors to develop DAVINCI.'
coverImage: /blog/images/2026/01/blogpost_davinci_announcement.webp
coverAlt: 'DAVINCI: the voting protocol that meets the criteria for universal adoption'
authors:
  - pau
categories:
  - davinci
  - technology
featured: true
draft: false
---
```

## Authors

Files live in `content/blog/authors/*.mdoc`; the **filename is the slug** referenced from a post's
`authors:` list. Authors are global (shared across all languages). Fields:

- `name` (required) - display name.
- `role` - job title.
- `avatar` - image path, e.g. `/blog/authors/pau.webp` (stored in `public/blog/authors/`).
- `website` - URL.
- `bio` - Markdown body after the frontmatter (rendered in the end-of-post author card when present).

## Categories

Files live in `content/blog/categories/*.mdoc`; the **filename is the slug** referenced from a post's
`categories:` list. Categories are global. Fields:

- `name` (required) - display name.
- `description` - Markdown body after the frontmatter.

Current slugs: `announcements`, `davinci`, `partnerships`, `product-updates`, `success-stories`,
`technology`, `use-cases`, `vocdoni-app`.

## Translations & locales

Served locales (`locales/index.ts`): `en` (default), `es`, `ca`, `de`, `el`, `eu`, `fr`, `hi`, `it`,
`pt`, `pt-br`.

- Translate a post by creating a file with the **same filename** in another locale directory. Only
  the frontmatter *values* and the body prose are translated - the slug, `coverImage`, `authors`,
  `categories`, `publishedDate`/`updatedDate`, and `featured` are shared across languages.
- URLs are `/<lang>/blog/<slug>`; the slug is identical in every language.
- Missing translations fall back to English, then to any locale that has the post (`resolveSource`
  in `lib/blog/content.ts`), so a missing translation never hides content - but **keep locale
  parity**: every locale currently has every post.

## Images

- Store cover and inline images under `public/blog/images/YYYY/MM/` and reference them
  **web-absolute, without the `public/` prefix**: `/blog/images/2026/03/foo.webp`.
- Use `.webp`. Author avatars live in `public/blog/authors/` (`/blog/authors/<slug>.webp`).

## Copy & i18n

- Post prose is not translated through i18next - it lives in the per-locale `.mdoc` files.
- Blog **UI chrome** (buttons, labels, eyebrows) goes through `react-i18next` under the `blog.*`
  keys, always with an English default value: `t('blog.eyebrow', 'Vocdoni blog')`.
- Follow the root repo copy rules: **sentence case** everywhere, and **never use an em dash**.

## Preview & checks

- `pnpm dev`, then visit `/blog` (and `/keystatic` for the admin). Drafts are visible only in dev.
- `pnpm test` runs `tests/lib/blog/*`. Run `pnpm validate` before pushing.

## Key files

- [`keystatic.config.ts`](../../keystatic.config.ts) - CMS schema (source of truth).
- [`lib/blog/content.ts`](../../lib/blog/content.ts) - loader, frontmatter parsing, locale fallback.
- `lib/blog/format.ts`, `lib/blog/blog-head.ts` - date/initials formatting and route title/description.
- `lib/docs/markdown.ts` - the Markdown → HTML compile pipeline.
- `components/blog/*` - blog UI components. `pages/blog/*` - Vike routes (index, `@slug`, category).
- `locales/index.ts` - served locales.
