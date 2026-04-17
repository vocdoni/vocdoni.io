import Hero from '@/components/alternative-landing/Hero'
import AboutUs from '@/components/alternative-landing/AboutUs'
import Solutions from '@/components/alternative-landing/Solutions'
import HomeFAQ from '@/components/alternative-landing/HomeFAQ'
import ComparisonSection from '@/components/ComparisonSection'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonials-component-03'
import TargetUsersV3 from '@/components/VocdoniAppV3/TargetUsers'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-09/cta-section-09'
import { useTranslation } from 'react-i18next'
import { getTestimonialsData } from '@/lib/testimonials-data'

export default function Page() {
  const { t } = useTranslation()

  const comparisonOptions = [
    {
      name: 'comparison.options.vocdoni.name',
      features: {
        privacySecurity: { status: 'positive' as const, text: 'comparison.options.vocdoni.privacySecurity' },
        remoteAccessibility: { status: 'positive' as const, text: 'comparison.options.vocdoni.remoteAccessibility' },
        transparency: { status: 'positive' as const, text: 'comparison.options.vocdoni.transparency' },
        scalability: { status: 'positive' as const, text: 'comparison.options.vocdoni.scalability' },
        cost: { status: 'positive' as const, text: 'comparison.options.vocdoni.cost' },
        sustainability: { status: 'positive' as const, text: 'comparison.options.vocdoni.sustainability' },
      },
      isHighlighted: true,
    },
    {
      name: 'comparison.options.traditional.name',
      features: {
        privacySecurity: { status: 'positive' as const, text: 'comparison.options.traditional.privacySecurity' },
        remoteAccessibility: {
          status: 'negative' as const,
          text: 'comparison.options.traditional.remoteAccessibility',
        },
        transparency: { status: 'negative' as const, text: 'comparison.options.traditional.transparency' },
        scalability: { status: 'negative' as const, text: 'comparison.options.traditional.scalability' },
        cost: { status: 'negative' as const, text: 'comparison.options.traditional.cost' },
        sustainability: { status: 'negative' as const, text: 'comparison.options.traditional.sustainability' },
      },
    },
    {
      name: 'comparison.options.otherDigital.name',
      features: {
        privacySecurity: { status: 'negative' as const, text: 'comparison.options.otherDigital.privacySecurity' },
        remoteAccessibility: {
          status: 'positive' as const,
          text: 'comparison.options.otherDigital.remoteAccessibility',
        },
        transparency: { status: 'negative' as const, text: 'comparison.options.otherDigital.transparency' },
        scalability: { status: 'negative' as const, text: 'comparison.options.otherDigital.scalability' },
        cost: { status: 'negative' as const, text: 'comparison.options.otherDigital.cost' },
        sustainability: { status: 'positive' as const, text: 'comparison.options.otherDigital.sustainability' },
      },
    },
  ]

  const featureKeys = [
    'privacySecurity',
    'remoteAccessibility',
    'transparency',
    'scalability',
    'cost',
    'sustainability',
  ]

  const featureLabels = [
    'comparison.featureLabels.0',
    'comparison.featureLabels.1',
    'comparison.featureLabels.2',
    'comparison.featureLabels.3',
    'comparison.featureLabels.4',
    'comparison.featureLabels.5',
  ]

  const aboutStatCards = [
    {
      title: t('about_us.stat_cards.votes.title'),
      description: t('about_us.stat_cards.votes.description'),
    },
    {
      title: t('about_us.stat_cards.affordable.title'),
      description: t('about_us.stat_cards.affordable.description'),
    },
    {
      title: t('about_us.stat_cards.turnout.title'),
      description: t('about_us.stat_cards.turnout.description'),
    },
    {
      title: t('about_us.stat_cards.experience.title'),
      description: t('about_us.stat_cards.experience.description'),
    },
  ]

  const aboutFeatureCards = [
    {
      title: t('about_us.feature_cards.security.title'),
      description: t('about_us.feature_cards.security.description'),
    },
    {
      title: t('about_us.feature_cards.compliance.title'),
      description: t('about_us.feature_cards.compliance.description'),
    },
    {
      title: t('about_us.feature_cards.accessibility.title'),
      description: t('about_us.feature_cards.accessibility.description'),
    },
  ]

  return (
    <>
      <Hero />
      <AboutUs hideTeam={true} statCards={aboutStatCards} featureCards={aboutFeatureCards} />
      <TargetUsersV3 />
      <Solutions />
      <ComparisonSection options={comparisonOptions} featureKeys={featureKeys} featureLabels={featureLabels} />
      <TestimonialsComponent
        eyebrow={t('testimonials.eyebrow')}
        title={t('testimonials.title')}
        description={t('testimonials.description')}
        testimonials={getTestimonialsData(t)}
      />
      <HomeFAQ />
      <CTASection />
    </>
  )
}
