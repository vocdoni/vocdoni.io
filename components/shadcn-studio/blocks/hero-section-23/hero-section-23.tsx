import { useRef } from 'react'

import { PlayIcon, RocketIcon, TicketCheckIcon } from 'lucide-react'

import CustomersCardSvg from '@/components/illustrations/customers-card-svg'
import HeroSvg from '@/components/illustrations/hero-svg'

import { Link } from '@/components/Link'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BorderBeam } from '@/components/ui/border-beam'
import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Rating } from '@/components/ui/rating'
import { WordRotate } from '@/components/ui/word-rotate'

import { Button } from '@/components/ui/button'

import TotalSalesCard from '@/components/shadcn-studio/blocks/chart-total-sales'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-03'
import RatingsCard from '@/components/shadcn-studio/blocks/statistics-card-04'

const words = ['Sales', 'Growth', 'Business']

type Avatar = {
  src: string
  fallback: string
  name: string
}[]

const HeroSection = ({ avatars }: { avatars: Avatar }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef1 = useRef<HTMLDivElement>(null)
  const cardRef2 = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const span3Ref = useRef<HTMLSpanElement>(null)

  return (
    <section className='flex-1 overflow-hidden'>
      <div className='mx-auto flex h-full max-w-7xl flex-col pt-4 pb-8 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-24'>
        <div className='relative grid grid-cols-1 gap-12 max-xl:justify-center sm:gap-16 lg:gap-24 xl:grid-cols-2'>
          <div className='space-y-32 p-8'>
            <div className='flex flex-col justify-center gap-6 max-xl:items-center max-xl:text-center md:max-xl:mx-auto md:max-xl:max-w-150'>
              <MotionPreset
                fade
                slide
                transition={{ duration: 0.5 }}
                className='bg-muted flex w-fit items-center gap-2.5 rounded-full border px-2 py-1'
              >
                <span className='bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium'>
                  AI-Powered
                </span>
                <span className='text-muted-foreground'>Solution for client-facing businesses</span>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.3}>
                <h1 className='inline max-w-3xl text-3xl leading-[1.29167] font-bold sm:text-4xl lg:text-5xl'>
                  Turn customer data into product{' '}
                  <WordRotate words={words} duration={2000} className='inline-block w-fit overflow-visible py-0' />
                </h1>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.5}>
                <p className='text-muted-foreground text-xl'>
                  Leverage intelligent analytics to track performance, compare trends, and stay ahead with actionable
                  business insights
                </p>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.7}
                className='flex flex-wrap items-center gap-4 max-sm:flex-col'
              >
                <Button
                  asChild
                  size='lg'
                  className='relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
                >
                  <Link href='#' variant='inlineIcon'>
                    Start 7 Day Free Trail
                    <RocketIcon />
                  </Link>
                </Button>
                <Button asChild variant='outline' className='rounded-full text-base has-[>svg]:px-6' size='lg'>
                  <Link href='#' variant='inlineIcon'>
                    Watch Video
                    <PlayIcon />
                  </Link>
                </Button>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.8}
                className='mt-4 flex items-center gap-6 max-sm:flex-col max-sm:justify-center max-sm:text-center'
              >
                <div className='flex -space-x-2'>
                  {avatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md'
                    >
                      <AvatarImage src={avatar.src} alt={avatar.name} />
                      <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <div>
                  <p className='text-sm'>We have 4.5+ average rating</p>
                  <Rating
                    readOnly
                    variant='yellow'
                    size={24}
                    value={4.5}
                    precision={0.5}
                    className='max-sm:justify-center'
                  />
                </div>
              </MotionPreset>
            </div>
            <div className='space-y-3.5 px-4 py-2'>
              <MotionPreset
                component='p'
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.8}
                transition={{ duration: 0.5 }}
                className='text-muted-foreground'
              >
                More than 300+ Companies trusted one
              </MotionPreset>
              <MotionPreset
                fade
                slide={{ direction: 'down', offset: 50 }}
                delay={0.9}
                transition={{ duration: 0.5 }}
                className='relative'
              >
                <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-15 bg-gradient-to-r via-85% to-transparent' />
                <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-15 bg-gradient-to-l via-85% to-transparent' />
                <Marquee pauseOnHover duration={20} reverse gap={4} className='*:items-center'>
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/um-logo.png'
                    alt='University of Mississippi'
                    className='h-7.5 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/star-helth-logo.png'
                    alt='Star Health'
                    className='h-9 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/dhl-logo.png'
                    alt='DHL'
                    className='h-4 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/sense-arena-logo.png'
                    alt='Sense Arena'
                    className='h-11 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/shemaroo-logo.png'
                    alt='Shemaroo'
                    className='h-10 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/mercedes-benz-logo.png'
                    alt='Mercedes Benz'
                    className='h-7.5 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                </Marquee>
              </MotionPreset>
            </div>
          </div>
          <div ref={containerRef} className='relative flex flex-col items-center justify-center px-8'>
            <HeroSvg className='absolute -inset-y-9 -z-1 max-md:hidden xl:inset-y-0' />
            <div className='mb-14 grid w-full grid-cols-1 gap-10 px-2 pt-2 max-xl:max-w-140 md:mb-7 md:grid-cols-2'>
              <div ref={cardRef1} className='relative'>
                <StatisticsCard
                  title='Statistics'
                  badgeContent='Last 6 months'
                  value='$13.4k'
                  changePercentage='+38%'
                  icon={<TicketCheckIcon />}
                  trend='up'
                  className='h-full gap-2 py-3'
                />
                <div className='bg-background absolute -inset-2 -z-1 rounded-xl border'>
                  <BorderBeam duration={15} size={60} colorFrom='var(--primary)' colorTo='var(--primary)' />
                </div>
              </div>
              <div ref={cardRef2} className='relative'>
                <RatingsCard
                  title='Customers'
                  badgeContent='Daily customers'
                  value='42.4k'
                  changePercentage={9.2}
                  svg={<CustomersCardSvg />}
                  className='h-full'
                />
                <div className='bg-background absolute -inset-2 -z-1 rounded-xl border'>
                  <BorderBeam duration={15} size={60} colorFrom='var(--primary)' colorTo='var(--primary)' />
                </div>
              </div>
            </div>
            <div className='mb-7 flex items-center gap-36 max-md:hidden xl:gap-34'>
              <span ref={span1Ref} className='size-0.5' />
              <span ref={span2Ref} className='size-0.5' />
              <span ref={span3Ref} className='size-0.5' />
            </div>
            <div ref={chartRef} className='flex w-full items-center justify-center px-2'>
              <div className='relative w-fit'>
                <TotalSalesCard className='sm:w-full sm:max-w-100' />
                <div className='bg-background absolute -inset-2 -z-1 rounded-xl border'>
                  <BorderBeam duration={15} size={60} colorFrom='var(--primary)' colorTo='var(--primary)' />
                </div>
                <span className='bg-background absolute -top-1.5 left-1/2 size-1.5 -translate-x-1/2' />
              </div>
            </div>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={cardRef1}
              toRef={span1Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
              startYOffset={90}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={cardRef2}
              toRef={span3Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
              startYOffset={90}
              reverse
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={span1Ref}
              toRef={span2Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={span3Ref}
              toRef={span2Ref}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
              reverse
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={span2Ref}
              toRef={chartRef}
              gradientStartColor='var(--primary)'
              duration={4.5}
              className='-z-1 max-md:hidden'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
