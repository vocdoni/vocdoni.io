// @vitest-environment jsdom

import { DocsDataProvider, docsRequestKey } from '@/hooks/useDocsData'
import { loadRemoteDocsData } from '@/lib/docs/remote-load'
import { render, waitFor } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

const version = vi.hoisted(() => ({ current: { id: 'stage', branch: 'stage', environment: 'staging' } }))

vi.mock('@/hooks/useDocsVersion', () => ({
  useDocsVersion: () => ({ version: version.current, setVersionId: () => {} }),
}))
vi.mock('vike-react/useData', () => ({
  useData: () => ({ doc: { slug: 'quickstart', locale: 'en' }, nav: [] }),
}))
vi.mock('@/lib/docs/remote-load', () => ({
  loadRemoteDocsData: vi.fn(async () => ({ doc: null, nav: [] })),
}))

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

describe('DocsDataProvider', () => {
  it('loads a remote version with the environment of that version', async () => {
    version.current = { id: 'stage', branch: 'stage', environment: 'staging' }

    render(React.createElement(DocsDataProvider, null, null))

    await waitFor(() => expect(loadRemoteDocsData).toHaveBeenCalledWith('stage', 'quickstart', 'en', 'staging'))
  })
})
