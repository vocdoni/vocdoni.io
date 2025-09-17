import { Navigation } from '@/components/Navigation'
import { Contact } from './sections/Contact'
import { Explore } from './sections/Explore'
import { Landing } from './sections/Landing'
import { Product } from './sections/Product'
import { Services } from './sections/Services'
import { Technology } from './sections/Technology'

interface StaticFallbackProps {
  activeSection?: number
  onNavigate?: (sectionIndex: number) => void
}

export function StaticFallback({ activeSection = 0, onNavigate }: StaticFallbackProps) {
  return (
    <div className='min-h-screen scroll-smooth'>
      <Navigation activeSection={activeSection} onNavigate={onNavigate} />
      <div className='space-y-0'>
        <div id='section-0' className='min-h-screen'>
          <Landing />
        </div>
        <div id='section-1' className='min-h-screen'>
          <Explore />
        </div>
        <div id='section-2' className='min-h-screen'>
          <Technology />
        </div>
        <div id='section-3' className='min-h-screen'>
          <Services />
        </div>
        <div id='section-4' className='min-h-screen'>
          <Product />
        </div>
        <div id='section-5' className='min-h-screen'>
          <Contact />
        </div>
      </div>
    </div>
  )
}
