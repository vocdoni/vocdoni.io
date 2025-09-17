import { Button } from '@/components/ui/button'

export function Technology() {
  return (
    <div className='h-screen flex items-center justify-center bg-background'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-foreground mb-6'>Technology</h1>
        <p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Cutting-edge blockchain technology powering the future of democratic participation. Our decentralized voting
          infrastructure ensures transparency, security, and accessibility.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button size='lg' className='px-8'>
            Explore Our Tech
          </Button>
          <Button variant='outline' size='lg' className='px-8'>
            Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}
