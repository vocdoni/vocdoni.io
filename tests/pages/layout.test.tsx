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

const mockedUsePageContext = vi.fn<() => Record<string, any>>(() => ({
  initialLocale: 'en',
  initialI18nStore: { en: { common: {} } },
  locale: 'en',
  urlLogical: '/',
}))

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => mockedUsePageContext(),
}))

describe('Layout', () => {
  it('renders main content in normal flow below the sticky navbar', () => {
    mockedUsePageContext.mockReturnValue({
      initialLocale: 'en',
      initialI18nStore: { en: { common: {} } },
      locale: 'en',
      urlLogical: '/',
      isCompatibilityRedirect: false,
    })

    const html = renderToStaticMarkup(
      <Layout>
        <div>Child</div>
      </Layout>
    )
    expect(html).toContain('id="main-content"')
    expect(html).toContain('data-testid="navbar"')
  })

  it('renders a redirect-only shell for compatibility routes', () => {
    mockedUsePageContext.mockReturnValue({
      initialLocale: 'en',
      initialI18nStore: { en: { common: {} } },
      locale: 'en',
      urlLogical: '/privacy',
      isCompatibilityRedirect: true,
      is404: false,
    })

    const html = renderToStaticMarkup(
      <Layout>
        <div>Child</div>
      </Layout>
    )

    expect(html).toContain('data-compatibility-redirect="true"')
    expect(html).toContain('window.location.replace(targetUrl)')
    expect(html).not.toContain('data-testid="navbar"')
  })
})
