import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

// Dev-only middleware that serves Keystatic's local API at /api/keystatic/*, so
// the admin at /keystatic can read and write content files on disk during
// `pnpm dev`. In production the same handler runs as a Netlify function
// (netlify/functions/keystatic.ts); this plugin is inert outside `vite serve`.
//
// Keystatic (and its React-heavy deps) are imported lazily inside configureServer
// so they never enter the production build graph or the config-load module graph.

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })

const headerEntries = (headers: unknown): [string, string][] => {
  if (!headers) return []
  if (typeof Headers !== 'undefined' && headers instanceof Headers) return [...headers.entries()]
  if (Array.isArray(headers)) return headers as [string, string][]
  return Object.entries(headers as Record<string, string>)
}

export function keystaticApiPlugin(): Plugin {
  return {
    name: 'keystatic-local-api',
    apply: 'serve',
    async configureServer(server) {
      const [{ makeGenericAPIRouteHandler }, keystaticConfig] = await Promise.all([
        import('@keystatic/core/api/generic'),
        import('../keystatic.config').then((m) => m.default),
      ])
      const handler = makeGenericAPIRouteHandler({ config: keystaticConfig })

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        if (!req.url || !req.url.startsWith('/api/keystatic')) return next()
        try {
          const host = req.headers.host || 'localhost'
          const request = {
            method: req.method || 'GET',
            url: `http://${host}${req.url}`,
            headers: {
              get: (name: string) => {
                const value = req.headers[name.toLowerCase()]
                return Array.isArray(value) ? value.join(', ') : (value ?? null)
              },
            },
            json: async () => {
              const body = await readBody(req)
              return body ? JSON.parse(body) : undefined
            },
          }

          const result = await handler(request)
          res.statusCode = result.status ?? 200
          for (const [key, value] of headerEntries(result.headers)) res.setHeader(key, value)
          res.end(result.body == null ? undefined : Buffer.from(result.body as Uint8Array | string))
        } catch (error) {
          server.config.logger.error(`[keystatic] ${(error as Error).message}`)
          res.statusCode = 500
          res.end('Keystatic API error')
        }
      })
    },
  }
}
