import { Button } from '@/components/ui/button'
import { SECTIONS } from '@/lib/useUrlSync'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface NavigationProps {
  activeSection?: number
  onNavigate?: (sectionIndex: number) => void
}

const menuItems = SECTIONS.map((section, index) => ({
  label: section.name.charAt(0).toUpperCase() + section.name.slice(1),
  index,
  path: section.path,
}))

export function Navigation({ activeSection = 0, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = (index: number) => {
    onNavigate?.(index)
    setIsMenuOpen(false)
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <span className='text-xl font-bold text-foreground'>Vocdoni</span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant='ghost'
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  activeSection === item.index
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => handleNavigation(item.index)}
              >
                {item.label}
              </Button>
            ))}
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
          <div className='md:hidden border-t border-border'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant='ghost'
                  className={cn(
                    'w-full justify-start text-left px-3 py-2',
                    activeSection === item.index
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => handleNavigation(item.index)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
