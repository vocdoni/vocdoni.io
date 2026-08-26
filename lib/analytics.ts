type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (...args: unknown[]) => void
}

export type AppCtaClick = {
  ctaId: string
  destinationUrl: string
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

export function trackAppCtaClick({ ctaId, destinationUrl }: AppCtaClick): void {
  if (typeof window === 'undefined') return

  const destination = resolveHttpDestination(destinationUrl)
  if (!destination) return

  const analyticsWindow = window as AnalyticsWindow
  const properties = {
    cta_id: ctaId,
    source_path: window.location.pathname,
    destination_host: destination.hostname,
    destination_path: destination.pathname,
  }

  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', 'app_cta_click', properties)
    return
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
  analyticsWindow.dataLayer.push({ event: 'app_cta_click', ...properties })
}
