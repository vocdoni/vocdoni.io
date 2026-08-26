import type { TFunction } from 'i18next'
import { ArrowRight } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { CalBookingDialog } from '@/components/CalBookingDialog'
import { Link } from '@/components/Link'
import { DEVELOPERS_DASHBOARD_URL, isDevelopersPath } from '@/lib/developers'
import { usePageContext } from 'vike-react/usePageContext'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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
import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
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

const buildProductFeatures = (t: (key: string) => string): ProductFeature[] => [
  {
    title: t('navbar.product_features.digital_voting_platform.title'),
    kind: 'link',
    href: '/app',
    description: t('navbar.product_features.digital_voting_platform.description'),
  },
  {
    title: t('navbar.product_features.sdk.title'),
    kind: 'link',
    href: '/developers',
    description: t('navbar.product_features.sdk.description'),
  },
  {
    title: t('navbar.product_features.custom_projects.title'),
    kind: 'booking',
    triggerAriaLabel: 'Open custom project booking',
    description: t('navbar.product_features.custom_projects.description'),
  },
]

type ResourceItem = { title: string; href: string; description: string; target?: string; rel?: string }

const buildResourcesItems = (t: TFunction): ResourceItem[] => [
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
    title: t('navbar.resources_items.blog.title'),
    href: '/blog',
    description: t('navbar.resources_items.blog.description'),
  },
  {
    title: t('navbar.resources_items.docs.title', 'Documentation'),
    href: '/developers',
    description: t(
      'navbar.resources_items.docs.description',
      'API reference and guides to integrate Vocdoni into your software.'
    ),
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

/* Two-part dropdown panel: a tinted intro column on the left introduces the
   group, the right side holds the link items. */
const MenuPanel = ({
  introTitle,
  introDescription,
  children,
}: {
  introTitle: string
  introDescription: string
  children: React.ReactNode
}) => (
  <div className='flex'>
    <div className='flex w-[264px] shrink-0 flex-col gap-3 bg-secondary px-6 py-7'>
      <p className='font-serif text-3xl leading-[1.05] tracking-[-0.01em] text-foreground'>{introTitle}</p>
      <p className='text-sm leading-snug text-muted-foreground'>{introDescription}</p>
    </div>
    <div className='flex min-w-[316px] flex-col p-3.5'>{children}</div>
  </div>
)

/* Small uppercase group label inside a dropdown panel. */
const PanelLabel = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <p className={`px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-faint ${className ?? ''}`}>
    {children}
  </p>
)

/* Thin divider between top-level nav entries. */
const NavDivider = () => <li aria-hidden='true' className='h-3 w-px shrink-0 self-center bg-foreground/15' />

