import { describe, expect, it } from 'vitest'

import { formatPercent } from '@/components/solutions/mockups/decidim-types'

describe('formatPercent', () => {
  // Decidim's number_to_percentage(precision: 1): one decimal, the locale's
  // separator and the percent sign where that locale puts it, after a no-break space where it uses one.
  it('places the percent sign the way each locale writes it', () => {
    expect(formatPercent('en', 611, 1137)).toBe('53.7%')
    expect(formatPercent('de', 611, 1137)).toBe('53,7\u00a0%')
    expect(formatPercent('es', 611, 1137)).toBe('53,7\u00a0%')
    expect(formatPercent('ca', 611, 1137)).toBe('53,7\u00a0%')
    expect(formatPercent('eu', 611, 1137)).toBe('%\u00a053,7')
  })

  it('shows zero rather than dividing by an empty census', () => {
    expect(formatPercent('en', 0, 0)).toBe('0.0%')
  })
})
