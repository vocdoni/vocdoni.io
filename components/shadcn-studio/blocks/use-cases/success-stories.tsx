import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { ArrowRightIcon, CheckCircle2Icon, TrendingUpIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Real logo imports
import logoBellpuig from '@/assets/logos/logo_bellpuig_colour.png'
import logoNewBelarus from '@/assets/logos/new_belarus.png'
import logoErc from '@/assets/logos/erc.png'
import logoCoib from '@/assets/logos/logo_coib_round.webp'

// Success story images
import imageBellpuig from '@/assets/images/success/bellpuig_experience.webp'
import imageCoib from '@/assets/images/success/coib_experience.webp'
import imageErc from '@/assets/images/success/esquerra_experience.webp'
import imageNewBelarus from '@/assets/images/success/newbelarus_experience.webp'


const SUCCESS_STORIES_CONFIG = [
  {
    id: 'bellpuig',
    logo: logoBellpuig,
    image: imageBellpuig,
    caseStudyHref: 'https://blog.vocdoni.io/referendum-bellpuig/',
    highlights: [],
  },
  {
    id: 'new_belarus',
    logo: logoNewBelarus,
    image: imageNewBelarus,
    caseStudyHref: 'https://blog.vocdoni.io/new-belarus-case-study/',
    highlights: [],
  },
  {
    id: 'erc',
    logo: logoErc,
    image: imageErc,
    caseStudyHref:
      'https://blog.vocdoni.io/esquerra-republicana-political-party-membership-vote-with-vocdoni-77-12-turnout-in-a-decisive-political-decision/',
    highlights: [],
  },
  {
    id: 'coib',
    logo: logoCoib,
    image: imageCoib,
    caseStudyHref:
      'https://blog.vocdoni.io/how-coib-a-professional-body-of-nurses-ran-its-2025-annual-general-meeting-vote-online-securely-and-with-instant-results/',
    highlights: [],
  },
]

const SuccessStories = () => {
  const { t } = useTranslation()

  return (
    <section id='success-stories' className='py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-20'>
          <MotionPreset
            component='p'
            className='text-primary text-sm font-medium uppercase tracking-wide'
            fade
            blur
            slide
            transition={{ duration: 0.5 }}
          >
            {t('use_cases_page.success_stories.eyebrow')}
          </MotionPreset>

          <MotionPreset
            component='h2'
            className='text-3xl font-bold sm:text-4xl lg:text-5xl'
            fade
            blur
            slide
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            {t('use_cases_page.success_stories.title')}
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground mx-auto max-w-3xl text-lg sm:text-xl'
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.5 }}
          >
            {t('use_cases_page.success_stories.subtitle')}
          </MotionPreset>
        </div>

        {/* Stories */}
        <div className='space-y-12'>
          {SUCCESS_STORIES_CONFIG.map((conf, index) => {
            const i18nKey = `use_cases_page.success_stories.items.${conf.id}`
            const rawStats = t(`${i18nKey}.stats`, { returnObjects: true })
            const stats = Array.isArray(rawStats) ? rawStats : []
            const rawHighlights = t(`${i18nKey}.highlights`, { returnObjects: true })
            const highlights = Array.isArray(rawHighlights) ? rawHighlights : conf.highlights

            return (
              <MotionPreset key={conf.id} fade blur slide delay={index * 0.1} transition={{ duration: 0.5 }}>
                <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-xl'>
                  <div className='grid gap-0 lg:grid-cols-2'>
                    {/* Image column */}
                    <div className='relative overflow-hidden lg:order-2'>
                      <div className='absolute inset-0 bg-gradient-to-br from-black/40 to-black/10' />
                      <img
                        src={conf.image}
                        alt={t(`${i18nKey}.org`)}
                        className='h-full w-full object-cover lg:min-h-[500px]'
                      />
                      {/* Org label on image */}
                      <div className='absolute bottom-6 left-6 right-6'>
                        <div className='flex items-center gap-3 text-white'>
                          <img
                            src={conf.logo}
                            alt={t(`${i18nKey}.org`)}
                            className='size-[60px] rounded-full bg-white object-contain p-1'
                          />
                          <div>
                            <p className='text-lg font-bold leading-tight'>{t(`${i18nKey}.org`)}</p>
                            <p className='text-sm opacity-80'>{t(`${i18nKey}.industry`)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content column */}
                    <CardContent className='flex flex-col justify-center p-8 lg:order-1 lg:p-12'>
                      {/* Quote */}
                      <div className='mb-6'>
                        <div className='mb-4 text-5xl leading-none opacity-20'>&ldquo;</div>
                        <blockquote className='text-muted-foreground mb-4 text-lg italic'>
                          {t(`${i18nKey}.quote`)}
                        </blockquote>
                        <p className='text-sm font-semibold'>
                          - {t(`${i18nKey}.author`)}, {t(`${i18nKey}.author_title`)}
                        </p>
                      </div>

                      {/* Stats */}
                      {stats.length > 0 && (
                        <div className='mb-6 grid grid-cols-3 gap-4 border-y py-6'>
                          {stats.map((stat: any, idx) => (
                            <div key={idx}>
                              <p className='text-primary mb-1 text-2xl font-bold'>{stat.value}</p>
                              <p className='mb-1 text-xs font-semibold'>{stat.label}</p>
                              <p className='text-muted-foreground text-xs'>{stat.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Impact */}
                      <div className='mb-6'>
                        <div className='mb-3 flex items-center gap-2'>
                          <TrendingUpIcon className='text-primary size-5' />
                          <p className='font-semibold'>{t('use_cases_page.success_stories.impact_label')}</p>
                        </div>
                        <p className='text-muted-foreground text-sm'>{t(`${i18nKey}.impact`)}</p>
                      </div>

                      {/* Highlights */}
                      <div className='mb-6'>
                        <div className='mb-3 flex items-center gap-2'>
                          <CheckCircle2Icon className='text-primary size-5' />
                          <p className='font-semibold'>{t('use_cases_page.success_stories.highlights_label')}</p>
                        </div>
                        <ul className='grid gap-2 sm:grid-cols-2'>
                          {Array.isArray(highlights) &&
                            highlights.map((highlight: string, idx: number) => (
                              <li key={idx} className='text-muted-foreground flex items-start text-sm'>
                                <span className='text-primary mr-2 mt-0.5'>✓</span>
                                {highlight}
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <Button variant='outline' className='w-full sm:w-auto' asChild>
                        <Link href={conf.caseStudyHref} variant='inlineIcon'>
                          {t(`${i18nKey}.cta_label`)}
                          <ArrowRightIcon className='size-4' />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </MotionPreset>
            )
          })}
        </div>
        {/* Read more CTA */}
        <div className='mt-16 flex justify-center'>
          <Button size='lg' className='min-w-[240px]' asChild>
            <Link href='https://blog.vocdoni.io/tag/success-stories/' variant='inlineIcon'>
              {t('use_cases_page.success_stories.read_more', 'Read more success stories')}
              <ArrowRightIcon className='ml-2 size-5' />
            </Link>
          </Button>
        </div>


      </div>
    </section>
  )
}

export default SuccessStories
