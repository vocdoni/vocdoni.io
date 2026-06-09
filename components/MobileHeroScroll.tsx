import { CensusCard, ResultsCard, VotingCard } from '@/components/HeroCards'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const CARD_COUNT = 3

export default function MobileHeroScroll() {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollLockRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom >= 100

      if (isInView) {
        if (!scrollLockRef.current) {
          scrollLockRef.current = true
          setTimeout(() => {
            setActiveCard((prev) => (prev + 1) % CARD_COUNT)
            scrollLockRef.current = false
          }, 600)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cards = [
    <CensusCard key='census' />,
    <VotingCard key='voting' animated={false} />,
    <ResultsCard key='results' animated={false} />,
  ]

  return (
    <div ref={containerRef} className='w-full my-6 flex flex-col items-center gap-4'>
      <div className='relative w-full flex items-center justify-center'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='w-full max-w-md mx-auto'
          >
            {cards[activeCard]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card indicators */}
      <div className='flex gap-2'>
        {Array.from({ length: CARD_COUNT }, (_, i) => (
          <span
            key={i}
            onClick={() => setActiveCard(i)}
            className='flex items-center justify-center min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm'
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeCard ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
