import { Link } from '@/components/Link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import {
  ArrowRightIcon,
  BriefcaseIcon,
  Building2Icon,
  CodeIcon,
  LandmarkIcon,
  TrophyIcon,
  UsersIcon,
} from 'lucide-react'

const useCases = [
  {
    id: 'city-councils',
    icon: LandmarkIcon,
    title: 'City Councils & Municipal Governance',
    description:
      'Empowering local governments with secure digital voting for referenda, participatory budgeting, and public consultations. Reduce costs while increasing citizen engagement in democratic processes.',
    features: [
      'Local referenda & binding polls',
      'Participatory budgeting',
      'Budget approvals',
      'Public opinion polling',
      'Special elections',
    ],
    caseStudy: 'Bellpuig Council',
    caseStudyDescription: 'First Spanish public institution to hold 100% digital referendum with 31.67% voter turnout',
    logos: ['🏛️', '🏢', '🏙️'], // Placeholder - replace with actual client logos
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-600/10 hover:bg-blue-600/20',
    borderColor: 'border-blue-600/30 hover:border-blue-600',
  },
  {
    id: 'associations',
    icon: UsersIcon,
    title: 'Community Organizations & Associations',
    description:
      'Strengthen member engagement and organizational integrity with transparent, secure voting for board elections, policy decisions, and strategic initiatives. Build trust through verifiable democracy.',
    features: [
      'Board member elections',
      'Major initiative approvals',
      'Bylaws amendments',
      'Member polling & surveys',
      'Strategic decisions',
    ],
    caseStudy: 'Omnium Cultural',
    caseStudyDescription: 'Over 190,000 members across Europe trust Vocdoni for secure, verifiable voting',
    logos: ['🤝', '🎭', '📚'],
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-600/10 hover:bg-purple-600/20',
    borderColor: 'border-purple-600/30 hover:border-purple-600',
  },
  {
    id: 'sports-clubs',
    icon: TrophyIcon,
    title: 'Sports Clubs & Fan Organizations',
    description:
      'Handle millions of votes seamlessly for club elections and major decisions. Increase member participation while reducing administrative burden through accessible, transparent digital voting.',
    features: [
      'Club official elections',
      'Major expenditure approvals',
      'Policy changes & amendments',
      'Fan engagement polling',
      'International member voting',
    ],
    caseStudy: 'FC Barcelona',
    caseStudyDescription: 'Revolutionary blockchain voting for global fan participation with 2FA security',
    logos: ['⚽', '🏆', '🎽'],
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-600/10 hover:bg-red-600/20',
    borderColor: 'border-red-600/30 hover:border-red-600',
  },
  {
    id: 'professional-bodies',
    icon: BriefcaseIcon,
    title: 'Professional Associations',
    description:
      'Model industry best practices with state-of-the-art voting technology. Conduct executive elections, policy votes, and professional standards reviews with the highest levels of security and transparency.',
    features: [
      'Executive committee elections',
      'Policy & advocacy decisions',
      'Professional standards reviews',
      'Member engagement surveys',
      'Remote voting for distributed members',
    ],
    caseStudy: 'COEIC',
    caseStudyDescription: 'Modernized Annual General Assembly with blockchain voting and live streaming integration',
    logos: ['👔', '🎓', '💼'],
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-600/10 hover:bg-emerald-600/20',
    borderColor: 'border-emerald-600/30 hover:border-emerald-600',
  },
  {
    id: 'political-parties',
    icon: Building2Icon,
    title: 'Political Parties',
    description:
      'Build trust and legitimacy through transparent, verifiable elections. Conduct primaries, leadership elections, and policy votes with confidence. Support ranked-choice voting and multiple election types.',
    features: [
      'Primary elections & candidate selection',
      'Party leadership elections',
      'Policy platform votes',
      'Member engagement polling',
      'Regional & national elections',
    ],
    caseStudy: 'Esquerra Republicana de Catalunya (ERC)',
    caseStudyDescription: 'High-stakes national vote with blockchain transparency and ranked-choice voting support',
    logos: ['🗳️', '🏛️', '📊'],
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-600/10 hover:bg-orange-600/20',
    borderColor: 'border-orange-600/30 hover:border-orange-600',
  },
  {
    id: 'integrators',
    icon: CodeIcon,
    title: 'Software Integrators & Platform Providers',
    description:
      'Embed world-class voting infrastructure into your governance platform. Focus on user experience while Vocdoni handles security, verifiability, and compliance. Easy SDK and API integration.',
    features: [
      'JavaScript SDK & REST API',
      'Pre-built UI components',
      'Universal verifiability',
      'GDPR compliance out-of-the-box',
      'Scalable infrastructure',
    ],
    caseStudy: 'Decidim Integration',
    caseStudyDescription: 'Official partnership bringing blockchain voting to open-source digital democracy platform',
    logos: ['💻', '🔧', '🔌'],
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-600/10 hover:bg-cyan-600/20',
    borderColor: 'border-cyan-600/30 hover:border-cyan-600',
  },
]

const UseCasesGrid = () => {
  return (
    <section id='use-cases' className='bg-muted/50 py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-20'>
          <p className='text-primary text-sm font-medium uppercase tracking-wide'>Industry Solutions</p>
          <h2 className='text-3xl font-bold sm:text-4xl lg:text-5xl'>Trusted Across Industries</h2>
          <p className='text-muted-foreground mx-auto max-w-3xl text-lg sm:text-xl'>
            Vocdoni serves organizations of all sizes and types, from small associations to major institutions with
            millions of voters.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <Card
                key={useCase.id}
                className={`group transition-all duration-300 ${useCase.borderColor} hover:shadow-lg`}
              >
                <CardContent className='p-6'>
                  {/* Icon & Title */}
                  <div className='mb-6 space-y-4'>
                    <Avatar className='size-12 shadow-sm'>
                      <AvatarFallback className={`bg-card ${useCase.color}`}>
                        <Icon className='size-6' />
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <CardTitle className='mb-2 text-xl font-semibold'>{useCase.title}</CardTitle>
                      <CardDescription className='text-base'>{useCase.description}</CardDescription>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className='mb-6 space-y-3'>
                    <p className='text-sm font-semibold'>Key Use Cases:</p>
                    <ul className='space-y-2'>
                      {useCase.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className='text-muted-foreground flex items-start text-sm'>
                          <span className={`mr-2 mt-0.5 ${useCase.color}`}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Case Study Badge */}
                  <div className={`mb-4 rounded-lg p-3 ${useCase.bgColor}`}>
                    <p className='mb-1 text-xs font-semibold uppercase'>Featured Case Study</p>
                    <p className={`text-sm font-semibold ${useCase.color}`}>{useCase.caseStudy}</p>
                    <p className='text-muted-foreground mt-1 text-xs'>{useCase.caseStudyDescription}</p>
                  </div>

                  {/* Client Logos (Placeholder) */}
                  <div className='mb-4 flex items-center gap-2 border-t pt-4'>
                    <p className='text-muted-foreground text-xs'>Trusted by:</p>
                    <div className='flex gap-1'>
                      {useCase.logos.map((logo, idx) => (
                        <span key={idx} className='text-lg opacity-60'>
                          {logo}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant='ghost'
                    className={`w-full justify-center ${useCase.color} hover:bg-transparent`}
                    asChild
                  >
                    <Link href={`#${useCase.id}`} variant='inlineIcon'>
                      Learn More
                      <ArrowRightIcon className='size-4' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default UseCasesGrid
