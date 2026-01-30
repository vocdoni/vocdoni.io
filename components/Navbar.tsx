import { ArrowRight } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import appImage from '@/assets/navbar_app_highlight.webp'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

// Example data
const buildProductFeatures = (t: (key: string) => string) => [
  {
    title: t('navbar.product_features.digital_voting_platform.title'),
    href: '/product/voting-platform',
    description: t('navbar.product_features.digital_voting_platform.description'),
  },
  {
    title: t('navbar.product_features.sdk.title'),
    href: '/product/sdk',
    description: t('navbar.product_features.sdk.description'),
  },
  {
    title: t('navbar.product_features.custom_projects.title'),
    href: '/product/custom',
    description: t('navbar.product_features.custom_projects.description'),
  },
]

const buildFeaturedSolution = (t: (key: string) => string) => ({
  title: t('navbar.featured_solution.vocdoni_app.title'),
  description: t('navbar.featured_solution.vocdoni_app.description'),
  href: 'https://app.vocdoni.io',
  cta: t('navbar.featured_solution.vocdoni_app.cta'),
  badge: t('navbar.featured_solution.vocdoni_app.badge'),
})

const buildTechnologyItems = (t: (key: string) => string) => [
  {
    title: t('navbar.technology_items.blockchain_protocol.title'),
    href: '/technology/protocol',
    description: t('navbar.technology_items.blockchain_protocol.description'),
  },
  {
    title: t('navbar.technology_items.zkp.title'),
    href: '/technology/zkp',
    description: t('navbar.technology_items.zkp.description'),
  },
  {
    title: t('navbar.technology_items.open_source.title'),
    href: 'https://github.com/vocdoni',
    description: t('navbar.technology_items.open_source.description'),
  },
]

const buildAboutItems = (t: (key: string) => string) => [
  {
    title: t('navbar.about_items.mission.title'),
    href: '/about/mission',
    description: t('navbar.about_items.mission.description'),
  },
  {
    title: t('navbar.about_items.team.title'),
    href: '/about/team',
    description: t('navbar.about_items.team.description'),
  },
  {
    title: t('navbar.about_items.careers.title'),
    href: '/about/careers',
    description: t('navbar.about_items.careers.description'),
  },
]

const buildResourcesItems = (t: (key: string) => string) => [
  {
    title: t('navbar.resources_items.blog.title'),
    href: 'https://blog.vocdoni.io',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: t('navbar.resources_items.blog.description'),
  },
  {
    title: t('navbar.resources_items.success_stories.title'),
    href: '/use-cases#success-stories',
    description: t('navbar.resources_items.success_stories.description'),
  },
  {
    title: t('navbar.resources_items.guides.title'),
    href: '/guides',
    description: t('navbar.resources_items.guides.description'),
  },
  {
    title: t('navbar.resources_items.docs.title'),
    href: 'https://developer.vocdoni.io',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: t('navbar.resources_items.docs.description'),
  },
]

import { Link } from '@/components/Link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import VocdoniLogo from './Logo'

