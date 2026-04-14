import Hero from '@/components/Hero'
import ComparisonSection from '@/components/ComparisonSection'
import Solutions from '@/components/shadcn-studio/blocks/features-section-10/solutions-section'
import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonials-component-03'
import AboutUs from '@/components/shadcn-studio/blocks/about-us-page-07/about-us-page-07'
import TargetUsersV3 from '@/components/VocdoniAppV3/TargetUsers'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-09/cta-section-09'
import HomeFAQ from '@/components/HomeFAQ'
import { useTranslation } from 'react-i18next'

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

  const testimonials = [
    {
      name: 'Jordi Estiarte',
      handle: t('testimonials_marquee.items.0.handle', 'Mayor · Bellpuig City Council'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
      rating: 5,
      title: t('testimonials_marquee.items.0.title', 'The future of real elections'),
      content: t(
        'testimonials_marquee.items.0.content',
        "We chose Vocdoni's technology because we believe it is the future of what real elections of any kind should be. Electronic voting is open to everyone and facilitates the process for the citizenry."
      ),
      platformName: 'Bellpuig',
      platformImage: '/assets/logos/logo_bellpuig_colour.png',
      logo: '/assets/logos/logo_bellpuig_round.webp',
    },
    {
      name: 'Ton Barnils',
      handle: t('testimonials_marquee.items.1.handle', 'General Director · CEC'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
      rating: 5,
      title: t('testimonials_marquee.items.1.title', 'Safe and transparent participation'),
      content: t(
        'testimonials_marquee.items.1.content',
        'We chose Vocdoni because it guarantees safe, reliable, and transparent participation for all our members at the annual general assembly.'
      ),
      platformName: 'CEC',
      platformImage: '/assets/logos/logo_cec_colour.png',
      logo: '/assets/logos/logo_cec_round.webp',
    },
    {
      name: 'Anna Giralt',
      handle: t('testimonials_marquee.items.2.handle', 'Executive Manager · Òmnium Cultural'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
      rating: 5,
      title: t('testimonials_marquee.items.2.title', 'All guarantees for 180,000 members'),
      content: t(
        'testimonials_marquee.items.2.content',
        'The commitment to Vocdoni has been clear. At Òmnium Cultural we bet on a secure and verifiable voting system that would allow us to hold our statutory assemblies with all guarantees.'
      ),
      platformName: 'Òmnium',
      platformImage: '/assets/logos/logo_omnium_colour.png',
      logo: '/assets/logos/logo_omnium_round.webp',
    },
    {
      name: 'Oscar Tirivò',
      handle: t('testimonials_marquee.items.3.handle', 'IT Director · Enginyers Industrials'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
      rating: 5,
      title: t('testimonials_marquee.items.3.title', 'Easy, secure, and scalable voting'),
      content: t(
        'testimonials_marquee.items.3.content',
        'Vocdoni provides us with an easy, secure, anonymous, and scalable voting system, completely integrated into our institutional environment. We will continue to trust it, without a doubt!'
      ),
      platformName: 'EIC',
      platformImage: '/assets/logos/logo_eic_colour.png',
      logo: '/assets/logos/logo_eic_round.webp',
    },
    {
      name: 'Rut Carandell',
      handle: t('testimonials_marquee.items.4.handle', 'Director · Plataforma per la Llengua'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
      rating: 5,
      title: t('testimonials_marquee.items.4.title', 'Voting across Catalan-speaking territories'),
      content: t(
        'testimonials_marquee.items.4.content',
        'Vocdoni lets us hold votes with members across all Catalan-speaking territories on equal terms. Instant counting simplifies our assemblies and ensures full transparency. We especially value that it is fully available in Catalan.'
      ),
      platformName: 'Plataforma per la Llengua',
      platformImage: '/assets/logos/logo_plataforma_colour.webp',
      logo: '/assets/logos/logo_plataforma_round.webp',
    },
    {
      name: 'Montserrat Clavell',
      handle: t('testimonials_marquee.items.5.handle', "Secretary · Associació d'Arxivers de Catalunya"),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
      rating: 5,
      title: t('testimonials_marquee.items.5.title', 'Secure voting that boosted participation'),
      content: t(
        'testimonials_marquee.items.5.content',
        'Offering members a secure and reliable voting system is essential, especially during a pandemic. Vocdoni gave us an easy-to-use tool that simplified the voting process and boosted participation.'
      ),
      platformName: 'Arxivers de Catalunya',
      platformImage: '/assets/logos/logo_arxivers_colour.webp',
      logo: '/assets/logos/logo_.arxivers_round.webp',
    },
    {
      name: 'Susanna Mendoza',
      handle: t('testimonials_marquee.items.6.handle', 'IT Responsible · Associació de Guies Habilitats de Catalunya'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
      rating: 5,
      title: t('testimonials_marquee.items.6.title', 'Easy to set up, great participation despite a non-tech audience'),
      content: t(
        'testimonials_marquee.items.6.content',
        'Setting up the entire voting process and centralizing all the tools for the assembly was easy, intuitive, and clear. Members complimented how well organized it was and how simple it was to use. Even in a sector that is not very tech-savvy, we got strong participation — people especially valued being able to vote in advance without attending in person. When we had a small issue with the census, technical support was fast and professional.'
      ),
      platformName: 'AGUICAT',
      platformImage: '/assets/logos/logo_aguicat_round.webp',
      logo: '/assets/logos/logo_aguicat_round.webp',
    },
    {
      name: 'Adrià Cortadellas',
      handle: t(
        'testimonials_marquee.items.7.handle',
        "Civic Participation Officer · Ajuntament de La Bisbal de l'Empordà"
      ),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
      rating: 5,
      title: t('testimonials_marquee.items.7.title', 'Transparent, secure, and flexible digital voting for citizens'),
      content: t(
        'testimonials_marquee.items.7.content',
        "Vocdoni powered our Bisbalenc/a de l'Any vote, boosting citizen participation and delivering transparency, security, and instant results on blockchain. We valued its security, scalability, universal verifiability, and flexibility. In 2023 it also enabled hybrid voting, greatly simplifying the entire process."
      ),
      platformName: "La Bisbal d'Empordà",
      platformImage: '/assets/logos/logo_bisbal_round.webp',
      logo: '/assets/logos/logo_bisbal_round.webp',
    },
    // Placeholders
    {
      name: 'Elena Rodríguez',
      handle: t('testimonials_marquee.items.8.handle', 'General Manager · ICOES'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
      rating: 5,
      title: t('testimonials_marquee.items.8.title', 'Lorem ipsum dolor sit amet'),
      content: t(
        'testimonials_marquee.items.8.content',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      ),
      platformName: 'ICOES',
      platformImage: '/assets/logos/logo_icoes_colour.webp',
      logo: '/assets/logos/logo_icoes_round.webp',
    },
    {
      name: 'Laia Ferrer',
      handle: t('testimonials_marquee.items.9.handle', 'Director · NGO Foundation'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
      rating: 5,
      title: t('testimonials_marquee.items.9.title', 'Perfect for remote governance'),
      content: t(
        'testimonials_marquee.items.9.content',
        'With members spread across multiple countries, Vocdoni gave us a reliable way to hold board votes with complete transparency and zero travel costs.'
      ),
      platformName: 'Placeholder',
      platformImage: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    },
    {
      name: 'Carles Puigdomènech',
      handle: t('testimonials_marquee.items.10.handle', 'CEO · Tech Cooperative'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
      rating: 5,
      title: t('testimonials_marquee.items.10.title', 'Blockchain trust without the complexity'),
      content: t(
        'testimonials_marquee.items.10.content',
        'We wanted blockchain-backed voting but feared the complexity. Vocdoni delivered exactly that with a UI our non-technical members could use on day one.'
      ),
      platformName: 'Placeholder',
      platformImage: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
    },
    {
      name: 'Elena Vidal',
      handle: t('testimonials_marquee.items.11.handle', 'General Manager · Professional College'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
      rating: 5,
      title: t('testimonials_marquee.items.11.title', 'Legally compliant and reliable'),
      content: t(
        'testimonials_marquee.items.11.content',
        'As a regulated professional body, legal compliance is non-negotiable. Vocdoni met every requirement while keeping the experience smooth for thousands of voters.'
      ),
      platformName: 'Placeholder',
      platformImage: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    },
    {
      name: 'Miquel Roca',
      handle: t('testimonials_marquee.items.12.handle', 'Chairman · University Council'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
      rating: 5,
      title: t('testimonials_marquee.items.12.title', 'Record turnout on first use'),
      content: t(
        'testimonials_marquee.items.12.content',
        'The first time we used Vocdoni for our student union elections, turnout doubled compared to previous years. Accessible voting makes a real difference.'
      ),
      platformName: 'Placeholder',
      platformImage: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
    },
    {
      name: 'Sara Morales',
      handle: t('testimonials_marquee.items.13.handle', 'Operations Lead · Chamber of Commerce'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
      rating: 5,
      title: t('testimonials_marquee.items.13.title', 'Cut our election cost by 80%'),
      content: t(
        'testimonials_marquee.items.13.content',
        'We used to spend a significant budget on physical voting logistics. With Vocdoni, we run the same process digitally at a fraction of the cost, with better outcomes.'
      ),
      platformName: 'Placeholder',
      platformImage: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
    },
    {
      name: 'Joan Puig',
      handle: t('testimonials_marquee.items.14.handle', 'IT Manager · Public Administration'),
      avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
      rating: 5,
      title: t('testimonials_marquee.items.14.title', 'Seamless integration with our systems'),
      content: t(
        'testimonials_marquee.items.14.content',
        'The Vocdoni SDK integrated cleanly into our existing infrastructure. The team was responsive and helped us go live in record time without disrupting operations.'
      ),
      platformName: 'Placeholder',
      platformImage: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
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
        testimonials={testimonials}
      />
      <HomeFAQ />
      <CTASection />
    </>
  )
}
