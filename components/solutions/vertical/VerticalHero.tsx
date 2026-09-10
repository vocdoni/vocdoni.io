import { type LucideIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'
import { VerticalCtaPair } from '@/components/solutions/vertical/VerticalCtaPair'
import { VerticalMedia, type VerticalMediaAsset } from '@/components/solutions/vertical/VerticalMedia'
import type { VerticalContent } from '@/components/solutions/vertical/types'

interface VerticalHeroProps {
  icon: LucideIcon
  eyebrow: string
  hero: VerticalContent['hero']
  appHref: string
  secondaryHref?: string
  ctaId: string
  /** Product visual. The slot holds its space whether or not the asset exists. */
  media?: VerticalMediaAsset
  mediaCaption?: string
  /**
   * `split` reserves the second column for the product visual even before the
   * asset exists, so dropping it in later moves nothing. `centered` is for a
   * page that has no visual to promise: the reserved panel would be a large
   * empty box beside the headline rather than a placeholder for something.
   */
  layout?: 'split' | 'centered'
}

// A small settle, not a 100px sideways fly-in. On a centred, institutionally
// serious hero the latter is the flashiest thing on the page, and on a phone it
// is a horizontal jolt on the first thing the buyer sees.
const ENTRANCE = { direction: 'up', offset: 12 } as const

/**
 * Eyebrow, headline, subtitle, one ask, one reassurance line, and the product
 * visual.
 *
 * Badges, stats and logos deliberately live in the band below. Four unsupported
 * adjectives above the fold is precisely what a buyer whose whole problem is
 * vendors asserting things will discount on sight.
 */
export function VerticalHero({
  icon: Icon,
  eyebrow,
  hero,
  appHref,
  secondaryHref,
  ctaId,
  media,
  mediaCaption,
  layout = 'split',
}: VerticalHeroProps) {
  const centered = layout === 'centered'

  return (
    <section id='overview' className='scroll-mt-[3.25rem] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 xl:scroll-mt-[1.5rem]'>
      <Container>
        <div className={cn('grid items-center gap-10', !centered && 'lg:grid-cols-[1.1fr_1fr] lg:gap-16')}>
          <div className={cn('mx-auto max-w-2xl text-center', !centered && 'lg:mx-0 lg:text-left')}>
            <MotionPreset
              fade
              slide={ENTRANCE}
              transition={{ duration: 0.45 }}
              className={cn('flex justify-center', !centered && 'lg:justify-start')}
            >
              {/* Nine verticals mean nine eyebrow lengths, so this has to survive
                  wrapping: `items-start` keeps the signal dot on the first line. */}
              <Eyebrow className='items-start gap-2 text-xs sm:items-center sm:text-sm'>
                <Icon className='mt-px hidden size-4 shrink-0 sm:mt-0 sm:inline-block' aria-hidden='true' />
                <span className='text-balance'>{eyebrow}</span>
              </Eyebrow>
            </MotionPreset>

            <MotionPreset
              component='h1'
              className='mt-5 text-4xl text-balance sm:text-5xl lg:text-6xl'
              fade
              slide={ENTRANCE}
              delay={0.08}
              transition={{ duration: 0.45 }}
            >
              {hero?.title}
            </MotionPreset>

            <MotionPreset
              component='p'
              className={cn(
                'text-muted-foreground mx-auto mt-6 max-w-xl text-lg text-pretty sm:text-xl',
                !centered && 'lg:mx-0'
              )}
              fade
              slide={ENTRANCE}
              delay={0.16}
              transition={{ duration: 0.45 }}
            >
              {hero?.subtitle}
            </MotionPreset>

            <MotionPreset fade slide={ENTRANCE} delay={0.24} transition={{ duration: 0.45 }} className='mt-8'>
              <VerticalCtaPair
                align={centered ? 'center' : 'left'}
                className={cn('items-center', !centered && 'lg:items-start')}
                appHref={appHref}
                secondaryHref={secondaryHref}
                primaryLabel={hero?.cta_primary}
                secondaryLabel={hero?.cta_secondary}
                note={hero?.risk_reversal}
                ctaId={ctaId}
              />
            </MotionPreset>
          </div>

          {/* A centered hero has no second column: the reserved panel only earns
              its space where a real screenshot is coming. */}
          {!centered && (
            <MotionPreset fade slide={{ direction: 'up', offset: 16 }} delay={0.3} transition={{ duration: 0.5 }}>
              <VerticalMedia asset={media} caption={mediaCaption} ratio='wide' />
            </MotionPreset>
          )}
        </div>
      </Container>
    </section>
  )
}

export default VerticalHero
