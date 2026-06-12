import { ArrowRightIcon } from 'lucide-react'

import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

import type { MarketingCta } from './MarketingHero'

export type CtaBannerProps = {
  title: string
  description?: string
  primaryCta: MarketingCta
  secondaryCta?: MarketingCta
}

const ctaTargetProps = (cta: MarketingCta) => (cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default function CtaBanner({ title, description, primaryCta, secondaryCta }: CtaBannerProps) {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Card className='relative overflow-hidden rounded-3xl border-none bg-black py-10 shadow-none sm:py-16'>
          <CardContent className='px-8 sm:px-16'>
            <div className='max-w-2xl space-y-4'>
              <MotionPreset
                component='h2'
                className='text-2xl font-semibold text-white md:text-3xl lg:text-4xl'
                fade
                blur
                slide
                transition={{ duration: 0.5 }}
              >
                {title}
              </MotionPreset>

              {description && (
                <MotionPreset
                  component='p'
                  className='text-lg text-white/85'
                  fade
                  blur
                  slide
                  delay={0.2}
                  transition={{ duration: 0.5 }}
                >
                  {description}
                </MotionPreset>
              )}

              <MotionPreset
                fade
                blur
                slide
                delay={0.4}
                transition={{ duration: 0.5 }}
                className='flex flex-col sm:flex-row gap-4 pt-2'
              >
                <Button size='lg' variant='secondary' className='has-[>svg]:px-6' asChild>
                  <Link href={primaryCta.href} variant='inlineIcon' {...ctaTargetProps(primaryCta)}>
                    {primaryCta.label}
                    <ArrowRightIcon className='size-5' />
                  </Link>
                </Button>
                {secondaryCta && (
                  <Button
                    size='lg'
                    variant='outline'
                    className='border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white'
                    asChild
                  >
                    <Link href={secondaryCta.href} variant='unstyled' {...ctaTargetProps(secondaryCta)}>
                      {secondaryCta.label}
                    </Link>
                  </Button>
                )}
              </MotionPreset>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
