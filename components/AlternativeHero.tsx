import ScrollTriggeredCards from '@/components/ScrollTriggeredCards'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Import logos from assets
import logo1 from '@/assets/logo1.png'
import logo2 from '@/assets/logo2.png'
import logo3 from '@/assets/logo3.png'
import logo4 from '@/assets/logo4.png'
import logo5 from '@/assets/logo5.png'

const logos = [
  { name: 'Sovereign', url: logo1 },
  { name: 'Trust', url: logo2 },
  { name: 'Verifiable', url: logo3 },
  { name: 'Secure', url: logo4 },
  { name: 'Transparent', url: logo5 },
]

const fallbackWords = ['easy', 'secure', 'simple']

export default function AlternativeHero() {
  const { t } = useTranslation()
  const dynamicWords = useMemo(() => {
    const arr = t('hero.dynamicWords', { returnObjects: true }) as string[] | undefined
    return Array.isArray(arr) && arr.length > 0 ? arr : fallbackWords
  }, [t])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [dynamicWords.length])

  return (
    <section className='relative w-full min-h-screen flex items-center justify-center pb-12 px-4 md:px-8'>
      <div className='container mx-auto max-w-7xl'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-8 items-center w-full min-w-0'>
          {/* Left Column: Content */}
          <div className='flex flex-col items-start gap-6 relative z-10 w-full min-w-0'>
            <Link
              href='https://app.vocdoni.io'
              target='_blank'
              rel='noopener noreferrer'
              variant='heroBadge'
            >
              <span className='bg-foreground text-background px-2.5 py-0.5 rounded-full font-semibold shrink-0 flex items-center gap-1.5'>
                <span className='relative flex h-2 w-2'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
                </span>
                Vocdoni App
              </span>
              <span className='text-muted-foreground font-medium pr-2 leading-tight truncate flex items-center gap-1'>
                <span className='hidden sm:inline'>{t('hero.badge.descriptionLong')}</span>
                <span className='sm:hidden'>{t('hero.badge.descriptionShort')}</span>
                <ArrowRight className='h-3 w-3 transition-transform group-hover:translate-x-0.5 shrink-0' />
              </span>
            </Link>

            <h1 className='text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl max-w-2xl break-words'>
              {t('hero.title')}{' '}
              <span className='inline-flex min-w-[0px] xs:min-w-[120px] text-primary'>
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className='block'
                  >
                    {dynamicWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className='text-base sm:text-lg text-muted-foreground max-w-[600px] leading-relaxed break-words'>
              {t('hero.subtitle')}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
              <Button
                size='lg'
                className='group text-base transition-all duration-300 has-[>svg]:px-6 w-full sm:w-auto'
                asChild
              >
                <Link href='https://app.vocdoni.io' variant='inlineIcon'>
                  {t('hero.ctaPrimary')}
                  <ArrowRight className='h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
              <Button
                variant='outline'
                size='lg'
                asChild
                className='gap-2 w-full sm:w-auto border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10'
              >
                <Link href='https://wa.me/34621501155' target='_blank' rel='noopener noreferrer' variant='unstyled'>
                  <svg
                    className='inline-block mr-1 h-4 w-4'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden
                  >
                    <path
                      d='M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .08 5.29.08 11.92.08 14.64.88 17.24 2.36 19.33L0 24l4.8-2.48A11.92 11.92 0 0012 24c6.63 0 11.92-5.29 11.92-11.92 0-3.19-1.24-6.17-3.4-8.6z'
                      fill='#25D366'
                    />
                    <path
                      d='M17.3 14.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2 0-.4-.05-.55-.05-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.51-.17 0-.37 0-.57 0-.2 0-.53.08-.8.37-.27.3-1.03 1-1.03 2.43 0 1.43 1.05 2.8 1.2 3 .15.2 2.08 3.37 5.05 4.73 2.97 1.36 2.97.9 3.5.84.53-.07 1.72-.7 1.97-1.38.24-.69.24-1.28.17-1.4-.07-.12-.27-.18-.57-.33z'
                      fill='#fff'
                    />
                  </svg>
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>

            <div className='mt-8 w-full max-w-full'>
              <p className='text-sm text-muted-foreground mb-4 font-medium'>{t('hero.trustedBy')}</p>
              <div className='relative w-full max-w-full overflow-hidden mask-gradient-x'>
                {/* Gradient masks */}
                <div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none'></div>
                <div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none'></div>

                <div className='flex w-max animate-marquee gap-12 items-center hover:paused'>
                  {[...logos, ...logos, ...logos].map((logo, i) => (
                    <img
                      key={i}
                      src={logo.url}
                      alt={logo.name}
                      className='h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 dark:invert'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scroll Triggered Cards */}
          <div className='relative w-full lg:h-[600px] perspective-1000'>
            {/* Decorative background blotches */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10' />

            <div className='hidden lg:block relative w-full h-full'>
              <ScrollTriggeredCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
