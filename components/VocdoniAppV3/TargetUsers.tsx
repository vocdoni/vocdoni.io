import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { BuildingIcon, GraduationCapIcon, LandmarkIcon, UsersIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function TargetUsersV3() {
  const { t } = useTranslation()

  const targets = [
    {
      label: t('vocdoni_app.target_users.list.professional_colleges', 'Professional colleges'),
      icon: <BuildingIcon className='size-5' />,
    },
    {
      label: t('vocdoni_app.target_users.list.associations', 'Associations & federations'),
      icon: <UsersIcon className='size-5' />,
    },
    {
      label: t('vocdoni_app.target_users.list.political_orgs', 'Political parties'),
      icon: <LandmarkIcon className='size-5' />,
    },
    {
      label: t('vocdoni_app.target_users.list.chambers', 'Chambers & trade unions'),
      icon: <BuildingIcon className='size-5' />,
    },
    { label: t('vocdoni_app.target_users.list.sports', 'Sports clubs'), icon: <UsersIcon className='size-5' /> },
    {
      label: t('vocdoni_app.target_users.list.public', 'Public administration'),
      icon: <LandmarkIcon className='size-5' />,
    },
    { label: t('vocdoni_app.target_users.list.coops', 'Cooperatives'), icon: <UsersIcon className='size-5' /> },
    { label: t('vocdoni_app.target_users.list.ngos', 'NGOs & foundations'), icon: <UsersIcon className='size-5' /> },
    {
      label: t('vocdoni_app.target_users.list.education', 'Universities & schools'),
      icon: <GraduationCapIcon className='size-5' />,
    },
    {
      label: t('vocdoni_app.target_users.list.first_nations', 'First nations'),
      icon: <UsersIcon className='size-5' />,
    },
  ]

  return (
    <section className='py-20 bg-muted'>
      <Container>
        <div className='flex flex-col items-center text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>{t('vocdoni_app.target_users.title')}</h2>
          <p className='text-lg text-muted-foreground max-w-2xl'>{t('vocdoni_app.target_users.description')}</p>
        </div>

        <div className='mx-auto flex max-w-5xl flex-wrap justify-center gap-3'>
          {targets.map((item, key) => (
            <div
              key={key}
              className='flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 shadow-sm transition-colors hover:border-primary/50'
            >
              <span className='text-primary'>{item.icon}</span>
              <span className='text-sm font-medium sm:text-base'>{item.label}</span>
            </div>
          ))}
        </div>

        <div className='mt-12 flex justify-center'>
          <Button asChild variant='outline' size='lg'>
            <Link href='/use-cases' variant='unstyled'>
              {t('vocdoni_app.target_users.cta')}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
