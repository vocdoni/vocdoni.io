import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'

function isScrollableEl(el: Element | null) {
  if (!el || !(el instanceof HTMLElement)) return false
  const style = window.getComputedStyle(el)
  const overflowY = style.overflowY
  const canScroll = el.scrollHeight > el.clientHeight
  return canScroll && (overflowY === 'auto' || overflowY === 'scroll')
}

function findScrollableAncestor(target: EventTarget | null): HTMLElement | null {
  let el = (target as Node) instanceof Node ? (target as Node) : null
  while (el && el instanceof HTMLElement) {
    // Prioriza elementos marcados con data-scrollable
    if (el.dataset && el.dataset.scrollable !== undefined) return el
    if (isScrollableEl(el)) return el
    el = el.parentElement
  }
  return null
}

function canScrollInDirection(el: HTMLElement, deltaY: number) {
  if (deltaY > 0) {
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight
    return !atBottom
  }
  if (deltaY < 0) {
    const atTop = el.scrollTop <= 0
    return !atTop
  }
  return false
}

interface SectionScrollerProps {
  children: React.ReactNode[]
  activeSection: number
  sectionClassName?: string
  containerClassName?: string
  onSectionChange?: (index: number) => void
}

export function SectionScroller({
  children,
  activeSection,
  sectionClassName = '',
  containerClassName = '',
  onSectionChange,
}: SectionScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number | null>(null)
  const touchStartTarget = useRef<EventTarget | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const goNext = () => {
      if (activeSection < children.length - 1) onSectionChange?.(activeSection + 1)
    }
    const goPrev = () => {
      if (activeSection > 0) onSectionChange?.(activeSection - 1)
    }

    const handleWheel = (e: WheelEvent) => {
      const scrollable = findScrollableAncestor(e.target)
      if (scrollable && canScrollInDirection(scrollable, e.deltaY)) {
        return
      }
      if (e.deltaY > 0) goNext()
      else if (e.deltaY < 0) goPrev()
      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Spacebar']
      if (!keys.includes(e.key)) return

      const target = (e.target as HTMLElement) ?? document.activeElement
      const scrollable = findScrollableAncestor(target)

      const deltaY = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Spacebar' ? 100 : -100

      if (scrollable && canScrollInDirection(scrollable, deltaY)) {
        return
      }

      if (deltaY > 0) goNext()
      else goPrev()
      e.preventDefault()
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartTarget.current = e.target
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current == null) return
      const currentY = e.touches[0].clientY
      const deltaY = touchStartY.current - currentY

      const scrollable = findScrollableAncestor(touchStartTarget.current)
      if (scrollable && canScrollInDirection(scrollable, deltaY)) {
        return
      }

      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const threshold = 50

      const scrollable = findScrollableAncestor(touchStartTarget.current)

      if (scrollable && canScrollInDirection(scrollable, deltaY)) {
        touchStartY.current = null
        touchStartTarget.current = null
        return
      }

      if (deltaY > threshold) goNext()
      else if (deltaY < -threshold) goPrev()

      touchStartY.current = null
      touchStartTarget.current = null
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection, children.length, onSectionChange])

  return (
    <div
      ref={containerRef}
      className={cn('h-screen w-full overflow-hidden relative', containerClassName)}
      style={{
        touchAction: 'pan-y',
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
          <section
            key={i}
            className={cn('h-screen w-full flex items-center justify-center', sectionClassName)}
            id={`section-${i}`}
            aria-hidden={activeSection !== i}
          >
            {child}
          </section>
        ))}
      </div>
    </div>
  )
}
