import { CheckIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalPanel } from '@/components/solutions/vertical/VerticalPanel'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalSizeTier } from '@/components/solutions/vertical/types'

/**
 * The same page has to work for a 400-member local body and a 50,000-member
 * national one, and without this it fails at both ends: the small body reads
 * four-to-six week planning and a named contact and self-disqualifies on
 * ceremony, while the large one reads "one person, one afternoon" and concludes
 * the page was written for somebody smaller.
 *
 * Returns `null` when the locale has no tiers yet.
 */
export function VerticalFitBySize({ sizes, pageId }: { sizes?: VerticalContent['sizes']; pageId: string }) {
  const tiers = asArray<VerticalSizeTier>(sizes?.tiers)
  if (!sizes || tiers.length === 0) return null

  return (
    <VerticalSection sectionId='fit-by-size' pageId={pageId} className='bg-muted/50'>
      <Container className='max-w-5xl'>
        <SectionHeader size='section' eyebrow={sizes.eyebrow} title={sizes.title} lede={sizes.intro} />

        <div className='mt-12 grid gap-6 sm:mt-16 md:grid-cols-3'>
          {tiers.map((tier) => (
            <VerticalPanel key={tier.title} surface='raised' padding='lg' className='flex flex-col'>
              <p className='text-primary text-xs font-semibold tracking-wider uppercase'>{tier.size}</p>
              <h3 className='mt-3 text-lg leading-snug font-semibold text-balance'>{tier.title}</h3>
              <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{tier.description}</p>
              <ul className='mt-5 space-y-2'>
                {asArray<string>(tier.points).map((point) => (
                  <li key={point} className='text-muted-foreground flex gap-2 text-sm leading-relaxed'>
                    <CheckIcon className='text-primary mt-0.5 size-4 shrink-0' aria-hidden='true' />
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalPanel>
          ))}
        </div>
      </Container>
    </VerticalSection>
  )
}

export default VerticalFitBySize
