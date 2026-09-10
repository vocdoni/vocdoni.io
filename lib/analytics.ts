import type { CaptureResult } from 'posthog-js'

/**
 * `vocdoni.io` and `app.vocdoni.io` report into a single PostHog project: the
 * free plan allows exactly one, and PostHog cannot query across projects, so
 * one project with two sources is the only shape in which a funnel can start on
 * a landing page and end at a paid subscription.
 *
 * The two halves join through a single `distinct_id` surviving the hop between
 * subdomains. posthog-js writes its persistence cookie on `.vocdoni.io` (the
 * `cross_subdomain_cookie` default, which it disables by itself on netlify.app
 * previews), the cookie name derives from the project token, and both sites
 * ship the same token - so both read and write the same cookie. That only holds
 * while both run with cookie persistence, which is why the consent choice is
 * itself a shared cookie (`lib/cookieConsent.ts`).
 *
 * The taxonomy below is snake_case and is consumed by the "Vocdoni - Web -> app"
 * dashboard defined in `scripts/posthog-insights.mjs` in the vocdoni-app repo.
 * Renaming an event or a property here breaks a funnel there.
 */

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
 * GA4/GTM half of a CTA click, unchanged. PostHog is no longer written from
 * here: posthog-js owns that side now and reports the richer `cta_clicked`,
 * which is what the cross-site funnels are built on.
 */
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

  const measurementId = getLoadedGa4MeasurementId(analyticsWindow)
  if (measurementId) {
    queueGtagCommand(analyticsWindow, ['config', measurementId, { send_page_view: false }])
    queueGtagCommand(analyticsWindow, ['event', 'app_cta_click', { ...properties, send_to: measurementId }])
    return
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
  analyticsWindow.dataLayer.push({ event: 'app_cta_click', ...properties })
}

export const AnalyticsEvents = {
  CtaClicked: 'cta_clicked',
  SolutionPageViewed: 'solution_page_viewed',
  BlogPostViewed: 'blog_post_viewed',
  LearnArticleViewed: 'learn_article_viewed',
  DocsPageViewed: 'docs_page_viewed',
  DemoRequested: 'demo_requested',
  DemoBooked: 'demo_booked',
} as const

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]

export interface AnalyticsEvent {
  name: AnalyticsEventName
  props?: Record<string, string | number | boolean>
}

/**
 * What kind of page a path is, derived from the route rather than declared page
 * by page: routes are structured, so a new solution or article is classified
 * correctly the day it is added, with nothing to remember.
 *
 * `path` is Vike's `urlLogical`, which already has the locale prefix stripped.
 */
export type PageType =
  | 'home'
  | 'solution'
  | 'solutions_index'
  | 'use_cases'
  | 'case_study'
  | 'case_studies_index'
  | 'blog_post'
  | 'blog_category'
  | 'blog_index'
  | 'learn_article'
  | 'learn_index'
  | 'docs_page'
  | 'docs_index'
  | 'developers'
  | 'contact'
  | 'app'
  | 'about'
  | 'legal'
  | 'other'

export type PageInfo = {
  pageType: PageType
  /** The vertical a solution page speaks to, e.g. `associations`. */
  vertical?: string
  /** The article, post or docs page identifier. */
  slug?: string
}

export function classifyPath(path: string): PageInfo {
  const segments = (path || '/').split('?')[0].split('#')[0].split('/').filter(Boolean)

  if (segments.length === 0) return { pageType: 'home' }

  const [first, second, third] = segments

  switch (first) {
    case 'solutions':
      return second ? { pageType: 'solution', vertical: second } : { pageType: 'solutions_index' }
    case 'use-cases':
      return { pageType: 'use_cases' }
    case 'case-studies':
      return second ? { pageType: 'case_study', slug: second } : { pageType: 'case_studies_index' }
    case 'blog':
      if (!second) return { pageType: 'blog_index' }
      if (second === 'category') return third ? { pageType: 'blog_category', slug: third } : { pageType: 'blog_index' }
      return { pageType: 'blog_post', slug: second }
    case 'learn':
      return second ? { pageType: 'learn_article', slug: second } : { pageType: 'learn_index' }
    case 'developers':
      if (second !== 'docs') return { pageType: 'developers' }
      return third ? { pageType: 'docs_page', slug: third } : { pageType: 'docs_index' }
    case 'contact':
      return { pageType: 'contact' }
    case 'app':
      return { pageType: 'app' }
    case 'about-us':
      return { pageType: 'about' }
    case 'privacy':
    case 'terms':
      return { pageType: 'legal' }
    default:
      return { pageType: 'other' }
  }
}

