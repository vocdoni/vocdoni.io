// https://vike.dev/Head

import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

export default function HeadDefault() {
  useEffect(() => {
    if (GTM_ID) {
      TagManager.initialize({ gtmId: GTM_ID })
    }
  }, [])

  if (!PLAUSIBLE_DOMAIN && !GTM_ID) return null

  return (
    <>
      {PLAUSIBLE_DOMAIN && (
        <script defer data-domain={PLAUSIBLE_DOMAIN} src='https://plausible.io/js/script.js'></script>
      )}
    </>
  )
}
