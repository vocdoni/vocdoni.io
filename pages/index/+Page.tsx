import { Navigation } from '@/components/Navigation'
import { SectionScroller } from '@/components/SectionScroller'
import { StaticFallback } from '@/components/StaticFallback'
import { useIsClient } from '@/lib/useIsClient'
import { useUrlSync } from '@/lib/useUrlSync'
import { Contact } from './sections/Contact'
import { Landing } from './sections/Landing'
import { Product } from './sections/Product'
import { Services } from './sections/Services'
import { Technology } from './sections/Technology'

export default function Page() {
  const isClient = useIsClient()
  const { activeSection, navigateToSection } = useUrlSync()

  const handleNavigation = (sectionIndex: number) => {
    navigateToSection(sectionIndex)
  }

  if (!isClient) {
    // SSR fallback: static rendering
    return <StaticFallback activeSection={activeSection} onNavigate={handleNavigation} />
  }

  return (
    <>
      <Navigation activeSection={activeSection} onNavigate={handleNavigation} />
      <SectionScroller activeSection={activeSection} onSectionChange={handleNavigation}>
        <Landing onNavigate={handleNavigation} />
        <Technology />
        <Services />
        <Product />
        <Contact />
      </SectionScroller>
    </>
  )
}
