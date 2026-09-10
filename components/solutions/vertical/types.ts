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
export type VerticalStake = { title: string; description: string; answer?: string }

export type VerticalFramework = { name: string; summary: string; response: string[] }

export type VerticalFaqItem = { question: string; answer: string }

/**
 * Signal shown beside a comparison cell. Absent means plain text, which is what
 * every vertical shipped with, so no existing locale has to change.
 */
export type VerticalComparisonStatus = 'positive' | 'negative' | 'neutral'

export type VerticalComparisonRow = {
  criterion: string
  traditional: string
  /** What a typical commercial online voting provider gives you. Optional: a
   *  vertical without this copy falls back to the two-column comparison. */
  digital?: string
  vocdoni: string
  traditional_status?: VerticalComparisonStatus
  digital_status?: VerticalComparisonStatus
  vocdoni_status?: VerticalComparisonStatus
}

/**
 * A third-party mark with its attribution, for a page whose subject is built
 * with or for another platform. It never sits in the customer logo row, where
 * it would read as a customer reference.
 */
export type VerticalPartner = {
  eyebrow: string
  title: string
  description: string
  points?: string[]
  cta: string
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
    /** Reassurance line under the buttons. Optional: a page can run without one. */
    risk_reversal?: string
  }
  trust: {
    logos_label: string
    badges: string[]
    /** Headline figures under the badges. Optional: a page whose badges already
     *  carry the claims renders the band without a figure strip. */
    stats?: VerticalStat[]
    /**
     * Attribution required when a third-party mark appears in the logo row.
     * Rendered directly under it, so it can never drift away from the logo it
     * refers to.
     */
    trademark_note?: string
  }
  /**
   * Rendered by VerticalGuarantees, for a page that states what it adds rather
   * than pairing each problem with its answer.
   */
  guarantees?: { eyebrow: string; title: string; intro: string; items: VerticalItem[] }
  stakes?: {
    eyebrow: string
    title: string
    intro: string
    items: VerticalStake[]
    /** Label over the answer half of each card, e.g. "what changes". */
    answer_label: string
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
    /** One line at the foot of the ledger: who states the framework, and where
     *  the legal reading belongs. Not the long disclaimer that preceded it. */
    counsel_note?: string
    cta_secondary: string
  }
  /** Rendered by VerticalPartnerBand; pages that compose the kit directly opt in. */
  partner?: VerticalPartner
  proof?: {
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
    /** The member's own steps. Optional: a page whose mechanism is already
     *  covered by the feature grid leaves them out, and the section skips the
     *  whole block including the footnote. */
    steps_title?: string
    steps?: VerticalItem[]
    /** Caption for the member ballot screenshot. */
    steps_media_caption?: string
    footnote?: string
  }
  comparison: {
    eyebrow: string
    title: string
    intro: string
    criterion_label: string
    traditional_label: string
    /** Absent for a vertical with no provider column; see `digital` above. */
    digital_label?: string
    vocdoni_label: string
    rows: VerticalComparisonRow[]
  }
  engagement: {
    eyebrow: string
    title: string
    intro: string
    options: VerticalEngagementOption[]
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
   * Overrides the secondary CTA destination in the hero and the closing block,
   * for a page whose primary ask is already `/contact` and whose secondary is
   * therefore something else.
   *
   * Deliberately not threaded into the legal or engagement sections. Both also
   * render a secondary, and for both `/contact` is the correct destination - a
   * global override would silently hijack them.
   */
  secondaryHref?: string
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
