import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { MotionPreset } from '@/components/ui/motion-preset'

export type Feature = {
  icon?: LucideIcon
  title: string
  description: string
}

export type FeatureGridProps = {
  eyebrow?: string
  title?: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

const columnClasses: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export default function FeatureGrid({ eyebrow, title, description, features, columns = 3 }: FeatureGridProps) {
  return (
    <Section>
      <Container>
        {(eyebrow || title || description) && (
          <div className='max-w-3xl mb-12 sm:mb-16'>
            {eyebrow && <p className='text-primary mb-3 text-sm font-medium uppercase tracking-wide'>{eyebrow}</p>}
            {title && (
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-balance'>{title}</h2>
            )}
            {description && <p className='mt-4 text-lg text-muted-foreground'>{description}</p>}
          </div>
        )}

        <div className={`grid grid-cols-1 gap-6 ${columnClasses[columns]}`}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <MotionPreset
                key={feature.title}
                fade
                blur
                slide
                delay={0.05 * index}
                transition={{ duration: 0.5 }}
                inView
                inViewOnce
                className='rounded-2xl border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
              >
                {Icon && (
                  <span className='mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                    <Icon className='size-5' aria-hidden='true' />
                  </span>
                )}
                <h3 className='text-lg font-semibold'>{feature.title}</h3>
                <p className='mt-2 text-base leading-7 text-muted-foreground'>{feature.description}</p>
              </MotionPreset>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
