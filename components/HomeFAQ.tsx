import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function HomeFAQ() {
  const { t } = useTranslation()
  const faqs = [
    { question: t('faq.items.legal.question'), answer: t('faq.items.legal.answer') },
    { question: t('faq.items.anonymity.question'), answer: t('faq.items.anonymity.answer') },
    { question: t('faq.items.setup.question'), answer: t('faq.items.setup.answer') },
    { question: t('faq.items.free.question'), answer: t('faq.items.free.answer') },
    { question: t('faq.items.switch.question'), answer: t('faq.items.switch.answer') },
    { question: t('faq.items.dispute.question'), answer: t('faq.items.dispute.answer') },
    { question: t('faq.items.gdpr.question'), answer: t('faq.items.gdpr.answer') },
    { question: t('faq.items.techsavvy.question'), answer: t('faq.items.techsavvy.answer') },
    { question: t('faq.items.voters_app.question'), answer: t('faq.items.voters_app.answer') },
    { question: t('faq.items.vote_types.question'), answer: t('faq.items.vote_types.answer') },
    { question: t('faq.items.hybrid.question'), answer: t('faq.items.hybrid.answer') },
    { question: t('faq.items.census.question'), answer: t('faq.items.census.answer') },
    { question: t('faq.items.open_source.question'), answer: t('faq.items.open_source.answer') },
    { question: t('faq.items.tamper_proof.question'), answer: t('faq.items.tamper_proof.answer') },
    { question: t('faq.items.coercion.question'), answer: t('faq.items.coercion.answer') },
    {
      question: t('faq.items.accessibility.question'),
      answer: t('faq.items.accessibility.answer'),
    },
  ]

  return (
    <section className='bg-muted/35 py-20 sm:py-24'>
      <Container className='max-w-4xl'>
        <SectionHeader
          className='mx-auto max-w-3xl mb-12 sm:mb-16'
          eyebrow={t('faq.eyebrow', 'FAQ')}
          title={t('faq.title', 'Common questions')}
          titleClassName='text-4xl sm:text-5xl'
        />

        <Accordion
          type='single'
          collapsible
          className='rounded-3xl border border-border/70 bg-background px-6 shadow-sm sm:px-8'
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className='border-b-border/60 last:border-0'>
              <AccordionTrigger className='py-5 text-left text-base font-medium sm:text-lg hover:no-underline'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='pb-6 text-base leading-7 text-muted-foreground'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mt-20 text-center bg-background p-10 rounded-3xl border border-border/70 shadow-sm'>
          <h3 className='text-2xl font-bold mb-4'>{t('faq.cta_title', 'Ready to see it for yourself?')}</h3>
          <Button asChild size='lg' className='rounded-full px-8 h-12 text-base'>
            <a href='https://app.vocdoni.io' target='_blank' rel='noreferrer'>
              {t('faq.cta_button', 'Start for free')}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
