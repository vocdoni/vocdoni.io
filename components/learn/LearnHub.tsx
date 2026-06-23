import { ArrowRightIcon, BookOpenIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

// Order shown on the hub. Copy lives in i18n under learn_index.cards.<slug>.
const ARTICLES: { slug: string; href: string }[] = [
  { slug: 'how_secure_online_voting_works', href: '/learn/how-secure-online-voting-works' },
  { slug: 'verifiable_voting_explained', href: '/learn/verifiable-voting-explained' },
  { slug: 'anonymous_voting_explained', href: '/learn/anonymous-voting-explained' },
  { slug: 'blockchain_voting_myths_vs_reality', href: '/learn/blockchain-voting-myths-vs-reality' },
  { slug: 'how_to_run_a_legally_valid_agm_online', href: '/learn/how-to-run-a-legally-valid-agm-online' },
  { slug: 'gdpr_requirements_for_digital_voting', href: '/learn/gdpr-requirements-for-digital-voting' },
  { slug: 'how_to_prevent_election_fraud_online', href: '/learn/how-to-prevent-election-fraud-online' },
]

type HubContent = {
  eyebrow: string
  title: string
  subtitle: string
  cards: Record<string, { title: string; description: string; category: string }>
}

export function LearnHub() {
  const { t } = useTranslation()
  const content = t('learn_index', { returnObjects: true }) as HubContent
  const cards = content?.cards ?? {}

  return (
    <>
      <section className='relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <MotionPreset
              component='p'
              className='text-primary mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide'
              fade
              blur
              slide
              transition={{ duration: 0.5 }}
            >
              <BookOpenIcon className='size-4' aria-hidden='true' />
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
            {ARTICLES.map(({ slug, href }) => {
              const card = cards[slug]
              if (!card) return null
              return (
                <Card key={slug} className='group h-full transition-shadow duration-300 hover:shadow-lg'>
                  <Link href={href} variant='unstyled' className='block h-full'>
                    <CardContent className='flex h-full flex-col gap-3 p-6'>
                      <span className='text-primary text-xs font-medium uppercase tracking-wide'>{card.category}</span>
                      <h2 className='text-lg font-semibold'>{card.title}</h2>
                      <p className='text-muted-foreground flex-grow text-sm leading-relaxed'>{card.description}</p>
                      <span className='text-primary inline-flex items-center gap-2 text-sm font-medium'>
                        {t('learn_index.card_cta', 'Read guide')}
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

export default LearnHub
