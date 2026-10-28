/**
 * Pure helpers behind the `crawler-log` Netlify edge function, which reports crawler and AI-agent
 * page fetches to PostHog as `$http_log` events (bots never run JavaScript, so the browser SDK never
 * sees them).
 *
 * This file has no imports at all on purpose: it runs in Deno at the edge and in Node under Vitest,
 * and `lib/analytics.ts` / `plugins/well-known.ts` import the constants and the URL scrubber from
 * here so the browser, the build and the edge share one definition.
 */

export const DEFAULT_POSTHOG_HOST = 'https://eu.i.posthog.com'

/** Query params that may carry PII; stripped from `$current_url` and `$referrer`. Same list the browser SDK uses. */
export const SENSITIVE_QUERY_PARAMS = ['email', 'token', 'code'] as const

// The marketing site does not create these params, but campaign links and inbound redirects do, and
// the scrubber matches the app's so both sites strip the same things.
export function sanitizeAnalyticsUrl(url: string): string {
  try {
    const parsed = new URL(url)
    let changed = false
    for (const param of SENSITIVE_QUERY_PARAMS) {
      if (parsed.searchParams.has(param)) {
        parsed.searchParams.delete(param)
        changed = true
      }
    }
    return changed ? parsed.toString() : url
  } catch {
    return url
  }
}

/** `<host>/i/v0/e/`, tolerating a trailing slash on the host. */
export function captureEndpoint(host: string): string {
  return `${host.replace(/\/+$/, '')}/i/v0/e/`
}

const DOCUMENT_EXTENSIONS = new Set(['html', 'md', 'txt', 'xml', 'json'])

/**
 * Documents only: extensionless paths, `.html`, `.md`, `.txt`, `.xml`, `.json`. Any other extension is an asset.
 * Vike's `*.pageContext.json` client-navigation payloads are not documents: the page itself is logged.
 */
export function isDocumentPath(pathname: string): boolean {
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1)
  if (lastSegment.endsWith('.pageContext.json')) return false
  const dot = lastSegment.lastIndexOf('.')
  if (dot === -1) return true
  return DOCUMENT_EXTENSIONS.has(lastSegment.slice(dot + 1).toLowerCase())
}

export interface HttpLogRequest {
  url: string
  userAgent: string | null
  ip: string | null
  referrer: string | null
  /** Raw `netlify-agent-category` value, e.g. `crawler;ai`. */
  agentCategory: string | null
  /** `x-nf-request-id`. */
  requestId: string | null
  method: string
}

/** `http_log_` + first 32 hex chars of SHA-256 over `${ip}:${host}:${userAgent}` (empty strings for nulls). */
export async function httpLogDistinctId(ip: string | null, host: string, userAgent: string | null): Promise<string> {
  const data = new TextEncoder().encode(`${ip ?? ''}:${host}:${userAgent ?? ''}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `http_log_${hex.slice(0, 32)}`
}

export interface HttpLogEvent {
  api_key: string
  event: '$http_log'
  distinct_id: string
  /** ISO 8601, from `now`. */
  timestamp: string
  properties: {
    $process_person_profile: false
    /** Sanitized. */
    $current_url: string
    $host: string
    $pathname: string
    /** Empty when the request has no user agent. */
    $raw_user_agent: string
    /** Only when the ip is known. */
    $ip?: string
    /** Sanitized, only when present and non-empty. */
    $referrer?: string
    method: string
    /** Joins the browser events' `site` super property. */
    site: 'web'
    $lib: 'netlify-edge'
    netlify_agent_category?: string
    netlify_request_id?: string
  }
}

export async function buildHttpLogEvent(
  request: HttpLogRequest,
  apiKey: string,
  now: Date = new Date()
): Promise<HttpLogEvent> {
  const parsed = new URL(request.url)
  const properties: HttpLogEvent['properties'] = {
    $process_person_profile: false,
    $current_url: sanitizeAnalyticsUrl(request.url),
    $host: parsed.host,
    $pathname: parsed.pathname,
    $raw_user_agent: request.userAgent ?? '',
    method: request.method,
    site: 'web',
    $lib: 'netlify-edge',
  }
  if (request.ip !== null) properties.$ip = request.ip
  if (request.referrer) properties.$referrer = sanitizeAnalyticsUrl(request.referrer)
  if (request.agentCategory) properties.netlify_agent_category = request.agentCategory
  if (request.requestId) properties.netlify_request_id = request.requestId

  return {
    api_key: apiKey,
    event: '$http_log',
    distinct_id: await httpLogDistinctId(request.ip, parsed.host, request.userAgent),
    timestamp: now.toISOString(),
    properties,
  }
}
