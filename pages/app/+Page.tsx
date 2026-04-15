import AppHeroWithVideo from '@/components/VocdoniApp/AppHeroWithVideo'
import EasyFeatures from '@/components/shadcn-studio/blocks/features-section-15/features-section-15'
import StepsSection from '@/components/shadcn-studio/blocks/features-section-02/features-section-02'
import ValuePropsV3 from '@/components/VocdoniAppV3/ValueProps'
import TargetUsersV3 from '@/components/VocdoniAppV3/TargetUsers'
import ValueProps from '@/components/VocdoniApp/ValueProps'
import Features from '@/components/VocdoniApp/Features'
import Technology from '@/components/VocdoniApp/Technology'
import SocialProof from '@/components/VocdoniApp/SocialProof'
import FAQ from '@/components/VocdoniApp/FAQ'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-09/cta-section-09'
import Services from '@/components/VocdoniApp/Services'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <AppHeroWithVideo />
      <ValuePropsV3 />
      <TargetUsersV3 />
      <ValueProps />
      <Features />
      <EasyFeatures />
      <StepsSection />
      <Technology />
      <SocialProof />
      <FAQ />
      <CTASection />
      <Services />
    </div>
  )
}
