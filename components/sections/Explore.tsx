import AutoScroll from 'embla-carousel-auto-scroll'
import { Trans, useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

import alhora from '/assets/images/alhora.png'
import barcelona from '/assets/images/barcelona.png'
import bellpuig from '/assets/images/bellpuig.png'
import berga from '/assets/images/berga.png'
import bisbal from '/assets/images/bisbal.png'
import cec from '/assets/images/cec.png'
import coec from '/assets/images/coec.png'
import coib from '/assets/images/coib.png'
import decidim from '/assets/images/decidim.png'
import eic from '/assets/images/eic.png'
import erc from '/assets/images/erc.png'
import fcb from '/assets/images/fcb.png'
import belarus from '/assets/images/new_belarus.png'
import omnium from '/assets/images/omnium.png'
import pirates from '/assets/images/pirates.png'
import plataforma from '/assets/images/plataforma.png'
import votify from '/assets/images/votify.png'

const clients = [
  { name: 'Ajuntament de Barcelona', logo: barcelona },
  { name: 'Esquerra Republicana de Catalunya', logo: erc },
  { name: 'Alhora', logo: alhora },
  { name: 'Fútbol Club Barcelona', logo: fcb },
  { name: "Ajuntament de la Bisbal d'Empordà", logo: bisbal },
  { name: 'Associació Decidim', logo: decidim },
  { name: 'Ajuntament de Bellpuig', logo: bellpuig },
  { name: 'New Belarus', logo: belarus },
  { name: 'Plataforma per la Llengua', logo: plataforma },
  { name: 'Pirates', logo: pirates },
  { name: 'Enginyers Industrials de Catalunya', logo: eic },
  { name: 'Ajuntament de Berga', logo: berga },
  { name: 'Centre Excursionista de Catalunya', logo: cec },
  { name: "Col·legi Oficial d'Infermeres i Infermers de Barcelona", logo: coib },
  { name: 'Omnium Cultural', logo: omnium },
  { name: 'Votify', logo: votify },
  { name: "Col·legi Oficial d'Odontòlegs i Estomatòlegs de Catalunya", logo: coec },
]

export function Explore() {
  const { t } = useTranslation()
  return (
    <div className='relative min-h-viewport w-full flex flex-col bg-[#F9F7F3] text-black p-6 '>
      <div className='items-center flex flex-1'>
        {/* Main headline */}
        <h1 className='text-[clamp(1.8rem,6vw,4.2rem)] font-bold leading-tight tracking-tight'>
          <Trans i18nKey='explore.headline'>
            Vocdoni provides secure, privacy-first digital voting technology that empowers communities, associations, and
            institutions to make collective decisions with full transparency, privacy and trust.
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
          <CarouselContent className='gap-2 md:gap-3 lg:gap-4'>
            {clients.map(({ name, logo }) => (
              <CarouselItem key={name} className='basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/7 xl:basis-1/10'>
                <div className='p-1 h-12 flex items-center justify-center'>
                  <img src={logo} alt={name} className='block h-auto max-h-10 w-auto max-w-full object-contain' />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
