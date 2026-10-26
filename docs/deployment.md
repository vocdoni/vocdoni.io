# Deployment, headers and documentation versions

The operational detail behind the rules in [`AGENTS.md`](../AGENTS.md#deployment-and-release). The environment, secret
and variable list, and the release flow, are in the [README](../README.md#deployment).

## Redirects

Redirect rules are emitted as a `_redirects` file inside `dist/client` at build time by `plugins/legacy-redirects.ts`
(never committed), from the single source of truth in `lib/legacyRedirects.ts`. To add, change or remove a redirect,
edit that file only. A renamed route goes in `RENAMED_ROUTES` as one unprefixed `old -> new` entry (`'/solutions/old': '/solutions/new'`):
`buildRedirects` expands it to the unprefixed path and every served locale, so never add locale-prefixed entries. Update
every internal link too so navigation does not take a 301 hop.

## Security headers and the CSP

Security headers (an enforced Content-Security-Policy, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`) are emitted into `_headers` by
`buildNetlifyHeaders` in `plugins/well-known.ts`. The CSP is an allowlist where every origin is traced to the
integration that loads it, so any new third-party origin (a script, an iframe embed, a hotlinked image host, an API
endpoint, or a tag added through the GTM container) must be added to `buildContentSecurityPolicy` first, or the browser
silently blocks it (console CSP violation, no page error).

Two deliberate omissions, explained in that file: HSTS stays at Netlify's default because `includeSubDomains` /
`preload` would bind every `*.vocdoni.io` subdomain (an infra-wide decision), and COEP would break the YouTube and
Cal.com iframes. The dev server never applies `_headers`, so verify header changes on a Netlify deploy preview, not
locally.

## NOINDEX

`NOINDEX=true` makes the build emit `X-Robots-Tag: noindex, nofollow` in `_headers`, drop the `Sitemap:` line from
`robots.txt`, and add a `robots` meta tag. Never set it for a production build.

## Documentation versions

`/developers/docs` pages ship with the markdown baked in at build time, but the sidebar has a version selector
(`lib/docs/versions.ts`). Every version other than `production` names a branch of the public repo, and picking one makes
the browser fetch that branch's `content/developers/docs/**/*.md` from the GitHub tree API plus raw.githubusercontent.com
and compile it client-side (`lib/docs/remote.ts` → `lib/docs/remote-load.ts` → `hooks/useDocsData.ts`). Both origins
are in the CSP `connect-src`; a new one needs `buildContentSecurityPolicy` updated first.

- No deploy ever runs from `stage`. It is a content branch: writers merge markdown into it and reload any deploy
  (production, dev, a preview) with the stage version selected. The turnaround is a page reload plus the ~5 minute
  GitHub raw CDN/session cache, not a build.
- The selection lives in the URL as `?version=<id>` (for example `/developers/docs/quickstart?version=stage`), so a link
  to a specific version can be shared. Opening such a link selects and persists that version; picking one in the
  selector writes the param back to the address bar (and drops it for the default), and it survives client-side
  navigation. The resolution order is query param, then the `docs-version` localStorage entry, then the default
  (`hooks/useDocsVersion.ts`).
- Only the markdown comes from the branch. The compiler, the `{{TOKEN}}` values (`lib/docs/tokens.ts`), the nav taxonomy
  and every bit of UI come from the deployed build, so a stage page that uses a token or a `:::` directive added on the
  branch renders with this build's behaviour. Ship pipeline changes to `main` before relying on them in stage content.
- Stage-only pages are not navigable yet. A slug that exists on the branch but was never prerendered here has no route,
  so the sidebar renders it as an inert entry with a "new" badge and the pager skips it. Phase 2 is a Netlify rewrite
  that serves those URLs from the docs shell; until it lands, a new page is only readable once it reaches `main`.
- The markdown pipeline is lazy: `lib/docs/remote-load.ts` is the only client-reachable module importing
  `lib/docs/pipeline.ts`, and it is reached through a dynamic `import()`. Readers on the baked version never download
  it. Never import `@/lib/docs/markdown` or `@/lib/docs/nav` for values from client code: both hold an eager glob of
  every doc.

## Edge functions

Netlify edge functions live in `netlify/edge-functions/` and are declared to the CLI by `netlify.toml`. The workflow
uploads with `netlify deploy --no-build`, which bundles them; that is why the deploy runs through the Netlify CLI rather
than a deploy action. Keep edge functions as a thin shell over a pure, unit-tested module in `lib/`, and keep
`netlify.toml` free of redirect and header rules: those are generated into `dist/client` and toml rules would silently
take precedence.

### Crawler logging

`netlify/edge-functions/crawler-log.ts` reports each page fetch by a crawler or AI agent to PostHog as a `$http_log`
event, sent to `<POSTHOG_HOST>/i/v0/e/`. It runs only for `GET` requests of documents (extensionless paths and `.html`,
`.md`, `.txt`, `.xml`, `.json`) whose `netlify-agent-category` header starts with `ai-agent` or `crawler` (for example
`crawler;ai` or `ai-agent;user`; human browsers are categorised `browser` and never reach it), and it skips static
assets. It is enabled by setting `POSTHOG_KEY` and, optionally, `POSTHOG_HOST` (default `https://eu.i.posthog.com`) as
environment variables on the Netlify site with the Functions scope, on the production site only. The GitHub Actions
build variables do not reach edge functions, so setting them there does nothing for crawler logging. The function never
changes the response, and it reports no `status_code` by design: it runs before the response exists.
