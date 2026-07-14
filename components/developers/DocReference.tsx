import { HEADING_ANCHOR_CLASS, HEADING_ANCHOR_LABEL, HEADING_GROUP_CLASS, PILCROW } from '@/lib/docs/heading-anchor'
import type { DocReference as DocReferenceData } from '@/lib/docs/markdown'
import {
  BookOpen,
  Boxes,
  FileJson,
  Github,
  KeyRound,
  ListChecks,
  type LucideIcon,
  Rocket,
  Terminal,
  Users,
  Vote,
} from 'lucide-react'

import { CardGrid, DocCard } from './CardGrid'

// Frontmatter `icon` names -> lucide icons. Add entries here as docs need them.
const ICONS: Record<string, LucideIcon> = {
  rocket: Rocket,
  key: KeyRound,
  boxes: Boxes,
  users: Users,
  vote: Vote,
  'list-checks': ListChecks,
  'book-open': BookOpen,
  terminal: Terminal,
  'file-json': FileJson,
  github: Github,
}

// Matches the id rehype-slug assigns to markdown headings, so this
// frontmatter-driven heading deep-links and appears in the TOC the same way.
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)

// Renders the frontmatter `reference` section ("where to go next" / "references
// and repositories") as a titled card grid. Lives in frontmatter so it stays
// out of the LLM-facing markdown and can carry per-card icons.
export function DocReference({ reference }: { reference: DocReferenceData }) {
  const id = slugify(reference.title)
  return (
    <section className='mt-12'>
      <h2 id={id} className={`${HEADING_GROUP_CLASS} mb-4 text-2xl text-foreground`}>
        {reference.title}
        <a href={`#${id}`} className={HEADING_ANCHOR_CLASS} aria-label={HEADING_ANCHOR_LABEL}>
          <span aria-hidden='true'>{PILCROW}</span>
        </a>
      </h2>
      <CardGrid columns={reference.columns}>
        {reference.items.map((item) => (
          <DocCard
            key={`${item.href}-${item.title}`}
            href={item.href}
            title={item.title}
            description={item.description}
            icon={item.icon ? ICONS[item.icon] : undefined}
            external={item.external}
          />
        ))}
      </CardGrid>
    </section>
  )
}
