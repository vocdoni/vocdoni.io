import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'

let mockedUrlLogical = '/about'
let mockedLocale: string | undefined = undefined

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ urlLogical: mockedUrlLogical, locale: mockedLocale }),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'es' },
    t: (key: string) => key,
  }),
}))

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('LanguageSwitcher', () => {
  it('renders each locale option as a full-width item', () => {
    const html = renderToStaticMarkup(<LanguageSwitcher />)
    expect(html).toContain('w-full')
  })

  it('builds locale links from paths without existing locale prefixes', () => {
    mockedUrlLogical = '/es/about'
    mockedLocale = 'es'
    const html = renderToStaticMarkup(<LanguageSwitcher />)
    expect(html).toContain('href="/about"')
    expect(html).toContain('href="/es/about"')
  })

  it('links to default locale root without prefix', () => {
    mockedUrlLogical = '/es'
    mockedLocale = 'es'
    const html = renderToStaticMarkup(<LanguageSwitcher />)
    expect(html).toContain('href="/"')
    expect(html).toContain('href="/es"')
  })

  it('keeps pointer cursor on language items', () => {
    mockedUrlLogical = '/es'
    mockedLocale = 'es'
    const html = renderToStaticMarkup(<LanguageSwitcher />)
    const classMatch = html.match(/href="\/"\s+class="([^"]+)"/)
    expect(classMatch).not.toBeNull()
    const classList = classMatch ? classMatch[1] : ''
    const cursorClasses = classList.match(/cursor-[^\s"]+/g) || []
    expect(cursorClasses.at(-1)).toBe('cursor-pointer')
  })
})
