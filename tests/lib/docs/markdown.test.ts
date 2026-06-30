import { describe, expect, it } from 'vitest'

import {
  allDocSlugs,
  compile,
  type DocFileMap,
  listDocsMeta,
  loadDoc,
  resolveTokens,
  tokenMap,
} from '@/lib/docs/markdown'
import { DEVELOPERS_API_BASE_URL, DEVELOPERS_SDK_URL, DEVELOPERS_SWAGGER_URL } from '@/lib/developers'

describe('resolveTokens', () => {
  it('resolves known tokens from lib/developers.ts', () => {
    expect(resolveTokens('Base: {{API_BASE_URL}}')).toBe(`Base: ${DEVELOPERS_API_BASE_URL}`)
    expect(resolveTokens('Spec {{ SWAGGER_URL }}')).toBe(`Spec ${DEVELOPERS_SWAGGER_URL}`)
  })

  it('leaves unknown tokens untouched', () => {
    expect(resolveTokens('Hello {{NOPE}}')).toBe('Hello {{NOPE}}')
  })

  it('replaces tokens inside fenced code too (string-level)', () => {
    const out = resolveTokens('```\ncurl {{API_BASE_URL}}/x\n```')
    expect(out).toContain(`${DEVELOPERS_API_BASE_URL}/x`)
  })

  it('tokenMap exposes the developer constants', () => {
    expect(tokenMap().API_BASE_URL).toBe(DEVELOPERS_API_BASE_URL)
  })
})

describe('compile - admonitions', () => {
  it('maps [!NOTE] / [!INFO] to the note variant with the info icon', () => {
    const html = compile('> [!NOTE]\n> Heads up.')
    expect(html).toContain('bg-muted/40')
    expect(html).toContain('role="note"')
    expect(html).toContain('Heads up.')
    // Info icon path fragment
    expect(html).toContain('M12 16v-4')
  })

  it('maps [!TIP] to primary, [!WARNING] to warning, [!CAUTION]/[!DANGER]/[!ERROR] to danger', () => {
    expect(compile('> [!TIP]\n> x')).toContain('bg-primary/5')
    expect(compile('> [!WARNING]\n> x')).toContain('bg-warning/10')
    expect(compile('> [!CAUTION]\n> x')).toContain('bg-destructive/10')
    expect(compile('> [!DANGER]\n> x')).toContain('bg-destructive/10')
    expect(compile('> [!ERROR]\n> x')).toContain('bg-destructive/10')
  })

  it('parses an inline title after the marker', () => {
    const html = compile('> [!WARNING] Before you start\n> Body text.')
    expect(html).toContain('Before you start')
    expect(html).toContain('font-semibold')
    expect(html).toContain('Body text.')
  })

  it('leaves plain blockquotes unchanged', () => {
    const html = compile('> just a quote')
    expect(html).toContain('<blockquote>')
    expect(html).not.toContain('role="note"')
  })
})

describe('compile - :::steps', () => {
  const md = `:::steps
## Authenticate
Exchange email and password for a JWT.

## Create an organization
The response includes the org address.
:::`

  it('renders a numbered list of steps in order', () => {
    const html = compile(md)
    expect(html).toContain('role="list"')
    expect(html).toMatch(/>1<\/span>[\s\S]*Authenticate/)
    expect(html).toMatch(/>2<\/span>[\s\S]*Create an organization/)
  })

  it('keeps step headings as real headings with ids (so the TOC works)', () => {
    const html = compile(md)
    expect(html).toContain('id="authenticate"')
    expect(html).toContain('id="create-an-organization"')
  })

  it('keeps nested content inside the step', () => {
    const html = compile(`:::steps\n## Run it\n\n\`\`\`bash\ncurl x\n\`\`\`\n:::`)
    expect(html).toContain('<pre')
    expect(html).toContain('curl x')
  })
})

