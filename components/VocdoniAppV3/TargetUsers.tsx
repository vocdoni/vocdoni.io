import { useTranslation } from 'react-i18next'
import { BuildingIcon, UsersIcon, LandmarkIcon, GraduationCapIcon } from 'lucide-react'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'

export default function TargetUsersV3() {
  const { t } = useTranslation()

  const targets = [
    { key: 'professional_colleges', icon: <BuildingIcon className='size-5' /> },
    { key: 'associations', icon: <UsersIcon className='size-5' /> },
    { key: 'political_orgs', icon: <LandmarkIcon className='size-5' /> },
    { key: 'chambers', icon: <BuildingIcon className='size-5' /> },
    { key: 'sports', icon: <UsersIcon className='size-5' /> },
    { key: 'public', icon: <LandmarkIcon className='size-5' /> },
    { key: 'coops', icon: <UsersIcon className='size-5' /> },
    { key: 'ngos', icon: <UsersIcon className='size-5' /> },
    { key: 'education', icon: <GraduationCapIcon className='size-5' /> },
    { key: 'first_nations', icon: <UsersIcon className='size-5' /> },
  ]

  return (
    <section className='py-20 bg-muted'>
      <Container>
        <div className='flex flex-col items-center text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>{t('vocdoni_app.target_users.title')}</h2>
          <p className='text-lg text-muted-foreground max-w-2xl'>{t('vocdoni_app.target_users.description')}</p>
        </div>

        <div className='mx-auto flex max-w-5xl flex-wrap justify-center gap-3'>
          {targets.map((item) => (
            <div
              key={item.key}
              className='flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 shadow-sm transition-colors hover:border-primary/50'
            >
              <span className='text-primary'>{item.icon}</span>
              <span className='text-sm font-medium sm:text-base'>{t(`vocdoni_app.target_users.list.${item.key}`)}</span>
            </div>
          ))}
        </div>

        <div className='mt-12 flex justify-center'>
          <Button asChild variant='outline' size='lg' className='rounded-full'>
            <a href='/use-cases'>{t('vocdoni_app.target_users.cta')}</a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
