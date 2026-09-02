import { describe, expect, it } from 'vitest'

import onBeforeRender from '@/pages/+onBeforeRender'

describe('onBeforeRender locale payload', () => {
  it('serializes only the resolved locale for localized 404 pages', () => {
    const result = onBeforeRender({ is404: true, locale: 'es', urlLogical: '/missing' })
    const store = result.pageContext.initialI18nStore

    expect(Object.keys(store)).toEqual(['es'])
    expect(store.es.common).toBeDefined()
    expect(store.en).toBeUndefined()
  })
})