describe('compile - :::code-tabs', () => {
  const md = `:::code-tabs[create a process]
\`\`\`bash
curl {{API_BASE_URL}}/processes
\`\`\`
\`\`\`csharp
Post("/processes", body);
\`\`\`
\`\`\`python
post("/processes", body)
\`\`\`
:::`

  it('groups the fences into a single tablist with one tabpanel per language', () => {
    const html = compile(md)
    expect((html.match(/role="tablist"/g) ?? []).length).toBe(1)
    expect((html.match(/role="tabpanel"/g) ?? []).length).toBe(3)
    expect((html.match(/role="tab"/g) ?? []).length).toBe(3)
  })

  it('maps language classes to human tab labels', () => {
    const html = compile(md)
    expect(html).toContain('>cURL<') // bash
    expect(html).toContain('>C#<') // csharp
    expect(html).toContain('>Python<') // python
  })

  it('renders the optional directive label as a caption', () => {
    expect(compile(md)).toContain('create a process')
  })

  it('keeps a copy button per panel and resolves tokens inside them', () => {
    const html = compile(md)
    expect((html.match(/data-copy/g) ?? []).length).toBe(3)
    expect(html).toContain(`${DEVELOPERS_API_BASE_URL}/processes`)
  })

  it('starts the tab bar hidden so the no-JS fallback shows stacked panels', () => {
    const html = compile(md)
    expect(html).toMatch(/role="tablist"[^>]*hidden/)
  })

  it('leaves a single-language code-tabs block as a plain code block (no tabs)', () => {
    const html = compile(':::code-tabs\n```bash\ncurl x\n```\n:::')
    expect(html).not.toContain('role="tablist"')
    expect(html).toContain('data-copy') // still a normal code surface
  })
})

describe('compile - endpoints', () => {
  it('renders endpoint lists as method pills with per-method colours', () => {
    const html = compile('- **GET** `/x`\n- **POST** `/y`\n- **PUT** `/p`\n- **DELETE** `/z`')
    expect(html).toContain('text-sky-700') // GET blue
    expect(html).toContain('bg-zinc-500/10') // POST grey
    expect(html).toContain('text-amber-700') // PUT orange
    expect(html).toContain('text-red-600') // DELETE red
    expect(html).not.toContain('<ul') // the list was converted to pill rows
    expect(html).toContain('/x')
  })

  it('leaves non-endpoint lists as normal lists', () => {
    const html = compile('- `admin` - full control\n- `viewer` - read only')
    expect(html).toContain('<ul')
    expect(html).not.toContain('bg-zinc-500/10')
  })
})

describe('compile - tables, slugs, code, links', () => {
  it('renders and styles GFM tables like the property table', () => {
    const html = compile('| Field | Type | Description |\n| - | - | - |\n| `email` | string | The email. |')
    expect(html).toContain('table-wrap')
    expect(html).toContain('uppercase') // header row
    expect(html).toContain('font-mono text-[13px] text-foreground') // name cell code, plain mono
    expect(html).toContain('font-mono text-[13px] text-muted-foreground') // type cell, mono muted
  })

  it('renders a `(required)` field marker as the red REQUIRED pill (localized) and strips the marker', () => {
    const en = compile('| Field | Type | Description |\n| - | - | - |\n| `email` (required) | string | The email. |')
    expect(en).toContain('text-destructive') // red pill
    expect(en).toContain('>Required<')
    expect(en).not.toContain('(required)') // marker removed from output

    const es = compile('| Field | Type | Description |\n| - | - | - |\n| `email` (required) | string | x |', {
      locale: 'es',
    })
    expect(es).toContain('>Obligatorio<')
  })

  it('adds heading ids and an append anchor', () => {
    const html = compile('## Hello world')
    expect(html).toContain('id="hello-world"')
    expect(html).toContain('heading-anchor')
  })

  it('wraps code blocks in the dark surface with a copy button', () => {
    const html = compile('```bash\ncurl x\n```')
    expect(html).toContain('bg-zinc-950')
    expect(html).toContain('data-copy')
  })

  it('localizes internal links and leaves external/anchor links alone', () => {
    const html = compile('[a](/developers/docs/census) [b](https://x.dev) [c](#frag)', { locale: 'es' })
    expect(html).toContain('href="/es/developers/docs/census"')
    expect(html).toContain('href="https://x.dev"')
    expect(html).toContain('href="#frag"')
  })

  it('does not double-prefix already-localized links', () => {
    const html = compile('[a](/en/developers/docs/census)', { locale: 'en' })
    expect(html).toContain('href="/en/developers/docs/census"')
    expect(html).not.toContain('/en/en/')
  })
})

