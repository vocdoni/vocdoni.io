import CTASection from '@/components/shadcn-studio/blocks/cta-section-09/cta-section-09'
import UseCasesHero from '@/components/shadcn-studio/blocks/use-cases/hero-section'
import SuccessStories from '@/components/shadcn-studio/blocks/use-cases/success-stories'
import UseCasesGrid from '@/components/shadcn-studio/blocks/use-cases/use-cases-grid'

export default function UseCasesPage() {
  return (
    <>
      <UseCasesHero />
      <UseCasesGrid />
      <SuccessStories />
      <CTASection />
    </>
  )
}
