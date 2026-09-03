import {
  DEVELOPERS_GITHUB_URL,
  DEVELOPERS_PROTOCOL_URL,
  DEVELOPERS_SDK_URL,
  DEVELOPERS_SKILLS_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
} from '../developers'

/**
 * Structure of the curated `/llms.txt`. Contains NO copy: every heading, title and
 * note is an i18n key resolved out of `locales/<code>/common.json` at build time
 * (see lib/llms/strings.ts), so the index ships in all 11 locales.
 *
 * The catalog also contains no page lists. `family` blocks are expanded from the
 * slugs discovered on disk (lib/llms/routes.ts) and each note key is derived from the
 * slug, so a page can never appear here without a note, and a note can never survive
 * the page being deleted. tests/lib/llms/catalog.test.ts enforces both directions.
 *
 * Pulled into the Vite config bundle - relative imports only.
 */

export type FamilyName = 'solutions' | 'learn' | 'case-studies'

export type CuratedBlock =
  /** Internal page. `route` is locale-stripped; the locale prefix is added at build. */
  | { type: 'route'; route: string; titleKey: string; noteKey: string }
  /** Off-site URL, taken from lib/developers.ts rather than typed by hand. */
  | { type: 'external'; url: string; titleKey: string; noteKey: string }
  /** Blog post by slug. Title comes from the post's own frontmatter. */
  | { type: 'post'; slug: string; noteKey: string }
  /** Every child page of a static family, expanded from disk. */
  | { type: 'family'; family: FamilyName }
  /** Every developer doc, grouped by `group:`. Notes come from each doc's own `lead`. */
  | { type: 'docs' }

export const FAMILIES: FamilyName[] = ['solutions', 'learn', 'case-studies']

/** `pages/<family>` -> the `meta.*` namespace holding its titles. */
export const FAMILY_META_NAMESPACE: Record<FamilyName, string> = {
  solutions: 'solutions',
  learn: 'learn',
  'case-studies': 'case_studies',
}

export interface CuratedSection {
  id: string
  blocks: CuratedBlock[]
}

/** i18n key holding the note for one child of a family. */
export const familyNoteKey = (family: FamilyName, slug: string) =>
  `llms.notes.${family.replace(/-/g, '_')}.${slug.replace(/-/g, '_')}`

export const sectionHeadingKey = (id: string) => `llms.sections.${id}`

export const SUMMARY_KEY = 'llms.summary'
export const INTRO_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((p) => `llms.intro.${p}`)
export const OPTIONAL_SECTION_ID = 'optional'
export const LLMS_FULL_NOTE_KEY = 'llms.notes.optional.full'
export const LLMS_FULL_TITLE_KEY = 'llms.titles.full_index'

