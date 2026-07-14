import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import logoBellpuig from '@/assets/logos/logo_bellpuig_colour.webp'
import logoCec from '@/assets/logos/logo_cec_colour.webp'
import logoEic from '@/assets/logos/logo_eic_colour.webp'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'
import logoPlataforma from '@/assets/logos/logo_plataforma_colour.webp'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import TestimonialCard from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonial-card'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
  name: string
  handle: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
  logo: string
}

type Stat = {
  value: string
  label: string
}

const logos = [
  { src: logoBellpuig, alt: 'Bellpuig' },
  { src: logoCec, alt: 'Centre Excursionista de Catalunya' },
  { src: logoOmnium, alt: 'Omnium Cultural' },
  { src: logoEic, alt: 'Enginyers Industrials de Catalunya' },
  { src: logoPlataforma, alt: 'Plataforma per la Llengua' },
]

export default function SocialProof() {
  const { t } = useTranslation()
  const stats = (t('app_landing.social_proof.stats', { returnObjects: true }) as Stat[]) || []
  const testimonials = (t('app_landing.social_proof.testimonials', { returnObjects: true }) as Testimonial[]) || []

  return (
    <section className='border-y border-border/60 bg-muted/25 py-20 sm:py-24'>
      <Container>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
            {t('app_landing.social_proof.eyebrow', 'Social proof')}
          </p>
          <h2 className='mt-3 text-balance text-3xl sm:text-4xl'>
            {t('app_landing.social_proof.title', 'Trusted by organizations that cannot afford disputed results')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            {t(
              'app_landing.social_proof.description',
              'Organizations worldwide use Vocdoni to run simple, secure votes with results members can verify.'
            )}
          </p>
        </div>

        <div className='mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6'>
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className='h-9 w-auto object-contain opacity-85'
              loading='lazy'
              decoding='async'
              width={144}
              height={36}
            />
          ))}
        </div>

        <div className='mt-10 grid gap-4 rounded-3xl border border-border/70 bg-background p-6 shadow-sm sm:grid-cols-3'>
          {stats.map((stat) => (
            <div key={stat.label} className='text-center'>
              <div className='text-3xl font-semibold text-primary tabular-nums'>{stat.value}</div>
              <p className='mt-1 text-sm text-muted-foreground'>{stat.label}</p>
            </div>
          ))}
        </div>

        <Card className='mt-8 border-border/70 bg-background shadow-sm'>
          <CardContent className='grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-end'>
            <div>
              <p className='text-sm font-medium uppercase tracking-[0.18em] text-primary/80'>
                {t('app_landing.social_proof.case_study.eyebrow', 'Mini case study')}
              </p>
              <h3 className='mt-2 text-2xl'>
                {t(
                  'app_landing.social_proof.case_study.title',
                  'How COIB ran its AGM online with instant, verifiable results'
                )}
              </h3>
              <p className='mt-3 max-w-3xl leading-7 text-muted-foreground'>
                {t(
                  'app_landing.social_proof.case_study.description',
                  'A regulated professional body moved its annual vote online, kept the experience simple for members, and ended with results that could be checked independently.'
                )}
              </p>
            </div>
            <Link
              href='https://blog.vocdoni.io/how-coib-a-professional-body-of-nurses-ran-its-2025-annual-general-meeting-vote-online-securely-and-with-instant-results/'
              className='inline-flex items-center gap-2 text-sm font-medium no-underline'
            >
              {t('app_landing.social_proof.case_study.link', 'Read the case study')}
              <ArrowRightIcon className='size-4' />
            </Link>
          </CardContent>
        </Card>

        <div className='mt-8 grid gap-5 lg:grid-cols-3'>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  )
}
