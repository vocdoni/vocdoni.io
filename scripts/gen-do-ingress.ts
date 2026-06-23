/**
 * Prints the DigitalOcean App Platform `ingress.rules` redirect fragment for the legacy URL
 * redirects (issue #70), generated from the single source of truth in `lib/legacyRedirects.ts`.
 *
 * Usage: `pnpm gen:do-ingress`
 *
 * Paste the output ABOVE the existing `- component:` rule in the production app spec (DO matches
 * ingress rules in order and the component rule uses `prefix: /`, which matches everything). Only
 * the redirect rules are emitted - the spec's existing components, domains, and env vars stay in
 * DigitalOcean and are never committed to the repo.
 */
import { buildDigitalOceanIngressRules } from '../lib/legacyRedirects'

process.stdout.write(buildDigitalOceanIngressRules())
