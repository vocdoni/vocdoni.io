import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic'
import keystaticConfig from '../../keystatic.config'

// Production Keystatic API (GitHub storage). Serves /api/keystatic/* on the
// Netlify deployment so editors can sign in with GitHub and commit content.
// Requires these env vars on the site (from Keystatic's /keystatic/setup flow):
//   KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET
//
// Netlify Functions v2: receives a standard Request, returns a standard Response.
// Keystatic's handler is structurally compatible with the Request shape it needs.

const handler = makeGenericAPIRouteHandler({ config: keystaticConfig })

export default async (request: Request): Promise<Response> => {
  const result = await handler(request as unknown as Parameters<typeof handler>[0])
  return new Response((result.body ?? null) as BodyInit | null, {
    status: result.status ?? 200,
    headers: result.headers as HeadersInit | undefined,
  })
}

export const config = { path: '/api/keystatic/*' }
