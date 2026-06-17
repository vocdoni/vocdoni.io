import { useState } from 'react'
import { CheckCircle2, ChevronDown } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

import type { MarketingCta } from './MarketingHero'

export type PricingTier = {
  name: string
  price: string
  priceNote?: string
  priceSubnote?: string
  description: string
  features: string[]
  moreFeatures?: string[]
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
  columns?: 2 | 3 | 4
  moreLabel?: string
  lessLabel?: string
}

const ctaTargetProps = (cta: MarketingCta) => (cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})

const columnClasses: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className='flex items-start gap-2.5 text-sm'>
      <CheckCircle2 className='mt-0.5 size-4 flex-shrink-0 text-success' aria-hidden='true' />
      <span>{children}</span>
    </li>
  )
}

type TierCardProps = {
  tier: PricingTier
  index: number
  moreLabel: string
  lessLabel: string
}

function TierCard({ tier, index, moreLabel, lessLabel }: TierCardProps) {
  const [open, setOpen] = useState(false)
  const hasMore = Boolean(tier.moreFeatures?.length)

  return (
    <MotionPreset
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
      {tier.priceSubnote && <p className='mt-1 text-xs text-muted-foreground'>{tier.priceSubnote}</p>}

      <p className='mt-3 text-sm text-muted-foreground'>{tier.description}</p>

      <div className='mt-6 flex-1'>
        <ul className='space-y-3'>
          {tier.features.map((feature) => (
            <FeatureItem key={feature}>{feature}</FeatureItem>
          ))}
        </ul>

        {hasMore && (
          <Collapsible open={open} onOpenChange={setOpen} className='mt-3'>
            <CollapsibleTrigger asChild>
              <button
                type='button'
                className='inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80'
              >
                {open ? lessLabel : moreLabel}
                <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden='true' />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className='mt-3 space-y-3'>
                {tier.moreFeatures!.map((feature) => (
                  <FeatureItem key={feature}>{feature}</FeatureItem>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>

      <Button asChild size='lg' variant={tier.highlighted ? 'default' : 'outline'} className='mt-6 w-full'>
        <Link href={tier.cta.href} variant='unstyled' {...ctaTargetProps(tier.cta)}>
          {tier.cta.label}
        </Link>
      </Button>
    </MotionPreset>
  )
}

export default function PricingTiers({
  eyebrow,
  title,
  description,
  tiers,
  footnote,
  columns,
  moreLabel = 'See more',
  lessLabel = 'See less',
}: PricingTiersProps) {
  const resolvedColumns = columns ?? (tiers.length >= 4 ? 4 : tiers.length === 3 ? 3 : 2)

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

        <div className={cn('grid grid-cols-1 gap-6', columnClasses[resolvedColumns])}>
          {tiers.map((tier, index) => (
            <TierCard key={tier.name} tier={tier} index={index} moreLabel={moreLabel} lessLabel={lessLabel} />
          ))}
        </div>

        {footnote && <p className='mt-8 text-center text-sm text-muted-foreground'>{footnote}</p>}
      </Container>
    </Section>
  )
}
