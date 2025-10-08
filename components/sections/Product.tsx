import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export function Product() {
  const { t } = useTranslation()
  return (
    <div className='h-screen flex items-center justify-center bg-background'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-foreground mb-6'>
          {t('product.headline', { defaultValue: 'Product' })}
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          {t('product.description', {
            defaultValue:
              'The Vocdoni Platform delivers enterprise-grade voting solutions with unmatched security, scalability, and user experience for any size organization.',
          })}
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
          <Button size='lg' className='px-8'>
            {t('product.try_demo', { defaultValue: 'Try Demo' })}
          </Button>
          <Button variant='outline' size='lg' className='px-8'>
            {t('product.view_features', { defaultValue: 'View Features' })}
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-left'>
          <div>
            <h3 className='text-2xl font-semibold mb-4'>
              {t('product.key_features', { defaultValue: 'Key Features' })}
            </h3>
            <ul className='space-y-2 text-muted-foreground'>
              <li>• {t('product.feature1', { defaultValue: 'End-to-end encryption' })}</li>
              <li>• {t('product.feature2', { defaultValue: 'Anonymous voting' })}</li>
              <li>• {t('product.feature3', { defaultValue: 'Real-time results' })}</li>
              <li>• {t('product.feature4', { defaultValue: 'Multi-platform access' })}</li>
            </ul>
          </div>
          <div>
            <h3 className='text-2xl font-semibold mb-4'>{t('product.benefits', { defaultValue: 'Benefits' })}</h3>
            <ul className='space-y-2 text-muted-foreground'>
              <li>• {t('product.benefit1', { defaultValue: 'Increased participation' })}</li>
              <li>• {t('product.benefit2', { defaultValue: 'Cost reduction' })}</li>
              <li>• {t('product.benefit3', { defaultValue: 'Complete transparency' })}</li>
              <li>• {t('product.benefit4', { defaultValue: 'Instant verification' })}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
