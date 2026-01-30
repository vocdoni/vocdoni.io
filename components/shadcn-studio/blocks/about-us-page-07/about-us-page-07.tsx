import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import aboutVocdoniImage from '@/assets/about_vocdoni.webp'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

type StatCard = {
  title: string
  description: string
}[]

type FeatureCard = {
  title: string
  description: string
}[]

const AboutUs = ({ statCards, featureCards }: { statCards: StatCard; featureCards: FeatureCard }) => {
  const { t } = useTranslation()
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 grid gap-16 lg:grid-cols-2'>
          <div className='space-y-10'>
            <MotionPreset fade blur slide delay={0} transition={{ duration: 0.5 }} inView inViewOnce>
              <div className='space-y-4'>
                <p className='text-primary text-sm font-medium uppercase'>{t('about_us.eyebrow')}</p>
                <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{t('about_us.title')}</h2>
                <p className='text-muted-foreground text-xl'>{t('about_us.description')}</p>
              </div>
            </MotionPreset>

            {/* Stats grid with 4 cards */}
            <div className='grid gap-6 md:grid-cols-2'>
              {statCards.map((stat, index) => (
                <MotionPreset
                  key={index}
                  fade
                  blur
                  slide
                  delay={0.1 + index * 0.1}
                  transition={{ duration: 0.5 }}
                  inView
                  inViewOnce
                >
                  <Card className='border-primary/30 hover:border-primary rounded-lg shadow-none transition-colors duration-300'>
                    <CardHeader>
                      <CardTitle className='text-xl'>{stat.title}</CardTitle>
                      <CardDescription className='text-base'>{stat.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </MotionPreset>
              ))}
            </div>

            <MotionPreset fade blur slide delay={0.5} transition={{ duration: 0.5 }} inView inViewOnce>
              <Button asChild size='lg' className='group rounded-lg text-base has-[>svg]:px-6'>
                <Link href='#' variant='inlineIcon'>
                  {t('about_us.read_more')}
                  <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
            </MotionPreset>
          </div>

          <MotionPreset fade blur slide delay={0.6} transition={{ duration: 0.5 }} inView inViewOnce>
            <img
              src={aboutVocdoniImage}
              alt={t('about_us.image_alt')}
              className='h-full max-h-175 w-full rounded-md object-cover'
            />
          </MotionPreset>
        </div>

        {/* Feature cards */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {featureCards.map((feature, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              slide
              delay={0.7 + index * 0.1}
              transition={{ duration: 0.5 }}
              inView
              inViewOnce
              className={index === featureCards.length - 1 ? 'max-lg:col-span-full' : ''}
            >
              <Card className='rounded-lg shadow-none h-full'>
                <CardHeader className='gap-3'>
                  <CardTitle className='flex items-center gap-3 text-xl'>
                    <CheckCircleIcon />
                    {feature.title}
                  </CardTitle>
                  <CardDescription className='text-base'>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs
