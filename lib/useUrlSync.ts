import { localeDefault } from '@/locales'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

type SectionConfig = {
  path: string
  name: string
  appearsOnMenu: boolean
}

type Section = SectionConfig & {
  title: string
  description: string
  label?: string
}

// Static section configuration (routing data only)
export const SECTIONS_CONFIG: SectionConfig[] = [
  { path: '/', name: 'home', appearsOnMenu: false },
  { path: '/explore', name: 'explore', appearsOnMenu: false },
  { path: '/technology', name: 'technology', appearsOnMenu: true },
  { path: '/services', name: 'services', appearsOnMenu: true },
  { path: '/impact', name: 'impact', appearsOnMenu: true },
  { path: '/testimonials', name: 'testimonials', appearsOnMenu: true },
  { path: '/product', name: 'product', appearsOnMenu: true },
  { path: '/advantages', name: 'advantages', appearsOnMenu: true },
  { path: '/contact', name: 'contact', appearsOnMenu: true },
  { path: '/footer', name: 'footer', appearsOnMenu: false },
] as const

export type SectionPath = (typeof SECTIONS_CONFIG)[number]['path']
export type SectionName = (typeof SECTIONS_CONFIG)[number]['name']

/**
 * Hook to get sections enriched with translations
 */
export function useSections(): Section[] {
  const { locale } = usePageContext()
  const { t } = useTranslation()

  return useMemo(
    () =>
      SECTIONS_CONFIG.map((config) => ({
        ...config,
        title: t(`sections.${config.name}.title`),
        description: t(`sections.${config.name}.description`),
        label: t(`sections.${config.name}.label`),
      })),
    [locale, t]
  )
}

// i18next-extract-mark-ns:categories
// t('sections.home.title')
// t('sections.home.description')
// t('sections.explore.title')
// t('sections.explore.description')
// t('sections.explore.label')
// t('sections.technology.title')
// t('sections.technology.description')
// t('sections.technology.label')
// t('sections.services.title')
// t('sections.services.description')
// t('sections.services.label')
// t('sections.impact.title')
// t('sections.impact.description')
// t('sections.impact.label')
// t('sections.testimonials.title')
// t('sections.testimonials.description')
// t('sections.testimonials.label')
// t('sections.product.title')
// t('sections.product.description')
// t('sections.product.label')
// t('sections.advantages.title')
// t('sections.advantages.description')
// t('sections.advantages.label')
// t('sections.contact.title')
// t('sections.contact.description')
// t('sections.contact.label')
// t('sections.footer.title')
// t('sections.footer.description')

/**
 * Hook for managing URL synchronization with sections
 */
export function useUrlSync(onSectionChange?: (sectionIndex: number) => void) {
  const pageContext = usePageContext()
  const locale = (pageContext as any).locale || localeDefault
  const urlLogical = (pageContext as any).urlLogical || '/'
  const sections = useSections()

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
    const sectionIndex = sections.findIndex((section) => section.path === currentPath)
    return sectionIndex >= 0 ? sectionIndex : 0
  }, [urlLogical, normalizePath, sections])

  const [activeSection, setActiveSection] = useState(getInitialSection)

  // Helper to update document title and meta tags
  const updatePageMeta = useCallback(
    (sectionIndex: number) => {
      if (typeof document === 'undefined') return
      const section = sections[sectionIndex]
      document.title = section.title

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', section.description)
      }
    },
    [sections]
  )

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
      if (sectionIndex < 0 || sectionIndex >= sections.length) return

      const section = sections[sectionIndex]

      // Update browser history with locale-aware full path
      if (pushToHistory && typeof window !== 'undefined') {
        const fullPath = buildFullPath(section.path)
        window.history.pushState({ sectionIndex }, section.title, fullPath)
      }

      // Update document title and meta
      updatePageMeta(sectionIndex)

      setActiveSection(sectionIndex)
    },
    [sections, buildFullPath, updatePageMeta]
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

        const sectionIndex = currentPath === '/' ? 0 : sections.findIndex((section) => section.path === currentPath)
        if (sectionIndex >= 0) {
          setActiveSection(sectionIndex)
          updatePageMeta(sectionIndex)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [sections, updatePageMeta, getPathWithoutLocale, normalizePath])

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
        const sectionIndex = currentPath === '/' ? 0 : sections.findIndex((section) => section.path === currentPath)
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
  }, [sections, getPathWithoutLocale, updatePageMeta, normalizePath])

  return {
    activeSection,
    navigateToSection,
    sections,
    getCurrentSection: () => sections[activeSection],
  }
}
