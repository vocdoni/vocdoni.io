import { CheckCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import aboutVocdoniImage from '@/assets/about_vocdoni.webp'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

type StatCard = {
  title: string
  description: string
}[]

type FeatureCard = {
  title: string
  description: string
}[]

type Tab = {
  id: string
  title: string
  content: string
}

const AboutUs = ({
  statCards,
  featureCards,
  tabs = [],
  hideTeam = false,
}: {
  statCards: StatCard
  featureCards: FeatureCard
  tabs?: Tab[]
  hideTeam?: boolean
}) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  return (
    <section className='py-8 sm:py-16 lg:py-24 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 grid gap-16 lg:grid-cols-2'>
          <div className='space-y-10'>
            <MotionPreset fade blur slide delay={0} transition={{ duration: 0.5 }} inView inViewOnce>
              <div className='space-y-4'>
                <p className='text-primary text-sm font-medium uppercase'>{t('about_us.eyebrow')}</p>
                <h2 className='text-3xl font-bold md:text-4xl lg:text-5xl tracking-tight leading-tight'>
                  {t('about_us.title')}
                </h2>
                <p className='text-muted-foreground text-xl leading-relaxed'>{t('about_us.description')}</p>
              </div>
            </MotionPreset>

            {/* Mission/Vision/Values Tabs - only shown when tabs are provided */}
            {tabs.length > 0 && (
              <MotionPreset fade blur slide delay={0.2} transition={{ duration: 0.5 }} inView inViewOnce>
                <div className='space-y-8 py-6 border-y border-primary/5'>
                  <div className='inline-flex bg-muted p-1 rounded-xl'>
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          'px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                          activeTab === tab.id
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                  <div className='min-h-[120px]'>
                    {tabs.map(
                      (tab) =>
                        activeTab === tab.id && (
                          <MotionPreset
                            key={tab.id}
                            fade
                            blur
                            slide
                            delay={0}
                            transition={{ duration: 0.3 }}
                            className='space-y-4'
                          >
                            <p className='text-muted-foreground text-lg leading-relaxed'>{tab.content}</p>
                          </MotionPreset>
                        )
                    )}
                  </div>
                </div>
              </MotionPreset>
            )}

            {/* Stats grid with 4 cards */}
            <div className='grid gap-6 md:grid-cols-2'>
              {statCards.map((stat, index) => (
                <MotionPreset
                  key={index}
                  fade
                  blur
                  slide
                  delay={0.3 + index * 0.1}
                  transition={{ duration: 0.5 }}
                  inView
                  inViewOnce
                  className='h-full'
                >
                  <Card className='h-full border border-primary/10 hover:border-primary/30 rounded-2xl shadow-none transition-all duration-300 hover:bg-primary/[0.02]'>
                    <CardHeader className='p-6'>
                      <CardTitle className='text-2xl font-bold text-primary'>{stat.title}</CardTitle>
                      <CardDescription className='text-base font-medium text-foreground/80'>
                        {stat.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </MotionPreset>
              ))}
            </div>
          </div>

          <MotionPreset
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.6 }}
            inView
            inViewOnce
            className='relative flex items-center justify-center lg:justify-end'
          >
            {/* Delightful decorative background glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10' />
            <div className='relative group rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-primary/10 w-full max-w-lg aspect-[4/5]'>
              <img
                src={aboutVocdoniImage}
                alt={t('about_us.image_alt')}
                className='h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/40 to-transparent' />
            </div>
          </MotionPreset>
        </div>

        {/* Feature cards */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-16 lg:mt-32'>
          {featureCards.map((feature, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              slide
              delay={0.5 + index * 0.1}
              transition={{ duration: 0.5 }}
              inView
              inViewOnce
              className={index === featureCards.length - 1 ? 'max-lg:col-span-full' : ''}
            >
              <Card className='rounded-2xl shadow-none h-full border border-primary/5 hover:border-primary/20 transition-colors'>
                <CardHeader className='gap-4 p-8'>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary'>
                    <CheckCircleIcon className='w-6 h-6' />
                  </div>
                  <div className='space-y-2'>
                    <CardTitle className='text-xl font-bold'>{feature.title}</CardTitle>
                    <CardDescription className='text-base leading-relaxed'>{feature.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </MotionPreset>
          ))}
        </div>

        {/* Minor Team Mention */}
        {!hideTeam && (
          <MotionPreset fade blur slide delay={1} transition={{ duration: 0.5 }} inView inViewOnce>
            <div className='mt-24 pt-16 border-t border-primary/10 text-center max-w-3xl mx-auto'>
              <h3 className='text-lg font-bold mb-4 uppercase tracking-widest text-primary/60'>
                {t('about_us.team.title')}
              </h3>
              <p className='text-muted-foreground text-xl leading-relaxed font-medium italic'>
                "{t('about_us.team.description')}"
              </p>
            </div>
          </MotionPreset>
        )}
      </div>
    </section>
  )
}

export default AboutUs
