import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'

const SCROLL_TRANSITION_DURATION = 700
const SCROLL_PIXEL_THRESHOLD = 100

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

function msToCssTime(ms: number): string {
  return `${(ms / 1000).toFixed(ms % 1000 === 0 ? 0 : 1)}s`
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
  const accumulatedDelta = useRef<number>(0)
  const isTransitioning = useRef<boolean>(false)

  // Set actual viewport height as CSS custom property
  useEffect(() => {
    const setViewportHeight = () => {
      // Use window.innerHeight which gives us the actual visible height
      const vh = window.innerHeight
      document.documentElement.style.setProperty('--actual-vh', `${vh}px`)
    }

    // Set initial value
    setViewportHeight()

    // Update on resize
    window.addEventListener('resize', setViewportHeight)

    return () => {
      window.removeEventListener('resize', setViewportHeight)
    }
  }, [])

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

      // Prevent new section changes during transition
      if (isTransitioning.current) {
        e.preventDefault()
        return
      }

      // Accumulate scroll delta for smooth trackpad/mouse wheel handling
      accumulatedDelta.current += e.deltaY

      if (Math.abs(accumulatedDelta.current) >= SCROLL_PIXEL_THRESHOLD) {
        isTransitioning.current = true

        if (accumulatedDelta.current > 0) goNext()
        else goPrev()

        accumulatedDelta.current = 0

        // Reset after CSS transition completes (matches 0.7s transition)
        setTimeout(() => {
          isTransitioning.current = false
        }, SCROLL_TRANSITION_DURATION)
      }

      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp']
      if (!keys.includes(e.key)) return

      const target = (e.target as HTMLElement) ?? document.activeElement
      const scrollable = findScrollableAncestor(target)

      const deltaY = e.key === 'ArrowDown' || e.key === 'PageDown' ? 100 : -100

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
      className={cn('h-viewport w-full overflow-hidden relative', containerClassName)}
      style={{
        touchAction: 'pan-y',
      }}
      tabIndex={0}
      aria-live='polite'
    >
      <div
        style={{
          height: `calc(${children.length} * var(--actual-vh))`,
          transform: `translateY(calc(-${activeSection} * var(--actual-vh)))`,
          transition: `transform ${msToCssTime(SCROLL_TRANSITION_DURATION)} cubic-bezier(0.77,0,0.175,1)`,
        }}
      >
        {children.map((child, i) => (
          <section
            key={i}
            className={cn('h-viewport w-full flex items-center justify-center', sectionClassName)}
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
