import { Navigation } from '@/components/Navigation'
import { SectionScroller } from '@/components/SectionScroller'
import { StaticFallback } from '@/components/StaticFallback'
import { useIsClient } from '@/lib/useIsClient'
import { useUrlSync } from '@/lib/useUrlSync'
import { Contact } from '@/components/sections/Contact'
import { Explore } from '@/components/sections/Explore'
import { Landing } from '@/components/sections/Landing'
import { Product } from '@/components/sections/Product'
import { Services } from '@/components/sections/Services'
import { Technology } from '@/components/sections/Technology'

export default function Page() {
  const isClient = useIsClient()

  const handleNavigation = (sectionIndex: number) => {
    navigateToSection(sectionIndex)
  }

  const { activeSection, navigateToSection } = useUrlSync(handleNavigation)

  if (!isClient) {
    // SSR fallback: static rendering
    return <StaticFallback activeSection={activeSection} onNavigate={handleNavigation} />
  }

  return (
    <>
      <Navigation activeSection={activeSection} onNavigate={handleNavigation} />
      <SectionScroller activeSection={activeSection} onSectionChange={handleNavigation}>
        <Landing />
        <Explore />
        <Technology />
        <Services />
        <Product />
        <Contact />
      </SectionScroller>
    </>
  )
}
