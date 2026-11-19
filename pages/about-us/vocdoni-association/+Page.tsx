import {
  ArrowRight,
  Code2,
  Globe,
  GitBranch,
  Hourglass,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AssociationEcosystem } from '@/components/about-us/AssociationEcosystem'
import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { GitHubIcon } from '@/components/ui/brand-icons'
import { MotionPreset } from '@/components/ui/motion-preset'
import { DEVELOPERS_GITHUB_URL, DEVELOPERS_PROTOCOL_PAPER_URL, DEVELOPERS_PROTOCOL_URL } from '@/lib/developers'

type Item = { icon: LucideIcon; title: string; description: string }

const ENTRANCE = { direction: 'up', offset: 12 } as const

/** Icon tile plus title and description, the card used by the principle and safeguard grids. */
const ItemCard = ({ item, index }: { item: Item; index: number }) => (
  <MotionPreset
    component='li'
    fade
    slide={ENTRANCE}
    delay={index * 0.08}
    transition={{ duration: 0.4 }}
    inView
    inViewOnce
    className='flex flex-col gap-3 rounded-card border bg-background p-6 shadow-sm sm:p-8'
  >
    <span className='bg-primary/10 text-primary inline-flex size-11 items-center justify-center rounded-lg'>
      <item.icon className='size-5' aria-hidden='true' />
    </span>
    <h3 className='text-lg leading-snug font-semibold text-balance'>{item.title}</h3>
    <p className='text-muted-foreground text-sm leading-relaxed'>{item.description}</p>
  </MotionPreset>
)

/**
 * The Vocdoni Association: the Swiss non-profit behind the open protocol, and how its role differs
 * from the commercial products and services built on top. Institutional claims stay within what
 * the about page already states; anything about governance, funding or audits needs a source first.
 */