describe('loadDoc / allDocSlugs / listDocsMeta', () => {
  const files: DocFileMap = {
    '/content/developers/docs/en/overview.md':
      '---\ntitle: Overview\ngroup: get_started\norder: 0\nreference:\n  title: Where to go next\n  columns: 3\n  items:\n    - title: SDK\n      description: Use the SDK.\n      href: "{{SDK_URL}}"\n      icon: terminal\n      external: true\n    - title: Quickstart\n      href: /developers/docs/quickstart\n      icon: rocket\n---\n# Overview\nHi.',
    '/content/developers/docs/en/quickstart.md':
      '---\ntitle: Quickstart\nlead: Run an election.\ngroup: get_started\norder: 10\n---\n## Step\nBody {{API_BASE_URL}}',
    '/content/developers/docs/es/quickstart.md':
      '---\ntitle: Inicio rápido\ngroup: get_started\norder: 10\n---\n## Paso\nCuerpo',
  }

  it('lists slugs from the en folder excluding overview', () => {
    expect(allDocSlugs(files)).toEqual(['quickstart'])
  })

  it('loads the localized file when present, mirroring the page route in rawHref', () => {
    const doc = loadDoc('quickstart', 'es', files)
    expect(doc?.usedLocale).toBe('es')
    expect(doc?.frontmatter.title).toBe('Inicio rápido')
    expect(doc?.rawHref).toBe('/es/developers/docs/quickstart.md')
    expect(doc?.html).toContain('Cuerpo')
  })

  it('falls back to English content but keeps the requested locale in rawHref', () => {
    const doc = loadDoc('quickstart', 'fr', files)
    expect(doc?.usedLocale).toBe('en')
    expect(doc?.frontmatter.title).toBe('Quickstart')
    expect(doc?.rawHref).toBe('/fr/developers/docs/quickstart.md')
    // tokens resolved in the compiled body
    expect(doc?.html).toContain(DEVELOPERS_API_BASE_URL)
  })

  it('uses /<locale>/developers/docs.md for the overview', () => {
    expect(loadDoc('overview', 'en', files)?.rawHref).toBe('/en/developers/docs.md')
  })

  it('parses the reference frontmatter, resolving tokens in href', () => {
    const doc = loadDoc('overview', 'en', files)
    const ref = doc?.frontmatter.reference
    expect(ref?.title).toBe('Where to go next')
    expect(ref?.columns).toBe(3)
    expect(ref?.items[0]).toMatchObject({ title: 'SDK', href: DEVELOPERS_SDK_URL, icon: 'terminal', external: true })
    // internal href left unprefixed (the Link component localizes it); external auto-detected false
    expect(ref?.items[1]).toMatchObject({ title: 'Quickstart', href: '/developers/docs/quickstart', external: false })
  })

  it('returns null for an unknown slug', () => {
    expect(loadDoc('nope', 'en', files)).toBeNull()
  })

  it('builds nav metadata with per-locale titles and en group/order', () => {
    const metas = listDocsMeta(files)
    const quickstart = metas.find((m) => m.slug === 'quickstart')
    expect(quickstart?.group).toBe('get_started')
    expect(quickstart?.order).toBe(10)
    expect(quickstart?.titles).toMatchObject({ en: 'Quickstart', es: 'Inicio rápido' })
  })
})
