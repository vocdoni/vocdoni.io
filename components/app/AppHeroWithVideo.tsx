import { ArrowRight, PlayCircleIcon, ScaleIcon, ShieldCheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import CleanYoutubePlayer from '@/components/app/CleanYoutubePlayer'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

const VIDEO_ID = 'lEPIjgeHYFs'
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`

export default function AppHeroWithVideo() {
  const { t } = useTranslation()

  return (
    <section className='relative w-full pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24'>
      <Container>
        <div className='grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 items-center w-full min-w-0'>
          {/* Left Column: copy + CTAs */}
          <div className='flex flex-col items-start gap-8 relative z-10 w-full min-w-0'>
            <div className='flex flex-col gap-6'>
              <MotionPreset fade blur slide delay={0} transition={{ duration: 0.5 }}>
                <h1 className='text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-6xl max-w-2xl break-words leading-none text-foreground text-balance'>
                  {t('vocdoni_app.app_hero.title', 'Run your vote online,')}{' '}
                  <span className='text-primary lg:block lg:mt-1'>
                    {t('vocdoni_app.app_hero.title_highlight', 'with confidence')}
                  </span>
                </h1>
              </MotionPreset>

              <MotionPreset fade blur slide delay={0.1} transition={{ duration: 0.5 }}>
                <p className='text-base sm:text-lg lg:text-xl text-muted-foreground/90 max-w-2xl leading-relaxed break-words font-medium'>
                  {t(
                    'vocdoni_app.app_hero.subtitle',
                    'Set up, send, and collect votes in minutes - from any device, with legal evidence and audit trail.'
                  )}
                </p>
              </MotionPreset>
            </div>

            <MotionPreset
              component='div'
              fade
              blur
              slide
              delay={0.2}
              transition={{ duration: 0.5 }}
              className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'
              motionProps={{
                role: 'group',
                'aria-label': t('vocdoni_app.app_hero.cta_group_label', 'App actions'),
              }}
            >
              <Button
                size='lg'
                className='group text-base transition-all duration-300 has-[>svg]:px-6 w-full sm:w-auto'
                asChild
              >
                <Link
                  href='https://app.vocdoni.io'
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='inlineIcon'
                  aria-label={t(
                    'vocdoni_app.app_hero.cta_primary_aria_label',
                    'Start for free in the Vocdoni app (opens in new tab)'
                  )}
                >
                  {t('vocdoni_app.app_hero.cta_primary', 'Start for free')}
                  <ArrowRight className='h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
              <Button variant='outline' size='lg' className='w-full sm:w-auto' asChild>
                <a href='#app-demo-video'>
                  <PlayCircleIcon />
                  {t('vocdoni_app.app_hero.cta_secondary', 'Watch the Demo')}
                </a>
              </Button>
            </MotionPreset>

            <MotionPreset
              component='div'
              fade
              blur
              slide
              delay={0.3}
              transition={{ duration: 0.5 }}
              className='flex items-center gap-5 pt-2 max-sm:flex-col max-sm:text-center text-muted-foreground'
            >
              <div className='flex items-center gap-2'>
                <ShieldCheckIcon className='size-5' />
                <span className='text-xs font-semibold tracking-wide uppercase'>
                  {t('vocdoni_app.app_hero.trust_gdpr', 'GDPR compliant')}
                </span>
              </div>
              <div className='hidden sm:block w-1 h-1 rounded-full bg-border' />
              <div className='flex items-center gap-2'>
                <ScaleIcon className='size-5' />
                <span className='text-xs font-semibold tracking-wide uppercase'>
                  {t('vocdoni_app.app_hero.trust_legal', 'Legal evidence')}
                </span>
              </div>
            </MotionPreset>
          </div>

          {/* Right Column: YouTube click-to-play */}
          <MotionPreset
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.6 }}
            className='relative w-full mt-6 lg:mt-0'
          >
            <div
              id='app-demo-video'
              className='aspect-video w-full sm:w-11/12 lg:w-full mx-auto rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/50 relative bg-muted'
            >
              <CleanYoutubePlayer
                videoId={VIDEO_ID}
                title={t('vocdoni_app.app_hero.cta_secondary', 'Watch the Demo')}
                coverUrl={THUMBNAIL_URL}
              />
            </div>
          </MotionPreset>
        </div>
      </Container>
    </section>
  )
}
