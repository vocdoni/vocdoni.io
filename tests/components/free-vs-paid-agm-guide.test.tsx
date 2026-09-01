import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { FreeVsPaidAgmGuide } from '@/components/agm/FreeVsPaidAgmGuide'
import { AGM_PLAN_SOURCE } from '@/lib/content/free-vs-paid-agm'

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/components/Link', () => ({
  Link: ({
    children,
    href,
    variant: _variant,
    ctaId: _ctaId,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: string; ctaId?: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Free versus paid AGM guide', () => {
  const html = renderToStaticMarkup(<FreeVsPaidAgmGuide />)

  it('states the exact Free plan limits', () => {
    expect(html).toContain('up to 100 members, five counted votes each year, and one administrator')
    expect(html).toContain('100 email')
    expect(html).toContain('test votes')
  })

  it('states the current paid plan limits and prices', () => {
    expect(html).toContain('€69 monthly or €590 yearly')
    expect(html).toContain('€199 monthly or €1,890 yearly')
    expect(html).toContain('1,000 email + 1,000 SMS')
    expect(html).toContain('5,000 email + 5,000 SMS')
  })

  it('links the comparison to the primary plan source', () => {
    expect(html).toContain(`href="${AGM_PLAN_SOURCE}"`)
    expect(html).toContain('Plans reviewed 1 September 2026')
  })

  it('keeps managed election services separate from self-service plans', () => {
    expect(html).toContain('Managed elections are not a paid plan tier')
    expect(html).toContain('The prices above cover Vocdoni&#x27;s self-service app')
    expect(html).toContain('href="/contact"')
  })
})
