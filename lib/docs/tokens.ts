// Build-time placeholder tokens shared by the markdown pipeline (lib/docs/markdown.ts)
// and the raw-markdown Vite plugin (plugins/docs-markdown.ts).
//
// This module is intentionally dependency-light and uses a relative import: the
// Vite plugin is bundled into the Vite config context (esbuild), where the `@`
// alias and `import.meta.glob` are not available. Keep it that way.

import {
  DEVELOPERS_API_BASE_URL,
  DEVELOPERS_DASHBOARD_URL,
  DEVELOPERS_GITHUB_URL,
  DEVELOPERS_PROTOCOL_URL,
  DEVELOPERS_SDK_DOCS_URL,
  DEVELOPERS_SDK_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
} from '../developers'

export function tokenMap(): Record<string, string> {
  return {
    API_BASE_URL: DEVELOPERS_API_BASE_URL,
    SWAGGER_URL: DEVELOPERS_SWAGGER_URL,
    DASHBOARD_URL: DEVELOPERS_DASHBOARD_URL,
    SDK_URL: DEVELOPERS_SDK_URL,
    SDK_DOCS_URL: DEVELOPERS_SDK_DOCS_URL,
    GITHUB_URL: DEVELOPERS_GITHUB_URL,
    PROTOCOL_URL: DEVELOPERS_PROTOCOL_URL,
    STATUS_URL: DEVELOPERS_STATUS_URL,
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
