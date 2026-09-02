import type { Locale } from '@/locales'

/**
 * Which organizations a vertical page shows as proof, per market.
 *
 * Every logo, testimonial and case study on these pages is Spanish or Catalan,
 * while the pages ship in twelve languages: an Italian secretary reading the
 * Italian page currently sees an entirely Spanish reference set. Proof only
 * works when the reader recognises the organisation, so it has to vary by
 * market the way the copy already does.
 *
 * The copy half needs no code: `solutions.<vertical>.proof.*` lives in the
 * per-locale JSON, so each market can already describe its own reference. This
 * is the code half, which was hardcoded in the page.
 *
 * Organizations are named by their `platformName` in `lib/testimonials-data.ts`
 * and their key in the page's own `ORGANIZATIONS` map, so a market override is a
 * list of names rather than a set of imports.
 */
export interface VerticalProofConfig {
  /** Logo order in the trust band. The first is the market's anchor. */
  logos: string[]
  /** Organizations whose testimonial appears beside each argument. */
  quotes: { stakes: string; how: string; proof: string }
  /** Organization featured in the case study block. */
  caseStudy: string
}

/**
 * Spanish and Catalan bodies, where most current clients are. Any locale
 * without an override falls back to this.
 */
const DEFAULT_PROFESSIONAL_ASSOCIATIONS: VerticalProofConfig = {
  logos: ['COIB', 'COEIC', 'ICOES', 'Arxivers', 'ATI'],
  quotes: { stakes: 'ICOES', how: 'Arxivers', proof: 'COIB' },
  caseStudy: 'COIB',
}

/**
 * Per-market overrides. Italy leads with ATI, the one professional body we have
 * on record there, using its real logo and its real attributed quote.
 *
 * Note the honest limit: there is no ATI case study yet, so Italy leads with
 * ATI in the trust band and the featured quote while the case study block stays
 * COIB. When an ATI case study exists, changing `caseStudy` here is the whole
 * job.
 */
const PROFESSIONAL_ASSOCIATIONS_BY_LOCALE: Partial<Record<Locale, Partial<VerticalProofConfig>>> = {
  it: {
    logos: ['ATI', 'COIB', 'COEIC', 'ICOES', 'Arxivers'],
    quotes: { stakes: 'ATI', how: 'Arxivers', proof: 'COIB' },
  },
}

/** Resolve the proof set for a locale, falling back to the default market. */
export function getProfessionalAssociationsProof(locale: Locale): VerticalProofConfig {
  return { ...DEFAULT_PROFESSIONAL_ASSOCIATIONS, ...(PROFESSIONAL_ASSOCIATIONS_BY_LOCALE[locale] ?? {}) }
}

/**
 * Associations and federations. Òmnium is the anchor: the largest membership
 * organisation on the list and the one with a case study, so it leads the band
 * and carries the featured quote.
 *
 * No per-market overrides yet. Every reference here is Catalan, which is the
 * same gap the professional bodies had before ATI: when an association or
 * federation in another market goes on record, it belongs in an override rather
 * than appended to the default.
 */
const DEFAULT_ASSOCIATIONS: VerticalProofConfig = {
  logos: ['Omnium', 'CEC', 'Plataforma', 'AGUICAT', 'Arxivers'],
  quotes: { stakes: 'CEC', how: 'Plataforma', proof: 'Omnium' },
  caseStudy: 'Omnium',
}

const ASSOCIATIONS_BY_LOCALE: Partial<Record<Locale, Partial<VerticalProofConfig>>> = {}

/** Resolve the proof set for a locale, falling back to the default market. */
export function getAssociationsProof(locale: Locale): VerticalProofConfig {
  return { ...DEFAULT_ASSOCIATIONS, ...(ASSOCIATIONS_BY_LOCALE[locale] ?? {}) }
}
