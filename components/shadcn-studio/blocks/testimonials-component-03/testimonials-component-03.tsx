import { useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import { Eyebrow } from '@/components/Eyebrow'
import { MotionPreset } from '@/components/ui/motion-preset'

import TestimonialCard from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonial-card'
import { cn } from '@/lib/utils'

export type HeroSlideItem = {
  description: string
  logo: string
  alt: string
}

export type TestimonialItem = {
  name: string
  handle: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
  logo: string
}

type TestimonialsComponentProps = {
  eyebrow: string
  title: string
  description: string
  heroSlides?: HeroSlideItem[]
  testimonials: TestimonialItem[]
}

const getTestimonialKey = (testimonial: TestimonialItem) =>
  `${testimonial.name}-${testimonial.title}-${testimonial.content}`.toLowerCase()

const getMarqueeDuration = (columnCount: number) => {
  if (columnCount === 1) return 420
  if (columnCount === 2) return 300
  return 210
}

const getUniqueTestimonials = (testimonials: TestimonialItem[]) => {
  const seen = new Set<string>()

  return testimonials.filter((testimonial) => {
    const key = getTestimonialKey(testimonial)
    if (seen.has(key)) return false

    seen.add(key)
    return true
  })
}

const chunkTestimonials = (testimonials: TestimonialItem[], columnCount: number) => {
  const chunkSize = Math.ceil(testimonials.length / columnCount)
  return Array.from({ length: columnCount }, (_, index) =>
    testimonials.slice(index * chunkSize, index * chunkSize + chunkSize)
  )
}

const getColumnCount = () => {
  if (typeof window === 'undefined') return 1
  if (window.matchMedia('(min-width: 1024px)').matches) return 3
  if (window.matchMedia('(min-width: 640px)').matches) return 2
  return 1
}

const useResponsiveColumnCount = () => {
  // Keep the server and first client render identical. The effect applies the
  // responsive layout after hydration, when matchMedia is safe to read.
  const [columnCount, setColumnCount] = useState(1)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const tabletQuery = window.matchMedia('(min-width: 640px)')
    const updateColumnCount = () => setColumnCount(getColumnCount())

    updateColumnCount()
    desktopQuery.addEventListener('change', updateColumnCount)
    tabletQuery.addEventListener('change', updateColumnCount)

    return () => {
      desktopQuery.removeEventListener('change', updateColumnCount)
      tabletQuery.removeEventListener('change', updateColumnCount)
    }
  }, [])

  return columnCount
}

type TestimonialMarqueeColumnProps = {
  testimonials: TestimonialItem[]
  className?: string
  duration: number
  reverse?: boolean
}

const TestimonialMarqueeColumn = ({ testimonials, className, duration, reverse }: TestimonialMarqueeColumnProps) => {
  const [hasHydrated, setHasHydrated] = useState(false)
  const reducedMotion = useReducedMotion()
  const visualRepeats = hasHydrated ? 3 : 1

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  const renderTestimonialSet = (setKey: string, hideEntireSet = false) => (
    <div className='flex flex-col gap-(--marquee-gap) pb-[var(--marquee-gap)]' aria-hidden={hideEntireSet || undefined}>
      {Array.from({ length: visualRepeats }, (_, repeatIndex) =>
        testimonials.map((testimonial) => {
          const isVisualDuplicate = hideEntireSet || repeatIndex > 0

          return (
            <div
              key={`${setKey}-${repeatIndex}-${getTestimonialKey(testimonial)}`}
              aria-hidden={isVisualDuplicate || undefined}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          )
        })
      )}
    </div>
  )

  return (
    <div
      style={
        {
          '--marquee-duration': `${duration}s`,
          '--marquee-gap': '1.5rem',
        } as CSSProperties
      }
      className={cn(
        'group relative h-[58rem] overflow-hidden p-3 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-col [animation:testimonial-marquee-vertical_var(--marquee-duration)_linear_infinite]',
          'group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]',
          reducedMotion && '[animation-play-state:paused]'
        )}
      >
        {renderTestimonialSet('primary')}
        {hasHydrated && renderTestimonialSet('loop', true)}
      </div>
    </div>
  )
}

const TestimonialsComponent = ({ eyebrow, title, description, testimonials }: TestimonialsComponentProps) => {
  const uniqueTestimonials = getUniqueTestimonials(testimonials)
  const columnCount = useResponsiveColumnCount()
  const testimonialColumns = chunkTestimonials(uniqueTestimonials, columnCount)

  const renderTestimonialColumns = (columns: TestimonialItem[], index: number) => (
    <TestimonialMarqueeColumn
      key={`${columns.length}-${index}`}
      testimonials={columns}
      duration={getMarqueeDuration(columnCount)}
      reverse={index % 2 === 1}
    />
  )

  return (
    <section className='bg-muted pt-8 sm:pt-16 lg:pt-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <div className='space-y-4 text-center sm:space-y-5'>
          <Eyebrow>{eyebrow}</Eyebrow>

          <MotionPreset
            component='h2'
            fade
            slide={{ direction: 'down' }}
            transition={{ duration: 0.5 }}
            className='text-foreground z-1 block text-4xl sm:text-5xl'
          >
            {title}
          </MotionPreset>

          <MotionPreset fade slide={{ direction: 'down' }} delay={0.3} transition={{ duration: 0.5 }}>
            <p className='text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg'>{description}</p>
          </MotionPreset>
        </div>

        <MotionPreset
          fade
          slide={{ direction: 'down' }}
          delay={0.6}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <div className='from-muted pointer-events-none absolute inset-x-0 top-0 z-1 h-1/4 bg-gradient-to-b to-transparent' />
          <div className='from-muted pointer-events-none absolute inset-x-0 bottom-0 z-1 h-1/4 bg-gradient-to-t to-transparent' />
          <div className={cn('grid', columnCount === 2 && 'grid-cols-2', columnCount === 3 && 'grid-cols-3')}>
            {testimonialColumns.map(renderTestimonialColumns)}
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default TestimonialsComponent
