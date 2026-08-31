import { type LucideIcon } from 'lucide-react'

import type { Testimonial } from '@/lib/testimonials-data'

/** A headline figure with the source that backs it. */
export type VerticalStat = { value: string; label: string; source?: string }

/** Generic title + description pair used by the stakes, capability and step lists. */
export type VerticalItem = { title: string; description: string }

/**
 * One legal or statutory layer, and what Vocdoni produces against it. `response`
 * is deliberately a list of artifacts rather than prose: the buyer is picturing
 * the folder they hand to a challenger, not reading a summary of the law.
 */
/** A problem the buyer already has, paired with what changes about it. */
export type VerticalStake = { title: string; description: string; answer: string }

export type VerticalFramework = { name: string; summary: string; response: string[] }

export type VerticalFaqItem = { question: string; answer: string }

export type VerticalComparisonRow = {
  criterion: string
  traditional: string
  /** What a typical commercial online voting provider gives you. */
  digital: string
  vocdoni: string
}

export type VerticalResourceItem = { kind: string; title: string; description: string }

/** One dated step on the run-up to voting day. */
export type VerticalTimelineStep = { when: string; title: string; description: string; owner: string }

/** One organization shape, so the page fits 400 members and 50,000 alike. */
export type VerticalSizeTier = { size: string; title: string; description: string; points: string[] }

/** A deep link the buyer can send to one member of their committee. */
export type VerticalBoardLink = { label: string; description: string; anchor: string }

export type VerticalEngagementOption = {
  badge: string
  title: string
  description: string
  points: string[]
  /** Label for this column's own call to action. */
  cta: string
}

/**
 * Copy contract for a vertical landing page. Every value is translated content
 * read in one `t(..., { returnObjects: true })` call, so a locale can swap the
 * whole narrative - including the jurisdiction-specific legal section, which is
 * the point of the exercise rather than a side effect.
 */
export interface VerticalContent {
  eyebrow: string
  hero: {
    title: string
    subtitle: string
    cta_primary: string
    cta_secondary: string
    risk_reversal: string
  }
  trust: { logos_label: string; badges: string[]; stats: VerticalStat[] }
  stakes: {
    eyebrow: string
    title: string
    intro: string
    items: VerticalStake[]
    /** Label over the answer half of each card, e.g. "what changes". */
    answer_label: string
    /**
     * Transitional: locales still on the older shape carry their answer as one
     * closing paragraph instead of per card. Rendered only when present.
     */
    turn?: string
  }
  legal: {
    eyebrow: string
    title: string
    intro: string
    /** Names the country or scope the frameworks below apply to. */
    jurisdiction_label: string
    /** Ledger column header over the requirement side. */
    requirement_label: string
    response_label: string
    frameworks: VerticalFramework[]
    evidence: { title: string; intro: string }
    disclaimer: string
    cta_secondary: string
    cta_note: string
  }
  proof: {
    eyebrow: string
    title: string
    intro: string
    org: string
    org_meta: string
    stats: VerticalStat[]
    case_study_label: string
    blog_label: string
    cta_primary: string
  }
  how: {
    eyebrow: string
    title: string
    intro: string
    features: VerticalItem[]
    /** Caption for the electoral board console screenshot. */
    media_caption: string
    steps_title: string
    steps: VerticalItem[]
    /** Caption for the member ballot screenshot. */
    steps_media_caption: string
    footnote: string
  }
  comparison: {
    eyebrow: string
    title: string
    intro: string
    criterion_label: string
    traditional_label: string
    digital_label: string
    vocdoni_label: string
    rows: VerticalComparisonRow[]
  }
  engagement: {
    eyebrow: string
    title: string
    intro: string
    options: VerticalEngagementOption[]
    recommendation: { title: string; description: string }
    pricing: { title: string; description: string; link_label: string }
  }
  timeline?: { eyebrow: string; title: string; intro: string; steps: VerticalTimelineStep[]; footnote: string }
  sizes?: { eyebrow: string; title: string; intro: string; tiers: VerticalSizeTier[] }
  faq: { eyebrow: string; title: string; intro: string; items: VerticalFaqItem[] }
  board?: { eyebrow: string; title: string; intro: string; links: VerticalBoardLink[] }
  closing: { title: string; description: string; cta_primary: string; cta_secondary: string; note: string }
  resources: { eyebrow: string; title: string; intro: string; items: VerticalResourceItem[] }
}

export type VerticalLogo = { src: string; alt: string }

/** Destination for a resource card, matched to `content.resources.items` by index. */
export type VerticalResourceLink = { href: string }

export interface VerticalPageProps {
  /** Icon shown beside the hero eyebrow. */
  icon: LucideIcon
  content: VerticalContent
  /** Vertical-tagged signup URL, used by every primary CTA on the page. */
  appHref: string
  /**
   * Prefix for the analytics `ctaId` of every tracked link, e.g. `pro_bodies`.
   * The vertical has to live in the id because `trackAppCtaClick` records only
   * `destination_path` and drops the `?type=` query string.
   */
  ctaPrefix: string
  logos: VerticalLogo[]
  caseStudy: { logo: string; image?: string; href: string; blogHref: string }
  pricingHref: string
  /** Quotes placed next to the argument each one corroborates, not in a gallery. */
  quotes: { stakes?: Testimonial; how?: Testimonial; proof?: Testimonial }
  resourceLinks: VerticalResourceLink[]
}

export const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])
