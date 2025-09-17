import { useCallback, useEffect, useState } from 'react'

// Section configuration
export const SECTIONS = [
  {
    path: '/',
    name: 'home',
    title: 'Vocdoni - Blockchain Voting Technology',
    description:
      'Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.',
  },
  {
    path: '/technology',
    name: 'technology',
    title: 'Vocdoni - Blockchain Voting Technology',
    description:
      'Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.',
  },
  {
    path: '/services',
    name: 'services',
    title: 'Vocdoni - Voting Services & Solutions',
    description:
      'Comprehensive voting solutions for organizations seeking secure, transparent, and efficient voting systems from consultation to implementation.',
  },
  {
    path: '/product',
    name: 'product',
    title: 'Vocdoni - Voting Platform & Product',
    description:
      'Enterprise-grade voting platform delivering unmatched security, scalability, and user experience for any size organization.',
  },
  {
    path: '/contact',
    name: 'contact',
    title: 'Vocdoni - Contact Us',
    description:
      'Ready to revolutionize your voting process? Get in touch with our team to discuss your requirements and see how Vocdoni can help.',
  },
] as const

export type SectionPath = (typeof SECTIONS)[number]['path']
export type SectionName = (typeof SECTIONS)[number]['name']

/**
 * Hook for managing URL synchronization with fullpage.js sections
 */
export function useUrlSync() {
  // Get initial section from current URL
  const getInitialSection = useCallback(() => {
    if (typeof window === 'undefined') return 0

    const currentPath = window.location.pathname
    // Handle root path - default to first section (technology)
    if (currentPath === '/') return 0

    const sectionIndex = SECTIONS.findIndex((section) => section.path === currentPath)
    return sectionIndex >= 0 ? sectionIndex : 0
  }, [])

  const [activeSection, setActiveSection] = useState(0)

  // After hydration, update activeSection based on client URL
  useEffect(() => {
    const sectionIndex = getInitialSection()
    setActiveSection(sectionIndex)
  }, [getInitialSection])

  // Navigate to a section (updates URL and title)
  const navigateToSection = useCallback((sectionIndex: number, pushToHistory = true) => {
    if (sectionIndex < 0 || sectionIndex >= SECTIONS.length) return

    const section = SECTIONS[sectionIndex]

    // Update browser history
    if (pushToHistory && typeof window !== 'undefined') {
      window.history.pushState({ sectionIndex }, section.title, section.path)
    }

    // Update document title and meta description
    if (typeof document !== 'undefined') {
      document.title = section.title

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', section.description)
      }
    }

    setActiveSection(sectionIndex)
  }, [])

  // Handle browser back/forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.sectionIndex !== undefined) {
        // Browser navigation - don't push to history again
        navigateToSection(event.state.sectionIndex, false)
      } else {
        // Direct URL navigation
        const currentPath = window.location.pathname
        if (currentPath === '/') {
          setActiveSection(0) // Root path maps to first section
        } else {
          const sectionIndex = SECTIONS.findIndex((section) => section.path === currentPath)
          if (sectionIndex >= 0) {
            setActiveSection(sectionIndex)
          }
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [navigateToSection])

  // Set initial state on page load
  useEffect(() => {
    const currentPath = window.location.pathname
    let sectionIndex = 0

    if (currentPath === '/') {
      sectionIndex = 0 // Root path maps to first section
    } else {
      const foundIndex = SECTIONS.findIndex((section) => section.path === currentPath)
      if (foundIndex >= 0) {
        sectionIndex = foundIndex
      }
    }

    const section = SECTIONS[sectionIndex]
    document.title = section.title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', section.description)
    }

    setActiveSection(sectionIndex)
  }, [])

  return {
    activeSection,
    navigateToSection,
    sections: SECTIONS,
    getCurrentSection: () => SECTIONS[activeSection],
  }
}
