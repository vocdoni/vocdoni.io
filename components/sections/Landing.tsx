import { Link } from '@/components/Link'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { LuChevronDown } from 'react-icons/lu'

export function Landing() {
  const { t } = useTranslation()
  const GTMClickTest = () => {
    if (typeof (window as any).gtag === 'function') {
      try {
        console.log('its actually executing it...')
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-17230168173/eq3RCK_B8OkbEO2A_pdA',
          value: 1.0,
          currency: 'USD',
        })
      } catch (error) {
        console.error('GTM Click Test Error:', error)
      }
    }
  }
  return (
    <div
      className={cn(
        'bg-[url(/assets/images/hero_background.png)] bg-cover bg-top bg-no-repeat',
        'relative min-h-[100dvh] w-full flex flex-col items-center',
        'justify-center text-black py-16 xs:py-20 md:py-0 md:h-screen'
      )}
    >
      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto'>
        {/* Main headline - text-4xl for SE, text-5xl for larger phones, text-6xl for tablets */}
        <h1 className='text-4xl min-[376px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 md:mb-8 tracking-tighter leading-[1.1]'>
          {t('landing.headline', { defaultValue: "Let's build change" })}
        </h1>

        {/* Subtitle */}
        <p className='text-lg min-[376px]:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-14 leading-relaxed font-light max-w-3xl'>
          {t('landing.subtitle', { defaultValue: 'We build technology that makes every voice count.' })}
        </p>

        {/* CTA Buttons */}
        <div className='relative flex flex-col sm:flex-row gap-3 sm:gap-5 mb-12 md:mb-20 justify-center items-center'>
          <Link
            href='https://app.vocdoni.io'
            variant='hero'
            size='xl'
            className='group shadow-lg hover:shadow-xl transition-shadow h-12 px-6 min-[376px]:h-14 min-[376px]:px-8 text-base min-[376px]:text-lg md:text-lg'
            onClick={GTMClickTest}
          >
            {t('landing.start_vote', { defaultValue: 'Start your vote' })}
            <LuChevronDown className='ml-1.5 h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-0.5' />
          </Link>
          <Link
            href='/contact'
            variant='hero'
            size='xl'
            className='group shadow-lg hover:shadow-xl transition-shadow h-12 px-6 min-[376px]:h-14 min-[376px]:px-8 text-base min-[376px]:text-lg md:text-lg'
            onClick={GTMClickTest}
          >
            {t('landing.talk_with_us', { defaultValue: 'Talk with us' })}
            <LuChevronDown className='ml-1.5 h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-0.5' />
          </Link>

          {/* WhatsApp button - absolutely positioned to the right on desktop, stacked on mobile */}
          <div className='sm:absolute sm:left-[calc(100%+1.5rem)] sm:top-0 flex justify-center mt-4 sm:mt-0'>
            <WhatsAppButton noExpand />
          </div>
        </div>
      </div>

      {/* Explore Vocdoni - Bottom */}
      <Link
        href='/explore'
        className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors z-20'
      >
        <span className='text-base md:text-lg font-medium mb-2'>
          {t('landing.explore', { defaultValue: 'Explore Vocdoni' })}
        </span>
        <LuChevronDown className='w-5 h-5 md:w-6 md:h-6 animate-bounce' />
      </Link>
    </div>
  )
}
