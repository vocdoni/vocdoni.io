import type { TFunction } from 'i18next'
import { ArrowRight } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import appImage from '@/assets/navbar_app_highlight.webp'
import { CalBookingDialog } from '@/components/CalBookingDialog'
import { Link } from '@/components/Link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import VocdoniLogo from './Logo'

type ProductFeature =
  | {
      title: string
      description: string
      kind: 'link'
      href: string
      target?: string
      rel?: string
    }
  | {
      title: string
      description: string
      kind: 'booking'
      triggerAriaLabel: string
    }

const buildProductFeatures = (t: (key: string) => string) =>
  [
    {
      title: t('navbar.product_features.digital_voting_platform.title'),
      kind: 'link' as const,
      href: '/app',
      description: t('navbar.product_features.digital_voting_platform.description'),
    },
    {
      title: t('navbar.product_features.sdk.title'),
      kind: 'link' as const,
      href: 'https://developer.vocdoni.io/sdk',
      target: '_blank',
      rel: 'noopener noreferrer',
      description: t('navbar.product_features.sdk.description'),
    },
    {
      title: t('navbar.product_features.custom_projects.title'),
      kind: 'booking' as const,
      triggerAriaLabel: 'Open custom project booking',
      description: t('navbar.product_features.custom_projects.description'),
    },
  ] satisfies ProductFeature[]

const buildFeaturedSolution = (t: (key: string) => string) => ({
  title: t('navbar.featured_solution.vocdoni_app.title'),
  description: t('navbar.featured_solution.vocdoni_app.description'),
  href: 'https://app.vocdoni.io',
  cta: t('navbar.featured_solution.vocdoni_app.cta'),
  badge: t('navbar.featured_solution.vocdoni_app.badge'),
})

const buildResourcesItems = (t: TFunction) => [
  {
    title: t('navbar.resources_items.learn.title', 'Learn'),
    href: '/learn',
    description: t('navbar.resources_items.learn.description', 'Guides to secure and verifiable online voting.'),
  },
  {
    title: t('navbar.resources_items.case_studies.title', 'Case studies'),
    href: '/case-studies',
    description: t('navbar.resources_items.case_studies.description', 'Real elections run with Vocdoni.'),
  },
  {
    title: t('navbar.resources_items.changelog.title', 'App changelog'),
    href: '/app/changelog',
    description: t('navbar.resources_items.changelog.description', 'All Vocdoni App releases and updates.'),
  },
  {
    title: t('navbar.resources_items.blog.title'),
    href: 'https://blog.vocdoni.io',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: t('navbar.resources_items.blog.description'),
  },
  {
    title: t('navbar.resources_items.docs.title'),
    href: 'https://developer.vocdoni.io',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: t('navbar.resources_items.docs.description'),
  },
]

const buildSolutionVerticals = (t: TFunction) => [
  { title: t('navbar.solution_links.associations', 'Associations & federations'), href: '/solutions/associations' },
  { title: t('navbar.solution_links.cooperatives', 'Cooperatives'), href: '/solutions/cooperatives' },
  {
    title: t('navbar.solution_links.professional_colleges', 'Professional colleges'),
    href: '/solutions/professional-colleges',
  },
  { title: t('navbar.solution_links.political_parties', 'Political parties'), href: '/solutions/political-parties' },
  { title: t('navbar.solution_links.municipalities', 'Municipalities'), href: '/solutions/municipalities' },
  { title: t('navbar.solution_links.companies_agm', 'Companies & AGMs'), href: '/solutions/companies-agm' },
]

