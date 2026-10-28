# Repository Guidelines

Policy for everyone (people and agents) working on vocdoni.io. Keep it short: details live in `docs/`, repeatable
procedures in `.agents/skills/` (symlinked from `.claude/skills/`).

## Project structure

- `pages/`: Vike routes (`+Page.tsx`, `+config.ts`). `layouts/`: page wrappers. `hooks/`, `lib/`: reusable logic.
- `components/`: `ui/` holds shadcn primitives and other shared, domain-free UI primitives, `shadcn-studio/` imported or adapted studio blocks only, and custom
  sections live in stable domain folders (`app/`, `home/`, `solutions/`, `blog/`, `case-studies/`, ...).
- `content/`: Markdoc content. The blog is `content/blog/`, the developer docs `content/developers/docs/`.
- `locales/<lang>/common.json`: i18n resources; the served locales are defined in `locales/index.ts`.
- `assets/` (imported, hashed) and `public/` (copied as-is). `scripts/`: maintenance, guardrails, the blog cover
  template and the default share card (`scripts/og-image/`). `tests/`: Vitest, mirroring source domains.

## Commands

- `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm prerender`.
- `pnpm validate` = `pnpm lint` (tsc + Prettier) + `pnpm test` (Vitest) + `pnpm guardrails`. Run it before pushing; CI
  runs the same.
- `pnpm translations` extracts i18n keys and sorts the locale files. `pnpm shadcn add <component>` adds a shadcn/ui component.

## Code style

- Prettier: 2 spaces, single quotes, no semicolons, 120 columns. Components in PascalCase, hooks as `useX`, Vike `+`
  files per Vike conventions.
- Prefer reusable components with variants over repeated Tailwind blocks; readable call sites such as
  `<Button variant='ghost' size='sm'>`.
- UI decision tree: reuse a shadcn-studio block, then adapt one, then build a custom domain component. Use the
  shadcn-studio MCP when it is available.
- Never create revision folders or files (`*V2`, `*V3`, `new-*`, `legacy-*`). `components/app/ValuePropsV3.tsx` is a
  temporary exception to merge later.
- Brand (name, voice, logo, palette): `BRAND.md`. Visual language and tokens: `DESIGN.md` and `docs/design-system.md`.

## Copy

- Sentence case everywhere: only the first word, proper nouns, acronyms (GDPR, SDK) and "Vocdoni" are capitalized.
- Never an em dash character; use a spaced `-` or restructure the sentence.
- User-facing copy in `pages/` and `components/` goes through `react-i18next` with an English default:
  `t('about_us.title', 'About us')`. Keys are `snake_case`, nested by domain.

## i18n

- `i18next` and `react-i18next` only. Every locale holds every key `en` holds, with a real translation: no empty values,
  no English copied verbatim.
- `pnpm guardrails` enforces extraction, locale parity, non-empty values, no copied English (in every locale but the
  `es` and `ca` references, which you check by hand), static keys and no hardcoded copy. Intentional English (brands, proper nouns, cognates) is allowlisted in
  `scripts/guardrails/untranslated-copy-allowlist.json`. Rationale and the one shape exception: [`docs/i18n.md`](docs/i18n.md).

## Testing

- Vitest, `tests/**/*.test.ts(x)` mirroring source. Test functional or non-trivial logic only; skip static config
  titles and snapshots of presentational components.

## Blog

- Posts are `.mdoc` files at `content/blog/<locale>/<slug>.mdoc` (the slug is the filename, the body is plain Markdown),
  rendered by `lib/blog/`. Keep locale parity. Images live in `public/blog/images/YYYY/MM/*.webp`; covers are rendered
  from the `scripts/blog-cover/` template, never made by hand.
- Schema and conventions: [`content/blog/AGENTS.md`](content/blog/AGENTS.md). Workflow: the `add-blog-post` skill.

## Skills (recurring tasks)

- `.agents/skills/add-blog-post/`: write a post, render its cover, translate it into all locales, cross-link and ship.
- `.agents/skills/add-testimonial/`: the 325x325 round logo, the data entry and the locale keys in all 11 languages.
- A new skill also needs its own un-ignore lines in `.gitignore` (and its `.claude/skills/` symlink); the skill folders
  are otherwise ignored so locally installed skills stay out of git.

## Commits and pull requests

- Conventional commits with a scope (`feat(i18n): ...`, `fix(blog): ...`); header and body lines up to 120 characters
  (commitlint). Small, descriptive commits.
- PRs follow `.github/pull_request_template.md`: summary, validation checklist, screenshots for UI changes.
  `pnpm validate` must pass first.

## Deployment and release

- Netlify, one workflow: a push to `lts` deploys production (`vocdoni.io`, the only indexable deploy), a push to `main`
  deploys the dev site with `NOINDEX=true`, and pull requests get noindexed previews. `main` is the development branch;
  a release is a merge of `main` into `lts`, so only merge into `main` what you are willing to release next.
- Redirects: edit `lib/legacyRedirects.ts` only; a renamed route needs an entry or indexed URLs 404.
- The CSP is an allowlist: any new third-party origin must be added to `buildContentSecurityPolicy` in
  `plugins/well-known.ts` first, or the browser silently blocks it.
- Environments, headers, `NOINDEX`, edge functions, the docs version selector and the content-only `stage` branch:
  [`docs/deployment.md`](docs/deployment.md) and the [README](README.md#deployment).

## Keep this file current

This file is policy. When a workflow changes, update it, and the doc or skill it points to, in the same PR.
