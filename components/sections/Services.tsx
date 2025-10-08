import { useTranslation } from 'react-i18next'

export function Services() {
  const { t } = useTranslation()
  return (
    <div className='h-screen w-full flex items-center justify-center bg-muted/30'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-foreground mb-6'>
          {t('services.headline', { defaultValue: 'Services' })}
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          {t('services.description', {
            defaultValue:
              'Comprehensive solutions for organizations seeking secure, transparent, and efficient voting systems. From consultation to implementation and support.',
          })}
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          <div className='p-6 bg-card rounded-lg border'>
            <h3 className='text-xl font-semibold mb-3'>
              {t('services.consultation', { defaultValue: 'Consultation' })}
            </h3>
            <p className='text-muted-foreground'>
              {t('services.consultation_description', { defaultValue: 'Expert guidance for your voting needs' })}
            </p>
          </div>
          <div className='p-6 bg-card rounded-lg border'>
            <h3 className='text-xl font-semibold mb-3'>
              {t('services.implementation', { defaultValue: 'Implementation' })}
            </h3>
            <p className='text-muted-foreground'>
              {t('services.implementation_description', { defaultValue: 'Seamless deployment and integration' })}
            </p>
          </div>
          <div className='p-6 bg-card rounded-lg border'>
            <h3 className='text-xl font-semibold mb-3'>{t('services.support', { defaultValue: 'Support' })}</h3>
            <p className='text-muted-foreground'>
              {t('services.support_description', { defaultValue: '24/7 technical support and maintenance' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
