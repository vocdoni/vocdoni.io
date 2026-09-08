import { docsRequestKey } from '@/hooks/useDocsData'
import { describe, expect, it } from 'vitest'

// The hook accepts a remote result only while the key it was requested under is
// still current, which is what keeps a slow response for an abandoned page,
// version or locale from replacing the one on screen.
describe('docsRequestKey', () => {
  it('is stable for the same branch, slug and locale', () => {
    expect(docsRequestKey('stage', 'quickstart', 'en')).toBe(docsRequestKey('stage', 'quickstart', 'en'))
  })

  it('changes when any of the three inputs changes', () => {
    const current = docsRequestKey('stage', 'quickstart', 'en')
    expect(docsRequestKey('next', 'quickstart', 'en')).not.toBe(current)
    expect(docsRequestKey('stage', 'census', 'en')).not.toBe(current)
    expect(docsRequestKey('stage', 'quickstart', 'es')).not.toBe(current)
  })

  it('does not collide across slugs that share a prefix', () => {
    expect(docsRequestKey('stage', 'census', 'en')).not.toBe(docsRequestKey('stage', 'census-api', 'en'))
  })
})
