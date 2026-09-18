import { useEffect, useRef } from 'react'

import {
  classifyPath,
  initializePosthog,
  applyPosthogConsent,
  pageViewEvent,
  registerPosthogSuperProperties,
  trackAnalyticsEvent,
  type PosthogConsent,
} from '@/lib/analytics'
import { getCookieConsent, COOKIE_CONSENT_CHANGE_EVENT, watchCrossSiteConsent } from '@/lib/cookieConsent'

const posthogKey = typeof POSTHOG_KEY !== 'undefined' ? POSTHOG_KEY : ''
const posthogHost = typeof POSTHOG_HOST !== 'undefined' ? POSTHOG_HOST : undefined

/**
 * Boots PostHog and reports the content events the cross-site funnels are built
 * on. Renders nothing.
 *
 * With `POSTHOG_KEY` unset - every environment except production - nothing is
 * loaded at all: the SDK is behind a dynamic import that never runs.
 */
export function Analytics({ urlLogical, locale }: { urlLogical: string; locale: string }) {
  useEffect(() => {
    initializePosthog({ key: posthogKey, host: posthogHost, consent: getCookieConsent(), locale })

    // The consent cookie has a second writer - app.vocdoni.io - so a decision
    // made there has to be honoured here without waiting for a full reload.
    const stopWatching = watchCrossSiteConsent()
    const onConsentChange = () => {
      const consent: PosthogConsent = getCookieConsent()
      // A visitor who accepted after the banner appeared has never initialised
      // PostHog, so this is an init, not a config change.
      initializePosthog({ key: posthogKey, host: posthogHost, consent, locale })
      applyPosthogConsent(consent)
    }

    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange)
    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange)
      stopWatching()
    }
  }, [locale])

  useEffect(() => {
    registerPosthogSuperProperties({ locale })
  }, [locale])

  // posthog-js captures `$pageview` itself from the History API. This only adds
  // the content events on top, which carry the vertical/slug the funnels break
  // down by.
  const lastReported = useRef<string | null>(null)
  useEffect(() => {
    if (lastReported.current === urlLogical) return
    lastReported.current = urlLogical

    const event = pageViewEvent(classifyPath(urlLogical))
    if (event) trackAnalyticsEvent(event)
  }, [urlLogical])

  return null
}
