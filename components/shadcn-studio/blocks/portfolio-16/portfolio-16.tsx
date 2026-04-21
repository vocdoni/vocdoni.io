import { ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset } from '@/components/ui/motion-preset'
import { useTranslation } from 'react-i18next'
import { Link } from '@/components/Link'
import { CalBookingDialog } from '@/components/CalBookingDialog'

export type PortfolioItem = {
  id: number
  title: string
  description: string
  link: string
  target?: string
  type?: 'link' | 'booking'
  imageUrl: string
  imageAlt: string
  backgroundColor?: string
  btnColor?: string
  imageClassName?: string
  imageWrapperClassName?: string
}

type PortfolioProps = {
  portfolioItems: PortfolioItem[]
}

const Portfolio = ({ portfolioItems }: PortfolioProps) => {
  const { t } = useTranslation()
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-20 lg:px-8'>
        {/* Header */}
        <MotionPreset fade blur slide delay={0} transition={{ duration: 0.5 }} inView inViewOnce>
          <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24'>
            <p className='text-primary text-sm font-medium uppercase'>
              {t('portfolio.solutions.badge', 'Solutions')}
            </p>
            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
              {t('portfolio.solutions.title', 'Democratic tools that adapt to your needs')}
            </h2>
            <p className='text-muted-foreground text-xl max-w-3xl'>
              {t('portfolio.solutions.description', 'Choose the right fit for your organization: launch in minutes with our self-service app, build on top of our secure SDK, or let us manage the entire process for you.')}
            </p>
          </div>
        </MotionPreset>

        {/* Portfolio Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {portfolioItems.map((project, index) => (
            <MotionPreset
              key={project.id}
              fade
              blur
              zoom={{ initialScale: 0.9 }}
              delay={0.6 + index * 0.2}
              transition={{ duration: 0.6 }}
            >
              {project.type === 'booking' ? (
                <CalBookingDialog triggerAriaLabel={`Book meeting for ${project.title}`} className='flex h-full w-full text-left'>
                  <Card
                    className={`group relative flex h-full w-full flex-col justify-between overflow-hidden border-none pb-0 shadow-none transition-all duration-300 ${project.backgroundColor}`}
                  >
                    <CardContent className='p-6 md:p-8 space-y-3'>
                      <CardTitle className='text-primary line-clamp-2 text-lg font-semibold'>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <div className={`mt-auto flex items-end justify-center ${project.imageWrapperClassName || 'pt-4'}`}>
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${project.imageClassName || ''}`}
                      />
                    </div>
                    <Button
                      size='icon'
                      className={`group absolute right-5 bottom-5 rounded-full text-white ${project.btnColor}`}
                    >
                      <span className='sr-only'>View project details</span>
                      <ArrowRightIcon className='rotate-337 transition-transform duration-200 group-hover:rotate-360' />
                    </Button>
                  </Card>
                </CalBookingDialog>
              ) : (
                <Link href={project.link} target={project.target} rel={project.target === '_blank' ? 'noopener noreferrer' : undefined} variant='unstyled' className='flex h-full w-full'>
                  <Card
                    className={`group relative flex h-full w-full flex-col justify-between overflow-hidden border-none pb-0 shadow-none transition-all duration-300 ${project.backgroundColor}`}
                  >
                    <CardContent className='p-6 md:p-8 space-y-3'>
                      <CardTitle className='text-primary line-clamp-2 text-lg font-semibold'>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <div className={`mt-auto flex items-end justify-center ${project.imageWrapperClassName || 'pt-4'}`}>
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${project.imageClassName || ''}`}
                      />
                    </div>
                    <Button
                      size='icon'
                      className={`group absolute right-5 bottom-5 rounded-full text-white ${project.btnColor}`}
                    >
                      <span className='sr-only'>View project details</span>
                      <ArrowRightIcon className='rotate-337 transition-transform duration-200 group-hover:rotate-360' />
                    </Button>
                  </Card>
                </Link>
              )}
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
