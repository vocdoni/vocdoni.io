import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { Navbar } from '@/components/Navbar'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({
    locale: 'en',
    urlLogical: '/',
  }),
}))

vi.mock('@/components/LanguageSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid='language-switcher' />,
}))

vi.mock('@/components/Logo', () => ({
  __esModule: true,
  default: () => <div data-testid='logo' />,
}))

vi.mock('@/assets/navbar_app_highlight.webp', () => ({
  default: '/test-navbar-image.webp',
}))

vi.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  NavigationMenuList: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  NavigationMenuItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  NavigationMenuTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  NavigationMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  NavigationMenuLink: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  navigationMenuTriggerStyle: () => 'nav-trigger',
}))

vi.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean }) =>
    asChild ? <>{children}</> : <button {...props}>{children}</button>,
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

describe('Navbar', () => {
  it('uses the updated external links and simplified sections', () => {
    const html = renderToStaticMarkup(<Navbar />)

    expect(html).toContain('href="https://developer.vocdoni.io/sdk"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('href="https://developer.vocdoni.io"')
    expect(html).not.toContain('href="/guides"')
    expect(html).toContain('href="/en/about-us"')
    expect(html).not.toContain('href="/en/about/mission"')
    expect(html).toContain('Open custom project booking')
  })
})
