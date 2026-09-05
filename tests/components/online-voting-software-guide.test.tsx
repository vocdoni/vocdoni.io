import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { OnlineVotingSoftwareGuide } from '@/components/comparisons/OnlineVotingSoftwareGuide'
import { onlineVotingSoftwareContent } from '@/lib/content/online-voting-software'

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

describe('Online voting software guide', () => {
  const html = renderToStaticMarkup(<OnlineVotingSoftwareGuide content={onlineVotingSoftwareContent} />)

  it('compares service models and four vendors without ranking them', () => {
    expect(html).toContain('Self-service voting tool')
    expect(html).toContain('Managed election service')
    expect(html).toContain('Full meeting suite')
    expect(html).toContain('Vocdoni')
    expect(html).toContain('ElectionBuddy')
    expect(html).toContain('Simply Voting')
    expect(html).toContain('OpaVote')
    expect(html).not.toMatch(/best online voting software/i)
  })

  it('links every vendor and the meeting-suite example to an official source', () => {
    expect(html).toContain('href="https://vocdoni.io/en/app"')
    expect(html).toContain('href="https://electionbuddy.com/features/"')
    expect(html).toContain('href="https://electionbuddy.com/pricing/"')
    expect(html).toContain('href="https://www.simplyvoting.com/online-voting/"')
    expect(html).toContain('href="https://www.simplyvoting.com/pricing/"')
    expect(html).toContain('href="https://opavote.com/methods/overview"')
    expect(html).toContain('href="https://opavote.com/pricing"')
    expect(html).toContain('href="https://www.lumiglobal.com/agm"')
  })

  it('states Vocdoni limits and avoids unverified product claims', () => {
    expect(html).toContain('does not offer ranked ballots')
    expect(html).toContain('does not replace an AGM broadcast and question platform')
    expect(html).not.toMatch(/accessibility|on-premise|downloadable reports/i)
  })

  it('connects the selection shelf to every required route', () => {
    expect(html).toContain('href="/"')
    expect(html).toContain('href="/solutions/companies-agm"')
    expect(html).toContain('href="/pricing"')
    expect(html).toContain('href="/alternatives/electionbuddy-alternatives"')
    expect(html).toContain('href="/customers-and-deployments"')
    expect(html).toContain('href="/voting-verification-checklist"')
  })
})
