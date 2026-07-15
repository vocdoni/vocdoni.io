import { CensusCard, ResultsCard, VotingCard } from '@/components/HeroCards'
import { Link } from '@/components/Link'
import MobileHeroScroll from '@/components/MobileHeroScroll'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import TrustedBySection from '@/components/TrustedBySection'

const fallbackWords = ['easy', 'secure', 'simple']

const Hero = () => {
  const { t } = useTranslation()
  const dynamicWords = useMemo(() => {
    const arr = t('hero.dynamic_words', { returnObjects: true }) as string[] | undefined
    return Array.isArray(arr) && arr.length > 0 ? arr : fallbackWords
  }, [t])
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [dynamicWords.length, reducedMotion])

  return (
    <section className='relative w-full pt-6 pb-20 lg:pt-10 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-8 items-center w-full min-w-0'>
          {/* Left Column: Content */}
          <div className='flex flex-col items-start gap-6 relative z-10 w-full min-w-0'>
            <MotionPreset fade slide delay={0} transition={{ duration: 0.5 }}>
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.55rem] leading-[0.95] max-w-3xl break-words text-foreground text-balance'>
                {t('hero.title')}{' '}
                <span className='inline-flex min-w-[0px] xs:min-w-[120px] text-primary relative'>
                  {reducedMotion ? (
                    <span className='block'>{dynamicWords[0]}</span>
                  ) : (
                    <AnimatePresence mode='wait'>
                      <motion.span
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className='block'
                      >
                        {dynamicWords[index]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </span>
              </h1>
            </MotionPreset>

            <MotionPreset fade slide delay={0.2} transition={{ duration: 0.5 }}>
              <p className='text-base sm:text-lg text-muted-foreground max-w-[600px] leading-relaxed break-words'>
                {t('hero.subtitle')}
              </p>
            </MotionPreset>

            {/* Mobile Cards - Between text and buttons */}
            <div className='lg:hidden w-full flex justify-center' aria-hidden='true'>
              <MobileHeroScroll />
            </div>

            <MotionPreset fade slide delay={0.3} transition={{ duration: 0.5 }}>
              <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
                <Button variant='dark' size='lg' className='group text-base has-[>svg]:px-6 w-full sm:w-auto' asChild>
                  <Link href={APP_URL} variant='inlineIcon'>
                    {t('hero.cta_primary')}
                    <ArrowRight
                      className='h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5'
                      aria-hidden='true'
                    />
                  </Link>
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  asChild
                  className='gap-2 w-full sm:w-auto border-whatsapp text-whatsapp bg-whatsapp/8 hover:bg-whatsapp/25'
                >
                  <Link href='https://wa.me/34621501155' target='_blank' rel='noopener noreferrer' variant='unstyled'>
                    <svg
                      className='inline-block mr-1 h-4 w-4 text-whatsapp'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden
                    >
                      <path
                        d='M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .08 5.29.08 11.92.08 14.64.88 17.24 2.36 19.33L0 24l4.8-2.48A11.92 11.92 0 0012 24c6.63 0 11.92-5.29 11.92-11.92 0-3.19-1.24-6.17-3.4-8.6z'
                        fill='currentColor'
                      />
                      <path
                        d='M17.3 14.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2 0-.4-.05-.55-.05-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.51-.17 0-.37 0-.57 0-.2 0-.53.08-.8.37-.27.3-1.03 1-1.03 2.43 0 1.43 1.05 2.8 1.2 3 .15.2 2.08 3.37 5.05 4.73 2.97 1.36 2.97.9 3.5.84.53-.07 1.72-.7 1.97-1.38.24-.69.24-1.28.17-1.4-.07-.12-.27-.18-.57-.33z'
                        fill='#fff'
                      />
                    </svg>
                    {t('hero.cta_secondary')}
                  </Link>
                </Button>
              </div>
            </MotionPreset>

            <MotionPreset fade slide delay={0.4} transition={{ duration: 0.5 }} className='mt-8 w-full max-w-full'>
              <TrustedBySection />
            </MotionPreset>
          </div>

          {/* Right Column: Visual Component (3 Steps) */}
          <div
            className='hidden lg:flex relative w-full lg:h-full items-center justify-end py-6 pl-14'
            aria-hidden='true'
          >
            {/* Structural Container */}
            <div className='relative flex flex-col gap-10 w-full max-w-[420px]'>
              {/* Vertical connector line */}
              <motion.div
                className='absolute -left-10 -top-4 bottom-[60px] w-[2px] bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 z-0'
                {...(reducedMotion
                  ? {}
                  : {
                      initial: { scaleY: 0 },
                      animate: { scaleY: 1 },
                      transition: { duration: 1.5, ease: 'easeInOut' },
                    })}
                style={{ originY: 0, x: '-50%' }}
              />

              {/* Data flow particle */}
              {!reducedMotion && (
                <motion.div
                  className='absolute -left-10 -top-4 w-1 h-12 bg-primary rounded-full shadow-[0_0_12px_theme(colors.primary.DEFAULT)] opacity-0'
                  animate={{ y: [0, 650], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                  style={{ x: '-50%' }}
                />
              )}

              {/* Step 1: Census */}
              <motion.div
                className='relative z-10 w-full'
                {...(reducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, x: 30 },
                      animate: { opacity: 1, x: 0 },
                      transition: { duration: 0.7, delay: 0.2, type: 'spring', bounce: 0.4 },
                    })}
              >
                {/* Connector */}
                <div className='absolute -left-10 top-[48px] w-10 h-px border-t border-dashed border-primary/40' />
                <div className='absolute -left-10 top-[43px] w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_8px_theme(colors.primary.DEFAULT)]' />

                <div className='card-hover rounded-card bg-card border border-border shadow-sm relative overflow-hidden group'>
                  <div className='absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  <CensusCard />
                </div>
              </motion.div>

              {/* Step 2: Voting Process */}
              <motion.div
                className='relative z-20 w-full'
                {...(reducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, x: 30 },
                      animate: { opacity: 1, x: 0 },
                      transition: { duration: 0.7, delay: 0.5, type: 'spring', bounce: 0.4 },
                    })}
              >
                {/* Connector */}
                <div className='absolute -left-10 top-[44px] w-10 h-px border-t border-dashed border-primary/40' />
                <div className='absolute -left-10 top-[39px] w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_8px_theme(colors.primary.DEFAULT)]' />

                <div className='card-hover rounded-card bg-card border border-border shadow-sm relative overflow-hidden group'>
                  <div className='absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  <VotingCard animated={true} />
                </div>
              </motion.div>

              {/* Step 3: Verified Results */}
              <motion.div
                className='relative z-10 w-full'
                {...(reducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, x: 30 },
                      animate: { opacity: 1, x: 0 },
                      transition: { duration: 0.7, delay: 0.8, type: 'spring', bounce: 0.4 },
                    })}
              >
                {/* Connector */}
                <div className='absolute -left-10 top-[40px] w-10 h-px border-t border-dashed border-primary/40' />
                <div className='absolute -left-10 top-[35px] w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_8px_theme(colors.primary.DEFAULT)]' />

                <div className='card-hover rounded-card bg-card border border-border shadow-sm relative overflow-hidden group'>
                  <div className='absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  <ResultsCard animated={true} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
