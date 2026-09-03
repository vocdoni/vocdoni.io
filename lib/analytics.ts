import { capturePostHogEvent } from '@/lib/posthog'

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown> | IArguments>
  gtag?: (...args: unknown[]) => void
  google_tag_manager?: Record<string, unknown>
}

export type AppCtaClick = {
  ctaId: string
  destinationUrl: string
}

const GA4_MEASUREMENT_ID = /^G-[A-Z0-9]+$/

function getLoadedGa4MeasurementId(analyticsWindow: AnalyticsWindow): string | null {
  return Object.keys(analyticsWindow.google_tag_manager || {}).find((id) => GA4_MEASUREMENT_ID.test(id)) || null
}

/**
 * Queues the same `arguments` object produced by the standard gtag helper.
 * Plain arrays are not processed as gtag commands by the live GTM container.
 */
function queueGtagCommand(analyticsWindow: AnalyticsWindow, command: unknown[]): void {
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || []

  function enqueue(..._command: unknown[]): void {
    analyticsWindow.dataLayer?.push(arguments)
  }

  enqueue.apply(undefined, command)
}

/**
 * Resolves a CTA destination, dropping anything that is not a well-formed
 * http(s) URL. Schemes like `mailto:` or `tel:` carry the address in the
 * pathname, which would leak user-entered content into the event payload.
 */
function resolveHttpDestination(destinationUrl: string): URL | null {
  try {
    const destination = new URL(destinationUrl, window.location.href)
    if (destination.protocol !== 'http:' && destination.protocol !== 'https:') return null
    return destination
  } catch {
    return null
  }
}

/**
 * The vertical tag we hand the app on a signup link. It is the only query
 * parameter carried into the event: the rest of the query string is dropped on
 * purpose, since a destination can contain user-entered content, but this value
 * is one we set ourselves in the href.
 *
 * It matters because it is the join key. A click recorded here and a signup
 * recorded in the app are two events in two properties on two hosts; `type` is
 * what says they are the same funnel.
 */
function readSignupType(destination: URL): string | null {
  const type = destination.searchParams.get('type')
  if (!type || type.length > 64 || !/^[a-z0-9-]+$/.test(type)) return null
  return type
}

export function trackAppCtaClick({ ctaId, destinationUrl }: AppCtaClick): void {
  if (typeof window === 'undefined') return

  const destination = resolveHttpDestination(destinationUrl)
  if (!destination) return

  const signupType = readSignupType(destination)
  const analyticsWindow = window as AnalyticsWindow
  const properties = {
    cta_id: ctaId,
    source_path: window.location.pathname,
    destination_host: destination.hostname,
    destination_path: destination.pathname,
    ...(signupType ? { signup_type: signupType } : {}),
  }

  capturePostHogEvent('app_cta_click', properties)

  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', 'app_cta_click', properties)
    return
  }

  const measurementId = getLoadedGa4MeasurementId(analyticsWindow)
  if (measurementId) {
    queueGtagCommand(analyticsWindow, ['config', measurementId, { send_page_view: false }])
    queueGtagCommand(analyticsWindow, ['event', 'app_cta_click', { ...properties, send_to: measurementId }])
    return
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
  analyticsWindow.dataLayer.push({ event: 'app_cta_click', ...properties })
}
