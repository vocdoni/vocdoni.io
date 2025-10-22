// https://vike.dev/Head

//# BATI.has("mantine")

export default function HeadDefault() {
  if (!PLAUSIBLE_DOMAIN) return null

  return (
    <>
      <script defer data-domain={PLAUSIBLE_DOMAIN} src='https://plausible.io/js/script.js'></script>
    </>
  )
}
