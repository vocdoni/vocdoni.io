import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import Layout from '@/pages/+Layout'

vi.mock('@/components/CookieConsent', () => ({
  CookieConsent: () => <div data-testid='cookie-consent' />,
}))

vi.mock('@/components/Navbar', () => ({
  Navbar: () => <div data-testid='navbar' />,
}))

vi.mock('@/components/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid='footer' />,
}))

vi.mock('@/lib/useLocaleDetection', () => ({
  useLocaleDetection: () => undefined,
}))

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({
    initialLocale: 'en',
    initialI18nStore: { en: { common: {} } },
    locale: 'en',
    urlLogical: '/',
  }),
}))

describe('Layout', () => {
  it('adds top padding to keep content clear of the fixed navbar', () => {
    const html = renderToStaticMarkup(
      <Layout>
        <div>Child</div>
      </Layout>
    )
    expect(html).toContain('pt-24')
  })
})
