import { useTranslation } from 'react-i18next'
import AboutUs from '@/components/shadcn-studio/blocks/about-us-page-03/about-us-page-03'
import AvatarGroupTooltip from '@/components/shadcn-studio/avatar/avatar-16'

export default function AboutUsPage() {
  const { t } = useTranslation()

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
              <p className='text-muted-foreground text-lg leading-relaxed'>
                {t('about_us.tabs.mission.content')}
              </p>
              {/* Prominent Structure Info */}
              <div className='grid gap-4 sm:grid-cols-2 mt-6'>
                <div className='p-5 bg-primary/5 rounded-2xl border border-primary/10 hover:bg-primary/[0.07] transition-colors'>
                  <p className='text-primary text-xs font-bold uppercase tracking-widest mb-2'>
                    {t('about_us.structure.global_title', 'Vocdoni Global')}
                  </p>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {t('about_us.structure.for_profit')}
                  </p>
                </div>
                <div className='p-5 bg-primary/5 rounded-2xl border border-primary/10 hover:bg-primary/[0.07] transition-colors'>
                  <p className='text-primary text-xs font-bold uppercase tracking-widest mb-2'>
                    {t('about_us.structure.association_title', 'Vocdoni Association')}
                  </p>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {t('about_us.structure.non_profit')}
                  </p>
                </div>
              </div>
            </div>
            <div className='pt-2'>
              <p className='text-sm font-semibold text-primary uppercase tracking-wider mb-3'>{t('about_us.team.label', 'The core team')}</p>
              <AvatarGroupTooltip />
            </div>
          </div>
        )
      },
      {
        name: t('about_us.tabs.vision.title'),
        value: 'vision',
        content: (
          <div className='space-y-4'>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              {t('about_us.tabs.vision.content')}
            </p>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              {t('about_us.tabs.vision.content_2', 'We provide the tools for organizations of any size to conduct elections that are unchallengeable by design.')}
            </p>
          </div>
        )
      },
      {
        name: t('about_us.tabs.values.title'),
        value: 'values',
        content: (
          <div className='space-y-4'>
            <p className='text-muted-foreground text-lg leading-relaxed'>{t('about_us.tabs.values.content')}</p>
          </div>
        )
      }
    ]
  }

  return <AboutUs aboutUsData={aboutUsData} />
}