export function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)

  const productFeatures = React.useMemo(() => buildProductFeatures(t), [t])
  const featuredSolution = React.useMemo(() => buildFeaturedSolution(t), [t])
  const technologyItems = React.useMemo(() => buildTechnologyItems(t), [t])
  const aboutItems = React.useMemo(() => buildAboutItems(t), [t])
  const resourcesItems = React.useMemo(() => buildResourcesItems(t), [t])

  return (
    <div className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full cursor-none pointer-events-none'>
      <header className='pointer-events-auto flex items-center justify-between gap-4 rounded-full border border-border/40 bg-background/80 px-4 py-2 shadow-sm backdrop-blur-md md:gap-8 min-w-fit max-w-[95vw] transition-all duration-300'>
        {/* Logo */}
        <div className='pointer-events'>
          <Link href='/' variant='unstyled'>
            <VocdoniLogo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden md:flex min-w-[600px] lg:min-w-[700px]'>
          <NavigationMenuList>
            {/* Solutions (formerly Product) */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navbar.solutions')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='w-[650px] p-6'>
                  <div className='grid grid-cols-2 gap-6'>
                    {/* Left column: Regular solution items */}
                    <div className='space-y-2'>
                      <h4 className='mb-3 px-2 text-sm text-muted-foreground font-medium'>
                        {t('navbar.solutions_header')}
                      </h4>
                      <ul className='space-y-0.5'>
                        {productFeatures.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link href={item.href} variant='navbarItem'>
                                <div className='text-sm font-medium leading-none'>{item.title}</div>
                                <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right column: Featured card with image */}
                    <div className='relative flex flex-col'>
                      <h4 className='mb-2 px-2 text-sm text-muted-foreground font-medium'>
                        {t('navbar.featured_solution.header')}
                      </h4>
                      <Link href={featuredSolution.href} target='_blank' rel='noopener noreferrer' variant='card'>
                        <div className='relative h-full'>
                          {/* App highlight image */}
                          <img src={appImage} alt='Vocdoni App' className='aspect-video w-full object-cover' />
                          {/* Gradient overlay */}
                          <span className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                          {/* Content overlay */}
                          <span className='absolute bottom-0 p-4 text-white'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='font-semibold text-sm'>{featuredSolution.title}</h3>
                              {featuredSolution.badge && (
                                <Badge variant='secondary' className='text-xs px-2 py-0'>
                                  {featuredSolution.badge}
                                </Badge>
                              )}
                            </div>
                            {featuredSolution.description && (
                              <p className='text-xs text-white/90'>{featuredSolution.description}</p>
                            )}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Use Cases */}
            <NavigationMenuItem>
              <Link href='/use-cases' variant='unstyled' className={navigationMenuTriggerStyle()}>
                {t('navbar.use_cases')}
              </Link>
            </NavigationMenuItem>

            {/* Technology */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navbar.technology')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {technologyItems.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href}>
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources (replaces Success stories) */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navbar.resources')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {resourcesItems.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href} target={item.target} rel={item.rel}>
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Us */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navbar.about')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {aboutItems.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href}>
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href='/contact' variant='unstyled' className={navigationMenuTriggerStyle()}>
                {t('navbar.contact')}
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side: App Button, Language Switcher & Mobile Menu */}
        <div className='flex items-center gap-2'>
          <LanguageSwitcher />
          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px] sm:w-[400px] p-0'>
              <div className='flex flex-col h-full bg-background'>
                {/* Header inside Sheet */}
                <div className='p-6 border-b'>
                  <VocdoniLogo />
                </div>

                {/* Menu Items */}
                <div className='flex-1 overflow-auto py-6 px-4'>
                  <Accordion type='single' collapsible className='w-full'>
                    {/* Solutions (mobile) */}
                    <AccordionItem value='product'>
                      <AccordionTrigger className='text-sm font-medium'>{t('navbar.solutions')}</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col space-y-2 pl-4'>
                          {/* Featured solution - mobile version */}
                          <div className='mb-2 p-3 rounded-lg bg-primary/5 border border-primary/20'>
                            <Link
                              href={featuredSolution.href}
                              target='_blank'
                              rel='noopener noreferrer'
                              variant='unstyled'
                              className='block'
                            >
                              <div className='flex items-start justify-between gap-2'>
                                <div className='flex-1'>
                                  <div className='flex items-center gap-2 mb-1'>
                                    <span className='text-sm font-semibold'>{featuredSolution.title}</span>
                                    {featuredSolution.badge && (
                                      <Badge variant='secondary' className='text-xs px-1.5 py-0'>
                                        {featuredSolution.badge}
                                      </Badge>
                                    )}
                                  </div>
                                  <span className='text-xs text-muted-foreground block'>
                                    {featuredSolution.description}
                                  </span>
                                </div>
                                <ArrowRight className='h-4 w-4 text-primary flex-shrink-0 mt-0.5' />
                              </div>
                            </Link>
                          </div>

                          {/* Regular items */}
                          {productFeatures.map((item) => (
                            <Link key={item.title} href={item.href} variant='navbarMobile'>
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Technology */}
                    <AccordionItem value='technology'>
                      <AccordionTrigger className='text-sm font-medium'>{t('navbar.technology')}</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col space-y-2 pl-4'>
                          {technologyItems.map((item) => (
                            <Link key={item.title} href={item.href} variant='navbarMobile'>
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Resources (mobile) */}
                    <AccordionItem value='resources'>
                      <AccordionTrigger className='text-sm font-medium'>{t('navbar.resources')}</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col space-y-2 pl-4'>
                          {resourcesItems.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              target={item.target}
                              rel={item.rel}
                              variant='navbarMobile'
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* About Us */}
                    <AccordionItem value='about'>
                      <AccordionTrigger className='text-sm font-medium'>{t('navbar.about')}</AccordionTrigger>
                      <AccordionContent>
                        <div className='flex flex-col space-y-2 pl-4'>
                          {aboutItems.map((item) => (
                            <Link key={item.title} href={item.href} variant='navbarMobile'>
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Static Links */}
                  <div className='mt-4 flex flex-col space-y-4'>
                    <Link href='/use-cases' variant='navbarStatic'>
                      {t('navbar.use_cases')}
                    </Link>
                    <Link href='/contact' variant='navbarStatic'>
                      {t('navbar.contact')}
                    </Link>
                  </div>
                </div>

                {/* Footer App Button - Keeping it here as well for easy access if menu is open */}
                <div className='p-6 border-t mt-auto'>
                  <Button asChild className='w-full rounded-full'>
                    <Link href='https://app.vocdoni.io' target='_blank' rel='noopener noreferrer' variant='unstyled'>
                      App
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* App Button (Visible on all screens now) */}
          <Button asChild className='rounded-full px-6'>
            <Link href='https://app.vocdoni.io' target='_blank' rel='noopener noreferrer' variant='unstyled'>
              {t('navbar.app_button')}
            </Link>
          </Button>
        </div>
      </header>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<typeof Link>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link ref={ref} variant='navbarItem' className={className} {...props}>
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
