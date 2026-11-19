import { useData } from 'vike-react/useData'
import { usePageContext } from 'vike-react/usePageContext'

import PriceList from '@/components/app/pricing/PriceList'
import PricingFaq from '@/components/app/pricing/PricingFaq'
import PricingSection from '@/components/app/pricing/PricingSection'
import type { PricingPageData } from './+data'

export default function Page() {
  const data = useData<PricingPageData>()
  const { locale } = usePageContext() as { locale: string }
  return (
    <div className='flex flex-col min-h-screen'>
      <PricingSection />
      {data?.priceList && <PriceList priceList={data.priceList} locale={locale ?? 'en'} />}
      <PricingFaq />
    </div>
  )
}
