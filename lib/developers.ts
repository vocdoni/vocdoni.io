// Shared constants and helpers for the developers / integrator section.
// Keeping the URLs in one place makes it easy to repoint the API Dashboard or
// the protocol/SDK links without touching components.

export const DEVELOPERS_BASE = '/developers'
export const DEVELOPERS_DOCS_BASE = '/developers/docs'

// Integrator login (API Dashboard). Sourced from the PLATFORM_URL build global
// (vite.config.ts), overridable via the PLATFORM_URL env var. This module is also
// pulled into the Vite *config* bundle (through the docs-markdown plugin's import
// graph), where that global is not injected - fall back to process.env / the
// literal there so config evaluation doesn't crash.
export const DEVELOPERS_DASHBOARD_URL =
  typeof PLATFORM_URL !== 'undefined' ? PLATFORM_URL : process.env.PLATFORM_URL || 'https://platform.vocdoni.io'

// The SaaS environments. Accounts, organizations and API keys exist in only one of them. Both
// dashboards are literal (not PLATFORM_URL) so a CTA override can't mislabel the production row.
export const DEVELOPERS_ENVIRONMENTS = {
  staging: { dashboardUrl: 'https://app-stg.vocdoni.io/integrators', apiBaseUrl: 'https://saas-api-stg.vocdoni.net' },
  production: { dashboardUrl: 'https://platform.vocdoni.io', apiBaseUrl: 'https://saas-api-lts.vocdoni.net' },
} as const

// The environment the docs examples call. Staging while the API is in alpha.
export const DEVELOPERS_EXAMPLES_ENVIRONMENT: keyof typeof DEVELOPERS_ENVIRONMENTS = 'staging'
export const DEVELOPERS_API_BASE_URL = DEVELOPERS_ENVIRONMENTS[DEVELOPERS_EXAMPLES_ENVIRONMENT].apiBaseUrl
export const DEVELOPERS_EXAMPLES_DASHBOARD_URL = DEVELOPERS_ENVIRONMENTS[DEVELOPERS_EXAMPLES_ENVIRONMENT].dashboardUrl

// External developer resources.
export const DEVELOPERS_SDK_URL = 'https://github.com/vocdoni/vocdoni-integrator-sdk'
// Agent-skills marketplace (Claude plugin). Skills are authored in their own repos
// (e.g. vocdoni/vocdoni-integrator-sdk) and aggregated here - the site links out to it rather
// than hosting copies.
export const DEVELOPERS_SKILLS_URL = 'https://github.com/vocdoni/skills'
export const DEVELOPERS_SDK_DOCS_URL = 'https://vocdoni.io/en/developers'
export const DEVELOPERS_GITHUB_URL = 'https://github.com/vocdoni'
export const DEVELOPERS_PROTOCOL_URL = 'https://davinci.vote'
export const DEVELOPERS_SWAGGER_URL = 'https://vocdoni.github.io/saas-backend/swagger.yaml'
export const DEVELOPERS_STATUS_URL = 'https://status.vocdoni.io'

// True when the given logical path (locale stripped) lives in the developers section.
// Used by the navbar to swap the primary CTA from "App" to "API Dashboard".
export const isDevelopersPath = (urlLogical?: string | null): boolean =>
  Boolean(urlLogical && (urlLogical === DEVELOPERS_BASE || urlLogical.startsWith(`${DEVELOPERS_BASE}/`)))
