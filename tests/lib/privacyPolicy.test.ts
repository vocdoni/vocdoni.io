import { describe, expect, it } from 'vitest'

import { PRIVACY_POLICY_REVISION_DATE, formatPolicyRevisionDate } from '@/lib/privacyPolicy'

describe('PRIVACY_POLICY_REVISION_DATE', () => {
  it('is an ISO calendar date, so it sorts against a stored consent record', () => {
    expect(PRIVACY_POLICY_REVISION_DATE).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

describe('formatPolicyRevisionDate', () => {
  it('renders the revision date the way each policy page writes dates', () => {
    expect(formatPolicyRevisionDate('en', '2026-08-28')).toBe('28 August 2026')
    expect(formatPolicyRevisionDate('es', '2026-08-28')).toBe('28 de agosto de 2026')
    expect(formatPolicyRevisionDate('ca', '2026-08-28')).toBe("28 d'agost de 2026")
  })

  it('keeps the Catalan preposition unelided before a consonant month', () => {
    expect(formatPolicyRevisionDate('ca', '2027-01-15')).toBe('15 de gener de 2027')
    expect(formatPolicyRevisionDate('ca', '2027-10-01')).toBe("1 d'octubre de 2027")
  })

  it('defaults to the published revision, so the pages cannot drift from the consent cut-off', () => {
    for (const language of ['ca', 'en', 'es'] as const) {
      expect(formatPolicyRevisionDate(language)).toBe(formatPolicyRevisionDate(language, PRIVACY_POLICY_REVISION_DATE))
    }
  })
})
