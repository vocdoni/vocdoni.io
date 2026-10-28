import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type FaqItem = {
  question: string
  answer: string
}

export default function PricingFaq() {
  const { t } = useTranslation()
  const items = (t('pricing.faq.items', { returnObjects: true }) as FaqItem[]) || []

  return (
    <section className='bg-background py-20 sm:py-24'>
      <Container className='max-w-4xl'>
        <SectionHeader size='section' title={t('pricing.faq.title', 'Pricing questions')} />

        <Accordion
          type='single'
          collapsible
          className='mt-12 rounded-3xl border border-border/70 bg-background px-6 shadow-sm sm:px-8'
        >
          {items.map((item, index) => (
            <AccordionItem key={index} value={`pricing-faq-${index}`}>
              <AccordionTrigger className='text-left text-base font-medium sm:text-lg'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-5 text-base leading-7 text-muted-foreground'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
