import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalPanel } from '@/components/solutions/vertical/VerticalPanel'
import { VerticalQuote } from '@/components/solutions/vertical/VerticalQuote'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalStake } from '@/components/solutions/vertical/types'
import type { Testimonial } from '@/lib/testimonials-data'

interface VerticalStakesProps {
  stakes: VerticalContent['stakes']
  pageId: string
  quote?: Testimonial
}

/**
 * The three things wrong with a statutory election today, each paired with what
 * changes about it.
 *
 * The pairing is the point. When the problems sat in cards and the answers
 * arrived together in a paragraph below them, nothing was matched to anything
 * and the section read as problem and solution mixed together. Each card now
 * carries its own answer under a label, so the reader never has to hold three
 * problems in their head waiting for the reply.
 */
export function VerticalStakes({ stakes, pageId, quote }: VerticalStakesProps) {
  const items = asArray<VerticalStake>(stakes?.items)

  return (
    <VerticalSection sectionId='stakes' pageId={pageId} className='bg-muted/50'>
      <Container className='max-w-5xl'>
        <SectionHeader size='section' eyebrow={stakes?.eyebrow} title={stakes?.title} lede={stakes?.intro} />

        <ul className='mt-12 grid gap-4 sm:mt-16 md:grid-cols-3'>
          {items.map((item) => (
            <VerticalPanel as='li' key={item.title} surface='raised' padding='lg' className='flex flex-col'>
              <h3 className='text-lg leading-snug font-semibold text-balance'>{item.title}</h3>
              <p className='text-muted-foreground mt-2 flex-1 text-sm leading-relaxed'>{item.description}</p>

              {item.answer && (
                <div className='mt-5 border-t pt-5'>
                  <p className='text-primary text-xs font-semibold tracking-wider uppercase'>{stakes?.answer_label}</p>
                  <p className='mt-2 text-sm leading-relaxed'>{item.answer}</p>
                </div>
              )}
            </VerticalPanel>
          ))}
        </ul>

        {/* Locales not yet propagated still answer in one closing paragraph
            rather than per card. Keep rendering it until they catch up. */}
        {stakes?.turn && (
          <p className='mx-auto mt-10 max-w-3xl text-center text-lg text-pretty sm:text-xl'>{stakes.turn}</p>
        )}

        <VerticalQuote testimonial={quote} />
      </Container>
    </VerticalSection>
  )
}

export default VerticalStakes