/**
 * The content event a page reports on arrival, if any. Only the page kinds that
 * open a funnel in the Web -> app dashboard get one; everything else is already
 * covered by `$pageview`, which carries the path.
 */
export function pageViewEvent(info: PageInfo): AnalyticsEvent | null {
  switch (info.pageType) {
    case 'solution':
      return { name: AnalyticsEvents.SolutionPageViewed, props: { vertical: info.vertical ?? '' } }
    case 'blog_post':
      return { name: AnalyticsEvents.BlogPostViewed, props: { slug: info.slug ?? '' } }
    case 'learn_article':
      return { name: AnalyticsEvents.LearnArticleViewed, props: { slug: info.slug ?? '' } }
    case 'docs_page':
      return { name: AnalyticsEvents.DocsPageViewed, props: { slug: info.slug ?? '' } }
    default:
      return null
  }
}

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

type PosthogInitConfig = {
  key: string
  host?: string
  consent: PosthogConsent
  locale?: string
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
 *
 * `cross_subdomain_cookie` is deliberately left at its default rather than
 * pinned to `true`: the default is already `true` for vocdoni.io, and posthog-js
 * turns it off by itself on netlify.app, which is exactly what deploy previews
 * need so they never join production identities.
 */
export const initializePosthog = ({ key, host, consent, locale }: PosthogInitConfig): void => {
  if (posthogInitStarted) return
  if (!canUseBrowserAnalytics()) return
  if (!key || consent === 'rejected') return

  posthogInitStarted = true

  void loadPosthogModule()
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        // SPA navigations are captured through the History API, which Vike's
        // client-side router drives.
        defaults: '2026-06-25',
        person_profiles: 'identified_only',
        // Cookieless until the user accepts the cookie banner
        persistence: consent === 'accepted' ? 'localStorage+cookie' : 'memory',
        // Off on purpose: on a nav-heavy marketing site autocapture is several
        // events per pageview, which is how the 1M/month free tier gets spent.
        // Intent is captured explicitly instead, via the events above.
        autocapture: false,
        // Replay and error quotas belong to the app, where they diagnose
        // something a static marketing page cannot.
        disable_session_recording: true,
        capture_exceptions: false,
        // Keeps the CSP tight: without this posthog-js may inject a <script>
        // from the ingestion host for replay, surveys or site apps, none of
        // which this site uses, and `script-src` would have to allow it. Event
        // ingestion is a plain request, already covered by `connect-src`.
        disable_external_dependency_loading: true,
        before_send: posthogBeforeSend,
      })
      // `site` separates this site's events from the app's in the shared
      // project, and is what the "Event volume by site" trend breaks down.
      // Registered here, not in a React effect, so it lands on every init path
      // including a retry after a failed chunk load, which no effect re-runs for.
      posthog.register({ site: 'web', ...(locale ? { locale } : {}) })
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
 *
 * GA4 keeps receiving `app_cta_click` alongside, unchanged.
 */
export const trackCtaClick = (location: string, href: string, path: string): void => {
  // Page context is read at click time rather than registered as a super
  // property: PostHog captures `$pageview` from its own history listener, which
  // fires before React re-renders, so a per-page super property would lag a
  // navigation behind and attribute a click to the previous page.
  const { pageType, vertical } = classifyPath(path)

  trackAnalyticsEvent({
    name: AnalyticsEvents.CtaClicked,
    props: {
      location,
      target: resolveCtaTarget(href, { appUrl: APP_URL, platformUrl: PLATFORM_URL }),
      page_type: pageType,
      ...(vertical ? { vertical } : {}),
    },
  })

  trackAppCtaClick({ ctaId: location, destinationUrl: href })
}
