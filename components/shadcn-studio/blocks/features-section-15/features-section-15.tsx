import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from '@/components/Link'

type TabItem = {
  name: string
  value: string
  src: string
  darkSrc: string
}

const EasyFeatures = () => {
  const { t } = useTranslation()

  const tabs: TabItem[] = [
    {
      name: t('easy_features.tabs.members.name', 'Manage members'),
      value: 'members',
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-28.png',
      darkSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-28-dark.png',
    },
    {
      name: t('easy_features.tabs.create.name', 'Create a vote'),
      value: 'create',
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-27.png',
      darkSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-27-dark.png',
    },
    {
      name: t('easy_features.tabs.manage.name', 'Manage a vote'),
      value: 'manage',
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-37.png',
      darkSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-37-dark.png',
    },
    {
      name: t('easy_features.tabs.vote.name', 'Cast a vote'),
      value: 'vote',
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-38.png',
      darkSrc: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-38-dark.png',
    },
  ]

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      {tabs.map((tab) => (
        <Fragment key={tab.name}>
          <img src={tab.src} alt={tab.name} className='hidden' fetchPriority='high' />
          <img src={tab.darkSrc} alt={tab.name} className='hidden' fetchPriority='high' />
        </Fragment>
      ))}

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset fade blur slide={{ direction: 'up', offset: 50 }} transition={{ duration: 0.5 }}>
            <div className='text-primary text-sm font-medium uppercase'>
              {t('easy_features.eyebrow', 'How it works')}
            </div>
          </MotionPreset>
          <MotionPreset
            component='h2'
            className='mx-auto max-w-2xl text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            blur
            slide={{ direction: 'up', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            {t('easy_features.title', 'Everything your organization needs to vote')}
          </MotionPreset>
          <MotionPreset fade blur slide={{ direction: 'up', offset: 50 }} delay={0.5} transition={{ duration: 0.5 }}>
            <Button size='lg' asChild>
              <Link href='https://app.vocdoni.io' variant='unstyled'>{t('easy_features.cta', 'Try it free')}</Link>
            </Button>
          </MotionPreset>
        </div>

      </div>

      <Tabs defaultValue='members' className='w-full gap-8'>
        <MotionPreset
          fade
          blur
          slide
          delay={0.6}
          transition={{ duration: 0.5 }}
          className='w-full overflow-x-auto overflow-y-clip'
        >
          <TabsList className='bg-background w-full justify-center rounded-none p-0 group-data-[orientation=horizontal]/tabs:h-9'>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className='bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted-foreground/30 border-border h-full rounded-none border-0 border-b-2 text-center data-[state=active]:shadow-none!'
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </MotionPreset>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 80 }}
          delay={0.8}
          transition={{ duration: 0.5 }}
        >
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <img
                  src={tab.src}
                  alt={tab.name}
                  className='size-full rounded-3xl border object-contain dark:hidden'
                />
                <img
                  src={tab.darkSrc}
                  alt={tab.name}
                  className='hidden size-full rounded-3xl border object-contain dark:block'
                />
              </TabsContent>
            ))}
          </div>
        </MotionPreset>
      </Tabs>
    </section>
  )
}

export default EasyFeatures
