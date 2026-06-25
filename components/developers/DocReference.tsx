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

// Renders the frontmatter `reference` section ("where to go next" / "references
// and repositories") as a titled card grid. Lives in frontmatter so it stays
// out of the LLM-facing markdown and can carry per-card icons.
export function DocReference({ reference }: { reference: DocReferenceData }) {
  return (
    <section className='mt-12'>
      <h2 className='mb-4 text-2xl font-semibold tracking-tight text-foreground'>{reference.title}</h2>
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
