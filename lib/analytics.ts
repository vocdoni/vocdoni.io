import type { CaptureResult } from 'posthog-js'

/**
 * PostHog for the marketing site. This site and `app.vocdoni.io` report into a
 * single PostHog project (the free plan allows exactly one, and PostHog cannot
 * query across projects), so a funnel can start on a landing page and end at a
 * paid subscription.
 *
 * The taxonomy is snake_case, matching `vocdoni-app/src/utils/analytics.ts`.
 */
export const AnalyticsEvents = {
  CtaClicked: 'cta_clicked',
} as const

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]

export interface AnalyticsEvent {
  name: AnalyticsEventName
  props?: Record<string, string | number | boolean>
}

export const DEFAULT_POSTHOG_HOST = 'https://eu.i.posthog.com'

/** Where a CTA points, so funnels can select the ones that lead into a product. */
export type CtaTarget = 'app' | 'platform' | 'contact' | 'external' | 'internal'

export type ProductUrls = { appUrl: string; platformUrl: string }

export function resolveCtaTarget(href: string, urls: ProductUrls): CtaTarget {
  if (!href) return 'internal'
  if (urls.appUrl && href.startsWith(urls.appUrl)) return 'app'
  if (urls.platformUrl && href.startsWith(urls.platformUrl)) return 'platform'
  if (/^[a-z]+:/i.test(href)) return 'external'
  if (href.replace(/^\/+/, '').startsWith('contact')) return 'contact'
  return 'internal'
}

// Query params that may carry PII. The marketing site does not create them, but
// campaign links and inbound redirects do, and the scrubber matches the app's so
// both sites strip the same things.
const SENSITIVE_QUERY_PARAMS = ['email', 'token', 'code']

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

export const posthogBeforeSend = (event: CaptureResult | null): CaptureResult | null => {
  if (!event) return null

  for (const key of ['$current_url', '$referrer'] as const) {
    const value = event.properties?.[key]
    if (typeof value === 'string') {
      event.properties[key] = sanitizeAnalyticsUrl(value)
    }
  }

  return event
}

export type PosthogConsent = 'accepted' | 'rejected' | null

/**
 * The consent choice lives in a user-editable cookie, so it may hold anything.
 * Anything that is not an explicit choice is treated as "no decision yet"
 * (cookieless, anonymous) rather than being trusted as one.
 */
export const toPosthogConsent = (value: string | null | undefined): PosthogConsent =>
  value === 'accepted' || value === 'rejected' ? value : null

type PosthogInitConfig = {
  key: string
  host?: string
  consent: PosthogConsent
}

// Set synchronously when an init is accepted so concurrent callers (init,
// consent changes, super properties) can rely on the shared module promise
// ordering.
let posthogInitStarted = false
let posthogModulePromise: Promise<typeof import('posthog-js')> | null = null

const canUseBrowserAnalytics = () => typeof window !== 'undefined'

const loadPosthogModule = () => {
  // A rejected promise must not stay cached: a transient chunk-load failure
  // would otherwise keep PostHog dead for the rest of the session, since every
  // later caller would await the same rejection.
  posthogModulePromise ??= import('posthog-js').catch((error) => {
    posthogModulePromise = null
    throw error
  })
  return posthogModulePromise
}

/**
 * Note what this site deliberately never calls:
 *
 * - `identify()` - the marketing site has no accounts. Identifying here would
 *   fracture the merge `app.vocdoni.io` performs on signup.
 * - `reset()` - it would discard the anonymous id and, with it, the first-touch
 *   campaign attribution that makes marketing-sourced revenue measurable.
 */
export const initializePosthog = ({ key, host, consent }: PosthogInitConfig): void => {
  if (posthogInitStarted) return
  if (!canUseBrowserAnalytics()) return
  if (!key || consent === 'rejected') return

  posthogInitStarted = true

  void loadPosthogModule()
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host || DEFAULT_POSTHOG_HOST,
        // SPA navigations are captured through the History API, which Vike's
        // client-side router drives.
        defaults: '2026-06-25',
        person_profiles: 'identified_only',
        // Cookieless until the user accepts the cookie banner
        persistence: consent === 'accepted' ? 'localStorage+cookie' : 'memory',
        // Already the default for `vocdoni.io`, pinned because the shared
        // `distinct_id` across app.vocdoni.io depends on it.
        cross_subdomain_cookie: true,
        // Off on purpose: on a nav-heavy marketing site autocapture is several
        // events per pageview, which is how the 1M/month free tier gets spent.
        // Intent is captured explicitly instead, via the events above.
        autocapture: false,
        // Replay and error quotas belong to the app, where they diagnose
        // something a static marketing page cannot.
        disable_session_recording: true,
        capture_exceptions: false,
        before_send: posthogBeforeSend,
      })
    })
    .catch((error) => {
      // Release the guard so a later attempt (consent change, remount) can
      // retry instead of leaving analytics permanently disabled.
      posthogInitStarted = false
      console.error('Failed to initialize PostHog:', error)
    })
}

export const applyPosthogConsent = (consent: PosthogConsent): void => {
  if (!posthogInitStarted) return
  if (!canUseBrowserAnalytics()) return

  void loadPosthogModule()
    .then(({ default: posthog }) => {
      if (consent === 'accepted') {
        posthog.set_config({ persistence: 'localStorage+cookie' })
        if (posthog.has_opted_out_capturing()) {
          posthog.opt_in_capturing()
        }
      } else if (consent === 'rejected') {
        posthog.opt_out_capturing()
        posthog.set_config({ persistence: 'memory' })
      }
    })
    .catch((error) => {
      console.error('Failed to apply PostHog consent:', error)
    })
}

export const registerPosthogSuperProperties = (props: Record<string, unknown>): void => {
  if (!posthogInitStarted) return
  if (!canUseBrowserAnalytics()) return

  void loadPosthogModule()
    .then(({ default: posthog }) => {
      posthog.register(props)
    })
    .catch((error) => {
      console.error('Failed to register PostHog super properties:', error)
    })
}

export const trackAnalyticsEvent = (event: AnalyticsEvent): void => {
  if (!posthogInitStarted) return
  if (!canUseBrowserAnalytics()) return

  void loadPosthogModule()
    .then(({ default: posthog }) => {
      posthog.capture(event.name, event.props)
    })
    .catch((error) => {
      console.error('Failed to track PostHog event:', error)
    })
}

/**
 * The last thing that happens on this site before a visitor becomes the app's
 * problem, and therefore the join between the two halves of every cross-site
 * funnel. `location` names where the CTA sits, `target` where it leads.
 */
export const trackCtaClick = (location: string, href: string): void => {
  trackAnalyticsEvent({
    name: AnalyticsEvents.CtaClicked,
    props: {
      location,
      target: resolveCtaTarget(href, { appUrl: APP_URL, platformUrl: PLATFORM_URL }),
    },
  })
}
