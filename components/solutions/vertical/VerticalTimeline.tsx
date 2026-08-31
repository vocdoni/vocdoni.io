import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalTimelineStep } from '@/components/solutions/vertical/types'

/**
 * The run-up to voting day, dated.
 *
 * This buyer's first operational question is whether they can still make their
 * statutory date and what they owe by when, and this is the block most likely
 * to be lifted straight into an internal calendar. Returns `null` when the
 * locale has no timeline yet, so un-propagated languages skip it cleanly.
 */
export function VerticalTimeline({ timeline, pageId }: { timeline?: VerticalContent['timeline']; pageId: string }) {
  const steps = asArray<VerticalTimelineStep>(timeline?.steps)
  if (!timeline || steps.length === 0) return null

  return (
    <VerticalSection sectionId='timeline' pageId={pageId}>
      <Container className='max-w-6xl'>
        <SectionHeader size='section' eyebrow={timeline.eyebrow} title={timeline.title} lede={timeline.intro} />

        {/* A rail on desktop, a stack on mobile. The connecting line sits behind
            the markers so it never crosses the text. */}
        <ol className='mt-12 grid gap-8 sm:mt-16 md:grid-cols-3 lg:grid-cols-5 lg:gap-6'>
          {steps.map((step, index) => (
            <li key={step.title} className='relative flex flex-col gap-3'>
              <div className='flex items-center gap-3'>
                <span
                  className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums'
                  aria-hidden='true'
                >
                  {index + 1}
                </span>
                <span className='bg-border hidden h-px flex-1 lg:block' aria-hidden='true' />
              </div>
              <p className='text-primary text-xs font-semibold tracking-wider uppercase'>{step.when}</p>
              <h3 className='leading-snug font-semibold text-balance'>{step.title}</h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>{step.description}</p>
              <p className='text-faint mt-auto text-xs'>{step.owner}</p>
            </li>
          ))}
        </ol>

        {timeline.footnote && (
          <p className='text-muted-foreground mt-10 text-sm leading-relaxed'>{timeline.footnote}</p>
        )}
      </Container>
    </VerticalSection>
  )
}

export default VerticalTimeline