export default function VocdoniAssociationPage() {
  const { t } = useTranslation()

  const principles: Item[] = [
    {
      icon: Code2,
      title: t('about_us.association.why.cards.open.title', 'Open by design'),
      description: t(
        'about_us.association.why.cards.open.description',
        'The protocol and its open-source foundations can be inspected, studied, and built upon, enabling transparency and independent scrutiny.'
      ),
    },
    {
      icon: ScanSearch,
      title: t('about_us.association.why.cards.verification.title', 'Trust through verification'),
      description: t(
        'about_us.association.why.cards.verification.description',
        'Trust should be supported by verifiable technical properties and transparent processes, not solely by promises made by a service provider.'
      ),
    },
    {
      icon: Globe,
      title: t('about_us.association.why.cards.everyone.title', 'Built for everyone'),
      description: t(
        'about_us.association.why.cards.everyone.description',
        'Secure digital voting infrastructure should be accessible to organizations and communities of all sizes, regardless of their location or financial resources.'
      ),
    },
  ]

  const safeguards: Item[] = [
    {
      icon: ShieldCheck,
      title: t('about_us.association.safeguards.cards.integrity.title', 'Protocol integrity'),
      description: t(
        'about_us.association.safeguards.cards.integrity.description',
        "Keeping the protocol's core design and technical foundations consistent, reliable, and sound."
      ),
    },
    {
      icon: GitBranch,
      title: t('about_us.association.safeguards.cards.open_source.title', 'Open-source development'),
      description: t(
        'about_us.association.safeguards.cards.open_source.description',
        'Supporting the ongoing development of the open-source code, so it stays transparent, collaborative, and open to independent technical scrutiny.'
      ),
    },
    {
      icon: LockKeyhole,
      title: t('about_us.association.safeguards.cards.privacy.title', 'Privacy and security'),
      description: t(
        'about_us.association.safeguards.cards.privacy.description',
        'Preserving privacy and security as fundamental design principles, including ballot secrecy, resistance to censorship and undue control, and the integrity of the voting process.'
      ),
    },
    {
      icon: Hourglass,
      title: t('about_us.association.safeguards.cards.continuity.title', 'Long-term continuity'),
      description: t(
        'about_us.association.safeguards.cards.continuity.description',
        "Supporting the protocol's long-term evolution so it can continue serving communities, regardless of which organizations build applications and services on top of it."
      ),
    },
  ]

  const roles = [
    {
      id: 'association',
      title: t('about_us.association.mission.roles.association.title', 'The Vocdoni Association'),
      items: [
        t(
          'about_us.association.mission.roles.association.items.openness',
          'Safeguards the openness and integrity of the protocol'
        ),
        t('about_us.association.mission.roles.association.items.open_source', 'Supports its open-source development'),
        t(
          'about_us.association.mission.roles.association.items.purpose',
          'Keeps the protocol aligned with its public-interest purpose'
        ),
      ],
    },
    {
      id: 'ecosystem',
      title: t('about_us.association.mission.roles.ecosystem.title', 'Commercial providers'),
      items: [
        t(
          'about_us.association.mission.roles.ecosystem.items.products',
          'Build products and applications on the protocol'
        ),
        t('about_us.association.mission.roles.ecosystem.items.services', 'Offer integrations and managed services'),
        t(
          'about_us.association.mission.roles.ecosystem.items.support',
          'Provide professional support to the organizations that run votes'
        ),
      ],
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className='pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24'>
        <Container className='max-w-4xl'>
          <MotionPreset fade slide={ENTRANCE} transition={{ duration: 0.45 }}>
            <nav aria-label={t('about_us.association.breadcrumb_label', 'Breadcrumb')}>
              <Eyebrow>
                <Link href='/about-us' className='hover:text-foreground'>
                  {t('about_us.association.breadcrumb_parent', 'About us')}
                </Link>
                <span aria-hidden='true'>/</span>
                <span aria-current='page'>{t('about_us.association.breadcrumb_current', 'Vocdoni Association')}</span>
              </Eyebrow>
            </nav>
          </MotionPreset>
          <MotionPreset
            component='h1'
            className='mt-6 text-4xl text-balance sm:text-5xl lg:text-6xl'
            fade
            slide={ENTRANCE}
            delay={0.08}
            transition={{ duration: 0.45 }}
          >
            {t('about_us.association.hero.title', 'Safeguarding our open voting protocol')}
          </MotionPreset>
          <MotionPreset fade slide={ENTRANCE} delay={0.16} transition={{ duration: 0.45 }} className='mt-8 space-y-4'>
            <p className='text-muted-foreground max-w-[65ch] text-lg leading-relaxed sm:text-xl'>
              {t(
                'about_us.association.hero.intro',
                'The Vocdoni Association is a non-profit organization based in Switzerland, dedicated to safeguarding the integrity, openness, and long-term development of the Vocdoni voting protocol.'
              )}
            </p>
            <p className='text-muted-foreground max-w-[65ch] text-lg leading-relaxed sm:text-xl'>
              {t(
                'about_us.association.hero.mission',
                'Our mission is to ensure that our protocol remains open, secure, private, and verifiable, providing shared infrastructure for digital voting that serves the public interest.'
              )}
            </p>
          </MotionPreset>
          <MotionPreset fade slide={ENTRANCE} delay={0.24} transition={{ duration: 0.45 }} className='mt-10'>
            <div className='flex flex-col items-stretch gap-3 sm:flex-row sm:items-center'>
              <Button asChild size='lg' className='group w-full sm:w-auto'>
                <Link href={DEVELOPERS_PROTOCOL_URL} variant='inlineIcon' ctaId='association_hero_protocol'>
                  {t('about_us.association.cta.protocol', 'Explore DAVINCI')}
                  <ArrowRight
                    className='transition-transform duration-150 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline' className='w-full sm:w-auto'>
                <Link href={DEVELOPERS_GITHUB_URL} variant='inlineIcon' ctaId='association_hero_github'>
                  <GitHubIcon className='size-4' aria-hidden='true' />
                  {t('about_us.association.cta.code', 'Explore the open-source code')}
                </Link>
              </Button>
            </div>
          </MotionPreset>
        </Container>
      </section>

      {/* Why the Association exists */}
      <Section className='bg-muted/50'>
        <Container className='max-w-5xl'>
          <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
            <SectionHeader
              align='left'
              size='section'
              eyebrow={t('about_us.association.why.eyebrow', 'Why the Association exists')}
              title={t('about_us.association.why.title', 'Technology for the common good')}
            />
            <div className='text-muted-foreground space-y-4 text-lg leading-relaxed'>
              <p>
                {t(
                  'about_us.association.why.p1',
                  'Democratic participation depends on the ability to make collective decisions that people can trust.'
                )}
              </p>
              <p>
                {t(
                  'about_us.association.why.p2',
                  'Digital voting can make participation more accessible, but only if the underlying infrastructure is transparent, secure, and independently verifiable.'
                )}
              </p>
              <p>
                {t(
                  'about_us.association.why.p3',
                  'The Vocdoni Association exists to protect those foundations. As a non-profit, it preserves the protocol as an open digital commons: shared infrastructure that anyone can use, inspect, and improve.'
                )}
              </p>
              <p>
                {t(
                  'about_us.association.why.p4',
                  'That means developing it in the public interest, rather than treating it as a proprietary asset controlled by a single company.'
                )}
              </p>
            </div>
          </div>
          <ul className='mt-12 grid gap-4 sm:mt-16 md:grid-cols-3'>
            {principles.map((item, index) => (
              <ItemCard key={item.title} item={item} index={index} />
            ))}
          </ul>
        </Container>
      </Section>

      {/* What the Association safeguards */}
      <Section>
        <Container className='max-w-5xl'>
          <SectionHeader
            size='section'
            eyebrow={t('about_us.association.safeguards.eyebrow', 'Areas of responsibility')}
            title={t('about_us.association.safeguards.title', 'Protecting the foundations of trustworthy voting')}
            lede={t(
              'about_us.association.safeguards.intro',
              'An open protocol is more than published code. It needs ongoing care, responsible development, and a lasting commitment to the principles that make it trustworthy.'
            )}
          />
          <ul className='mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2'>
            {safeguards.map((item, index) => (
              <ItemCard key={item.title} item={item} index={index} />
            ))}
          </ul>
          <p className='text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-sm'>
            {t(
              'about_us.association.safeguards.note',
              'These are the areas of responsibility the Association works on. Each organization or provider running the protocol remains responsible for its own deployment.'
            )}
          </p>
        </Container>
      </Section>

      {/* An open protocol, a shared ecosystem */}
      <Section className='bg-muted/50'>
        <Container className='max-w-5xl'>
          <SectionHeader
            size='section'
            eyebrow={t('about_us.association.ecosystem.eyebrow', 'An open protocol, a shared ecosystem')}
            title={t('about_us.association.ecosystem.title', 'One protocol. Many possibilities.')}
          />
          <div className='text-muted-foreground mx-auto mt-6 max-w-2xl space-y-4 text-center text-lg leading-relaxed'>
            <p>
              {t(
                'about_us.association.ecosystem.p1',
                'Vocdoni is designed as an open protocol, not a closed voting product. The next generation of the protocol, DAVINCI, builds on this vision with a publicly documented design and technical specifications.'
              )}
            </p>
            <p>
              {t(
                'about_us.association.ecosystem.p2',
                'This makes it possible for different organizations, developers, and service providers to build applications and integrations that meet their own needs while drawing on shared technical foundations.'
              )}
            </p>
            <p>
              {t(
                'about_us.association.ecosystem.p3',
                'The Association looks after the openness and integrity of those foundations, so the ecosystem can keep growing on solid ground.'
              )}
            </p>
          </div>
          <div className='mt-12 sm:mt-16'>
            <AssociationEcosystem />
          </div>
        </Container>
      </Section>

      {/* Non-profit mission, sustainable ecosystem */}
      <Section>
        <Container className='max-w-5xl'>
          <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
            <SectionHeader
              align='left'
              size='section'
              eyebrow={t('about_us.association.mission.eyebrow', 'Two complementary roles')}
              title={t('about_us.association.mission.title', 'A non-profit mission, an open ecosystem')}
            />
            <div className='text-muted-foreground space-y-4 text-lg leading-relaxed'>
              <p>
                {t(
                  'about_us.association.mission.p1',
                  "The Association's non-profit nature reflects a fundamental commitment: the long-term integrity and openness of the protocol must remain central to its development."
                )}
              </p>
              <p>
                {t(
                  'about_us.association.mission.p2',
                  'A sustainable ecosystem includes commercial products, professional services, and integrations that bring the technology to real-world users. They support adoption and continued development, while the protocol remains an open foundation that anyone can inspect, use, and build on.'
                )}
              </p>
              <p>
                {t(
                  'about_us.association.mission.p3',
                  'The Association exists to keep that distinction clear and the protocol true to its public-interest purpose.'
                )}
              </p>
            </div>
          </div>
          <div className='mt-12 grid gap-4 sm:mt-16 md:grid-cols-2'>
            {roles.map((role) => (
              <MotionPreset
                key={role.id}
                fade
                slide={ENTRANCE}
                transition={{ duration: 0.4 }}
                inView
                inViewOnce
                className='rounded-card border border-primary/10 bg-primary/5 p-6 sm:p-8'
              >
                <h3 className='text-lg leading-snug font-semibold text-balance'>{role.title}</h3>
                <ul className='text-muted-foreground mt-4 space-y-3 text-base leading-relaxed'>
                  {role.items.map((item) => (
                    <li key={item} className='flex gap-3'>
                      <span aria-hidden='true' className='bg-primary mt-2.5 size-1.5 shrink-0 rounded-full' />
                      {item}
                    </li>
                  ))}
                </ul>
              </MotionPreset>
            ))}
          </div>
          <p className='text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-sm'>
            {t(
              'about_us.association.mission.roles.note',
              'The two roles complement each other. Using the protocol, reading its code, or building on it does not require buying services from any particular company.'
            )}
          </p>
        </Container>
      </Section>

      {/* Looking ahead */}
      <Section className='bg-muted/50'>
        <Container className='max-w-3xl text-center'>
          <SectionHeader
            size='section'
            eyebrow={t('about_us.association.ahead.eyebrow', 'Looking ahead')}
            title={t('about_us.association.ahead.title', 'An open foundation for the future of collective decisions')}
          />
          <div className='text-muted-foreground mt-6 space-y-4 text-lg leading-relaxed'>
            <p>
              {t(
                'about_us.association.ahead.p1',
                'Digital voting infrastructure should not be a black box that communities must simply trust. It should be open to scrutiny, designed to protect privacy, and built so that its integrity can be verified. The Vocdoni Association is committed to these principles.'
              )}
            </p>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className='bg-surface-dark text-surface-dark-foreground'>
        <Container className='flex max-w-3xl flex-col items-center text-center'>
          <h2 className='text-3xl text-balance sm:text-4xl lg:text-5xl'>
            {t('about_us.association.closing.title', 'Help build an open voting ecosystem')}
          </h2>
          <p className='text-surface-dark-foreground/70 mt-6 text-lg text-pretty'>
            {t(
              'about_us.association.closing.description',
              'Read the protocol paper, examine the code, and discover how open digital voting infrastructure can support more trustworthy collective decisions.'
            )}
          </p>
          <div className='mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center'>
            <Button asChild size='lg' className='group w-full sm:w-auto'>
              <Link href={DEVELOPERS_PROTOCOL_PAPER_URL} variant='inlineIcon' ctaId='association_closing_paper'>
                {t('about_us.association.cta.paper', 'Read the protocol paper')}
                <ArrowRight
                  className='transition-transform duration-150 group-hover:translate-x-0.5'
                  aria-hidden='true'
                />
              </Link>
            </Button>
            <Link
              href={DEVELOPERS_GITHUB_URL}
              variant='inlineIcon'
              ctaId='association_closing_github'
              className='text-surface-dark-foreground/70 hover:text-surface-dark-foreground focus-visible:ring-surface-dark-foreground inline-flex min-h-11 justify-center rounded-md px-3 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none'
            >
              <GitHubIcon className='size-4' aria-hidden='true' />
              {t('about_us.association.cta.github', 'View the source code on GitHub')}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
