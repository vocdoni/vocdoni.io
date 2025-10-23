import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Link } from '@/components/Link'
import { VocdoniLogo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useSections } from '@/lib/useUrlSync'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface NavigationProps {
  activeSection?: number
  usesScroll?: boolean
}

export function Navigation({ activeSection = 0, usesScroll = false }: NavigationProps) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sections = useSections()
  const [isAtTop, setIsAtTop] = useState(true)
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
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
    <nav className='fixed top-0 left-0 right-0 z-50 lg:backdrop-blur-sm'>
      <div className='px-4'>
        <div className='h-16 flex items-center lg:grid md:grid-cols-3'>
          {/* Logo */}
          <div className='flex items-center'>{(showRightMenu || isLargeScreen) && <VocdoniLogo minimal />}</div>

          {/* Center Navigation with White Background */}
          <div className='hidden lg:flex items-center justify-center'>
            <div className='bg-white rounded-sm px-6 py-2'>
              {menuItems.map((item) => (
                <Link key={item.label} href={item.path} variant='nav' className='px-4 py-2 text-sm'>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className='hidden lg:flex items-center justify-end gap-3'>
            <LanguageSwitcher />
            <Button asChild className='bg-[#E3D6C5] text-black hover:bg-[#d1bfa8]'>
              <a href='https://app.vocdoni.io' target='_blank' rel='noopener noreferrer'>
                {t('navigation.app', { defaultValue: 'App' })}
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className='ml-auto lg:hidden'>
            <Button variant='ghost' size='sm' onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {isMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className='lg:hidden border-t border-border bg-white mt-2 mx-2 shadow-lg'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  variant='nav'
                  className='block px-3 py-2 text-sm hover:bg-gray-50 rounded-md'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className='pt-2 border-t border-gray-100'>
                <a
                  href='https://app.vocdoni.io'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block px-3 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 rounded-md transition-colors text-center'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.app', { defaultValue: 'App' })}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
