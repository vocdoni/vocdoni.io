import AppHeroWithVideo from '@/components/VocdoniApp/AppHeroWithVideo'
import StepsSection from '@/components/shadcn-studio/blocks/features-section-02/features-section-02'
import ValuePropsV3 from '@/components/VocdoniAppV3/ValueProps'
import TargetUsersV3 from '@/components/VocdoniAppV3/TargetUsers'
import ValueProps from '@/components/VocdoniApp/ValueProps'
import Features from '@/components/VocdoniApp/Features'
import Technology from '@/components/VocdoniApp/Technology'
import SocialProof from '@/components/VocdoniApp/SocialProof'
import FAQ from '@/components/VocdoniApp/FAQ'
import Services from '@/components/VocdoniApp/Services'

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
