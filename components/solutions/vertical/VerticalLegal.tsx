import { CheckIcon, MapPinIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { Badge } from '@/components/ui/badge'
import { VerticalCtaPair } from '@/components/solutions/vertical/VerticalCtaPair'
import { VerticalPanel } from '@/components/solutions/vertical/VerticalPanel'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalFramework } from '@/components/solutions/vertical/types'

interface VerticalLegalProps {
  legal: VerticalContent['legal']
  pageId: string
  appHref: string
  ctaId: string
}

// Shared track so the ledger's column labels and every clause stay aligned.
const COLUMNS = 'md:grid-cols-[1.05fr_1fr]'

/**
 * The gating section, and the reason this page exists in eleven versions.
 *
 * Legal validity is what stalls this purchase, and it is jurisdiction-bound, so
 * the frameworks come from the locale file and each language ships the rules of
 * the country it is actually read in, labelled explicitly by
 * `jurisdiction_label`.
 *
 * Set as one document rather than four floating cards: a numbered rail, the
 * column label printed once instead of repeated per clause, and the evidence
 * block as the document's footer. This is the register a lawyer reads in, and
 * it is the section most likely to be forwarded to one.
 */
export function VerticalLegal({ legal, pageId, appHref, ctaId }: VerticalLegalProps) {
  const frameworks = asArray<VerticalFramework>(legal?.frameworks)

  return (
    <VerticalSection sectionId='legal-validity' pageId={pageId} className='lg:py-32'>
      <Container className='max-w-5xl'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <SectionHeader
            size='section'
            align='left'
            eyebrow={legal?.eyebrow}
            title={legal?.title}
            lede={legal?.intro}
          />
          {legal?.jurisdiction_label && (
            <Badge variant='outline' className='border-border shrink-0 gap-1.5 px-3 py-1 text-sm font-medium'>
              <MapPinIcon className='size-3.5' aria-hidden='true' />
              {legal.jurisdiction_label}
            </Badge>
          )}
        </div>

        <VerticalPanel surface='ledger' padding='none' className='mt-10 shadow-sm sm:mt-12'>
          {/* Column labels, printed once rather than repeated per clause. */}
          <div
            className={`bg-background text-muted-foreground hidden gap-10 px-8 pt-6 pb-4 text-xs font-semibold tracking-wider uppercase md:grid ${COLUMNS}`}
          >
            <span>{legal?.requirement_label}</span>
            <span className='text-primary'>{legal?.response_label}</span>
          </div>

          {frameworks.map((framework, index) => (
            <div key={framework.name} className={`bg-background grid gap-6 p-6 sm:p-8 md:gap-10 ${COLUMNS}`}>
              <div className='flex gap-4'>
                <span className='text-faint mt-1 shrink-0 font-mono text-sm tabular-nums' aria-hidden='true'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='text-lg leading-snug font-semibold text-balance'>{framework.name}</h3>
                  <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{framework.summary}</p>
                </div>
              </div>

              <div>
                <p className='text-primary mb-3 text-xs font-semibold tracking-wider uppercase md:hidden'>
                  {legal?.response_label}
                </p>
                <ul className='space-y-2.5'>
                  {asArray<string>(framework.response).map((item) => (
                    <li key={item} className='text-muted-foreground flex gap-2.5 text-sm leading-relaxed'>
                      <CheckIcon className='text-primary mt-0.5 size-4 shrink-0' aria-hidden='true' />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* The conclusion of the same document, not a box beside it. */}
          <div className='bg-muted/60 p-6 sm:p-8'>
            <h3 className='text-lg leading-snug font-semibold'>{legal?.evidence?.title}</h3>
            <p className='text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed'>{legal?.evidence?.intro}</p>
          </div>
        </VerticalPanel>

        {legal?.disclaimer && (
          <p className='text-muted-foreground mt-6 max-w-3xl text-sm leading-relaxed'>{legal.disclaimer}</p>
        )}

        {/* The highest-intent ask on the page gets a real button, not a grey link. */}
        <VerticalCtaPair
          className='mt-10'
          align='left'
          weight='equal'
          appHref={appHref}
          secondaryLabel={legal?.cta_secondary}
          note={legal?.cta_note}
          ctaId={ctaId}
        />
      </Container>
    </VerticalSection>
  )
}

export default VerticalLegal
