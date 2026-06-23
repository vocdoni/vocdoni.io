/**
 * Prints the full DigitalOcean App Platform spec for vocdoni.io: the committed
 * `.do/app.template.yaml` with the legacy-redirect `ingress.rules` injected from the single source
 * of truth in `lib/legacyRedirects.ts`.
 *
 * Usage: `pnpm gen:do-appspec`
 *
 * The deploy workflow writes this to a file and hands it to digitalocean/app_action, which then
 * substitutes the `${VAR}` env placeholders from the workflow environment. Env values are never
 * committed to the repo.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { injectIngressRules } from '../lib/legacyRedirects'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const template = await fs.readFile(path.join(root, '.do', 'app.template.yaml'), 'utf8')

process.stdout.write(injectIngressRules(template))
