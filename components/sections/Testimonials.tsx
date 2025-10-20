import { useTranslation } from 'react-i18next'
import { Link } from '../Link'

const testimonials = [
  {
    stat: '5,000',
    text: 'citizens engaged in participatory budgeting.',
    org: 'Ajuntament de Barcelona',
    logo: '/assets/logos/barcelona.png',
  },
  {
    quote:
      'We chose to use Vocdoni’s technology because we believe this is the future of what real elections of any kind should be. Electronic voting is open to everyone and makes the voting process easier for citizens.',
    name: 'Jordi Estiarte',
    role: 'Mayor',
    org: 'Ajuntament de Bellpuig',
    logo: '/assets/logos/bellpuig.png',
  },
  {
    quote:
      'The commitment to Vocdoni has been clear, as from Òmnium Cultural we opted for a secure and verifiable voting system that would allow us to hold our statutory meetings with full guarantees to the more than 180,000 members who make up our organization.',
    name: 'Anna Giralt',
    role: 'Executive Manager',
    org: 'Òmnium Cultural',
    logo: '/assets/logos/omnium.png',
  },
  {
    stat: '82%',
    text: 'turnout in an internal election to elect a president and board members.',
    org: 'Esquerra Republicana',
    logo: '/assets/logos/erc.png',
  },
  {
    stat: '6,723',
    text: 'votes cast with international observers under a repressive scenario.',
    org: 'New Belarus',
    readMore: true,
    logo: '/assets/logos/new_belarus.png',
  },
  {
    quote:
      'Vocdoni provides us with an easy, secure, anonymous, scalable voting system that is fully integrated into our institutional environment. We will certainly continue to trust their solution!',
    name: 'Oscar Tirivó',
    role: 'IT Director',
    org: 'Enginyers Industrials de Catalunya',
    logo: '/assets/logos/eic.png',
  },
  {
    quote:
      'We chose Vocdoni because it guarantees secure, reliable, and transparent participation for all our members in our Annual General Meeting.',
    name: 'Ton Barnils',
    role: 'CEO',
    org: 'Centre Excursionista de Catalunya',
    logo: '/assets/logos/cec.png',
  },
  {
    stat: '32%',
    text: 'turnout in the first fully digital consultative referendum held under Spanish law.',
    org: 'Ajuntament de Bellpuig',
    readMore: true,
    logo: '/assets/logos/bellpuig.png',
  },
]

function StatCard(t: any) {
  return (
    <>
      <div>
        <p className='text-6xl font-bold'>{t.stat}</p>
        <p className='text-sm text-muted-foreground mt-1'>{t.text}</p>
      </div>
      <div className='grid grid-cols-[1fr_auto] items-center mt-6'>
        {t.readMore && (
          <Link
            variant='default'
            href='/stories'
            className='text-sm font-medium decoration-current underline-offset-4 hover:underline'
          >
            Read more
          </Link>
        )}
        <img src={t.logo} alt={t.org} className='h-8 justify-self-end col-start-2' />
      </div>
    </>
  )
}

function QuoteCard(t: any) {
  return (
    <>
      <p className='text-sm leading-relaxed mb-5'>“{t.quote}”</p>
      <div className='mt-auto'>
        <p className='text-sm font-semibold'>{t.name}</p>
        <p className='text-xs text-muted-foreground'>{t.role}</p>
        <div className='flex justify-end mt-6'>
          <img src={t.logo} alt={t.org} className='h-8' />
        </div>
      </div>
    </>
  )
}

export function Testimonials() {
  const { t } = useTranslation()

  return (
    <div className='h-svh min-h-0 w-full grid grid-rows-[1fr_1fr] lg:grid-rows-1 lg:grid-cols-2 overflow-hidden'>
      {/* Izquierda: ocupa 50% en móvil (fila 1) y 50% ancho en lg (col 1) */}
      <div className='min-h-0 overflow-hidden flex flex-col items-start justify-center px-6 md:px-12'>
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

      {/* Derecha: 50% en móvil (fila 2) y 50% ancho en lg (col 2), con scroll */}
      <div className='min-h-0 overflow-hidden bg-[#E1E1DC] px-4 py-4'>
        <div className='h-full overflow-y-auto overscroll-contain'>
          <div className='grid grid-cols-1 gap-4'>
            {testimonials.map((t, i) => (
              <div key={i} className='bg-white p-6 rounded-xl ring-1 ring-black/5 shadow-sm'>
                {'quote' in t ? <QuoteCard {...t} /> : <StatCard {...t} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
