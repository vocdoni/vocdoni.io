import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Link } from '../Link'
import { Heading, Paragraph } from '../ui/typography'

type ImpactStat = {
  id: string
  value: string
  label: string
  background: string
  suffix?: string
  suffixClassName?: string
  containerClassName?: string
}

export const Impact = () => {
  const { t } = useTranslation()

  const stats: ImpactStat[] = [
    {
      id: 'votes-processed',
      value: '+200k',
      label: t('impact.votes_processed', { defaultValue: 'Votes processed' }),
      background: 'bg-[#CDC8E0]',
    },
    {
      id: 'cheaper-than-alternatives',
      value: '10',
      suffix: 'x',
      // suffixClassName: 'text-3xl md:text-4xl',
      label: t('impact.cheaper_than_alternatives', { defaultValue: 'Cheaper than alternatives' }),
      background: 'bg-[#D8D6E9]',
    },
    {
      id: 'average-turnout',
      value: '30',
      suffix: '%',
      label: t('impact.average_turnout', { defaultValue: 'Average turnout when using Vocdoni' }),
      background: 'bg-[#ECEAF4]',
      containerClassName: 'lg:col-span-2',
    },
  ]

  return (
    <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2'>
      <ImpactOverview />
      <ImpactStatsGrid stats={stats} />
    </div>
  )
}

const ImpactOverview = () => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col'>
      <div className='flex-1 flex flex-col items-start justify-center w-full px-6 gap-6'>
        <Heading variant='section'>→ {t('services.impact', { defaultValue: 'Impact in numbers' })}</Heading>
        <Paragraph variant='section'>
          {t('impact.description', {
            defaultValue:
              'Transforming governance, one vote at a time. Our technology drives participation, reduces costs, and provides secure participation with the best user experience.',
          })}
        </Paragraph>
      </div>
      <div className='hidden lg:block w-full px-6 py-6'>
        <Link href='/testimonials' className='block text-2xl font-semibold text-muted-foreground'>
          {t('impact.real_stories', { defaultValue: 'Real Stories, Real Impact' })} ↓
        </Link>
      </div>
    </div>
  )
}

type ImpactStatsGridProps = {
  stats: ImpactStat[]
}

const ImpactStatsGrid = ({ stats }: ImpactStatsGridProps) => (
  <div className='grid w-full h-full min-h-[420px] grid-cols-1 lg:grid-cols-2'>
    {stats.map((stat) => (
      <ImpactStatCard key={stat.id} {...stat} />
    ))}
  </div>
)

const ImpactStatCard = ({ value, label, background, suffix, suffixClassName, containerClassName }: ImpactStat) => (
  <div className={cn('p-6 md:p-10 flex items-end', background, containerClassName)}>
    <div>
      <div className='text-5xl md:text-7xl font-extrabold leading-none'>
        {value}
        {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
      </div>
      <div className='mt-1 text-xs md:text-sm text-black/70'>{label}</div>
    </div>
  </div>
)
