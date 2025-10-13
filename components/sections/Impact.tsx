import { useTranslation } from 'react-i18next'
import { Link } from '../Link'

export function Impact() {
  const { t } = useTranslation()
  return (
    <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2'>
      {/* Impact Overview */}
      <div className='flex flex-col'>
        <div className='flex-1 bg-background flex flex-col items-center justify-center'>
          <div className='w-full px-6 flex flex-col gap-6'>
            <p className='text-3xl font-medium'>→ {t('services.impact', { defaultValue: 'Impact in numbers' })}</p>
            <p className='text-2xl md:text-3xl hidden lg:block leading-relaxed tracking-tight'>
              {t('impact.description', {
                defaultValue:
                  'Transforming governance, one vote at a time. Our technology drives participation, reduces costs, and provides secure participation with the best user experience.',
              })}
            </p>
          </div>
        </div>
        <div className='hidden lg:block w-full px-6 py-6'>
          <Link href='/stories' className='block text-2xl font-semibold text-muted-foreground'>
            {t('impact.real_stories', { defaultValue: 'Real Stories, Real Impact' })} ↓
          </Link>
        </div>
      </div>

      {/* Impact numbers */}
      <div className='grid w-full h-full min-h-[420px] grid-cols-1 lg:grid-cols-2'>
        {/* Top-left */}
        <div className='bg-[#CDC8E0] p-6 md:p-10 flex items-end'>
          <div>
            <div className='text-5xl md:text-7xl font-extrabold leading-none'>+200k</div>
            <div className='mt-1 text-xs md:text-sm text-black/70'>
              {t('impact.votes_processed', { defaultValue: 'Votes processed' })}
            </div>
          </div>
        </div>

        {/* Top-right */}
        <div className='bg-[#D8D6E9] p-6 md:p-10 flex items-end'>
          <div>
            <div className='text-5xl md:text-7xl font-extrabold leading-none'>
              10<span className='text-3xl md:text-4xl'>x</span>
            </div>
            <div className='mt-1 text-xs md:text-sm text-black/70'>
              {t('impact.cheaper_than_alternatives', { defaultValue: 'Cheaper than alternatives' })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='bg-[#ECEAF4] p-6 md:p-10 lg:col-span-2 flex items-end'>
          <div>
            <div className='text-5xl md:text-7xl font-extrabold leading-none'>
              30<span className='text-5xl md:text-7xl'>%</span>
            </div>
            <div className='mt-1 text-xs md:text-sm text-black/70'>
              {t('impact.average_turnout', { defaultValue: 'Average turnout when using Vocdoni' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
