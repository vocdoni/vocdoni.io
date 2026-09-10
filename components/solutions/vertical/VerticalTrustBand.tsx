import { CheckCircle2Icon } from 'lucide-react'

import { Container } from '@/components/Container'
import {
  asArray,
  type VerticalContent,
  type VerticalLogo,
  type VerticalStat,
} from '@/components/solutions/vertical/types'

interface VerticalTrustBandProps {
  trust: VerticalContent['trust']
  logos: VerticalLogo[]
}

/**
 * The band immediately under the hero: who else like you, then the badges and
 * the platform figures. "Who like us" is this buyer's second question, so it has
 * to sit just below the fold - close enough to be found, far enough not to
 * compete with the ask.
 *
 * Figures render as a thin fact strip rather than bordered cards: a bordered
 * card reads as decoration, a strip reads as a fact.
 */
export function VerticalTrustBand({ trust, logos }: VerticalTrustBandProps) {
  const badges = asArray<string>(trust?.badges)
  const stats = asArray<VerticalStat>(trust?.stats)

  return (
    <section className='border-y bg-muted/40 py-10 sm:py-12'>
      <Container className='flex flex-col gap-8'>
        {logos.length > 0 && (
          <div className='flex flex-col items-center gap-5'>
            <p className='text-muted-foreground text-xs font-semibold tracking-wider uppercase'>{trust?.logos_label}</p>
            <ul className='flex flex-wrap items-center justify-center gap-x-10 gap-y-5'>
              {logos.map((logo) => (
                <li key={logo.alt}>
                  {/* Fixed cells so wordmarks and round marks carry the same
                      optical weight instead of being normalised on height. */}
                  <span className='flex h-10 w-[7.5rem] items-center justify-center sm:w-[8.5rem]'>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className='max-h-9 w-auto max-w-full object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:invert'
                      loading='lazy'
                      decoding='async'
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {badges.length > 0 && (
          <ul className='text-muted-foreground flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm'>
            {badges.map((badge) => (
              <li key={badge} className='inline-flex items-center gap-1.5'>
                <CheckCircle2Icon className='text-primary size-4 shrink-0' aria-hidden='true' />
                {badge}
              </li>
            ))}
          </ul>
        )}

        {stats.length > 0 && (
          <dl className='grid gap-6 border-t pt-8 sm:grid-cols-3'>
            {stats.map((stat) => (
              // Value reads first, but the label is the term: flex-col-reverse keeps
              // the markup semantic without duplicating the label for screen readers.
              <div key={stat.label} className='flex flex-col-reverse text-center'>
                <dt className='text-muted-foreground mt-1 text-sm'>
                  {stat.label}
                  {stat.source && <span className='text-faint mt-1 block text-xs'>{stat.source}</span>}
                </dt>
                <dd className='text-2xl font-semibold tabular-nums'>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  )
}

export default VerticalTrustBand
