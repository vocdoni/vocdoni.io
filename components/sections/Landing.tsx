import { Button } from '@/components/ui/button'
import { Link } from '@/components/Link'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export function Landing() {
  return (
    <div
      className={cn(
        'bg-[url(/assets/images/hero_background.png)] bg-cover bg-top bg-no-repeat',
        'relative h-screen w-full flex flex-col items-center',
        'justify-center text-black'
      )}
    >
      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto'>
        {/* Main headline */}
        <h1 className='text-5xl md:text-7xl font-bold mb-6 tracking-tight'>Let's build change.</h1>

        {/* Subtitle */}
        <p className='text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed font-light'>
          We build technology that makes every voice count.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mb-20'>
          <Button variant='hero' size='xl'>
            🗳️ Start your vote →
          </Button>
          <Button variant='hero' size='xl'>
            ☎️ Talk with us →
          </Button>
        </div>
      </div>

      {/* Explore Vocdoni - Bottom */}
      <Link
        href='/explore'
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors'
      >
        <span className='text-lg font-medium mb-2'>Explore Vocdoni</span>
        <ChevronDown className='w-6 h-6 animate-bounce' />
      </Link>
    </div>
  )
}
