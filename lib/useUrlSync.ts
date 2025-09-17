import { useCallback, useEffect, useState } from 'react'

type Section = {
  path: string
  name: string
  title: string
  description: string
  label?: string
  appearsOnMenu: boolean
}

// Section configuration
export const SECTIONS: Section[] = [
  {
    path: '/',
    name: 'home',
    title: 'Vocdoni - Blockchain Voting Technology',
    description:
      'Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.',
    appearsOnMenu: false,
  },
  {
    path: '/explore',
    name: 'explore',
    title: 'Vocdoni - Secure Digital Voting Technology',
    label: 'Explore',
    description:
      'Discover how Vocdoni provides secure, privacy-first digital voting technology that empowers communities, associations, and institutions.',
    appearsOnMenu: false,
  },
  {
    path: '/technology',
    name: 'technology',
    title: 'Vocdoni - Blockchain Voting Technology',
    label: 'Technology',
    description:
      'Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.',
    appearsOnMenu: true,
  },
  {
    path: '/services',
    name: 'services',
    title: 'Vocdoni - Voting Services & Solutions',
    label: 'Services',
    description:
      'Comprehensive voting solutions for organizations seeking secure, transparent, and efficient voting systems from consultation to implementation.',
    appearsOnMenu: true,
  },
  {
    path: '/product',
    name: 'product',
    title: 'Vocdoni - Voting Platform & Product',
    label: 'Product',
    description:
      'Enterprise-grade voting platform delivering unmatched security, scalability, and user experience for any size organization.',
    appearsOnMenu: true,
  },
  {
    path: '/contact',
    name: 'contact',
    title: 'Vocdoni - Contact Us',
    label: 'Contact',
    description:
      'Ready to revolutionize your voting process? Get in touch with our team to discuss your requirements and see how Vocdoni can help.',
    appearsOnMenu: true,
  },
] as const

export type SectionPath = (typeof SECTIONS)[number]['path']
export type SectionName = (typeof SECTIONS)[number]['name']

/**
 * Hook for managing URL synchronization with sections
 */
export function useUrlSync(onSectionChange?: (sectionIndex: number) => void) {
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
    // Also trigger scrolling on initial load
    onSectionChange?.(sectionIndex)
  }, [getInitialSection, onSectionChange])

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
          onSectionChange?.(0) // Trigger scrolling
        } else {
          const sectionIndex = SECTIONS.findIndex((section) => section.path === currentPath)
          if (sectionIndex >= 0) {
            setActiveSection(sectionIndex)
            onSectionChange?.(sectionIndex) // Trigger scrolling
          }
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [navigateToSection, onSectionChange])

  // Listen for external URL changes (like Link navigation)
  useEffect(() => {
    if (typeof window === 'undefined') return

    let lastPathname = window.location.pathname

    const checkUrlChange = () => {
      const currentPath = window.location.pathname
      if (currentPath !== lastPathname) {
        lastPathname = currentPath

        // URL changed externally (like Link click)
        if (currentPath === '/') {
          setActiveSection(0)
          onSectionChange?.(0)
        } else {
          const sectionIndex = SECTIONS.findIndex((section) => section.path === currentPath)
          if (sectionIndex >= 0) {
            setActiveSection(sectionIndex)
            onSectionChange?.(sectionIndex)
          }
        }
      }
    }

    // Check for URL changes periodically
    const interval = setInterval(checkUrlChange, 100)

    return () => clearInterval(interval)
  }, [onSectionChange])

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
