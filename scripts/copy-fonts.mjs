// Assembles self-hosted webfonts into public/fonts/ from the @fontsource-variable
// packages. We serve them from public/ (instead of importing the CSS through the
// bundler) so Vike does not inject a <link rel="preload"> for every unicode-range
// subset: the browser lazily fetches only the subset each page actually needs.
// Re-run with: node scripts/copy-fonts.mjs
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/fonts')
const filesDir = resolve(outDir, 'files')

// Match the axes currently used by the site: Hanken Grotesk (variable weight)
// upright and italic, Fraunces (full axes: wght + opsz + SOFT/WONK, needed for
// the display-heading voice) upright and italic, JetBrains Mono upright only.
// Noto Sans Devanagari covers the Hindi locale: neither Hanken Grotesk nor
// Fraunces ships a Devanagari subset, so without it `hi` falls back to whatever
// the OS happens to have. Its latin subsets never load in practice because
// Hanken Grotesk comes first in --font-sans and already covers those ranges.
// Inter (variable weight, upright only) is what Vocdoni App itself is set in; the
// site uses it solely inside product mockups (`--font-app`), so its subsets are
// only fetched on a page that renders one. Source Sans 3 is the current cut of
// Source Sans Pro, the face Decidim and its voting page are set in; it serves
// the Decidim mockups the same way (`--font-decidim`), upright only.
const sources = [
  '@fontsource-variable/hanken-grotesk/wght.css',
  '@fontsource-variable/hanken-grotesk/wght-italic.css',
  '@fontsource-variable/fraunces/full.css',
  '@fontsource-variable/fraunces/full-italic.css',
  '@fontsource-variable/jetbrains-mono/wght.css',
  '@fontsource-variable/inter/wght.css',
  '@fontsource-variable/source-sans-3/wght.css',
  '@fontsource-variable/noto-sans-devanagari/wght.css',
]

rmSync(outDir, { recursive: true, force: true })
mkdirSync(filesDir, { recursive: true })

const parts = []
for (const spec of sources) {
  const cssPath = resolve(root, 'node_modules', spec)
  const pkgDir = dirname(cssPath)
  let css = readFileSync(cssPath, 'utf8')

  // Copy each referenced woff2 and rewrite its url() to the public path.
  css = css.replace(/url\(\.\/files\/([^)]+\.woff2)\)/g, (_, file) => {
    const from = resolve(pkgDir, 'files', file)
    if (!existsSync(from)) throw new Error(`Missing font file: ${from}`)
    copyFileSync(from, resolve(filesDir, file))
    return `url(/fonts/files/${file})`
  })
  parts.push(`/* ${spec} */\n${css.trim()}`)
}

writeFileSync(resolve(outDir, 'fonts.css'), parts.join('\n\n') + '\n')
console.log(`Wrote public/fonts/fonts.css and woff2 subsets to public/fonts/files/`)
