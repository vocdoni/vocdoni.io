# Repository Guidelines

## Project Structure & Module Organization

- `pages/`: Vike routes and page entry points (`+Page.tsx`, `+config.ts`, etc.).
- `components/`: shared UI building blocks (shadcn/ui components live under `components/ui/`).
- `layouts/`: page-level layout wrappers.
- `hooks/`, `lib/`: reusable hooks and utilities.
- `content/`: Markdoc (`.mdoc`) content - the blog lives under `content/blog/`.
- `locales/`: i18n resources; the served locale set is defined in `locales/index.ts`.
- `assets/` and `public/`: static assets; `public/` is copied as-is.
- `tests/`: Vitest unit tests, organized by `components/`, `pages/`, and `lib/`.

## Build, Test, and Development Commands

- `pnpm dev`: run the local dev server via Vike.
- `pnpm build`: production build.
- `pnpm preview`: preview the production build locally.
- `pnpm test`: run Vitest in CI mode.
- `pnpm lint`: check formatting with Prettier.
- `pnpm translations`: extract i18n keys with i18next-cli.
- `pnpm prerender`: generate static output when needed.
- `pnpm shadcn add <component>`: add a shadcn/ui component.

## Coding Style & Naming Conventions

- Indentation: 2 spaces (see `.editorconfig`).
- Formatting: Prettier with single quotes, no semicolons, 120-char line width (`.prettierrc`).
- Files: Vike `+` files use Vike conventions (e.g., `pages/+config.ts`).
- React components use PascalCase; hooks use `useX`.

## Copy & Typography Content Guidelines

- strictly use **sentence case** everywhere on the site (only the first word of any string/title is capitalized) unless the word is a proper noun, an acronym (e.g. GDPR, SDK), or the brand "Vocdoni". Do not use title case for component titles, menus, or features.
- **Never use an em dash character**. Substitute with a normal spaced dash (`-`) or structure the sentence differently.

## Component Reusability & Variants

- Prefer reusable components with clear variants (e.g., size, tone, layout) over repeated Tailwind class blocks.
- When Tailwind verbosity grows, extract a component or add a variant prop instead of duplicating markup.
- Aim for readable call sites: `Button variant="ghost" size="sm"` is preferred over inline class repetition.
- UI building blocks come from both shadcn/ui and shadcn-studio; prioritize existing shadcn components before inventing new ones.
- If the shadcn-studio MCP is available in your environment, use it to source sections/blocks before rolling custom layouts.
- `components/ui/` is only for reusable UI primitives.
- `components/shadcn-studio/` is only for imported or adapted shadcn-studio blocks.
- Custom sections must live in stable domain folders such as `components/app/`, `components/home/`, or `components/use-cases/`.
- Do not create new revision or migration folders such as `*V2`, `*V3`, `new-*`, or `legacy-*`. The existing `VocdoniApp` and `VocdoniAppV3` folders are temporary exceptions to be merged later.
- Decision tree: reuse a studio block first, adapt a studio block second, and build a custom domain component only when studio blocks do not fit.

## Testing Guidelines

- Framework: Vitest.
- Tests live under `tests/` and mirror source domains.
- Naming: `*.test.ts` or `*.test.tsx` (see `tests/components/LanguageSwitcher.test.tsx`).
- Run: `pnpm test` or target files with `vitest <path>`.
- Only add tests for functional or non-trivial logic; UI-only or config-only behavior generally does not need tests.
- Examples of what to skip: checking static `+config.ts` titles, or snapshotting simple presentational components without logic.

## Internationalization (i18n)

- We use `i18next` and `react-i18next`; do not introduce new translation systems.
- Translation files live under `locales/<lang>/common.json`; active locales are defined in `locales/index.ts`
- Key format is `snake_case`, nested by domain to avoid ambiguity (e.g., `about_us.title`, `about_us.feature_cards.accessibility.title`).
- Run `pnpm translations` to extract keys when adding new strings.
- Translations are always defined with a default value e.g. `t('sections.terms.title', 'Terms and Conditions')`
- User-facing copy in `pages/` and `components/` must go through `t(...)` with a default value. Do not add hardcoded JSX copy unless it is an explicitly documented exception.
- `pnpm guardrails:translations` must pass without modifying locale files.
- Non-English locales must not contain copy pasted verbatim from English. `pnpm guardrails:translations:no-copy` diffs every in-progress locale (`de`, `el`, `eu`, `fr`, `it`, `pt`) against `en` and fails on any value identical to the English source. The complete reference locales (`es`, `ca`) tell real copy apart from proper nouns/brands/acronyms: a key is only flagged when at least one reference renders it differently from English. Leave a value as an empty string (`""`) until it is translated rather than copying the English text. Values that are intentionally identical to English (brand/product names, proper nouns not shared across the references, and genuine cross-language cognates) are listed in `scripts/guardrails/untranslated-copy-allowlist.json`.

## Blog Content

- Posts are `.mdoc` files (YAML frontmatter + plain Markdown body) at `content/blog/<locale>/<slug>.mdoc`, authored via **Keystatic** (`/keystatic`) and rendered at build time by `lib/blog/`. Posts do not use custom Markdoc tags.
- The **slug is the filename** (`my-post.mdoc` → `/blog/my-post`), not a frontmatter field.
- Translate a post by creating a file with the **same filename** in another locale dir; only frontmatter values and body prose change. Keep locale parity across the served locales in `locales/index.ts`.
- Store images under `public/blog/images/YYYY/MM/` as `.webp`, referenced web-absolute (`/blog/images/...`, no `public/` prefix).
- Blog UI copy (not post prose) goes through `react-i18next` under `blog.*` keys with English defaults.
- Full authoring reference: [`content/blog/AGENTS.md`](content/blog/AGENTS.md).

## Commit & Pull Request Guidelines

- Commit style follows conventional-ish prefixes and scopes (e.g., `feat(i18n): ...`, `chore(ui): ...`, `refactor: ...`).
- Keep commits small and descriptive.
- PRs should include: a concise summary, testing notes, and screenshots for UI changes.
- Before pushing, run `pnpm validate`.

## Migration Notes (Temporary Constraints)

- The site now runs on a single Vike codebase, but some pages still mix older custom sections with newer shadcn-studio blocks.

## Deployment

Everything deploys to Netlify from one workflow (`.github/workflows/deploy-netlify.yml`). The site and all build-time values come from the GitHub environment the trigger selects:

- push to `lts` → `production` environment → `vocdoni.io`. The only indexable deploy.
- push to `main` → `develop` environment → the dev site, built with `NOINDEX=true`.
- pull request → `pull request` environment → `deploy-preview-<n>` alias, also `NOINDEX=true`.

`main` is the development branch; production changes land on `lts`.

Redirect rules are emitted as a `_redirects` file inside `dist/client` at build time by `plugins/legacy-redirects.ts` (never committed), from the single source of truth in **`lib/legacyRedirects.ts`**. To add, change, or remove a redirect, edit that file only.

`NOINDEX=true` makes the build emit `X-Robots-Tag: noindex, nofollow` in `_headers`, drop the `Sitemap:` line from `robots.txt`, and add a `robots` meta tag. Never set it for a production build.

## Agent-Specific Instructions

- This repo expects an `AGENTS.md` contributor guide; keep it updated as workflows change.
