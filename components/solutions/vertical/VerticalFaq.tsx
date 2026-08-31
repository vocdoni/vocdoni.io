import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/SectionHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import { asArray, type VerticalContent, type VerticalFaqItem } from '@/components/solutions/vertical/types'

/**
 * Everything that did not earn a section of its own. The gating objection is
 * deliberately not here: an objection in an accordion is an objection you are
 * hiding, and legal validity gets section 3 instead.
 *
 * Items feed the FAQPage JSON-LD automatically through `lib/seo-head.tsx`, which
 * derives the key from the route slug.
 */
export function VerticalFaq({ faq, pageId }: { faq: VerticalContent['faq']; pageId: string }) {
  const items = asArray<VerticalFaqItem>(faq?.items)

  return (
    <VerticalSection sectionId='faq' pageId={pageId} className='bg-muted/50'>
      <Container className='max-w-4xl'>
        <SectionHeader size='section' eyebrow={faq?.eyebrow} title={faq?.title} lede={faq?.intro} />
        <Accordion
          type='single'
          collapsible
          className='bg-background rounded-card mt-12 border px-6 shadow-sm sm:mt-16 sm:px-8'
        >
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className='text-left text-base font-medium sm:text-lg'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground pb-5 text-base leading-7'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </VerticalSection>
  )
}

export default VerticalFaq
