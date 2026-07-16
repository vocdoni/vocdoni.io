/**
 * Notifies IndexNow-participating search engines (Bing, Yandex, Naver, Seznam, Yep) that
 * vocdoni.io URLs have changed. A single POST to api.indexnow.org fans out to all of them.
 *
 * Usage:
 *   pnpm indexnow                                  # submit every URL in the live sitemap
 *   pnpm indexnow https://vocdoni.io/en/blog/foo   # submit only the URLs passed as args
 *   pnpm indexnow --sitemap dist/client/sitemap.xml  # read a local/alternate sitemap file
 *   pnpm indexnow --dry-run                         # print what would be sent, submit nothing
 *
 * The IndexNow key is the PUBLIC key file served at the domain root (public/<key>.txt). It is
 * auto-detected from that file, or overridden with INDEXNOW_KEY. It is not a secret - it is
 * literally hosted at ${SITE_URL}/<key>.txt so engines can verify ownership.
 *
 * The site host and key location are derived from SITE_URL (defaults to https://vocdoni.io).
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS_PER_REQUEST = 10_000 // IndexNow hard limit per POST.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = (process.env.SITE_URL ?? 'https://vocdoni.io').replace(/\/+$/, '')
const host = new URL(siteUrl).host

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const sitemapFlagIdx = args.indexOf('--sitemap')
// Index of --sitemap's value, or -1 when the flag is absent (so it never collides with a real
// arg position - a bare +1 would wrongly claim index 0 and drop the first explicit URL).
const sitemapValueIdx = sitemapFlagIdx === -1 ? -1 : sitemapFlagIdx + 1
if (sitemapFlagIdx !== -1 && (!args[sitemapValueIdx] || args[sitemapValueIdx].startsWith('--'))) {
  console.error('--sitemap requires a following path or URL.')
  process.exit(1)
}
const sitemapSource = sitemapFlagIdx !== -1 ? args[sitemapValueIdx] : undefined
// Anything that isn't a flag or the --sitemap value is treated as an explicit URL to submit.
const explicitUrls = args.filter((a, i) => !a.startsWith('--') && i !== sitemapValueIdx)

/** Read the IndexNow key from INDEXNOW_KEY, else from the public/<key>.txt ownership file. */
async function resolveKey(): Promise<string> {
  const fromEnv = process.env.INDEXNOW_KEY?.trim()
  if (fromEnv) return fromEnv

  const publicDir = path.join(root, 'public')
  const entries = await fs.readdir(publicDir).catch(() => [] as string[])
  for (const name of entries) {
    if (!/^[A-Za-z0-9-]{8,128}\.txt$/.test(name)) continue
    const content = (await fs.readFile(path.join(publicDir, name), 'utf8')).trim()
    if (content === name.replace(/\.txt$/, '')) return content
  }
  throw new Error(
    'No IndexNow key found. Set INDEXNOW_KEY or add public/<key>.txt (filename === contents === the key).'
  )
}

/** Extract <loc> URLs from a sitemap, either a local file path or a URL (defaults to the live one). */
async function collectSitemapUrls(source: string | undefined): Promise<string[]> {
  let xml: string
  if (source && !/^https?:\/\//.test(source)) {
    xml = await fs.readFile(path.resolve(source), 'utf8')
  } else {
    // Cache-bust so a CDN (Cloudflare) can't serve a stale sitemap right after a deploy.
    // Built via URL/searchParams so a source that already has a query string stays valid.
    const target = new URL(source ?? `${siteUrl}/sitemap.xml`)
    target.searchParams.set('cb', String(Date.now()))
    const url = target.toString()
    const res = await fetch(url, { cache: 'no-store', headers: { 'cache-control': 'no-cache' } })
    if (!res.ok) throw new Error(`Failed to fetch sitemap (${res.status}) from ${url}`)
    xml = await res.text()
  }
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1])
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

const key = await resolveKey()
const keyLocation = `${siteUrl}/${key}.txt`

const rawUrls = explicitUrls.length ? explicitUrls : await collectSitemapUrls(sitemapSource)
// IndexNow rejects the whole batch (422) if any URL is off-host, so drop foreign hosts loudly.
const urls: string[] = []
for (const u of rawUrls) {
  let parsed: URL
  try {
    parsed = new URL(u)
  } catch {
    console.warn(`skip (invalid URL): ${u}`)
    continue
  }
  if (parsed.host === host) urls.push(u)
  else console.warn(`skip (host mismatch): ${u}`)
}

if (!urls.length) {
  console.error('No URLs to submit.')
  process.exit(1)
}

console.log(`IndexNow: ${urls.length} URL(s) for ${host} (key ${key.slice(0, 6)}…, keyLocation ${keyLocation})`)

if (dryRun) {
  for (const u of urls) console.log(`  ${u}`)
  console.log('--dry-run: nothing submitted.')
  process.exit(0)
}

let failed = false
const batches = chunk(urls, MAX_URLS_PER_REQUEST)
for (const [i, batch] of batches.entries()) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
  })
  const body = await res.text()
  const label = batches.length > 1 ? `batch ${i + 1}/${batches.length} ` : ''
  // 200 = accepted, 202 = accepted, key validation pending. Anything else is a real problem.
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ ${label}${batch.length} URL(s) accepted (HTTP ${res.status})`)
  } else {
    failed = true
    console.error(`✗ ${label}HTTP ${res.status} ${body || '(no body)'}`)
    if (res.status === 403) console.error(`  → key file not reachable/valid at ${keyLocation}`)
    if (res.status === 422) console.error('  → URLs do not match host, or key schema mismatch')
    if (res.status === 429) console.error('  → rate limited; retry later')
  }
}

process.exit(failed ? 1 : 0)
