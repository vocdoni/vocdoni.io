import {
  Building2Icon,
  BuildingIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HandshakeIcon,
  HeartHandshakeIcon,
  LandmarkIcon,
  type LucideIcon,
  MegaphoneIcon,
  TrophyIcon,
  UsersIcon,
} from 'lucide-react'

/**
 * Canonical list of the organization types we publish a landing page for.
 * Order is the one shown on the /solutions hub. Copy lives in i18n under
 * `solutions_index.cards.<slug>`, so consumers pair a slug with its own `t(...)` call.
 */
export const SOLUTION_VERTICALS = [
  { slug: 'associations', href: '/solutions/associations', icon: UsersIcon },
  { slug: 'cooperatives', href: '/solutions/cooperatives', icon: HandshakeIcon },
  { slug: 'professional_associations', href: '/solutions/professional-associations', icon: BriefcaseIcon },
  { slug: 'political_parties', href: '/solutions/political-parties', icon: Building2Icon },
  { slug: 'municipalities', href: '/solutions/municipalities', icon: LandmarkIcon },
  { slug: 'sports_clubs', href: '/solutions/sports-clubs', icon: TrophyIcon },
  { slug: 'ngos', href: '/solutions/ngos', icon: HeartHandshakeIcon },
  { slug: 'universities', href: '/solutions/universities', icon: GraduationCapIcon },
  { slug: 'companies_agm', href: '/solutions/companies-agm', icon: BuildingIcon },
  { slug: 'trade_unions', href: '/solutions/trade-unions', icon: MegaphoneIcon },
] as const satisfies readonly { slug: string; href: string; icon: LucideIcon }[]

export type SolutionVertical = (typeof SOLUTION_VERTICALS)[number]
export type SolutionVerticalSlug = SolutionVertical['slug']

/** Slugs are checked at compile time, so a hit is guaranteed. */
export const getSolutionVertical = (slug: SolutionVerticalSlug): SolutionVertical =>
  SOLUTION_VERTICALS.find((vertical) => vertical.slug === slug) as SolutionVertical
