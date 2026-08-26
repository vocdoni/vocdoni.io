import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  applyPosthogConsent,
  classifyPath,
  initializePosthog,
  pageViewEvent,
  registerPosthogSuperProperties,
  toPosthogConsent,
  trackAnalyticsEvent,
  type PosthogConsent,
} from '@/lib/analytics'
import { CONSENT_CHANGE_EVENT, getCookieConsent } from '@/lib/cookieConsent'
import { usePageContext } from 'vike-react/usePageContext'

/**
 * Wires PostHog into the site: consent, and the super properties every event
 * carries. Renders nothing.
 *
 * Both this site and `app.vocdoni.io` report into one PostHog project, so
 * `site` is what separates them in a filter - more durable than `$host`, which
 * changes with preview hosts and custom domains.
 */
export function Analytics() {
  const { i18n } = useTranslation()
  const pageContext = usePageContext() as { urlLogical?: string }
  const urlLogical = pageContext.urlLogical || '/'
  const [consent, setConsent] = useState<PosthogConsent>(null)

  // Consent is only readable in the browser, and this site is prerendered, so it
  // is read after mount rather than during render.
  useEffect(() => {
    const syncConsent = () => setConsent(toPosthogConsent(getCookieConsent()))
    syncConsent()

    // `storage` covers the other tabs: the choice is mirrored to localStorage,
    // which is the only one of the two stores that raises a cross-tab event.
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent)
    window.addEventListener('storage', syncConsent)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent)
      window.removeEventListener('storage', syncConsent)
    }
  }, [])

  useEffect(() => {
    initializePosthog({ key: POSTHOG_KEY, host: POSTHOG_HOST, consent })
  }, [consent])

  useEffect(() => {
    applyPosthogConsent(consent)
  }, [consent])

  // Keep the interface locale attached to every event, so the eleven locales can
  // be compared on conversion rather than on traffic.
  useEffect(() => {
    const locale = i18n.resolvedLanguage || i18n.language
    registerPosthogSuperProperties({ site: 'web', ...(locale ? { locale } : {}) })
  }, [i18n.resolvedLanguage, i18n.language])

  // The content events that start a funnel. Ordinary pages are covered by
  // `$pageview`, which already carries the path; these exist so a funnel can
  // break down by `vertical` or `slug` without matching URLs.
  useEffect(() => {
    const event = pageViewEvent(classifyPath(urlLogical))
    if (event) trackAnalyticsEvent(event)
  }, [urlLogical])

  return null
}

export default Analytics
