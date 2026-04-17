import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import manosImg from '@/assets/images/team/manos.webp'
import oscarImg from '@/assets/images/team/oscar.webp'
import ferranImg from '@/assets/images/team/ferran.webp'
import auletImg from '@/assets/images/team/aulet.webp'
import alexImg from '@/assets/images/team/alex.webp'

const avatars = [
  {
    src: manosImg,
    fallback: 'MD',
    name: 'Manos Dimogerontakis'
  },
  {
    src: oscarImg,
    fallback: 'OC',
    name: 'Òscar Casajuana'
  },
  {
    src: ferranImg,
    fallback: 'FR',
    name: 'Ferran Reyes'
  },
  {
    src: auletImg,
    fallback: 'JA',
    name: 'Jordi Aulet'
  },
  {
    src: alexImg,
    fallback: 'AA',
    name: 'Alex Arce'
  }
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
          <Avatar className='ring-background ring-2 transition-all duration-300 ease-in-out hover:z-10 hover:-translate-y-1 hover:shadow-md'>
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
