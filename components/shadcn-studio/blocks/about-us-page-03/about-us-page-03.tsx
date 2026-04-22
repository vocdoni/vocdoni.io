import teamGathering from '@/assets/images/team/team_gathering.webp'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

interface TabData {
  name: string
  value: string
  content: JSX.Element
}

type AboutUsData = {
  contentTitle: string
  contentDescription: string
  tabs: TabData[]
}

const AboutUs = ({ aboutUsData }: { aboutUsData: AboutUsData }) => {
  const { t } = useTranslation()

  return (
    <section className='pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Simplified KISS Header (Use Cases Style) */}
        <div className='mx-auto max-w-4xl text-center mb-16 lg:mb-24'>
          <MotionPreset
            component='p'
            className='text-primary mb-4 text-sm font-medium uppercase tracking-wide'
            fade
            blur
            slide
            transition={{ duration: 0.5 }}
            inView
            inViewOnce
          >
            {t('about_us.eyebrow')}
          </MotionPreset>

          <MotionPreset
            component='h1'
            className='mb-6 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-balance'
            fade
            blur
            slide
            delay={0.2}
            transition={{ duration: 0.5 }}
            inView
            inViewOnce
          >
            {t('about_us.hero.title')}
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto'
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.5 }}
            inView
            inViewOnce
          >
            {t('about_us.hero.subtitle')}
          </MotionPreset>
        </div>

        <div className='grid items-start gap-16 lg:grid-cols-2'>
          <MotionPreset
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.6 }}
            inView
            inViewOnce
            className='space-y-8'
          >
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold tracking-tight'>{aboutUsData.contentTitle}</h2>
              <p className='text-muted-foreground text-lg leading-relaxed'>{aboutUsData.contentDescription}</p>
            </div>

            <Separator className='bg-primary/10' />

            {aboutUsData.tabs.length > 0 && (
              <Tabs defaultValue={aboutUsData.tabs[0].value} className='space-y-8'>
                <TabsList className='inline-flex bg-muted p-1 rounded-xl h-auto'>
                  {aboutUsData.tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className='px-6 py-2 rounded-lg text-sm font-semibold'
                    >
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {aboutUsData.tabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value} className='min-h-[250px]'>
                    <MotionPreset fade blur slide delay={0} transition={{ duration: 0.3 }}>
                      {tab.content}
                    </MotionPreset>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </MotionPreset>

          <MotionPreset
            fade
            blur
            slide
            delay={0.6}
            transition={{ duration: 0.7 }}
            inView
            inViewOnce
            className='flex justify-center lg:justify-end sticky top-24'
          >
            <div className='relative max-w-lg w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-primary/10'>
              <img
                src={teamGathering}
                alt='The Vocdoni team'
                className='w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105'
              />
              {/* Subtle gradient to fade into the page */}
              <div className='absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none' />
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
