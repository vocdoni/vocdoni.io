import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import Page from '@/pages/_error/+Page'

let mockedIs404 = false

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ is404: mockedIs404 }),
}))

describe('Error Page', () => {
  it('renders a padded, centered layout for 500 errors', () => {
    mockedIs404 = false
    const html = renderToStaticMarkup(<Page />)
    expect(html).toContain('pt-24')
    expect(html).toContain('text-center')
  })

  it('renders a padded, centered layout for 404 errors', () => {
    mockedIs404 = true
    const html = renderToStaticMarkup(<Page />)
    expect(html).toContain('pt-24')
    expect(html).toContain('text-center')
  })
})
