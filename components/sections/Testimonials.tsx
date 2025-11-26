import { useTranslation } from 'react-i18next'
import { LuChevronDown } from 'react-icons/lu'
import { Link } from '../Link'
import { Heading, Paragraph } from '../ui/typography'

import barcelona from '/assets/logos/barcelona.png'
import bellpuig from '/assets/logos/bellpuig.png'
import cec from '/assets/logos/cec.png'
import eic from '/assets/logos/eic.png'
import erc from '/assets/logos/erc.png'
import belarus from '/assets/logos/new_belarus.png'
import omnium from '/assets/logos/omnium.png'

type QuoteTestimonial = { quote: string; name: string; role: string; org: string; logo: string }
type StatTestimonial = { stat: string; text: string; org: string; logo: string; readMore?: string }
type Testimonials = Array<QuoteTestimonial | StatTestimonial>

function StatCard(testimonial: StatTestimonial) {
  const { t } = useTranslation()
  return (
    <>
      <div>
        <p className='text-6xl md:text-7xl font-extrabold leading-none tracking-tight'>{testimonial.stat}</p>
        <p className='text-sm md:text-base text-muted-foreground mt-3 leading-relaxed'>{testimonial.text}</p>
      </div>
      <div className='grid grid-cols-[1fr_auto] items-end gap-3 mt-auto'>
        {testimonial.readMore && (
          <Link
            variant='default'
            href={testimonial.readMore}
            className='text-sm font-medium text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors'
          >
            {t('testimonials.read_more', { defaultValue: 'Read more' })}
          </Link>
        )}
        <img src={testimonial.logo} alt={testimonial.org} className='h-7 md:h-8 justify-self-end col-start-2 opacity-80' />
      </div>
    </>
  )
}

function QuoteCard(testimonial: QuoteTestimonial) {
  return (
    <>
      <p className='text-base md:text-lg leading-relaxed mb-6 text-foreground/90 italic'>"{testimonial.quote}"</p>
      <div className='mt-auto space-y-1'>
        <p className='text-sm md:text-base font-semibold text-foreground'>{testimonial.name}</p>
        <p className='text-sm md:text-base text-muted-foreground'>{testimonial.role}</p>
        <div className='flex justify-end mt-4'>
          <img src={testimonial.logo} alt={testimonial.org} className='h-7 md:h-8 opacity-80' />
        </div>
      </div>
    </>
  )
}

export function Testimonials() {
  const { t } = useTranslation()

  const testimonials: Testimonials = [
    {
      stat: '45',
      text: t('testimonials.barcelona_stat', {
        defaultValue: 'representatives voting with Vocdoni at Barcelona City Council',
      }),
      org: 'Ajuntament de Barcelona',
      logo: barcelona,
    },
    {
      quote: t('testimonials.jordi_quote', {
        defaultValue:
          'We chose to use Vocdoni’s technology because we believe this is the future of what real elections of any kind should be. Electronic voting is open to everyone and makes the voting process easier for citizens.',
      }),
      name: 'Jordi Estiarte',
      role: t('testimonials.jordi_role', { defaultValue: 'Mayor' }),
      org: 'Ajuntament de Bellpuig',
      logo: bellpuig,
    },
    {
      stat: '82%',
      text: t('testimonials.erc_stat', {
        defaultValue: 'turnout in an internal election to elect a president and board members.',
      }),
      org: 'Esquerra Republicana',
      logo: erc,
    },
    {
      quote: t('testimonials.anna_quote', {
        defaultValue:
          'The commitment to Vocdoni has been clear, as from Òmnium Cultural we opted for a secure and verifiable voting system that would allow us to hold our statutory meetings with full guarantees to the more than 180,000 members who make up our organization.',
      }),
      name: 'Anna Giralt',
      role: t('testimonials.anna_role', { defaultValue: 'Executive Manager' }),
      org: 'Òmnium Cultural',
      logo: omnium,
    },
    {
      stat: '6,723',
      text: t('testimonials.new_belarus_stat', {
        defaultValue: 'votes cast with international observers under a repressive scenario.',
      }),
      org: 'New Belarus',
      readMore: 'https://blog.vocdoni.io/new-belarus-vocdoni',
      logo: belarus,
    },
    {
      quote: t('testimonials.ton_quote', {
        defaultValue:
          'We chose Vocdoni because it guarantees secure, reliable, and transparent participation for all our members in our Annual General Meeting.',
      }),
      name: 'Ton Barnils',
      role: t('testimonials.ton_role', { defaultValue: 'CEO' }),
      org: 'Centre Excursionista de Catalunya',
      logo: cec,
    },
    {
      stat: '32%',
      text: t('testimonials.bellpuig_stat', {
        defaultValue: 'turnout in the first fully digital consultative referendum held under Spanish law.',
      }),
      org: 'Ajuntament de Bellpuig',
      readMore: 'https://blog.vocdoni.io/referendum-bellpuig',
      logo: bellpuig,
    },
    {
      quote: t('testimonials.eic_quote', {
        defaultValue:
          'Vocdoni provides us with an easy, secure, anonymous, scalable voting system that is fully integrated into our institutional environment. We will certainly continue to trust their solution!',
      }),
      name: 'Oscar Tirivó',
      role: t('testimonials.eic_role', { defaultValue: 'IT Director' }),
      org: 'Enginyers Industrials de Catalunya',
      logo: eic,
    },
  ]

  return (
    <div className='h-viewport w-full grid grid-rows-[1fr_1fr] lg:grid-rows-1 lg:grid-cols-2 overflow-hidden'>
      {/* Testimonials intro */}
      <div className='flex flex-col'>
        <div className='flex-1 bg-background flex flex-col items-center justify-center'>
          <div className='w-full px-6 flex flex-col gap-6'>
            <div className='flex flex-col gap-6'>
              <Heading variant='section'>
                → {t('testimonials.title', { defaultValue: 'Real stories, Real impact' })}
              </Heading>
              <Paragraph variant='section'>
                {t('testimonials.description', {
                  defaultValue:
                    'From grassroots movements to large institutions, see how Vocdoni transforms decision-making through secure, accessible, and transparent technology.',
                })}
              </Paragraph>
            </div>
          </div>
        </div>
        <div className='hidden lg:block w-full px-6 py-6'>
          <Link href='/product' className='group inline-flex items-center gap-2 text-2xl font-semibold text-muted-foreground hover:text-foreground transition-colors'>
            <span>{t('testimonials.how', { defaultValue: 'How we make secure voting simple' })}</span>
            <LuChevronDown className='h-6 w-6 transition-transform group-hover:translate-y-0.5' />
          </Link>
        </div>
      </div>

      {/* Testimonials grid */}
      <div className='min-h-0 overflow-hidden bg-[#E1E1DC] px-4 py-4 lg:pt-20'>
        <div className='h-full overflow-y-auto overscroll-contain' data-scrollable>
          <div className='columns-1 lg:columns-2 gap-4'>
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className='bg-white p-6 md:p-8 rounded-xl ring-1 ring-black/5 shadow-md hover:shadow-lg flex flex-col gap-6 break-inside-avoid mb-4 transition-shadow duration-200'
              >
                {'quote' in testimonial ? <QuoteCard {...testimonial} /> : <StatCard {...testimonial} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
