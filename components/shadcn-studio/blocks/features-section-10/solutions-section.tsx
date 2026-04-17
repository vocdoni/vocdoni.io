import { ArrowRightIcon, BriefcaseIcon, CodeIcon, VoteIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import AppPreview from '@/components/features/AppPreview'
import IntegrationsPreview from '@/components/features/IntegrationsPreview'
import ProjectsPreview from '@/components/features/ProjectsPreview'
import { Link } from '@/components/Link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

const Solutions = () => {
  const { t } = useTranslation()
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <MotionPreset fade blur slide delay={0} transition={{ duration: 0.5 }} inView inViewOnce>
          <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24'>
            <p className='text-primary text-sm font-medium uppercase'>{t('features.eyebrow')}</p>

            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>{t('features.title')}</h2>

            <p className='text-muted-foreground text-xl max-w-3xl'>{t('features.description')}</p>
          </div>
        </MotionPreset>

        {/* Feature Cards Grid */}
        <div className='flex gap-6 max-lg:flex-col'>
          {/* Card 1 */}
          <MotionPreset fade blur slide delay={0.1} transition={{ duration: 0.5 }} inView inViewOnce>
            <Card className='group flex-1 transition-all duration-500 hover:flex-2 hover:border-primary hover:bg-primary/10'>
              <CardContent className='flex p-6'>
                <div className='space-y-6'>
                  <Avatar className='size-10 shadow-sm'>
                    <AvatarFallback className='bg-card text-primary'>
                      <VoteIcon className='size-5' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='space-y-2'>
                    <CardTitle className='text-primary line-clamp-2 text-lg font-semibold'>
                      {t('features.cards.app.title')}
                    </CardTitle>
                    <CardDescription className='line-clamp-2'>{t('features.cards.app.description')}</CardDescription>
                  </div>
                  <Button
                    className='group text-primary group-hover:bg-primary group-hover:text-primary-foreground bg-transparent text-base transition-all duration-300 has-[>svg]:px-6'
                    size='lg'
                    asChild
                  >
                    <Link href='/app' variant='inlineIcon'>
                      {t('features.cards.app.cta')}
                      <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                    </Link>
                  </Button>
                </div>
                <div>
                  <div className='mx-auto hidden w-40 shrink-0 group-hover:inline sm:w-56'>
                    <AppPreview />
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Card 2 */}
          <MotionPreset fade blur slide delay={0.2} transition={{ duration: 0.5 }} inView inViewOnce>
            <Card className='group flex-1 transition-all duration-500 hover:flex-2 hover:border-black hover:bg-black/10 dark:hover:border-white dark:hover:bg-white/10'>
              <CardContent className='flex p-6'>
                <div className='space-y-6'>
                  <Avatar className='size-10 shadow-sm'>
                    <AvatarFallback className='bg-card text-black dark:text-white'>
                      <CodeIcon className='size-5' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='space-y-2'>
                    <CardTitle className='line-clamp-2 text-lg font-semibold text-black dark:text-white'>
                      {t('features.cards.integrations.title')}
                    </CardTitle>
                    <CardDescription className='line-clamp-2'>
                      {t('features.cards.integrations.description')}
                    </CardDescription>
                  </div>
                  <Button
                    className='group bg-transparent text-base text-black transition-all duration-300 group-hover:bg-black group-hover:text-white has-[>svg]:px-6 dark:text-white dark:group-hover:bg-white dark:group-hover:text-black'
                    size='lg'
                    asChild
                  >
                    <Link
                      href='https://developer.vocdoni.io/sdk'
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='inlineIcon'
                    >
                      {t('features.cards.integrations.cta')}
                      <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                    </Link>
                  </Button>
                </div>
                <div>
                  <div className='mx-auto hidden w-40 shrink-0 group-hover:inline sm:w-56'>
                    <IntegrationsPreview />
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Card 3 */}
          <MotionPreset fade blur slide delay={0.3} transition={{ duration: 0.5 }} inView inViewOnce>
            <Card className='group flex-1 border-sky-600/30 transition-all duration-500 hover:flex-2 hover:border-sky-600 hover:bg-sky-600/10 dark:border-sky-400/30 dark:hover:border-sky-400 dark:hover:bg-sky-400/10'>
              <CardContent className='flex p-6'>
                <div className='space-y-6'>
                  <Avatar className='size-10 shadow-sm'>
                    <AvatarFallback className='bg-card text-sky-600 dark:text-sky-400'>
                      <BriefcaseIcon className='size-5' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='space-y-2'>
                    <CardTitle className='line-clamp-2 text-lg font-semibold text-sky-600 dark:text-sky-400'>
                      {t('features.cards.projects.title')}
                    </CardTitle>
                    <CardDescription className='line-clamp-2'>
                      {t('features.cards.projects.description')}
                    </CardDescription>
                  </div>
                  <Button
                    className='group bg-transparent text-base text-sky-600 transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white has-[>svg]:px-6 dark:text-sky-400 dark:group-hover:bg-sky-400 dark:group-hover:text-white'
                    size='lg'
                    asChild
                  >
                    <Link href='#' variant='inlineIcon'>
                      {t('features.cards.projects.cta')}
                      <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                    </Link>
                  </Button>
                </div>
                <div>
                  <div className='mx-auto hidden w-40 shrink-0 group-hover:inline sm:w-56'>
                    <ProjectsPreview />
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default Solutions
