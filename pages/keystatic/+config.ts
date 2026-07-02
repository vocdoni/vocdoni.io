import type { Config } from 'vike/types'

// The Keystatic admin is a client-only single-page app (it talks to the local dev
// API, or the GitHub API in production). No SSR and no localization; a single
// static shell is pre-rendered at /keystatic (see +onBeforePrerenderStart.ts and
// pages/+onPrerenderStart.ts) so deep links resolve on static hosting.
export default {
  ssr: false,
} satisfies Config
