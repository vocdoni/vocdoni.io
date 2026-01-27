import { Link } from '@/components/Link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { ArrowRightIcon, CheckCircle2Icon, ShieldCheckIcon, TrendingUpIcon } from 'lucide-react'

const successStories = [
  {
    id: 'bellpuig',
    organization: 'Bellpuig City Council',
    industry: 'Municipal Government',
    location: 'Catalonia, Spain',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    logo: '🏛️',
    quote:
      "Citizens can make their voice heard in the comfort of their homes or workplaces. Even if they're abroad, they can still exercise their right to vote from anywhere in the world.",
    author: 'Mayor Jordi Estiarte',
    stats: [
      { label: 'Voter Turnout', value: '31.67%', description: 'Unprecedented for non-binding local referendum' },
      { label: 'Eligible Voters', value: '3,458', description: 'All citizens over 16' },
      { label: 'Total Votes Cast', value: '1,095', description: '24/7 remote voting enabled' },
    ],
    impact:
      'First 100% digital consultation held by a public institution in Spain, demonstrating the tangible value of accessible, transparent, and secure digital governance for democracy.',
    highlights: [
      'QR code authentication for all voters',
      'In-person support at town hall for elderly residents',
      'Real-time vote verification on blockchain',
      'Zero exclusion - accessible to all demographics',
    ],
  },
  {
    id: 'omnium-cultural',
    organization: 'Omnium Cultural',
    industry: 'Cultural Association',
    location: 'Europe',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    logo: '🎭',
    quote:
      'At Omnium Cultural, we chose a secure and verifiable voting system that allows us to hold our statutory meetings with full guarantees for the more than 180,000 members of our organization.',
    author: 'Anna Giralt, Manager',
    stats: [
      { label: 'Total Members', value: '190,000+', description: "One of Europe's largest cultural organizations" },
      { label: 'Assemblies Held', value: '3', description: 'Plus one major election' },
      { label: 'Global Reach', value: 'Worldwide', description: 'Members vote from any location' },
    ],
    impact:
      'Set a new standard for secure and verifiable voting at scale, leveraging blockchain technology to ensure transparency, privacy, and accessibility for a vast international membership.',
    highlights: [
      'zkSNARKs for complete voter anonymity',
      'Immutable blockchain vote records',
      'Mobile-friendly global access',
      'Independent verification without revealing voter identity',
    ],
  },
  {
    id: 'fc-barcelona',
    organization: 'FC Barcelona',
    industry: 'Sports Club',
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    logo: '⚽',
    quote:
      'The decentralized nature of the voting infrastructure ensured that no single entity could manipulate or block the process, providing uninterrupted access to thousands of international members.',
    author: 'FC Barcelona',
    stats: [
      { label: 'International Voters', value: 'Thousands', description: 'Global fan club participation' },
      { label: 'Security Level', value: '2FA', description: 'Two-factor authentication required' },
      { label: 'Cost Reduction', value: 'Significant', description: 'vs traditional in-person voting' },
    ],
    impact:
      'Revolutionized fan engagement with the first fully digital election for the Consell Consultiu de Penyes, enabling global participation while maintaining the highest security standards.',
    highlights: [
      'End-to-end encryption & blind signatures',
      'Public blockchain audit trail',
      'Censorship-resistant infrastructure',
      'Seamless failover between nodes',
    ],
  },
  {
    id: 'erc',
    organization: 'Esquerra Republicana de Catalunya (ERC)',
    industry: 'Political Party',
    location: 'Catalonia, Spain',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    logo: '🗳️',
    quote:
      "With such high stakes, it was crucial that the election was conducted with maximum integrity and security—something Vocdoni's blockchain infrastructure ensured flawlessly.",
    author: 'ERC Leadership',
    stats: [
      { label: 'Political Impact', value: 'National', description: 'Influenced support for Spanish President' },
      { label: 'Voting Methods', value: 'Multiple', description: 'Ranked-choice & referenda support' },
      { label: 'Participation', value: 'Increased', description: 'Younger & international members engaged' },
    ],
    impact:
      'A high-stakes, country-wide digital vote that shaped national politics while demonstrating how blockchain technology can enhance trust, transparency, and participation in democratic processes.',
    highlights: [
      'Ranked-choice voting support',
      'Real-time auditable results',
      'Cryptographically secured votes',
      'Anonymous yet verifiable ballots',
    ],
  },
  {
    id: 'coeic',
    organization: 'COEIC',
    industry: 'Professional Association',
    location: 'Catalonia, Spain',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    logo: '👔',
    quote:
      'Remote voting enabled more engineers to take part in the decision-making process without geographical constraints, resulting in more representative results.',
    author: 'COEIC Leadership',
    stats: [
      { label: 'Voter Participation', value: 'Increased', description: 'Higher engagement across regions' },
      { label: 'Integration', value: 'Seamless', description: 'Live streaming & document access' },
      { label: 'Compliance', value: 'GDPR', description: 'Full privacy regulation adherence' },
    ],
    impact:
      'Modernized Annual General Assembly governance with blockchain voting, live streaming integration, and enhanced accessibility—making participation easier and more inclusive for all members.',
    highlights: [
      'Custom-branded voting interface',
      'Integrated video streaming',
      'Real-time result verification',
      'Anonymous yet auditable votes',
    ],
  },
  {
    id: 'decidim',
    organization: 'Decidim Integration',
    industry: 'Software Integration',
    location: 'Global',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    logo: '💻',
    quote:
      "Vocdoni's blockchain-based infrastructure prevents vote tampering, unauthorized access, and manipulation, making it an ideal solution for high-stakes elections and governance processes.",
    author: 'Decidim Partnership',
    stats: [
      { label: 'Platform Type', value: 'Open Source', description: 'Digital democracy software' },
      { label: 'Integration', value: 'Plug & Play', description: 'No infrastructure changes needed' },
      { label: 'Scalability', value: 'High', description: 'Supports large participation rates' },
    ],
    impact:
      'Official partnership bringing verifiable blockchain voting to a widely-used participatory governance platform, enabling municipalities and organizations worldwide to conduct secure digital elections.',
    highlights: [
      'Developer-friendly SDK & API',
      'Pre-built customizable UI components',
      'End-to-end verifiability',
      'GDPR-compliant out of the box',
    ],
  },
]

