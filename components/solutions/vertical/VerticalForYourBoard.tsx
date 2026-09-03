import { ArrowRightIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalPanel } from '@/components/solutions/vertical/VerticalPanel'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalBoardLink, type VerticalContent } from '@/components/solutions/vertical/types'

/**
 * For the reader who has to write the memo.
 *
 * This buyer never signs alone: the decision happens in a governing board
 * meeting weeks later, in a document they have to produce, and the lawyer, the
 * electoral board and the treasurer each need a different part of this page.
 * Every section already carries a real `id`; nothing surfaced them, so they
 * could not send anyone a link to the part that mattered.
 *
 * Returns `null` when the locale has no board block yet.
 */
export function VerticalForYourBoard({ board, pageId }: { board?: VerticalContent['board']; pageId: string }) {
  const links = asArray<VerticalBoardLink>(board?.links)
  if (!board || links.length === 0) return null

  return (
    <VerticalSection sectionId='for-your-board' pageId={pageId}>
      <Container className='max-w-4xl'>
        <SectionHeader size='section' align='left' eyebrow={board.eyebrow} title={board.title} lede={board.intro} />

        <ul className='mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2'>
          {links.map((link) => (
            <li key={link.anchor}>
              <a
                href={`#${link.anchor}`}
                className='focus-visible:ring-ring rounded-card block h-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
              >
                <VerticalPanel
                  as='article'
                  surface='outline'
                  padding='md'
                  interactive
                  className='group flex h-full flex-col gap-2'
                >
                  <h3 className='leading-snug font-semibold text-balance'>{link.label}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{link.description}</p>
                  <ArrowRightIcon
                    className='text-muted-foreground group-hover:text-primary mt-auto ml-auto size-4 transition-[color,transform] duration-200 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </VerticalPanel>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </VerticalSection>
  )
}

export default VerticalForYourBoard
