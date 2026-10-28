import { buildHttpLogEvent, captureEndpoint, DEFAULT_POSTHOG_HOST, isDocumentPath } from '../../lib/http-log.ts'

/** The slice of Netlify's Context this function uses; the package is deliberately not a dependency. */
interface EdgeContext {
  ip?: string
  waitUntil?: (promise: Promise<unknown>) => void
}

type NetlifyGlobal = { env?: { get(name: string): string | undefined } }

const netlifyEnv = (name: string): string | undefined =>
  (globalThis as { Netlify?: NetlifyGlobal }).Netlify?.env?.get(name)

/**
 * Crawler and AI-agent logging: report each page fetch by a bot to PostHog as a `$http_log` event.
 * All the logic that does not need the network lives in `lib/http-log.ts`, which is unit tested -
 * this file is the thin Deno shell, like `markdown-negotiation.ts`.
 *
 * Why an edge function: bots never run JavaScript, so the browser SDK never sees them, and the site
 * is fully prerendered with no runtime server. The edge is the one place every request passes.
 *
 * Why the `netlify-agent-category` prefilter in the declaration below: Netlify classifies every
 * request and sets this header to `<category>[;<sub-category>]`, e.g. `browser`, `crawler;ai`,
 * `crawler;seo` or `ai-agent;user`. Only values matching `(ai-agent|crawler)` are routed here, so
 * no human request is, and Netlify overrides any client-supplied value on deployed sites, so it
 * cannot be spoofed to opt in.
 *
 * Why this always returns `undefined`: the request then continues down the normal chain and the
 * static response keeps everything `_headers` adds (Netlify skips custom headers for a URL answered
 * by an edge function; falling through was verified on production).
 *
 * Why `waitUntil`: the PostHog call is sent after the response is on its way, so reporting never
 * adds latency and a slow or failing PostHog never affects what the bot receives. Without it the
 * send is awaited, with a 2 second timeout, and any failure is swallowed.
 *
 * Env vars `POSTHOG_KEY` and `POSTHOG_HOST` come from the Netlify site environment with the
 * Functions scope, read through `Netlify.env`. The GitHub build vars are build-time only and are
 * invisible here. Without `POSTHOG_KEY` the function does nothing.
 *
 * `status_code` is not reported: the function runs before the response exists, and waiting for it
 * would mean wrapping the response, which gives up the fall-through above.
 *
 * Note there is no `import type { Config }` from `@netlify/edge-functions`: the declaration is a
 * plain object literal so the bundle has no npm dependency to resolve and the bundler can read it
 * statically.
 *
 * Ordering: inline-declared edge functions matching the same path run in alphabetical order of
 * file name, so this runs before `markdown-negotiation.ts` and a negotiated markdown fetch is
 * logged before the twin is served. Keep the file names sorted that way.
 */
export default async (request: Request, context: EdgeContext): Promise<undefined> => {
  const apiKey = netlifyEnv('POSTHOG_KEY')
  if (!apiKey) return
  try {
    const url = new URL(request.url)
    if (!isDocumentPath(url.pathname)) return
    const event = await buildHttpLogEvent(
      {
        url: request.url,
        userAgent: request.headers.get('user-agent'),
        ip: context.ip ?? null,
        referrer: request.headers.get('referer'),
        agentCategory: request.headers.get('netlify-agent-category'),
        requestId: request.headers.get('x-nf-request-id'),
        method: request.method,
      },
      apiKey
    )
    const host = netlifyEnv('POSTHOG_HOST') || DEFAULT_POSTHOG_HOST
    const send = fetch(captureEndpoint(host), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(2000),
    }).then(
      () => undefined,
      () => undefined
    )
    if (context.waitUntil) context.waitUntil(send)
    else await send
  } catch {
    // Reporting must never affect the response.
  }
  return
}

export const config = {
  path: '/*',
  excludedPath: ['/assets/*', '/images/*', '/fonts/*', '/blog/images/*'],
  method: ['GET'],
  header: { 'netlify-agent-category': '(ai-agent|crawler)' },
}
