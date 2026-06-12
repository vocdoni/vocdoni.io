import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export type FaqItem = {
  question: string
  answer: string
}

export type FaqAccordionProps = {
  eyebrow?: string
  title?: string
  items: FaqItem[]
}

export default function FaqAccordion({ eyebrow, title, items }: FaqAccordionProps) {
  if (!items || items.length === 0) return null

  return (
    <Section>
      <Container className='max-w-4xl'>
        {(eyebrow || title) && (
          <div className='mx-auto max-w-3xl text-center mb-12 sm:mb-16'>
            {eyebrow && <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>{eyebrow}</p>}
            {title && <h2 className='mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>{title}</h2>}
          </div>
        )}

        <Accordion
          type='single'
          collapsible
          className='rounded-3xl border border-border/70 bg-background px-6 shadow-sm sm:px-8'
        >
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className='border-b-border/60 last:border-0'>
              <AccordionTrigger className='py-5 text-left text-base font-medium sm:text-lg hover:no-underline'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-6 text-base leading-7 text-muted-foreground'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}
