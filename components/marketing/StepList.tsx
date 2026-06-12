import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { MotionPreset } from '@/components/ui/motion-preset'

export type Step = {
  title: string
  description: string
}

export type StepListProps = {
  eyebrow?: string
  title?: string
  description?: string
  steps: Step[]
}

export default function StepList({ eyebrow, title, description, steps }: StepListProps) {
  return (
    <Section className='bg-muted/35'>
      <Container className='max-w-5xl'>
        {(eyebrow || title || description) && (
          <div className='max-w-3xl mb-12 sm:mb-16'>
            {eyebrow && <p className='text-primary mb-3 text-sm font-medium uppercase tracking-wide'>{eyebrow}</p>}
            {title && (
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-balance'>{title}</h2>
            )}
            {description && <p className='mt-4 text-lg text-muted-foreground'>{description}</p>}
          </div>
        )}

        <ol className='space-y-6'>
          {steps.map((step, index) => (
            <MotionPreset
              key={step.title}
              component='li'
              fade
              blur
              slide
              delay={0.05 * index}
              transition={{ duration: 0.5 }}
              inView
              inViewOnce
              className='flex gap-5 rounded-2xl border border-border/70 bg-background p-6 shadow-sm'
            >
              <span className='flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>
                {index + 1}
              </span>
              <div>
                <h3 className='text-lg font-semibold'>{step.title}</h3>
                <p className='mt-1.5 text-base leading-7 text-muted-foreground'>{step.description}</p>
              </div>
            </MotionPreset>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
