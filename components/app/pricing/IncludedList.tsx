import { CheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function IncludedList() {
  const { t } = useTranslation()

  const items = [
    t('pricing.included.item_1', 'Nobody can link a ballot to the person who cast it'),
    t('pricing.included.item_2', 'Every voter can check their own vote was counted'),
    t('pricing.included.item_3', 'Results anyone can verify, on a public record'),
    t('pricing.included.item_4', 'Voters identify themselves with a code sent by email (no app, no account)'),
    t('pricing.included.item_5', 'As many questions as you need, and live results'),
    t('pricing.included.item_6', "The voting page in your voters' own language"),
  ]

  return (
    <div>
      <h3 className='font-serif text-2xl font-normal'>{t('pricing.included.title', 'Everything included')}</h3>
      <ul className='mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
        {items.map((item, i) => (
          <li key={i} className='flex gap-3 text-sm'>
            <CheckIcon className='mt-0.5 size-5 shrink-0 text-primary' aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