const SuccessStories = () => {
  return (
    <section id='success-stories' className='py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-20'>
          <MotionPreset
            component='p'
            className='text-primary text-sm font-medium uppercase tracking-wide'
            fade
            blur
            slide
            transition={{ duration: 0.5 }}
          >
            Success Stories
          </MotionPreset>

          <MotionPreset
            component='h2'
            className='text-3xl font-bold sm:text-4xl lg:text-5xl'
            fade
            blur
            slide
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            Real Results from Real Organizations
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground mx-auto max-w-3xl text-lg sm:text-xl'
            fade
            blur
            slide
            delay={0.4}
            transition={{ duration: 0.5 }}
          >
            Discover how leading organizations across industries have transformed their governance processes with
            Vocdoni's blockchain-powered voting platform.
          </MotionPreset>
        </div>

        {/* Success Stories Grid */}
        <div className='space-y-12'>
          {successStories.map((story, index) => (
            <MotionPreset key={story.id} fade blur slide delay={index * 0.1} transition={{ duration: 0.5 }}>
              <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-xl'>
                <div className='grid gap-6 lg:grid-cols-2'>
                  {/* Image Column */}
                  <div className='relative overflow-hidden lg:order-2'>
                    <div className='absolute inset-0 bg-gradient-to-br from-black/40 to-black/10' />
                    <img
                      src={story.image}
                      alt={story.organization}
                      className='h-full w-full object-cover lg:min-h-[500px]'
                    />
                    <div className='absolute bottom-6 left-6 right-6'>
                      <div className='flex items-center gap-3 text-white'>
                        <span className='text-4xl'>{story.logo}</span>
                        <div>
                          <p className='text-2xl font-bold'>{story.organization}</p>
                          <p className='text-sm opacity-90'>
                            {story.industry} · {story.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <CardContent className='flex flex-col justify-center p-8 lg:order-1 lg:p-12'>
                    {/* Quote */}
                    <div className='mb-6'>
                      <div className='mb-4 text-5xl leading-none opacity-20'>"</div>
                      <blockquote className='text-muted-foreground mb-4 text-lg italic'>{story.quote}</blockquote>
                      <p className='text-sm font-semibold'>— {story.author}</p>
                    </div>

                    {/* Stats */}
                    <div className='mb-6 grid grid-cols-3 gap-4 border-y py-6'>
                      {story.stats.map((stat, idx) => (
                        <div key={idx}>
                          <p className='text-primary mb-1 text-2xl font-bold'>{stat.value}</p>
                          <p className='mb-1 text-xs font-semibold'>{stat.label}</p>
                          <p className='text-muted-foreground text-xs'>{stat.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Impact */}
                    <div className='mb-6'>
                      <div className='mb-3 flex items-center gap-2'>
                        <TrendingUpIcon className='text-primary size-5' />
                        <p className='font-semibold'>Impact</p>
                      </div>
                      <p className='text-muted-foreground text-sm'>{story.impact}</p>
                    </div>

                    {/* Highlights */}
                    <div className='mb-6'>
                      <div className='mb-3 flex items-center gap-2'>
                        <CheckCircle2Icon className='text-primary size-5' />
                        <p className='font-semibold'>Key Highlights</p>
                      </div>
                      <ul className='grid gap-2 sm:grid-cols-2'>
                        {story.highlights.map((highlight, idx) => (
                          <li key={idx} className='text-muted-foreground flex items-start text-sm'>
                            <span className='text-primary mr-2 mt-0.5'>✓</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button variant='outline' className='w-full sm:w-auto' asChild>
                      <Link href={`#${story.id}`} variant='inlineIcon'>
                        Read Full Case Study
                        <ArrowRightIcon className='size-4' />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </MotionPreset>
          ))}
        </div>

        {/* Bottom CTA */}
        <MotionPreset fade blur slide delay={0.6} transition={{ duration: 0.5 }} className='mt-16 text-center'>
          <Card className='bg-primary/5 border-primary/20'>
            <CardContent className='p-8 sm:p-12'>
              <div className='mx-auto max-w-2xl space-y-6'>
                <div className='flex justify-center'>
                  <Avatar className='size-16'>
                    <AvatarFallback className='bg-primary/10 text-primary'>
                      <ShieldCheckIcon className='size-8' />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className='text-2xl sm:text-3xl'>Join These Success Stories</CardTitle>
                <CardDescription className='text-base sm:text-lg'>
                  Organizations worldwide trust Vocdoni for secure, transparent, and verifiable digital voting. Whether
                  you're a small association or a major institution with millions of voters, our platform scales to meet
                  your needs.
                </CardDescription>
                <div className='flex flex-wrap justify-center gap-4'>
                  <Button size='lg' className='has-[>svg]:px-6' asChild>
                    <Link href='https://app.vocdoni.io' variant='inlineIcon'>
                      Start Your Free Trial
                      <ArrowRightIcon className='size-5' />
                    </Link>
                  </Button>
                  <Button size='lg' variant='outline' asChild>
                    <Link href='#contact' variant='unstyled'>
                      Schedule a Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>
    </section>
  )
}

export default SuccessStories
