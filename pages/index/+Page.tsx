import { Navigation } from '@/components/Navigation'
import { Advantages } from '@/components/sections/Advantages'
import { Contact } from '@/components/sections/Contact'
import { Explore } from '@/components/sections/Explore'
import { Footer } from '@/components/sections/Footer'
import { Impact } from '@/components/sections/Impact'
import { Landing } from '@/components/sections/Landing'
import { Product } from '@/components/sections/Product'
import { Services } from '@/components/sections/Services'
import { Technology } from '@/components/sections/Technology'
import { Testimonials } from '@/components/sections/Testimonials'
import { SectionScroller } from '@/components/SectionScroller'
import { StaticFallback } from '@/components/StaticFallback'
import { useIsClient } from '@/lib/useIsClient'
import { useUrlSync } from '@/lib/useUrlSync'

export default function Page() {
  const isClient = useIsClient()
  const { activeSection, navigateToSection } = useUrlSync()

  if (!isClient) {
    // SSR fallback: static rendering
    return <StaticFallback activeSection={activeSection} />
  }

  return (
    <>
      <Navigation activeSection={activeSection} />
      <SectionScroller activeSection={activeSection} onSectionChange={navigateToSection}>
        <Landing />
        <Explore />
        <Technology />
        <Services />
        <Impact />
        <Testimonials />
        <Product />
        <Advantages />
        <Contact />
        <Footer />
      </SectionScroller>
    </>
  )
}
