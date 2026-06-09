import AvatarGroupTooltip from '@/components/shadcn-studio/avatar/avatar-16'
import AboutUs from '@/components/shadcn-studio/blocks/about-us-page-03/about-us-page-03'
import { MotionPreset } from '@/components/ui/motion-preset'
import { useTranslation } from 'react-i18next'

export default function AboutUsPage() {
  const { t } = useTranslation()
  const trustCards = [
    {
      title: t('about_us.trust_section.cards.open_source.title', 'Open source by default'),
      description: t(
        'about_us.trust_section.cards.open_source.description',
        'Vocdoni is built on public code and open protocol work, so organizations and independent reviewers can inspect how elections are created, cast, counted, and verified.'
      ),
    },
    {
      title: t('about_us.trust_section.cards.verifiability.title', 'Verifiable election records'),
      description: t(
        'about_us.trust_section.cards.verifiability.description',
        'Each election can produce auditable public evidence, voter-side verification, and results that do not depend on private vendor assurances.'
      ),
    },
    {
      title: t('about_us.trust_section.cards.privacy.title', 'Privacy and legal readiness'),
      description: t(
        'about_us.trust_section.cards.privacy.description',
        'The platform is designed for privacy-aware organizations that need GDPR-aligned processes, clear audit trails, and election documentation their stakeholders can understand.'
      ),
    },
    {
      title: t('about_us.trust_section.cards.experience.title', 'Operational experience'),
      description: t(
        'about_us.trust_section.cards.experience.description',
        'Since 2018, the team has supported digital governance projects for councils, associations, cooperatives, parties, and member-led communities.'
      ),
    },
  ]

  const aboutUsData = {
    contentTitle: t('about_us.content_title'),
    contentDescription: t('about_us.content_description'),
    tabs: [
      {
        name: t('about_us.tabs.mission.title'),
        value: 'mission',
        content: (
          <div className='space-y-6'>
            <div className='space-y-4'>
              <p className='text-muted-foreground text-lg leading-relaxed'>{t('about_us.tabs.mission.content')}</p>
              {/* Prominent Structure Info */}
              <div className='grid gap-4 sm:grid-cols-2 mt-6'>
                <div className='p-5 bg-primary/5 rounded-2xl border border-primary/10 hover:bg-primary/[0.07] transition-colors'>
                  <p className='text-primary text-xs font-bold uppercase tracking-widest mb-2'>
                    {t('about_us.structure.global_title', 'Vocdoni Global')}
                  </p>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{t('about_us.structure.for_profit')}</p>
                </div>
                <div className='p-5 bg-primary/5 rounded-2xl border border-primary/10 hover:bg-primary/[0.07] transition-colors'>
                  <p className='text-primary text-xs font-bold uppercase tracking-widest mb-2'>
                    {t('about_us.structure.association_title', 'Vocdoni Association')}
                  </p>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{t('about_us.structure.non_profit')}</p>
                </div>
              </div>
            </div>
            <div className='pt-2'>
              <p className='text-sm font-semibold text-primary uppercase tracking-wider mb-3'>
                {t('about_us.team.label', 'The core team')}
              </p>
              <AvatarGroupTooltip />
            </div>
          </div>
        ),
      },
      {
        name: t('about_us.tabs.vision.title'),
        value: 'vision',
        content: (
          <div className='space-y-4'>
            <p className='text-muted-foreground text-lg leading-relaxed'>{t('about_us.tabs.vision.content')}</p>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              {t(
                'about_us.tabs.vision.content_2',
                'We provide the tools for organizations of any size to conduct elections designed to reduce disputes with verifiable public proof.'
              )}
            </p>
          </div>
        ),
      },
      {
        name: t('about_us.tabs.values.title'),
        value: 'values',
        content: (
          <div className='space-y-4'>
            <p className='text-muted-foreground text-lg leading-relaxed'>{t('about_us.tabs.values.content')}</p>
          </div>
        ),
      },
    ],
  }

  return (
    <>
      <AboutUs aboutUsData={aboutUsData} />
      <section className='pb-16 sm:pb-20 lg:pb-24'>
        <div className='mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8'>
          <MotionPreset fade blur slide transition={{ duration: 0.5 }} inView inViewOnce className='space-y-4'>
            <p className='text-primary text-sm font-medium uppercase tracking-wide'>
              {t('about_us.trust_section.eyebrow', 'How trust is built')}
            </p>
            <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
              {t('about_us.trust_section.title', 'Transparent voting infrastructure for serious decisions')}
            </h2>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              {t(
                'about_us.trust_section.description',
                'Vocdoni combines open source infrastructure, cryptographic verification, privacy-conscious processes, and hands-on election experience so organizations can run votes that are easier to trust and easier to explain.'
              )}
            </p>
          </MotionPreset>

          <div className='grid gap-4 sm:grid-cols-2'>
            {trustCards.map((card, index) => (
              <MotionPreset
                key={card.title}
                fade
                blur
                slide
                delay={index * 0.08}
                transition={{ duration: 0.4 }}
                inView
                inViewOnce
                className='rounded-2xl border border-primary/10 bg-primary/5 p-5 transition-colors hover:bg-primary/[0.07]'
              >
                <h3 className='mb-2 text-base font-semibold'>{card.title}</h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>{card.description}</p>
              </MotionPreset>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
