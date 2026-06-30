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

| Command | Description |
|---|---|
| `pnpm build` | Production build (outputs to `dist/client`) |
| `pnpm preview` | Serve the production build locally |
| `pnpm test` | Run Vitest in CI mode |
| `pnpm lint` | Check formatting with Prettier |
| `pnpm validate` | Run all lint, test, and guardrail checks |
| `pnpm translations` | Extract i18n keys with i18next-cli |
| `pnpm shadcn add <component>` | Add a shadcn/ui component |

## Project Structure

```
pages/          Vike routes and page entry points (+Page.tsx, +config.ts, …)
components/     Shared UI building blocks (shadcn/ui lives under components/ui/)
layouts/        Page-level layout wrappers
hooks/          Reusable React hooks
lib/            Utility modules (including redirect rules)
locales/        i18n resources (en, es, ca + in-progress locales)
assets/         Static assets bundled by Vite
public/         Files copied as-is to the build output
tests/          Vitest unit tests
scripts/        Build-time and guardrail scripts
plugins/        Vite plugins (e.g. redirect file emitter)
.do/            DigitalOcean App Platform configuration
.github/        CI/CD workflows
```

## Environment Variables

Create a `.env.local` file to override any variable locally. All of the following are build-time only:

| Variable | Description |
|---|---|
| `EMAILJS_PUBLIC_KEY` | EmailJS public key (contact form) |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `GTM_ID` | Google Tag Manager container ID |
| `PLAUSIBLE_DOMAIN` | Plausible Analytics domain |
| `RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key |
| `SITE_URL` | Public base URL (used for canonical tags and sitemaps) |
| `GHOST_URL` | Ghost CMS API URL (blog content) |

## Deployment

The site uses two deployment targets, both triggered by GitHub Actions:

- **Netlify** — PR previews and every push to `main`. Used for quick iteration and review. Redirects are written as a `_redirects` file into `dist/client` at build time.
- **DigitalOcean App Platform** — production at `vocdoni.io`. Triggered only on push to `main`. The workflow runs `pnpm gen:do-appspec` to generate `.do/app.generated.yaml` (the DO app spec with redirect ingress rules injected), which is then passed to DigitalOcean's deploy action.

The split exists because Netlify and DigitalOcean handle redirects differently, and we need a single source of truth for the rules regardless of target.

## Redirects

All legacy URL redirects (301s) are defined in **`lib/legacyRedirects.ts`** — the single source of truth. Two emitters read from it at build/deploy time:

- `buildNetlifyRedirects` → `_redirects` file (emitted by `plugins/legacy-redirects.ts`, never committed)
- `buildDigitalOceanIngressRules` → ingress rules fragment injected into the DO app spec by `pnpm gen:do-appspec`

To add, change, or remove a redirect, edit `lib/legacyRedirects.ts` only.

## Contributing

Please review our [development guidelines](https://developer.vocdoni.io/development-guidelines) and the [AGENTS.md](./AGENTS.md) contributor guide before opening a pull request.

## License [![License: BSL 1.1](https://img.shields.io/badge/license-BSL%201.1-blue.svg)](https://mariadb.com/bsl11/)

This repository is licensed under the [Business Source License 1.1](./LICENSE).

Copyright © 2025 Vocdoni.
