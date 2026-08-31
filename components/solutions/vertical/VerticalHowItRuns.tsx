import {
  EyeOffIcon,
  FileCheckIcon,
  FingerprintIcon,
  type LucideIcon,
  MonitorCheckIcon,
  ScrollTextIcon,
  UsersIcon,
} from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import { VerticalMedia, type VerticalMediaAsset } from '@/components/solutions/vertical/VerticalMedia'
import { VerticalQuote } from '@/components/solutions/vertical/VerticalQuote'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalItem } from '@/components/solutions/vertical/types'
import type { Testimonial } from '@/lib/testimonials-data'

// Semantic icons for the capability grid, cycled by index.
const FEATURE_ICONS: LucideIcon[] = [
  ScrollTextIcon,
  FingerprintIcon,
  MonitorCheckIcon,
  UsersIcon,
  EyeOffIcon,
  FileCheckIcon,
]

interface VerticalHowItRunsProps {
  how: VerticalContent['how']
  pageId: string
  quote?: Testimonial
  /**
   * Product screenshots. Both slots hold their space whether or not the asset
   * exists yet, so the layout does not move when the real ones land.
   */
  media?: { console?: VerticalMediaAsset; ballot?: VerticalMediaAsset }
}

/**
 * What the platform does, and what a member actually experiences, in one
 * section.
 *
 * The member steps are here rather than in a section of their own on purpose:
 * given its own heading, "our members are not tech-savvy" becomes a section
 * about the product's weakness. Inside the mechanism it dissolves - an email, a
 * link, a ballot, no account, no app.
 */
export function VerticalHowItRuns({ how, pageId, quote, media }: VerticalHowItRunsProps) {
  const features = asArray<VerticalItem>(how?.features)
  const steps = asArray<VerticalItem>(how?.steps)

  return (
    <VerticalSection sectionId='how-it-runs' pageId={pageId}>
      <Container>
        <SectionHeader size='section' eyebrow={how?.eyebrow} title={how?.title} lede={how?.intro} />

        <div className='mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => {
            const FeatureIcon = FEATURE_ICONS[index % FEATURE_ICONS.length]
            return (
              <Card key={feature.title} className='h-full'>
                <CardContent className='flex flex-col gap-3 p-6'>
                  <div className='bg-primary/10 text-primary inline-flex size-11 items-center justify-center rounded-lg'>
                    <FeatureIcon className='size-5' aria-hidden='true' />
                  </div>
                  <h3 className='text-lg font-semibold text-balance'>{feature.title}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* The electoral board's own view: the screen that answers "what do we
            see on the day, and can we see any ballots?" */}
        <VerticalMedia
          className='mx-auto mt-12 max-w-4xl sm:mt-16'
          asset={media?.console}
          caption={how?.media_caption}
          ratio='wide'
        />

        {steps.length > 0 && (
          <div className='mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-14'>
            <div>
              <h3 className='text-2xl text-balance sm:text-3xl'>{how?.steps_title}</h3>
              <ol className='bg-border rounded-card mt-8 grid gap-px overflow-hidden border'>
                {steps.map((step, index) => (
                  <li key={step.title} className='bg-background flex flex-col gap-3 p-6 sm:flex-row sm:gap-6 sm:p-8'>
                    <span
                      className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums'
                      aria-hidden='true'
                    >
                      {index + 1}
                    </span>
                    <div className='sm:pt-1'>
                      <h4 className='font-semibold'>{step.title}</h4>
                      <p className='text-muted-foreground mt-1.5 text-sm leading-relaxed'>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {how?.footnote && <p className='text-muted-foreground mt-6 text-sm leading-relaxed'>{how.footnote}</p>}
            </div>

            {/* What the member holds in their hand, beside what they do with it. */}
            <VerticalMedia
              className='mx-auto w-full max-w-[14rem] sm:max-w-xs lg:mx-0 lg:max-w-[16rem]'
              asset={media?.ballot}
              caption={how?.steps_media_caption}
              ratio='portrait'
            />
          </div>
        )}

        <VerticalQuote testimonial={quote} />
      </Container>
    </VerticalSection>
  )
}

export default VerticalHowItRuns
