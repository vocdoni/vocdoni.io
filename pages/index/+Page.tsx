import TargetUsersV3 from '@/components/app/TargetUsers'
import ComparisonSection from '@/components/ComparisonSection'
import Hero from '@/components/Hero'
import HomeFAQ from '@/components/HomeFAQ'
import AboutUs from '@/components/shadcn-studio/blocks/about-us-page-07/about-us-page-07'
import Portfolio from '@/components/shadcn-studio/blocks/portfolio-16/portfolio-16'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonials-component-03'
import { getTestimonialsData } from '@/lib/testimonials-data'
import { useTranslation } from 'react-i18next'

import customProjectImg from '@/assets/images/app/custom project.webp'
import vocdoniPetitionsImg from '@/assets/images/app/vocdoni_petitions.webp'
import solutionsAppImg from '@/assets/images/solutions/solutions_app.webp'
import solutionsSdkImg from '@/assets/images/solutions/solutions_sdk.webp'

export default function Page() {
  const { t } = useTranslation()

  const portfolioItems = [
    {
      id: 1,
      title: t('landing.portfolio.items.1.title', 'Vocdoni app'),
      description: t(
        'landing.portfolio.items.1.description',
        'Set up a real election in minutes. No IT team, no paper, no expertise needed - just simple, verifiable voting for any organization.'
      ),
      link: '/app',
      imageUrl: solutionsAppImg,
      imageAlt: 'Vocdoni app interface mockups',
      imageWidth: 585,
      imageHeight: 391,
      backgroundColor: 'bg-green-600/10 dark:bg-green-400/10 hover:bg-green-600/20 dark:hover:bg-green-400/20',
      btnColor:
        'bg-green-600 text-white hover:bg-green-600 focus-visible:ring-green-600 dark:bg-green-400 dark:hover:bg-green-400 dark:focus-visible:ring-green-400',
    },
    {
      id: 2,
      title: t('landing.portfolio.items.2.title', 'Vocdoni SDK'),
      description: t(
        'landing.portfolio.items.2.description',
        'Add verifiable, private voting directly into your own applications with our open-source tools. Your infrastructure, our secure protocol.'
      ),
      link: 'https://developer.vocdoni.io/sdk',
      imageUrl: solutionsSdkImg,
      imageAlt: 'Developer tools and API',
      imageWidth: 1200,
      imageHeight: 909,
      imageWrapperClassName: 'px-4 sm:px-8 pt-12 lg:pt-14',
      imageClassName: 'translate-y-8 sm:translate-y-12',
      backgroundColor: 'bg-sky-600/10 dark:bg-sky-400/10 hover:bg-sky-600/20 dark:hover:bg-sky-400/20',
      btnColor:
        'bg-sky-600 text-white hover:bg-sky-600 focus-visible:ring-sky-600 dark:bg-sky-400 dark:hover:bg-sky-400 dark:focus-visible:ring-sky-400',
    },
    {
      id: 3,
      title: t('landing.portfolio.items.3.title', 'Custom election projects'),
      description: t(
        'landing.portfolio.items.3.description',
        'Full expert support for complex governance, from initial configuration to certified verifiable results.'
      ),
      link: '/contact',
      imageUrl: customProjectImg,
      imageAlt: 'Data charts and project management',
      imageWidth: 1400,
      imageHeight: 861,
      imageWrapperClassName: 'px-4 sm:px-8 pt-12 lg:pt-14',
      imageClassName: 'translate-y-8 sm:translate-y-12 rounded-t-xl lg:rounded-t-2xl',
      backgroundColor: 'bg-amber-600/10 dark:bg-amber-400/10 hover:bg-amber-600/20 dark:hover:bg-amber-400/20',
      btnColor:
        'bg-amber-600 text-white hover:bg-amber-600 focus-visible:ring-amber-600 dark:bg-amber-400 dark:hover:bg-amber-400 dark:focus-visible:ring-amber-400',
    },
    {
      id: 4,
      title: t('landing.portfolio.items.4.title', 'Vocdoni Petitions'),
      description: t(
        'landing.portfolio.items.4.description',
        'A solution to collect signatures and sign petitions that uses a privacy-first and data-minimization app called Vocdoni Passport.'
      ),
      link: '/contact',
      imageUrl: vocdoniPetitionsImg,
      imageAlt: 'Vocdoni Petitions and Passport app',
      imageWidth: 1400,
      imageHeight: 699,
      imageWrapperClassName: 'px-4 sm:px-8 pt-4 sm:pt-6 lg:pt-8',
      imageClassName: 'rounded-t-xl lg:rounded-t-2xl',
      backgroundColor: 'bg-red-600/10 dark:bg-red-400/10 hover:bg-red-600/20 dark:hover:bg-red-400/20',
      btnColor:
        'bg-red-600 text-white hover:bg-red-600 focus-visible:ring-red-600 dark:bg-red-400 dark:hover:bg-red-400 dark:focus-visible:ring-red-400',
    },
  ]

  const comparisonOptions = [
    {
      name: t('comparison.options.vocdoni.name'),
      features: {
        privacySecurity: { status: 'positive' as const, text: t('comparison.options.vocdoni.privacySecurity') },
        remoteAccessibility: { status: 'positive' as const, text: t('comparison.options.vocdoni.remoteAccessibility') },
        transparency: { status: 'positive' as const, text: t('comparison.options.vocdoni.transparency') },
        scalability: { status: 'positive' as const, text: t('comparison.options.vocdoni.scalability') },
        cost: { status: 'positive' as const, text: t('comparison.options.vocdoni.cost') },
        sustainability: { status: 'positive' as const, text: t('comparison.options.vocdoni.sustainability') },
      },
      isHighlighted: true,
    },
    {
      name: t('comparison.options.traditional.name'),
      features: {
        privacySecurity: { status: 'positive' as const, text: t('comparison.options.traditional.privacySecurity') },
        remoteAccessibility: {
          status: 'negative' as const,
          text: t('comparison.options.traditional.remoteAccessibility'),
        },
        transparency: { status: 'negative' as const, text: t('comparison.options.traditional.transparency') },
        scalability: { status: 'negative' as const, text: t('comparison.options.traditional.scalability') },
        cost: { status: 'negative' as const, text: t('comparison.options.traditional.cost') },
        sustainability: { status: 'negative' as const, text: t('comparison.options.traditional.sustainability') },
      },
    },
    {
      name: t('comparison.options.otherDigital.name'),
      features: {
        privacySecurity: { status: 'negative' as const, text: t('comparison.options.otherDigital.privacySecurity') },
        remoteAccessibility: {
          status: 'positive' as const,
          text: t('comparison.options.otherDigital.remoteAccessibility'),
        },
        transparency: { status: 'negative' as const, text: t('comparison.options.otherDigital.transparency') },
        scalability: { status: 'negative' as const, text: t('comparison.options.otherDigital.scalability') },
        cost: { status: 'negative' as const, text: t('comparison.options.otherDigital.cost') },
        sustainability: { status: 'positive' as const, text: t('comparison.options.otherDigital.sustainability') },
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
    t('comparison.featureLabels.0'),
    t('comparison.featureLabels.1'),
    t('comparison.featureLabels.2'),
    t('comparison.featureLabels.3'),
    t('comparison.featureLabels.4'),
    t('comparison.featureLabels.5'),
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
      <Portfolio portfolioItems={portfolioItems} />
      <ComparisonSection options={comparisonOptions} featureKeys={featureKeys} featureLabels={featureLabels} />
      <TestimonialsComponent
        eyebrow={t('testimonials.eyebrow')}
        title={t('testimonials.title')}
        description={t('testimonials.description')}
        testimonials={getTestimonialsData(t)}
      />
      <HomeFAQ />
    </>
  )
}
