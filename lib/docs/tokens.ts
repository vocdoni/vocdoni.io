// Build-time placeholder tokens shared by the markdown pipeline (lib/docs/markdown.ts)
// and the raw-markdown Vite plugin (plugins/docs-markdown.ts).
//
// This module is intentionally dependency-light and uses a relative import: the
// Vite plugin is bundled into the Vite config context (esbuild), where the `@`
// alias and `import.meta.glob` are not available. Keep it that way.

import {
  DEVELOPERS_DASHBOARD_URL,
  DEVELOPERS_DEFAULT_ENVIRONMENT,
  DEVELOPERS_ENVIRONMENTS,
  DEVELOPERS_GITHUB_URL,
  DEVELOPERS_PROTOCOL_URL,
  DEVELOPERS_SDK_DOCS_URL,
  DEVELOPERS_SDK_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
  type DevelopersEnvironment,
} from '../developers'

// `environment` drives the tokens that describe the API the examples call (API_BASE_URL, EXAMPLES_*).
// The baked docs use the default; the Stage docs version passes staging.
export function tokenMap(environment: DevelopersEnvironment = DEVELOPERS_DEFAULT_ENVIRONMENT): Record<string, string> {
  return {
    API_BASE_URL: DEVELOPERS_ENVIRONMENTS[environment].apiBaseUrl,
    SWAGGER_URL: DEVELOPERS_SWAGGER_URL,
    DASHBOARD_URL: DEVELOPERS_DASHBOARD_URL,
    SDK_URL: DEVELOPERS_SDK_URL,
    SDK_DOCS_URL: DEVELOPERS_SDK_DOCS_URL,
    GITHUB_URL: DEVELOPERS_GITHUB_URL,
    PROTOCOL_URL: DEVELOPERS_PROTOCOL_URL,
    STATUS_URL: DEVELOPERS_STATUS_URL,
    STAGING_DASHBOARD_URL: DEVELOPERS_ENVIRONMENTS.staging.dashboardUrl,
    STAGING_API_BASE_URL: DEVELOPERS_ENVIRONMENTS.staging.apiBaseUrl,
    PRODUCTION_DASHBOARD_URL: DEVELOPERS_ENVIRONMENTS.production.dashboardUrl,
    PRODUCTION_API_BASE_URL: DEVELOPERS_ENVIRONMENTS.production.apiBaseUrl,
    EXAMPLES_DASHBOARD_URL: DEVELOPERS_ENVIRONMENTS[environment].dashboardUrl,
    EXAMPLES_ENVIRONMENT: environment,
  }
}

// Replaces `{{TOKEN}}` everywhere in the source (including fenced code and link
// hrefs). Unknown tokens are left untouched so typos stay visible.
export function resolveTokens(source: string, map: Record<string, string> = tokenMap()): string {
  return source.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g, (whole, key: string) =>
    Object.prototype.hasOwnProperty.call(map, key) ? map[key] : whole
  )
}

// Removes a leading YAML frontmatter block. Used for the raw `.md` we serve to
// LLMs so they get clean content without the YAML header.
export function stripFrontmatter(source: string): string {
  return source.replace(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replace(/^\s+/, '')
}
