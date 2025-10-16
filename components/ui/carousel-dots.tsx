'use client'

import { useCarousel } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import * as React from 'react'

export function CarouselDots({ className }: { className?: string }) {
  const { api } = useCarousel()
  const [total, setTotal] = React.useState(0)
  const [current, setCurrent] = React.useState(0)
  const [clicked, setClicked] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!api) return

    setTotal(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    const onReInit = () => {
      setTotal(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    api.on('reInit', onReInit)
    api.on('resize', onReInit)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onReInit)
      api.off('resize', onReInit)
    }
  }, [api])

  const handleClick = (i: number) => {
    setClicked(i)
    api?.scrollTo(i)
  }

  if (!api || total === 0) return null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className='flex flex-wrap items-center gap-2'>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            aria-label={`Ir a la página ${i + 1}`}
            className={cn(
              'h-2 w-2 rounded-full transition-opacity',
              i === current ? 'bg-black opacity-100' : 'bg-black/30 opacity-70'
            )}
          />
        ))}
      </div>
    </div>
  )
}
