import { Link } from '@/components/Link'
import { VocdoniLogo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { SECTIONS } from '@/lib/useUrlSync'
import { useState } from 'react'

interface NavigationProps {
  activeSection?: number
  onNavigate?: (sectionIndex: number) => void
}

// Use existing sections but with new labels, filter by appearsOnMenu

const menuItems = SECTIONS.filter((section) => section.appearsOnMenu).map((section, index) => {
  const sectionIndex = SECTIONS.findIndex((s) => s === section)
  return {
    label: section.label || section.name.charAt(0).toUpperCase() + section.name.slice(1),
    index: sectionIndex,
    path: section.path,
  }
})

export function Navigation({ activeSection = 0, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-sm'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <VocdoniLogo minimal />
          </div>

          {/* Center Navigation with White Background */}
          <div className='hidden md:flex items-center bg-white rounded-sm px-6 py-2'>
            {menuItems.map((item) => (
              <Link key={item.label} href={item.path} variant='nav' className='px-4 py-2 text-sm'>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className='hidden md:flex items-center'>
            <Button asChild className='bg-gray-400 text-white hover:bg-gray-600'>
              <a href='https://app.vocdoni.io' target='_blank' rel='noopener noreferrer'>
                Login
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
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
          <div className='md:hidden border-t border-border bg-white mt-2 mx-2 shadow-lg'>
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
                  Login
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
