// https://vike.dev/Head

//# BATI.has("mantine")

export default function HeadDefault() {
  return (
    <>
      {/* See https://plausible.io/docs/plausible-script */}
      {/* TODO: update data-domain */}
      <script defer data-domain='yourdomain.com' src='https://plausible.io/js/script.js'></script>
    </>
  )
}
