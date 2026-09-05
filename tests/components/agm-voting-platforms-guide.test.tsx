import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { AgmVotingPlatformsGuide } from '@/components/comparisons/AgmVotingPlatformsGuide'

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/components/Link', () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('AGM voting platforms guide', () => {
  const html = renderToStaticMarkup(<AgmVotingPlatformsGuide />)

  it('separates voting layers from full AGM meeting suites', () => {
    expect(html).toContain('Voting layer')
    expect(html).toContain('Full AGM meeting suite')
    expect(html).toContain('Vocdoni')
    expect(html).toContain('ElectionBuddy')
    expect(html).toContain('POLYAS')
    expect(html).toContain('Lumi Global')
    expect(html).toContain('Vero AGM')
  })

  it('states the Vocdoni boundary and avoids unverified product claims', () => {
    expect(html).toContain('does not replace a full AGM meeting suite')
    expect(html).toContain('does not provide the broadcast')
    expect(html).not.toMatch(/email authentication|sms authentication|anonymous voting|pdf reports/i)
  })

  it('links vendor capabilities and prices to official sources', () => {
    expect(html).toContain('href="https://vocdoni.io/en/app"')
    expect(html).toContain('href="https://app.vocdoni.io/en/plans"')
    expect(html).toContain('href="https://electionbuddy.com/pricing/"')
    expect(html).toContain('href="https://www.polyas.com/products/pricing/live-voting"')
    expect(html).toContain('href="https://www.lumiglobal.com/agm"')
    expect(html).toContain('href="https://www.verovoting.com.au/request-a-quote/"')
  })

  it('connects the AGM buying shelf', () => {
    expect(html).toContain('href="/solutions/companies-agm"')
    expect(html).toContain('href="/pricing"')
    expect(html).toContain('href="/compare/online-voting-software"')
    expect(html).toContain('href="/alternatives/electionbuddy-alternatives"')
    expect(html).toContain('href="/agm-voting/free-vs-paid"')
    expect(html).toContain('href="/customers-and-deployments"')
    expect(html).toContain('href="/voting-verification-checklist"')
  })
})
