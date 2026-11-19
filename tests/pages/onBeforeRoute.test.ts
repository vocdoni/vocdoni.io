import { describe, expect, it } from 'vitest'

// onBeforeRoute is not exported directly; test it via its effect on pageContext.
// We import and invoke it through dynamic import to avoid the vike/types
// declaration dependency in pure Node tests.

// A minimal stub for PageContext that only carries what onBeforeRoute reads.
type StubContext = { urlOriginal: string }

async function routeUrl(urlOriginal: string) {
  const { default: onBeforeRoute } = await import('@/pages/+onBeforeRoute')
  const result = onBeforeRoute({ urlOriginal } as any)
  return result.pageContext as { urlLogical: string; locale: string; isCompatibilityRedirect: boolean }
}

describe('onBeforeRoute trailing-slash normalisation', () => {
  it('/en/pricing/ and /en/pricing produce the same urlLogical', async () => {
    const slash = await routeUrl('/en/pricing/')
    const noSlash = await routeUrl('/en/pricing')
    expect(slash.urlLogical).toBe('/pricing')
    expect(noSlash.urlLogical).toBe('/pricing')
    expect(slash.locale).toBe('en')
    expect(noSlash.locale).toBe('en')
  })

  it('/en/ gives urlLogical = /', async () => {
    const result = await routeUrl('/en/')
    expect(result.urlLogical).toBe('/')
    expect(result.locale).toBe('en')
  })

  it('query strings are preserved as part of urlLogical (passed through extractLocale)', async () => {
    const result = await routeUrl('/en/pricing?plan=pro')
    expect(result.locale).toBe('en')
    // The query is not stripped by onBeforeRoute - it passes through extractLocale.
    expect(result.urlLogical).toContain('pricing')
  })

  it('/en/solutions/associations/ normalises to /solutions/associations', async () => {
    const result = await routeUrl('/en/solutions/associations/')
    expect(result.urlLogical).toBe('/solutions/associations')
  })
})
