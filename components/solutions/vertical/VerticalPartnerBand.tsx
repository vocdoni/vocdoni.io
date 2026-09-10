import { ArrowUpRightIcon, CheckCircle2Icon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalLogo, type VerticalPartner } from '@/components/solutions/vertical/types'

interface VerticalPartnerBandProps {
  partner?: VerticalPartner
  /** The partner's own mark. Rendered as supplied, on a plain plate. */
  logo: VerticalLogo
  /** Where the partner's name leads, typically their own site. */
  href: string
  pageId: string
  ctaId: string
}

/**
 * The band directly under the hero for a page whose subject is built with
 * another platform: that platform's mark and the relationship.
 *
 * It exists because the customer logo row cannot hold this mark. A logo there
 * says "this organization votes with us"; a partner's logo there would claim
 * them as a customer. Here the mark is shown unaltered, not greyscaled and not
 * inverted in dark mode.
 *
 * Renders nothing when the locale has no partner block.
 */
export function VerticalPartnerBand({ partner, logo, href, pageId, ctaId }: VerticalPartnerBandProps) {
  if (!partner) return null
  const points = asArray<string>(partner.points)

  return (
    <VerticalSection sectionId='partner' pageId={pageId} className='border-y bg-muted/40 py-10 sm:py-12 lg:py-14'>
      <Container className='max-w-5xl'>
        <div className='grid items-center gap-8 md:grid-cols-[minmax(12rem,1fr)_2fr] md:gap-12'>
          <div className='flex justify-center md:justify-start'>
            <span className='image-outline flex h-28 w-full max-w-[16rem] items-center justify-center rounded-card bg-white p-6'>
              <img
                src={logo.src}
                alt={logo.alt}
                className='max-h-12 w-auto max-w-full object-contain'
                loading='lazy'
                decoding='async'
              />
            </span>
          </div>

          <div className='text-center md:text-left'>
            <Eyebrow withHalo>{partner.eyebrow}</Eyebrow>
            <h2 className='mt-4 text-2xl text-balance sm:text-3xl'>{partner.title}</h2>
            <p className='text-muted-foreground mt-3 text-pretty leading-relaxed'>{partner.description}</p>

            {points.length > 0 && (
              <ul className='text-muted-foreground mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-start'>
                {points.map((point) => (
                  <li key={point} className='inline-flex items-center gap-1.5'>
                    <CheckCircle2Icon className='text-primary size-4 shrink-0' aria-hidden='true' />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            <Button variant='outline' className='mt-6 w-full sm:w-auto' asChild>
              <Link href={href} variant='inlineIcon' ctaId={ctaId}>
                {partner.cta}
                <ArrowUpRightIcon className='size-4' aria-hidden='true' />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </VerticalSection>
  )
}

export default VerticalPartnerBand
