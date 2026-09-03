import { useTranslation } from 'react-i18next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import type { ChangelogCategory } from './changelog-data'

type ChangelogBadgeAccordionProps = {
  data: ChangelogCategory[]
}

const badgeClassName = {
  new: 'border-none h-6 rounded-sm bg-green-600/10 !text-green-600 dark:bg-green-400/10 dark:!text-green-400',
  improvements: 'border-none h-6 rounded-sm bg-sky-600/10 !text-sky-600 dark:bg-sky-400/10 dark:!text-sky-400',
  bugfixes: 'border-none h-6 rounded-sm bg-amber-600/10 !text-amber-600 dark:bg-orange-400/10 dark:!text-orange-400',
} satisfies Record<ChangelogCategory['type'], string>

const ChangelogBadgeAccordion = ({ data }: ChangelogBadgeAccordionProps) => {
  const { t } = useTranslation()

  const getLabel = (type: ChangelogCategory['type']) => {
    if (type === 'new') return t('app_changelog.labels.new', 'New')
    if (type === 'improvements') return t('app_changelog.labels.improvements', 'Improvements')
    return t('app_changelog.labels.bugfixes', 'Bug fixes')
  }

  return (
    <Accordion type='multiple' className='-mt-2 mb-0 w-full' defaultValue={data.map((_, i) => `item-${i}`)}>
      {data.map((category, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className='px-0 hover:no-underline'>
            <Badge className={badgeClassName[category.type]}>{getLabel(category.type)}</Badge>
          </AccordionTrigger>
          <AccordionContent>
            <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default ChangelogBadgeAccordion
