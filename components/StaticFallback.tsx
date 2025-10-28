import { usePageContext } from 'vike-react/usePageContext'

import { Navigation } from '@/components/Navigation'
import { SECTIONS_CONFIG } from '@/lib/useUrlSync'
import { Advantages } from './sections/Advantages'
import { Contact } from './sections/Contact'
import { Explore } from './sections/Explore'
import { Footer } from './sections/Footer'
import { Impact } from './sections/Impact'
import { Landing } from './sections/Landing'
import { Product } from './sections/Product'
import { Services } from './sections/Services'
import { Technology } from './sections/Technology'
import { Testimonials } from './sections/Testimonials'

interface StaticFallbackProps {
  activeSection?: number
}

export function StaticFallback({ activeSection: propActiveSection }: StaticFallbackProps) {
  // SSR-safe: get current path from pageContext
  let sectionIndex = 0
  try {
    const pageContext = usePageContext()
    const urlLogical = (pageContext && (pageContext as any).urlLogical) || '/'
    // Normalize path (remove trailing slash except for root)
    const normalizePath = (path: string) => {
      if (!path || path === '/') return '/'
      return path.endsWith('/') ? path.slice(0, -1) : path
    }
    const currentPath = normalizePath(urlLogical)
    // Find section index by path
    const foundIndex = SECTIONS_CONFIG.findIndex((section) => section.path === currentPath)
    sectionIndex = foundIndex >= 0 ? foundIndex : 0
  } catch {
    // fallback to prop or 0
    sectionIndex = typeof propActiveSection === 'number' ? propActiveSection : 0
  }

  // Map section index to component
  const sections = [
    Landing, // 0
    Explore, // 1
    Technology, // 2
    Services, // 3
    Impact, // 4
    Testimonials, // 5
    Product, // 6
    Advantages, // 7
    Contact, // 8
    Footer, // 9
  ]
  const Section = sections[sectionIndex] || sections[0]

  return (
    <div className='min-h-screen scroll-smooth'>
      <Navigation activeSection={sectionIndex} />
      <div className='space-y-0'>
        <div id={`section-${sectionIndex}`} className='min-h-screen'>
          <Section />
        </div>
      </div>
    </div>
  )
}
