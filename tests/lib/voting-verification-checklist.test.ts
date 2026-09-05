import { describe, expect, it } from 'vitest'

import { votingVerificationChecklistContent } from '@/lib/content/voting-verification-checklist'

describe('voting verification checklist', () => {
  it('separates the four verification roles', () => {
    expect(votingVerificationChecklistContent.roles.map((role) => role.id)).toEqual([
      'voter',
      'observer',
      'tally',
      'auditor',
    ])
  })

  it('links every role and direct answer to public evidence', () => {
    expect(votingVerificationChecklistContent.answerSources.length).toBeGreaterThanOrEqual(4)

    for (const source of votingVerificationChecklistContent.answerSources) {
      expect(source.href).toBeTruthy()
      expect(source.supports).toBeTruthy()
    }

    for (const role of votingVerificationChecklistContent.roles) {
      expect(role.checks.length).toBeGreaterThanOrEqual(3)
      expect(role.sources.length).toBeGreaterThanOrEqual(1)
      expect(role.sources.every((source) => source.href && source.supports)).toBe(true)
    }
  })

  it('states the administrative evidence boundary', () => {
    expect(votingVerificationChecklistContent.boundaryText).toMatch(/does not document every login/i)
    expect(votingVerificationChecklistContent.boundarySource.href).toBe('/security-accessibility')
  })
})
