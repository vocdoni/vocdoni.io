/**
 * Shared URL-form utilities.
 *
 * No `@` alias imports: this module is also loaded by vite.config.ts-time plugin
 * code where esbuild does not resolve tsconfig path aliases (same constraint as
 * `lib/legacyRedirects.ts` and `lib/llms/routes.ts`).
 */

/**
 * Appends a trailing slash to a page path so the emitted URL matches the
 * trailing-slash form Netlify serves with 200 (the static file lives at
 * `en/pricing/index.html`, so `/en/pricing/` is the canonical form).
 *
 * Rules:
 * - External URLs (`http://` / `https://`) are returned unchanged.
 * - `/` is returned unchanged (already the canonical root form).
 * - Paths whose last segment ends in a file extension (1–8 alphanumeric chars
 *   after a dot: `.xml`, `.md`, `.webp`, ...) are returned unchanged. A slug
 *   that merely contains a dot (e.g. `app-2.3-release`) is not affected.
 * - `?query` and `#hash` are preserved after the slash, never before it.
 * - Already-slashed paths are returned unchanged (idempotent).
 */
export function withTrailingSlash(path: string): string {
  if (!path) return path
  // External URLs: leave unchanged.
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  // Find where the path ends (before ? or #).
  const sepIdx = path.search(/[?#]/)
  const base = sepIdx === -1 ? path : path.slice(0, sepIdx)
  const rest = sepIdx === -1 ? '' : path.slice(sepIdx)

  // Root stays as-is.
  if (base === '/') return path

  // Already has trailing slash.
  if (base.endsWith('/')) return path

  // Don't add a slash when the last segment ends in a file extension (.md, .xml, .webp, ...).
  const lastSegment = base.split('/').filter(Boolean).pop() ?? ''
  if (/\.[a-zA-Z0-9]{1,8}$/.test(lastSegment)) return path

  return base + '/' + rest
}