export function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)

  const productFeatures = React.useMemo(() => buildProductFeatures(t), [t])
  const featuredSolution = React.useMemo(() => buildFeaturedSolution(t), [t])
  const resourcesItems = React.useMemo(() => buildResourcesItems(t), [t])
  const solutionVerticals = React.useMemo(() => buildSolutionVerticals(t), [t])

  return (
    <div className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4 cursor-none pointer-events-none'>
      <header className='cursor-default pointer-events-auto flex items-center justify-between gap-4 rounded-full border border-border/40 bg-background/80 px-4 py-2 shadow-sm backdrop-blur-md w-full max-w-[2000px] transition-all duration-300'>
        {/* Logo */}
        <div className='pointer-events'>
          <Link href='/' variant='unstyled' aria-label={t('navbar.logo_aria_label', 'Vocdoni - go to homepage')}>
            <VocdoniLogo minimal className='h-7 xl:hidden' aria-hidden='true' />
            <VocdoniLogo className='hidden xl:block h-8' aria-hidden='true' />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden xl:flex min-w-max'>
          <NavigationMenuList>
            {/* Solutions (formerly Product) */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navbar.solutions')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='w-[820px] p-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    {/* Column 1: Products */}
                    <div className='space-y-2'>
                      <p className='mb-3 px-2 text-sm text-muted-foreground font-medium'>
                        {t('navbar.solutions_header')}
                      </p>
                      <ul className='space-y-0.5'>
                        {productFeatures.map((item) => (
                          <li key={item.title}>
                            {item.kind === 'link' ? (
                              <NavigationMenuLink asChild>
                                <Link href={item.href} target={item.target} rel={item.rel} variant='navbarItem'>
                                  <div className='text-sm font-medium leading-none'>{item.title}</div>
                                  <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            ) : (
                              <CalBookingDialog
                                className='block w-full select-none space-y-1 rounded-md p-3 text-left leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground'
                                triggerAriaLabel={item.triggerAriaLabel}
                              >
                                <div className='text-sm font-medium leading-none'>{item.title}</div>
                                <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                  {item.description}
                                </p>
                              </CalBookingDialog>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: By organization type */}
                    <div className='space-y-2'>
                      <p className='mb-3 px-2 text-sm text-muted-foreground font-medium'>
                        {t('navbar.solutions_by_type_header', 'By organization type')}
                      </p>
                      <ul className='space-y-0.5'>
                        {solutionVerticals.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link href={item.href} variant='navbarItem'>
                                <div className='text-sm font-medium leading-none'>{item.title}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href='/solutions' variant='navbarItem'>
                              <div className='text-primary inline-flex items-center gap-1 text-sm font-medium leading-none'>
                                {t('navbar.view_all_solutions', 'View all solutions')}
                                <ArrowRight className='size-3.5' />
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3: Featured card with image */}
                    <div className='relative flex flex-col'>
                      <p className='mb-2 px-2 text-sm text-muted-foreground font-medium'>
                        {t('navbar.featured_solution.header')}
                      </p>
                      <Link href={featuredSolution.href} target='_blank' rel='noopener noreferrer' variant='card'>
                        <div className='relative h-full'>
                          {/* App highlight image */}
                          <img
                            src={appImage}
                            alt='Vocdoni App'
                            className='aspect-video w-full object-cover'
                            loading='lazy'
                          />
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

            <NavigationMenuItem>
              <Link
                href='https://davinci.vote'
                target='_blank'
                rel='noopener noreferrer'
                variant='unstyled'
                className={navigationMenuTriggerStyle()}
              >
                {t('navbar.technology')}
              </Link>
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
              <Link href='/about-us' variant='unstyled' className={navigationMenuTriggerStyle()}>
                {t('navbar.about')}
              </Link>
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
          <div className='xl:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-6 w-6' />
                  <span className='sr-only'>{t('navbar.toggle_menu', 'Toggle menu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-[300px] sm:w-[400px] p-0'>
                <div className='flex flex-col h-full bg-background'>
                  {/* Header inside Sheet */}
                  <div className='p-6 border-b'>
                    <VocdoniLogo aria-hidden='true' />
                  </div>

                  {/* Menu Items */}
                  <div className='flex-1 overflow-auto py-6 px-4'>
                    <Accordion type='single' collapsible className='w-full'>
                      {/* Solutions (mobile) */}
                      <AccordionItem value='product' className='border-border/40'>
                        <AccordionTrigger className='font-sans text-sm font-medium py-3 hover:text-primary hover:no-underline transition-colors'>
                          {t('navbar.solutions')}
                        </AccordionTrigger>
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
                                onClick={() => setIsOpen(false)}
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
                            {productFeatures.map((item) =>
                              item.kind === 'link' ? (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  target={item.target}
                                  rel={item.rel}
                                  variant='navbarMobile'
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              ) : (
                                <CalBookingDialog
                                  key={item.title}
                                  className='block py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground'
                                  triggerAriaLabel={item.triggerAriaLabel}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </CalBookingDialog>
                              )
                            )}

                            {/* By organization type */}
                            <p className='mt-3 pt-3 border-t border-border/40 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                              {t('navbar.solutions_by_type_header', 'By organization type')}
                            </p>
                            {solutionVerticals.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                variant='navbarMobile'
                                onClick={() => setIsOpen(false)}
                              >
                                {item.title}
                              </Link>
                            ))}
                            <Link
                              href='/solutions'
                              variant='navbarMobile'
                              className='text-primary font-medium'
                              onClick={() => setIsOpen(false)}
                            >
                              {t('navbar.view_all_solutions', 'View all solutions')}
                            </Link>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Resources (mobile) */}
                      <AccordionItem value='resources' className='border-border/40'>
                        <AccordionTrigger className='font-sans text-sm font-medium py-3 hover:text-primary hover:no-underline transition-colors'>
                          {t('navbar.resources')}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className='flex flex-col space-y-2 pl-4'>
                            {resourcesItems.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                target={item.target}
                                rel={item.rel}
                                variant='navbarMobile'
                                onClick={() => setIsOpen(false)}
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Static Links */}
                    <div className='flex flex-col'>
                      <Link href='/use-cases' variant='navbarStatic' onClick={() => setIsOpen(false)}>
                        {t('navbar.use_cases')}
                      </Link>
                      <Link href='/about-us' variant='navbarStatic' onClick={() => setIsOpen(false)}>
                        {t('navbar.about')}
                      </Link>
                      <Link
                        href='https://davinci.vote'
                        target='_blank'
                        rel='noopener noreferrer'
                        variant='navbarStatic'
                        onClick={() => setIsOpen(false)}
                      >
                        {t('navbar.technology')}
                      </Link>
                      <Link href='/contact' variant='navbarStatic' onClick={() => setIsOpen(false)}>
                        {t('navbar.contact')}
                      </Link>
                    </div>
                  </div>

                  {/* Footer App Button */}
                  <div className='p-6 border-t mt-auto'>
                    <Button asChild className='w-full rounded-full'>
                      <Link
                        href='https://app.vocdoni.io'
                        target='_blank'
                        rel='noopener noreferrer'
                        variant='unstyled'
                        onClick={() => setIsOpen(false)}
                      >
                        App
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Sign in button (hidden on mobile) */}
          <div className='hidden xl:block'>
            <Button asChild className='rounded-full px-6'>
              <Link href='https://app.vocdoni.io' target='_blank' rel='noopener noreferrer' variant='unstyled'>
                {t('navbar.app_button')}
              </Link>
            </Button>
          </div>
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
