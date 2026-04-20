import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { ChevronRightIcon, CircleSmallIcon, MenuIcon } from 'lucide-react'
import { useMedia } from 'react-use'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { cn } from '@/lib/utils'

import LogoSvg from '@/components/illustrations/logo'
import { Link } from '@/components/Link'

type NavigationItem = {
  title: string
  href: string
  icon?: ReactNode
  description?: string
}

type ImageSection = {
  img: string
  href: string
  title: string
  description?: string
}

type Navigation = {
  title: string
  contentClassName?: string
} & (
  | {
      href: string
      items?: never
      subtitle?: never
      imgSubtitle?: never
      imageSection?: never
    }
  | {
      href?: never
      subtitle?: never
      imgSubtitle?: never
      items?: NavigationItem[]
      imageSection?: never
    }
  | {
      href?: never
      subtitle: string
      imgSubtitle: string
      items?: NavigationItem[]
      imageSection: ImageSection
    }
)

// Helper component to render navigation items with icons/descriptions
const RichNavigationItem = ({ item }: { item: NavigationItem }) => (
  <NavigationMenuLink asChild>
    <Link href={item.href} variant='unstyled' className='flex gap-2 p-2'>
      <div className='flex items-start gap-3'>
        {item.icon && (
          <div className='bg-background [&_svg]:text-foreground! flex size-7 items-center justify-center rounded-sm border'>
            {item.icon}
          </div>
        )}
        <div className='flex-1 space-y-1'>
          <div className='text-popover-foreground text-sm font-medium'>{item.title}</div>
          {item.description && <p className='text-muted-foreground line-clamp-2 text-sm'>{item.description}</p>}
        </div>
      </div>
    </Link>
  </NavigationMenuLink>
)

// Helper component to render simple navigation items
const SimpleNavigationItem = ({ item }: { item: NavigationItem }) => (
  <NavigationMenuLink asChild>
    <Link href={item.href} variant='unstyled' className='block rounded-md p-2'>
      {item.title}
    </Link>
  </NavigationMenuLink>
)

// Helper component to render the image section
const ImageSectionContent = ({ imageSection }: { imageSection: ImageSection }) => (
  <Link href={imageSection.href} variant='card' className='relative'>
    <img src={imageSection.img} alt={imageSection.title} className='h-full w-full rounded-md object-cover' loading='lazy' />
    <span className='absolute inset-0 h-full bg-gradient-to-t from-black/60 to-transparent' />
    <span className='absolute bottom-0 p-4 text-white'>
      <h3 className='font-semibold'>{imageSection.title}</h3>
      {imageSection.description && <p className='text-sm'>{imageSection.description}</p>}
    </span>
  </Link>
)

const HeroNavigation02 = ({ navigationData, className }: { navigationData: Navigation[]; className?: string }) => {
  const hasRichContent = (items?: NavigationItem[]) => items?.some((item) => item.description || item.icon)

  return (
    <div className={cn('flex items-center', className)}>
      <NavigationMenu>
        <NavigationMenuList className='flex-wrap gap-0'>
          {navigationData.map((navItem) => {
            // Simple link (no dropdown)
            if (navItem.href) {
              return (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={navItem.href}
                      variant='unstyled'
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-muted-foreground bg-transparent !px-3 !py-1.5 text-base! font-medium! shadow-none'
                      )}
                    >
                      {navItem.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }

            // Dropdown with items
            const ItemComponent = hasRichContent(navItem.items) ? RichNavigationItem : SimpleNavigationItem
            const spacing = hasRichContent(navItem.items) ? 'space-y-2' : 'space-y-0.5'

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuTrigger className='text-muted-foreground bg-transparent !px-3 !py-1.5 text-base! font-medium! shadow-none [&_svg]:size-4'>
                  {navItem.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={cn(
                    navItem.contentClassName,
                    'left-1/2 -translate-x-1/2 !bg-white/35 shadow-lg! !backdrop-blur-sm'
                  )}
                >
                  {navItem.imageSection ? (
                    <div className='grid grid-cols-2 gap-2'>
                      <ul className='bg-background space-y-2 rounded-md border p-2'>
                        <li className='text-muted-foreground px-2 text-sm'>{navItem.subtitle}</li>
                        {navItem.items?.map((item) => (
                          <li key={item.title}>
                            <RichNavigationItem item={item} />
                          </li>
                        ))}
                      </ul>
                      <div className='relative flex h-full flex-col overflow-hidden'>
                        <h3 className='text-muted-foreground mb-2 px-2 text-sm'>{navItem.imgSubtitle}</h3>
                        <div className='flex-1'>
                          <ImageSectionContent imageSection={navItem.imageSection} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ul className={cn('bg-background rounded-md border p-2', spacing)}>
                      {navItem.items?.map((item) => (
                        <li key={item.title}>
                          <ItemComponent item={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const HeroNavigation02SmallScreen = ({
  logoName,
  navigationData,
  triggerClassName,
  screenSize = 1023,
}: {
  logoName: string
  navigationData: Navigation[]
  triggerClassName?: string
  screenSize?: number
}) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMedia(`(max-width: ${screenSize}px)`, false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className={cn('inline-flex lg:hidden', triggerClassName)}>
          <MenuIcon />
          <span className='sr-only'>Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-75 gap-0 p-0'>
        <SheetHeader className='p-4'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link href='#' variant='unstyled' onClick={handleLinkClick} className='self-start'>
            <div className='flex items-center'>
              <LogoSvg className='size-8.5' />
              <span className='ml-2.5 text-xl font-semibold'>{logoName}</span>
            </div>
          </Link>
        </SheetHeader>
        <div className='space-y-0.5 overflow-y-auto p-2'>
          {navigationData.map((navItem, index) => {
            if (navItem.href) {
              return (
                <Link
                  key={navItem.title}
                  href={navItem.href}
                  variant='unstyled'
                  className='hover:bg-accent flex items-center gap-2 rounded-sm px-3 py-2 text-sm'
                  onClick={handleLinkClick}
                >
                  {navItem.title}
                </Link>
              )
            }

            return (
              <Collapsible key={index} className='w-full'>
                <CollapsibleTrigger className='hover:bg-accent group flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm'>
                  <div className='flex items-center gap-2'>{navItem.title}</div>
                  <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-90' />
                </CollapsibleTrigger>
                <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all duration-300'>
                  {navItem.items?.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      variant='unstyled'
                      className='hover:bg-accent ml-3 flex items-center gap-2 rounded-sm px-3 py-2 text-sm'
                      onClick={handleLinkClick}
                    >
                      {item.icon ? item.icon : <CircleSmallIcon className='size-4' />}
                      {item.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { HeroNavigation02, HeroNavigation02SmallScreen, type ImageSection, type Navigation, type NavigationItem }
