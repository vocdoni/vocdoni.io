import { authorInitials, formatDate } from '@/lib/blog/format'
import { describe, expect, it } from 'vitest'

describe('blog format helpers', () => {
  it('formats an ISO date for a locale', () => {
    expect(formatDate('2026-03-03', 'en')).toBe('March 3, 2026')
  })

  it('returns the raw value for an invalid date', () => {
    expect(formatDate('not-a-date', 'en')).toBe('not-a-date')
  })

  it('derives up to two uppercase initials', () => {
    expect(authorInitials('Jordi Pinyana')).toBe('JP')
    expect(authorInitials('Ferran')).toBe('F')
    expect(authorInitials('Pau Escrich Garcia')).toBe('PE')
  })
})
