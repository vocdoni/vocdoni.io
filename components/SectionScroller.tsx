import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'

interface SectionScrollerProps {
  children: React.ReactNode[]
  activeSection: number
  //  // Not used in this version
  sectionClassName?: string
  containerClassName?: string
}

export function SectionScroller({
  children,
  activeSection,
  sectionClassName = '',
  containerClassName = '',
  onSectionChange,
}: SectionScrollerProps & { onSectionChange?: (index: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number | null>(null)

  // Handle wheel, keyboard, and touch events for section navigation
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && activeSection < children.length - 1) {
        onSectionChange?.(activeSection + 1)
      } else if (e.deltaY < 0 && activeSection > 0) {
        onSectionChange?.(activeSection - 1)
      }
      e.preventDefault()
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && activeSection < children.length - 1) {
        onSectionChange?.(activeSection + 1)
        e.preventDefault()
      } else if (e.key === 'ArrowUp' && activeSection > 0) {
        onSectionChange?.(activeSection - 1)
        e.preventDefault()
      }
    }
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (deltaY > 50 && activeSection < children.length - 1) {
        onSectionChange?.(activeSection + 1)
      } else if (deltaY < -50 && activeSection > 0) {
        onSectionChange?.(activeSection - 1)
      }
      touchStartY.current = null
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection, children.length, onSectionChange])

  return (
    <div
      ref={containerRef}
      className={cn(
        'h-screen w-full overflow-hidden relative', // Lock scroll
        containerClassName
      )}
      style={{
        touchAction: 'none',
      }}
      tabIndex={0}
      aria-live='polite'
    >
      <div
        style={{
          height: `${children.length * 100}vh`,
          transform: `translateY(-${activeSection * 100}vh)`,
          transition: 'transform 0.7s cubic-bezier(0.77,0,0.175,1)',
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={cn(
              'h-screen w-full flex items-center justify-center', // Full viewport
              sectionClassName
            )}
            id={`section-${i}`}
            aria-hidden={activeSection !== i}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
