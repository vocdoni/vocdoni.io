// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import type { MotionProps } from 'motion/react'
import { AnimatePresence, motion } from 'motion/react'

// Util Imports
import { cn } from '@/lib/utils'

interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
  wordClassName?: string
}

const WordRotate = ({ words, duration = 2500, motionProps, className, wordClassName }: WordRotateProps) => {
  // States
  const [index, setIndex] = useState(0)

  const initialMotionProps: MotionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.25, ease: 'easeOut' },
  }

  const mergedMotionProps = { ...initialMotionProps, ...motionProps }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className={cn('overflow-hidden py-2', className)}>
      <AnimatePresence mode='wait'>
        <motion.p key={words[index]} className={cn(wordClassName)} {...mergedMotionProps}>
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export { WordRotate, type WordRotateProps }
