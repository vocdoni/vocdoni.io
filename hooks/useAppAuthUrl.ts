import { usePageContext } from 'vike-react/usePageContext'

import { getAppAuthUrl } from '@/lib/app-links'

/** App sign-up (or sign-in) URL in the language of the page being viewed. */
export function useAppAuthUrl(page: 'signup' | 'signin' = 'signup', type?: string) {
  const pageContext = usePageContext()
  return getAppAuthUrl(page, pageContext.locale, { type })
}
