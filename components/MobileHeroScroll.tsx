import { CensusCard, ResultsCard, VotingCard } from '@/components/HeroCards'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function MobileHeroScroll() {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollLockRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom >= 100

      if (isInView && activeCard < 2) {
        // Lock scroll and advance card
        if (!scrollLockRef.current) {
          scrollLockRef.current = true
          setTimeout(() => {
            setActiveCard((prev) => Math.min(prev + 1, 2))
            scrollLockRef.current = false
          }, 600)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeCard])

  const cards = [
    <CensusCard key='census' />,
    <VotingCard key='voting' animated={false} />,
    <ResultsCard key='results' animated={false} />,
  ]

  return (
    <div ref={containerRef} className='relative w-full h-[280px] my-6'>
      <div className='relative w-full h-full flex items-center justify-center'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='w-full'
          >
            {cards[activeCard]}
          </motion.div>
        </AnimatePresence>

        {/* Card indicators */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeCard ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
