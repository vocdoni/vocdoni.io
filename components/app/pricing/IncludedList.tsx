import {
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

type IncludedGroup = {
  key: string
  icon: LucideIcon
  title: string
  items: string[]
}

export function IncludedList({ onRequest }: { onRequest: () => void }) {
  const { t } = useTranslation()

  // Only features the app ships today and every vote gets; paid add-ons stay out of this list.
  const groups: IncludedGroup[] = [
    {
      key: 'security',
      icon: ShieldCheckIcon,
      title: t('pricing.included.security.title', 'Secure and verifiable'),
      items: [
        t('pricing.included.security.item_1', 'Nobody can link a ballot to the person who cast it'),
        t('pricing.included.security.item_2', 'Every voter can check their own vote was counted'),
        t('pricing.included.security.item_3', 'Results anyone can verify'),
        t('pricing.included.security.item_4', 'No one, not even Vocdoni, can change the result'),
      ],
    },
    {
      key: 'voters',
      icon: UsersIcon,
      title: t('pricing.included.voters.title', 'Simple for voters'),
      items: [
        t(
          'pricing.included.voters.item_1',
          'Voters sign in with the credentials you choose, plus an optional code by email'
        ),
        t('pricing.included.voters.item_2', 'Works on any phone, tablet or computer'),
        t('pricing.included.voters.item_3', "The voting page in your voters' own language"),
      ],
    },
    {
      key: 'organisers',
      icon: SlidersHorizontalIcon,
      title: t('pricing.included.organisers.title', 'Tools for organisers'),
      items: [
        t('pricing.included.organisers.item_1', 'As many questions as you need, single or multiple choice'),
        t('pricing.included.organisers.item_2', "Weighted voting, using each member's voting power"),
        t('pricing.included.organisers.item_3', 'Import your voter list from a spreadsheet'),
        t('pricing.included.organisers.item_4', 'Live results, or results hidden until the vote ends'),
        t('pricing.included.organisers.item_5', 'Live turnout while the vote is open'),
        t('pricing.included.organisers.item_6', 'Start now or schedule it, and pause or end it early'),
      ],
    },
  ]

  return (
    <div>
      <div className='max-w-2xl'>
        <h3 className='font-serif text-2xl font-normal sm:text-3xl'>
          {t('pricing.included.title', 'Everything included')}
        </h3>
        <p className='mt-2 text-muted-foreground'>
          {t('pricing.included.subtitle', 'Every vote comes with all of this, at no extra cost.')}
        </p>
      </div>

      <div className='mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {groups.map(({ key, icon: Icon, title, items }) => (
          <div key={key} className='rounded-card border border-border/60 bg-background p-5 shadow-sm sm:p-6'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                <Icon className='size-5' aria-hidden />
              </div>
              <h4 className='text-base font-medium'>{title}</h4>
            </div>
            <ul className='mt-5 flex flex-col gap-3'>
              {items.map((item) => (
                <li key={item} className='flex gap-2.5 text-sm leading-6'>
                  <CheckIcon className='mt-1 size-4 shrink-0 text-primary' aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* The list is the base: anything beyond it is built on request */}
      <div className='mt-4 flex flex-col gap-4 rounded-card border border-dashed border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6'>
        <div className='flex gap-3'>
          <SparklesIcon className='mt-0.5 size-5 shrink-0 text-primary' aria-hidden />
          <div>
            <p className='font-medium'>{t('pricing.included.custom.title', 'Need something more?')}</p>
            <p className='mt-1 text-sm text-muted-foreground'>
              {t(
                'pricing.included.custom.body',
                'This is the base every vote gets. Custom features, other ways for voters to sign in or anything specific your vote needs: ask us and we build it.'
              )}
            </p>
          </div>
        </div>
        <Button variant='outline' className='w-full shrink-0 sm:w-auto' onClick={onRequest}>
          {t('pricing.included.custom.cta', 'Ask us')}
          <ArrowRightIcon aria-hidden />
        </Button>
      </div>
    </div>
  )
}
