import { EyeOffIcon, type LucideIcon, ScanSearchIcon, ShieldCheckIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalPanel } from '@/components/solutions/vertical/VerticalPanel'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalItem } from '@/components/solutions/vertical/types'

interface VerticalGuaranteesProps {
  guarantees?: VerticalContent['guarantees']
  pageId: string
}

/** One icon per guarantee, in the order the content lists them. */
const ICONS: LucideIcon[] = [EyeOffIcon, ScanSearchIcon, ShieldCheckIcon]

/**
 * The three properties the module adds, stated as what the reader gets.
 *
 * This replaces the problem-and-answer cards the other verticals use. On a page
 * whose comparison table already sets today against the module row by row, a
 * problem-and-answer section argues the same three points a second time, and
 * repeats its own label once per card. Naming the guarantees affirmatively says
 * it once and leaves the table to carry the detail.
 *
 * Returns null when the locale has no guarantees block, so a vertical that has
 * not adopted it renders nothing rather than an empty section.
 */
export function VerticalGuarantees({ guarantees, pageId }: VerticalGuaranteesProps) {
  const items = asArray<VerticalItem>(guarantees?.items)
  if (!guarantees || items.length === 0) return null

  return (
    <VerticalSection sectionId='stakes' pageId={pageId} className='bg-muted/50'>
      <Container className='max-w-5xl'>
        <SectionHeader size='section' eyebrow={guarantees.eyebrow} title={guarantees.title} lede={guarantees.intro} />

        <ul className='mt-12 grid gap-4 sm:mt-16 md:grid-cols-3'>
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <VerticalPanel as='li' key={item.title} surface='raised' padding='lg' className='flex flex-col gap-3'>
                <div className='bg-primary/10 text-primary inline-flex size-11 items-center justify-center rounded-lg'>
                  <Icon className='size-5' aria-hidden='true' />
                </div>
                <h3 className='text-lg leading-snug font-semibold text-balance'>{item.title}</h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>{item.description}</p>
              </VerticalPanel>
            )
          })}
        </ul>
      </Container>
    </VerticalSection>
  )
}

export default VerticalGuarantees
