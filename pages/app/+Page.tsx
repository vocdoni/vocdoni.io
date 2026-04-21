import StepsSection from '@/components/shadcn-studio/blocks/features-section-02/features-section-02'
import AppHeroWithVideo from '@/components/VocdoniApp/AppHeroWithVideo'
import FAQ from '@/components/VocdoniApp/FAQ'
import Features from '@/components/VocdoniApp/Features'
import Services from '@/components/VocdoniApp/Services'
import SocialProof from '@/components/VocdoniApp/SocialProof'
import Technology from '@/components/VocdoniApp/Technology'
import ValueProps from '@/components/VocdoniApp/ValueProps'
import TargetUsersV3 from '@/components/VocdoniAppV3/TargetUsers'
import ValuePropsV3 from '@/components/VocdoniAppV3/ValueProps'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <AppHeroWithVideo />
      <ValuePropsV3 />
      <TargetUsersV3 />
      <ValueProps />
      <Features />
      <StepsSection />
      <Technology />
      <SocialProof />
      <FAQ />
      <Services />
    </div>
  )
}
