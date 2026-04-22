import AppHeroWithVideo from '@/components/app/AppHeroWithVideo'
import FAQ from '@/components/app/FAQ'
import Features from '@/components/app/Features'
import Services from '@/components/app/Services'
import SocialProof from '@/components/app/SocialProof'
import TargetUsersV3 from '@/components/app/TargetUsers'
import Technology from '@/components/app/Technology'
import ValueProps from '@/components/app/ValueProps'
import ValuePropsV3 from '@/components/app/ValuePropsV3'
import StepsSection from '@/components/shadcn-studio/blocks/features-section-02/features-section-02'

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
