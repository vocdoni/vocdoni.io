type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  gtag?: (...args: unknown[]) => void
}

export type AppCtaClick = {
  ctaId: string
  destinationUrl: string
}

export function trackAppCtaClick({ ctaId, destinationUrl }: AppCtaClick): void {
  if (typeof window === 'undefined') return

  const analyticsWindow = window as AnalyticsWindow
  const destination = new URL(destinationUrl, window.location.href)
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
