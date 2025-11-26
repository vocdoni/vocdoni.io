import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimatedHamburger } from '@/components/AnimatedHamburger'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Link } from '@/components/Link'
import { VocdoniLogo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useSections } from '@/lib/useUrlSync'

interface NavigationProps {
  activeSection?: number
  usesScroll?: boolean
}

export function Navigation({ activeSection = 0, usesScroll = false }: NavigationProps) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sections = useSections()
  const [isAtTop, setIsAtTop] = useState(true)
  const isLargeScreen = useMediaQuery('(min-width: 1024px)', { initializeWithValue: false })
  const menuItems = sections
    .filter((section) => section.appearsOnMenu)
    .map((section) => ({
      label: section.label || section.name,
      path: section.path,
    }))

  useEffect(() => {
    // Only listen to scroll events if usesScroll is true
    if (!usesScroll) return

    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0)
    }

    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [usesScroll])

  // Determine visibility based on mode
  const showRightMenu = usesScroll ? isAtTop : activeSection === 0

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 xl:backdrop-blur-md xl:bg-white/10'>
      <div className='px-4'>
        <div className='h-16 flex items-center xl:grid xl:grid-cols-[15%_70%_15%]'>
          {/* Logo */}
          <div className='flex items-center'>
            {(showRightMenu || isLargeScreen) && (
              <Link href='/'>
                <VocdoniLogo minimal />
              </Link>
            )}
          </div>

          {/* Center Navigation with White Background */}
          <div className='hidden xl:flex items-center justify-center'>
            <div className='bg-white rounded-md px-6 py-2 shadow-sm ring-1 ring-black/5'>
              {menuItems.map((item) => {
                const activeSectionPath = sections[activeSection]?.path
                const isActive = item.path === activeSectionPath
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    variant='nav'
                    className={[
                      'relative px-4 py-2 text-sm transition-colors rounded-sm',
                      isActive
                        ? 'text-gray-900 font-semibold bg-gray-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50/50',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side buttons */}
          <div className='hidden xl:flex items-center justify-end gap-3'>
            <LanguageSwitcher />
            <Button asChild>
              <a href='https://app.vocdoni.io' target='_blank' rel='noopener noreferrer'>
                {t('navigation.app', { defaultValue: 'App' })}
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className='ml-auto xl:hidden'>
            <Button variant='ghost' size='sm' onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2'>
              <AnimatedHamburger isOpen={isMenuOpen} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Full Screen */}
        {isMenuOpen && (
          <div className='fixed inset-0 z-50 xl:hidden bg-stone-100 flex flex-col animate-in fade-in duration-300'>
            {/* Header with logo and close button */}
            <div className='h-16 flex items-center justify-between px-4'>
              <VocdoniLogo minimal />
              <Button variant='ghost' size='sm' onClick={() => setIsMenuOpen(false)} className='p-2'>
                <AnimatedHamburger isOpen={isMenuOpen} />
              </Button>
            </div>

            {/* Menu items - centered vertically */}
            <div className='flex-1 flex flex-col items-center justify-center space-y-6 px-4'>
              {menuItems.map((item, index) => {
                const activeSectionPath = sections[activeSection]?.path
                const isActive = item.path === activeSectionPath
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    variant='nav'
                    className={[
                      'text-3xl font-normal hover:opacity-70 transition-all duration-200',
                      'animate-in slide-in-from-bottom',
                      isActive ? 'text-gray-900 font-semibold' : 'text-gray-700',
                    ].join(' ')}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Bottom section with language switcher and app button */}
            <div className='pb-8 px-4 space-y-4'>
              <div className='flex justify-center'>
                <LanguageSwitcher />
              </div>
              <Button asChild className='w-full'>
                <a
                  href='https://app.vocdoni.io'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.app', { defaultValue: 'App' })}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
