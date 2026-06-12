import { CheckCircle2 } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

import type { MarketingCta } from './MarketingHero'

export type PricingTier = {
  name: string
  price: string
  priceNote?: string
  description: string
  features: string[]
  cta: MarketingCta
  highlighted?: boolean
  badge?: string
}

export type PricingTiersProps = {
  eyebrow?: string
  title?: string
  description?: string
  tiers: PricingTier[]
  footnote?: string
}

const ctaTargetProps = (cta: MarketingCta) => (cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default function PricingTiers({ eyebrow, title, description, tiers, footnote }: PricingTiersProps) {
  return (
    <Section>
      <Container>
        {(eyebrow || title || description) && (
          <div className='mx-auto max-w-3xl text-center mb-12 sm:mb-16'>
            {eyebrow && <p className='text-primary mb-3 text-sm font-medium uppercase tracking-wide'>{eyebrow}</p>}
            {title && (
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-balance'>{title}</h2>
            )}
            {description && <p className='mt-4 text-lg text-muted-foreground'>{description}</p>}
          </div>
        )}

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {tiers.map((tier, index) => (
            <MotionPreset
              key={tier.name}
              fade
              blur
              slide
              delay={0.05 * index}
              transition={{ duration: 0.5 }}
              inView
              inViewOnce
              className={cn('flex flex-col rounded-3xl border bg-background p-6 shadow-sm', {
                'border-primary ring-1 ring-primary shadow-md': tier.highlighted,
                'border-border/70': !tier.highlighted,
              })}
            >
              <div className='flex items-center justify-between gap-2'>
                <h3 className='text-lg font-semibold'>{tier.name}</h3>
                {tier.badge && (
                  <span className='rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary'>
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className='mt-4'>
                <span className='text-3xl font-black tracking-tight'>{tier.price}</span>
                {tier.priceNote && <span className='ml-1 text-sm text-muted-foreground'>{tier.priceNote}</span>}
              </div>

              <p className='mt-3 text-sm text-muted-foreground'>{tier.description}</p>

              <ul className='mt-6 flex-1 space-y-3'>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-2.5 text-sm'>
                    <CheckCircle2 className='mt-0.5 size-4 flex-shrink-0 text-success' aria-hidden='true' />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild size='lg' variant={tier.highlighted ? 'default' : 'outline'} className='mt-6 w-full'>
                <Link href={tier.cta.href} variant='unstyled' {...ctaTargetProps(tier.cta)}>
                  {tier.cta.label}
                </Link>
              </Button>
            </MotionPreset>
          ))}
        </div>

        {footnote && <p className='mt-8 text-center text-sm text-muted-foreground'>{footnote}</p>}
      </Container>
    </Section>
  )
}
