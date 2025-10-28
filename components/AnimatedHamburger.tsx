import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

interface AnimatedHamburgerProps {
  isOpen: boolean
  className?: string
}

export function AnimatedHamburger({ isOpen, className = 'w-8 h-8' }: AnimatedHamburgerProps) {
  const topLineRef = useRef<SVGLineElement>(null)
  const middleLineRef = useRef<SVGLineElement>(null)
  const bottomLineRef = useRef<SVGLineElement>(null)
  const tlRef = useRef<gsap.core.Timeline>(null)

  useGSAP(() => {
    // Create timeline with paused state
    tlRef.current = gsap.timeline({ paused: true })
    tlRef.current
      .to(topLineRef.current, {
        y: 25,
        rotation: 45,
        transformOrigin: 'center center',
        duration: 0.4,
        ease: 'power2.inOut',
      })
      .to(
        bottomLineRef.current,
        {
          y: -25,
          rotation: -45,
          transformOrigin: 'center center',
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        middleLineRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        0
      )
  }, [])

  useGSAP(() => {
    if (tlRef.current) {
      if (isOpen) {
        tlRef.current.play()
      } else {
        tlRef.current.reverse()
      }
    }
  }, [isOpen])

  return (
    <svg
      className={className}
      viewBox='0 0 100 100'
      fill='none'
      stroke='currentColor'
      strokeWidth='8'
      strokeLinecap='round'
    >
      <line ref={topLineRef} x1='20' y1='25' x2='80' y2='25' />
      <line ref={middleLineRef} x1='20' y1='50' x2='80' y2='50' />
      <line ref={bottomLineRef} x1='20' y1='75' x2='80' y2='75' />
    </svg>
  )
}
