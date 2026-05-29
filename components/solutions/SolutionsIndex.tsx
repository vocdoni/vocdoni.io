import {
  ArrowRightIcon,
  Building2Icon,
  BuildingIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HandshakeIcon,
  HeartHandshakeIcon,
  LandmarkIcon,
  type LucideIcon,
  MegaphoneIcon,
  TrophyIcon,
  UsersIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-09/cta-section-09'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

type VerticalCard = { slug: string; href: string; icon: LucideIcon }

// Order shown on the hub. Copy lives in i18n under solutions_index.cards.<slug>.
const VERTICALS: VerticalCard[] = [
  { slug: 'associations', href: '/solutions/associations', icon: UsersIcon },
  { slug: 'cooperatives', href: '/solutions/cooperatives', icon: HandshakeIcon },
  { slug: 'professional_colleges', href: '/solutions/professional-colleges', icon: BriefcaseIcon },
  { slug: 'political_parties', href: '/solutions/political-parties', icon: Building2Icon },
  { slug: 'municipalities', href: '/solutions/municipalities', icon: LandmarkIcon },
  { slug: 'sports_clubs', href: '/solutions/sports-clubs', icon: TrophyIcon },
  { slug: 'ngos', href: '/solutions/ngos', icon: HeartHandshakeIcon },
  { slug: 'universities', href: '/solutions/universities', icon: GraduationCapIcon },
  { slug: 'companies_agm', href: '/solutions/companies-agm', icon: BuildingIcon },
  { slug: 'trade_unions', href: '/solutions/trade-unions', icon: MegaphoneIcon },
]

type IndexContent = {
  eyebrow: string
  title: string
  subtitle: string
  cards: Record<string, { title: string; description: string }>
}

export function SolutionsIndex() {
  const { t } = useTranslation()
  const content = t('solutions_index', { returnObjects: true }) as IndexContent
  const cards = content?.cards ?? {}

  return (
    <>
      <section className='relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <MotionPreset
              component='p'
              className='text-primary mb-4 text-sm font-medium uppercase tracking-wide'
              fade
              blur
              slide
              transition={{ duration: 0.5 }}
            >
              {content?.eyebrow}
            </MotionPreset>
            <MotionPreset
              component='h1'
              className='mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl'
              fade
              blur
              slide
              delay={0.15}
              transition={{ duration: 0.5 }}
            >
              {content?.title}
            </MotionPreset>
            <MotionPreset
              component='p'
              className='text-muted-foreground text-lg sm:text-xl'
              fade
              blur
              slide
              delay={0.3}
              transition={{ duration: 0.5 }}
            >
              {content?.subtitle}
            </MotionPreset>
          </div>
        </Container>
      </section>

      <section className='pb-16 sm:pb-24'>
        <Container>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {VERTICALS.map(({ slug, href, icon: Icon }) => {
              const card = cards[slug]
              if (!card) return null
              return (
                <Card key={slug} className='group h-full transition-all duration-300 hover:shadow-lg'>
                  <Link href={href} variant='unstyled' className='block h-full'>
                    <CardContent className='flex h-full flex-col gap-4 p-6'>
                      <div className='bg-primary/10 text-primary inline-flex size-12 items-center justify-center rounded-lg'>
                        <Icon className='size-6' aria-hidden='true' />
                      </div>
                      <div className='flex-grow'>
                        <h2 className='mb-2 text-xl font-semibold'>{card.title}</h2>
                        <p className='text-muted-foreground text-sm leading-relaxed'>{card.description}</p>
                      </div>
                      <span className='text-primary inline-flex items-center gap-2 text-sm font-medium'>
                        {t('solutions_index.card_cta', 'Explore solution')}
                        <ArrowRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
                      </span>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}

export default SolutionsIndex
