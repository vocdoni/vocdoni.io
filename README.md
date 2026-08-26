<p align="center" width="100%">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://vocdoni.io/images/vocdoni_logotype_full_blank.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://vocdoni.io/images/vocdoni_logotype_full_white.svg" />
      <img alt="Vocdoni" src="https://vocdoni.io/images/vocdoni_logotype_full_white.svg" />
    </picture>
</p>

<p align="center" width="100%">
    <a href="https://github.com/vocdoni/vocdoni.io/commits/main/"><img src="https://img.shields.io/github/commit-activity/m/vocdoni/vocdoni.io" /></a>
    <a href="https://github.com/vocdoni/vocdoni.io/issues"><img src="https://img.shields.io/github/issues/vocdoni/vocdoni.io" /></a>
    <a href="https://chat.vocdoni.io"><img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" /></a>
    <a href="https://twitter.com/vocdoni"><img src="https://img.shields.io/twitter/follow/vocdoni.svg?style=social&label=Follow" /></a>
</p>

<div align="center">
  Vocdoni is the first universally verifiable, censorship-resistant, anonymous, and self-sovereign governance protocol.<br />
  Our main aim is a trustless voting system where anyone can speak their voice and where everything is auditable.<br />
  We are engineering building blocks for a permissionless, private and censorship resistant democracy.
  <br /><br />
  <a href="https://developer.vocdoni.io/"><strong>Explore the developer portal »</strong></a>
  <br /><br />
  <a href="https://vocdoni.io">Vocdoni Website</a>
  |
  <a href="https://vocdoni.app">Web Application</a>
  |
  <a href="https://explorer.vote/">Blockchain Explorer</a>
  |
  <a href="https://chat.vocdoni.io">Contact Us</a>
</div>

# vocdoni.io

The marketing website for [Vocdoni](https://vocdoni.io), built with [Vike](https://vike.dev/) and [React](https://react.dev/). It is a statically prerendered site served at `vocdoni.io`.

### Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Redirects](#redirects)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

```sh
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site. Other useful commands:

| Command                       | Description                                 |
| ----------------------------- | ------------------------------------------- |
| `pnpm build`                  | Production build (outputs to `dist/client`) |
| `pnpm preview`                | Serve the production build locally          |
| `pnpm test`                   | Run Vitest in CI mode                       |
| `pnpm lint`                   | Check formatting with Prettier              |
| `pnpm validate`               | Run all lint, test, and guardrail checks    |
| `pnpm translations`           | Extract i18n keys with i18next-cli          |
| `pnpm shadcn add <component>` | Add a shadcn/ui component                   |

## Project Structure

```
pages/          Vike routes and page entry points (+Page.tsx, +config.ts, …)
components/     Shared UI building blocks (shadcn/ui lives under components/ui/)
layouts/        Page-level layout wrappers
hooks/          Reusable React hooks
lib/            Utility modules (including redirect rules and blog loader)
content/        Markdoc (.mdoc) content - the blog lives under content/blog/
locales/        i18n resources (en, es, ca + in-progress locales)
assets/         Static assets bundled by Vite
public/         Files copied as-is to the build output
tests/          Vitest unit tests
scripts/        Build-time and guardrail scripts
plugins/        Vite plugins (e.g. redirect file emitter)
.github/        CI/CD workflows
```

The blog is authored via Keystatic (admin at `/keystatic`, config in `keystatic.config.ts`) and stored as `.mdoc` files under `content/blog/`. See [`content/blog/AGENTS.md`](content/blog/AGENTS.md) for the authoring guide.

## Environment Variables

Create a `.env.local` file to override any variable locally. All of the following are build-time only:

| Variable | Description |
|---|---|
| `EMAILJS_PUBLIC_KEY` | EmailJS public key (contact form) |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `GTM_ID` | Google Tag Manager container ID |
| `POSTHOG_PUBLIC_KEY` | Public PostHog browser-ingestion key |
| `POSTHOG_HOST` | PostHog browser-ingestion host |
| `PLAUSIBLE_DOMAIN` | Plausible Analytics domain |
| `RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key |
| `SITE_URL` | Public base URL (used for canonical tags and sitemaps) |
| `NOINDEX` | Set to `true` on non-production deploys to keep them out of search indexes |

## Deployment

Everything deploys to Netlify from a single workflow (`.github/workflows/deploy-netlify.yml`). The Netlify site, its public URL and every build-time value come from the GitHub environment the trigger selects, so the workflow never hardcodes a site:

| Trigger | Environment | Result |
|---|---|---|
| Push to `lts` | `production` | Production deploy at `vocdoni.io`. The only indexable deploy. |
| Push to `main` | `develop` | Production deploy of the dev site, shipped with `X-Robots-Tag: noindex`. |
| Pull request | `pull request` | Deploy preview at `deploy-preview-<n>--<site>.netlify.app`, also noindexed. |

Every environment defines the `NETLIFY_SITE_ID` secret, which decides *where* the deploy lands. Alongside it:

- `SITE_URL` - branch pushes only (`production`, `develop`). The public base URL the build bakes into canonical tags, `og:image` and the sitemap. PR previews compute their own, so the variable is unread there.
- `NETLIFY_SITE_NAME` - PR previews only. The site's Netlify *name* (the `dev-vocdoni-io` in `dev-vocdoni-io.netlify.app`), used purely as a string to spell that preview's base URL: `https://deploy-preview-<n>--<NETLIFY_SITE_NAME>.netlify.app`.

`NETLIFY_SITE_ID` and `NETLIFY_SITE_NAME` address the same site from opposite directions: the id decides which site receives the upload, the name only spells the hostname the build will advertise. Nothing cross-checks them, so pointing them at different sites still deploys successfully - the files just land on one site while every canonical tag, `og:image` and sitemap entry names another.
- `GTM_ID`, `PLAUSIBLE_DOMAIN`, `RECAPTCHA_SITE_KEY` - build-time values. Leaving the analytics pair unset cleanly disables those scripts, which is what you want outside production; `RECAPTCHA_SITE_KEY` should be set everywhere or the contact form returns `config_error` on submit.

`NETLIFY_AUTH_TOKEN` and the `EMAILJS_*` variables are repository-wide. A missing `SITE_URL` on a branch push, or `NETLIFY_SITE_NAME` on a PR, fails the job rather than baking a wrong canonical URL.

### Releasing

`main` is the development branch. A release is a merge of `main` into `lts`; the resulting push to `lts` is what triggers the production deploy. Everything merged into `main` since the last release ships together, so only merge work into `main` that you are willing to release next.

Under this flow `lts` carries no commits of its own, so the merge normally fast-forwards. Guardrails run on pull requests targeting `lts` as well as `main`.

## Redirects

All legacy URL redirects (301s) are defined in **`lib/legacyRedirects.ts`** (the single source of truth). `buildNetlifyRedirects` renders them into the `_redirects` file that `plugins/legacy-redirects.ts` emits into `dist/client` at build time (never committed).

To add, change, or remove a redirect, edit `lib/legacyRedirects.ts` only.

## Contributing

Please review our [development guidelines](https://developer.vocdoni.io/development-guidelines) and the [AGENTS.md](./AGENTS.md) contributor guide before opening a pull request.

## License [![License: GPL v3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This repository is licensed under the [GNU General Public License v3.0](./LICENSE).

Copyright © 2025 Vocdoni.
