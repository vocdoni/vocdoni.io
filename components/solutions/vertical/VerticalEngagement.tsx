import { CheckIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { Badge } from '@/components/ui/badge'
import { VerticalCtaPair } from '@/components/solutions/vertical/VerticalCtaPair'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalEngagementOption } from '@/components/solutions/vertical/types'

interface VerticalEngagementProps {
  engagement: VerticalContent['engagement']
  pageId: string
  appHref: string
  ctaId: string
  pricingHref: string
  pricingCtaId: string
}

/**
 * The one genuine fork on the page: who runs the election, you or us. This is
 * the single place where the two CTAs are allowed equal weight, because making
 * the reader pick a lane is the section's whole job.
 *
 * Pricing lives here too. Vocdoni's own guidance treats "contact us for pricing"
 * as a conversion killer, and today the price is reachable only through a footer
 * link, which is functionally the same thing.
 */
export function VerticalEngagement({
  engagement,
  pageId,
  appHref,
  ctaId,
  pricingHref,
  pricingCtaId,
}: VerticalEngagementProps) {
  const options = asArray<VerticalEngagementOption>(engagement?.options)

  return (
    <VerticalSection sectionId='engagement' pageId={pageId}>
      <Container className='max-w-5xl'>
        <SectionHeader
          size='section'
          eyebrow={engagement?.eyebrow}
          title={engagement?.title}
          lede={engagement?.intro}
        />

        <div className='mt-12 grid gap-6 sm:mt-16 md:grid-cols-2'>
          {options.map((option, index) => (
            <div key={option.title} className='rounded-card flex flex-col border p-6 shadow-sm sm:p-8'>
              <Badge variant={index === 0 ? 'secondary' : 'default'} className='w-fit'>
                {option.badge}
              </Badge>
              <h3 className='mt-4 text-xl font-semibold text-balance'>{option.title}</h3>
              <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{option.description}</p>
              <ul className='mt-6 flex-1 space-y-2'>
                {asArray<string>(option.points).map((point) => (
                  <li key={point} className='text-muted-foreground flex gap-2 text-sm leading-relaxed'>
                    <CheckIcon className='text-primary mt-0.5 size-4 shrink-0' aria-hidden='true' />
                    {point}
                  </li>
                ))}
              </ul>
              {/* Self-serve column asks for the app, managed column asks for a person. */}
              <VerticalCtaPair
                className='mt-8'
                align='left'
                weight='equal'
                appHref={appHref}
                primaryLabel={index === 0 ? option.cta : undefined}
                secondaryLabel={index === 0 ? undefined : option.cta}
                ctaId={ctaId}
              />
            </div>
          ))}
        </div>

        {engagement?.pricing?.title && (
          <div className='mt-8 flex flex-col gap-2 border-t pt-8'>
            <h3 className='font-semibold'>{engagement.pricing.title}</h3>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {engagement.pricing.description}{' '}
              <Link href={pricingHref} ctaId={pricingCtaId} className='font-medium'>
                {engagement.pricing.link_label}
              </Link>
            </p>
          </div>
        )}
      </Container>
    </VerticalSection>
  )
}

export default VerticalEngagement