export function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const reducedMotion = useReducedMotion()

  // Inside the developers section the primary CTA points integrators to the API
  // Dashboard instead of the voting app.
  const pageContext = usePageContext() as any
  const inDevelopers = isDevelopersPath(pageContext.urlLogical)
  const ctaHref = inDevelopers ? DEVELOPERS_DASHBOARD_URL : APP_URL
  const ctaLabel = inDevelopers ? t('navbar.dashboard_button', 'API Dashboard') : t('navbar.app_button')

  const productFeatures = React.useMemo(() => buildProductFeatures(t), [t])
  const resourcesItems = React.useMemo(() => buildResourcesItems(t), [t])
  const solutionVerticals = React.useMemo(() => buildSolutionVerticals(t), [t])

  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-[14px]'>
      <div className='mx-auto flex w-full max-w-[1408px] items-center justify-between gap-4 px-4 py-2 sm:px-6'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link href='/' variant='unstyled' aria-label={t('navbar.logo_aria_label', 'Vocdoni - go to homepage')}>
            <VocdoniLogo minimal className='h-7 xl:hidden' aria-hidden='true' />
            <VocdoniLogo className='hidden xl:block h-7' aria-hidden='true' />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden xl:flex min-w-max'>
          <NavigationMenuList className='gap-1'>
            {/* Solutions */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navbar.solutions')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuPanel
                  introTitle={t('navbar.solutions_intro.title', 'Voting that fits your organization')}
                  introDescription={t(
                    'navbar.solutions_intro.description',
                    'Secure, verifiable digital voting for every kind of organization, from associations to institutions.'
                  )}
                >
                  <div className='flex gap-3'>
                    {/* Column 1: Products */}
                    <div className='flex w-[250px] flex-col'>
                      <PanelLabel>{t('navbar.solutions_header')}</PanelLabel>
                      <ul className='flex flex-col gap-0.5'>
                        {productFeatures.map((item) => (
                          <li key={item.title}>
                            {item.kind === 'link' ? (
                              <NavigationMenuLink asChild>
                                <Link href={item.href} target={item.target} rel={item.rel} variant='navbarItem'>
                                  <div className='text-[15px] font-medium leading-none'>{item.title}</div>
                                  <p className='line-clamp-2 text-[13px] font-normal leading-snug text-muted-foreground'>
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            ) : (
                              <CalBookingDialog
                                className='block w-full select-none space-y-1 rounded-[10px] px-3 py-2 text-left leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground'
                                triggerAriaLabel={item.triggerAriaLabel}
                              >
                                <div className='text-[15px] font-medium leading-none'>{item.title}</div>
                                <p className='line-clamp-2 text-[13px] leading-snug text-muted-foreground'>
                                  {item.description}
                                </p>
                              </CalBookingDialog>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: By organization type */}
                    <div className='flex w-[260px] flex-col'>
                      <PanelLabel>{t('navbar.solutions_by_type_header', 'By organization type')}</PanelLabel>
                      <ul className='flex flex-col gap-0.5'>
                        {solutionVerticals.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link href={item.href} variant='navbarItem'>
                                <div className='text-[15px] font-medium leading-none'>{item.title}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className='mt-1.5 border-t border-border pt-1'>
                    <NavigationMenuLink asChild>
                      <Link href='/solutions' variant='navbarItem'>
                        <div className='inline-flex items-center gap-1.5 text-[15px] font-semibold leading-none'>
                          {t('navbar.view_all_solutions', 'View all solutions')}
                          <ArrowRight className='size-3.5' />
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </MenuPanel>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavDivider />

            {/* Use Cases */}
            <NavigationMenuItem>
              <Link href='/use-cases' variant='unstyled' className={navigationMenuTriggerStyle()}>
                {t('navbar.use_cases')}
              </Link>
            </NavigationMenuItem>

            <NavDivider />

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

            <NavDivider />

            {/* Resources */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navbar.resources')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuPanel
                  introTitle={t('navbar.resources_intro.title', 'Learn and build')}
                  introDescription={t(
                    'navbar.resources_intro.description',
                    'Guides, real-world case studies, and documentation to get the most out of Vocdoni.'
                  )}
                >
                  <ul className='flex w-[290px] flex-col gap-0.5'>
                    {resourcesItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        target={item.target}
                        rel={item.rel}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </MenuPanel>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavDivider />

            {/* About Us */}
            <NavigationMenuItem>
              <Link href='/about-us' variant='unstyled' className={navigationMenuTriggerStyle()}>
                {t('navbar.about')}
              </Link>
            </NavigationMenuItem>

            <NavDivider />

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
                <Button variant='ghost' size='icon' aria-expanded={isOpen}>
                  <span className='relative flex h-6 w-6 items-center justify-center'>
                    {(['menu', 'close'] as const).map((key) => {
                      const isClose = key === 'close'
                      const active = isClose === isOpen
                      return (
                        <motion.span
                          key={key}
                          className='absolute inset-0 flex items-center justify-center'
                          initial={false}
                          animate={
                            reducedMotion
                              ? { opacity: active ? 1 : 0 }
                              : {
                                  opacity: active ? 1 : 0,
                                  scale: active ? 1 : 0.25,
                                  filter: active ? 'blur(0px)' : 'blur(4px)',
                                }
                          }
                          transition={reducedMotion ? { duration: 0 } : { type: 'spring', duration: 0.3, bounce: 0 }}
                          aria-hidden='true'
                        >
                          {isClose ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                        </motion.span>
                      )
                    })}
                  </span>
                  <span className='sr-only'>{t('navbar.toggle_menu', 'Toggle menu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-[300px] sm:w-[400px] p-0'>
                <div className='flex flex-col h-full bg-background'>
                  {/* Header inside Sheet */}
                  <div className='p-6 border-b border-border'>
                    <VocdoniLogo aria-hidden='true' />
                  </div>

                  {/* Menu Items */}
                  <div className='flex-1 overflow-auto py-6 px-4'>
                    <Accordion type='single' collapsible className='w-full'>
                      {/* Solutions (mobile) */}
                      <AccordionItem value='product' className='border-border/40'>
                        <AccordionTrigger className='font-sans text-base font-medium py-3 hover:no-underline'>
                          {t('navbar.solutions')}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className='flex flex-col space-y-1 pl-2'>
                            <p className='px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-faint'>
                              {t('navbar.solutions_header')}
                            </p>
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
                                  className='block rounded-[10px] px-3 py-2.5 text-left text-base transition-colors hover:bg-accent'
                                  triggerAriaLabel={item.triggerAriaLabel}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </CalBookingDialog>
                              )
                            )}

                            {/* By organization type */}
                            <p className='px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-faint'>
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
                              className='font-semibold'
                              onClick={() => setIsOpen(false)}
                            >
                              {t('navbar.view_all_solutions', 'View all solutions')}
                            </Link>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Resources (mobile) */}
                      <AccordionItem value='resources' className='border-border/40'>
                        <AccordionTrigger className='font-sans text-base font-medium py-3 hover:no-underline'>
                          {t('navbar.resources')}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className='flex flex-col space-y-1 pl-2'>
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
                  <div className='p-6 border-t border-border mt-auto'>
                    <Button asChild variant='dark' className='w-full'>
                      <Link
                        href={ctaHref}
                        target='_blank'
                        rel='noopener noreferrer'
                        variant='unstyled'
                        cta='navbar_mobile'
                        onClick={() => setIsOpen(false)}
                      >
                        {ctaLabel}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Primary CTA (hidden on mobile) */}
          <div className='hidden xl:block'>
            <Button asChild variant='dark' size='sm' className='px-5'>
              <Link href={ctaHref} target='_blank' rel='noopener noreferrer' variant='unstyled' cta='navbar'>
                {ctaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<typeof Link>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link ref={ref} variant='navbarItem' className={className} {...props}>
            <div className='text-[15px] font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-[13px] font-normal leading-snug text-muted-foreground'>{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
