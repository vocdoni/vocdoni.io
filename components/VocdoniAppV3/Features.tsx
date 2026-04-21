import { useTranslation } from 'react-i18next'
import { CheckCircleIcon, SmartphoneIcon, ShieldCheckIcon, BarChart3Icon, SettingsIcon, EyeIcon } from 'lucide-react'

import FeaturesSection from '@/components/shadcn-studio/blocks/features-section-24/features-section-24'

export default function FeaturesV3() {
  const { t } = useTranslation()

  const featuresList = [
    {
      icon: <SmartphoneIcon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.accessible'),
      description: t('vocdoni_app.features.items.accessible_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
    {
      icon: <SettingsIcon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.setup'),
      description: t('vocdoni_app.features.items.setup_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
    {
      icon: <EyeIcon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.branding'),
      description: t('vocdoni_app.features.items.branding_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
    {
      icon: <ShieldCheckIcon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.security'),
      description: t('vocdoni_app.features.items.security_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
    {
      icon: <SmartphoneIcon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.devices'),
      description: t('vocdoni_app.features.items.devices_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
    {
      icon: <BarChart3Icon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.reporting'),
      description: t('vocdoni_app.features.items.reporting_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
    {
      icon: <SettingsIcon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.flexibility'),
      description: t('vocdoni_app.features.items.flexibility_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
    {
      icon: <CheckCircleIcon className='h-10 w-10 text-primary' />,
      title: t('vocdoni_app.features.items.compliance'),
      description: t('vocdoni_app.features.items.compliance_desc', { defaultValue: ' ' }),
      image: '/features-placeholder.png',
    },
  ]

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
