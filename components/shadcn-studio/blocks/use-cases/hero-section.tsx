import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { ArrowRightIcon } from 'lucide-react'

const UseCasesHero = () => {
  return (
    <section className='relative py-16 sm:py-24 lg:py-32'>
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
            Use Cases & Success Stories
          </MotionPreset>

          <MotionPreset
            component='h1'
            className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'
            fade
            blur
            slide
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            Transforming Democracy Across Industries
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground mb-8 text-lg sm:text-xl lg:text-2xl'
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.5 }}
          >
            From city councils to sports clubs, professional associations to political parties—discover how
            organizations worldwide leverage Vocdoni's secure, transparent, and verifiable digital voting platform to
            revolutionize governance and member engagement.
          </MotionPreset>

          <MotionPreset fade blur slide delay={0.6} transition={{ duration: 0.5 }}>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button size='lg' className='has-[>svg]:px-6' asChild>
                <Link href='#use-cases' variant='inlineIcon'>
                  Explore Use Cases
                  <ArrowRightIcon className='size-5' />
                </Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link href='#success-stories' variant='unstyled'>
                  View Success Stories
                </Link>
              </Button>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default UseCasesHero
