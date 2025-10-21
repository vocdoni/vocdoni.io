import AutoScroll from 'embla-carousel-auto-scroll'
import { Trans, useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

const clients = [
  { name: 'Ajuntament de Barcelona', logo: '/assets/images/barcelona.png' },
  { name: 'Esquerra Republicana de Catalunya', logo: '/assets/images/erc.png' },
  { name: 'Alhora', logo: '/assets/images/alhora.png' },
  { name: 'Fútbol Club Barcelona', logo: '/assets/images/fcb.png' },
  { name: "Ajuntament de la Bisbal d'Empordà", logo: '/assets/images/bisbal.png' },
  { name: 'Associació Decidim', logo: '/assets/images/decidim.png' },
  { name: 'Ajuntament de Bellpuig', logo: '/assets/images/bellpuig.png' },
  { name: 'New Belarus', logo: '/assets/images/new_belarus.png' },
  { name: 'Plataforma per la Llengua', logo: '/assets/images/plataforma.png' },
  { name: 'Pirates', logo: '/assets/images/pirates.png' },
  { name: 'Enginyers Industrials de Catalunya', logo: '/assets/images/eic.png' },
  { name: 'Ajuntament de Berga', logo: '/assets/images/berga.png' },
  { name: 'Centre Excursionista de Catalunya', logo: '/assets/images/cec.png' },
  { name: "Col·legi Oficial d'Infermeres i Infermers de Barcelona", logo: '/assets/images/coib.png' },
  { name: 'Omnium Cultural', logo: '/assets/images/omnium.png' },
  { name: 'Votify', logo: '/assets/images/votify.png' },
  { name: "Col·legi Oficial d'Odontòlegs i Estomatòlegs de Catalunya", logo: '/assets/images/coec.png' },
]

export function Explore() {
  const { t } = useTranslation()
  return (
    <div className='relative min-h-screen w-full flex flex-col bg-[#F9F7F3] text-black p-6 '>
      <div className='items-center flex flex-1'>
        {/* Main headline with emojis */}
        <h1 className='text-[clamp(1.8rem,6vw,4.2rem)] font-bold leading-tight'>
          <Trans i18nKey='explore.headline'>
            Vocdoni provides secure <sup className='inline-block'>🔒</sup>, privacy-first{' '}
            <sup className='inline-block'>🕶️</sup> digital voting technology <sup className='inline-block'>🗳️</sup> that
            empowers communities, associations, and institutions to make collective decisions with full transparency,
            privacy and trust. <sup className='inline-block'>🤝</sup>{' '}
          </Trans>
        </h1>
      </div>

      {/* Trusted by section */}
      <div className='mt-auto w-full'>
        <p className='text-sm font-medium mb-4'>{t('explore.trusted_by', { defaultValue: 'Trusted by' })}</p>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
            containScroll: 'trimSnaps',
          }}
          plugins={[
            AutoScroll({
              playOnInit: true,
              speed: 1.0,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              startDelay: 0,
            }),
          ]}
          className='w-full'
        >
          <CarouselContent className='-ml-1'>
            {clients.map(({ name, logo }) => (
              <CarouselItem key={name} className='pl-1 basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/7 xl:basis-1/10'>
                <div className='p-1 flex items-center justify-center'>
                  <img src={logo} alt={name} className='block h-10 w-auto' />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
