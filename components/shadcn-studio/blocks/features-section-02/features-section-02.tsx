import { useTranslation } from 'react-i18next'

import AccordionWithImage from '@/components/shadcn-studio/blocks/features-section-02/accordion-with-image'
import { MotionPreset } from '@/components/ui/motion-preset'

const StepsSection = () => {
  const { t } = useTranslation()

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            {t('steps_section.title_start', 'Your first secure election, up and running in')}{' '}
            <span className='relative z-10'>
              {t('steps_section.title_highlight', 'three steps')}
              <span
                className='bg-primary absolute bottom-0 left-0 -z-10 h-px w-full max-sm:hidden'
                aria-hidden='true'
              />
            </span>
          </MotionPreset>
          <MotionPreset
            component='p'
            className='text-muted-foreground mx-auto max-w-2xl text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            {t(
              'steps_section.subtitle',
              'No technical setup, no paperwork. Upload your members, build your ballot, and share the link - that is all it takes.'
            )}
          </MotionPreset>
        </div>

        <AccordionWithImage />
      </div>
    </section>
  )
}

export default StepsSection
