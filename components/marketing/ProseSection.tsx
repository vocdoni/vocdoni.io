import { CheckCircle2 } from 'lucide-react'

import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { MotionPreset } from '@/components/ui/motion-preset'

export type ProseBlock = {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

export type ProseSectionProps = {
  eyebrow?: string
  title?: string
  intro?: string
  blocks: ProseBlock[]
  muted?: boolean
}

export default function ProseSection({ eyebrow, title, intro, blocks, muted }: ProseSectionProps) {
  return (
    <Section className={muted ? 'bg-muted/35' : undefined}>
      <Container className='max-w-3xl'>
        {(eyebrow || title || intro) && (
          <div className='mb-10'>
            {eyebrow && <p className='text-primary mb-3 text-sm font-medium uppercase tracking-wide'>{eyebrow}</p>}
            {title && (
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-balance'>{title}</h2>
            )}
            {intro && <p className='mt-4 text-lg text-muted-foreground'>{intro}</p>}
          </div>
        )}

        <div className='space-y-10'>
          {blocks.map((block, index) => (
            <MotionPreset
              key={block.heading ?? index}
              fade
              blur
              slide
              delay={0.04 * index}
              transition={{ duration: 0.5 }}
              inView
              inViewOnce
            >
              {block.heading && <h3 className='text-xl font-semibold mb-3'>{block.heading}</h3>}
              {block.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className='mb-4 text-base leading-7 text-muted-foreground last:mb-0'>
                  {paragraph}
                </p>
              ))}
              {block.bullets && block.bullets.length > 0 && (
                <ul className='mt-4 space-y-2.5'>
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className='flex items-start gap-2.5 text-base text-foreground/90'>
                      <CheckCircle2 className='mt-0.5 size-5 flex-shrink-0 text-success' aria-hidden='true' />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </MotionPreset>
          ))}
        </div>
      </Container>
    </Section>
  )
}
