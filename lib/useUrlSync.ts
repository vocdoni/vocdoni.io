import { localeDefault } from '@/locales'
import { useCallback, useEffect, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'

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
    path: '/impact',
    name: 'impact',
    title: 'Vocdoni - Impact',
    label: 'Impact',
    description: "Explore the impact of Vocdoni's technology on democratic participation and voting processes.",
    appearsOnMenu: true,
  },
  {
    path: '/testimonials',
    name: 'testimonials',
    title: 'Vocdoni - Testimonials',
    label: 'Testimonials',
    description: 'Hear from our satisfied clients about their experiences with Vocdoni.',
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
    path: '/advantages',
    name: 'advantages',
    title: 'Vocdoni - Advantages',
    label: 'Advantages',
    description: 'Discover the unique advantages of using Vocdoni for secure and transparent voting.',
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
  {
    path: '/footer',
    name: 'footer',
    title: 'Vocdoni - Footer',
    description: 'Footer section of Vocdoni website.',
    appearsOnMenu: false,
  },
] as const

export type SectionPath = (typeof SECTIONS)[number]['path']
export type SectionName = (typeof SECTIONS)[number]['name']

/**
 * Hook for managing URL synchronization with sections
 */
export function useUrlSync(onSectionChange?: (sectionIndex: number) => void) {
  const pageContext = usePageContext()
  const locale = (pageContext as any).locale || localeDefault
  const urlLogical = (pageContext as any).urlLogical || '/'

  // Helper function to build full URL with locale prefix
  const buildFullPath = useCallback(
    (path: string) => {
      if (locale === localeDefault) {
        return path
      }
      return `/${locale}${path}`
    },
    [locale]
  )

  // Helper function to extract path without locale from any pathname
  const getPathWithoutLocale = useCallback(
    (pathname: string) => {
      if (locale === localeDefault) {
        return pathname
      }
      // Remove locale prefix if present
      if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
        return pathname.substring(locale.length + 1) || '/'
      }
      return pathname
    },
    [locale]
  )

  // Helper to normalize paths by removing trailing slashes (except for root)
  const normalizePath = useCallback((path: string) => {
    // Keep root as '/', remove trailing slash from others
    if (!path || path === '/') return '/'
    return path.endsWith('/') ? path.slice(0, -1) : path
  }, [])

  // Get initial section from current URL
  const getInitialSection = useCallback(() => {
    // Use urlLogical from pageContext (available in both SSR and client)
    // This ensures consistent behavior on Netlify and locally
    const currentPath = normalizePath(urlLogical || '/')

    // Handle root path - default to first section
    if (currentPath === '/') return 0

    // Find matching section by path (normalize for Netlify trailing slash)
    const sectionIndex = SECTIONS.findIndex((section) => section.path === currentPath)
    return sectionIndex >= 0 ? sectionIndex : 0
  }, [urlLogical, normalizePath])

  const [activeSection, setActiveSection] = useState(getInitialSection)

  // Helper to update document title and meta tags
  const updatePageMeta = useCallback((sectionIndex: number) => {
    if (typeof document === 'undefined') return
    const section = SECTIONS[sectionIndex]
    document.title = section.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', section.description)
    }
  }, [])

  // Sync with URL on mount (for SSR hydration)
  useEffect(() => {
    const sectionIndex = getInitialSection()
    setActiveSection(sectionIndex)
    updatePageMeta(sectionIndex)
    // Scrolling happens automatically via CSS transform in SectionScroller
  }, [getInitialSection, updatePageMeta])

  // Navigate to a section (updates URL and title)
  const navigateToSection = useCallback(
    (sectionIndex: number, pushToHistory = true) => {
      if (sectionIndex < 0 || sectionIndex >= SECTIONS.length) return

      const section = SECTIONS[sectionIndex]

      // Update browser history with locale-aware full path
      if (pushToHistory && typeof window !== 'undefined') {
        const fullPath = buildFullPath(section.path)
        window.history.pushState({ sectionIndex }, section.title, fullPath)
      }

      // Update document title and meta
      updatePageMeta(sectionIndex)

      setActiveSection(sectionIndex)
    },
    [buildFullPath, updatePageMeta]
  )

  // Handle browser back/forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.sectionIndex !== undefined) {
        // Browser navigation with state - update section and meta without pushing to history
        const sectionIndex = event.state.sectionIndex
        setActiveSection(sectionIndex)
        updatePageMeta(sectionIndex)
      } else {
        // Direct URL navigation - extract locale-free path and normalize
        const fullPath = window.location.pathname
        const pathWithoutLocale = getPathWithoutLocale(fullPath)
        const currentPath = normalizePath(pathWithoutLocale)

        const sectionIndex = currentPath === '/' ? 0 : SECTIONS.findIndex((section) => section.path === currentPath)
        if (sectionIndex >= 0) {
          setActiveSection(sectionIndex)
          updatePageMeta(sectionIndex)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [updatePageMeta, getPathWithoutLocale, normalizePath])

  // Listen for external URL changes (like Link navigation)
  useEffect(() => {
    if (typeof window === 'undefined') return

    let lastPathname = window.location.pathname

    const checkUrlChange = () => {
      const fullPath = window.location.pathname
      if (fullPath !== lastPathname) {
        lastPathname = fullPath

        // Extract locale-free path and normalize for comparison
        const pathWithoutLocale = getPathWithoutLocale(fullPath)
        const currentPath = normalizePath(pathWithoutLocale)

        // URL changed externally (like Link click or navigateToSection)
        const sectionIndex = currentPath === '/' ? 0 : SECTIONS.findIndex((section) => section.path === currentPath)
        if (sectionIndex >= 0) {
          setActiveSection(sectionIndex)
          updatePageMeta(sectionIndex)
          // Don't call onSectionChange here - scrolling happens automatically via CSS
          // and calling it would cause navigateToSection to be called again (re-entrancy)
        }
      }
    }

    // Check for URL changes periodically
    const interval = setInterval(checkUrlChange, 100)

    return () => clearInterval(interval)
  }, [getPathWithoutLocale, updatePageMeta, normalizePath])

  return {
    activeSection,
    navigateToSection,
    sections: SECTIONS,
    getCurrentSection: () => SECTIONS[activeSection],
  }
}
