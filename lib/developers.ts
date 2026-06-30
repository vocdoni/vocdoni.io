// Shared constants and helpers for the developers / integrator section.
// Keeping the URLs in one place makes it easy to repoint the API Dashboard or
// the protocol/SDK links without touching components.

export const DEVELOPERS_BASE = '/developers'
export const DEVELOPERS_DOCS_BASE = '/developers/docs'

// Integrator login (API Dashboard). Not live yet - safe to update here later.
export const DEVELOPERS_DASHBOARD_URL = 'https://platform.vocdoni.io'

// SaaS API base URL surfaced in the docs/examples. Points at staging while the
// API is in alpha; switch to https://saas-api-prod.vocdoni.net for production.
export const DEVELOPERS_API_BASE_URL = 'https://saas-api-stg.vocdoni.net'

// External developer resources.
export const DEVELOPERS_SDK_URL = 'https://github.com/vocdoni/integrator-sdk'
export const DEVELOPERS_SDK_DOCS_URL = 'https://vocdoni.io/developers'
export const DEVELOPERS_GITHUB_URL = 'https://github.com/vocdoni'
export const DEVELOPERS_PROTOCOL_URL = 'https://davinci.vote'
export const DEVELOPERS_SWAGGER_URL = 'https://vocdoni.github.io/saas-backend/swagger.yaml'
export const DEVELOPERS_STATUS_URL = 'https://status.vocdoni.io'

// True when the given logical path (locale stripped) lives in the developers section.
// Used by the navbar to swap the primary CTA from "App" to "API Dashboard".
export const isDevelopersPath = (urlLogical?: string | null): boolean =>
  Boolean(urlLogical && (urlLogical === DEVELOPERS_BASE || urlLogical.startsWith(`${DEVELOPERS_BASE}/`)))
