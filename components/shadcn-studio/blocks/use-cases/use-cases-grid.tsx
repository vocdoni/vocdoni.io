import {
  ArrowRightIcon,
  BriefcaseIcon,
  Building2Icon,
  CodeIcon,
  LandmarkIcon,
  TrophyIcon,
  UsersIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
// Logo imports - real assets only, no emoji
import logoDecidim from '@/assets/images/decidim.webp'
import logoFcb from '@/assets/images/fcb.webp'
import logoErc from '@/assets/logos/erc.webp'
import logoAlhora from '@/assets/logos/logo_alhora_round.webp'
import logoArxivers from '@/assets/logos/logo_arxivers_colour.webp'
import logoAti from '@/assets/logos/logo_ati_colour.webp'
import logoBcn from '@/assets/logos/logo_bcn_bw.webp'
import logoBellpuig from '@/assets/logos/logo_bellpuig_colour.webp'
import logoBerga from '@/assets/logos/logo_berga_bw.webp'
import logoBisbal from '@/assets/logos/logo_bisbal_round.webp'
import logoBloock from '@/assets/logos/logo_bloock_colour.webp'
import logoCec from '@/assets/logos/logo_cec_colour.webp'
import logoCoib from '@/assets/logos/logo_coib_round.webp'
import logoDemocracy5 from '@/assets/logos/logo_democracy5_colour.webp'
import logoEic from '@/assets/logos/logo_eic_colour.webp'
import logoIcoes from '@/assets/logos/logo_icoes_colour.webp'
import logoOmnium from '@/assets/logos/logo_omnium_colour.webp'
import logoNewBelarus from '@/assets/logos/new_belarus.webp'

type LogoEntry = { src: string; alt: string }

const UseCasesGrid = () => {
  const { t } = useTranslation()
  const useCases = [
    {
      key: 'city_councils',
      icon: LandmarkIcon,
      logos: [
        { src: logoBellpuig, alt: 'Bellpuig' },
        { src: logoBerga, alt: 'Berga' },
        { src: logoBisbal, alt: "Bisbal de l'Empordà" },
        { src: logoBcn, alt: 'Barcelona' },
      ] as LogoEntry[],
      caseStudy: { href: 'https://blog.vocdoni.io/referendum-bellpuig/' },
      title: t('use_cases_page.grid.items.city_councils.title'),
      description: t('use_cases_page.grid.items.city_councils.description'),
      features: t('use_cases_page.grid.items.city_councils.features', { returnObjects: true }) as string[],
      storyOrg: t('use_cases_page.success_stories.items.bellpuig.org'),
      storyStat: t('use_cases_page.success_stories.items.bellpuig.stats.0.value', { defaultValue: '' }),
      storyImpact: t('use_cases_page.success_stories.items.bellpuig.impact'),
      storyCtaLabel: t('use_cases_page.success_stories.items.bellpuig.cta_label'),
    },
    {
      key: 'associations',
      icon: UsersIcon,
      logos: [
        { src: logoNewBelarus, alt: 'New Belarus' },
        { src: logoOmnium, alt: 'Òmnium Cultural' },
        { src: logoArxivers, alt: "Associació de Professionals de l'Arxivística" },
      ] as LogoEntry[],
      caseStudy: { href: '#success-stories' },
      title: t('use_cases_page.grid.items.associations.title'),
      description: t('use_cases_page.grid.items.associations.description'),
      features: t('use_cases_page.grid.items.associations.features', { returnObjects: true }) as string[],
      storyOrg: t('use_cases_page.success_stories.items.new_belarus.org'),
      storyStat: t('use_cases_page.success_stories.items.new_belarus.stats.0.value', { defaultValue: '' }),
      storyImpact: t('use_cases_page.success_stories.items.new_belarus.impact'),
      storyCtaLabel: t('use_cases_page.success_stories.items.new_belarus.cta_label'),
    },
    {
      key: 'sports_clubs',
      icon: TrophyIcon,
      logos: [
        { src: logoFcb, alt: 'FC Barcelona' },
        { src: logoCec, alt: 'Centre Excursionista de Catalunya' },
      ] as LogoEntry[],
      title: t('use_cases_page.grid.items.sports_clubs.title'),
      description: t('use_cases_page.grid.items.sports_clubs.description'),
      features: t('use_cases_page.grid.items.sports_clubs.features', { returnObjects: true }) as string[],
      storyOrg: t('use_cases_page.success_stories.items.erc.org'),
      storyStat: t('use_cases_page.success_stories.items.erc.stats.0.value', { defaultValue: '' }),
      storyImpact: t('use_cases_page.success_stories.items.erc.impact'),
    },
    {
      key: 'professional_bodies',
      icon: BriefcaseIcon,
      logos: [
        { src: logoCoib, alt: 'COIB' },
        { src: logoEic, alt: 'Enginyers Industrials' },
        { src: logoIcoes, alt: 'ICOES' },
        { src: logoAti, alt: 'Associazione Termotecnica Italiana' },
      ] as LogoEntry[],
      caseStudy: {
        href: 'https://blog.vocdoni.io/how-coib-a-professional-body-of-nurses-ran-its-2025-annual-general-meeting-vote-online-securely-and-with-instant-results/',
      },
      title: t('use_cases_page.grid.items.professional_bodies.title'),
      description: t('use_cases_page.grid.items.professional_bodies.description'),
      features: t('use_cases_page.grid.items.professional_bodies.features', { returnObjects: true }) as string[],
      storyOrg: t('use_cases_page.success_stories.items.coib.org'),
      storyStat: t('use_cases_page.success_stories.items.coib.stats.0.value', { defaultValue: '' }),
      storyImpact: t('use_cases_page.success_stories.items.coib.impact'),
      storyCtaLabel: t('use_cases_page.success_stories.items.coib.cta_label'),
    },
    {
      key: 'political_parties',
      icon: Building2Icon,
      logos: [
        { src: logoErc, alt: 'ERC' },
        { src: logoAlhora, alt: 'Alhora' },
      ] as LogoEntry[],
      caseStudy: {
        href: 'https://blog.vocdoni.io/esquerra-republicana-political-party-membership-vote-with-vocdoni-77-12-turnout-in-a-decisive-political-decision/',
      },
      title: t('use_cases_page.grid.items.political_parties.title'),
      description: t('use_cases_page.grid.items.political_parties.description'),
      features: t('use_cases_page.grid.items.political_parties.features', { returnObjects: true }) as string[],
      storyOrg: t('use_cases_page.success_stories.items.erc.org'),
      storyStat: t('use_cases_page.success_stories.items.erc.stats.0.value', { defaultValue: '' }),
      storyImpact: t('use_cases_page.success_stories.items.erc.impact'),
      storyCtaLabel: t('use_cases_page.success_stories.items.erc.cta_label'),
    },
    {
      key: 'integrators',
      icon: CodeIcon,
      logos: [
        { src: logoDecidim, alt: 'Decidim' },
        { src: logoBloock, alt: 'BLOOCK' },
        { src: logoDemocracy5, alt: 'Democracy OS' },
      ] as LogoEntry[],
      caseStudy: { href: 'https://platform.vocdoni.io' },
      title: t('use_cases_page.grid.items.integrators.title'),
      description: t('use_cases_page.grid.items.integrators.description'),
      features: t('use_cases_page.grid.items.integrators.features', { returnObjects: true }) as string[],
      storyOrg: t('use_cases_page.success_stories.items.decidim.org'),
      storyStat: t('use_cases_page.success_stories.items.decidim.stats.0.value', { defaultValue: '' }),
      storyImpact: t('use_cases_page.success_stories.items.decidim.impact'),
      storyCtaLabel: t('use_cases_page.success_stories.items.decidim.cta_label'),
    },
  ]

  return (
    <section id='use-cases' className='bg-muted/50 py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-20'>
          <p className='text-primary text-sm font-medium uppercase tracking-wide'>{t('use_cases_page.grid.eyebrow')}</p>
          <h2 className='text-3xl font-bold sm:text-4xl lg:text-5xl'>{t('use_cases_page.grid.title')}</h2>
          <p className='text-muted-foreground mx-auto max-w-3xl text-lg sm:text-xl'>
            {t('use_cases_page.grid.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {useCases.map((useCase) => {
            const Icon = useCase.icon
            return (
              <Card key={useCase.key} className='group flex flex-col transition-shadow duration-300 hover:shadow-lg'>
                <CardContent className='flex flex-grow flex-col p-6'>
                  {/* Icon & title */}
                  <div className='mb-6 space-y-4'>
                    <div className='bg-primary/10 text-primary inline-flex size-12 items-center justify-center rounded-lg'>
                      <Icon className='size-6' />
                    </div>
                    <div>
                      <CardTitle className='mb-2 text-xl font-semibold'>{useCase.title}</CardTitle>
                      <CardDescription className='text-base'>{useCase.description}</CardDescription>
                    </div>
                  </div>

                  {/* Key use cases */}
                  <div className='mb-6 space-y-2'>
                    <p className='text-sm font-semibold'>{t('use_cases_page.grid.common_uses_label')}</p>
                    <ul className='space-y-1.5'>
                      {useCase.features.map((feature, idx) => (
                        <li key={idx} className='text-muted-foreground flex items-start text-sm'>
                          <span className='text-primary mr-2 mt-0.5' aria-hidden='true'>
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Case study result - pushes to bottom */}
                  <div className='mt-auto'>
                    <div className='bg-muted/60 mb-4 rounded-lg border p-3'>
                      <p className='text-muted-foreground mb-0.5 text-xs font-medium uppercase tracking-wide'>
                        {t('use_cases_page.grid.impact_label', 'Impact')}
                      </p>
                      <p className='text-foreground text-sm font-semibold'>{useCase.storyOrg}</p>
                      <p className='text-primary text-sm font-bold'>{useCase.storyStat}</p>
                      <p className='text-muted-foreground mt-1 text-xs'>{useCase.storyImpact}</p>
                    </div>

                    {/* Real logos */}
                    {useCase.logos.length > 0 && (
                      <div className='mb-4 flex flex-col gap-3 border-t pt-4'>
                        <p className='text-muted-foreground text-xs'>{t('use_cases_page.grid.organizations_label')}</p>
                        <div className='flex flex-wrap gap-3'>
                          {useCase.logos.map((logo) => (
                            <img
                              key={logo.alt}
                              src={logo.src}
                              alt={logo.alt}
                              className='h-6 w-auto max-w-[80px] object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0'
                              width={80}
                              height={24}
                              loading='lazy'
                              decoding='async'
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {useCase.caseStudy && useCase.storyCtaLabel && (
                      <Button
                        variant='ghost'
                        className='text-primary hover:text-primary w-full justify-center hover:bg-transparent'
                        asChild
                      >
                        <Link href={useCase.caseStudy.href} variant='inlineIcon'>
                          {useCase.storyCtaLabel}
                          <ArrowRightIcon className='size-4' />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mid-page CTA - post-grid conversion moment */}
        <div className='mt-16 text-center'>
          <p className='text-muted-foreground mb-4 text-base'>
            {t('use_cases_page.grid_cta.trust_line', 'Organizations worldwide trust Vocdoni')}
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button size='lg' className='has-[>svg]:px-6' asChild>
              <Link href='https://app.vocdoni.io' variant='inlineIcon'>
                {t('use_cases_page.hero.cta_primary')}
                <ArrowRightIcon className='size-5' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <Link href='https://vocdoni.io/contact' variant='unstyled'>
                {t('use_cases_page.bottom_cta.cta_secondary')}
              </Link>
            </Button>
          </div>
          <p className='text-muted-foreground mt-3 text-sm'>{t('use_cases_page.bottom_cta.trust_footer')}</p>
        </div>
      </div>
    </section>
  )
}

export default UseCasesGrid
