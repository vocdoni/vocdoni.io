import { ArrowRightIcon, CheckCircle2 } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

import type { MarketingCta } from './MarketingHero'

export type ManagedProjectGroup = {
  heading: string
  items: string[]
}

export type ManagedProjectSectionProps = {
  eyebrow?: string
  title: string
  description?: string
  badge?: string
  priceLabel?: string
  priceNote?: string
  groups: ManagedProjectGroup[]
  primaryCta: MarketingCta
  secondaryCta?: MarketingCta
  footnote?: string
}

const ctaTargetProps = (cta: MarketingCta) => (cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default function ManagedProjectSection({
  eyebrow,
  title,
  description,
  badge,
  priceLabel,
  priceNote,
  groups,
  primaryCta,
  secondaryCta,
  footnote,
}: ManagedProjectSectionProps) {
  return (
    <Section className='bg-muted/35'>
      <Container>
        <MotionPreset
          fade
          blur
          slide
          transition={{ duration: 0.5 }}
          inView
          inViewOnce
          className='overflow-hidden rounded-3xl border border-primary/40 bg-background p-8 shadow-md ring-1 ring-primary/20 sm:p-10 lg:p-12'
        >
          <div className='grid gap-10 lg:grid-cols-2'>
            {/* Left: pitch + price + CTAs */}
            <div className='flex flex-col'>
              <div className='flex items-center gap-3'>
                {eyebrow && <p className='text-primary text-sm font-medium uppercase tracking-wide'>{eyebrow}</p>}
                {badge && (
                  <span className='rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary'>
                    {badge}
                  </span>
                )}
              </div>

              <h2 className='mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-balance'>
                {title}
              </h2>

              {description && <p className='mt-4 text-lg text-muted-foreground'>{description}</p>}

              {priceLabel && (
                <div className='mt-6'>
                  <span className='text-3xl font-black tracking-tight'>{priceLabel}</span>
                  {priceNote && <p className='mt-1 text-sm text-muted-foreground'>{priceNote}</p>}
                </div>
              )}

              <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                <Button asChild size='lg' className='has-[>svg]:px-6'>
                  <Link href={primaryCta.href} variant='inlineIcon' {...ctaTargetProps(primaryCta)}>
                    {primaryCta.label}
                    <ArrowRightIcon className='size-5' aria-hidden='true' />
                  </Link>
                </Button>
                {secondaryCta && (
                  <Button asChild size='lg' variant='outline'>
                    <Link href={secondaryCta.href} variant='unstyled' {...ctaTargetProps(secondaryCta)}>
                      {secondaryCta.label}
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Right: what's included, grouped */}
            <div className={cn('grid gap-8', groups.length > 1 && 'sm:grid-cols-2')}>
              {groups.map((group) => (
                <div key={group.heading}>
                  <h3 className='text-sm font-semibold uppercase tracking-wide text-foreground'>{group.heading}</h3>
                  <ul className='mt-4 space-y-3'>
                    {group.items.map((item) => (
                      <li key={item} className='flex items-start gap-2.5 text-sm'>
                        <CheckCircle2 className='mt-0.5 size-4 flex-shrink-0 text-success' aria-hidden='true' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {footnote && <p className='mt-8 text-sm text-muted-foreground'>{footnote}</p>}
        </MotionPreset>
      </Container>
    </Section>
  )
}
