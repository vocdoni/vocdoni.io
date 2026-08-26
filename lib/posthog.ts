import { hasAcceptedCookies } from '@/lib/cookieConsent'

type PostHogProperties = Record<string, boolean | number | string>

let anonymousSessionId: string | null = null
let lastPageviewKey: string | null = null

function isProductionWebsite(): boolean {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'vocdoni.io' || window.location.hostname === 'www.vocdoni.io'
}

function getAnonymousSessionId(): string {
  if (anonymousSessionId) return anonymousSessionId

  anonymousSessionId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `vocdoni-web-${Date.now()}-${Math.random().toString(36).slice(2)}`

  return anonymousSessionId
}

function sendPostHogPayload(payload: string): boolean {
  const endpoint = `${POSTHOG_HOST.replace(/\/$/, '')}/i/v0/e/`
  const body = new Blob([payload], { type: 'application/json' })

  if (typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(endpoint, body)) return true

  void fetch(endpoint, {
    method: 'POST',
    body,
    keepalive: true,
  }).catch(() => undefined)

  return true
}

export function capturePostHogEvent(event: '$pageview' | 'app_cta_click', properties: PostHogProperties): boolean {
  if (!POSTHOG_PUBLIC_KEY || !POSTHOG_HOST || !isProductionWebsite() || !hasAcceptedCookies()) return false

  return sendPostHogPayload(
    JSON.stringify({
      api_key: POSTHOG_PUBLIC_KEY,
      event,
      properties: {
        ...properties,
        distinct_id: getAnonymousSessionId(),
        $process_person_profile: false,
        measurement_source: 'vocdoni.io',
      },
    })
  )
}

export function capturePostHogPageview(): boolean {
  if (typeof window === 'undefined') return false

  const pageviewKey = `${window.location.origin}${window.location.pathname}`
  if (pageviewKey === lastPageviewKey) return false

  const captured = capturePostHogEvent('$pageview', {
    $current_url: pageviewKey,
    $host: window.location.host,
    $pathname: window.location.pathname,
    title: document.title,
  })

  if (captured) lastPageviewKey = pageviewKey
  return captured
}
