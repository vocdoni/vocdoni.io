import { ArrowRight } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'

import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

export type MarketingCta = {
  label: string
  href: string
  external?: boolean
}

export type MarketingHeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: MarketingCta
  secondaryCta?: MarketingCta
  bullets?: string[]
  align?: 'left' | 'center'
}

const ctaTargetProps = (cta: MarketingCta) => (cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default function MarketingHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  bullets,
  align = 'left',
}: MarketingHeroProps) {
  const centered = align === 'center'

  return (
    <section className='relative w-full pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          {eyebrow && (
            <MotionPreset
              component='p'
              className='text-primary mb-4 text-sm font-medium uppercase tracking-wide'
              fade
              blur
              slide
              transition={{ duration: 0.5 }}
            >
              {eyebrow}
            </MotionPreset>
          )}

          <MotionPreset
            component='h1'
            className='text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground text-balance'
            fade
            blur
            slide
            delay={0.1}
            transition={{ duration: 0.5 }}
          >
            {title}
          </MotionPreset>

          {subtitle && (
            <MotionPreset
              component='p'
              className='mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed'
              fade
              blur
              slide
              delay={0.2}
              transition={{ duration: 0.5 }}
            >
              {subtitle}
            </MotionPreset>
          )}

          {bullets && bullets.length > 0 && (
            <MotionPreset
              fade
              blur
              slide
              delay={0.3}
              transition={{ duration: 0.5 }}
              className={`mt-6 flex flex-col gap-2.5 ${centered ? 'items-center' : ''}`}
            >
              {bullets.map((bullet) => (
                <span key={bullet} className='flex items-start gap-2 text-sm sm:text-base text-foreground/90'>
                  <CheckCircle2 className='mt-0.5 size-5 flex-shrink-0 text-success' aria-hidden='true' />
                  {bullet}
                </span>
              ))}
            </MotionPreset>
          )}

          {(primaryCta || secondaryCta) && (
            <MotionPreset
              fade
              blur
              slide
              delay={0.4}
              transition={{ duration: 0.5 }}
              className={`mt-8 flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : ''}`}
            >
              {primaryCta && (
                <Button size='lg' className='group has-[>svg]:px-6 w-full sm:w-auto' asChild>
                  <Link href={primaryCta.href} variant='inlineIcon' {...ctaTargetProps(primaryCta)}>
                    {primaryCta.label}
                    <ArrowRight
                      className='h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5'
                      aria-hidden='true'
                    />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button variant='outline' size='lg' className='w-full sm:w-auto' asChild>
                  <Link href={secondaryCta.href} variant='unstyled' {...ctaTargetProps(secondaryCta)}>
                    {secondaryCta.label}
                  </Link>
                </Button>
              )}
            </MotionPreset>
          )}
        </div>
      </div>
    </section>
  )
}
