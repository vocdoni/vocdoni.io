import { useTranslation } from 'react-i18next'
import { CheckCircleIcon, SmartphoneIcon, ShieldCheckIcon, BarChart3Icon, SettingsIcon, EyeIcon } from 'lucide-react'

import FeaturesSection from '@/components/shadcn-studio/blocks/features-section-24/features-section-24'

export default function FeaturesV3() {
  const { t } = useTranslation()

  const features = [
    {
      key: 'accessible',
      icon: <SmartphoneIcon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
    {
      key: 'setup',
      icon: <SettingsIcon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
    {
      key: 'branding',
      icon: <EyeIcon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
    {
      key: 'security',
      icon: <ShieldCheckIcon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
    {
      key: 'devices',
      icon: <SmartphoneIcon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
    {
      key: 'reporting',
      icon: <BarChart3Icon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
    {
      key: 'flexibility',
      icon: <SettingsIcon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
    {
      key: 'compliance',
      icon: <CheckCircleIcon className='h-10 w-10 text-primary' />,
      image: '/features-placeholder.png',
    },
  ]

  const featuresList = features.map((item) => ({
    icon: item.icon,
    title: t(`vocdoni_app.features.items.${item.key}`),
    description: t(`vocdoni_app.features.items.${item.key}_desc`, {
      defaultValue: ' ',
    }),
    image: item.image,
  }))

  return (
    <FeaturesSection
      title={t('vocdoni_app.features.title')}
      description={t('vocdoni_app.features.subtitle', {
        defaultValue: 'Everything you need to run secure and accessible voting processes.',
      })}
      featuresList={featuresList}
    />
  )
}
