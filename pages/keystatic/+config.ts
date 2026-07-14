import type { Config } from 'vike/types'

// The Keystatic admin is a client-only single-page app that talks to the local dev
// API (plugins/keystatic-api.ts). It is intentionally NOT prerendered, so it is not
// shipped to the deployed sites - editors run it via `pnpm dev` only. No SSR and no
// localization.
export default {
  ssr: false,
  prerender: false,
} satisfies Config
