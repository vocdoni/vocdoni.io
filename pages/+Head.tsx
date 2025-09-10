// https://vike.dev/Head

//# BATI.has("mantine")
import logoUrl from "../assets/logo.svg";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />

      {/* See https://plausible.io/docs/plausible-script */}
      {/* TODO: update data-domain */}
      <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
    </>
  );
}
