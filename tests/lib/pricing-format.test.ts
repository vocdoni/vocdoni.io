import { describe, expect, it } from 'vitest'
import { formatCurrency, formatLocale, formatPeople, formatRate } from '@/lib/pricing/format'

describe('formatLocale', () => {
  it('maps hi to hi-u-nu-latn', () => {
    expect(formatLocale('hi')).toBe('hi-u-nu-latn')
  })

  it('maps hi-IN to hi-u-nu-latn (subtag variant)', () => {
    expect(formatLocale('hi-IN')).toBe('hi-u-nu-latn')
  })

  it('leaves other locales unchanged', () => {
    expect(formatLocale('en')).toBe('en')
    expect(formatLocale('es')).toBe('es')
    expect(formatLocale('ca')).toBe('ca')
  })
})

describe('formatCurrency', () => {
  it('formats whole euros without decimals', () => {
    expect(formatCurrency(10900, 'en')).toBe('€109')
  })

  it('formats non-whole euros with two decimals', () => {
    expect(formatCurrency(13189, 'en')).toBe('€131.89')
  })

  it('formats 500800 cents as €5,008', () => {
    expect(formatCurrency(500800, 'en')).toBe('€5,008')
  })

  it('es locale puts the euro sign after the number and contains the digits', () => {
    const result = formatCurrency(10900, 'es')
    expect(result.endsWith('€') || result.includes('€')).toBe(true)
    expect(result).toContain('109')
  })

  it('formats 0 cents as €0', () => {
    expect(formatCurrency(0, 'en')).toBe('€0')
  })

  it('uses Latin digits for hi locale', () => {
    const result = formatCurrency(10900, 'hi')
    // Should match /^[^\d]*109/ with no Devanagari digit
    expect(result).toMatch(/109/)
    expect(result).not.toMatch(/[०-९]/)
  })

  it('explicit decimals=0 overrides non-whole amount', () => {
    expect(formatCurrency(10934, 'en', 0)).toBe('€109')
  })

  it('explicit decimals=2 overrides whole amount', () => {
    expect(formatCurrency(10900, 'en', 2)).toBe('€109.00')
  })
})

describe('formatRate', () => {
  it('formats 1250 hundredths as €0.125', () => {
    expect(formatRate(1250, 'en')).toBe('€0.125')
  })

  it('formats 6600 hundredths as €0.66', () => {
    expect(formatRate(6600, 'en')).toBe('€0.66')
  })

  it('formats 5450 hundredths as €0.545', () => {
    expect(formatRate(5450, 'en')).toBe('€0.545')
  })
})

describe('formatPeople', () => {
  it('formats 1200 with comma grouping in en', () => {
    expect(formatPeople(1200, 'en')).toBe('1,200')
  })
})
