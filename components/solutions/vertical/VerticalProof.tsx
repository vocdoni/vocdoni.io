import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { VerticalCtaPair } from '@/components/solutions/vertical/VerticalCtaPair'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalStat } from '@/components/solutions/vertical/types'
import type { Testimonial } from '@/lib/testimonials-data'

interface VerticalProofProps {
  proof: VerticalContent['proof']
  pageId: string
  caseStudy: { logo: string; image?: string; href: string; blogHref: string }
  quote?: Testimonial
  appHref: string
  ctaId: string
  caseStudyCtaId: string
}

/**
 * One named statutory body, placed directly after the legal claim it proves.
 * Proof adjacent to the claim it supports is worth multiples of proof parked in
 * a social-proof section two scrolls later.
 */
export function VerticalProof({ proof, pageId, caseStudy, quote, appHref, ctaId, caseStudyCtaId }: VerticalProofProps) {
  const stats = asArray<VerticalStat>(proof?.stats)

  return (
    <VerticalSection sectionId='proof' pageId={pageId} className='bg-muted/50'>
      <Container className='max-w-5xl'>
        <SectionHeader size='section' align='left' eyebrow={proof?.eyebrow} title={proof?.title} lede={proof?.intro} />

        {/* Two columns on desktop: the case study imagery is portrait, so it is
            contained in its own column rather than cropped into a banner. */}
        <div className='bg-background rounded-card mt-12 grid overflow-hidden border shadow-sm sm:mt-16 lg:grid-cols-[2fr_3fr]'>
          {caseStudy.image && (
            <div className='bg-muted/40 flex p-4 sm:p-6'>
              <img
                src={caseStudy.image}
                alt={proof?.org}
                className='image-outline aspect-[4/5] w-full rounded-lg object-cover object-center'
                loading='lazy'
                decoding='async'
              />
            </div>
          )}

          <div className='p-6 sm:p-10'>
            <div className='flex items-center gap-4'>
              <img
                src={caseStudy.logo}
                alt=''
                className='image-outline bg-background size-14 shrink-0 rounded-full object-contain p-1 dark:bg-white/90'
                loading='lazy'
                decoding='async'
              />
              <div>
                <p className='font-semibold'>{proof?.org}</p>
                <p className='text-muted-foreground text-sm'>{proof?.org_meta}</p>
              </div>
            </div>

            {quote && (
              <>
                <blockquote className='mt-8 text-lg leading-relaxed text-pretty sm:text-xl'>
                  {`“${quote.content}”`}
                </blockquote>
                <p className='mt-4 text-sm font-semibold'>
                  {quote.name}
                  {quote.handle ? `, ${quote.handle}` : ''}
                </p>
              </>
            )}

            {stats.length > 0 && (
              <dl className='mt-8 grid gap-6 border-t pt-8 sm:grid-cols-2'>
                {stats.map((stat) => (
                  // Value first, matching the trust band: the same object should
                  // not read in two different orders on one page.
                  <div key={stat.label} className='flex flex-col-reverse'>
                    <dt className='text-muted-foreground mt-1 text-sm'>{stat.label}</dt>
                    <dd className='text-primary text-2xl font-semibold tabular-nums'>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <Button variant='outline' className='w-full sm:w-auto' asChild>
                <Link href={caseStudy.href} variant='inlineIcon' ctaId={caseStudyCtaId}>
                  {proof?.case_study_label}
                  <ArrowRightIcon className='size-4' />
                </Link>
              </Button>
              <Button variant='ghost' className='w-full sm:w-auto' asChild>
                <Link href={caseStudy.blogHref} variant='inlineIcon'>
                  {proof?.blog_label}
                  <ExternalLinkIcon className='size-4' />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <VerticalCtaPair
          className='mt-10'
          align='left'
          appHref={appHref}
          primaryLabel={proof?.cta_primary}
          ctaId={ctaId}
        />
      </Container>
    </VerticalSection>
  )
}

export default VerticalProof
