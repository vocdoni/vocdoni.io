// Shared constants and helpers for the developers / integrator section.
// Keeping the URLs in one place makes it easy to repoint the API Dashboard or
// the protocol/SDK links without touching components.

export const DEVELOPERS_BASE = '/developers'
export const DEVELOPERS_DOCS_BASE = '/developers/docs'

// Integrator login (API Dashboard). Not live yet - safe to update here later.
export const DEVELOPERS_DASHBOARD_URL = 'https://developer.vocdoni.io/login'

// Production SaaS API base URL surfaced in the reference. Confirm before launch.
export const DEVELOPERS_API_BASE_URL = 'https://api-saas.vocdoni.io'

// External developer resources.
export const DEVELOPERS_SDK_URL = 'https://developer.vocdoni.io/sdk'
export const DEVELOPERS_SDK_DOCS_URL = 'https://developer.vocdoni.io'
export const DEVELOPERS_GITHUB_URL = 'https://github.com/vocdoni'
export const DEVELOPERS_PROTOCOL_URL = 'https://davinci.vote'
export const DEVELOPERS_SWAGGER_URL = 'https://vocdoni.github.io/saas-backend/swagger.yaml'
export const DEVELOPERS_STATUS_URL = 'https://status.vocdoni.io'

// True when the given logical path (locale stripped) lives in the developers section.
// Used by the navbar to swap the primary CTA from "App" to "API Dashboard".
export const isDevelopersPath = (urlLogical?: string | null): boolean =>
  Boolean(urlLogical && (urlLogical === DEVELOPERS_BASE || urlLogical.startsWith(`${DEVELOPERS_BASE}/`)))
