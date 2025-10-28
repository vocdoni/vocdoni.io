// https://vike.dev/Head

export default function HeadDefault() {
  // GTM initialization is now handled by the CookieConsent component
  // based on user consent. This ensures compliance with cookie regulations.

  if (!PLAUSIBLE_DOMAIN) return null

  return (
    <>
      {PLAUSIBLE_DOMAIN && (
        <script defer data-domain={PLAUSIBLE_DOMAIN} src='https://plausible.io/js/script.js'></script>
      )}
    </>
  )
}
