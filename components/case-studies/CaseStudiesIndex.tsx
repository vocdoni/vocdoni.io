import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import logoBellpuig from '@/assets/logos/logo_bellpuig_colour.webp'
import logoCoib from '@/assets/logos/logo_coib_round.webp'
import logoErc from '@/assets/logos/erc.webp'
import logoNewBelarus from '@/assets/logos/new_belarus.webp'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'

type StudyCard = { slug: string; href: string; logo: string }

// Order shown on the index. Copy lives in i18n under case_studies_index.cards.<slug>.
const STUDIES: StudyCard[] = [
  { slug: 'coib', href: '/case-studies/coib', logo: logoCoib },
  { slug: 'esquerra_republicana', href: '/case-studies/esquerra-republicana', logo: logoErc },
  { slug: 'bellpuig', href: '/case-studies/bellpuig', logo: logoBellpuig },
  { slug: 'new_belarus', href: '/case-studies/new-belarus', logo: logoNewBelarus },
  { slug: 'omnium_cultural', href: '/case-studies/omnium-cultural', logo: logoOmnium },
]

type IndexContent = {
  eyebrow: string
  title: string
  subtitle: string
  cards: Record<string, { org: string; industry: string; summary: string }>
}

export function CaseStudiesIndex() {
  const { t } = useTranslation()
  const content = t('case_studies_index', { returnObjects: true }) as IndexContent
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
            {STUDIES.map(({ slug, href, logo }) => {
              const card = cards[slug]
              if (!card) return null
              return (
                <Card key={slug} className='group h-full transition-shadow duration-300 hover:shadow-lg'>
                  <Link href={href} variant='unstyled' className='block h-full'>
                    <CardContent className='flex h-full flex-col gap-4 p-6'>
                      <div className='flex items-center gap-3'>
                        <img src={logo} alt={card.org} className='size-12 rounded-full bg-white object-contain p-1' />
                        <div>
                          <p className='font-semibold leading-tight'>{card.org}</p>
                          <p className='text-muted-foreground text-xs'>{card.industry}</p>
                        </div>
                      </div>
                      <p className='text-muted-foreground flex-grow text-sm leading-relaxed'>{card.summary}</p>
                      <span className='text-primary inline-flex items-center gap-2 text-sm font-medium'>
                        {t('case_studies_index.card_cta', 'Read case study')}
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
    </>
  )
}

export default CaseStudiesIndex
