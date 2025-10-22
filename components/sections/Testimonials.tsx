import { useTranslation } from 'react-i18next'
import { Link } from '../Link'

import barcelona from '/assets/images/barcelona.png'
import bellpuig from '/assets/images/bellpuig.png'
import cec from '/assets/images/cec.png'
import eic from '/assets/images/eic.png'
import erc from '/assets/images/erc.png'
import belarus from '/assets/images/new_belarus.png'
import omnium from '/assets/images/omnium.png'

type QuoteTestimonial = { quote: string; name: string; role: string; org: string; logo: string }
type StatTestimonial = { stat: string; text: string; org: string; logo: string; readMore?: boolean }
type Testimonials = Array<QuoteTestimonial | StatTestimonial>

function StatCard(testimonial: StatTestimonial) {
  const { t } = useTranslation()
  return (
    <>
      <div>
        <p className='text-6xl font-bold'>{testimonial.stat}</p>
        <p className='text-sm text-muted-foreground mt-1'>{testimonial.text}</p>
      </div>
      <div className='grid grid-cols-[1fr_auto] items-end gap-3 mt-auto'>
        {testimonial.readMore && (
          <Link
            variant='default'
            href='/stories'
            className='text-sm font-medium decoration-current underline-offset-4 hover:underline'
          >
            {t('testimonials.read_more', { defaultValue: 'Read more' })}
          </Link>
        )}
        <img src={testimonial.logo} alt={testimonial.org} className='h-8 justify-self-end col-start-2' />
      </div>
    </>
  )
}

function QuoteCard(testimonial: QuoteTestimonial) {
  return (
    <>
      <p className='text-sm leading-relaxed mb-5'>“{testimonial.quote}”</p>
      <div className='mt-auto'>
        <p className='text-sm font-semibold'>{testimonial.name}</p>
        <p className='text-xs text-muted-foreground'>{testimonial.role}</p>
        <div className='flex justify-end mt-6'>
          <img src={testimonial.logo} alt={testimonial.org} className='h-8' />
        </div>
      </div>
    </>
  )
}

export function Testimonials() {
  const { t } = useTranslation()

  const testimonials: Testimonials = [
    {
      stat: '5,000',
      text: t('testimonials.barcelona_stat', { defaultValue: 'citizens engaged in participatory budgeting.' }),
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
      stat: '82%',
      text: t('testimonials.erc_stat', {
        defaultValue: 'turnout in an internal election to elect a president and board members.',
      }),
      org: 'Esquerra Republicana',
      logo: erc,
    },
    {
      stat: '6,723',
      text: t('testimonials.new_belarus_stat', {
        defaultValue: 'votes cast with international observers under a repressive scenario.',
      }),
      org: 'New Belarus',
      readMore: true,
      logo: belarus,
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
      readMore: true,
      logo: bellpuig,
    },
  ]

  return (
    <div className='h-svh min-h-0 w-full grid grid-rows-[1fr_1fr] lg:grid-rows-1 lg:grid-cols-2 overflow-hidden'>
      {/* Testimonials intro */}
      <div className='flex flex-col'>
        <div className='flex-1 bg-background flex flex-col items-center justify-center'>
          <div className='w-full px-6 flex flex-col gap-6'>
            <div className='flex-col gap-6'>
              <p className='text-2xl md:text-3xl font-medium'>
                → {t('testimonials.title', { defaultValue: 'Real stories, Real impact' })}
              </p>
              <p className='text-xl md:text-2xl mt-6 max-w-md leading-relaxed'>
                {t('testimonials.description', {
                  defaultValue:
                    'From grassroots movements to large institutions, see how Vocdoni transforms decision-making through secure, accessible, and transparent technology.',
                })}
              </p>
            </div>
          </div>
        </div>
        <div className='hidden lg:block w-full px-6 py-6'>
          <Link href='/product' className='block text-2xl font-semibold text-muted-foreground'>
            {t('testimonials.how', { defaultValue: 'How we make secure voting simple' })} ↓
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
                className='bg-white p-6 rounded-xl ring-1 ring-black/5 shadow-sm flex flex-col gap-6 break-inside-avoid mb-4'
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