export const CURATED_SECTIONS: CuratedSection[] = [
  {
    id: 'products',
    blocks: [
      { type: 'route', route: '/app', titleKey: 'llms.titles.product_app', noteKey: 'llms.notes.products.app' },
      { type: 'route', route: '/pricing', titleKey: 'meta.pricing.title', noteKey: 'llms.notes.products.pricing' },
      // TODO: repoint at /projects once that page ships (tracked as a separate change).
      {
        type: 'route',
        route: '/contact',
        titleKey: 'llms.titles.product_projects',
        noteKey: 'llms.notes.products.projects',
      },
      { type: 'route', route: '/developers', titleKey: 'llms.titles.product_api', noteKey: 'llms.notes.products.api' },
    ],
  },
  {
    id: 'organizations',
    blocks: [
      {
        type: 'route',
        route: '/solutions',
        titleKey: 'meta.solutions_index.title',
        noteKey: 'llms.notes.solutions_index',
      },
      { type: 'family', family: 'solutions' },
    ],
  },
  {
    id: 'security',
    blocks: [
      { type: 'route', route: '/learn', titleKey: 'meta.learn_index.title', noteKey: 'llms.notes.learn_index' },
      { type: 'family', family: 'learn' },
      {
        type: 'post',
        slug: 'what-political-parties-need-from-an-online-voting-provider',
        noteKey: 'llms.notes.posts.provider_standards',
      },
    ],
  },
  {
    id: 'proof',
    blocks: [
      {
        type: 'route',
        route: '/case-studies',
        titleKey: 'meta.case_studies_index.title',
        noteKey: 'llms.notes.case_studies_index',
      },
      { type: 'family', family: 'case-studies' },
      { type: 'post', slug: 'consulta-docents-sindicats-2026', noteKey: 'llms.notes.posts.teachers' },
      {
        type: 'post',
        slug: 'how-vocdoni-and-society22-secured-the-2026-coordination-council-of-belarus-election',
        noteKey: 'llms.notes.posts.belarus_2026',
      },
      {
        type: 'post',
        slug: 'how-plataforma-per-la-llengua-runs-online-voting-for-an-association-with-members-across-four-states',
        noteKey: 'llms.notes.posts.plataforma',
      },
      {
        type: 'post',
        slug: 'how-upc-and-the-davinci-protocol-used-university-credentials-to-run-a-private-verifiable-student-vote',
        noteKey: 'llms.notes.posts.upc',
      },
    ],
  },
  {
    id: 'developers',
    blocks: [
      { type: 'docs' },
      {
        type: 'external',
        url: DEVELOPERS_SWAGGER_URL,
        titleKey: 'llms.titles.openapi',
        noteKey: 'llms.notes.developers.openapi',
      },
      { type: 'external', url: DEVELOPERS_SDK_URL, titleKey: 'llms.titles.sdk', noteKey: 'llms.notes.developers.sdk' },
      {
        type: 'external',
        url: DEVELOPERS_SKILLS_URL,
        titleKey: 'llms.titles.skills',
        noteKey: 'llms.notes.developers.skills',
      },
      {
        type: 'external',
        url: DEVELOPERS_STATUS_URL,
        titleKey: 'llms.titles.status',
        noteKey: 'llms.notes.developers.status',
      },
    ],
  },
  {
    id: 'protocol',
    blocks: [
      {
        type: 'external',
        url: DEVELOPERS_PROTOCOL_URL,
        titleKey: 'llms.titles.protocol',
        noteKey: 'llms.notes.protocol.davinci',
      },
      {
        type: 'external',
        url: 'https://explorer.vote',
        titleKey: 'llms.titles.explorer',
        noteKey: 'llms.notes.protocol.explorer',
      },
      {
        type: 'external',
        url: DEVELOPERS_GITHUB_URL,
        titleKey: 'llms.titles.github',
        noteKey: 'llms.notes.protocol.github',
      },
      { type: 'post', slug: 'davinci-universal-voting-protocol', noteKey: 'llms.notes.posts.davinci' },
      {
        type: 'post',
        slug: 'from-blockchain-voting-to-cryptographic-voting',
        noteKey: 'llms.notes.posts.cryptographic',
      },
      { type: 'post', slug: 'anonymous-voting-zksnarks', noteKey: 'llms.notes.posts.zksnarks' },
      { type: 'post', slug: 'introducing-ni-dkg', noteKey: 'llms.notes.posts.nidkg' },
    ],
  },
  {
    id: 'company',
    blocks: [
      { type: 'route', route: '/about-us', titleKey: 'meta.about_us.title', noteKey: 'llms.notes.company.about' },
      { type: 'route', route: '/use-cases', titleKey: 'meta.use_cases.title', noteKey: 'llms.notes.company.use_cases' },
      { type: 'route', route: '/blog', titleKey: 'meta.blog_index.title', noteKey: 'llms.notes.company.blog' },
      { type: 'route', route: '/privacy', titleKey: 'meta.privacy.title', noteKey: 'llms.notes.company.privacy' },
      { type: 'route', route: '/terms', titleKey: 'meta.terms.title', noteKey: 'llms.notes.company.terms' },
    ],
  },
]

/** Every i18n key the catalog references directly, for the locale-completeness test. */
export function catalogStringKeys(): string[] {
  const keys = [
    SUMMARY_KEY,
    ...INTRO_KEYS,
    sectionHeadingKey(OPTIONAL_SECTION_ID),
    LLMS_FULL_TITLE_KEY,
    LLMS_FULL_NOTE_KEY,
  ]
  for (const section of CURATED_SECTIONS) {
    keys.push(sectionHeadingKey(section.id))
    for (const block of section.blocks) {
      if (block.type === 'family' || block.type === 'docs') continue
      keys.push(block.noteKey)
      if (block.type !== 'post') keys.push(block.titleKey)
    }
  }
  return keys
}
