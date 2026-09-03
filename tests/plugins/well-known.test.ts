import { describe, expect, it } from 'vitest'

import {
  DEVELOPERS_API_BASE_URL,
  DEVELOPERS_SKILLS_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
} from '@/lib/developers'
import { ARD_OUTPUT_PATHS } from '@/plugins/ard'
import { artifactsFor, buildApiCatalog, buildNetlifyHeaders } from '@/plugins/well-known'

describe('buildApiCatalog', () => {
  it('emits a valid RFC 9727 linkset anchored at the API base', () => {
    const doc = JSON.parse(buildApiCatalog('https://vocdoni.io/'))
    expect(Array.isArray(doc.linkset)).toBe(true)
    const entry = doc.linkset[0]
    expect(entry.anchor).toBe(DEVELOPERS_API_BASE_URL)
    expect(entry['service-desc'][0].href).toBe(DEVELOPERS_SWAGGER_URL)
    expect(entry['service-doc'][0].href).toBe('https://vocdoni.io/developers/docs')
    expect(entry.status[0].href).toBe(DEVELOPERS_STATUS_URL)
  })
})

describe('buildNetlifyHeaders', () => {
  it('emits Link headers mirroring the discovery relations', () => {
    const out = buildNetlifyHeaders()
    expect(out.startsWith('/*\n')).toBe(true)
    expect(out).toContain('Link: </.well-known/api-catalog>; rel="api-catalog"')
    expect(out).toContain(`Link: <${DEVELOPERS_SKILLS_URL}>; rel="related"`)
    expect(out).toContain(`Link: <${DEVELOPERS_SWAGGER_URL}>; rel="service-desc"`)
    expect(out).not.toContain('noindex, nofollow')
  })

  it('adds X-Robots-Tag on noindex deploys', () => {
    const out = buildNetlifyHeaders(true)
    expect(out).toContain('  X-Robots-Tag: noindex, nofollow')
    // Still inside the /* block, right before the Link headers.
    expect(out.startsWith('/*\n  X-Robots-Tag: noindex, nofollow\n  Link: ')).toBe(true)
  })

  it('serves the extensionless api-catalog as RFC 9727 linkset+json', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      expect(out).toContain('/.well-known/api-catalog\n  Content-Type: application/linkset+json')
    }
  })

  it('marks the raw markdown mirrors noindex with wildcard patterns', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      for (const pattern of ['/*/developers/docs.md', '/*/developers/docs/*.md', '/*/blog/*.md']) {
        expect(out).toContain(`${pattern}\n  X-Robots-Tag: noindex\n`)
      }
    }
    // No enumerated locale paths sneaking in, and HTML pages stay indexable.
    expect(buildNetlifyHeaders()).not.toContain('/en/')
    expect(buildNetlifyHeaders()).not.toContain('/developers/docs\n')
  })

  it('serves the ARD manifests as CORS-readable json', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      for (const path of ARD_OUTPUT_PATHS) {
        // Registries fetch these cross-origin; without the CORS header the manifest is unreadable.
        expect(out).toContain(`/${path}\n  Content-Type: application/json\n  Access-Control-Allow-Origin: *`)
      }
    }
  })

  it('advertises the ARD manifests as Link relations', () => {
    const out = buildNetlifyHeaders()
    expect(out).toContain('  Link: </.well-known/ard.json>; rel="ard"')
    expect(out).toContain('  Link: </.well-known/ai-catalog.json>; rel="ai-catalog"')
  })

  it('emits the security headers on every deploy, indexable or not', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      expect(out).toContain('  X-Frame-Options: DENY')
      expect(out).toContain('  X-Content-Type-Options: nosniff')
      expect(out).toContain('  Referrer-Policy: strict-origin-when-cross-origin')
      expect(out).toContain('  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()')
      expect(out).toContain('  Cross-Origin-Opener-Policy: same-origin')
      expect(out).toContain('  Cross-Origin-Resource-Policy: cross-origin')
    }
  })

  it('emits one enforced CSP covering every integration the site loads', () => {
    const out = buildNetlifyHeaders()
    expect(out.match(/Content-Security-Policy/g)).toHaveLength(1)
    const csp = out.split('\n').find((l) => l.startsWith('  Content-Security-Policy: '))
    expect(csp).toBeDefined()
    for (const fragment of [
      "default-src 'self'",
      'https://www.googletagmanager.com', // GTM
      'https://plausible.io', // Plausible
      'https://eu.i.posthog.com', // PostHog default host
      'https://api.emailjs.com', // contact form
      'https://www.google.com https://www.gstatic.com', // reCAPTCHA
      'https://app.cal.com', // Cal.com booking embed
      'https://www.youtube-nocookie.com', // video facade
      'https://storage.googleapis.com', // blog-hotlinked images
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ]) {
      expect(csp).toContain(fragment)
    }
  })

  it('threads a custom PostHog host into the CSP connect-src', () => {
    const out = buildNetlifyHeaders(false, 'https://ph.example.com')
    expect(out).toContain("connect-src 'self' https://ph.example.com ")
    expect(out).not.toContain('eu.i.posthog.com')
  })

  it('is a well-formed _headers file: path lines flush left, header lines indented', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      expect(out.endsWith('\n')).toBe(true)
      const blocks = out.trimEnd().split('\n\n')
      expect(blocks).toHaveLength(7)
      for (const bl of blocks) {
        const [pathLine, ...headerLines] = bl.split('\n')
        expect(pathLine.startsWith('/')).toBe(true)
        expect(headerLines.length).toBeGreaterThan(0)
        for (const line of headerLines) expect(line).toMatch(/^ {2}[\w-]+: \S/)
      }
    }
  })
})

describe('artifactsFor', () => {
  const options = { hostname: 'https://vocdoni.io', defaultLocale: 'en', locales: ['en', 'es', 'ca'] }

  it('emits the api catalog, a curated index, the full index and the headers file', () => {
    const files = artifactsFor(options).map((a) => a.file)
    expect(files).toEqual(['.well-known/api-catalog', 'llms.txt', 'llms-full.txt', '_headers'])
  })

  it('emits only the English index by default, even on a multi-locale site', () => {
    const files = artifactsFor(options)
      .filter((a) => a.file.startsWith('llms'))
      .map((a) => a.file)
    expect(files).toEqual(['llms.txt', 'llms-full.txt'])
  })

  it('keeps the per-locale seam available without using it', () => {
    const files = artifactsFor({ ...options, llmsLocales: ['en', 'es'] }).map((a) => a.file)
    expect(files).toContain('llms.txt')
    expect(files).toContain('llms-es.txt')
  })

  it('serves the text artifacts in dev but never _headers', () => {
    for (const artifact of artifactsFor(options)) {
      expect(artifact.devServable).toBe(artifact.file !== '_headers')
      if (artifact.file.endsWith('.txt')) expect(artifact.contentType).toBe('text/plain; charset=utf-8')
    }
  })
})
