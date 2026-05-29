// Relative import (not the `@` alias): this module is also loaded by `vite.config.ts` at config-load
// time, where Vite's esbuild bundler does not resolve tsconfig path aliases.
import { localeDefault, locales } from '../locales'

/**
 * Single source of truth for legacy URL redirects (issue #70).
 *
 * Old URLs from the previous (multilingual) website now 404. We recover them with real HTTP 301s,
 * never JavaScript or <meta refresh> (bad for SEO). Because the site is statically prerendered, the
 * 301 must be issued by the host/edge: this module feeds two emitters from one list:
 *   - `buildNetlifyRedirects`  -> `public`/`_redirects` for the Netlify dev + PR-preview deploys
 *   - `buildDigitalOceanIngressRules` -> `ingress.rules` fragment for the DigitalOcean production app
 *
 * `to` is always a final, locale-prefixed URL (e.g. `/en/app`) so the redirect lands in a single hop
 * and never chains through the bare-URL locale canonicalization (`/app` -> `<meta refresh>` -> `/en/app`).
 */

export type LegacyRedirect = { from: string; to: string }

/**
 * Languages the previous website served, so any of these can appear as a `/<lang>/...` legacy URL.
 * (Newer locales like `fr`/`eu` never existed on the old site, so they have no legacy URLs.)
 */
const OLD_SITE_LANGS = ['ca', 'de', 'el', 'en', 'es', 'it', 'pt'] as const

/**
 * A legacy `/<lang>/<path>` redirect keeps its language when that language is still active, otherwise
 * it falls back to the default locale. Derived from locales/index.ts, so enabling or disabling a
 * language updates the redirects automatically (and never targets a route that no longer exists).
 */
const targetLang = (lang: string) => ((locales as readonly string[]).includes(lang) ? lang : localeDefault)

/**
 * Renamed legacy marketing paths and their CURRENT logical destination (unprefixed).
 * Everything collapses to the landing page except `/product`, which maps to `/app`.
 */
const LEGACY_PATHS: Record<string, string> = {
  product: '/app',
  advantages: '/',
  services: '/',
  testimonials: '/',
  explore: '/',
  impact: '/',
  home: '/',
}

/** Turn a logical destination (`/app` | `/`) into a locale-prefixed final URL. */
const localize = (logical: string, lang: string) => (logical === '/' ? `/${lang}` : `/${lang}${logical}`)

function buildRedirects(): LegacyRedirect[] {
  const redirects: LegacyRedirect[] = []

  for (const [path, logical] of Object.entries(LEGACY_PATHS)) {
    // Unprefixed legacy URL (old site had no usable language signal) -> default locale.
    redirects.push({ from: `/${path}`, to: localize(logical, localeDefault) })
    // Each language the old site served: keep it if still active, otherwise collapse to the default.
    for (const lang of OLD_SITE_LANGS)
      redirects.push({ from: `/${lang}/${path}`, to: localize(logical, targetLang(lang)) })
  }

  // One-offs observed in Google Search Console. Internal-only: never redirect to an external site.
  redirects.push(
    { from: '/api', to: `/${localeDefault}` }, // API base used to live here; send users home to re-find it
    { from: '/politica-priv-14fruites', to: `/${localeDefault}/privacy` } // old client-specific privacy page
  )

  return redirects
}

export const LEGACY_REDIRECTS: LegacyRedirect[] = buildRedirects()

/** Most-specific first, so a longer path can never be shadowed by a shorter prefix match. */
const bySpecificity = (a: LegacyRedirect, b: LegacyRedirect) =>
  b.from.length - a.from.length || a.from.localeCompare(b.from)

/** Render the Netlify `_redirects` file body (real 301s, read by Netlify and Cloudflare Pages). */
export function buildNetlifyRedirects(redirects: LegacyRedirect[] = LEGACY_REDIRECTS): string {
  const header = '# Legacy URL redirects (issue #70) - generated from lib/legacyRedirects.ts. Do not edit by hand.\n\n'
  const lines = [...redirects].sort(bySpecificity).map(({ from, to }) => `${from}  ${to}  301`)
  return `${header}${lines.join('\n')}\n`
}

/**
 * DigitalOcean App Platform `ingress.rules` items (real 301s), indented to sit under `rules:`.
 * DO matches rules in order and uses prefix matching, so e.g. `/product` also covers `/product/`
 * and `/products` (harmless here). Rules are most-specific first; the caller keeps the catch-all
 * `- component:` rule (`prefix: /`) AFTER these.
 */
function ingressRulesYaml(redirects: LegacyRedirect[]): string {
  return [...redirects]
    .sort(bySpecificity)
    .map(({ from, to }) =>
      [
        '  - match:',
        '      path:',
        `        prefix: ${from}`,
        '    redirect:',
        `      uri: ${to}`,
        '      redirect_code: 301',
      ].join('\n')
    )
    .join('\n')
}

/**
 * Render the DigitalOcean ingress redirect fragment for MANUAL pasting into the app spec, above the
 * existing `- component:` rule. For the automated GitHub Actions deploy, use `injectIngressRules`.
 */
export function buildDigitalOceanIngressRules(redirects: LegacyRedirect[] = LEGACY_REDIRECTS): string {
  const header = [
    '# Legacy URL redirects (issue #70) - generated from lib/legacyRedirects.ts via `pnpm gen:do-ingress`.',
    '# Paste these ingress rules ABOVE the existing `- component:` rule in the DigitalOcean app spec.',
    '',
  ].join('\n')
  return `${header}\n${ingressRulesYaml(redirects)}\n`
}

/** Marker line in `.do/app.template.yaml`, replaced with the generated ingress rules at deploy time. */
export const LEGACY_REDIRECT_RULES_MARKER = '# __LEGACY_REDIRECT_RULES__'

/**
 * Inject the generated ingress redirect rules into a DigitalOcean app-spec template, replacing the
 * {@link LEGACY_REDIRECT_RULES_MARKER} line. Used by `pnpm gen:do-appspec` in the deploy workflow so
 * the spec's redirect rules always come from this single source of truth.
 */
export function injectIngressRules(template: string, redirects: LegacyRedirect[] = LEGACY_REDIRECTS): string {
  const marker = new RegExp(`^[ \\t]*${LEGACY_REDIRECT_RULES_MARKER}.*$`, 'm')
  if (!marker.test(template)) {
    throw new Error(`app spec template is missing the "${LEGACY_REDIRECT_RULES_MARKER}" marker`)
  }
  return template.replace(marker, ingressRulesYaml(redirects))
}
