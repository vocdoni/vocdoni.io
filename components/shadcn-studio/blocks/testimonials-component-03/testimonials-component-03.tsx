import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

import TestimonialCard from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonial-card'

export type HeroSlideItem = {
  description: string
  logo: string
  alt: string
}

export type TestimonialItem = {
  name: string
  handle: string
  avatar: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
}

type TestimonialsComponentProps = {
  eyebrow: string
  title: string
  description: string
  heroSlides?: HeroSlideItem[]
  testimonials: TestimonialItem[]
}

const TestimonialsComponent = ({ eyebrow, title, description, testimonials }: TestimonialsComponentProps) => {
  return (
    <section className='bg-muted pt-8 sm:pt-16 lg:pt-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <div className='space-y-4 text-center sm:space-y-5'>
          <p className='text-primary text-sm font-medium uppercase'>{eyebrow}</p>

          <MotionPreset
            component='h2'
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            className='text-foreground z-1 inline-block text-3xl font-bold sm:text-4xl lg:text-5xl'
          >
            {title}
          </MotionPreset>

          <MotionPreset fade slide={{ direction: 'down' }} delay={0.3} transition={{ duration: 0.5 }}>
            <p className='text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg'>{description}</p>
          </MotionPreset>
        </div>

        {/* Testimonials Marquee */}
        <MotionPreset
          fade
          slide={{ direction: 'down' }}
          delay={0.6}
          transition={{ duration: 0.5 }}
          className='relative grid sm:grid-cols-2 lg:grid-cols-4'
        >
          <div className='from-muted absolute top-0 z-1 h-1/3 w-full bg-gradient-to-b to-transparent' />
          <Marquee vertical pauseOnHover delay={0.9} duration={30} gap={1.5} className='h-200'>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={30} gap={1.5} reverse className='h-200 max-sm:hidden'>
            {testimonials.slice(3, 6).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={30} gap={1.5} className='h-200 max-lg:hidden'>
            {testimonials.slice(6, 9).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover delay={0.9} duration={30} gap={1.5} reverse className='h-200 max-lg:hidden'>
            {testimonials.slice(9, 12).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  )
}

export default TestimonialsComponent
