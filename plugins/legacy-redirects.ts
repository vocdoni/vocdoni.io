import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { buildNetlifyRedirects } from '../lib/legacyRedirects'

/**
 * Emits the Netlify `_redirects` file into the client build output from the single source of truth
 * in `lib/legacyRedirects.ts`. Netlify reads this file and issues real 301s on every deploy -
 * production, the dev site and PR previews alike.
 *
 * Mirrors `plugins/vike-sitemap.ts`: generated at build time, never committed, so it cannot drift.
 */
export function legacyRedirectsPlugin(): Plugin {
  let resolvedOutDir: string
  let clientOutDir: string
  let isSSRBuild = false
  let ran = false

  return {
    name: 'legacy-redirects-plugin',
    configResolved(config) {
      isSSRBuild = !!config.build.ssr
      resolvedOutDir = config.build.outDir ? path.resolve(config.build.outDir) : path.resolve('dist')
      clientOutDir = resolvedOutDir.endsWith(`${path.sep}client`) ? resolvedOutDir : path.join(resolvedOutDir, 'client')
    },
    async closeBundle() {
      if (isSSRBuild) return
      if (ran) return
      ran = true

      await fs.mkdir(clientOutDir, { recursive: true })
      await fs.writeFile(path.join(clientOutDir, '_redirects'), buildNetlifyRedirects(), 'utf8')
    },
  }
}
