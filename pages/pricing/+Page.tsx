import PricingSection from '@/components/app/pricing/PricingSection'
import PricingFaq from '@/components/app/pricing/PricingFaq'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <PricingSection />
      <PricingFaq />
    </div>
  )
}
