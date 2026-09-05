import { describe, expect, it } from 'vitest'

import { customersAndDeploymentsContent } from '@/lib/content/customers-and-deployments'

describe('customers and deployments evidence registry', () => {
  it('keeps every record dated, scoped, and directly sourced', () => {
    expect(customersAndDeploymentsContent.reviewed).toMatch(/reviewed/i)
    expect(customersAndDeploymentsContent.records).toHaveLength(3)

    for (const record of customersAndDeploymentsContent.records) {
      expect(record.relationship).toBeTruthy()
      expect(record.date).toBeTruthy()
      expect(record.electorate).toBeTruthy()
      expect(record.ballots).toBeTruthy()
      expect(record.turnout).toBeTruthy()
      expect(record.productRole).toBeTruthy()
      expect(record.evidenceNote).toBeTruthy()
      expect(record.sources.length).toBeGreaterThanOrEqual(2)
      expect(record.sources.every((source) => source.href && source.publisher && source.supports)).toBe(true)
    }
  })

  it('excludes relationships without approved primary evidence', () => {
    const serialized = JSON.stringify(customersAndDeploymentsContent)

    expect(serialized).not.toContain('Decidim')
    expect(serialized).not.toContain('FC Barcelona')
  })

  it('returns buyers to the software selection guide', () => {
    expect(customersAndDeploymentsContent.relatedLink).toBe('Read the online voting software guide')
  })
})
