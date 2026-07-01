import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'

import auletImg from '@/assets/images/team/aulet.webp'
import ferranImg from '@/assets/images/team/ferran.webp'
import jordiPinyanaImg from '@/assets/images/team/jordi_pinyana.webp'
import lucasImg from '@/assets/images/team/lucas.webp'
import manosImg from '@/assets/images/team/manos.webp'
import oscarImg from '@/assets/images/team/oscar.webp'
import pauEscrichImg from '@/assets/images/team/pau_escrich.webp'

const avatars = [
  {
    src: pauEscrichImg,
    fallback: 'PE',
    name: 'Pau Escrich',
  },
  {
    src: jordiPinyanaImg,
    fallback: 'JP',
    name: 'Jordi Pinyana',
  },
  {
    src: ferranImg,
    fallback: 'FR',
    name: 'Ferran Reyes',
  },
  {
    src: manosImg,
    fallback: 'MD',
    name: 'Manos Dimogerontakis',
  },
  {
    src: oscarImg,
    fallback: 'OC',
    name: 'Òscar Casajuana',
  },
  {
    src: auletImg,
    fallback: 'JA',
    name: 'Jordi Aulet',
  },
  {
    src: lucasImg,
    fallback: 'LM',
    name: 'Lucas Menéndez',
  },
]

const AvatarGroupTooltipDemo = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className='flex -space-x-2'>
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className='relative'
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Avatar className='ring-background ring-2 transition-[transform,box-shadow] duration-300 ease-in-out hover:z-10 hover:-translate-y-1 hover:shadow-md'>
            <AvatarImage src={avatar.src} alt={avatar.name} />
            <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
          </Avatar>

          {/* Manual Tooltip */}
          {hoveredIndex === index && (
            <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md border animate-in fade-in zoom-in duration-200 z-20 whitespace-nowrap'>
              {avatar.name}
              <div className='absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-popover' />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AvatarGroupTooltipDemo
