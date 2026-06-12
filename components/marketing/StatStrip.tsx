import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { MotionPreset } from '@/components/ui/motion-preset'

export type Stat = {
  value: string
  label: string
}

export type StatStripProps = {
  stats: Stat[]
}

export default function StatStrip({ stats }: StatStripProps) {
  return (
    <Section className='py-12 sm:py-16'>
      <Container>
        <dl className='grid grid-cols-2 gap-6 lg:grid-cols-4'>
          {stats.map((stat, index) => (
            <MotionPreset
              key={stat.label}
              fade
              blur
              slide
              delay={0.05 * index}
              transition={{ duration: 0.5 }}
              inView
              inViewOnce
              className='rounded-2xl border border-border/70 bg-background p-6 text-center shadow-sm'
            >
              <dt className='sr-only'>{stat.label}</dt>
              <dd className='text-3xl font-black tracking-tight text-primary sm:text-4xl'>{stat.value}</dd>
              <p className='mt-2 text-sm text-muted-foreground'>{stat.label}</p>
            </MotionPreset>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
