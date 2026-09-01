import { type LucideIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { MotionPreset } from '@/components/ui/motion-preset'
import { VerticalCtaPair } from '@/components/solutions/vertical/VerticalCtaPair'
import { VerticalMedia, type VerticalMediaAsset } from '@/components/solutions/vertical/VerticalMedia'
import type { VerticalContent } from '@/components/solutions/vertical/types'

interface VerticalHeroProps {
  icon: LucideIcon
  eyebrow: string
  hero: VerticalContent['hero']
  appHref: string
  ctaId: string
  /** Product visual. The slot holds its space whether or not the asset exists. */
  media?: VerticalMediaAsset
  mediaCaption?: string
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
export function VerticalHero({ icon: Icon, eyebrow, hero, appHref, ctaId, media, mediaCaption }: VerticalHeroProps) {
  return (
    <section id='overview' className='scroll-mt-[3.25rem] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 xl:scroll-mt-[1.5rem]'>
      <Container>
        <div className='grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16'>
          <div className='mx-auto max-w-2xl text-center lg:mx-0 lg:text-left'>
            <MotionPreset
              fade
              slide={ENTRANCE}
              transition={{ duration: 0.45 }}
              className='flex justify-center lg:justify-start'
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
              className='text-muted-foreground mx-auto mt-6 max-w-xl text-lg text-pretty sm:text-xl lg:mx-0'
              fade
              slide={ENTRANCE}
              delay={0.16}
              transition={{ duration: 0.45 }}
            >
              {hero?.subtitle}
            </MotionPreset>

            <MotionPreset fade slide={ENTRANCE} delay={0.24} transition={{ duration: 0.45 }} className='mt-8'>
              <VerticalCtaPair
                align='left'
                className='items-center lg:items-start'
                appHref={appHref}
                primaryLabel={hero?.cta_primary}
                secondaryLabel={hero?.cta_secondary}
                note={hero?.risk_reversal}
                ctaId={ctaId}
              />
            </MotionPreset>
          </div>

          <MotionPreset fade slide={{ direction: 'up', offset: 16 }} delay={0.3} transition={{ duration: 0.5 }}>
            <VerticalMedia asset={media} caption={mediaCaption} ratio='wide' />
          </MotionPreset>
        </div>
      </Container>
    </section>
  )
}

export default VerticalHero
