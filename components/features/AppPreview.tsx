import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AppPreview() {
  const { t } = useTranslation()
  return (
    <Card className='w-48 p-4 space-y-3 bg-background/50 backdrop-blur-sm'>
      <div className='space-y-2'>
        <div className='flex items-center gap-2 text-sm'>
          <CheckCircle2 className='size-4 text-primary' />
          <span className='text-muted-foreground'>{t('previews.app_preview.option_a')}</span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <CheckCircle2 className='size-4 text-muted-foreground' />
          <span className='text-muted-foreground'>{t('previews.app_preview.option_b')}</span>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <CheckCircle2 className='size-4 text-muted-foreground' />
          <span className='text-muted-foreground'>{t('previews.app_preview.option_c')}</span>
        </div>
      </div>
      <Button className='w-full h-8 text-xs' size='sm'>
        {t('previews.app_preview.cast_vote')}
      </Button>
    </Card>
  )
}
