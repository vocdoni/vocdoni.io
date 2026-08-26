import { useEffect } from 'react'

import { capturePostHogPageview } from '@/lib/posthog'

export function WebsiteAnalytics({ urlLogical }: { urlLogical: string }) {
  useEffect(() => {
    const capturePageview = () => {
      capturePostHogPageview()
    }

    capturePageview()
    window.addEventListener('cookie-consent-changed', capturePageview)

    return () => window.removeEventListener('cookie-consent-changed', capturePageview)
  }, [urlLogical])

  return null
}
