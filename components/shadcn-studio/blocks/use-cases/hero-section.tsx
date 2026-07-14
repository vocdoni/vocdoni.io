import { MotionPreset } from '@/components/ui/motion-preset'
import { useTranslation } from 'react-i18next'

const UseCasesHero = () => {
  const { t } = useTranslation()

  const rawStats = t('use_cases_page.hero.stats', { returnObjects: true })
  const stats = Array.isArray(rawStats) ? rawStats : []

  return (
    <section className='relative pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <MotionPreset
            component='p'
            className='text-primary mb-4 text-sm font-medium uppercase tracking-wide'
            fade
            blur
            slide
            transition={{ duration: 0.5 }}
          >
            {t('use_cases_page.hero.eyebrow')}
          </MotionPreset>

          <MotionPreset
            component='h1'
            className='mb-6 text-2xl sm:text-3xl lg:text-4xl text-balance'
            fade
            blur
            slide
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            {t('use_cases_page.hero.title')}
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground mb-8 text-lg sm:text-xl'
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.5 }}
          >
            {t('use_cases_page.hero.subtitle')}
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default UseCasesHero
