import { Link } from '@/components/Link'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { LuChevronDown } from 'react-icons/lu'

export function Landing() {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        'bg-[url(/assets/images/hero_background.png)] bg-cover bg-top bg-no-repeat',
        'relative h-viewport w-full flex flex-col items-center',
        'justify-center text-black'
      )}
    >
      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto'>
        {/* Main headline */}
        <h1 className='text-5xl md:text-7xl font-bold mb-6 tracking-tight'>
          {t('landing.headline', { defaultValue: "Let's build change" })}
        </h1>

        {/* Subtitle */}
        <p className='text-xl md:text-2xl mb-12 leading-relaxed font-light'>
          {t('landing.subtitle', { defaultValue: 'We build technology that makes every voice count.' })}
        </p>

        {/* CTA Buttons */}
        <div className='relative flex flex-col sm:flex-row gap-4 mb-20 justify-center'>
          <Link href='https://app.vocdoni.io' variant='hero' size='xl'>
            🗳️ {t('landing.start_vote', { defaultValue: 'Start your vote' })} →
          </Link>
          <Link href='/contact' variant='hero' size='xl'>
            ☎️ {t('landing.talk_with_us', { defaultValue: 'Talk with us' })} →
          </Link>

          {/* WhatsApp button - absolutely positioned to the right on desktop, stacked on mobile */}
          <div className='sm:absolute sm:left-[calc(100%+1rem)] sm:top-0 flex justify-center'>
            <WhatsAppButton noExpand />
          </div>
        </div>
      </div>

      {/* Explore Vocdoni - Bottom */}
      <Link
        href='/explore'
        className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors z-20'
      >
        <span className='text-lg font-medium mb-2'>{t('landing.explore', { defaultValue: 'Explore Vocdoni' })}</span>
        <LuChevronDown className='w-6 h-6 animate-bounce' />
      </Link>
    </div>
  )
}
