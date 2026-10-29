import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'

const ChangelogHero = () => {
  const { t } = useTranslation()

  return (
    <section className='px-4 py-10 text-center md:px-8 md:py-16'>
      <div className='space-y-4'>
        <Badge variant='outline' className='h-auto text-sm font-normal'>
          {t('app_changelog.hero.eyebrow', 'Vocdoni App')}
        </Badge>
        <h1 className='text-3xl font-semibold md:text-4xl lg:text-5xl'>
          {t('app_changelog.hero.title', "What's new")}
        </h1>
        <p className='text-muted-foreground mx-auto max-w-md text-xl'>
          {t(
            'app_changelog.hero.subtitle',
            'Follow every update to Vocdoni App - the platform that makes secure digital voting easy and affordable for any organization.'
          )}
        </p>
      </div>
    </section>
  )
}

export default ChangelogHero
